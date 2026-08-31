import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Truck } from "lucide-react";

/**
 * Homepage hero section.
 *
 * Full-viewport banner with background image overlay,
 * headline, subtitle, and dual CTA buttons (Track / Book).
 * Uses `next/image` for optimized background loading.
 */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center bg-navy-950 text-white overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Image — optimized via next/image */}
      <Image
        src="/hero-fold.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center opacity-40 mix-blend-luminosity"
      />

      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-900/60" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight md:leading-none max-w-3xl mb-5 sm:mb-6">
          Secure Document Delivery Across Ghana
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10">
          Institutional-grade logistics engineered for high-value legal,
          corporate, and government documentation. Precision execution,
          guaranteed chain of custody.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
          <Link
            href="/track"
            className="w-full sm:w-auto min-w-0 inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:py-3.5 bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold text-sm rounded shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            <Truck className="w-5 h-5 shrink-0" />
            <span>Track Shipment</span>
          </Link>

          <Link
            href="/book"
            className="w-full sm:w-auto min-w-0 inline-flex items-center justify-center px-6 py-3 sm:py-3.5 bg-navy-900/80 hover:bg-navy-800 border border-slate-600 hover:border-slate-400 text-white font-semibold text-sm rounded backdrop-blur-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          >
            Book Services
          </Link>
        </div>
      </div>
    </section>
  );
}
