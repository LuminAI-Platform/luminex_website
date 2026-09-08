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
                {/* 1. New Bookings & Dispatch (Head of Operations) */}
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <MessageSquareText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        All New Bookings
                      </span>
                      <h4 className="font-bold text-navy-900 text-sm mt-0.5">
                        Head of Operations (Bookings & Dispatch)
                      </h4>
                      <p className="text-xs text-slate-500 leading-tight mt-0.5">
                        Coordinates with the Fleet Manager to schedule courier pickups.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                        <a
                          href="https://wa.me/233545975896"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
                        >
                          WhatsApp: +233 54 597 5896
                        </a>
                        <span className="text-slate-300">|</span>
                        <a
                          href="tel:+233545975896"
                          className="text-navy-900 hover:underline"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Customer Relations & Refunds */}
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-navy-900 bg-slate-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Support & Refunds
                      </span>
                      <h4 className="font-bold text-navy-900 text-sm mt-0.5">
                        Head of Customer Relations
                      </h4>
                      <p className="text-xs text-slate-500 leading-tight mt-0.5">
                        For customer service, invoice assistance, and refund requests.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                        <a
                          href="tel:+233596464461"
                          className="text-navy-900 hover:text-brand-red-600 underline"
                        >
                          Tel: +233 59 646 4461
                        </a>
                        <span className="text-slate-300">|</span>
                        <a
                          href="https://wa.me/233596464461"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:underline"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Direct Email */}
                <a
                  href="mailto:luminexlogisticsltd@gmail.com"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
                >
                  <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm">Official Corporate Email</h4>
                    <p className="text-xs text-slate-500 font-mono">luminexlogisticsltd@gmail.com</p>
                  </div>
                </a>

                {/* 4. Accra Headquarters */}
                <div className="flex items-start gap-3 p-3">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
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