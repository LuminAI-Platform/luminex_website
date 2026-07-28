import React from "react";
import Link from "next/link";
import { Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[580px] flex items-center justify-center bg-navy-950 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: `url('/hero fold.jpg')` }}
      />
      
      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-900/60" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none max-w-3xl mb-6">
          Secure Document Delivery Across Ghana
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          Institutional-grade logistics engineered for high-value legal, corporate, and government documentation. Precision execution, guaranteed chain of custody.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link
            href="/track"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-brand-red-600 hover:bg-brand-red-700 text-white font-bold text-sm rounded shadow-lg transition-all duration-200"
          >
            <Truck className="w-5 h-5" />
            <span>Track Shipment</span>
          </Link>

          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-navy-900/80 hover:bg-navy-800 border border-slate-600 hover:border-slate-400 text-white font-semibold text-sm rounded backdrop-blur-sm transition-all duration-200"
          >
            Book Services
          </Link>
        </div>
      </div>
    </section>
  );
}

