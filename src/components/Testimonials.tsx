"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  MessageSquarePlus,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Building2,
  UserCheck,
  X,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────

type TestimonialKind = "verified_delivery" | "client_review" | "featured_partner";

interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  title: string;
  verified?: boolean;
  kind?: TestimonialKind;
}

// ── Baseline Fallback Data (rendered initially for zero layout shift) ─

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "baseline-1",
    rating: 5,
    quote:
      "Luminex has redefined our expectations for legal document handling. Their chain of custody protocols are unmatched in the West African market.",
    author: "Bright Ampofo",
    title: "Senior Partner, Global Legal Chambers",
    verified: false,
    kind: "featured_partner",
  },
  {
    id: "baseline-2",
    rating: 5,
    quote:
      "The real-time GPS telemetry provides the transparency our compliance department requires for high-value government tenders.",
    author: "Ursula Koomson",
    title: "Director of Operations, National Infrastructure Agency",
    verified: false,
    kind: "featured_partner",
  },
  {
    id: "baseline-3",
    rating: 5,
    quote:
      "Speed is essential, but security is non-negotiable. Luminex delivers both with a level of professionalism that is truly world-class.",
    author: "Dr. Samuel Osei",
    title: "Chief Technology Officer, Zenith Financial Group",
    verified: false,
    kind: "featured_partner",
  },
];

const INPUT_CLASS =
  "w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 caret-navy-900 focus:outline-none focus:ring-1 focus:ring-navy-900/30 focus:border-navy-900 transition-colors bg-white";

/** Renders an honest, traceable badge distinguishing the 3 review sources. */
function ReviewSourceBadge({ item }: { item: Testimonial }) {
  const kind: TestimonialKind =
    item.kind || (item.verified ? "verified_delivery" : "client_review");

  if (kind === "verified_delivery") {
    return (
      <span
        title="Confirmed against a real Luminex Consignment Security Number (CSN)"
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full"
      >
        <ShieldCheck className="w-3 h-3" aria-hidden="true" />
        Verified Delivery
      </span>
    );
  }

  if (kind === "featured_partner") {
    return (
      <span
        title="Curated institutional partner testimonial"
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full"
      >
        <Building2 className="w-3 h-3" aria-hidden="true" />
        Institutional Partner
      </span>
    );
  }

  return (
    <span
      title="Submitted by a client via the website"
      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full"
    >
      <UserCheck className="w-3 h-3" aria-hidden="true" />
      Client Review
    </span>
  );
}

// ── Component ────────────────────────────────────────────────────────

/**
 * Live Testimonials / Institutional Trust section on the homepage.
 *
 * Fetches approved client reviews from `/api/testimonials` and allows
 * customers to submit real-time feedback with anti-gibberish validation
 * and explicit source badges (Verified Delivery / Client Review / Institutional Partner).
 */
