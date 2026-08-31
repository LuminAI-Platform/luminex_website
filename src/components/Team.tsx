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
    name: "Kwame Asante",
    role: "Chief Executive Officer",
    bio: "Over 18 years leading secure logistics infrastructure across West Africa, specializing in diplomatic and legal document transit.",
    image: "/team/kwame-asante.jpg",
  },
  {
    name: "Esi Danquah",
    role: "Head of Custody & Compliance",
    bio: "Former ISO compliance auditor overseeing tamper-evident protocols and legal chain of custody certification.",
    image: "/team/esi-danquah.jpg",
  },
  {
    name: "Kofi Owusu",
    role: "VP of Field Operations",
    bio: "Directs real-time fleet dispatch, armored courier teams, and high-priority diplomatic pouch routes in Accra.",
    image: "/team/kofi-owusu.jpg",
  },
];

// ── Component ────────────────────────────────────────────────────────

/**
 * Executive Leadership team section.
 *
 * Displays team member cards with photos, roles, and bios.
 * Responsive grid: 1-col → 2-col (sm) → 3-col (lg).
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
            Executive Leadership
          </h2>
        </div>
        <p className="text-slate-500 max-w-2xl pl-4.5 text-base leading-relaxed">
          Engineered by industry veterans dedicated to absolute security,
          compliance, and flawless operational execution.
        </p>
      </div>

      {/* Leaders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
              <h3 className="text-lg sm:text-xl font-bold text-navy-900">
                {leader.name}
              </h3>
              <p className="text-xs font-semibold text-brand-red-500 uppercase tracking-wider mt-0.5 mb-3">
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