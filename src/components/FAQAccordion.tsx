"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, X, ArrowRight } from "lucide-react";
import type { PolicySectionDef } from "@/components/PolicyTocNav";

// ── Types & Single-Source Category Config ────────────────────────────

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  section: PolicySectionDef;
  items: readonly FAQItem[];
}

export const FAQ_CATEGORIES: readonly FAQCategory[] = [
  {
    section: {
      id: "booking-manifests",
      number: 1,
      navLabel: "Booking & Manifests",
      title: "Booking & Manifests",
    },
    items: [
      {
        id: "how-to-book",
        question: "How do I book a courier delivery?",
        answer:
          "Book on WhatsApp via our Bookings & Dispatch Desk at +233 54 597 5896 or submit our online booking form. Our dispatch team confirms your pickup window, verifies the manifest, and assigns a vetted courier.",
      },
      {
        id: "account-required",
        question: "Do I need an account to book a delivery?",
        answer:
          "No account is required for standard bookings. You only need to provide your full name, pickup and destination addresses, active phone number, and preferred recipient verification ID. Dedicated corporate portals are available for high-volume institutional partners.",
      },
      {
        id: "advance-notice",
        question: "How far in advance should I schedule a pickup?",
        answer:
          "Log same-day Accra dispatch requests before 12:00 GMT for guaranteed afternoon fulfillment. Urgent legal filings and enterprise contract clients receive priority dispatch coordination through our Bookings & Dispatch Desk (+233 54 597 5896).",
      },
      {
        id: "supported-documents",
        question: "What types of documents can Luminex transport?",
        answer:
          "We transport confidential legal contracts, court filings, government tenders, bank instruments, land title deeds, diplomatic correspondence, audited financial records, and physical certificates requiring tamper-evident custody.",
      },
    ],
  },
  {
    section: {
      id: "tracking-custody",
      number: 2,
      navLabel: "Tracking & Custody",
      title: "Tracking & Chain of Custody",
    },
    items: [
      {
        id: "what-is-csn",
        question: "What is a Consignment Security Number (CSN)?",
        answer:
          "A Consignment Security Number (CSN) is a unique alphanumeric tracking reference (for example, LMX-8F3K-92B4) generated at booking. It links your document to its live chain-of-custody log from collection through verified handover.",
      },
      {
        id: "gps-updates",
        question: "How often are tracking milestones updated?",
        answer:
          "Custody statuses update at every operational checkpoint—booking intake, courier assignment, physical collection, hub vault staging, active transit, and verified doorstep delivery.",
      },
      {
        id: "vault-transit",
        question: "What does 'Sorting Vault Transit' mean on my tracking timeline?",
        answer:
          "It indicates your consignment is held inside our access-controlled central Accra vault while awaiting scheduled route dispatch or an agreed delivery window.",
      },
    ],
  },
  {
    section: {
      id: "id-verification",
      number: 3,
      navLabel: "ID & Handover Verification",
      title: "Doorstep ID & Handover Verification",
    },
    items: [
      {
        id: "accepted-ids",
        question: "What identification is accepted at delivery?",
        answer:
          "Recipients must present a valid Ghana Card, Passport, or Driver's License matching the named recipient or pre-authorized representative on the consignment manifest before handover.",
      },
      {
        id: "recipient-unavailable",
        question: "What happens if the named recipient is unavailable?",
        answer:
          "Couriers never leave confidential consignments unattended or with unverified third parties. We notify the sender immediately and provide up to two courtesy redelivery attempts before securing the item in our central Accra vault.",
      },
      {
        id: "pod-admissibility",
        question: "Are electronic Proof of Delivery (POD) records legally valid?",
        answer:
          "Yes. Digital signature capture, recipient ID verification logs, and timestamped custody records comply with evidentiary standards under Ghana's Electronic Transactions Act, 2008 (Act 772).",
      },
    ],
  },
  {
    section: {
      id: "payments-refunds",
      number: 4,
      navLabel: "Payments, Support & Refunds",
      title: "Payments, Support & Refunds",
    },
    items: [
      {
        id: "how-to-pay",
        question: "How and when do I pay for a delivery?",
        answer:
          "Once you submit a booking, our Bookings & Dispatch Desk (+233 54 597 5896) confirms the fare and arranges settlement via Mobile Money, bank transfer, cash on collection, or approved corporate invoicing.",
      },
      {
        id: "customer-relations-contact",
        question: "Who handles customer support escalations, billing issues, or refunds?",
        answer:
          "Contact our Customer Relations Office on +233 59 646 4461 (call or WhatsApp) or email luminexlogisticsltd@gmail.com. Claims are acknowledged within 1 business day and resolved within 3–5 business days.",
      },
      {
        id: "cancellation-policy",
        question: "What is your cancellation fee schedule?",
        answer:
          "Cancel before a courier is assigned for a 100% refund or invoice credit. Cancellations after courier assignment (before pickup) incur up to a 25% fee unless the courier is reallocated without operational loss. Full stage terms are listed in our Refund & Cancellation Policy.",
      },
      {
        id: "corporate-invoicing",
        question: "Do you offer monthly invoicing for law firms, banks, and institutions?",
        answer:
          "Yes. Approved institutional partners receive consolidated monthly invoicing, dedicated dispatch priority, and custom SLA terms. Request onboarding through our Contact page.",
      },
    ],
  },
];

