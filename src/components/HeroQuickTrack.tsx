"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

/**
 * Compact inline CSN tracking form inside the homepage Hero.
 * Navigates directly to `/track?csn=...` when submitted, alongside Book Services CTA.
 */
export default function HeroQuickTrack() {
  const router = useRouter();
  const [csn, setCsn] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = csn.trim().toUpperCase();
    if (cleaned) {
      router.push(`/track?csn=${encodeURIComponent(cleaned)}`);
    } else {
      router.push("/track");
    }
  };

  return (
    <div className="w-full max-w-xl space-y-3.5">
      <form
        onSubmit={handleTrack}
        className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-white/10 border border-white/15 p-1.5 rounded-xl"
      >
        <div className="relative flex-1 min-w-0">
          <Search
            className="w-4 h-4 text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={csn}
            onChange={(e) => setCsn(e.target.value)}
            placeholder="Enter Consignment No. (e.g. LMX-8F3K-92B4)"
            aria-label="Consignment Security Number"
            autoComplete="off"
            spellCheck={false}
            className="w-full h-11 rounded-lg bg-navy-950/90 border border-white/10 pl-10 pr-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red-500/80 focus:border-brand-red-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="h-11 px-5 rounded-lg bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-white"
        >
          <span>Track</span>
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </button>
      </form>

      <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 flex-wrap">
        <Link
          href="/book"
          className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-brand-red-400 transition-colors"
        >
          <span>Schedule Courier Pickup</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
        <span className="text-slate-600" aria-hidden="true">
          |
        </span>
        <Link
          href="/contact?intent=corporate#corporate-access"
          className="text-slate-300 hover:text-white transition-colors"
        >
          Corporate Portal Access
        </Link>
      </div>
    </div>
  );
}
