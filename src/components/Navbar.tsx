"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  if (pathname !== "/" && activeHash !== "") {
    setActiveHash("");
  }

  useEffect(() => {
    if (pathname !== "/") return;

    if (typeof window !== "undefined" && window.location.hash) {
      const initialHash = window.location.hash;
      requestAnimationFrame(() => {
        setActiveHash(initialHash);
      });
    }

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    // Scroll spy for homepage sections
    const sectionIds = ["services", "operations", "team"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    let observer: IntersectionObserver | null = null;

    if (sectionElements.length > 0) {
      const observerCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      };

      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0,
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);
      sectionElements.forEach((el) => observer?.observe(el));
    }

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveHash("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
    };
  }, [pathname]);

  const checkIsActive = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) {
        const targetHash = href.replace("/", "");
        return pathname === "/" && activeHash === targetHash;
      }
      if (href === "/") {
        return pathname === "/" && (activeHash === "" || activeHash === "#");
      }
      return pathname === href;
    },
    [pathname, activeHash]
  );

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/#")) {
      const targetHash = href.replace("/", "");
      setActiveHash(targetHash);
      if (pathname === "/") {
        const targetId = targetHash.replace("#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (href === "/") {
      setActiveHash("");
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 py-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => handleLinkClick("/")}
          className="flex items-center gap-3"
        >
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
            <span className="text-lg font-black text-slate-900 tracking-tight block uppercase">
              Luminex
            </span>
            <span className="text-xs font-bold text-brand-red-600 tracking-wider block -mt-1">
              Logistics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-700">
          {NAV_LINKS.map((link) => {
            const isActive = checkIsActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`py-1 transition-colors border-b-2 ${
                  isActive
                    ? "text-brand-red-600 font-semibold border-brand-red-600"
                    : "border-transparent hover:text-brand-red-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/track"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded font-bold text-sm border transition-colors ${
              pathname === "/track"
                ? "border-brand-red-600 text-brand-red-600 bg-brand-red-50"
                : "border-slate-300 text-slate-700 hover:border-navy-900 hover:text-navy-900"
            }`}
          >
            <Truck className="w-4 h-4" />
            Track
          </Link>
          <Link
            href="/book"
            className={`px-4 py-2 rounded font-bold text-white transition-colors ${
              pathname === "/book"
                ? "bg-brand-red-600"
                : "bg-slate-900 hover:bg-brand-red-600"
            }`}
          >
            Book Courier
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 border border-slate-200 rounded text-slate-600 focus:outline-none"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-3 font-semibold text-slate-700">
          {NAV_LINKS.map((link) => {
            const isActive = checkIsActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  handleLinkClick(link.href);
                  setIsOpen(false);
                }}
                className={`block hover:text-brand-red-600 ${
                  isActive ? "text-brand-red-600 font-bold" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
            <Link
              href="/track"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2 rounded font-bold hover:border-navy-900 hover:text-navy-900 transition-colors"
            >
              <Truck className="w-4 h-4" />
              Track Document
            </Link>
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-slate-900 text-white py-2 rounded font-bold hover:bg-brand-red-600 transition-colors"
            >
              Book Courier
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}