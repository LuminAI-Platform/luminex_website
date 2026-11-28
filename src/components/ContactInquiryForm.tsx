"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Lock,
  Loader2,
  AlertCircle,
  ChevronDown,
  Building2,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────

interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  organization: string;
  estimatedVolume: string;
  message: string;
}

const INITIAL_FORM_DATA: InquiryFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  organization: "",
  estimatedVolume: "",
  message: "",
};

const SUBJECT_OPTIONS = [
  { value: "Enterprise Account", label: "Corporate portal access" },
  { value: "Dedicated Dispatch", label: "Dedicated dispatch" },
  { value: "Consignment Query", label: "Consignment tracking" },
  { value: "Refund or Billing", label: "Billing or refund enquiry" },
  { value: "General Support", label: "General enquiry" },
] as const;

const VOLUME_OPTIONS = [
  "1–25 consignments / month",
  "25–100 consignments / month",
  "100+ consignments / month (Enterprise)",
] as const;

// ── Shared Styles ────────────────────────────────────────────────────

const INPUT_CLASS =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-shadow bg-white";

const SELECT_CLASS =
  "w-full appearance-none border border-slate-300 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-shadow bg-white cursor-pointer";

// ── Component ────────────────────────────────────────────────────────

/**
 * Contact & Corporate Access Request form with built-in multi-tier spam protection:
 * - Preselects Corporate Portal mode only when navigated with `?intent=corporate`
 * - Leaves Request Type & Volume unselected with explicit placeholders otherwise
 * - Synchronous double-click lock & 8s network timeout
 */
