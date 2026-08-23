import React from "react";
import { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Luminex Logistics",
  description:
    "Find answers regarding document booking, CSN tracking, identity verification requirements, and secure handling protocols.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section 1: Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h1 className="text-3xl md:text-5xl font-black text-navy-900 tracking-tight">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl pl-4 text-base md:text-lg">
            Clear answers about booking, tracking, security verification, and enterprise services.
          </p>
        </div>

        {/* Section 2 & 3: Accordions & Support Callout */}
        <FAQAccordion />
      </div>
    </main>
  );
}