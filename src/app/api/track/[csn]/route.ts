import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

interface TimelineStep {
  id: string;
  title: string;
  timestamp?: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  courier?: string;
  requiredId?: string;
}

const BASELINE_MOCK: Record<string, TimelineStep[]> = {
  "LMX-GRA-8064": [
    {
      id: "1",
      title: "Accra HQ Intake",
      timestamp: "08:00 AM, Oct 24",
      description: "Document received and sealed in tamper-evident sleeve.",
      status: "completed",
    },
    {
      id: "2",
      title: "Sorting Vault Transit",
      timestamp: "10:30 AM, Oct 24",
      description: "Cleared central security vault routing.",
      status: "completed",
    },
    {
      id: "3",
      title: "Out for Secure Delivery",
      description:
        "Consignment is in the custody of vetted courier en route to destination.",
      status: "in_progress",
      courier: "Agent K. Mensah",
      requiredId: "National ID / Passport",
    },
    {
      id: "4",
      title: "Destination Verification",
      description: "Awaiting final biometric signature and handover.",
      status: "pending",
    },
  ],
};

/**
 * GET /api/track/[csn]
 * Looks up custody timeline steps from Supabase PostgreSQL for a specific CSN.
 */
export async function GET(
  request: Request,
  props: { params: Promise<{ csn: string }> }
) {
  const { csn } = await props.params;
  const normalizedCSN = (csn || "").trim().toUpperCase();

  if (!normalizedCSN || normalizedCSN.length < 5) {
    return NextResponse.json(
      { error: "A valid Consignment Security Number (CSN) is required." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServerClient();

  if (supabase) {
    try {
      // Query tracking events
      const { data: events, error: eventsError } = await supabase
        .from("tracking_events")
        .select("*")
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
          courier: ev.assigned_courier || undefined,
          requiredId: ev.required_id || undefined,
          timestamp: ev.event_timestamp
            ? new Date(ev.event_timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }) +
              ", " +
              new Date(ev.event_timestamp).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })
            : undefined,
        }));

        return NextResponse.json({
          success: true,
          csn: normalizedCSN,
          steps: formattedTimeline,
        });
      }

      // Check if booking exists even without tracking events
      const { data: booking } = await supabase
        .from("bookings")
        .select("*")
        .eq("csn", normalizedCSN)
        .single();

      if (booking) {
        const initialTimeline: TimelineStep[] = [
          {
            id: booking.id,
            title: "Dispatch Request Registered",
            description: `Consignment manifest logged for ${booking.sender_name}. Awaiting courier pickup.`,
            status: "completed",
            timestamp: new Date(booking.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          {
            id: "2",
            title: "Out for Secure Delivery",
            description: "Consignment will be assigned to a vetted courier.",
            status: "in_progress",
            courier: booking.assigned_courier || "Pending Assignment",
            requiredId: booking.verification_protocol?.replace("_", " ").toUpperCase(),
          },
          {
            id: "3",
            title: "Destination Verification",
            description: "Awaiting final identity check and handover.",
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

  // Fallback to baseline in-memory store for demonstration
  const fallback = BASELINE_MOCK[normalizedCSN];
  if (fallback) {
    return NextResponse.json({
      success: true,
      csn: normalizedCSN,
      steps: fallback,
    });
  }

  return NextResponse.json(
    {
      error: `No active consignment found matching record "${normalizedCSN}". Please verify your CSN.`,
    },
    { status: 404 }
  );
}
