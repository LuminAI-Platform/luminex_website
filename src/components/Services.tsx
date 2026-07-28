import React from "react";
import Link from "next/link";
import { FileText, Radio, Shield, Contact2, Building2, ArrowRight } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-start gap-4">
            <div className="w-1 md:w-1.5 h-10 bg-brand-red-500 shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">
                Core Competencies
              </h2>
              <p className="mt-3 text-slate-500 text-base md:text-lg max-w-2xl leading-relaxed">
                Rigorous protocols applied to every tier of logistics, ensuring confidentiality and precision for specialized deliveries.
              </p>
            </div>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Document Delivery */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                Document Delivery
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Point-to-point secure transfer of legal contracts, government filings, and corporate tender documents with verifiable chain of custody.
              </p>
            </div>
          </div>

          {/* Card 2: GPS Telemetry */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                GPS Telemetry
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Real-time geospatial tracking of all assets. Institutional clients receive direct API access to live routing data for auditing.
              </p>
            </div>
          </div>

          {/* Card 3: Vault Storage */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                Vault Storage
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Climate-controlled, biometric-restricted holding facilities for documents requiring temporary staging between secure transfers.
              </p>
            </div>
          </div>

          {/* Card 4: ID Verification */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <Contact2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                ID Verification
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mandatory multi-factor recipient authentication before handover. Digital signature and government ID cross-referencing on delivery.
              </p>
            </div>
          </div>

          {/* Card 5 & 6 Container (Desktop spans 2 columns) */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs md:col-span-2">
            <div className="max-w-md">
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                Corporate Portals
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated extranets for volume clients. Manage dispatch schedules, download audit trails, and oversee multi-regional logistics programs from a centralized dashboard.
              </p>
            </div>

            <div className="shrink-0 self-start md:self-center">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold text-sm rounded transition-colors duration-200"
              >
                <span>Request Access</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

