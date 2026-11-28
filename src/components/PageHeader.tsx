import React from "react";

interface PageHeaderProps {
  /** Short uppercase eyebrow label above the H1 */
  eyebrow: string;
  /** Main page title */
  title: string;
  /** Concise 1-2 line subtitle (automatically capped to readable measure) */
  subtitle: string;
  /** Optional extra bottom spacing or border */
  bordered?: boolean;
}

/**
 * Shared page header used across internal Luminex pages
 * (Book, Contact, Track, FAQ) so typography, eyebrow, and left-edge alignment
 * match the PolicyLayout system.
 */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  bordered = false,
}: PageHeaderProps) {
  return (
    <header
      className={bordered ? "pb-8 border-b border-slate-200" : undefined}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-red-600 mb-2">
        {eyebrow}
      </p>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 tracking-[-0.025em] leading-[1.18]">
        {title}
      </h1>
      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[58ch]">
        {subtitle}
      </p>
    </header>
  );
}
