'use client';

import React, { useState } from "react";
import { MessageSquare, Send, Lock } from "lucide-react";

export default function ContactInquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Enterprise Account",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs text-center py-12">
        <div className="w-12 h-12 bg-brand-red-50 rounded-full flex items-center justify-center text-brand-red-500 mx-auto mb-4">
          <Send className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-navy-900 mb-2">Inquiry Received</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you. Our dispatch office has received your query and will reply within 30 minutes during business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-xs text-brand-red-500 font-bold uppercase tracking-wider underline cursor-pointer"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-5">
        <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
          <MessageSquare className="w-5 h-5 text-brand-red-500 shrink-0" />
          Dispatch Inquiry Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+233 xx xxx xxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-2">
              Inquiry Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 bg-white"
            >
              <option value="Enterprise Account">Enterprise Account / Corporate</option>
              <option value="Consignment Query">Consignment Tracking Issue</option>
              <option value="General Support">General Support</option>
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
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
          />
        </div>

        <div className="bg-blue-50/80 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-slate-700">
          <Lock className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-slate-600">
            Your details are processed securely in compliance with the Ghana Data Protection Act (Act 843).
          </p>
        </div>

        <button
          type="submit"
          className="bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-xs transition-all cursor-pointer w-full md:w-auto"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}
