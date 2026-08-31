"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Lock, Loader2, AlertCircle } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────

interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM_DATA: InquiryFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "Enterprise Account",
  message: "",
};

const SUBJECT_OPTIONS = [
  { value: "Enterprise Account", label: "Enterprise Account / Corporate" },
  { value: "Consignment Query", label: "Consignment Tracking Issue" },
  { value: "General Support", label: "General Support" },
] as const;

// ── Shared Styles ────────────────────────────────────────────────────

const INPUT_CLASS =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-shadow";

// ── Component ────────────────────────────────────────────────────────

/**
 * Contact page inquiry form with built-in multi-tier spam protection:
 * - Invisible honeypot trap to catch automated web crawlers/bots
 * - Client mount timestamp heuristic to prevent rapid-fire automated scripts
 * - Live connection to `/api/contact` endpoint with error & loading states
 */
export default function ContactInquiryForm() {
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_FORM_DATA);
  const [honeypot, setHoneypot] = useState("");
  const renderedAtRef = useRef<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  /** Update a single form field by key. */
  const updateField = (key: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /** Handle form submission with anti-spam payload. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          honeypot,
          renderedAt: renderedAtRef.current,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please contact dispatch via phone.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success State ──────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs text-center py-10 sm:py-12">
        <div className="w-12 h-12 bg-brand-red-50 rounded-full flex items-center justify-center text-brand-red-500 mx-auto mb-4">
          <Send className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-navy-900 mb-2">
          Inquiry Received
        </h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you. Our dispatch office has received your query and will reply
          within 30 minutes during business hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData(INITIAL_FORM_DATA);
            renderedAtRef.current = Date.now();
          }}
          className="mt-6 text-xs text-brand-red-500 font-bold uppercase tracking-wider underline cursor-pointer hover:text-brand-red-600 transition-colors"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  // ── Form State ─────────────────────────────────────────────────────
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <MessageSquare className="w-5 h-5 text-brand-red-500 shrink-0" />
          Dispatch Inquiry Form
        </h2>

        {errorMessage && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ── Invisible Honeypot Trap for Bot Detection ────────────────── */}
        <div
          className="opacity-0 absolute -z-50 pointer-events-none w-0 h-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="company_fax_hp">Leave this field empty</label>
          <input
            id="company_fax_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Corporate Email *
            </label>
            <input
              type="email"
              required
              placeholder="j.doe@company.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+233 xx xxx xxxx"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Inquiry Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              className={`${INPUT_CLASS} bg-white cursor-pointer`}
            >
              {SUBJECT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
            Message Details *
          </label>
          <textarea
            rows={4}
            required
            maxLength={500}
            placeholder="Provide document details, origin/destination hubs, or account setup inquiries..."
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={`${INPUT_CLASS} resize-none`}
          />
        </div>

        <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-slate-700">
          <Lock className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-slate-600">
            Your details are processed securely in compliance with the Ghana
            Data Protection Act (Act 843).
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 sm:px-8 py-3 rounded-lg shadow-xs transition-all duration-200 cursor-pointer w-full md:w-auto focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Inquiry…</span>
            </>
          ) : (
            <span>Submit Inquiry</span>
          )}
        </button>
      </form>
    </div>
  );
}
