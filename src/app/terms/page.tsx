import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import PolicyLayout, {
  PolicySection,
  PolicyCallout,
  PolicyTable,
  type PolicySectionDef,
} from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms and Conditions of Service | Luminex Logistics",
  description:
    "Official Terms and Conditions governing logistics, document transit, tracking, and technology services provided by Luminex Logistics Ltd. across Ghana.",
};

const SECTIONS = [
  {
    id: "services",
    number: 1,
    navLabel: "Services Covered",
    title: "Services Covered",
  },
  {
    id: "booking",
    number: 2,
    navLabel: "Booking a Consignment",
    title: "Booking a Consignment",
  },
  {
    id: "customer-duties",
    number: 3,
    navLabel: "Customer Responsibilities",
    title: "Customer Responsibilities",
  },
  {
    id: "prohibited-items",
    number: 4,
    navLabel: "Prohibited Items",
    title: "Prohibited Items",
  },
  {
    id: "sensitive-documents",
    number: 5,
    navLabel: "Sensitive Documents",
    title: "Sensitive & Confidential Documents",
  },
  {
    id: "recipient-verification",
    number: 6,
    navLabel: "Recipient Verification",
    title: "Recipient Verification & Doorstep Handover",
  },
  {
    id: "delivery-times",
    number: 7,
    navLabel: "Delivery Windows",
    title: "Delivery Windows",
  },
  {
    id: "failed-deliveries",
    number: 8,
    navLabel: "Failed Deliveries & Vault",
    title: "Failed Deliveries & Courtesy Redelivery",
  },
  {
    id: "proof-of-delivery",
    number: 9,
    navLabel: "Proof of Delivery (POD)",
    title: "Proof of Delivery (POD)",
  },
  {
    id: "fees-payment",
    number: 10,
    navLabel: "Fees & Act 772 Disclosures",
    title: "Fees, Payment & Statutory Disclosures (Act 772)",
  },
  {
    id: "cancellations",
    number: 11,
    navLabel: "Cancellations & Refunds",
    title: "Cancellations & Refunds",
  },
  {
    id: "claims",
    number: 12,
    navLabel: "Loss, Damage & Misdelivery",
    title: "Loss, Damage or Misdelivery Claims",
  },
  {
    id: "liability",
    number: 13,
    navLabel: "Limitation of Liability",
    title: "Limitation of Liability",
  },
  {
    id: "indemnity",
    number: 14,
    navLabel: "Customer Indemnity",
    title: "Customer Indemnity",
  },
  {
    id: "privacy-reference",
    number: 15,
    navLabel: "Privacy & Data Protection",
    title: "Privacy & Data Protection",
  },
  {
    id: "intellectual-property",
    number: 16,
    navLabel: "Intellectual Property",
    title: "Intellectual Property",
  },
  {
    id: "automated-systems",
    number: 17,
    navLabel: "AI & Routing Oversight",
    title: "AI & Routing Oversight",
  },
  {
    id: "account-security",
    number: 18,
    navLabel: "Corporate Account Security",
    title: "Corporate Account Security",
  },
  {
    id: "suspension",
    number: 19,
    navLabel: "Suspension & Termination",
    title: "Suspension or Termination",
  },
  {
    id: "force-majeure",
    number: 20,
    navLabel: "Force Majeure",
    title: "Force Majeure",
  },
  {
    id: "disputes",
    number: 21,
    navLabel: "Dispute Resolution",
    title: "Dispute Resolution",
  },
  {
    id: "governing-law",
    number: 22,
    navLabel: "Governing Law",
    title: "Governing Law & Jurisdiction",
  },
  {
    id: "entire-agreement",
    number: 23,
    navLabel: "Electronic Acceptance",
    title: "Electronic Acceptance & Entire Agreement",
  },
  {
    id: "contact",
    number: 24,
    navLabel: "Official Contact",
    title: "Official Contact & Legal Notices",
  },
] as const satisfies readonly PolicySectionDef[];

