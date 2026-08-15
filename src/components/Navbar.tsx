"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  const checkIsActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeHash === href.replace("/", "");
    }
    if (href === "/") {
      return pathname === "/" && activeHash === "";
    }
    return pathname === href;
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Track Documents", href: "/track" },
    { name: "Services", href: "/#services" },
    { name: "Operations", href: "/#operations" },
    { name: "Leadership", href: "/#team" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/#")) {
      setActiveHash(href.replace("/", ""));
    } else if (href === "/") {
      setActiveHash("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" onClick={() => handleLinkClick("/")} className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="Luminex Logistics Logo"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 tracking-tight block uppercase">Luminex</span>
            <span className="text-xs font-bold text-[#b91c1c] tracking-wider block -mt-1">Logistics</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-700">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`py-1 transition-colors border-b-2 ${
                  isActive
                    ? "text-[#b91c1c] font-semibold border-[#b91c1c]"
                    : "border-transparent hover:text-[#b91c1c]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/book"
            className={`px-4 py-2 rounded font-bold text-white transition-colors ${
              pathname === "/book"
                ? "bg-[#b91c1c]"
                : "bg-slate-900 hover:bg-[#b91c1c]"
            }`}
          >
            Book Courier
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 border border-slate-200 rounded text-slate-600"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-3 font-semibold text-slate-700">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  handleLinkClick(link.href);
                  setIsOpen(false);
                }}
                className={`block hover:text-[#b91c1c] ${
                  isActive ? "text-[#b91c1c] font-bold" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-slate-900 text-white py-2 rounded font-bold hover:bg-[#b91c1c] transition-colors"
          >
            Book Courier
          </Link>
        </div>
      )}
    </header>
  );
}