import React from "react";
import Link from "next/link";
import PolicyTocNav, { type PolicySectionDef } from "@/components/PolicyTocNav";

export type { PolicySectionDef };

// ── Types ────────────────────────────────────────────────────────────

interface PolicyLayoutProps {
  /** Short uppercase document category (e.g., "Service Policy", "Terms of Service") */
  category: string;
  /** Document H1 title */
  title: string;
  /** Plain-language scope summary shown below the title */
  summary: string;
  /** Policy effective date (e.g., "January 1, 2026") */
  effectiveDate: string;
  /** Document version label (e.g., "Version 1.2") */
  version: string;
  /** Active route so related-policy links highlight properly */
  currentPath: "/refund" | "/privacy" | "/terms";
  /** Single-source section definitions powering both TOC and section headings */
  sections: readonly PolicySectionDef[];
  children: React.ReactNode;
}

interface PolicySectionProps {
  section: PolicySectionDef;
  children: React.ReactNode;
}

interface PolicyCalloutProps {
  title: string;
  variant?: "neutral" | "important";
  children: React.ReactNode;
}

interface PolicyTableProps {
  headers: [string, string, ...string[]];
  rows: React.ReactNode[][];
}

const POLICY_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund", label: "Refund & Cancellation Policy" },
] as const;

// ── Shared Policy Building Blocks (One Radius: rounded-lg, One Border: border-slate-200) ─

export function PolicySection({ section, children }: PolicySectionProps) {
  return (
    <section
      id={section.id}
      className="py-8 first:pt-0 last:pb-0 scroll-mt-24 space-y-4"
    >
      <h2 className="text-base sm:text-lg font-semibold text-navy-900 tracking-tight leading-snug">
        <span className="text-slate-400 font-normal tabular-nums mr-2">
          {section.number}.
        </span>
        {section.title}
      </h2>
      <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function PolicyCallout({
  title,
  variant = "neutral",
  children,
}: PolicyCalloutProps) {
  const accentStyles =
    variant === "important"
      ? "border-l-brand-red-600 bg-brand-red-50/35"
      : "border-l-navy-900 bg-slate-50/80";

  return (
    <div
      className={`border border-slate-200 border-l-2 ${accentStyles} rounded-lg p-4 sm:p-5 space-y-1.5`}
    >
      <p className="text-xs sm:text-sm font-semibold text-navy-900">{title}</p>
      <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-1.5">
        {children}
      </div>
    </div>
  );
}

export function PolicyTable({ headers, rows }: PolicyTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/90 border-b border-slate-200">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-navy-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white text-xs sm:text-sm text-slate-600">
          {rows.map((cells, rowIdx) => (
            <tr key={rowIdx} className="align-top">
              {cells.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={`px-4 py-3.5 leading-relaxed ${
                    cellIdx === 0
                      ? "font-semibold text-navy-900 sm:w-52"
                      : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main Shared Policy Layout ────────────────────────────────────────

export default function PolicyLayout({
  category,
  title,
  summary,
  effectiveDate,
  version,
  currentPath,
  sections,
  children,
}: PolicyLayoutProps) {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Single Unified Grid: Sticky 220px Nav + Aligned Header & Clauses */}
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 items-start">
          {/* Left Rail: Sticky Desktop Table of Contents */}
          <aside
            aria-label="Policy navigation"
            className="hidden lg:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 space-y-6 pt-1"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                On This Page
              </p>
              <PolicyTocNav sections={sections} />
            </div>

            <div className="pt-5 border-t border-slate-200">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Legal Documents
              </p>
              <nav aria-label="Related policies" className="space-y-1.5">
                {POLICY_LINKS.map((doc) => {
                  const isCurrent = doc.href === currentPath;
                  return (
                    <Link
                      key={doc.href}
                      href={doc.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`block text-xs py-1 transition-colors ${
                        isCurrent
                          ? "font-semibold text-brand-red-600"
                          : "text-slate-500 hover:text-navy-900"
                      }`}
                    >
                      {doc.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: Aligned Document Header + Unboxed Clauses */}
          <article className="min-w-0 max-w-3xl">
            {/* Document Header — Shares exact left edge with body text */}
            <header className="pb-8 mb-8 border-b border-slate-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-red-600 mb-2.5">
                {category}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-[34px] font-medium sm:font-semibold text-navy-900 tracking-[-0.025em] leading-[1.18]">
                {title}
              </h1>
              <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                {summary}
              </p>

              {/* Responsive 2x2 / 4-Column Metadata Grid */}
              <dl className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 text-xs">
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Effective Date
                  </dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    {effectiveDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Revision
                  </dt>
                  <dd className="mt-1 font-medium text-navy-900">{version}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Entity
                  </dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    Luminex Logistics Ltd.{" "}
                    <span className="font-mono text-[11px] text-slate-500 block sm:inline">
                      (CS120930824)
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                    Jurisdiction
                  </dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    Republic of Ghana
                  </dd>
                </div>
              </dl>

              {/* Compact Mobile / Tablet Section Jump Menu */}
              <details className="lg:hidden mt-6 rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs">
                <summary className="font-semibold text-navy-900 cursor-pointer select-none">
                  Jump to section ({sections.length})
                </summary>
                <nav
                  aria-label="Mobile table of contents"
                  className="mt-3 pt-2.5 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-1.5"
                >
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="py-1 text-slate-600 hover:text-navy-900"
                    >
                      <span className="text-slate-400 tabular-nums mr-1.5">
                        {sec.number}.
                      </span>
                      {sec.navLabel}
                    </a>
                  ))}
                </nav>
              </details>
            </header>

            {/* Policy Clauses */}
            <div className="divide-y divide-slate-200/80">{children}</div>

            {/* Bottom Cross-Navigation */}
            <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                {POLICY_LINKS.filter((doc) => doc.href !== currentPath).map(
                  (doc, idx) => (
                    <React.Fragment key={doc.href}>
                      {idx > 0 && (
                        <span className="text-slate-300" aria-hidden="true">
                          |
                        </span>
                      )}
                      <Link
                        href={doc.href}
                        className="font-semibold text-navy-900 hover:text-brand-red-600 transition-colors"
                      >
                        {doc.label} →
                      </Link>
                    </React.Fragment>
                  )
                )}
              </div>

              <Link
                href="/contact"
                className="font-semibold text-brand-red-600 hover:text-brand-red-700 hover:underline transition-colors"
              >
                Contact Customer Relations Office →
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}
