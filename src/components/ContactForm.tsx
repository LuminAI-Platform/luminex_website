"use client";

import React, { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderContact: "",
    collectionAddress: "",
    receiverName: "",
    receiverContact: "",
    destinationAddress: "",
    description: "",
    verificationProtocol: "",
  });

  const [generatedCSN, setGeneratedCSN] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request delay (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const randomCSN = `LMX-GRA-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCSN(randomCSN);
    setIsSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 md:p-10 shadow-xs space-y-8">
        {/* Section 1: Sender Details */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6">
            <svg className="w-5 h-5 text-brand-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            1. Sender Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="senderName" className="block text-sm font-semibold text-slate-700 mb-1">Full Name / Entity</label>
              <input
                id="senderName"
                type="text"
                required
                placeholder="e.g. Luminex Corporate Operations"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>

            <div>
              <label htmlFor="senderEmail" className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                id="senderEmail"
                type="email"
                required
                placeholder="e.g. ops@luminex.com"
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>

            <div>
              <label htmlFor="senderContact" className="block text-sm font-semibold text-slate-700 mb-1">Contact Number</label>
              <input
                id="senderContact"
                type="tel"
                required
                placeholder="+233 XX XXX XXXX"
                pattern="[\+]?[0-9\s\-]{7,15}"
                title="Enter a valid phone number (7-15 digits, may include + and spaces)"
                value={formData.senderContact}
                onChange={(e) => setFormData({ ...formData, senderContact: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>

            <div>
              <label htmlFor="collectionAddress" className="block text-sm font-semibold text-slate-700 mb-1">Collection Location (Digital Address / GPS)</label>
              <input
                id="collectionAddress"
                type="text"
                required
                placeholder="e.g. GA-123-4567, Accra"
                value={formData.collectionAddress}
                onChange={(e) => setFormData({ ...formData, collectionAddress: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Recipient Details */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6 mt-8">
            <svg className="w-5 h-5 text-brand-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v9m4-10h2a1 1 0 011 1v3a1 1 0 01-1 1h-1m-4-4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            2. Recipient Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="receiverName" className="block text-sm font-semibold text-slate-700 mb-1">Authorized Receiver</label>
              <input
                id="receiverName"
                type="text"
                required
                placeholder="Legal name matching ID"
                value={formData.receiverName}
                onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>

            <div>
              <label htmlFor="receiverContact" className="block text-sm font-semibold text-slate-700 mb-1">Contact Number</label>
              <input
                id="receiverContact"
                type="tel"
                required
                placeholder="+233 XX XXX XXXX"
                pattern="[\+]?[0-9\s\-]{7,15}"
                title="Enter a valid phone number (7-15 digits, may include + and spaces)"
                value={formData.receiverContact}
                onChange={(e) => setFormData({ ...formData, receiverContact: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="destinationAddress" className="block text-sm font-semibold text-slate-700 mb-1">Destination Address</label>
              <input
                id="destinationAddress"
                type="text"
                required
                placeholder="Secure facility or residential digital address"
                value={formData.destinationAddress}
                onChange={(e) => setFormData({ ...formData, destinationAddress: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Manifest Configuration */}
        <div>
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6 mt-8">
            <svg className="w-5 h-5 text-brand-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            3. Manifest Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">Item/Document Description</label>
              <textarea
                id="description"
                rows={4}
                required
                maxLength={500}
                placeholder="Briefly describe contents (e.g. Legal contracts, certified blueprints)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 resize-none"
              />
              <p className="text-xs text-slate-400 mt-1 text-right">{formData.description.length}/500</p>
            </div>

            <div>
              <label htmlFor="verificationProtocol" className="block text-sm font-semibold text-slate-700 mb-1">Doorstep Verification Protocol</label>
              <select
                id="verificationProtocol"
                required
                value={formData.verificationProtocol}
                onChange={(e) => setFormData({ ...formData, verificationProtocol: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
              >
                <option value="" disabled>Select mandatory ID check</option>
                <option value="national_id">National ID / Passport</option>
                <option value="ghana_card">Ghana Card Verification</option>
                <option value="biometric">Biometric Signature Handover</option>
                <option value="corporate_seal">Executive / Corporate Seal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Notice Callout */}
        <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-4 my-8 flex items-start gap-3 text-slate-700">
          <svg className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h4 className="font-bold text-navy-900 text-sm mb-1">Security Clearance Notice</h4>
            <p className="text-xs leading-relaxed text-slate-600">
              By proceeding, you authorize Luminex Logistics to execute strict doorstep verification protocols. Deliveries will only be released to individuals presenting the exact identification specified above.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg shadow-xs flex items-center gap-2 transition-all cursor-pointer ml-auto"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Processing…</span>
              </>
            ) : (
              <span>Schedule Pickup ▷</span>
            )}
          </button>
        </div>
      </form>

      {generatedCSN && (
        <div className="fixed inset-0 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-center space-y-4 border border-slate-200 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
            <h3 className="text-xl font-extrabold text-navy-900">Transfer Scheduled</h3>
            <p className="text-xs text-slate-600">Your pickup request has been dispatched. Please retain your CSN below:</p>
            <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 font-mono font-bold text-brand-red-600 text-lg tracking-wider">
              {generatedCSN}
            </div>
            <button
              onClick={() => setGeneratedCSN(null)}
              className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Close Confirmation
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}