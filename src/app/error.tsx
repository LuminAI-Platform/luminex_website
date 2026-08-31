"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";

/**
 * Client-side runtime error boundary for Luminex Logistics.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime client exceptions
    console.error("[Luminex Client Exception]:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center space-y-6 bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-brand-red-50 text-brand-red-500 flex items-center justify-center mx-auto mb-2">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          System Exception Encountered
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
          Secure Session Interrupted
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          An unexpected application error occurred while processing your request. Our telemetry logging has recorded this instance.
        </p>

        {error.digest && (
          <p className="text-xs font-mono text-slate-400 bg-slate-100 py-1 px-2 rounded inline-block">
            Digest Ref: {error.digest}
          </p>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold text-sm rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
