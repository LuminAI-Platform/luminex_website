import { NextResponse } from "next/server";

interface ContactRequestBody {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  honeypot?: string; // Bot trap
  renderedAt?: number; // Timing verification
}

/**
 * POST /api/contact
 * Handles corporate dispatch and general support inquiries with
 * multi-tier spam mitigation (honeypot, timing heuristic, input validation).
 */
export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { fullName, email, phone, subject, message, honeypot, renderedAt } = body;

    // ── Tier 1: Honeypot Trap ─────────────────────────────────────────
    // If hidden bot field is filled, silently discard without alerting the bot.
    if (honeypot && honeypot.trim().length > 0) {
      console.warn("[Spam Protection] Honeypot triggered. Silently discarded submission.");
      return NextResponse.json({
        success: true,
        message: "Inquiry received successfully.",
      });
    }

    // ── Tier 2: Timing Heuristic ─────────────────────────────────────
    // If submitted faster than 1.2s from page render, flag as automated bot.
    const now = Date.now();
    if (renderedAt && now - renderedAt < 1200) {
      console.warn("[Spam Protection] Rapid submission heuristic triggered (<1200ms). Discarded.");
      return NextResponse.json({
        success: true,
        message: "Inquiry received successfully.",
      });
    }

    // ── Tier 3: Validation & Sanitization ────────────────────────────
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "A valid full name is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid corporate email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message details must be at least 10 characters." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      fullName: fullName.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 150),
      phone: (phone || "").trim().slice(0, 30),
      subject: (subject || "General Support").trim().slice(0, 100),
      message: message.trim().slice(0, 1000),
      timestamp: new Date().toISOString(),
    };

    // ── Tier 4: Email / Notification Dispatch Hook ───────────────────
    // If an email service API key (e.g. RESEND_API_KEY) is configured in .env,
    // the system will forward the notification to the dispatch desk.
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationRecipient =
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
            from: "Luminex Inquiries <noreply@luminexlogistics.com>",
            to: [notificationRecipient],
            reply_to: sanitizedData.email,
            subject: `[Dispatch Inquiry] ${sanitizedData.subject} — ${sanitizedData.fullName}`,
            text: `
New Dispatch Inquiry Received:
------------------------------------------
Name: ${sanitizedData.fullName}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || "Not provided"}
Subject: ${sanitizedData.subject}
Timestamp: ${sanitizedData.timestamp}

Message:
${sanitizedData.message}
------------------------------------------
Luminex Logistics Dispatch Security System
            `,
          }),
        });
      } catch (emailError) {
        console.error("[Email Notification Failed]:", emailError);
      }
    } else {
      // Development / Default logging
      console.log(
        `[Luminex Inquiry Registered]: From="${sanitizedData.fullName}" <${sanitizedData.email}> Subject="${sanitizedData.subject}"`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully dispatched to our operations team.",
    });
  } catch (err) {
    console.error("[Contact API Error]:", err);
    return NextResponse.json(
      { error: "An error occurred while processing your inquiry. Please try again or call dispatch." },
      { status: 500 }
    );
  }
}
