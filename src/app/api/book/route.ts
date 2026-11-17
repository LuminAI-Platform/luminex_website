import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import {
  formatTimestampGMT,
  getSupabaseServerClient,
  saveLocalConsignment,
} from "@/lib/supabase";
import { createRateLimiter } from "@/lib/rate-limit";

/** Rate limiter: 5 booking submissions per IP per 60 seconds. */
const bookingLimiter = createRateLimiter({
  namespace: "book",
  maxRequests: 5,
  windowMs: 60_000,
});

interface BookingRequestBody {
  senderName?: string;
  senderEmail?: string;
  senderContact?: string;
  collectionAddress?: string;
  receiverName?: string;
  receiverContact?: string;
  destinationAddress?: string;
  description?: string;
  verificationProtocol?: string;
  honeypot?: string; // Bot trap
  renderedAt?: number; // Timing heuristic
}

/** Generate cryptographically random, unguessable Consignment Security Number (CSN). */
function generateCSN(): string {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = randomBytes(8);
  let block1 = "";
  let block2 = "";
  for (let i = 0; i < 4; i++) {
    block1 += alphabet[bytes[i] % alphabet.length];
    block2 += alphabet[bytes[i + 4] % alphabet.length];
  }
  return `LMX-${block1}-${block2}`;
}

/**
 * POST /api/book
 * Creates a persistent booking in Supabase PostgreSQL, creates the initial
 * tracking event timeline, dispatches non-blocking staff notification, and
 * returns the generated CSN to the customer.
 */
