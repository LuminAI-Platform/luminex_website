"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="Luminex Logistics Logo"
              fill
              className="object-cover"
              preload
            />
          </div>
          <div>
            <span className="text-lg font-black text-navy-900 tracking-tight block uppercase">Luminex</span>
            <span className="text-xs font-bold text-brand-red tracking-wider block -mt-1">Logistics</span>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 font-semibold text-sm text-slate-600">
          <a href="/" className="hover:text-brand-red transition-colors">Home</a>
          <a href="/track" className="hover:text-brand-red transition-colors">Track Documents</a>
          <a href="/#services" className="hover:text-brand-red transition-colors">Services</a>
          <a href="/#operations" className="hover:text-brand-red transition-colors">Operations</a>
          <a href="/#team" className="hover:text-brand-red transition-colors">Leadership</a>
        </nav>

        <div className="hidden md:block">
          <a
            href="/book"
            className="px-4 py-2 bg-navy-900 text-white rounded font-bold hover:bg-brand-red transition-colors"
          >
            Book Courier
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 border border-slate-200 rounded text-slate-600"
        >
          {isOpen ? "✕" : "☰"}
        </button>

      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-3 font-semibold text-slate-700">
          <a href="/" onClick={() => setIsOpen(false)} className="block hover:text-brand-red">Home</a>
          <a href="/track" onClick={() => setIsOpen(false)} className="block hover:text-brand-red">Track Documents</a>
          <a href="/#services" onClick={() => setIsOpen(false)} className="block hover:text-brand-red">Services</a>
          <a href="/#operations" onClick={() => setIsOpen(false)} className="block hover:text-brand-red">Operations</a>
          <a href="/#team" onClick={() => setIsOpen(false)} className="block hover:text-brand-red">Leadership</a>
          <a href="/book" onClick={() => setIsOpen(false)} className="block text-center bg-navy-900 text-white py-2 rounded">Book Courier</a>
        </div>
      )}
    </header>
  );
}
