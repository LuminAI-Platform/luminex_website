"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const CONSENT_KEY = "lmx_cookie_consent";
const CONSENT_VERSION = 1;

type ConsentStatus = "accepted" | "essential-only" | null;

type StoredConsent = {
  status: Exclude<ConsentStatus, null>;
  version: number;
  timestamp: string;
};

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Check for previously saved consent
  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      try {
        const stored = localStorage.getItem(CONSENT_KEY);

        if (stored) {
          const parsed: StoredConsent = JSON.parse(stored);

          if (
            parsed.version === CONSENT_VERSION &&
            (parsed.status === "accepted" ||
              parsed.status === "essential-only")
          ) {
            setConsent(parsed.status);
          } else {
            localStorage.removeItem(CONSENT_KEY);
          }
        }
      } catch {
        setConsent(null);
      } finally {
        setIsHydrated(true);
      }
    });

    return () => window.cancelAnimationFrame(rafId);
  }, []);

  // Slight delay before showing the banner
  useEffect(() => {
    if (!isHydrated || consent !== null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [isHydrated, consent]);

  const saveConsent = (
    status: Exclude<ConsentStatus, null>
  ) => {
    const consentData: StoredConsent = {
      status,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify(consentData)
      );
      window.dispatchEvent(
        new CustomEvent("lmx:cookie-consent", { detail: consentData })
      );
    } catch {
      // Continue for the current session if storage fails.
    }

    setIsClosing(true);

    window.setTimeout(() => {
      setConsent(status);
      setIsVisible(false);
    }, 350);
  };

  const handleAccept = () => {
    saveConsent("accepted");
  };

  const handleEssentialOnly = () => {
    saveConsent("essential-only");
  };

  // Prevent hydration mismatch
  if (!isHydrated || consent !== null) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      aria-describedby="cookie-consent-description"
      className={`
        fixed inset-x-0 bottom-0 z-[60]
        px-3 pb-3 sm:px-4 sm:pb-4
        transition-[transform,opacity] duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        motion-reduce:transition-none
        ${
          isVisible && !isClosing
            ? "translate-y-0 opacity-100"
            : "translate-y-[120%] opacity-0"
        }
      `}
    >
      <div
        className="
          mx-auto w-full max-w-5xl
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-navy-950
          text-white
          shadow-[0_20px_60px_rgba(0,0,0,0.28)]
        "
      >
        <div
          className="
            flex flex-col gap-4
            px-4 py-4
            sm:px-5 sm:py-4
            lg:flex-row lg:items-center lg:gap-6
          "
        >
          {/* Icon */}
          <div
            aria-hidden="true"
            className="
              hidden shrink-0
              h-10 w-10
              items-center justify-center
              rounded-xl
              border border-brand-red-500/20
              bg-brand-red-500/10
              text-brand-red-400
              sm:flex
            "
          >
            <ShieldCheck className="h-5 w-5" />
          </div>

          {/* Message */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-semibold text-white sm:text-[15px]">
                We use cookies
              </h2>

              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-slate-500"
              />

              <Link
                href="/privacy#cookies"
                className="
                  inline-flex
                  text-xs
                  font-medium
                  text-brand-red-400
                  underline
                  underline-offset-2
                  transition-colors
                  hover:text-brand-red-300
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-brand-red-400
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-navy-950
                "
              >
                Privacy Policy
              </Link>
            </div>

            <p
              id="cookie-consent-description"
              className="
                mt-1
                max-w-3xl
                text-xs
                leading-relaxed
                text-slate-300
                sm:text-[13px]
              "
            >
              Essential cookies keep Luminex secure and functional.
              Optional analytics cookies help us understand usage and
              improve our services.
            </p>
          </div>

          {/* Actions */}
          <div
            className="
              grid grid-cols-2
              shrink-0
              gap-2
              sm:flex sm:flex-row
              lg:items-center
            "
          >
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="
                rounded-xl
                border border-white/10
                bg-white/5
                px-4 py-2.5
                text-xs
                font-semibold
                text-slate-200
                transition-all duration-200
                hover:border-white/20
                hover:bg-white/10
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-slate-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-navy-950
              "
            >
              Essential Only
            </button>

            <button
              type="button"
              onClick={handleAccept}
              className="
                rounded-xl
                bg-brand-red-500
                px-4 py-2.5
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition-all duration-200
                hover:bg-brand-red-600
                hover:shadow-md
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-brand-red-400
                focus-visible:ring-offset-2
                focus-visible:ring-offset-navy-950
              "
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}