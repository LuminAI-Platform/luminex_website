"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight, FileText } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    title: "Booking & Manifests",
    items: [
      {
        question: "How do I book a courier delivery?",
        answer:
          "All new bookings are conducted via WhatsApp on +233 54 597 5896 with our Head of Operations, or via our online booking form. He coordinates directly with our Fleet Manager to schedule your pickup, confirm the manifest, and arrange delivery.",
      },
      {
        question: "Do I need to create an account to book a delivery?",
        answer:
          "No account is needed at this time. We only require your full name, delivery address, phone number, and the ID type you will present to verify your legitimacy. Individual and corporate user accounts will be introduced in a future phase.",
      },
      {
        question: "How far in advance must I schedule a courier?",
        answer:
          "Same-day dispatch requests should ideally be logged before 12:00 GMT. Enterprise clients and priority dispatches receive rapid response coordination directly from our Head of Operations.",
      },
      {
        question: "What document types can be securely transported?",
        answer:
          "We handle confidential legal contracts, bank instruments, land title deeds, audited financial records, court filings, and high-value physical certificates requiring tamper-evident protection.",
      },
    ],
  },
  {
    title: "Tracking & Custody",
    items: [
      {
        question: "What is a CSN (Consignment Security Number)?",
        answer:
          "A CSN is a unique encrypted alphanumeric identifier (e.g. LMX-GRA-8829) assigned to every item upon intake, locking it to its electronic chain-of-custody log for real-time tracking.",
      },
      {
        question: "How often is GPS telemetry updated during transit?",
        answer:
          "GPS telemetry and courier status coordinates update continuously on the live tracking dashboard while the courier unit is in transit.",
      },
      {
        question: "What does 'Sorting Vault Transit' mean in the tracking log?",
        answer:
          "This status indicates that the item is stored inside our climate-controlled, biometric-secured hub vault awaiting specialized dispatch or delivery window execution.",
      },
    ],
  },
  {
    title: "Doorstep ID & Handover Verification",
    items: [
      {
        question: "What forms of identification are accepted at delivery?",
        answer:
          "To verify legitimacy, receivers must present a valid Ghana Card, Passport, or Driver's License matching the named recipient or authorized individual on the consignment manifest.",
      },
      {
        question: "What happens if the named receiver is unavailable at destination?",
        answer:
          "The courier will not release the item to unauthorized third parties. The consignment is secured while our dispatch desk contacts the sender to agree on next steps.",
      },
      {
        question: "Are digital signatures and handover logs legally admissible?",
        answer:
          "Yes. Our electronic signature capture and timestamped GPS logs satisfy evidence requirements under the Ghana Electronic Transactions Act (Act 772).",
      },
    ],
  },
  {
    title: "Payment, Customer Support & Refunds",
    items: [
      {
        question: "How and when do I pay for my delivery?",
        answer:
          "After you submit a delivery request, our Head of Operations contacts you directly to confirm the booking and agree on a payment method based on your convenience (Mobile Money, bank transfer, or cash on collection).",
      },
      {
        question: "Who do I contact for customer service issues or refunds?",
        answer:
          "For customer service inquiries, status escalation, or refund requests, reach our Head of Customer Relations directly on +233 59 646 4461 (call or WhatsApp) or email luminexlogisticsltd@gmail.com.",
      },
      {
        question: "Do you offer corporate invoicing for law firms and institutions?",
        answer:
          "Yes. Long-term corporate partners and institutions can arrange consolidated monthly invoicing and dedicated billing accounts.",
      },
    ],
  },
];

export default function FAQAccordion() {
  const [openIndexes, setOpenIndexes] = useState<Record<string, boolean>>({ "0-0": true });

  const toggleAccordion = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenIndexes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-10">
      {FAQ_DATA.map((category, catIdx) => (
        <div key={catIdx} className="space-y-4">
          <h2 className="text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-200 pb-2">
            <HelpCircle className="w-5 h-5 text-brand-red-500 shrink-0" />
            {category.title}
          </h2>

          <div className="space-y-3">
            {category.items.map((item, itemIdx) => {
              const isOpen = !!openIndexes[`${catIdx}-${itemIdx}`];
              return (
                <div
                  key={itemIdx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(catIdx, itemIdx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between font-bold text-navy-900 text-sm md:text-base hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="pr-4">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand-red-500" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Support Callout Banner */}
      <div className="bg-navy-50 border border-navy-100 rounded-xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-navy-900">Have a specific question not covered above?</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Our Accra dispatch desk operations team is available to assist with custom logistics setups, enterprise billing, or urgent transfers.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-xs transition-colors"
          >
            Contact Dispatch Desk
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
          >
            Book Immediate Pickup
            <FileText className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
