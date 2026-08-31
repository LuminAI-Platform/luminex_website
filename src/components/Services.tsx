import React from "react";
import Link from "next/link";
import {
  FileText,
  Radio,
  Shield,
  Contact2,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────

interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// ── Data ─────────────────────────────────────────────────────────────

const SERVICES: ServiceItem[] = [
  {
    icon: FileText,
    title: "Document Delivery",
    description:
      "Point-to-point secure transfer of legal contracts, government filings, and corporate tender documents with verifiable chain of custody.",
  },
  {
    icon: Radio,
    title: "GPS Telemetry",
    description:
      "Real-time geospatial tracking of all assets. Institutional clients receive direct API access to live routing data for auditing.",
  },
  {
    icon: Shield,
    title: "Vault Storage",
    description:
      "Climate-controlled, biometric-restricted holding facilities for documents requiring temporary staging between secure transfers.",
  },
  {
    icon: Contact2,
    title: "ID Verification",
    description:
      "Mandatory multi-factor recipient authentication before handover. Digital signature and government ID cross-referencing on delivery.",
  },
];

// ── Sub-components ───────────────────────────────────────────────────

/** Individual service card with icon, title, and description. */
function ServiceCard({ icon: Icon, title, description }: ServiceItem) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow duration-200">
      <div>
        <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-navy-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────

/**
 * Core Competencies / Services section.
 *
 * Displays a grid of 4 service cards + a wide Corporate Portals CTA card.
 * Uses responsive grid: 1-col → 2-col (sm) → 3-col (lg).
 */
export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">
              Core Competencies
            </h2>
          </div>
          <p className="mt-3 text-slate-500 text-base md:text-lg max-w-2xl pl-4.5 leading-relaxed">
            Rigorous protocols applied to every tier of logistics, ensuring
            confidentiality and precision for specialized deliveries.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}

          {/* Corporate Portals — wide CTA card */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 shadow-xs sm:col-span-2 hover:shadow-sm transition-shadow duration-200">
            <div className="max-w-md">
              <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">
                Corporate Portals
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated extranets for volume clients. Manage dispatch
                schedules, download audit trails, and oversee multi-regional
                logistics programs from a centralized dashboard.
              </p>
            </div>

            <div className="shrink-0 self-start md:self-center">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold text-sm rounded transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2"
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
