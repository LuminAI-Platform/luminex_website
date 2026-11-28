import React from "react";
import { Metadata } from "next";
import PolicyLayout, {
  PolicySection,
  PolicyCallout,
  PolicyTable,
  type PolicySectionDef,
} from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Refund, Cancellation & Rescheduling Policy | Luminex Logistics",
  description:
    "Official schedule and terms governing refunds, cancellations, rescheduling, and failed delivery protocols at Luminex Logistics Ltd.",
};

const SECTIONS = [
  {
    id: "scope",
    number: 1,
    navLabel: "Scope & Contract Priority",
    title: "Scope & Contract Priority",
  },
  {
    id: "cancellation-schedule",
    number: 2,
    navLabel: "Cancellation Fee Schedule",
    title: "Cancellation Fee Schedule",
  },
  {
    id: "failed-delivery",
    number: 3,
    navLabel: "Failed Delivery & Redelivery",
    title: "Failed Delivery & Recipient Unavailability",
  },
  {
    id: "rescheduling",
    number: 4,
    navLabel: "Rescheduling Schedule",
    title: "Rescheduling Schedule",
  },
  {
    id: "refund-eligibility",
    number: 5,
    navLabel: "Refund Eligibility",
    title: "Refund Eligibility",
  },
  {
    id: "review-timelines",
    number: 6,
    navLabel: "Review & Settlement Timelines",
    title: "Review & Settlement Timelines",
  },
  {
    id: "sensitive-documents",
    number: 7,
    navLabel: "Sensitive Consignments",
    title: "Sensitive Consignments & Redirection Security",
  },
  {
    id: "contact",
    number: 8,
    navLabel: "Customer Relations Office",
    title: "Customer Relations Office",
  },
] as const satisfies readonly PolicySectionDef[];

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      category="Service Policy"
      title="Refund, Cancellation & Rescheduling Policy"
      summary="Rules and fee schedules governing order cancellations, delivery rescheduling, failed handover attempts, and refund claims for corporate and individual customers across Ghana."
      effectiveDate="January 1, 2026"
      version="Version 1.2"
      currentPath="/refund"
      sections={SECTIONS}
    >
      {/* 1. Scope & Contract Priority */}
      <PolicySection section={SECTIONS[0]}>
        <p>
          This policy applies whenever a customer cancels, reschedules,
          redirects, or requests a refund for a Luminex Logistics consignment.
          Changes requested before operational resources are committed incur no
          unnecessary charges; once a courier, vehicle, or dispatch slot has
          been allocated or executed, fees apply only to cover real operational
          costs incurred.
        </p>
        <p>
          Where an enterprise or institutional client has a signed Master
          Services Agreement (MSA) or custom SLA rider with Luminex Logistics
          Ltd., the terms of that negotiated contract prevail over this general
          schedule.
        </p>
      </PolicySection>

      {/* 2. Cancellation Fee Schedule */}
      <PolicySection section={SECTIONS[1]}>
        <p>
          Cancellation charges depend strictly on the dispatch stage of the
          consignment at the time our Customer Relations Office or dispatch desk
          receives notice:
        </p>

        <PolicyTable
          headers={["Dispatch Stage", "When It Applies", "Fee & Refund Rule"]}
          rows={[
            [
              "Stage 1 — Before Assignment",
              "Cancelled before a courier is assigned to the booking.",
              <>
                <strong className="text-navy-900">100% refund or credit</strong>{" "}
                (less any non-refundable third-party charges expressly disclosed
                at booking). Removed from invoice for credit accounts.
              </>,
            ],
            [
              "Stage 2 — After Assignment",
              "Cancelled after courier assignment, but prior to physical collection.",
              <>
                Cancellation fee of{" "}
                <strong className="text-navy-900">up to 25%</strong> of the
                delivery charge. Waived if the assigned courier is reallocated
                without operational loss.
              </>,
            ],
            [
              "Stage 3 — After Pickup",
              "Cancelled after the consignment has been collected from the sender.",
              <>
                <strong className="text-navy-900">No full refund.</strong>{" "}
                Handled as a return to sender, redirection, or reschedule;
                charges apply for transport already completed.
              </>,
            ],
            [
              "Stage 4 — In Transit / Dispatched",
              "Cancelled after hub dispatch while en route to destination.",
              <>
                <strong className="text-navy-900">
                  Full transit &amp; return costs apply,
                </strong>{" "}
                including return mileage, waiting time, and any special vault or
                security handling.
              </>,
            ],
          ]}
        />
      </PolicySection>

      {/* 3. Failed Delivery & Recipient Unavailability */}
      <PolicySection section={SECTIONS[2]}>
        <p>
          If handover cannot be completed because the recipient is unreachable,
          refuses receipt, cannot be located, or fails mandatory identity or
          authorization checks, Luminex notifies the sender immediately to
          confirm one of four actions:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reschedule delivery to a confirmed time window;</li>
          <li>Deliver to a verified, pre-authorized alternative recipient;</li>
          <li>Return the consignment directly to the sender; or</li>
          <li>Hold the consignment securely for an agreed instruction.</li>
        </ul>

        <PolicyCallout title="Courtesy Redelivery Allowance (2 Attempts)">
          <p>
            Luminex provides up to{" "}
            <strong>two courtesy redelivery attempts</strong> at no extra
            delivery fee. If handover still cannot be completed after the second
            attempt, the consignment is logged into our Accra central vault for
            safekeeping and standard return or holding charges apply.
          </p>
        </PolicyCallout>
      </PolicySection>

      {/* 4. Rescheduling Schedule */}
      <PolicySection section={SECTIONS[3]}>
        <p>
          Customers may request changes to pickup or delivery windows subject to
          the schedule below:
        </p>

        <PolicyTable
          headers={["Scenario", "Condition", "Fee Treatment"]}
          rows={[
            [
              "Before Courier Assignment",
              "Time window updated before dispatch allocation.",
              <strong key="r1" className="text-navy-900">
                No fee.
              </strong>,
            ],
            [
              "After Assignment (Pre-Pickup)",
              "Courier already assigned or en route to pickup.",
              "Rescheduling fee applies only if additional mileage or idle time is incurred.",
            ],
            [
              "After Collection",
              "Consignment already in Luminex custody.",
              "Treated as a new routing instruction; applicable transit or vault-holding fees apply.",
            ],
            [
              "Luminex Operational Delay",
              "Delivery missed due to a fault within Luminex's control.",
              <>
                <strong className="text-navy-900">No fee.</strong> Priority
                re-dispatch plus applicable SLA credits for contract clients.
              </>,
            ],
            [
              "Force Majeure",
              "Severe flooding, road closures, telecom outages, or civil disruption.",
              "Rescheduled at earliest safe window without penalty unless extraordinary rerouting is requested and agreed.",
            ],
          ]}
        />
      </PolicySection>

      {/* 5. Refund Eligibility */}
      <PolicySection section={SECTIONS[4]}>
        <p>
          <strong className="text-navy-900">Luminex-Caused Failure:</strong> If
          Luminex fails to complete a consignment due to our own operational
          error, the customer is entitled to a full or partial refund, a
          no-charge replacement delivery, an account credit, or contractual SLA
          credits.
        </p>
        <p>
          <strong className="text-navy-900">Customer-Caused Failure:</strong>{" "}
          Refunds are not issued where non-delivery results from inaccurate
          addresses, recipient unavailability, failure to present valid ID or
          handover authorization, late cancellation after pickup, or prohibited
          / improperly sealed items.
        </p>
        <p>
          <strong className="text-navy-900">Duplicate Bookings:</strong>{" "}
          Accidental duplicate bookings reported before courier assignment are
          cancelled and refunded in full with zero penalty. Once dispatched,
          standard stage charges apply.
        </p>
      </PolicySection>

      {/* 6. Review & Settlement Timelines */}
      <PolicySection section={SECTIONS[5]}>
        <p>
          To submit a refund claim, provide your{" "}
          <strong className="text-navy-900">Customer Name</strong>,{" "}
          <strong className="text-navy-900">
            Consignment Security Number (CSN)
          </strong>
          , <strong className="text-navy-900">Booking Date</strong>, and{" "}
          <strong className="text-navy-900">Reason for Claim</strong> to our
          Customer Relations Office.
        </p>

        <PolicyTable
          headers={["Milestone", "Standard Turnaround", "Settlement Method"]}
          rows={[
            [
              "Claim Acknowledgment",
              "Within 1 business day of receipt.",
              "Written confirmation via email or WhatsApp ticket.",
            ],
            [
              "Investigation & Decision",
              "Within 3–5 business days.",
              "Audit of dispatch logs, GPS telemetry, and courier handover records.",
            ],
            [
              "Approved Refund Payout",
              "Processed immediately upon approval.",
              "Credited to original payment channel (Mobile Money / bank transfer) or applied to monthly corporate invoice.",
            ],
          ]}
        />
      </PolicySection>

      {/* 7. Sensitive Consignments */}
      <PolicySection section={SECTIONS[6]}>
        <PolicyCallout
          title="Mandatory Identity Verification on Redirections"
          variant="important"
        >
          <p>
            Because Luminex transports high-value legal filings, tenders,
            diplomatic correspondence, and financial instruments, mid-transit
            cancellations or address redirections require direct sender identity
            verification. Luminex will refuse any redirection that cannot be
            authenticated to prevent unauthorized interception.
          </p>
        </PolicyCallout>
      </PolicySection>

      {/* 8. Customer Relations Office */}
      <PolicySection section={SECTIONS[7]}>
        <p>
          Direct all cancellation, rescheduling, and refund requests to our
          Customer Relations Office:
        </p>
        <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-5 space-y-2 text-xs sm:text-sm text-slate-700">
          <p>
            <strong className="text-navy-900">Office:</strong> Luminex Logistics
            Customer Relations Office
          </p>
          <p>
            <strong className="text-navy-900">Telephone / WhatsApp:</strong>{" "}
            <a
              href="tel:+233596464461"
              className="text-brand-red-600 hover:underline whitespace-nowrap"
            >
              +233 59 646 4461
            </a>{" "}
            <span className="text-slate-400">·</span>{" "}
            <a
              href="https://wa.me/233596464461"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red-600 hover:underline"
            >
              Chat on WhatsApp
            </a>
          </p>
          <p>
            <strong className="text-navy-900">Email:</strong>{" "}
            <a
              href="mailto:luminexlogisticsltd@gmail.com"
              className="text-brand-red-600 hover:underline"
            >
              luminexlogisticsltd@gmail.com
            </a>
          </p>
          <p>
            <strong className="text-navy-900">Address:</strong> H302 Sowah Larbi
            Ave, Accra, Ghana
          </p>
        </div>
      </PolicySection>
    </PolicyLayout>
  );
}
