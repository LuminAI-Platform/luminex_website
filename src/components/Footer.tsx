import React from "react";
import Link from "next/link";
import { Share2, Globe } from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Share",
    href: "#",
    icon: Share2,
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: () => (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Website",
    href: "#",
    icon: Globe,
  },
] as const;

// ── Component ────────────────────────────────────────────────────────

/**
 * Site-wide footer.
 *
 * 4-column layout: Brand, Contact Info, Quick Links, Social.
 * Responsive grid: 1-col → 2-col (sm) → 4-col (lg).
 */
export default function Footer() {
  return (
    <footer className="w-full bg-navy-950 text-white text-sm py-10 md:py-12 border-t border-navy-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* Column 1 — Brand & Legal */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-white text-base">
              Luminex Logistics
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ghana&apos;s premier secure document delivery network. Licensed
              courier operator since 2020.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              © {new Date().getFullYear()} Luminex Logistics Ltd.
            </p>
          </div>

          {/* Column 2 — Contact Info */}
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1">
              Contact & Dispatch
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              H302 Sowah Larbi Ave, Accra, Ghana
            </p>
            <p className="text-slate-300 text-xs">
              <span className="font-semibold text-white">Bookings:</span>{" "}
              <a
                href="https://wa.me/233545975896"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                +233 54 597 5896
              </a>
            </p>
            <p className="text-slate-300 text-xs">
              <span className="font-semibold text-white">Support & Refunds:</span>{" "}
              <a
                href="tel:+233596464461"
                className="hover:text-white transition-colors"
              >
                +233 59 646 4461
              </a>
            </p>
            <p className="text-slate-300 text-xs">
              <span className="font-semibold text-white">Email:</span>{" "}
              <a
                href="mailto:luminexlogisticsltd@gmail.com"
                className="hover:text-white transition-colors"
              >
                luminexlogisticsltd@gmail.com
              </a>
            </p>
          </div>

          {/* Column 3 — Quick Links */}
          <div className="flex flex-col gap-1.5">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1">
              Quick Links
            </h4>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white transition-colors duration-200 w-fit text-xs py-0.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4 — Social / Connect */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3 text-slate-400">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-navy-900 hover:bg-brand-red-500 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}