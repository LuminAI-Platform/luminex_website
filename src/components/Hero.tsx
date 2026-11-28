import React from "react";
import Image from "next/image";
import HeroQuickTrack from "@/components/HeroQuickTrack";

/**
 * Homepage hero section.
 *
 * Banner with radial-vignetted background image, headline, subtitle,
 * and an instant inline CSN lookup bar paired with pickup & corporate CTAs.
 */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[58vh] md:min-h-[66vh] flex items-center justify-center bg-navy-950 text-white overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Image — optimized via next/image */}
      <Image
        src="/hero-fold.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center opacity-35"
      />

      {/* Radial Dark Vignette so center headline stays razor-sharp */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,13,26,0.92)_0%,rgba(4,13,26,0.74)_55%,rgba(4,13,26,0.88)_100%)]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-[-0.025em] text-white leading-tight sm:leading-[1.12] max-w-3xl mb-5">
          Secure Document Delivery Across Ghana
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-8 sm:mb-9">
          Institutional-grade logistics engineered for high-value legal,
          corporate, and government documentation. Precision execution,
          verified chain of custody.
        </p>

        <HeroQuickTrack />
      </div>
    </section>
  );
}
