import React from "react";
import { Metadata } from "next";
import { Phone, Mail, MessageSquareText, MapPin, Clock } from "lucide-react";
import ContactInquiryForm from "@/components/ContactInquiryForm";
import PageHeader from "@/components/PageHeader";
import AccraHoursStatus from "@/components/AccraHoursStatus";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | Luminex Logistics",
  description:
    "Get in touch with Luminex Logistics. Reach our dispatch center in Accra via phone, email, WhatsApp, or visit our head office.",
};

export default function ContactPage() {
  return (
    <main className="bg-bg-light py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Shared Header */}
        <div className="mb-10 sm:mb-12">
          <PageHeader
            eyebrow="Contact"
            title="Get in Touch"
            subtitle="Reach our Accra dispatch desk or Customer Relations Office for enterprise onboarding, urgent transfers, or support."
          />
        </div>

        {/* Section 2: Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Col Span 7): Inquiry Form */}
          <div className="lg:col-span-7">
            <ContactInquiryForm />
          </div>

          {/* Right Column (Col Span 5): Direct Contact Information */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
              <h2 className="text-base sm:text-lg font-semibold text-navy-900 mb-4 pb-3 border-b border-slate-100">
                Direct Communication Channels
              </h2>
              <div className="space-y-3.5">
                {/* 1. Bookings & Dispatch (Head of Operations) */}
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/60">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                      <MessageSquareText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
                        Bookings &amp; Dispatch
                      </p>
                      <h3 className="font-semibold text-navy-900 text-sm mt-0.5">
                        Head of Operations
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                        Coordinates pickup windows, manifests, and fleet dispatch.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-semibold flex-wrap">
                        <a
                          href="https://wa.me/233545975896"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 hover:text-emerald-800 underline whitespace-nowrap"
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

                {/* 2. Support & Refunds (Customer Relations) */}
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/60">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-600 shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-brand-red-700 uppercase tracking-wider">
                        Support &amp; Refunds
                      </p>
                      <h3 className="font-semibold text-navy-900 text-sm mt-0.5">
                        Customer Relations Office
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                        For customer service, invoice assistance, and refund claims.
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs font-semibold flex-wrap">
                        <a
                          href="tel:+233596464461"
                          className="text-navy-900 hover:text-brand-red-600 underline whitespace-nowrap"
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

                {/* 3. Direct Email & Headquarters */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <a
                    href="mailto:luminexlogisticsltd@gmail.com"
                    className="flex items-start gap-3 p-2.5 -mx-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-600 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-navy-900 text-sm">
                        Official Corporate Email
                      </h3>
                      <p className="text-xs text-slate-600 break-all">
                        luminexlogisticsltd@gmail.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-2.5 -mx-2.5">
                    <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 text-sm">
                        Accra Headquarters
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        H302 Sowah Larbi Ave, Accra, Ghana
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 -mx-2.5">
                    <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-semibold text-navy-900 text-sm">
                          Operational Hours
                        </h3>
                        <AccraHoursStatus />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed tabular-nums">
                        {SITE_CONFIG.hours
                          .map(
                            (rule) =>
                              `${rule.label}: ${rule.open} – ${rule.close} GMT`
                          )
                          .join(" · ")}
                      </p>
                      <p className="text-[11px] font-medium text-navy-900">
                        24/7 standby for enterprise contract clients
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