export default function TermsPage() {
  return (
    <PolicyLayout
      category="Terms of Service"
      title="Terms & Conditions of Service"
      summary="Legally binding terms governing document collection, chain-of-custody transit, tracking, and corporate portal services provided by Luminex Logistics Ltd. By booking or using a Luminex service on behalf of yourself or an organisation, you agree to these Terms."
      effectiveDate="January 1, 2026"
      version="Version 1.2"
      currentPath="/terms"
      sections={SECTIONS}
    >
      {/* 1. Services Covered */}
      <PolicySection section={SECTIONS[0]}>
        <p>
          Luminex Logistics Ltd. (&ldquo;Luminex&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;, or &ldquo;our&rdquo;) provides secure document and
          corporate courier services across Ghana, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Point-to-point legal, financial, diplomatic, and corporate document transit;</li>
          <li>Scheduled recurring dispatches and priority on-demand collections;</li>
          <li>Consignment Security Number (CSN) tracking and chain-of-custody logging;</li>
          <li>Doorstep recipient identity verification and Proof of Delivery (POD); and</li>
          <li>Temporary central vault holding and failed-handover recovery.</li>
        </ul>
        <p>
          Service availability, transit pricing, and turnaround windows depend
          on route distance, security tier, and prevailing operating conditions.
        </p>
      </PolicySection>

      {/* 2. Booking a Consignment */}
      <PolicySection section={SECTIONS[1]}>
        <p>
          Bookings may be placed via our website, WhatsApp dispatch desk,
          Customer Relations Office, or corporate portal. Customers must provide
          accurate, complete instructions at booking:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Full legal names of the sender and designated recipient;</li>
          <li>Accurate physical or Ghana Post GPS pickup and destination addresses;</li>
          <li>Active telephone numbers for both sender and recipient; and</li>
          <li>Consignment type, requested timeframe, and any special security directives.</li>
        </ul>
        <p>
          Luminex may decline, hold, or reschedule any booking where supplied
          details are incomplete, unverifiable, or unsafe to execute.
        </p>
      </PolicySection>

      {/* 3. Customer Responsibilities */}
      <PolicySection section={SECTIONS[2]}>
        <p>By tendering a consignment, the Customer warrants that:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>They have lawful authority to dispatch the consigned documents or items;</li>
          <li>All contents comply fully with the laws of the Republic of Ghana;</li>
          <li>Items are sealed in appropriate envelopes or tamper-evident packaging prior to collection;</li>
          <li>Required recipient authorizations have been obtained in advance; and</li>
          <li>No false sender, recipient, or content declarations have been made.</li>
        </ul>
      </PolicySection>

      {/* 4. Prohibited Items */}
      <PolicySection section={SECTIONS[3]}>
        <p>
          Unless expressly authorized in a signed written contract and permitted
          by law, Luminex strictly prohibits tendering any of the following:
        </p>

        <PolicyTable
          headers={["Category", "Prohibited Materials"]}
          rows={[
            [
              "Controlled & Unlawful Goods",
              "Illegal narcotics, controlled substances, counterfeit items, contraband, or stolen property.",
            ],
            [
              "Weapons & Explosives",
              "Firearms, ammunition, ordnance, fireworks, or explosive components.",
            ],
            [
              "Hazardous Materials",
              "Flammable liquids, compressed gases, corrosives, toxic chemicals, or radioactive materials.",
            ],
            [
              "Biological & Perishable Items",
              "Live animals, unapproved biological specimens, or perishables requiring active refrigeration.",
            ],
            [
              "Uninsured Cash",
              "Loose currency, bearer cash, or undeclared negotiable cash equivalents.",
            ],
          ]}
        />

        <PolicyCallout
          title="Right to Refuse, Suspend & Report"
          variant="important"
        >
          <p>
            Luminex reserves the unconditional right to inspect outer packaging,
            refuse or suspend transit where prohibited or dangerous items are
            suspected, and report unlawful consignments to Ghanaian law
            enforcement authorities.
          </p>
        </PolicyCallout>
      </PolicySection>

      {/* 5. Sensitive Documents */}
      <PolicySection section={SECTIONS[4]}>
        <p>
          While Luminex maintains strict physical chain-of-custody protocols,
          the Customer remains responsible for sealing documents prior to intake
          and declaring any heightened custody requirements (such as
          code-secured SentrySafe hardware safes or dedicated riders) at the
          time of booking.
        </p>
      </PolicySection>

      {/* 6. Recipient Verification */}
      <PolicySection section={SECTIONS[5]}>
        <p>
          Prior to releasing a consignment, Luminex couriers may require one or
          more of the following checks:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Valid government-issued photo ID (Ghana Card, Passport, or Driver&rsquo;s License);</li>
          <li>One-time password (OTP) or direct telephone confirmation;</li>
          <li>Digital signature capture or corporate registry stamp; and</li>
          <li>Handover timestamp and location log.</li>
        </ul>
        <p>
          If the recipient cannot satisfy required verification, the courier
          will withhold release and record an unsuccessful delivery attempt to
          protect the sender&rsquo;s chain of custody.
        </p>
      </PolicySection>

      {/* 7. Delivery Windows */}
      <PolicySection section={SECTIONS[6]}>
        <p>
          Communicated pickup and delivery windows are operational estimates
          unless expressly executed in writing as a guaranteed Service Level
          Agreement (SLA). Transit times may be affected by traffic conditions,
          severe weather, road closures, or recipient delays outside
          Luminex&rsquo;s control.
        </p>
      </PolicySection>

      {/* 8. Failed Deliveries */}
      <PolicySection section={SECTIONS[7]}>
        <PolicyCallout title="Courtesy Redelivery Standard (2 Attempts)">
          <p>
            Where a recipient is unavailable, refuses delivery, or fails
            verification, Luminex provides up to{" "}
            <strong>two courtesy redelivery attempts</strong>. If handover
            remains unfulfilled after two attempts, the consignment returns to
            our Accra central vault while our team contacts the sender for
            return or holding instructions.
          </p>
        </PolicyCallout>
      </PolicySection>

      {/* 9. Proof of Delivery */}
      <PolicySection section={SECTIONS[8]}>
        <p>
          Proof of Delivery records—including recipient name, verification
          reference, digital signature, OTP confirmation, and GPS timestamp—are
          logged against the Consignment Security Number (CSN) for operational
          and legal audit readiness under Ghanaian law.
        </p>
      </PolicySection>

      {/* 10. Fees & Payment */}
      <PolicySection section={SECTIONS[9]}>
        <p>
          Service charges are confirmed before dispatch based on route distance,
          urgency tier, waiting time, security handling, and applicable taxes.
          In compliance with Ghana&rsquo;s Electronic Transactions Act, 2008
          (Act 772), digital and WhatsApp bookings clearly disclose service
          scope, pricing, and accepted settlement methods (Mobile Money, bank
          transfer, cash on collection, or approved monthly corporate invoicing)
          prior to commitment.
        </p>
      </PolicySection>

      {/* 11. Cancellations & Refunds */}
      <PolicySection section={SECTIONS[10]}>
        <p>
          Bookings cancelled before courier assignment receive a 100% refund or
          invoice credit. Once a courier has been assigned, collected the item,
          or dispatched, stage-based fees apply as set out in our{" "}
          <Link
            href="/refund"
            className="text-brand-red-600 font-semibold hover:underline"
          >
            Refund, Cancellation &amp; Rescheduling Policy
          </Link>
          .
        </p>
      </PolicySection>

      {/* 12. Claims */}
      <PolicySection section={SECTIONS[11]}>
        <p>
          Any suspected loss, physical damage, or misdelivery while in Luminex
          custody must be reported promptly to our Customer Relations Office
          quoting your Consignment Security Number (CSN). Institutional clients
          shipping instruments of extraordinary commercial importance are
          advised to execute a Master Services Agreement or declared-value
          security rider prior to dispatch.
        </p>
      </PolicySection>

      {/* 13. Limitation of Liability */}
      <PolicySection section={SECTIONS[12]}>
        <p>
          To the fullest extent permitted under Ghanaian law, Luminex is not
          liable for indirect, consequential, incidental, or punitive losses
          (including lost business opportunities or downstream commercial delay
          damages). Nothing in these Terms excludes liability that cannot
          lawfully be limited under the laws of Ghana, including fraud or
          willful misconduct. Negotiated liability caps in a signed Master
          Services Agreement apply where executed.
        </p>
      </PolicySection>

      {/* 14. Customer Indemnity */}
      <PolicySection section={SECTIONS[13]}>
        <p>
          The Customer agrees to indemnify and hold harmless Luminex Logistics
          Ltd., its officers, and couriers from claims, fines, or losses arising
          from the Customer&rsquo;s tender of prohibited items, unlawful use of
          services, inaccurate dispatch details, or breach of third-party
          rights, except to the extent caused by Luminex&rsquo;s negligence or
          misconduct.
        </p>
      </PolicySection>

      {/* 15. Privacy */}
      <PolicySection section={SECTIONS[14]}>
        <p>
          Personal data and chain-of-custody logs are processed in accordance
          with Ghana&rsquo;s Data Protection Act, 2012 (Act 843) and our{" "}
          <Link
            href="/privacy"
            className="text-brand-red-600 font-semibold hover:underline"
          >
            Privacy Policy
          </Link>
          , which forms part of these Terms.
        </p>
      </PolicySection>

      {/* 16. Intellectual Property */}
      <PolicySection section={SECTIONS[15]}>
        <p>
          All software, tracking interfaces, trademarks, and proprietary
          dispatch workflows remain the exclusive property of Luminex Logistics
          Ltd. Customers are granted a limited, revocable, non-transferable
          right to access the platform solely to book and track legitimate
          consignments.
        </p>
      </PolicySection>

      {/* 17. Automated Systems */}
      <PolicySection section={SECTIONS[16]}>
        <p>
          Luminex uses algorithmic routing and dispatch software to optimize
          fleet allocation, ETA accuracy, and fraud screening, with human
          oversight maintained over all material customer service and compliance
          decisions.
        </p>
      </PolicySection>

      {/* 18. Account Security */}
      <PolicySection section={SECTIONS[17]}>
        <p>
          Corporate portal holders are responsible for safeguarding login
          credentials and authorized user access. Unauthorized credential
          sharing, impersonation, or attempts to bypass platform security
          controls will result in immediate account suspension.
        </p>
      </PolicySection>

      {/* 19. Suspension & Termination */}
      <PolicySection section={SECTIONS[18]}>
        <p>
          Luminex may suspend or terminate service access for breach of these
          Terms, suspected fraud or security risk, overdue corporate invoices,
          or lawful regulatory directives.
        </p>
      </PolicySection>

      {/* 20. Force Majeure */}
      <PolicySection section={SECTIONS[19]}>
        <p>
          Luminex is not liable for delays or non-performance caused by events
          beyond reasonable operational control, including severe flooding,
          natural disasters, road blockades, civil unrest, utility or telecom
          blackouts, or government restrictions.
        </p>
      </PolicySection>

      {/* 21. Dispute Resolution */}
      <PolicySection section={SECTIONS[20]}>
        <p>
          Parties agree to submit any service dispute first to Luminex&rsquo;s
          Customer Relations Office for prompt good-faith administrative review,
          and may pursue mediation prior to formal court proceedings where
          mutually agreed.
        </p>
      </PolicySection>

      {/* 22. Governing Law */}
      <PolicySection section={SECTIONS[21]}>
        <p>
          These Terms are governed exclusively by the laws of the Republic of
          Ghana. Unresolved disputes fall under the exclusive jurisdiction of
          the courts of competent jurisdiction in Accra, Ghana.
        </p>
      </PolicySection>

      {/* 23. Electronic Acceptance */}
      <PolicySection section={SECTIONS[22]}>
        <p>
          Under Ghana&rsquo;s Electronic Transactions Act, 2008 (Act 772),
          submitting a booking via our website, WhatsApp desk, or corporate
          portal constitutes binding acceptance of these Terms. Together with
          our Privacy Policy, Refund Policy, and any signed Master Services
          Agreement, these Terms form the entire agreement between the parties;
          signed institutional agreements prevail in the event of conflict.
        </p>
      </PolicySection>

      {/* 24. Official Contact */}
      <PolicySection section={SECTIONS[23]}>
        <p>
          Direct legal notices, institutional contract inquiries, and customer
          relations escalations to:
        </p>
        <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-5 space-y-2 text-xs sm:text-sm text-slate-700">
          <p>
            <strong className="text-navy-900">Entity:</strong> Luminex Logistics
            Ltd. (Registration No.{" "}
            <span className="font-mono">CS120930824</span>)
          </p>
          <p>
            <strong className="text-navy-900">Office:</strong> Customer
            Relations Office &amp; Operations Desk
          </p>
          <p>
            <strong className="text-navy-900">Telephones:</strong>{" "}
            <a
              href="tel:+233596464461"
              className="text-brand-red-600 hover:underline whitespace-nowrap"
            >
              +233 59 646 4461
            </a>{" "}
            <span className="text-slate-400">(Customer Relations)</span>{" "}
            <span className="text-slate-300">/</span>{" "}
            <a
              href="tel:+233545975896"
              className="text-brand-red-600 hover:underline whitespace-nowrap"
            >
              +233 54 597 5896
            </a>{" "}
            <span className="text-slate-400">(Dispatch)</span>
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
