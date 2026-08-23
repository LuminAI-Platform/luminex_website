import React from "react";
import { Metadata } from "next";
import { Phone, Mail, MessageSquareText, MapPin, Clock } from "lucide-react";
import ContactInquiryForm from "@/components/ContactInquiryForm";

export const metadata: Metadata = {
  title: "Contact Us | Luminex Logistics",
  description:
    "Get in touch with Luminex Logistics. Reach our dispatch center in Accra via phone, email, WhatsApp, or visit our head office.",
};

export default function ContactPage() {
  return (
    <main className="bg-bg-light min-h-screen py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h1 className="text-3xl md:text-5xl font-black text-navy-900 tracking-tight">
              Get in Touch
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl text-base md:text-lg pl-4">
            Reach our dispatch operations team directly for enterprise accounts, urgent document transfers, or customer support.
          </p>
        </div>

        {/* Section 2: Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Col Span 7): Inquiry Form */}
          <div className="lg:col-span-7">
            <ContactInquiryForm />
          </div>

          {/* Right Column (Col Span 5): Direct Contact Information */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <h3 className="text-lg font-bold text-navy-900 mb-4 pb-2 border-b border-slate-100">
                Direct Communication Channels
              </h3>
              <div className="space-y-3">
                {/* 1. Telephone */}
                <a
                  href="tel:+233302908471"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
                >
                  <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm">Telephone Support Line</h4>
                    <p className="text-xs text-slate-500 font-mono">+233 (0) 30 290 8471</p>
                  </div>
                </a>

                {/* 2. Direct Email */}
                <a
                  href="mailto:ops@luminexlogistics.com"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
                >
                  <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm">Direct Operations Email</h4>
                    <p className="text-xs text-slate-500 font-mono">ops@luminexlogistics.com</p>
                  </div>
                </a>

                {/* 3. WhatsApp Direct */}
                <a
                  href="https://wa.me/233302908471"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
                >
                  <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquareText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm">WhatsApp Direct Dispatch</h4>
                    <p className="text-xs text-slate-500">Instant chat dispatch desk</p>
                  </div>
                </a>

                {/* 4. Accra Headquarters */}
                <div className="flex items-start gap-3 p-3">
                  <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm">Accra Headquarters</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      H302 Sowah Larbi Ave, Accra, Ghana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Operating Hours Banner */}
      <div className="mt-16 bg-navy-950 text-slate-300 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-xs md:text-sm font-medium flex items-center justify-center gap-2 flex-wrap">
          <Clock className="w-4 h-4 text-brand-red-500 inline shrink-0" />
          <span>Operational Hours: Monday – Friday: 08:00 – 18:00 GMT</span>
          <span className="hidden md:inline">|</span>
          <span>Saturday: 09:00 – 13:00 GMT</span>
          <span className="hidden md:inline">|</span>
          <span className="text-white font-bold">24/7 Armored Standby for Enterprise Contracts</span>
        </div>
      </div>
    </main>
  );
}