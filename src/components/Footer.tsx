import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe,
  MapPin,
  Phone,
  Mail,
  MessageSquareText,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

// ── Navigation & Legal Links ─────────────────────────────────────────

const PLATFORM_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Track Consignment", href: "/track" },
  { label: "Schedule Delivery", href: "/book" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Contact Dispatch", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund & Cancellation", href: "/refund" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/233545975896",
    icon: () => (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: () => (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Website Portal",
    href: "/contact",
    icon: Globe,
  },
] as const;

// ── Component ────────────────────────────────────────────────────────

/**
 * Site-wide footer.
 *
 * Engineered with 4-column balanced grid:
 * - Brand & Corporate Identification (with logo, registration, and social buttons)
 * - Platform Navigation
 * - Legal, Governance & Compliance
 * - Direct Contact, Dispatch Channels & Operational Hours
 * Includes clean statutory copyright sub-bar.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-navy-950 text-white text-sm border-t border-navy-900">
      {/* ── Main Content Grid ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Column 1: Brand & Identity (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-navy-800 bg-navy-900 shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Luminex Logistics Logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black text-white tracking-tight uppercase block leading-none">
                  Luminex
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-brand-red-500 tracking-wider block mt-0.5">
                  Logistics Ltd.
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Ghana&apos;s premier secure document logistics network. Specialized chain-of-custody transfer for corporate, legal, diplomatic, and governmental documentation.
            </p>

            <div className="inline-flex items-center gap-2 bg-navy-900/90 border border-navy-800/80 px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
              <span>Reg. No. CS120930824</span>
              <span className="text-slate-600">•</span>
              <span>TIN C0064381064</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-9 h-9 rounded-lg bg-navy-900 hover:bg-brand-red-500 border border-navy-800 hover:border-brand-red-500 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Platform Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-navy-900 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-red-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Governance (Span 2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-navy-900 pb-2">
              Governance
            </h4>
            <ul className="space-y-2 text-xs">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-red-500" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-navy-900/80">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Licensed courier operations strictly compliant with Data Protection Act (Act 843) & Electronic Transactions Act (Act 772).
              </p>
            </div>
          </div>

          {/* Column 4: Contact & Operations Desk (Span 4) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider border-b border-navy-900 pb-2">
              Dispatch & Support Desk
            </h4>

            <div className="space-y-3 text-xs">
              {/* Address */}
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">H302 Sowah Larbi Ave, Accra, Ghana</span>
              </div>

              {/* Bookings */}
              <div className="flex items-start gap-2.5">
                <MessageSquareText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Bookings & Dispatch (Head of Ops):</span>
                  <a
                    href="https://wa.me/233545975896"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 font-semibold font-mono transition-colors"
                  >
                    +233 54 597 5896
                  </a>
                </div>
              </div>

              {/* Customer Service & Refunds */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Support & Refunds (Customer Relations):</span>
                  <a
                    href="tel:+233596464461"
                    className="text-white hover:text-brand-red-400 font-semibold font-mono transition-colors"
                  >
                    +233 59 646 4461
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Corporate Inquiries:</span>
                  <a
                    href="mailto:luminexlogisticsltd@gmail.com"
                    className="text-white hover:text-slate-200 font-mono transition-colors break-all"
                  >
                    luminexlogisticsltd@gmail.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2.5 text-slate-400 pt-1 border-t border-navy-900/80">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight">
                  <p>Mon – Fri: 08:00 – 18:00 GMT</p>
                  <p>Saturday: 09:00 – 13:00 GMT</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Sub-Footer / Legal Copyright Bar ───────────────────── */}
      <div className="border-t border-navy-900 bg-navy-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Luminex Logistics Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap justify-center">
            <span>Republic of Ghana</span>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/refund" className="hover:text-slate-300 transition-colors">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}