export async function POST(request: Request) {
  try {
    // ── Rate Limiting ────────────────────────────────────────────────
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { success: withinLimit } = bookingLimiter.check(ip);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many booking requests. Please wait a moment and try again." },
        {
          status: 429,
          headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" },
        }
      );
    }

    const body: BookingRequestBody = await request.json();
    const {
      senderName,
      senderEmail,
      senderContact,
      collectionAddress,
      receiverName,
      receiverContact,
      destinationAddress,
      description,
      verificationProtocol,
      honeypot,
      renderedAt,
    } = body;

    // ── Tier 1: Anti-Spam Honeypot Trap ──────────────────────────────
    if (honeypot && honeypot.trim().length > 0) {
      console.warn("[Spam Protection] Booking honeypot triggered. Silently discarded.");
      return NextResponse.json({
        success: true,
        csn: generateCSN(),
        message: "Booking submitted successfully.",
      });
    }

    // ── Tier 2: Timing Heuristic ─────────────────────────────────────
    const now = Date.now();
    if (renderedAt && now - renderedAt < 1200) {
      console.warn("[Spam Protection] Rapid booking submission detected (<1200ms). Discarded.");
      return NextResponse.json({
        success: true,
        csn: generateCSN(),
        message: "Booking submitted successfully.",
      });
    }

    // ── Tier 3: Server-side Field Validation ──────────────────────────
    if (!senderName || senderName.trim().length < 2) {
      return NextResponse.json(
        { error: "Sender full name or entity is required." },
        { status: 400 }
      );
    }

    if (senderEmail && senderEmail.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(senderEmail.trim())) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    if (!senderContact || senderContact.trim().length < 7) {
      return NextResponse.json(
        { error: "A valid contact phone number is required." },
        { status: 400 }
      );
    }

    if (!collectionAddress || collectionAddress.trim().length < 3) {
      return NextResponse.json(
        { error: "Delivery or collection address is required." },
        { status: 400 }
      );
    }

    const resolvedReceiverName = (receiverName && receiverName.trim().length >= 2)
      ? receiverName.trim()
      : senderName.trim();

    const resolvedReceiverContact = (receiverContact && receiverContact.trim().length >= 7)
      ? receiverContact.trim()
      : senderContact.trim();

    const resolvedDestinationAddress = (destinationAddress && destinationAddress.trim().length >= 3)
      ? destinationAddress.trim()
      : collectionAddress.trim();

    const resolvedDescription = (description && description.trim().length >= 2)
      ? description.trim()
      : "Standard Courier Consignment";

    const validProtocols = ["national_id", "ghana_card", "biometric", "corporate_seal"];
    if (!verificationProtocol || !validProtocols.includes(verificationProtocol)) {
      return NextResponse.json(
        { error: "A valid verification ID type must be selected." },
        { status: 400 }
      );
    }

    // ── Generate Unique CSN & Prepare Payload ─────────────────────────
    const csn = generateCSN();
    const sanitizedBooking = {
      csn,
      sender_name: senderName.trim().slice(0, 100),
      sender_email: (senderEmail || "customer@direct.luminex").trim().toLowerCase().slice(0, 150),
      sender_contact: senderContact.trim().slice(0, 30),
      collection_address: collectionAddress.trim().slice(0, 255),
      receiver_name: resolvedReceiverName.slice(0, 100),
      receiver_contact: resolvedReceiverContact.slice(0, 30),
      destination_address: resolvedDestinationAddress.slice(0, 255),
      description: resolvedDescription.slice(0, 500),
      verification_protocol: verificationProtocol,
      status: "PENDING",
    };

    // ── Tier 4: Database Persistence (Supabase PostgreSQL) ────────────
    const supabase = getSupabaseServerClient();
    let bookingId: string | null = null;

    if (supabase) {
      const { data, error: insertError } = await supabase
        .from<{ id: string }>("bookings")
        .insert([sanitizedBooking])
        .select("id")
        .single();

      if (insertError) {
        console.error("[Supabase Database Error - Booking Insert]:", insertError);
        return NextResponse.json(
          { error: "Unable to record booking manifest. Please try again or contact dispatch." },
          { status: 500 }
        );
      }

      bookingId = data?.id ?? null;

      // Create initial timeline step for custody tracking
      const initialStep = {
        booking_id: bookingId,
        csn,
        step_number: 1,
        title: "Booking Request Logged",
        description:
          "Your delivery request has been received. Our Head of Operations will contact you to confirm pickup.",
        status: "completed",
        required_id: verificationProtocol.replace("_", " ").toUpperCase(),
      };

      const { error: timelineError } = await supabase
        .from("tracking_events")
        .insert([initialStep]);

      if (timelineError) {
        console.error("[Supabase Database Error - Timeline Insert]:", timelineError);
      }
    } else {
      console.warn(
        `[Supabase Unconfigured] Generated local booking ref: CSN=${csn} (Sender: ${sanitizedBooking.sender_name})`
      );
    }

    // Store in local fallback so newly booked CSNs are immediately trackable
    const nowFormatted = formatTimestampGMT(new Date());

    saveLocalConsignment(csn, [
      {
        id: "1",
        title: "Booking Request Logged",
        timestamp: nowFormatted,
        description:
          "Your delivery request has been received. Our Head of Operations will contact you to confirm pickup.",
        status: "completed",
      },
      {
        id: "2",
        title: "Pickup Confirmation & Dispatch",
        timestamp: nowFormatted,
        description: "Confirming pickup details and assigning your courier.",
        status: "in_progress",
        courier: "Pending Assignment",
        requiredId: verificationProtocol.replace("_", " ").toUpperCase(),
      },
      {
        id: "3",
        title: "Out for Delivery",
        description: "With your courier, on the way to destination.",
        status: "pending",
      },
      {
        id: "4",
        title: "Destination Handover",
        description: "Waiting for recipient ID check and signature.",
        status: "pending",
      },
    ]);

    // ── Tier 5: Non-blocking Staff Notification (Email / Webhook) ────
    // Isolated in try/catch so email failure never blocks successful booking
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL_TO || "luminexlogisticsltd@gmail.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from:
              process.env.RESEND_FROM_EMAIL ||
              "Luminex Dispatch <onboarding@resend.dev>",
            to: [notificationEmail],
            reply_to: sanitizedBooking.sender_email,
            subject: `[New Booking] CSN ${csn} — Pickup from ${sanitizedBooking.sender_name}`,
            text: `
New Courier Booking Received:
==========================================
CSN Number:           ${csn}
Status:               PENDING PICKUP

SENDER DETAILS:
Name:                 ${sanitizedBooking.sender_name}
Contact:              ${sanitizedBooking.sender_contact}
Email:                ${sanitizedBooking.sender_email}
Pickup Location:      ${sanitizedBooking.collection_address}

RECIPIENT DETAILS:
Authorized Receiver:  ${sanitizedBooking.receiver_name}
Contact:              ${sanitizedBooking.receiver_contact}
Destination Address:  ${sanitizedBooking.destination_address}

MANIFEST CONFIGURATION:
Verification Rule:    ${sanitizedBooking.verification_protocol}
Description:
${sanitizedBooking.description}
==========================================
Luminex Logistics Automated Dispatch Engine
            `,
          }),
        });
      } catch (notifErr) {
        console.error("[Staff Notification Dispatch Failed]:", notifErr);
      }
    }

    return NextResponse.json({
      success: true,
      csn,
      bookingId,
      message: "Transfer scheduled successfully.",
    });
  } catch (err) {
    console.error("[Booking API Route Exception]:", err);
    return NextResponse.json(
      { error: "An unexpected server error occurred while processing your booking." },
      { status: 500 }
    );
  }
}
