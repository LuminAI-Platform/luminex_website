import React from "react";
import Image from "next/image";

// ── Types ────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

// ── Data ─────────────────────────────────────────────────────────────

const LEADERS: TeamMember[] = [
  {
    name: "Josiah Otoo-Mensah",
    role: "Chief Executive Officer",
    bio: "Visionary leader driving institutional logistics transformation across Ghana, specializing in chain-of-custody protocols for diplomatic and high-value document transit.",
    image: "/team/josiah-otoo-mensah.jpg",
  },
  {
    name: "Blessing Lamptey",
    role: "Chief Operating Officer",
    bio: "Directs day-to-day national dispatch operations, armored courier fleet deployment, and SLA fulfillment across all regional custody distribution hubs.",
    image: "/team/blessing-lamptey.jpg",
  },
  {
    name: "Ewurasi Graham",
    role: "Chief Financial Officer",
    bio: "Oversees corporate fiscal strategy, institutional risk management, financial governance, and consolidated enterprise billing systems.",
    image: "/team/ewurasi-graham.jpg",
  },
  {
    name: "Michael Gyamfi",
    role: "Head of Customer Relations",
    bio: "Leads institutional partner onboarding, corporate account governance, and VIP support for Ghana's foremost legal and financial entities.",
    image: "/team/michael-gyamfi.jpg",
  },
  {
    name: "Peter Ampah",
    role: "Fleet Manager",
    bio: "Manages secure transport vehicles, telemetry tracking systems, preventive maintenance regimens, and optimized dispatch routes in Accra.",
    image: "/team/peter-ampah.jpg",
  },
  {
    name: "Virtus Dakura",
    role: "Senior Engineer",
    bio: "Architects real-time GPS telemetry infrastructure, cryptographic CSN tracking engines, and digital proof-of-delivery verification platforms.",
    image: "/team/virtus-dakura.jpg",
  },
  {
    name: "Anne A. R Britwum, Esq.",
    role: "External Legal Counsel",
    bio: "Advises on statutory logistics compliance, custody transit liabilities, Data Protection Act (Act 843) adherence, and corporate contract frameworks.",
    image: "/team/anne-britwum.jpg",
  },
];

// ── Component ────────────────────────────────────────────────────────

/**
 * Executive Leadership team section.
 *
 * Displays cards for Luminex Logistics leadership team members
 * with high-resolution portraits, official titles, and domain bios.
 * Responsive grid: 1-col (mobile) → 2-col (tablet) → 3-col / 4-col (desktop).
 * Used on the About page.
 */
export default function Team() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">
            Executive Leadership & Advisory
          </h2>
        </div>
        <p className="text-slate-500 max-w-2xl pl-4.5 text-base leading-relaxed">
          Led by seasoned industry practitioners dedicated to institutional security,
          strict compliance, and flawless logistical precision across Ghana.
        </p>
      </div>

      {/* Leaders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
        {LEADERS.map((leader) => (
          <div
            key={leader.name}
            className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200 group"
          >
            <div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-white shadow-sm mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={leader.image}
                  alt={`${leader.name} — ${leader.role}`}
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 leading-tight">
                {leader.name}
              </h3>
              <p className="text-xs font-semibold text-brand-red-600 uppercase tracking-wider mt-1 mb-3">
                {leader.role}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {leader.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}