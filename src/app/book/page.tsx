import React from "react";
import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { MessageSquare, PhoneCall, Truck, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Schedule Delivery | Luminex Logistics",
  description:
    "Book a secure courier pickup across Ghana. Direct WhatsApp booking with our Bookings & Dispatch Desk or fast web booking with chain-of-custody verification.",
};

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Request Pickup",
    desc: "Submit via WhatsApp or the form above. No account required.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Confirm & Pay",
    desc: "Our Bookings & Dispatch Desk confirms timing and settlement.",
    icon: PhoneCall,
  },
  {
    step: "03",
    title: "Fleet Dispatch",
    desc: "A vetted courier is assigned with live CSN checkpoint updates.",
    icon: Truck,
  },
  {
    step: "04",
    title: "ID Handover",
    desc: "Verified doorstep delivery via Ghana Card or Passport.",
    icon: ShieldCheck,
  },
];

export default function BookCourierPage() {
  return (
    <main className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        {/* ── Page Header ────────────────────────────────────────── */}
        <PageHeader
          eyebrow="Bookings & Dispatch"
          title="Schedule Courier Delivery"
          subtitle="Book rapid, secure document transit across Ghana. Message our dispatch desk on WhatsApp or submit your manifest below."
        />

        {/* ── Booking Form & WhatsApp Fast-Track (Primary Task First) ─ */}
        <ContactForm />

        {/* ── Compact 4-Step Process Reference (Below Form) ─────── */}
        <section
          aria-label="How Luminex delivery works"
          className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-4">
            What Happens After You Book
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-slate-50/70 border border-slate-200/80 rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tabular-nums text-navy-900">
                      Step {step.step}
                    </span>
                    <Icon
                      className="w-4 h-4 text-brand-red-500"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-navy-900 leading-snug mb-1">
                      {step.title}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
