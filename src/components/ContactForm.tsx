"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, Truck, FileText, Lock, Loader2, AlertCircle } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────

interface BookingFormData {
  senderName: string;
  senderEmail: string;
  senderContact: string;
  collectionAddress: string;
  receiverName: string;
  receiverContact: string;
  destinationAddress: string;
  description: string;
  verificationProtocol: string;
}

const INITIAL_FORM_DATA: BookingFormData = {
  senderName: "",
  senderEmail: "",
  senderContact: "",
  collectionAddress: "",
  receiverName: "",
  receiverContact: "",
  destinationAddress: "",
  description: "",
  verificationProtocol: "",
};

const VERIFICATION_OPTIONS = [
  { value: "", label: "Select mandatory ID check", disabled: true },
  { value: "national_id", label: "National ID / Passport", disabled: false },
  { value: "ghana_card", label: "Ghana Card Verification", disabled: false },
  { value: "biometric", label: "Biometric Signature Handover", disabled: false },
  { value: "corporate_seal", label: "Executive / Corporate Seal", disabled: false },
] as const;

// ── Shared Styles ────────────────────────────────────────────────────

const INPUT_CLASS =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-shadow";

// ── Component ────────────────────────────────────────────────────────

/**
 * Courier booking / schedule delivery form.
 *
 * Three-section form (Sender → Recipient → Manifest) with
 * server-side validation, database persistence, anti-spam heuristics,
 * and live CSN generation.
 */
export function ContactForm() {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_DATA);
  const [honeypot, setHoneypot] = useState("");
  const renderedAtRef = useRef<number | null>(null);
  const [generatedCSN, setGeneratedCSN] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  /** Update a single form field by key. */
  const updateField = (key: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /** Handle form submission with live backend Route Handler. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/book", {
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
        throw new Error(data.error || "Unable to submit booking. Please try again.");
      }

      setGeneratedCSN(data.csn);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected network error occurred. Please contact dispatch via telephone.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setGeneratedCSN(null);
    setFormData(INITIAL_FORM_DATA);
    renderedAtRef.current = Date.now();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 md:p-10 shadow-xs space-y-8"
      >
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-sm text-red-700">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Submission Error</p>
              <p className="text-xs text-red-600 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* ── Invisible Honeypot Field ─────────────────────────── */}
        <div
          className="opacity-0 absolute -z-50 pointer-events-none w-0 h-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="company_booking_fax">Leave this field empty</label>
          <input
            id="company_booking_fax"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* ── Section 1: Sender Details ─────────────────────────── */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6">
            <MapPin className="w-5 h-5 text-brand-red-500 shrink-0" />
            1. Sender Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label htmlFor="senderName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Full Name / Entity
              </label>
              <input
                id="senderName"
                type="text"
                required
                placeholder="e.g. Luminex Corporate Operations"
                value={formData.senderName}
                onChange={(e) => updateField("senderName", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="senderEmail" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                id="senderEmail"
                type="email"
                required
                placeholder="e.g. ops@luminex.com"
                value={formData.senderEmail}
                onChange={(e) => updateField("senderEmail", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="senderContact" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Contact Number
              </label>
              <input
                id="senderContact"
                type="tel"
                required
                placeholder="+233 XX XXX XXXX"
                pattern="[\+]?[0-9\s\-]{7,15}"
                title="Enter a valid phone number (7-15 digits, may include + and spaces)"
                value={formData.senderContact}
                onChange={(e) => updateField("senderContact", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="collectionAddress" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Collection Location (Digital Address / GPS)
              </label>
              <input
                id="collectionAddress"
                type="text"
                required
                placeholder="e.g. GA-123-4567, Accra"
                value={formData.collectionAddress}
                onChange={(e) => updateField("collectionAddress", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>

        {/* ── Section 2: Recipient Details ──────────────────────── */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6">
            <Truck className="w-5 h-5 text-brand-red-500 shrink-0" />
            2. Recipient Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label htmlFor="receiverName" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Authorized Receiver
              </label>
              <input
                id="receiverName"
                type="text"
                required
                placeholder="Legal name matching ID"
                value={formData.receiverName}
                onChange={(e) => updateField("receiverName", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="receiverContact" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Contact Number
              </label>
              <input
                id="receiverContact"
                type="tel"
                required
                placeholder="+233 XX XXX XXXX"
                pattern="[\+]?[0-9\s\-]{7,15}"
                title="Enter a valid phone number (7-15 digits, may include + and spaces)"
                value={formData.receiverContact}
                onChange={(e) => updateField("receiverContact", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="destinationAddress" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Destination Address
              </label>
              <input
                id="destinationAddress"
                type="text"
                required
                placeholder="Secure facility or residential digital address"
                value={formData.destinationAddress}
                onChange={(e) => updateField("destinationAddress", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>

        {/* ── Section 3: Manifest Configuration ────────────────── */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6">
            <FileText className="w-5 h-5 text-brand-red-500 shrink-0" />
            3. Manifest Configuration
          </h2>

          <div className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Item/Document Description
              </label>
              <textarea
                id="description"
                rows={4}
                required
                maxLength={500}
                placeholder="Briefly describe contents (e.g. Legal contracts, certified blueprints)"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className={`${INPUT_CLASS} resize-none`}
              />
              <p className="text-xs text-slate-400 mt-1 text-right">
                {formData.description.length}/500
              </p>
            </div>

            <div>
              <label htmlFor="verificationProtocol" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Doorstep Verification Protocol
              </label>
              <select
                id="verificationProtocol"
                required
                value={formData.verificationProtocol}
                onChange={(e) => updateField("verificationProtocol", e.target.value)}
                className={`${INPUT_CLASS} bg-white cursor-pointer`}
              >
                {VERIFICATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Security Clearance Notice ─────────────────────────── */}
        <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-slate-700">
          <Lock className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-navy-900 text-sm mb-1">
              Security Clearance Notice
            </h4>
            <p className="text-xs leading-relaxed text-slate-600">
              By proceeding, you authorize Luminex Logistics to execute strict
              doorstep verification protocols. Deliveries will only be released
              to individuals presenting the exact identification specified
              above.
            </p>
          </div>
        </div>

        {/* ── Submit Button ────────────────────────────────────── */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 sm:px-8 py-3 rounded-lg shadow-xs flex items-center gap-2 transition-all duration-200 cursor-pointer ml-auto focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Scheduling Pickup…</span>
              </>
            ) : (
              <span>Schedule Pickup ▷</span>
            )}
          </button>
        </div>
      </form>

      {/* ── Success Confirmation Modal ──────────────────────────── */}
      {generatedCSN && (
        <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-extrabold text-navy-900">
              Transfer Scheduled
            </h3>
            <p className="text-xs text-slate-600">
              Your pickup request has been dispatched. Please retain your CSN
              below:
            </p>
            <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 font-mono font-bold text-brand-red-600 text-lg tracking-wider">
              {generatedCSN}
            </div>
            <button
              onClick={handleModalClose}
              className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2"
            >
              Close Confirmation
            </button>
          </div>
        </div>
      )}
    </>
  );
}