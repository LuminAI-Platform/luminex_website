import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  FileText,
  AlertTriangle,
  Truck,
  Lock,
  CheckCircle2,
  Clock,
  CreditCard,
  RotateCcw,
  Building2,
  Bot,
  UserCheck,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions of Service | Luminex Logistics",
  description:
    "Official Terms and Conditions governing logistics, document transit, tracking, and technology services provided by Luminex Logistics Ltd. across Ghana.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* ── Page Header ────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-900 tracking-tight">
              Terms & Conditions of Service
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 pl-4 font-mono">
            Republic of Ghana | Luminex Logistics Ltd. | Registration No. CS120930824
          </p>
        </div>

        {/* ── Summary Callout Banner ─────────────────────────────── */}
        <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-900 flex flex-col sm:flex-row items-start gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-brand-red-500/20 text-brand-red-500 flex items-center justify-center shrink-0 border border-brand-red-500/30">
            <Scale className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-navy-900 border border-navy-800 px-3 py-0.5 rounded-full text-xs font-semibold text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-brand-red-500" />
              Legally Binding Agreement
            </div>
            <h3 className="font-bold text-white text-base sm:text-lg">
              Institutional Logistics Framework
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              These Terms govern the use of logistics, delivery, collection, tracking, technology, and related services provided by Luminex Logistics (&ldquo;Luminex&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By requesting, booking, accepting, or using a Luminex service, you (&ldquo;Customer&rdquo;, &ldquo;you&rdquo; or &ldquo;your&rdquo;) agree to these Terms. If using Luminex on behalf of a company, financial institution, law firm, government agency, healthcare organisation, or school, you confirm that you have legal authority to bind that organisation.
            </p>
          </div>
        </div>

        {/* ── Core Terms Document ────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 space-y-10 text-sm text-slate-600 leading-relaxed shadow-xs">
          {/* Section 1: Our Services */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Truck className="w-5 h-5 text-brand-red-500 shrink-0" />
              1. Our Services
            </h2>
            <p>
              Luminex provides technology-enabled logistics and courier solutions that may include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
              <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
                Document collection & secure delivery
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
                Secure institutional & legal deliveries
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
                Scheduled and on-demand dispatches
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
                Same-day & priority courier routing
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
                Real-time tracking & proof of delivery (POD)
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
                Doorstep recipient verification protocols
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
                Route optimisation & live notifications
              </li>
              <li className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
                Vault returns & failed-delivery management
              </li>
            </ul>
            <p className="text-xs text-slate-500 pt-1">
              Specific service availability, pricing, and delivery timelines may vary based on geographic location, package characteristics, and prevailing operational circumstances.
            </p>
          </section>

          {/* Section 2: Booking a Delivery */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-brand-red-500 shrink-0" />
              2. Booking a Delivery
            </h2>
            <p>
              Delivery requests may be logged via our website, WhatsApp dispatch desk, customer relations channels, institutional portal, or another authorized mechanism. The Customer must supply complete, accurate details, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Sender and authorized recipient full legal names;</li>
              <li>Precise digital address, GPS coordinate, or physical pickup and delivery locations;</li>
              <li>Active telephone contact numbers (WhatsApp enabled preferred);</li>
              <li>Specific delivery instructions and required service timeframes; and</li>
              <li>Document or consignment description and any specialized handling or security directives.</li>
            </ul>
            <p className="text-xs text-slate-500">
              Luminex reserves the right to reject, hold, or delay any delivery where supplied information is materially inaccurate, incomplete, or insufficient to safely execute the assignment.
            </p>
          </section>

          {/* Section 3: Customer Responsibilities */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <UserCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              3. Customer Responsibilities
            </h2>
            <p>The Customer warrants and is strictly responsible for ensuring that:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>They possess lawful authority to transfer and dispatch the item or document;</li>
              <li>The consignment contents are fully compliant with the laws of Ghana;</li>
              <li>Recipient and destination particulars provided to Luminex are accurate;</li>
              <li>Consignments are securely and appropriately packaged prior to courier intake;</li>
              <li>Required recipient authorizations or consents have been secured; and</li>
              <li>Luminex services are not used to facilitate fraudulent, unlawful, or deceptive conduct.</li>
            </ul>
            <p className="text-xs text-slate-500">
              Customers must never knowingly provide false information regarding the identity of senders, recipients, or cargo contents.
            </p>
          </section>

          {/* Section 4: Prohibited Items */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <AlertTriangle className="w-5 h-5 text-brand-red-500 shrink-0" />
              4. Prohibited Items
            </h2>
            <p>
              Unless expressly agreed in writing by Luminex and legally sanctioned, standard delivery services strictly prohibit:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
              <span className="p-2 rounded bg-red-50/70 border border-red-100">✕ Illegal narcotics & controlled substances</span>
              <span className="p-2 rounded bg-red-50/70 border border-red-100">✕ Firearms, ammunition & explosives</span>
              <span className="p-2 rounded bg-red-50/70 border border-red-100">✕ Hazardous, toxic or radioactive chemicals</span>
              <span className="p-2 rounded bg-red-50/70 border border-red-100">✕ Flammable substances & compressed gases</span>
              <span className="p-2 rounded bg-red-50/70 border border-red-100">✕ Live animals or biological specimens</span>
              <span className="p-2 rounded bg-red-50/70 border border-red-100">✕ Perishables requiring active refrigeration</span>
              <span className="p-2 rounded bg-red-50/70 border border-red-100">✕ Counterfeit goods, contraband & stolen assets</span>
              <span className="p-2 rounded bg-red-50/70 border border-red-100">✕ Currency or negotiable cash instruments</span>
            </div>
            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
              Luminex reserves the unconditional right to inspect outer packaging, refuse, suspend, or terminate any transit where dangerous, illegal, or prohibited materials are suspected, and report such instances to Ghanaian law enforcement.
            </p>
          </section>

          {/* Section 5: Sensitive and Confidential Documents */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Lock className="w-5 h-5 text-brand-red-500 shrink-0" />
              5. Sensitive & Confidential Documents
            </h2>
            <p>
              Customers acknowledge that Luminex handles sensitive legal, diplomatic, corporate, and medical records. While Luminex maintains robust chain-of-custody protocols, the Customer remains responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Properly sealing documents in tamper-evident envelopes or security pouches;</li>
              <li>Clearly specifying designated recipients and delivery protocols; and</li>
              <li>Communicating any heightened security directives prior to physical intake.</li>
            </ul>
            <p className="text-xs text-slate-500">
              Where enhanced armored escort, vault segregation, or custom non-disclosure protocols apply, dedicated contractual riders may be executed.
            </p>
          </section>

          {/* Section 6: Recipient Verification */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              6. Recipient Verification & Doorstep Handover
            </h2>
            <p>
              To maintain audit-ready security, Luminex may require the recipient to provide verification prior to handover:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Physical government-issued photo ID (Ghana Card, Passport, Driver&rsquo;s License);</li>
              <li>Telephone verification or one-time password (OTP);</li>
              <li>Electronic handwritten signature capture;</li>
              <li>Corporate seal or authorized delegation code; or</li>
              <li>Photographic handover confirmation.</li>
            </ul>
            <p className="text-xs text-slate-500">
              If the recipient cannot satisfy verification requirements, the courier will not release the item, and the delivery will be marked unsuccessful.
            </p>
          </section>

          {/* Section 7: Delivery Times */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Clock className="w-5 h-5 text-brand-red-500 shrink-0" />
              7. Delivery Times
            </h2>
            <p>
              Luminex makes every reasonable effort to satisfy communicated delivery windows. Delivery estimates are indicative and non-guaranteed unless expressly executed in writing as a guaranteed Service Level Agreement (SLA).
            </p>
            <p className="text-xs text-slate-500">
              Transits may be influenced by regional traffic congestion, adverse weather, road closures, civil actions, recipient unavailability, or other conditions outside Luminex&rsquo;s direct control.
            </p>
          </section>

          {/* Section 8: Failed Deliveries & Courtesy Redeliveries */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <RotateCcw className="w-5 h-5 text-brand-red-500 shrink-0" />
              8. Failed Deliveries & Redelivery Protocol
            </h2>
            <p>
              A delivery is deemed unsuccessful if the recipient cannot be located, refuses the parcel, fails identity verification, is unavailable, or if access is restricted.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2">
              <p className="font-bold text-navy-900">Courtesy Redelivery Standard:</p>
              <p>
                Luminex provides <strong>two courtesy redelivery attempts</strong>. If delivery remains uncompleted after two attempts, the package returns to the central Accra warehouse vault for holding while dispatch contacts the sender. Additional return or specialized transit fees may apply.
              </p>
            </div>
          </section>

          {/* Section 9: Proof of Delivery (POD) */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-brand-red-500 shrink-0" />
              9. Proof of Delivery (POD)
            </h2>
            <p>
              Depending on the service tier, Proof of Delivery consists of digital signatures, OTP logs, timestamps, recipient names, courier telemetry, and photographic handover records. The Customer authorizes Luminex to compile and retain such evidence for security, operational, and legal audit compliance under Ghanaian law.
            </p>
          </section>

          {/* Section 10: Fees, Payment & Electronic Transactions Act */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <CreditCard className="w-5 h-5 text-brand-red-500 shrink-0" />
              10. Fees, Payment & Statutory Disclosures
            </h2>
            <p>
              Applicable fees are communicated prior to or at the time of booking. Pricing reflects transit distance, speed tier, package characteristics, waiting time, verification protocols, and applicable statutory taxes.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 space-y-1">
              <p className="font-bold">Ghana Electronic Transactions Act (Act 772) Compliance:</p>
              <p>
                Where orders are initiated through our digital platform or WhatsApp gateway, Luminex provides full transparency regarding service descriptions, price breakdowns, payment channels (Mobile Money, bank transfer, or invoice credit), and fulfillment terms prior to binding commitment.
              </p>
            </div>
          </section>

          {/* Section 11 & 12: Cancellation & Refund Policy */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <RotateCcw className="w-5 h-5 text-brand-red-500 shrink-0" />
              11. Cancellation & Refund Policy
            </h2>
            <p>
              Customers may cancel a delivery prior to courier assignment without penalty. Once a courier is dispatched or collection has occurred, cancellation fees or transportation charges may apply as costs have already been incurred.
            </p>
            <p className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3">
              <strong>Dedicated Policy Reference:</strong> For detailed terms governing the 4 cancellation stages, courtesy attempts, review periods, and refund claims, please review our official{" "}
              <Link href="/refund" className="text-brand-red-600 font-bold underline hover:text-brand-red-700">
                Refund, Cancellation & Rescheduling Policy
              </Link>.
            </p>
          </section>

          {/* Section 13: Loss, Damage or Misdelivery */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <AlertTriangle className="w-5 h-5 text-brand-red-500 shrink-0" />
              12. Loss, Damage or Misdelivery Claims
            </h2>
            <p>
              Luminex exercises professional care in handling consignments. In the rare event of damage, total loss, or misdelivery while under our control, the Customer must notify our Customer Relations Office as soon as reasonably practicable.
            </p>
            <p className="text-xs text-slate-500">
              Because legal and corporate instruments possess high commercial importance but limited physical replacement value, institutional clients are urged to declare high-value riders or execute master service covenants prior to dispatch.
            </p>
          </section>

          {/* Section 14: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Scale className="w-5 h-5 text-brand-red-500 shrink-0" />
              13. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by Ghanaian law, Luminex is not liable for indirect, incidental, special, punitive, or consequential loss, including loss of business profit, anticipated opportunities, or reputational damage.
            </p>
            <p className="text-xs text-slate-500">
              Nothing in these Terms limits or excludes liability that cannot lawfully be limited under the laws of Ghana, including fraud or willful misconduct. For institutional partners, liability may be governed by a separate Master Services Agreement.
            </p>
          </section>

          {/* Section 15: Customer Indemnity */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              14. Customer Indemnity
            </h2>
            <p>
              The Customer agrees to indemnify and hold harmless Luminex Logistics, its officers, couriers, and agents against losses, liabilities, and expenses arising from unlawful use of services, tender of prohibited items, inaccurate sender/recipient data, or infringement of third-party rights, except where caused by Luminex&rsquo;s gross negligence.
            </p>
          </section>

          {/* Section 16: Privacy & Data Protection */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Lock className="w-5 h-5 text-brand-red-500 shrink-0" />
              15. Privacy & Data Protection
            </h2>
            <p>
              All personal identification details, telemetry logs, and contact numbers are processed strictly under Ghana&rsquo;s Data Protection Act (Act 843) and governed by our{" "}
              <Link href="/privacy" className="text-brand-red-600 font-bold underline hover:text-brand-red-700">
                Privacy Policy
              </Link>
              , which forms an integral part of these Terms.
            </p>
          </section>

          {/* Section 17: Intellectual Property */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-brand-red-500 shrink-0" />
              16. Intellectual Property
            </h2>
            <p>
              All rights in Luminex software, tracking algorithms, brand trademarks, website architectures, and proprietary dispatch systems remain the exclusive property of Luminex Logistics Ltd. Customers receive only a limited, non-exclusive license to use the platform for scheduling legitimate deliveries. Reverse engineering or unauthorized distribution is strictly prohibited.
            </p>
          </section>

          {/* Section 18: AI & Automated Decision-Making */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Bot className="w-5 h-5 text-brand-red-500 shrink-0" />
              17. AI & Automated Systems
            </h2>
            <p>
              Luminex utilizes algorithmic and artificial intelligence systems to optimize fleet routing, courier allocation, ETA forecasting, fraud mitigation, and support triage. Human oversight is maintained over all material operational decisions, ensuring automation never unlawfully impairs customer rights.
            </p>
          </section>

          {/* Section 19: Customer Accounts & Security Controls */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <UserCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              18. Customer Accounts & Security Controls
            </h2>
            <p>
              Where corporate accounts are provisioned, customers are responsible for preserving credential confidentiality. Sharing access in an unauthorized manner, impersonating third parties, attempting to circumvent security controls, or introducing malicious code is grounds for immediate termination.
            </p>
          </section>

          {/* Section 20: Suspension or Termination */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <AlertTriangle className="w-5 h-5 text-brand-red-500 shrink-0" />
              19. Suspension or Termination
            </h2>
            <p>
              Luminex may suspend or terminate service access where a customer breaches these Terms, where fraudulent activity or security risks are suspected, where invoices remain unpaid, or where required by statutory authorities.
            </p>
          </section>

          {/* Section 21: Force Majeure */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              20. Force Majeure
            </h2>
            <p>
              Luminex is not liable for delays or fulfillment failures caused by events beyond reasonable operational control, including natural disasters, flooding, epidemic declarations, civil unrest, warfare, road blockades, telecom blackouts, cyberattacks, or extraordinary weather disruptions.
            </p>
          </section>

          {/* Section 22: Dispute Resolution */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Scale className="w-5 h-5 text-brand-red-500 shrink-0" />
              21. Dispute Resolution
            </h2>
            <p>
              Customers agree to first submit any dispute or claim to Luminex for informal administrative review. Where appropriate, parties may explore mediation or alternative dispute resolution prior to formal judicial proceedings.
            </p>
          </section>

          {/* Section 23: Governing Law & Jurisdiction */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Building2 className="w-5 h-5 text-brand-red-500 shrink-0" />
              22. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by, construed, and enforced exclusively in accordance with the laws of the Republic of Ghana. Unresolved legal claims fall within the exclusive jurisdiction of the competent courts in Accra, Ghana.
            </p>
          </section>

          {/* Section 24: Electronic Acceptance & Legal Validity */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-brand-red-500 shrink-0" />
              23. Electronic Acceptance & Entire Agreement
            </h2>
            <p>
              Under the Ghana Electronic Transactions Act (Act 772), booking via our website, WhatsApp, or institutional portal constitutes legally binding acceptance of these Terms.
            </p>
            <p className="text-xs text-slate-500">
              These Terms, together with the Privacy Policy, Refund Policy, and any written institutional contract, represent the complete agreement between the parties. Negotiated institutional master agreements supersede these general terms in the event of direct inconsistency.
            </p>
          </section>

          {/* Section 25: Official Contact Point */}
          <section className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Phone className="w-5 h-5 text-brand-red-500 shrink-0" />
              24. Official Contact & Legal Inquiries
            </h2>
            <p>
              For legal inquiries, contract negotiations, or official notifications under these Terms, contact:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 font-mono text-xs text-navy-900">
              <p><strong>Entity:</strong> Luminex Logistics Ltd. (Registration No. CS120930824)</p>
              <p><strong>Address:</strong> H302 Sowah Larbi Ave, Accra, Ghana</p>
              <p>
                <strong>Telephones:</strong>{" "}
                <a href="tel:+233596464461" className="text-brand-red-600 hover:underline">
                  +233 59 646 4461
                </a>{" "}
                /{" "}
                <a href="tel:+233545975896" className="text-brand-red-600 hover:underline">
                  +233 54 597 5896
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:luminexlogisticsltd@gmail.com" className="text-brand-red-600 hover:underline">
                  luminexlogisticsltd@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Cross Links Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-brand-red-600 hover:underline font-semibold">
                Privacy Policy →
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/refund" className="text-brand-red-600 hover:underline font-semibold">
                Refund Policy →
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-navy-900 hover:text-brand-red-600 font-bold"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Need Assistance? Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}