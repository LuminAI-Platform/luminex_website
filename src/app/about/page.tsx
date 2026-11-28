import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Award, FileCheck, MapPin, Building2, Clock } from "lucide-react";
import Team from "@/components/Team";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us | Luminex Logistics — Ghana's Premier Secure Courier",
  description:
    "Learn about Luminex Logistics Ltd., Ghana's leading secure document delivery company. Our story, mission, team, certifications, and commitment to precision logistics.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* Section 1: Hero Banner */}
      <section className="bg-navy-950 text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-navy-900 border border-navy-800 px-3 py-1 rounded-full text-xs font-mono text-slate-300">
            <span>Registration No. CS120930824</span>
            <span className="text-slate-600">•</span>
            <span>TIN C0064381064</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.15]">
            About Luminex Logistics
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Ghana’s premier secure document delivery network, engineered for law firms, financial institutions, diplomatic missions, and corporate enterprises.
          </p>
        </div>
      </section>

      {/* Section 2: Key Operational Metrics */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 text-center">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-2xl sm:text-3xl font-bold text-navy-900 mb-1">10,000+</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Documents Delivered Annually</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-2xl sm:text-3xl font-bold text-navy-900 mb-1">99.9%</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">On-Time Fulfillment Rate</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-2xl sm:text-3xl font-bold text-navy-900 mb-1">50+</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Corporate &amp; Legal Partners</div>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
              <div className="text-2xl sm:text-3xl font-bold text-navy-900 mb-1">100%</div>
              <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Verified ID Handover</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Story & Core Mission */}
      <section className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-red-600 mb-2">
            Corporate Overview
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 tracking-[-0.025em] leading-[1.18]">
            Engineered for Integrity &amp; Scale
          </h2>
          <p className="mt-3 text-slate-600 max-w-[58ch] text-sm sm:text-base leading-relaxed">
            Founded to eliminate chain-of-custody risks in high-value document transit across Ghana with verifiable operational standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
            <h3 className="text-base font-semibold text-navy-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand-red-500 shrink-0" />
              Corporate Mission
            </h3>
            <p>
              Luminex Logistics operates under strict quality and custody protocols. We guarantee tamper-evident physical transport, real-time status tracking, and verified proof-of-delivery records for confidential corporate consignments.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
            <h3 className="text-base font-semibold text-navy-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-red-500 shrink-0" />
              Chain-of-Custody Standard
            </h3>
            <p>
              Every consignment receives a unique Consignment Security Number (CSN) at intake. From central vault staging to doorstep ID verification via Ghana Card or Passport, our protocols maintain complete audit readiness.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
            <h3 className="text-base font-semibold text-navy-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-red-500 shrink-0" />
              Statutory Governance
            </h3>
            <p>
              Registered in the Republic of Ghana (Reg. No. CS120930824), Luminex aligns every dispatch workflow with the Data Protection Act, 2012 (Act 843) and the Electronic Transactions Act, 2008 (Act 772).
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Certifications */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red-600 mb-2">
              Compliance &amp; Licensing
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 tracking-[-0.025em] leading-[1.18]">
              Certifications &amp; Compliance
            </h2>
            <p className="mt-3 text-slate-600 max-w-[58ch] text-sm sm:text-base leading-relaxed">
              Aligned with national regulatory frameworks and international document logistics standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">ISO 9001:2015</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certified Quality Management Systems governing document tracking, courier dispatch, and vault storage.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Ghana DPA Compliant</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registered under the Data Protection Commission (Act 843) to guarantee complete data confidentiality.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50">
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">Licensed Courier Operator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fully authorized courier credentials for high-priority legal, financial, and diplomatic document transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Leadership Team */}
      <section id="about-team" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Team />
      </section>

      {/* Section 6: Office Location & Map */}
      <section id="operations" className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red-600 mb-2">
              Headquarters &amp; Dispatch
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 tracking-[-0.025em] leading-[1.18]">
              Headquarters &amp; Dispatch Hub
            </h2>
            <p className="mt-3 text-slate-600 max-w-[58ch] text-sm sm:text-base leading-relaxed">
              Visit our central Accra operational headquarters or contact our dispatch desk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 h-80 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
              <iframe
                title="Luminex Logistics Headquarters Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8354712398!2d-0.1221!3d5.6201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzcnMTIuNCJOIDDCsDA3JzE5LjYiVw!5e0!3m2!1sen!2sgh!4v1620000000000!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-navy-900 border-b border-slate-200 pb-2">
                Accra Central Vault
              </h3>
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-5 h-5 text-brand-red-500 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-600 tabular-nums">
                <Clock className="w-5 h-5 text-brand-red-500 shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.hours.map((rule, idx) => (
                    <React.Fragment key={rule.label}>
                      {idx > 0 && <br />}
                      {rule.label}: {rule.open} – {rule.close} GMT
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}