export default function ContactInquiryForm() {
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_FORM_DATA);
  const [honeypot, setHoneypot] = useState("");
  const renderedAtRef = useRef<number | null>(null);
  const submittingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorporateRequest = formData.subject === "Enterprise Account";

  useEffect(() => {
    renderedAtRef.current = Date.now();
    // Preselect Corporate Portal mode only when arriving from "Request Access" (?intent=corporate)
    const params = new URLSearchParams(window.location.search);
    if (params.get("intent") === "corporate") {
      const rafId = window.requestAnimationFrame(() => {
        setFormData((prev) =>
          prev.subject ? prev : { ...prev, subject: "Enterprise Account" }
        );
      });
      return () => {
        window.cancelAnimationFrame(rafId);
        abortControllerRef.current?.abort();
      };
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  /** Update a single form field by key. */
  const updateField = (key: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  /** Handle form submission with synchronous double-click guard, timeout & anti-spam payload. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    if (!formData.subject) {
      setErrorMessage("Please select a request type.");
      return;
    }

    if (isCorporateRequest && !formData.estimatedVolume) {
      setErrorMessage("Please select an estimated monthly volume.");
      return;
    }

    submittingRef.current = true;

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 8000);

    setIsSubmitting(true);
    setErrorMessage(null);

    const formattedMessage = isCorporateRequest
      ? `[Organisation: ${formData.organization.trim() || "Not specified"} | Estimated Volume: ${formData.estimatedVolume}]\n\n${formData.message.trim()}`
      : formData.message.trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formattedMessage,
          honeypot,
          renderedAt: renderedAtRef.current,
        }),
      });

      let data: { error?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to submit inquiry. Please try again."
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (timedOut) {
        setErrorMessage(
          "The request timed out. Please check your connection or contact dispatch by phone."
        );
      } else if (err instanceof Error && err.name === "AbortError") {
        return;
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please contact dispatch via phone."
        );
      }
    } finally {
      window.clearTimeout(timeoutId);
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  // ── Success State ──────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        id="corporate-access"
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs text-center py-10 sm:py-12 scroll-mt-24"
      >
        <div className="w-12 h-12 bg-brand-red-50 rounded-full flex items-center justify-center text-brand-red-500 mx-auto mb-4">
          <Send className="w-6 h-6" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-semibold text-navy-900 mb-2">
          {isCorporateRequest ? "Request Received" : "Inquiry Received"}
        </h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          {isCorporateRequest
            ? "Thank you for your interest in Luminex Corporate Logistics. Your access request has been received. Our team will review your organisation's requirements and contact you regarding the next steps."
            : "Thank you. Our dispatch office has received your query and will reply within 30 minutes during business hours."}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData(INITIAL_FORM_DATA);
            renderedAtRef.current = Date.now();
          }}
          className="mt-6 text-xs text-brand-red-600 font-semibold uppercase tracking-wider underline cursor-pointer hover:text-brand-red-700 transition-colors"
        >
          {isCorporateRequest
            ? "Submit another request"
            : "Send another inquiry"}
        </button>
      </div>
    );
  }

  // ── Form State ─────────────────────────────────────────────────────
  return (
    <div
      id="corporate-access"
      className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 md:p-8 shadow-xs scroll-mt-24"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="border-b border-slate-100 pb-3.5 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-navy-900 flex items-center gap-2">
            {isCorporateRequest ? (
              <Building2
                className="w-5 h-5 text-brand-red-500 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <MessageSquare
                className="w-5 h-5 text-brand-red-500 shrink-0"
                aria-hidden="true"
              />
            )}
            {isCorporateRequest
              ? "Corporate Portal & Account Access Request"
              : "Send Us a Message"}
          </h2>
          {isCorporateRequest && (
            <p className="text-xs text-slate-500 mt-1">
              For law firms, financial institutions, and high-volume corporate
              partners seeking dedicated dispatch management, audit trails, and
              consolidated billing.
            </p>
          )}
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs sm:text-sm text-red-700"
          >
            <AlertCircle
              className="w-4 h-4 shrink-0 mt-0.5"
              aria-hidden="true"
            />
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
            <label
              htmlFor="inquirySubject"
              className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2"
            >
              Request Type *
            </label>
            <div className="relative">
              <select
                id="inquirySubject"
                required
                value={formData.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                className={`${SELECT_CLASS} ${
                  formData.subject ? "text-slate-900" : "text-slate-400"
                }`}
              >
                <option value="" disabled>
                  Select a request type
                </option>
                {SUBJECT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="text-slate-900"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="inquiryFullName"
              className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2"
            >
              {isCorporateRequest ? "Contact Person Name *" : "Full Name *"}
            </label>
            <input
              id="inquiryFullName"
              type="text"
              required
              placeholder="Jane Ansah"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        {isCorporateRequest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label
                htmlFor="inquiryOrganization"
                className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2"
              >
                Organisation Name *
              </label>
              <input
                id="inquiryOrganization"
                type="text"
                required={isCorporateRequest}
                placeholder="e.g. Ansah & Partners Legal Chambers"
                value={formData.organization}
                onChange={(e) => updateField("organization", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="inquiryVolume"
                className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2"
              >
                Estimated Monthly Volume *
              </label>
              <div className="relative">
                <select
                  id="inquiryVolume"
                  required={isCorporateRequest}
                  value={formData.estimatedVolume}
                  onChange={(e) => updateField("estimatedVolume", e.target.value)}
                  className={`${SELECT_CLASS} ${
                    formData.estimatedVolume ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  <option value="" disabled>
                    Select monthly volume
                  </option>
                  {VOLUME_OPTIONS.map((vol) => (
                    <option key={vol} value={vol} className="text-slate-900">
                      {vol}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label
              htmlFor="inquiryEmail"
              className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2"
            >
              Official Email Address *
            </label>
            <input
              id="inquiryEmail"
              type="email"
              required
              placeholder="j.ansah@company.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label
              htmlFor="inquiryPhone"
              className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2"
            >
              Phone Number {isCorporateRequest ? "*" : ""}
            </label>
            <input
              id="inquiryPhone"
              type="tel"
              required={isCorporateRequest}
              placeholder="+233 xx xxx xxxx"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="inquiryMessage"
            className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2"
          >
            {isCorporateRequest
              ? "Logistics & Portal Requirements *"
              : "Message Details *"}
          </label>
          <textarea
            id="inquiryMessage"
            rows={4}
            required
            maxLength={500}
            placeholder={
              isCorporateRequest
                ? "Describe your document types, pickup hubs, recurring delivery schedules, or billing preferences..."
                : "Provide document details, origin/destination hubs, or support details..."
            }
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            className={`${INPUT_CLASS} resize-none`}
          />
        </div>

        <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-slate-700">
          <Lock
            className="w-5 h-5 text-navy-900 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-xs leading-relaxed text-slate-600">
            Your details are processed securely in compliance with the Ghana
            Data Protection Act (Act 843).
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 sm:px-8 py-3 rounded-lg shadow-xs transition-colors duration-200 cursor-pointer w-full md:w-auto focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span>
                {isCorporateRequest
                  ? "Submitting Access Request…"
                  : "Submitting Inquiry…"}
              </span>
            </>
          ) : (
            <span>
              {isCorporateRequest
                ? "Submit Access Request"
                : "Submit Inquiry"}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
