import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

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

/** Generate unique Consignment Security Number (CSN) */
function generateCSN(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `LMX-GRA-${randomDigits}`;
}

/**
 * POST /api/book
 * Creates a persistent booking in Supabase PostgreSQL, creates the initial
 * tracking event timeline, dispatches non-blocking staff notification, and
 * returns the generated CSN to the customer.
 */
export async function POST(request: Request) {
  try {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!senderEmail || !emailRegex.test(senderEmail.trim())) {
      return NextResponse.json(
        { error: "A valid sender email address is required." },
        { status: 400 }
      );
    }

    if (!senderContact || senderContact.trim().length < 7) {
      return NextResponse.json(
        { error: "A valid sender contact phone number is required." },
        { status: 400 }
      );
    }

    if (!collectionAddress || collectionAddress.trim().length < 3) {
      return NextResponse.json(
        { error: "Collection digital address or GPS location is required." },
        { status: 400 }
      );
    }

    if (!receiverName || receiverName.trim().length < 2) {
      return NextResponse.json(
        { error: "Authorized receiver legal name is required." },
        { status: 400 }
      );
    }

    if (!receiverContact || receiverContact.trim().length < 7) {
      return NextResponse.json(
        { error: "A valid receiver contact number is required." },
        { status: 400 }
      );
    }

    if (!destinationAddress || destinationAddress.trim().length < 3) {
      return NextResponse.json(
        { error: "Destination facility or residential address is required." },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 5) {
      return NextResponse.json(
        { error: "Document or item manifest description is required." },
        { status: 400 }
      );
    }

    const validProtocols = ["national_id", "ghana_card", "biometric", "corporate_seal"];
    if (!verificationProtocol || !validProtocols.includes(verificationProtocol)) {
      return NextResponse.json(
        { error: "A valid doorstep verification protocol must be selected." },
        { status: 400 }
      );
    }

    // ── Generate Unique CSN & Prepare Payload ─────────────────────────
    const csn = generateCSN();
    const sanitizedBooking = {
      csn,
      sender_name: senderName.trim().slice(0, 100),
      sender_email: senderEmail.trim().toLowerCase().slice(0, 150),
      sender_contact: senderContact.trim().slice(0, 30),
      collection_address: collectionAddress.trim().slice(0, 255),
      receiver_name: receiverName.trim().slice(0, 100),
      receiver_contact: receiverContact.trim().slice(0, 30),
      destination_address: destinationAddress.trim().slice(0, 255),
      description: description.trim().slice(0, 500),
      verification_protocol: verificationProtocol,
      status: "PENDING",
    };

    // ── Tier 4: Database Persistence (Supabase PostgreSQL) ────────────
    const supabase = getSupabaseServerClient();
    let bookingId: string | null = null;

    if (supabase) {
      const { data, error: insertError } = await supabase
        .from("bookings")
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

      bookingId = data?.id;

      // Create initial timeline step for custody tracking
      const initialStep = {
        booking_id: bookingId,
        csn,
        step_number: 1,
        title: "Dispatch Request Registered",
        description: "Consignment manifest registered in custody network. Staging for courier pickup.",
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

    // ── Tier 5: Non-blocking Staff Notification (Email / Webhook) ────
    // Isolated in try/catch so email failure never blocks successful booking
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail =
      process.env.NOTIFICATION_EMAIL_TO || "ops@luminexlogistics.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Luminex Dispatch <dispatch@luminexlogistics.com>",
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
