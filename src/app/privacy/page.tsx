import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Lock, Eye, FileCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Luminex Logistics",
  description:
    "Privacy Notice detailing personal data collection, biometric handover verification, and compliance with Ghana's Data Protection Act (Act 843).",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h1 className="text-3xl md:text-5xl font-black text-navy-900 tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xs text-slate-500 pl-4 font-mono">
            Ghana Data Protection Act (Act 843) Compliant | Last Revised: August 2026
          </p>
        </div>

        {/* Compliance Badge Callout */}
        <div className="bg-navy-950 text-white rounded-xl p-6 border border-navy-900 flex items-start gap-4 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-brand-red-500 shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">Data Protection Commission (DPC) Registered Controller</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Luminex Logistics Ltd. is certified under Ghana&rsquo;s Data Protection Commission. We process all personal identity data, telemetry logs, and delivery manifests in full compliance with Act 843.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-10 space-y-8 text-sm text-slate-600 leading-relaxed shadow-xs">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Lock className="w-5 h-5 text-brand-red-500 shrink-0" />
              1. Data Controller Information
            </h2>
            <p>
              Luminex Logistics Ltd. (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) acts as a Data Controller in respect of personal data collected through our digital booking portal, mobile dispatch applications, and doorstep verification devices. Our registered head office is situated at H302 Sowah Larbi Ave, Accra, Ghana (Company Reg No. CS120930824).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Eye className="w-5 h-5 text-brand-red-500 shrink-0" />
              2. Categories of Personal Data Collected
            </h2>
            <p>We process only personal information necessary for document transit, custody verification, and regulatory compliance:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li><strong>Sender & Recipient Identity:</strong> Full names, corporate designations, mobile phone numbers, email addresses.</li>
              <li><strong>Location Data:</strong> Ghana Post GPS digital addresses, pickup/drop-off coordinates, real-time courier telemetry.</li>
              <li><strong>Verification Credentials:</strong> Government ID numbers (Ghana Card, Passport) presented during doorstep handover.</li>
              <li><strong>Manifest Logs:</strong> Document classifications, encrypted Consignment Security Numbers (CSN), and digital signatures.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              3. Lawful Basis & Purpose of Processing
            </h2>
            <p>
              Pursuant to Section 18 of Ghana&rsquo;s Data Protection Act 843, data processing is strictly conducted under the lawful bases of:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600 text-xs">
              <li><strong>Contractual Performance:</strong> Fulfilling document delivery instructions and electronic chain-of-custody tracking.</li>
              <li><strong>Legal Obligation:</strong> Maintaining bonded courier audit logs required by Ghana revenue and logistics regulators.</li>
              <li><strong>Legitimate Interest:</strong> Preventing fraud, unauthorized identity impersonation, and consignment theft.</li>
            </ol>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              4. Biometric & Identity Verification Protocols at Delivery
            </h2>
            <p>
              During doorstep delivery, couriers capture digital verification data (ID number confirmation, electronic signature). Any biometric checks or signature logs are encrypted at rest using AES-256 standards and stored in secure vault servers.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Lock className="w-5 h-5 text-brand-red-500 shrink-0" />
              5. Data Retention & Secure Deletion Schedules
            </h2>
            <p>
              Telemetry logs and active tracking records are retained for 90 days following consignment fulfillment. Audit trail manifests and signed proof-of-delivery records are archived in cold storage for 7 years to meet Ghanaian legal limitation periods, after which they are permanently purged.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Eye className="w-5 h-5 text-brand-red-500 shrink-0" />
              6. Third-Party Disclosures
            </h2>
            <p>
              We do not sell, monetize, or lease personal data. Customer information is disclosed only to verified service infrastructure partners (such as Supabase BaaS, HubSpot CRM, and SMS dispatch gateways) operating under strict data processing agreements.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              7. Data Subject Rights under Act 843
            </h2>
            <p>Under Act 843, Ghanaian data subjects retain statutory rights to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li>Request access to personal records held by Luminex Logistics.</li>
              <li>Request correction or deletion of inaccurate personal data.</li>
              <li>Object to processing on compelling legitimate grounds.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Mail className="w-5 h-5 text-brand-red-500 shrink-0" />
              8. Data Protection Officer Contact Point
            </h2>
            <p>
              For inquiries regarding data privacy or to exercise statutory rights, contact our Data Protection Desk at:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 font-mono text-xs text-navy-900 space-y-1">
              <p><strong>Data Protection Officer:</strong> Luminex Logistics Compliance Office</p>
              <p><strong>Email:</strong> dpo@luminexlogistics.com / ops@luminexlogistics.com</p>
              <p><strong>Address:</strong> H302 Sowah Larbi Ave, Accra, Ghana</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}