export default function Testimonials() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [csn, setCsn] = useState("");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isToastLeaving, setIsToastLeaving] = useState(false);

  const submittingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const toastClearTimerRef = useRef<number | null>(null);
  const errorAutoClearRef = useRef<number | null>(null);

  const clearToastTimers = () => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    if (toastClearTimerRef.current !== null) {
      window.clearTimeout(toastClearTimerRef.current);
      toastClearTimerRef.current = null;
    }
  };

  const clearErrorTimer = () => {
    if (errorAutoClearRef.current !== null) {
      window.clearTimeout(errorAutoClearRef.current);
      errorAutoClearRef.current = null;
    }
  };

  // Load live customer reviews from backend API on mount and prepend to INITIAL_TESTIMONIALS
  useEffect(() => {
    let active = true;
    fetch("/api/testimonials")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (
          active &&
          data?.testimonials &&
          Array.isArray(data.testimonials) &&
          data.testimonials.length > 0
        ) {
          const seen = new Set<string>();
          const merged: Testimonial[] = [];
          for (const item of [...data.testimonials, ...INITIAL_TESTIMONIALS]) {
            const key = `${item.author.toLowerCase()}::${item.quote.toLowerCase()}`;
            if (!seen.has(key)) {
              seen.add(key);
              merged.push(item);
            }
            if (merged.length >= 6) break;
          }
          setTestimonials(merged);
        }
      })
      .catch(() => {
        // Keep initial baseline testimonials if offline
      });

    return () => {
      active = false;
      abortControllerRef.current?.abort();
      clearToastTimers();
      clearErrorTimer();
    };
  }, []);

  const handleFieldEdit = (setter: (val: string) => void, value: string) => {
    setter(value);
    if (errorMessage) {
      clearErrorTimer();
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 8000);

    clearErrorTimer();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          author,
          title,
          csn,
          rating,
          quote,
          honeypot,
        }),
      });

      let data: { testimonial?: Testimonial; error?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || !data?.testimonial) {
        // If rate-limited (429), automatically clear the error when the 60s window expires
        if (response.status === 429) {
          errorAutoClearRef.current = window.setTimeout(() => {
            setErrorMessage(null);
          }, 60_000);
        }
        throw new Error(
          data?.error || "Unable to submit your review. Please try again."
        );
      }

      const created = data.testimonial;
      setTestimonials((prev) => [created, ...prev.slice(0, 5)]);
      setAuthor("");
      setTitle("");
      setCsn("");
      setRating(5);
      setQuote("");
      setIsFormOpen(false);
      clearToastTimers();
      setIsToastLeaving(false);
      setSuccessMessage(
        created.verified
          ? "CSN Verified — your review is now live!"
          : "Thank you! Your client review has been published."
      );
      toastTimerRef.current = window.setTimeout(() => {
        setIsToastLeaving(true);
      }, 2800);
      toastClearTimerRef.current = window.setTimeout(() => {
        setSuccessMessage(null);
        setIsToastLeaving(false);
      }, 3200);
    } catch (err: unknown) {
      if (timedOut) {
        setErrorMessage(
          "Submission timed out. Please check your connection and try again."
        );
      } else if (err instanceof Error && err.name === "AbortError") {
        return;
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      window.clearTimeout(timeoutId);
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="testimonials"
      className="bg-slate-50 py-16 md:py-24 border-t border-slate-200/80"
    >
      {/* Top-Center Auto-Dismissing Confirmation Pop-up */}
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[70] w-[calc(100%-2rem)] max-w-md bg-navy-950 text-white border border-emerald-500/50 px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(4,13,26,0.45)] flex items-center gap-3.5 pointer-events-none transition-all duration-300 ${isToastLeaving
              ? "opacity-0 -translate-y-3 scale-95"
              : "opacity-100 translate-y-0 scale-100"
            }`}
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Review Published
            </p>
            <p className="text-xs sm:text-sm font-medium text-white leading-snug mt-0.5">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-red-600 mb-2">
              Institutional Trust
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 tracking-[-0.025em] leading-[1.18]">
              Trusted by Ghana&apos;s Leading Institutions
            </h2>
            <p className="mt-3 text-slate-600 max-w-[58ch] text-sm sm:text-base leading-relaxed">
              Our commitment to security and precision has made us the preferred
              logistics partner for the nation&apos;s most demanding sectors.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsFormOpen((prev) => !prev);
              clearErrorTimer();
              setErrorMessage(null);
            }}
            aria-expanded={isFormOpen}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold text-xs sm:text-sm transition-colors duration-200 cursor-pointer shrink-0"
          >
            {isFormOpen ? (
              <>
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                <span>Share Your Experience</span>
              </>
            )}
          </button>
        </div>

        {/* Collapsible Real-Time Submission Form */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mb-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-bold text-navy-900">
                Submit a Client Review
              </h3>
              <span className="text-xs text-slate-500">
                Enter your booking CSN for a Verified Delivery badge
              </span>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-sm text-red-700"
              >
                <AlertCircle
                  className="w-4 h-4 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Honeypot */}
            <div
              className="opacity-0 absolute -z-50 pointer-events-none w-0 h-0 overflow-hidden"
              aria-hidden="true"
            >
              <label htmlFor="review_company_website">Leave empty</label>
              <input
                id="review_company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="reviewAuthor"
                  className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5"
                >
                  Your Name *
                </label>
                <input
                  id="reviewAuthor"
                  type="text"
                  required
                  placeholder="e.g. Nana Kwaku Boateng"
                  value={author}
                  onChange={(e) => handleFieldEdit(setAuthor, e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label
                  htmlFor="reviewTitle"
                  className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5"
                >
                  Role &amp; Organization *
                </label>
                <input
                  id="reviewTitle"
                  type="text"
                  required
                  placeholder="e.g. Managing Partner, Boateng & Co."
                  value={title}
                  onChange={(e) => handleFieldEdit(setTitle, e.target.value)}
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label
                  htmlFor="reviewCSN"
                  className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5"
                >
                  Tracking CSN{" "}
                  <span className="text-slate-500 font-normal normal-case">
                    (Optional)
                  </span>
                </label>
                <input
                  id="reviewCSN"
                  type="text"
                  placeholder="Your booking CSN (if applicable)"
                  value={csn}
                  onChange={(e) => handleFieldEdit(setCsn, e.target.value)}
                  className={`${INPUT_CLASS} font-mono`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
              <div>
                <span className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                  Rating
                </span>
                <div
                  className="flex items-center gap-1 pt-1"
                  role="radiogroup"
                  aria-label="Star rating"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                      aria-checked={rating === star}
                      role="radio"
                      className={`text-2xl leading-none px-1 py-0.5 rounded cursor-pointer transition-transform hover:scale-110 ${star <= rating ? "text-brand-red-500" : "text-slate-300"
                        }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="reviewQuote"
                  className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1.5"
                >
                  Your Experience *
                </label>
                <textarea
                  id="reviewQuote"
                  rows={2}
                  required
                  maxLength={350}
                  placeholder="How was your document pickup, tracking, and handover?"
                  value={quote}
                  onChange={(e) => handleFieldEdit(setQuote, e.target.value)}
                  className={`${INPUT_CLASS} resize-none`}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-colors duration-200 cursor-pointer flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="w-4 h-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span>Publishing…</span>
                  </>
                ) : (
                  <span>Publish Review</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                  {/* Star Rating */}
                  <div
                    className="flex items-center gap-1 text-brand-red-500"
                    aria-label={`${item.rating} out of 5 stars`}
                  >
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <span
                        key={index}
                        className="text-lg leading-none"
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <ReviewSourceBadge item={item} />
                </div>

                {/* Quote */}
                <p className="italic text-slate-600 text-sm leading-relaxed mb-6">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div>
                <h3 className="font-bold text-navy-900">{item.author}</h3>
                <p className="text-xs text-slate-500 italic mt-0.5">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
