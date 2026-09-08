"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Truck,
  FileText,
  Lock,
  Loader2,
  AlertCircle,
  MessageSquareText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

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
  verificationProtocol: "ghana_card",
};

const VERIFICATION_OPTIONS = [
  { value: "ghana_card", label: "Ghana Card (National Identity Card)" },
  { value: "national_id", label: "Passport / Driver's License" },
  { value: "biometric", label: "Biometric Handover Verification" },
  { value: "corporate_seal", label: "Corporate Seal / Authorized Signatory" },
] as const;

const HEAD_OF_OPS_PHONE = "+233 54 597 5896";
const HEAD_OF_OPS_WA_NUMBER = "233545975896";

// ── Shared Styles ────────────────────────────────────────────────────

const INPUT_CLASS =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-shadow";

// ── Component ────────────────────────────────────────────────────────

/**
 * Courier booking / schedule delivery component.
 *
 * Provides:
 * 1. Direct 1-tap WhatsApp booking channel to Head of Operations (+233 54 597 5896).
 * 2. Streamlined web booking form requiring Name, Address, Phone, and Verification ID.
 * 3. CSN generation and post-booking WhatsApp handover trigger.
 * 4. Transparent explanation of the confirmation and payment workflow (no account needed).
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

  /** Direct WhatsApp template for quick booking */
  const directWhatsAppUrl = `https://wa.me/${HEAD_OF_OPS_WA_NUMBER}?text=${encodeURIComponent(
    `Hello Luminex Logistics, I would like to schedule a courier delivery:\n\n` +
      `• Full Name: \n` +
      `• Phone Number: \n` +
      `• Delivery / Pickup Address: \n` +
      `• Verification ID Type (Ghana Card / Passport): `
  )}`;

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
          receiverName: formData.receiverName || formData.senderName,
          receiverContact: formData.receiverContact || formData.senderContact,
          destinationAddress: formData.destinationAddress || formData.collectionAddress,
          description: formData.description || "Courier Consignment",
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
        setErrorMessage(
          "An unexpected network error occurred. Please contact our Head of Operations directly via WhatsApp or telephone."
        );
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

  /** URL to share completed booking manifest to Head of Operations */
  const postBookingWhatsAppUrl = generatedCSN
    ? `https://wa.me/${HEAD_OF_OPS_WA_NUMBER}?text=${encodeURIComponent(
        `Hello Head of Operations, I have submitted a delivery booking on the Luminex website:\n\n` +
          `• Tracking CSN: ${generatedCSN}\n` +
          `• Full Name: ${formData.senderName}\n` +
          `• Phone Number: ${formData.senderContact}\n` +
          `• Pickup Address: ${formData.collectionAddress}\n` +
          `• Destination: ${formData.destinationAddress || formData.collectionAddress}\n` +
          `• Verification ID: ${formData.verificationProtocol.replace("_", " ").toUpperCase()}\n\n` +
          `Please confirm my booking and arrange payment method.`
      )}`
    : directWhatsAppUrl;

  return (
    <div className="space-y-8">
      {/* ── Direct WhatsApp Fast-Track Callout ─────────────────── */}
      <div className="bg-gradient-to-r from-emerald-900 to-navy-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-800/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <MessageSquareText className="w-3.5 h-3.5" />
            Fastest Booking Method
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Book Instantly via WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All new deliveries are coordinated directly by our{" "}
            <span className="text-emerald-300 font-semibold">Head of Operations</span>{" "}
            (<span className="font-mono text-white">{HEAD_OF_OPS_PHONE}</span>). He will coordinate with the fleet manager, confirm your pickup, and arrange payment at your convenience.
          </p>
        </div>

        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg shrink-0 group"
        >
          <MessageSquareText className="w-5 h-5 text-navy-950" />
          <span>Chat on WhatsApp</span>
          <ExternalLink className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* ── Web Booking Form ──────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xs space-y-8"
      >
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-red-500 shrink-0" />
              Schedule Courier Delivery Online
            </h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              No Account Required
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in your details below. We only require your name, delivery address, contact number, and verification ID.
          </p>
        </div>

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

        {/* ── Section 1: Customer Identity & Verification ──────── */}
        <div>
          <h3 className="text-base font-bold text-navy-900 flex items-center gap-2 mb-4 text-slate-800">
            <UserCheck className="w-4 h-4 text-brand-red-500 shrink-0" />
            1. Your Information & Verification ID
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label htmlFor="senderName" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Full Legal Name / Entity <span className="text-red-500">*</span>
              </label>
              <input
                id="senderName"
                type="text"
                required
                placeholder="e.g. Kwame Mensah / Legal Partners"
                value={formData.senderName}
                onChange={(e) => updateField("senderName", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="senderContact" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Phone Number (WhatsApp Preferred) <span className="text-red-500">*</span>
              </label>
              <input
                id="senderContact"
                type="tel"
                required
                placeholder="+233 XX XXX XXXX"
                pattern="[\+]?[0-9\s\-]{7,15}"
                title="Enter a valid phone number (7-15 digits)"
                value={formData.senderContact}
                onChange={(e) => updateField("senderContact", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="verificationProtocol" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Which ID will you use to verify legitimacy? <span className="text-red-500">*</span>
              </label>
              <select
                id="verificationProtocol"
                required
                value={formData.verificationProtocol}
                onChange={(e) => updateField("verificationProtocol", e.target.value)}
                className={`${INPUT_CLASS} bg-white cursor-pointer`}
              >
                {VERIFICATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Ensures safe chain-of-custody. Our courier verifies this ID upon handover.
              </p>
            </div>

            <div>
              <label htmlFor="senderEmail" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="senderEmail"
                type="email"
                placeholder="For copy of receipt / tracking link"
                value={formData.senderEmail}
                onChange={(e) => updateField("senderEmail", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>

        {/* ── Section 2: Delivery & Pickup Addresses ──────────── */}
        <div>
          <h3 className="text-base font-bold text-navy-900 flex items-center gap-2 mb-4 text-slate-800">
            <MapPin className="w-4 h-4 text-brand-red-500 shrink-0" />
            2. Delivery & Collection Addresses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label htmlFor="collectionAddress" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Pickup / Collection Location <span className="text-red-500">*</span>
              </label>
              <input
                id="collectionAddress"
                type="text"
                required
                placeholder="e.g. GA-123-4567, Airport Residential, Accra"
                value={formData.collectionAddress}
                onChange={(e) => updateField("collectionAddress", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="destinationAddress" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Delivery / Destination Address <span className="text-red-500">*</span>
              </label>
              <input
                id="destinationAddress"
                type="text"
                required
                placeholder="e.g. Ridge Commercial Area / Cantonments, Accra"
                value={formData.destinationAddress}
                onChange={(e) => updateField("destinationAddress", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="receiverName" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Receiver Name <span className="text-slate-400 font-normal">(Leave blank if same as above)</span>
              </label>
              <input
                id="receiverName"
                type="text"
                placeholder="Individual or entity receiving delivery"
                value={formData.receiverName}
                onChange={(e) => updateField("receiverName", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label htmlFor="receiverContact" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Receiver Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="receiverContact"
                type="tel"
                placeholder="+233 XX XXX XXXX"
                value={formData.receiverContact}
                onChange={(e) => updateField("receiverContact", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                Consignment Description / Notes <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="description"
                type="text"
                maxLength={300}
                placeholder="e.g. Legal documents, corporate files, tender bid sealed package"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>

        {/* ── Operational Workflow Notice ─────────────────────────── */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-navy-900 text-sm">
                How Your Booking Is Processed
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                1. Once submitted, our <strong className="text-navy-900">Head of Operations</strong> will contact you to confirm the booking details and your convenient payment method (Mobile Money, bank transfer, or cash on collection).
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                2. He will coordinate directly with our <strong className="text-navy-900">Fleet Manager</strong> to dispatch the courier and ensure verified delivery against your selected ID.
              </p>
              <p className="text-xs text-slate-500 italic pt-1">
                Notice: An online account is not required for bookings.
              </p>
            </div>
          </div>
        </div>

        {/* ── Submit Button ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            Need urgent same-hour dispatch? Call or WhatsApp{" "}
            <a
              href={`tel:${HEAD_OF_OPS_PHONE.replace(/\s+/g, "")}`}
              className="text-brand-red-600 font-bold hover:underline"
            >
              {HEAD_OF_OPS_PHONE}
            </a>
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2 shrink-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Scheduling Delivery…</span>
              </>
            ) : (
              <span>Submit Delivery Request ▷</span>
            )}
          </button>
        </div>
      </form>

      {/* ── Success Confirmation Modal ──────────────────────────── */}
      {generatedCSN && (
        <div className="fixed inset-0 bg-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 text-center space-y-5 border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-navy-900">
                Delivery Request Registered!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Your consignment has been registered in the Luminex custody network.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Consignment Security Number (CSN):</span>
                <span className="font-semibold text-emerald-600">Active</span>
              </div>
              <div className="font-mono font-black text-brand-red-600 text-xl tracking-wider text-center py-1">
                {generatedCSN}
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                Save this reference code to track your document in real-time.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-left text-xs text-emerald-900 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Next Step: Ops Confirmation & Payment
              </p>
              <p className="text-emerald-800 leading-relaxed text-[11px]">
                Our <strong>Head of Operations</strong> ({HEAD_OF_OPS_PHONE}) will contact you shortly to confirm your booking and agree on your preferred payment method.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={postBookingWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquareText className="w-4 h-4" />
                Send Details to Ops on WhatsApp
              </a>

              <button
                onClick={handleModalClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors duration-200 cursor-pointer"
              >
                Done / Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}