import React from "react";
import { Metadata } from "next";
import PolicyLayout, {
  PolicySection,
  PolicyCallout,
  PolicyTable,
  type PolicySectionDef,
} from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Luminex Logistics",
  description:
    "Official Privacy Policy detailing personal data processing, SentrySafe code-secured delivery protocols, AI logistics, and compliance with Ghana's Data Protection Act (Act 843).",
};

const SECTIONS = [
  {
    id: "data-controller",
    number: 1,
    navLabel: "Data Controller & Processor",
    title: "Data Controller & Processor Roles",
  },
  {
    id: "information-collected",
    number: 2,
    navLabel: "Information We Collect",
    title: "Information We Collect",
  },
  {
    id: "how-we-use-data",
    number: 3,
    navLabel: "How We Use Information",
    title: "How We Use Personal Information",
  },
  {
    id: "ai-systems",
    number: 4,
    navLabel: "AI & Automated Routing",
    title: "AI & Automated Routing Systems",
  },
  {
    id: "document-confidentiality",
    number: 5,
    navLabel: "Document Confidentiality",
    title: "Confidential Consignment Controls",
  },
  {
    id: "legal-basis",
    number: 6,
    navLabel: "Lawful Basis (Act 843)",
    title: "Lawful Basis for Processing under Act 843",
  },
  {
    id: "data-sharing",
    number: 7,
    navLabel: "Third-Party Disclosures",
    title: "Third-Party Processors & Disclosures",
  },
  {
    id: "international-transfers",
    number: 8,
    navLabel: "Cross-Border Transfers",
    title: "Cross-Border Cloud Processing",
  },
  {
    id: "security-breach",
    number: 9,
    navLabel: "Security & Breach Response",
    title: "Data Security & Incident Notification",
  },
  {
    id: "data-retention",
    number: 10,
    navLabel: "Retention & Disposal",
    title: "Data Retention & Disposal",
  },
  {
    id: "your-rights",
    number: 11,
    navLabel: "Statutory Data Rights",
    title: "Your Statutory Rights under Act 843",
  },
  {
    id: "cookies",
    number: 12,
    navLabel: "Cookies, Alerts & Minors",
    title: "Cookies, Transactional Alerts & Minors",
  },
  {
    id: "contact",
    number: 13,
    navLabel: "Data Protection Desk",
    title: "Contact Our Data Protection Desk",
  },
] as const satisfies readonly PolicySectionDef[];

