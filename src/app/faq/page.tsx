import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PolicyTocNav from "@/components/PolicyTocNav";
import FAQAccordion, { FAQ_SECTIONS } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Luminex Logistics",
  description:
    "Answers about booking, Consignment Security Number (CSN) tracking, recipient ID verification, and corporate billing at Luminex Logistics Ltd.",
};

const POLICY_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund", label: "Refund & Cancellation Policy" },
] as const;

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Same Unified 220px Sticky Rail + Aligned Column as PolicyLayout */}
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 items-start">
          {/* Left Rail: Sticky Category Navigation */}
          <aside
            aria-label="FAQ categories"
            className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 space-y-6 pt-1"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                On This Page
              </p>
              <PolicyTocNav sections={FAQ_SECTIONS} />
            </div>

            <div className="pt-5 border-t border-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Legal Policies
              </p>
              <nav aria-label="Legal documents" className="space-y-1.5">
                {POLICY_LINKS.map((doc) => (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    className="block text-xs py-1 text-slate-500 hover:text-navy-900 transition-colors"
                  >
                    {doc.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Column: Shared PageHeader + Flattened Hairline FAQ */}
          <div className="min-w-0 max-w-3xl space-y-8">
            <PageHeader
              eyebrow="Help & Support"
              title="Frequently Asked Questions"
              subtitle="Answers about booking, tracking, recipient verification, and enterprise services across Ghana."
              bordered
            />

            <FAQAccordion />
          </div>
        </div>
      </div>
    </main>
  );
}
