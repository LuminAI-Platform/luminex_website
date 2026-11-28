import React from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import SmartLink from "@/components/SmartLink";
import { SITE_CONFIG } from "@/lib/site-config";

// ── Navigation & Legal Links ─────────────────────────────────────────

const PLATFORM_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Track Consignment", href: "/track" },
  { label: "Schedule Delivery", href: "/book" },
  { label: "FAQ", href: "/faq" },
] as const;

const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Refund & Cancellation", href: "/refund" },
] as const;

// ── Component ────────────────────────────────────────────────────────

/**
 * Slim single-home site footer.
 *
 * Shows brand identity, navigation, governance policies, and compact dispatch
 * details (address, primary Bookings line, email, 2-line GMT hours from
 * `SITE_CONFIG`), pointing to `/contact` for full desks and live office status.
 */
export default function Footer() {
  const { bookings } = SITE_CONFIG.desks;

  return (
    <footer className="w-full bg-navy-950 text-white text-sm border-t border-navy-900">
      {/* ── Main Content Grid ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1: Brand & Identity (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <SmartLink href="/" className="inline-flex items-center gap-3 group">
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
                <span className="text-base sm:text-lg font-bold text-white tracking-tight uppercase block leading-none">
                  Luminex
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-brand-red-500 tracking-wider block mt-0.5">
                  Logistics Ltd.
                </span>
              </div>
            </SmartLink>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Ghana&apos;s premier secure document logistics network for
              corporate, legal, diplomatic, and institutional deliveries.
            </p>

            <div className="inline-flex items-center gap-2 bg-navy-900/90 border border-navy-800/80 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-300 tabular-nums">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red-500 shrink-0" />
              <span>Reg. No. {SITE_CONFIG.registrationNumber}</span>
              <span className="text-slate-600">•</span>
              <span>TIN {SITE_CONFIG.tin}</span>
            </div>
          </div>

          {/* Column 2: Platform Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-semibold text-white uppercase text-xs tracking-wider border-b border-navy-900 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    activeClassName="text-white font-semibold"
                    inactiveClassName="text-slate-400 hover:text-white"
                    className="transition-colors duration-200 inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-red-500" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Governance (Span 2) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-semibold text-white uppercase text-xs tracking-wider border-b border-navy-900 pb-2">
              Governance
            </h4>
            <ul className="space-y-2 text-xs">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    activeClassName="text-white font-semibold"
                    inactiveClassName="text-slate-400 hover:text-white"
                    className="transition-colors duration-200 inline-flex items-center gap-1 group py-0.5"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-red-500" />
                  </SmartLink>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-navy-900/80">
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Compliant with Data Protection Act (Act 843) &amp; Electronic
                Transactions Act (Act 772).
              </p>
            </div>
          </div>

          {/* Column 4: Dispatch & Support Desk (Span 4 — Address, Bookings, Email, Hours) */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-semibold text-white uppercase text-xs tracking-wider border-b border-navy-900 pb-2">
              Dispatch &amp; Support Desk
            </h4>

            <div className="space-y-3 text-xs">
              {/* 1. Address */}
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-brand-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{SITE_CONFIG.address}</span>
              </div>

              {/* 2. Bookings Phone + WhatsApp */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    {bookings.label}
                  </span>
                  <div className="flex items-center gap-2.5 flex-wrap mt-0.5">
                    <a
                      href={`tel:${bookings.tel}`}
                      className="text-white hover:text-slate-200 font-semibold text-sm tabular-nums transition-colors whitespace-nowrap"
                    >
                      {bookings.display}
                    </a>
                    <span className="text-slate-600" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href={`https://wa.me/${bookings.wa}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-medium text-xs transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* 3. Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    Corporate Inquiries
                  </span>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-white hover:text-slate-200 font-medium text-xs transition-colors break-all"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              {/* 4. Compact 2-Line Hours from SITE_CONFIG */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    Operational Hours
                  </span>
                  <div className="text-xs text-slate-200 leading-relaxed tabular-nums mt-0.5">
                    {SITE_CONFIG.hours.map((rule) => (
                      <p key={rule.label}>
                        {rule.label} {rule.open}–{rule.close} GMT
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pointer to full desks & live Accra status on Contact */}
              <div className="pt-2 border-t border-navy-900/80">
                <SmartLink
                  href="/contact"
                  activeClassName="text-white"
                  inactiveClassName="text-slate-200 hover:text-white"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                >
                  <span>Customer Relations &amp; contact form</span>
                  <span aria-hidden="true" className="text-brand-red-400">
                    →
                  </span>
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-Footer / Legal Copyright Bar ───────────────────── */}
      <div className="border-t border-navy-900 bg-navy-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {SITE_CONFIG.entityName} All rights
            reserved.
          </p>
          <p className="text-[11px] text-slate-400">Republic of Ghana</p>
        </div>
      </div>
    </footer>
  );
}
