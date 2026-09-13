"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

const CONSENT_KEY = "lmx_cookie_consent";

type ConsentStatus = "accepted" | "rejected" | null;

/**
 * GDPR / Ghana DPA (Act 843) compliant cookie consent banner.
 *
 * Behaviour:
 * - Appears on first visit (no existing localStorage key).
 * - Stores user preference in localStorage (`lmx_cookie_consent`).
 * - Non-essential cookies / analytics are blocked until consent is granted.
 * - Accessible via keyboard and screen readers.
 */
export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus | "pending">("pending");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentStatus;
      setConsent(stored);
    } catch {
      setConsent(null);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setConsent("rejected");
  };

  // Don't render during SSR hydration or if consent already given
  if (consent === "pending" || consent === "accepted" || consent === "rejected") {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-description"
      className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-4 animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="max-w-4xl mx-auto bg-navy-950 text-white rounded-2xl border border-navy-800 shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="hidden sm:flex w-10 h-10 rounded-xl bg-brand-red-500/20 text-brand-red-500 items-center justify-center shrink-0 border border-brand-red-500/30 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">
                  Cookie &amp; Data Privacy Notice
                </h3>
                <p
                  id="cookie-consent-description"
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1"
                >
                  Luminex Logistics uses essential cookies for platform
                  security and session management. We may also use analytics
                  cookies to improve our services. By accepting, you consent
                  to our use of cookies in accordance with Ghana&apos;s{" "}
                  <Link
                    href="/privacy"
                    className="text-brand-red-400 hover:text-brand-red-300 underline underline-offset-2 font-medium"
                  >
                    Data Protection Act (Act 843)
                  </Link>
                  .
                </p>
              </div>

              {/* Dismiss (same as reject) */}
              <button
                onClick={handleReject}
                className="text-slate-400 hover:text-white transition-colors p-1 shrink-0"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button
                onClick={handleAccept}
                className="bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleReject}
                className="bg-navy-900 hover:bg-navy-800 border border-navy-700 text-slate-300 hover:text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
              >
                Essential Only
              </button>
              <Link
                href="/privacy"
                className="text-xs text-slate-400 hover:text-slate-300 underline underline-offset-2 sm:ml-2 text-center sm:text-left py-1"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
