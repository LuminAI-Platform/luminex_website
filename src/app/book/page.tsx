import React from "react";
import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MessageSquare, PhoneCall, Truck, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Schedule Delivery | Luminex Logistics",
  description:
    "Book a secure courier pickup across Ghana. Direct WhatsApp booking with Head of Operations or fast web booking with chain-of-custody verification.",
};

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Request Pickup",
    desc: "Send your details via WhatsApp or our streamlined form. No account registration needed.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Confirm & Pay",
    desc: "Our Head of Operations contacts you to confirm details and agree on a convenient payment method.",
    icon: PhoneCall,
  },
  {
    step: "03",
    title: "Fleet Dispatch",
    desc: "Coordinated with our Fleet Manager for secure transit, telemetry, and fast courier pickup.",
    icon: Truck,
  },
  {
    step: "04",
    title: "ID Handover",
    desc: "Verified handover at destination using your chosen ID (Ghana Card / Passport).",
    icon: ShieldCheck,
  },
];

export default function BookCourierPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        {/* ── Page Header ────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
              Schedule Courier Delivery
            </h1>
          </div>
          <p className="text-slate-500 text-sm sm:text-base pl-4 max-w-2xl">
            Book rapid, secure document transit across Ghana. Connect directly with our operations desk or submit your manifest below.
          </p>
        </div>

        {/* ── 4-Step Process Guide ──────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              How Luminex Delivery Works
            </h2>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Simple 4-Step Flow
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      {step.step}
                    </div>
                    <Icon className="w-4 h-4 text-brand-red-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-navy-900 leading-snug mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Booking Form & WhatsApp Fast-Track ─────────────────── */}
        <ContactForm />
      </div>
    </main>
  );
}