export default function PrivacyPage() {
  return (
    <PolicyLayout
      category="Data Protection & Privacy"
      title="Privacy Policy"
      summary="How Luminex Logistics Ltd. collects, safeguards, retains, and processes personal data and chain-of-custody records in compliance with Ghana's Data Protection Act, 2012 (Act 843)."
      effectiveDate="January 1, 2026"
      version="Version 1.2"
      currentPath="/privacy"
      sections={SECTIONS}
    >
      {/* 1. Data Controller & Processor */}
      <PolicySection section={SECTIONS[0]}>
        <p>
          For personal information collected directly from website visitors,
          individual senders, and account holders where we determine the
          purposes and means of processing, Luminex Logistics Ltd. acts as the{" "}
          <strong className="text-navy-900">Data Controller</strong>.
        </p>
        <p>
          Where Luminex executes deliveries on behalf of an institutional or
          corporate client and processes recipient details strictly under that
          client&rsquo;s instructions, Luminex acts as a{" "}
          <strong className="text-navy-900">Data Processor</strong> in
          accordance with Ghanaian law and our contractual confidentiality
          obligations.
        </p>

        <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-4 sm:p-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
          <p>
            <strong className="text-navy-900">Corporate Entity:</strong> Luminex
            Logistics Ltd. (Registration No.{" "}
            <span className="font-mono">CS120930824</span>)
          </p>
          <p>
            <strong className="text-navy-900">Registered Office:</strong> H302
            Sowah Larbi Ave, Accra, Ghana
          </p>
          <p>
            <strong className="text-navy-900">Email:</strong>{" "}
            luminexlogisticsltd@gmail.com |{" "}
            <strong className="text-navy-900">Telephone:</strong> +233 59 646
            4461
          </p>
        </div>
      </PolicySection>

      {/* 2. Information We Collect */}
      <PolicySection section={SECTIONS[1]}>
        <p>
          We collect only the operational, verification, and technical records
          required to execute secure document transit and maintain an auditable
          chain of custody:
        </p>

        <PolicyTable
          headers={["Data Category", "Records Collected"]}
          rows={[
            [
              "Customer & Account Records",
              "Full legal name, organisation name, telephone number, email address, physical or Ghana Post GPS address, billing records, and support correspondence.",
            ],
            [
              "Sender & Recipient Verification",
              "Designated sender and recipient names, active contact numbers, government ID verification type at handover, signatures, OTP confirmations, and proof-of-delivery records.",
            ],
            [
              "Consignment & Telemetry Logs",
              "Unique Consignment Security Numbers (CSN), pickup and destination coordinates, dispatch timestamps, courier assignment logs, and custody milestones.",
            ],
            [
              "Platform & Security Diagnostics",
              "IP addresses, browser/device metadata, rate-limiting security logs, and session cookies necessary to protect booking and tracking endpoints.",
            ],
          ]}
        />

        <PolicyCallout title="Zero-Access Physical Document Protocol (Code-Secured SentrySafe)">
          <p>
            Luminex never opens or reads the contents of consigned documents.
            For high-security transfers, consignments travel inside code-secured
            hardware safes (such as SentrySafe). The unlock code is transmitted{" "}
            <strong>only to the verified recipient on the day of delivery</strong>{" "}
            via SMS or encrypted email, ensuring couriers and third parties have
            zero physical access to enclosed contents.
          </p>
        </PolicyCallout>
      </PolicySection>

      {/* 3. How We Use Information */}
      <PolicySection section={SECTIONS[2]}>
        <p>
          Personal data is processed strictly for legitimate logistics, security,
          and statutory purposes:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Scheduling and completing document pickups and handovers;</li>
          <li>Verifying recipient identity and doorstep delivery authorization;</li>
          <li>Recording real-time Consignment Security Number (CSN) audit trails;</li>
          <li>Settling Mobile Money, bank transfer, and corporate invoice billing;</li>
          <li>Handling Customer Relations Office inquiries and refund claims;</li>
          <li>Preventing fraudulent bookings and unauthorized interceptions; and</li>
          <li>Complying with Ghanaian tax, licensing, and judicial obligations.</li>
        </ul>
        <p>
          Luminex never sells, rents, or trades customer or recipient data to
          advertisers or data brokers.
        </p>
      </PolicySection>

      {/* 4. AI & Automated Routing */}
      <PolicySection section={SECTIONS[3]}>
        <p>
          Luminex uses algorithmic routing tools to assist dispatchers with
          courier allocation, ETA estimation, and anomaly detection. Automated
          tools support—but never replace—human operational oversight. Any
          decision that could materially affect a customer&rsquo;s service access
          or legal rights is subject to human review.
        </p>
      </PolicySection>

      {/* 5. Document Confidentiality */}
      <PolicySection section={SECTIONS[4]}>
        <p>
          Physical and digital custody records are governed by strict internal
          controls ensuring that consigned documents are:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Collected solely for authorized transit instructions;</li>
          <li>Handled exclusively by vetted, credentialed Luminex couriers;</li>
          <li>Protected in tamper-evident pouches or locked transit safes;</li>
          <li>Released strictly to authenticated recipients; and</li>
          <li>Retained in logs only as long as required for legal auditability.</li>
        </ul>
      </PolicySection>

      {/* 6. Lawful Basis */}
      <PolicySection section={SECTIONS[5]}>
        <p>
          Under Ghana&rsquo;s Data Protection Act, 2012 (Act 843), Luminex
          processes personal data on one or more of the following lawful bases:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong className="text-navy-900">Contract Performance:</strong>{" "}
            Fulfilling a booking or institutional logistics agreement, including
            pre-contractual intake steps initiated at your request;
          </li>
          <li>
            <strong className="text-navy-900">Legal Obligation:</strong>{" "}
            Satisfying statutory courier licensing, tax, or regulatory duties;
          </li>
          <li>
            <strong className="text-navy-900">Legitimate Interests:</strong>{" "}
            Maintaining fleet security, chain-of-custody verification, and fraud
            prevention where individual rights are not overridden; and
          </li>
          <li>
            <strong className="text-navy-900">Consent:</strong> For optional
            analytics cookies or non-essential communications, which may be
            withdrawn at any time.
          </li>
        </ul>
      </PolicySection>

      {/* 7. Third-Party Disclosures */}
      <PolicySection section={SECTIONS[6]}>
        <p>
          Information is shared only on a strict need-to-know basis with:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong className="text-navy-900">Infrastructure Providers:</strong>{" "}
            Cloud database hosting, SMS/email notification gateways, and mapping
            services bound by written confidentiality and Act 843 data-protection
            clauses;
          </li>
          <li>
            <strong className="text-navy-900">Contracting Institutions:</strong>{" "}
            When delivering on behalf of a bank, law firm, or enterprise client,
            Proof of Delivery (POD) and custody timestamps are reported back to
            the instructing institution; and
          </li>
          <li>
            <strong className="text-navy-900">Public Authorities:</strong>{" "}
            Strictly in response to a valid court order, warrant, or statutory
            directive under Ghanaian law.
          </li>
        </ul>
      </PolicySection>

      {/* 8. Cross-Border Transfers */}
      <PolicySection section={SECTIONS[7]}>
        <p>
          Where cloud infrastructure or transactional email gateways process
          encrypted records outside Ghana, Luminex ensures appropriate technical
          encryption (TLS in transit and encryption at rest) and contractual
          data-transfer safeguards aligned with Act 843.
        </p>
      </PolicySection>

      {/* 9. Security & Breach Response */}
      <PolicySection section={SECTIONS[8]}>
        <p>
          Luminex enforces role-based access control, TLS encryption, server
          audit logging, rate limiting, and mandatory courier vetting across
          all operations.
        </p>

        <PolicyCallout
          title="Statutory Breach Notification Protocol (Act 843)"
          variant="important"
        >
          <p>
            In the event of a confirmed or reasonably suspected compromise of
            personal data, Luminex will immediately isolate affected systems,
            conduct forensic containment, notify the{" "}
            <strong>Ghana Data Protection Commission (DPC)</strong>, and notify
            affected clients and individuals in accordance with statutory
            timelines under Act 843.
          </p>
        </PolicyCallout>
      </PolicySection>

      {/* 10. Retention & Disposal */}
      <PolicySection section={SECTIONS[9]}>
        <p>
          Custody logs, Proof of Delivery records, and billing documentation are
          retained only for the duration needed to complete deliveries, resolve
          disputes or refund claims, and meet statutory accounting and legal
          retention periods in Ghana. Expired records are permanently deleted or
          anonymized.
        </p>
      </PolicySection>

      {/* 11. Statutory Rights */}
      <PolicySection section={SECTIONS[10]}>
        <p>
          Subject to statutory verification and legal retention obligations,
          individuals and corporate contacts have the right to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Be informed of how personal data is collected and used;</li>
          <li>Request access to personal records held by Luminex;</li>
          <li>Request correction of inaccurate or incomplete details;</li>
          <li>Object to or request cessation of specific processing;</li>
          <li>Request deletion or destruction of data where legally applicable;</li>
          <li>Withdraw consent for optional processing at any time; and</li>
          <li>
            Lodge a formal complaint with the{" "}
            <strong className="text-navy-900">
              Ghana Data Protection Commission (DPC)
            </strong>
            .
          </li>
        </ul>
      </PolicySection>

      {/* 12. Cookies, Alerts & Minors — id="cookies" linked by CookieConsent */}
      <PolicySection section={SECTIONS[11]}>
        <p>
          Essential cookies and local storage preserve site security, rate
          limiting, and your cookie consent choice. Optional analytics cookies
          are activated only if you select <strong>Accept All</strong> on our
          consent banner. Transactional Consignment Security Number (CSN)
          dispatch alerts are part of service execution and cannot be opted out
          of during an active delivery.
        </p>
        <p>
          Luminex services are intended for adults and registered organisations;
          we do not knowingly collect personal information from minors.
        </p>
      </PolicySection>

      {/* 13. Data Protection Desk */}
      <PolicySection section={SECTIONS[12]}>
        <p>
          To exercise your rights under Act 843 or submit a privacy inquiry,
          contact our Data Protection Desk or Customer Relations Office:
        </p>
        <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-5 space-y-2 text-xs sm:text-sm text-slate-700">
          <p>
            <strong className="text-navy-900">Office:</strong> Luminex Logistics
            Data Protection Desk &amp; Customer Relations Office
          </p>
          <p>
            <strong className="text-navy-900">Entity:</strong> Luminex Logistics
            Ltd. (Registration No.{" "}
            <span className="font-mono">CS120930824</span>)
          </p>
          <p>
            <strong className="text-navy-900">Telephone / WhatsApp:</strong>{" "}
            <a
              href="tel:+233596464461"
              className="text-brand-red-600 hover:underline whitespace-nowrap"
            >
              +233 59 646 4461
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
