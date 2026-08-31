import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Truck, Phone } from "lucide-react";

/**
 * Custom branded 404 page for Luminex Logistics.
 * Adheres to the Navy-950 and Brand Red design system.
 */
export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center space-y-6 bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-brand-red-50 text-brand-red-500 flex items-center justify-center mx-auto mb-2">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Error 404
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-navy-900 tracking-tight">
          Page or Consignment Not Found
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          The requested path does not exist on our network. It may have been relocated, archived, or entered incorrectly.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-brand-red-600 text-white font-semibold text-sm rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/track"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 hover:border-navy-900 text-slate-700 hover:text-navy-900 font-semibold text-sm rounded-lg transition-colors duration-200"
          >
            <Truck className="w-4 h-4" />
            <span>Track Consignment</span>
          </Link>
        </div>

        <div className="border-t border-slate-100 pt-6 mt-6">
          <p className="text-xs text-slate-400">
            Need urgent assistance? Contact our dispatch desk at{" "}
            <a
              href="tel:+233302908471"
              className="text-brand-red-600 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3 inline" />
              +233 (0) 30 290 8471
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
