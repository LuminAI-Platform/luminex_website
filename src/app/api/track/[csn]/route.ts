import { NextResponse } from "next/server";
import {
  formatTimestampGMT,
  getLocalConsignment,
  getSupabaseServerClient,
} from "@/lib/supabase";
import { createRateLimiter } from "@/lib/rate-limit";

/** Rate limiter: 10 tracking lookups per IP per 60 seconds. */
const trackLimiter = createRateLimiter({
  namespace: "track",
  maxRequests: 10,
  windowMs: 60_000,
});

const NOT_FOUND_MESSAGE =
  "We couldn't find a consignment matching that CSN. Please check the number and try again.";

interface TimelineStep {
  id: string;
  title: string;
  timestamp?: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  courier?: string;
  requiredId?: string;
}

interface BookingRow {
  id: string;
  created_at: string;
  assigned_courier?: string | null;
  verification_protocol?: string | null;
}

interface TrackingEventRow {
  id: string;
  title: string;
  description: string;
  status: TimelineStep["status"];
  assigned_courier?: string | null;
  required_id?: string | null;
  event_timestamp?: string | null;
}

/**
 * Redacts full courier names so only a courier code or first name is exposed publicly.
 */
function sanitizeCourierDisplay(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (trimmed.toLowerCase() === "pending assignment") return "Pending Assignment";

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0];

  // If prefixed with "Agent" or "Courier", keep prefix + first name/initial only
  if (/^(agent|courier)$/i.test(parts[0]) && parts.length >= 2) {
    return `${parts[0]} ${parts[1]}`;
  }

  // Otherwise return first name + last initial
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
}

const DEMO_STEPS: TimelineStep[] = [
  {
    id: "1",
    title: "Accra HQ Intake",
    timestamp: "24 Oct 2026, 08:00 GMT",
    description: "Received at our Accra office and sealed.",
    status: "completed",
  },
  {
    id: "2",
    title: "Accra Hub Sorting",
    timestamp: "24 Oct 2026, 10:30 GMT",
    description: "Sorted at our Accra hub.",
    status: "completed",
  },
  {
    id: "3",
    title: "Out for Delivery",
    timestamp: "24 Oct 2026, 11:15 GMT",
    description: "With your courier, on the way.",
    status: "in_progress",
    courier: "Agent K.",
    requiredId: "National ID / Passport",
  },
  {
    id: "4",
    title: "Destination Handover",
    description: "Waiting for the recipient's signature.",
    status: "pending",
  },
];

const BASELINE_MOCK: Record<string, TimelineStep[]> = {
  "LMX-8F3K-92B4": DEMO_STEPS,
};

/**
 * GET /api/track/[csn]
 * Looks up delivery progress steps from Supabase PostgreSQL for a specific CSN.
 */
export async function GET(
  request: Request,
  props: { params: Promise<{ csn: string }> }
) {
  // ── Rate Limiting per IP ─────────────────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { success: withinLimit } = trackLimiter.check(ip);
  if (!withinLimit) {
    return NextResponse.json(
      { error: "Too many tracking requests. Please wait a moment and try again." },
      {
        status: 429,
        headers: { "Retry-After": "60", "X-RateLimit-Remaining": "0" },
      }
    );
  }

  const { csn } = await props.params;
  const normalizedCSN = (csn || "").trim().toUpperCase();

  // Uniform 404 response for any invalid or non-existent tracking number
  if (!/^[A-Z0-9-]{5,32}$/.test(normalizedCSN)) {
    return NextResponse.json({ error: NOT_FOUND_MESSAGE }, { status: 404 });
  }

  const supabase = getSupabaseServerClient();

  if (supabase) {
    try {
      // Query only the columns needed by the recipient
      const { data: events, error: eventsError } = await supabase
        .from<TrackingEventRow[]>("tracking_events")
        .select(
          "id, title, description, status, assigned_courier, required_id, event_timestamp"
        )
        .eq("csn", normalizedCSN)
        .order("step_number", { ascending: true });

      if (eventsError) {
        console.error("[Supabase Track Lookup Error]:", eventsError);
      }

      if (events && events.length > 0) {
        const formattedTimeline: TimelineStep[] = events.map((ev) => ({
          id: ev.id,
          title: ev.title,
          description: ev.description,
          status: ev.status,
          courier: sanitizeCourierDisplay(ev.assigned_courier),
          requiredId: ev.required_id || undefined,
          timestamp: ev.event_timestamp
            ? formatTimestampGMT(ev.event_timestamp)
            : undefined,
        }));

        return NextResponse.json({
          success: true,
          csn: normalizedCSN,
          steps: formattedTimeline,
        });
      }

      // Check if booking exists even without tracking events (select only non-PII fields)
      const { data: booking } = await supabase
        .from<BookingRow>("bookings")
        .select("id, created_at, assigned_courier, verification_protocol")
        .eq("csn", normalizedCSN)
        .single();

      if (booking) {
        const createdTimestamp = formatTimestampGMT(booking.created_at);
        const initialTimeline: TimelineStep[] = [
          {
            id: booking.id,
            title: "Booking Request Logged",
            description:
              "Your delivery request has been received. Our Head of Operations will contact you to confirm pickup.",
            status: "completed",
            timestamp: createdTimestamp,
          },
          {
            id: "2",
            title: "Pickup Confirmation & Dispatch",
            description: "Confirming pickup details and assigning your courier.",
            status: "in_progress",
            timestamp: createdTimestamp,
            courier:
              sanitizeCourierDisplay(booking.assigned_courier) ||
              "Pending Assignment",
            requiredId: booking.verification_protocol
              ?.replace("_", " ")
              .toUpperCase(),
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
        ];

        return NextResponse.json({
          success: true,
          csn: normalizedCSN,
          steps: initialTimeline,
        });
      }
    } catch (dbErr) {
      console.error("[Database Exception during tracking]:", dbErr);
    }
  }

  // Check local in-memory bookings first
  const localRecord = getLocalConsignment(normalizedCSN);
  if (localRecord) {
    return NextResponse.json({
      success: true,
      csn: normalizedCSN,
      steps: localRecord,
    });
  }

  // Check clearly marked sample consignment preview
  const sampleRecord = BASELINE_MOCK[normalizedCSN];
  if (sampleRecord) {
    return NextResponse.json({
      success: true,
      csn: normalizedCSN,
      isSample: true,
      steps: sampleRecord,
    });
  }

  return NextResponse.json({ error: NOT_FOUND_MESSAGE }, { status: 404 });
}
