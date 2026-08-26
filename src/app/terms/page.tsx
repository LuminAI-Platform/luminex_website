import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Scale, FileText, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Luminex Logistics",
  description:
    "Terms and conditions governing document transit, liability, custody verification, and service protocols at Luminex Logistics Ltd.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h1 className="text-3xl md:text-5xl font-black text-navy-900 tracking-tight">
              Terms of Service
            </h1>
          </div>
          <p className="text-xs text-slate-500 pl-4 font-mono">
            Last Revised: August 2026 | Jurisdiction: Republic of Ghana | Reg. No: CS120930824
          </p>
        </div>

        {/* Summary Callout Banner */}
        <div className="bg-navy-950 text-white rounded-xl p-6 border border-navy-900 flex items-start gap-4 shadow-sm">
          <ShieldCheck className="w-6 h-6 text-brand-red-500 shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">Chain-of-Custody Protocol Agreement</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              These terms form a legally binding contract governing secure document transit, doorstep identification verification, liability caps, and custody transfer procedures across Ghana.
            </p>
          </div>
        </div>

        {/* Legal Document Sections */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-10 space-y-8 text-sm text-slate-600 leading-relaxed shadow-xs">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="w-5 h-5 text-brand-red-500 shrink-0" />
              1. Acceptance of Terms & Service Scope
            </h2>
            <p>
              By accessing, registering, or placing a document transit booking with Luminex Logistics Ltd. (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you (&ldquo;Customer&rdquo;, &ldquo;Sender&rdquo;) unconditionally accept and agree to abide by these Terms of Service. Luminex Logistics Ltd. operates as a licensed courier entity registered in the Republic of Ghana under Company Registration No. CS120930824 and TIN C0064381064.
            </p>
            <p>
              Our services are strictly specialized for high-value legal contracts, corporate filings, bank instruments, diplomatic pouches, and physical assets requiring verifiable chain-of-custody tracking.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Scale className="w-5 h-5 text-brand-red-500 shrink-0" />
              2. Sender Obligations & Manifest Accuracy
            </h2>
            <p>
              The Sender is solely responsible for providing accurate consignment information, including authorized recipient full names, active telephone contact numbers, and precise digital Ghana Post GPS address points.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
              <li>Consignment descriptions provided at booking must be complete and non-misleading.</li>
              <li>Envelopes and tamper-evident bags must be properly sealed prior to physical courier intake.</li>
              <li>Luminex couriers reserve the right to inspect outer packaging integrity before issuing an electronic Consignment Security Number (CSN).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <ShieldCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              3. Mandatory Chain-of-Custody & Doorstep ID Verification
            </h2>
            <p>
              To maintain absolute tamper protection, Luminex Logistics operates under a strict Doorstep Identification Verification protocol. Physical release of consignments will occur ONLY when the named receiver presents valid government-issued photo identification (Ghana Card, Passport, or Driver&rsquo;s License) matching the booking manifest.
            </p>
            <p>
              Digital recipient signatures, timestamped GPS coordinates, and courier ID scans recorded at handover constitute conclusive proof of fulfillment and legally admissible transfer of custody.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <AlertTriangle className="w-5 h-5 text-brand-red-500 shrink-0" />
              4. Prohibited & Restricted Items Policy
            </h2>
            <p>
              Luminex Logistics prohibits the transport of illegal narcotics, unregistered hazardous chemicals, unlicensed firearms or ammunition, counterfeit currency, or perishable goods.
            </p>
            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
              Any consignment suspected of containing contraband will be immediately impounded, logged in our sorting vault, and reported to statutory law enforcement authorities under the laws of Ghana.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Scale className="w-5 h-5 text-brand-red-500 shrink-0" />
              5. Limitation of Liability & Declared Value Coverage
            </h2>
            <p>
              Standard courier coverage guarantees compensation for verifiable direct physical damage or total loss of document consignments up to GHS 5,000 per shipment, unless an Enterprise Declared Value rider is attached at booking.
            </p>
            <p>
              Luminex Logistics is not liable for indirect, consequential, or economic loss resulting from third-party delays outside our reasonable operational control (e.g. state emergency declarations or severe natural disasters).
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <FileText className="w-5 h-5 text-brand-red-500 shrink-0" />
              6. Cancellations, Re-routing, and Failed Handover Protocol
            </h2>
            <p>
              Booking cancellations requested prior to courier dispatch incur zero fee. If a courier has arrived at collection, a nominal GHS 50 dispatch charge applies.
            </p>
            <p>
              If the designated recipient is unavailable or fails ID verification after 2 doorstep attempts, the package is automatically secured in our central Accra vault for 48 hours while dispatch attempts re-contact with the sender.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Scale className="w-5 h-5 text-brand-red-500 shrink-0" />
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by, construed, and enforced exclusively in accordance with the laws of the Republic of Ghana. Any legal disputes arising hereunder shall fall within the exclusive jurisdiction of the Courts of Ghana in Accra.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}