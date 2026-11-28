import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

// ── Types ────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  alt: string;
  imageStyle?: React.CSSProperties;
  linkedin?: string;
  email?: string;
}

// ── Data ─────────────────────────────────────────────────────────────

const LEADERS: TeamMember[] = [
  {
    name: "Josiah Otoo\u2011Mensah",
    role: "Chief Executive Officer",
    bio: "Visionary leader driving institutional logistics transformation across Ghana, specializing in chain-of-custody protocols for diplomatic and high-value document transit.",
    photo: "/team/josiah.jpg",
    alt: "Portrait of Josiah Otoo-Mensah, Chief Executive Officer",
    imageStyle: { objectPosition: "54% 16%" },
  },
  {
    name: "Blessing Lamptey",
    role: "COO, Head of Operations",
    bio: "Directs national dispatch operations, coordinates with the fleet manager to schedule courier pickups, and manages direct WhatsApp booking intakes across regional custody hubs.",
    photo: "/team/blessing.jpg",
    alt: "Portrait of Blessing Lamptey, COO and Head of Operations",
    imageStyle: {
      objectPosition: "50% 42%",
      transform: "scale(1.18)",
      transformOrigin: "50% 42%",
    },
  },
  {
    name: "Ewurasi Graham",
    role: "Chief Financial Officer",
    bio: "Oversees corporate fiscal strategy, enterprise financial governance, institutional risk management, and consolidated billing systems.",
    photo: "/team/ewurasi.jpeg",
    alt: "Portrait of Ewurasi Graham, Chief Financial Officer",
    imageStyle: { objectPosition: "50% 18%" },
  },
  {
    name: "Michael Gyamfi",
    role: "Head of Customer Relations",
    bio: "Leads client partner onboarding, corporate account governance, VIP customer service resolutions, and refund inquiries for Ghana's foremost entities.",
    photo: "/team/michael.jpg",
    alt: "Portrait of Michael Gyamfi, Head of Customer Relations",
    imageStyle: {
      objectPosition: "48% 36%",
      transform: "scale(1.12)",
      transformOrigin: "48% 34%",
    },
  },
  {
    name: "Peter Ampah",
    role: "Fleet Manager",
    bio: "Manages secure transport vehicles, telemetry tracking systems, preventive maintenance regimens, and optimized dispatch routes in Accra.",
    photo: "/team/peter.jpg",
    alt: "Portrait of Peter Ampah, Fleet Manager",
    imageStyle: { objectPosition: "50% 15%" },
  },
  {
    name: "Virtus Dakura",
    role: "Senior Engineer",
    bio: "Full-stack software engineer architecting high-performance digital platforms, scalable cloud infrastructure, and secure real-time tracking systems powering Luminex.",
    photo: "/team/virtus.png",
    alt: "Portrait of Virtus Dakura, Senior Engineer",
    imageStyle: { objectPosition: "50% 18%" },
  },
  {
    name: "Anne A. Britwum, Esq.",
    role: "External Legal Counsel",
    bio: "Advises on statutory logistics compliance, custody transit liabilities, Data Protection Act (Act 843) adherence, and corporate contract frameworks.",
    photo: "/team/anne.jpg",
    alt: "Portrait of Anne A. Britwum, Esq., External Legal Counsel",
    imageStyle: {
      objectPosition: "50% 20%",
      transform: "scale(1.26)",
      transformOrigin: "50% 18%",
    },
  },
];

// ── Sub-components ───────────────────────────────────────────────────

function MemberLinks({ member }: { member: TeamMember }) {
  if (!member.linkedin && !member.email) return null;

  return (
    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2.5">
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-navy-900 hover:border-slate-300 transition-colors"
        >
          <FaLinkedinIn className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-navy-900 hover:border-slate-300 transition-colors"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────

export default function Team() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-red-600 mb-2">
          Leadership &amp; Advisory
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 tracking-[-0.025em] leading-[1.18]">
          Executive Leadership &amp; Advisory
        </h2>
        <p className="mt-3 text-slate-600 max-w-[58ch] text-sm sm:text-base leading-relaxed">
          Led by seasoned industry practitioners dedicated to institutional
          security, strict compliance, and flawless logistical precision across
          Ghana.
        </p>
      </div>

      {/* Equal & Uniform Responsive Team Grid (1-col Mobile / 2-col Tablet / 3-col Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {LEADERS.map((leader) => (
          <article
            key={leader.name}
            className="max-w-md mx-auto w-full sm:max-w-none h-full bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-200"
          >
            <div className="flex-1 flex flex-col">
              {/* Uniform Explicit-Height Portrait Frame (guarantees non-zero height across all browsers) */}
              <div className="relative w-full h-64 lg:h-72 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-4">
                <Image
                  src={leader.photo}
                  alt={leader.alt}
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 340px"
                  className="object-cover"
                  style={leader.imageStyle}
                />
              </div>

              {/* Uniform Name, Role & Bio */}
              <div className="min-w-0 flex-1 flex flex-col px-0.5">
                <h3 className="text-lg font-bold text-navy-900 leading-snug text-balance">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-brand-red-700 uppercase tracking-wider mt-1 leading-tight">
                  {leader.role}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3.5 mt-3.5 flex-1">
                  {leader.bio}
                </p>
              </div>
            </div>

            <MemberLinks member={leader} />
          </article>
        ))}
      </div>
    </div>
  );
}
