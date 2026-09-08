import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileCheck,
  Mail,
  Server,
  Key,
  Cpu,
  FileText,
  Phone,
  Globe,
  Clock,
  Building2,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  UserCheck,
  Truck,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Luminex Logistics",
  description:
    "Official Privacy Policy detailing personal data processing, SentrySafe code-secured delivery protocols, AI logistics, and compliance with Ghana's Data Protection Act (Act 843).",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* ── Page Header ────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-900 tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 pl-4 font-mono">
            Republic of Ghana | Data Protection Act, 2012 (Act 843) Compliant | Luminex Logistics Ltd.
          </p>
        </div>

        {/* ── Compliance Badge Callout ───────────────────────────── */}
        <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-900 flex flex-col sm:flex-row items-start gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-brand-red-500/20 text-brand-red-500 flex items-center justify-center shrink-0 border border-brand-red-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-navy-900 border border-navy-800 px-3 py-0.5 rounded-full text-xs font-semibold text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-brand-red-500" />
              Ghana Data Protection Commission (DPC) Standard
            </div>
            <h3 className="font-bold text-white text-base sm:text-lg">
              Committed to Confidentiality, Data Integrity & Physical Security
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Luminex Logistics (&ldquo;Luminex&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) understands that documents entrusted to us contain confidential, commercially sensitive, or personally identifiable information. Protecting that data is fundamental to our institutional operations across Ghana.
            </p>
          </div>
        </div>

        {/* ── Main Policy Content ────────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 space-y-10 text-sm text-slate-600 leading-relaxed shadow-xs">
          {/* Section 1: Who Is Responsible */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Building2 className="w-5 h-5 text-brand-red-500 shrink-0" />
              1. Who Is Responsible for Your Personal Information?
            </h2>
            <p>
              For personal information that Luminex collects directly and determines the purposes and means of processing, Luminex acts as the <strong>Data Controller</strong>.
            </p>
            <p>
              Where Luminex provides logistics services to an institutional or corporate client and processes personal data strictly on that client&rsquo;s instructions, Luminex acts as a <strong>Data Processor</strong> on behalf of that client. In those circumstances, the institutional client determines the purposes of processing, while Luminex securely processes that information in accordance with applicable law and contractual mandates.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-navy-900 space-y-1">
              <p><strong>Corporate Entity:</strong> Luminex Logistics Ltd.</p>
              <p><strong>Business Registration Number:</strong> CS120930824</p>
              <p><strong>Registered Address:</strong> H302 Sowah Larbi Ave, Accra, Ghana</p>
              <p><strong>Email:</strong> luminexlogisticsltd@gmail.com | <strong>Telephone:</strong> +233 59 646 4461</p>
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Eye className="w-5 h-5 text-brand-red-500 shrink-0" />
              2. Information We Collect
            </h2>
            <p>Depending on how you interact with our services, we may collect the following categories of information:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-navy-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-brand-red-500" />
                  Customer Information
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                  <li>Full name, telephone number, email address;</li>
                  <li>Residential, business, or digital Ghana Post GPS address;</li>
                  <li>Identification details necessary for verification;</li>
                  <li>Account credentials & company/organization details;</li>
                  <li>Billing records, transaction logs, and customer support communications.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-navy-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-brand-red-500" />
                  Sender & Recipient Information
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                  <li>Names and active telephone contact numbers;</li>
                  <li>Delivery addresses and handling instructions;</li>
                  <li>Identification type for legitimacy verification;</li>
                  <li>Signatures, OTP confirmations, and proof of receipt;</li>
                  <li>Delivery-related photographic confirmations.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-navy-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-brand-red-500" />
                  Delivery & Logistics Telemetry
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                  <li>Pickup and destination geographic coordinates;</li>
                  <li>Delivery dates, timestamps, and route milestones;</li>
                  <li>Unique Consignment Security Numbers (CSN);</li>
                  <li>Courier allocation, tracking states, and attempt logs.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-navy-900 text-xs sm:text-sm flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-brand-red-500" />
                  Technology-Generated Data
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-xs text-slate-600">
                  <li>IP addresses, device identifiers, and browser types;</li>
                  <li>Operating system, diagnostic logs, and platform activity;</li>
                  <li>Approximate location data used strictly for dispatch.</li>
                </ul>
              </div>
            </div>

            {/* Specialized Safe Feature Callout */}
            <div className="bg-gradient-to-r from-navy-950 to-slate-900 text-white rounded-xl p-5 border border-navy-800 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-brand-red-400 font-bold text-xs uppercase tracking-wider">
                <Key className="w-4 h-4" />
                Physical Transit Safeguard: Code-Secured SentrySafe
              </div>
              <h4 className="font-bold text-white text-sm sm:text-base">
                Zero-Access Document Protocol
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                As a fundamental rule, Luminex does not read the contents of your documents. For high-security consignments, Luminex utilizes code-secured hardware safes (such as SentrySafe) during transit. The secure opening code is revealed <strong>ONLY TO THE AUTHORIZED CUSTOMER ON THE DAY OF DELIVERY</strong> via direct SMS or encrypted email, ensuring couriers and third parties have zero access to your physical documents.
              </p>
            </div>
          </section>

          {/* Section 3: How We Use Personal Information */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <FileCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              3. How We Use Personal Information
            </h2>
            <p>We process personal information only for legitimate operational, security, and legal purposes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
              <span className="p-2 rounded bg-slate-50 border border-slate-100">• Schedule and execute document pickups & deliveries</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">• Verify recipient legitimacy and doorstep authorization</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">• Track shipments and log real-time chain-of-custody</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">• Process billing, MoMo, and invoice settlements</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">• Dispatch customer support and refund resolutions</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">• Detect anomalies and prevent fraudulent bookings</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">• Train and optimize AI routing systems (lawfully permitted)</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">• Comply with Ghanaian regulatory and judicial obligations</span>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              We never use personal information for purposes incompatible with those disclosed, nor do we sell customer data to third-party advertisers.
            </p>
          </section>

          {/* Section 4: AI Models & Automated Technologies */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Cpu className="w-5 h-5 text-brand-red-500 shrink-0" />
              4. AI Models & Automated Technologies
            </h2>
            <p>
              Luminex uses algorithmic optimization and artificial intelligence to enhance transit efficiency, courier allocation, ETA forecasting, security telemetry, and fraud detection.
            </p>
            <p className="text-xs text-slate-600">
              AI systems assist our human dispatchers but never replace our legal duty to protect data. Where an automated process could materially impact an individual&rsquo;s rights, Luminex enforces mandatory human review and intervention.
            </p>
          </section>

          {/* Section 5: Confidential Documents Protection */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Lock className="w-5 h-5 text-brand-red-500 shrink-0" />
              5. Confidential Documents Protection
            </h2>
            <p>
              We implement comprehensive physical, organizational, and technological controls designed to ensure confidential documents are:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Collected strictly for authorized delivery purposes;</li>
              <li>Handled exclusively by vetted, credentialed couriers;</li>
              <li>Protected against physical tampering and unauthorized disclosure;</li>
              <li>Delivered strictly to intended, verified recipients; and</li>
              <li>Retained only for the duration reasonably necessary for transit auditability.</li>
            </ul>
          </section>

          {/* Section 6: Legal Basis for Processing */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Scale className="w-5 h-5 text-brand-red-500 shrink-0" />
              6. Legal Basis for Processing under Ghanaian Law
            </h2>
            <p>Under the Data Protection Act, 2012 (Act 843), we process personal data under the following lawful grounds:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Contract Performance:</strong> Processing necessary to fulfill our logistics service contract with you;</li>
              <li><strong>Pre-contractual Steps:</strong> Processing initiated at your request prior to scheduling a pickup;</li>
              <li><strong>Legal Obligation:</strong> Compliance with statutory logistics licensing, taxation, or law enforcement mandates;</li>
              <li><strong>Vital Interests:</strong> Protecting the immediate safety or vital interests of individuals;</li>
              <li><strong>Legitimate Interests:</strong> Securing our fleet, preventing fraud, and optimizing operations, provided fundamental rights are not overridden; or</li>
              <li><strong>Consent:</strong> Where expressly requested, which you may withdraw at any time without invalidating prior lawful processing.</li>
            </ul>
          </section>

          {/* Section 7: Sharing Personal Information */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Globe className="w-5 h-5 text-brand-red-500 shrink-0" />
              7. Sharing Personal Information & Third-Party Processors
            </h2>
            <p>We share information only where reasonably required with vetted recipients:</p>
            <div className="space-y-2 text-xs text-slate-600">
              <p>
                <strong>Service Providers:</strong> Cloud infrastructure, telecommunications gateways (SMS/email notifications), mapping/telemetry providers, cybersecurity auditors, and identity verification partners operating under strict written confidentiality covenants compliant with Act 843.
              </p>
              <p>
                <strong>Institutional Clients:</strong> When delivering on behalf of corporate partners, we supply transit logs, recipient confirmations, and Proof of Delivery according to agreed instructions.
              </p>
              <p>
                <strong>Law Enforcement & Regulators:</strong> We disclose data strictly upon receipt of lawful warrants, court orders, or statutory regulatory demands from Ghanaian authorities.
              </p>
            </div>
          </section>

          {/* Section 8: International Data Transfers */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Server className="w-5 h-5 text-brand-red-500 shrink-0" />
              8. International Data Transfers
            </h2>
            <p>
              Where technology platforms or cloud databases process data outside Ghana, Luminex ensures all transfers comply with Ghanaian data protection standards, including verified data transfer agreements and technical encryption safeguards.
            </p>
          </section>

          {/* Section 9: Data Security & Incident Protocols */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              9. Data Security, Incident Response & Breach Management
            </h2>
            <p>
              Our multi-layered security safeguards include strict role-based access control, cryptographic data protection, continuous server audit logs, courier identity verification, and mandatory staff security training.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-950 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-red-900">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                Statutory Incident Notification Protocol (Act 843):
              </p>
              <p className="leading-relaxed">
                In the event of an actual or suspected security compromise involving personal data, Luminex will rapidly contain the incident, initiate technical forensics, restore systems, notify the <strong>Ghana Data Protection Commission</strong>, and inform affected clients and individuals as required by law.
              </p>
            </div>
          </section>

          {/* Section 10: Retention Schedules */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Clock className="w-5 h-5 text-brand-red-500 shrink-0" />
              10. Data Retention & Secure Disposal
            </h2>
            <p>
              Personal data is retained only for the timeframe necessary to complete courier dispatches, resolve customer service or refund claims, maintain statutory financial records, and satisfy legal audit mandates. When no longer required, records are permanently sanitized, deleted, or anonymized.
            </p>
          </section>

          {/* Section 11: Data Protection Rights */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <FileCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              11. Your Statutory Data Protection Rights
            </h2>
            <p>Under the Data Protection Act (Act 843), Ghanaian citizens and corporate clients maintain statutory rights to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
              <span className="p-2 rounded bg-slate-50 border border-slate-100">✓ <strong>Right to be Informed</strong> of collection & use</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">✓ <strong>Right of Access</strong> to personal records held</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">✓ <strong>Right to Rectification</strong> of inaccurate data</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">✓ <strong>Right to Object</strong> to specific processing</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">✓ <strong>Right to Cease Processing</strong> where appropriate</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">✓ <strong>Right to Deletion / Destruction</strong> where applicable</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">✓ <strong>Right to Withdraw Consent</strong> at any time</span>
              <span className="p-2 rounded bg-slate-50 border border-slate-100">✓ <strong>Right to Lodge Complaints</strong> with the DPC</span>
            </div>
          </section>

          {/* Section 12: Cookies, Marketing & Minors */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Globe className="w-5 h-5 text-brand-red-500 shrink-0" />
              12. Cookies, Marketing & Minors
            </h2>
            <p>
              We use operational and performance cookies to maintain platform security, preserve user sessions, and analyze traffic. Non-essential marketing communications can be opted out of at any time via written notice or unsubscribe links. Service-critical notifications (CSN updates and dispatch alerts) cannot be disabled.
            </p>
            <p className="text-xs text-slate-500">
              Our services are directed toward adults and commercial entities; we do not knowingly solicit personal data from children.
            </p>
          </section>

          {/* Section 13: Contact & Complaints Point */}
          <section className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Phone className="w-5 h-5 text-brand-red-500 shrink-0" />
              13. Contact Our Data Protection Desk
            </h2>
            <p>
              To exercise any statutory right, lodge an inquiry, or discuss data protection compliance, contact our Compliance Office:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 font-mono text-xs text-navy-900">
              <p><strong>Compliance Officer:</strong> Luminex Logistics Data Protection Desk</p>
              <p><strong>Entity:</strong> Luminex Logistics Ltd. (Registration No. CS120930824)</p>
              <p><strong>Address:</strong> H302 Sowah Larbi Ave, Accra, Ghana</p>
              <p>
                <strong>Telephone:</strong>{" "}
                <a href="tel:+233596464461" className="text-brand-red-600 hover:underline">
                  +233 59 646 4461
                </a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:luminexlogisticsltd@gmail.com" className="text-brand-red-600 hover:underline">
                  luminexlogisticsltd@gmail.com
                </a>
              </p>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              You also have the statutory right under Ghanaian law to lodge a complaint directly with the <strong>Ghana Data Protection Commission (DPC)</strong> if you believe your personal data rights have been violated.
            </p>
          </section>

          {/* Cross Links Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-brand-red-600 hover:underline font-semibold">
                ← Terms of Service
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
              Contact Customer Relations Desk
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}