export const FAQ_SECTIONS: readonly PolicySectionDef[] = FAQ_CATEGORIES.map(
  (c) => c.section
);

// ── Component ────────────────────────────────────────────────────────

export default function FAQAccordion() {
  // All panels start closed by default — user clicks to expand
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    if (!trimmedQuery) return FAQ_CATEGORIES;

    return FAQ_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(trimmedQuery) ||
          item.answer.toLowerCase().includes(trimmedQuery)
      ),
    })).filter((category) => category.items.length > 0);
  }, [trimmedQuery]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-10">
      {/* Instant Keyword Filter */}
      <div className="relative">
        <Search
          className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions (e.g. CSN, Ghana Card, cancellation, invoicing)…"
          aria-label="Search frequently asked questions"
          className="w-full rounded-lg border border-slate-200 bg-slate-50/60 focus:bg-white pl-10 pr-9 py-2.5 text-sm text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900/15 focus:border-navy-900 transition-colors"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Filtered Categories & Hairline Rows */}
      {filteredCategories.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-6 text-sm text-slate-600">
          No questions matched{" "}
          <strong className="text-navy-900">&ldquo;{query.trim()}&rdquo;</strong>.{" "}
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-brand-red-600 font-semibold hover:underline cursor-pointer"
          >
            Clear filter
          </button>{" "}
          or contact our dispatch team below.
        </div>
      ) : (
        <div className="divide-y divide-slate-200/80">
          {filteredCategories.map((category) => (
            <section
              key={category.section.id}
              id={category.section.id}
              className="py-8 first:pt-0 last:pb-0 scroll-mt-24"
            >
              <h2 className="text-base sm:text-lg font-semibold text-navy-900 tracking-tight leading-snug mb-3">
                <span className="text-slate-400 font-normal tabular-nums mr-2">
                  {category.section.number}.
                </span>
                {category.section.title}
              </h2>

              {/* Flat Hairline Accordion — Closed by default, expands on click or active search */}
              <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                {category.items.map((item) => {
                  const isOpen =
                    trimmedQuery.length > 0 ? true : Boolean(openIds[item.id]);

                  return (
                    <div key={item.id} className="py-4">
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 text-left font-medium text-navy-900 text-sm sm:text-[15px] hover:text-brand-red-600 transition-colors cursor-pointer"
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-navy-900" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <p className="mt-2.5 pr-6 text-sm text-slate-600 leading-relaxed max-w-[65ch]">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Clean Support Footer Block (matches PolicyCallout / Contact block tokens) */}
      <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-semibold text-navy-900">
            Need help with a specific consignment or corporate setup?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Bookings &amp; Dispatch:{" "}
            <span className="font-medium text-navy-900 whitespace-nowrap">
              +233 54 597 5896
            </span>{" "}
            <span className="text-slate-300">·</span> Customer Relations:{" "}
            <span className="font-medium text-navy-900 whitespace-nowrap">
              +233 59 646 4461
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-navy-900 hover:bg-brand-red-600 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 border border-slate-300 bg-white hover:border-navy-900 text-navy-900 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors"
          >
            Schedule Pickup
          </Link>
        </div>
      </div>
    </div>
  );
}
