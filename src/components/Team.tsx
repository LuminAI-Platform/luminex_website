import React from "react";
import { ShieldCheck, Award, Lock } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: React.ReactNode;
}

const leaders: TeamMember[] = [
  {
    name: "Kwame Asante",
    role: "Chief Executive Officer",
    bio: "Over 18 years leading secure logistics infrastructure across West Africa, specializing in diplomatic and legal document transit.",
    icon: <Award className="w-6 h-6 text-brand-red-500" />,
  },
  {
    name: "Esi Danquah",
    role: "Head of Custody & Compliance",
    bio: "Former ISO compliance auditor overseeing tamper-evident protocols and legal chain of custody certification.",
    icon: <ShieldCheck className="w-6 h-6 text-brand-red-500" />,
  },
  {
    name: "Kofi Owusu",
    role: "VP of Field Operations",
    bio: "Directs real-time fleet dispatch, armored courier teams, and high-priority diplomatic pouch routes in Accra.",
    icon: <Lock className="w-6 h-6 text-brand-red-500" />,
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-white py-16 md:py-24 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">
              Executive Leadership
            </h2>
          </div>
          <p className="text-slate-500 max-w-2xl pl-4.5 text-base">
            Engineered by industry veterans dedicated to absolute security, compliance, and flawless operational execution.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                  {leader.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900">{leader.name}</h3>
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
    </section>
  );
}
