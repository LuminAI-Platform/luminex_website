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
      return;
    }

    // Initialize active hash asynchronously on mount/navigation to prevent setState-in-effect warning
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        setActiveHash(window.location.hash);
      }
    }, 0);

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    // Setup IntersectionObserver (Scroll Spy) for homepage sections
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

        if (window.scrollY < 120) {
          setActiveHash("");
        }
      };

      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0,
      };

      observer = new IntersectionObserver(observerCallback, observerOptions);
      sectionElements.forEach((el) => observer?.observe(el));
    }

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveHash("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [pathname]);

  const checkIsActive = (href: string) => {
    if (href.startsWith("/#")) {
      const targetHash = href.replace("/", "");
      return pathname === "/" && activeHash === targetHash;
    }
    if (href === "/") {
      return pathname === "/" && (activeHash === "" || activeHash === "#");
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
            <span className="text-xs font-bold text-brand-red-600 tracking-wider block -mt-1">Logistics</span>
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
                    ? "text-brand-red-600 font-semibold border-brand-red-600"
                    : "border-transparent hover:text-brand-red-600"
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
                ? "bg-brand-red-600"
                : "bg-slate-900 hover:bg-brand-red-600"
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
                className={`block hover:text-brand-red-600 ${
                  isActive ? "text-brand-red-600 font-bold" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-slate-900 text-white py-2 rounded font-bold hover:bg-brand-red-600 transition-colors"
          >
            Book Courier
          </Link>
        </div>
      )}
    </header>
  );
}