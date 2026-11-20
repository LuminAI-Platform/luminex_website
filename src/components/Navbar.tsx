"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";

/**
 * Navigation link configuration.
 * Each entry maps a display name to a route or hash anchor.
 */
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

/**
 * Primary site navigation bar.
 *
 * Features:
 * - Sticky header with scroll-aware active states
 * - Scroll spy for homepage anchor sections (IntersectionObserver)
 * - Animated mobile drawer with body scroll lock (visible below `lg` breakpoint)
 * - Dual CTA buttons: "Track" (outlined) and "Book Courier" (filled)
 */
export default function Navbar() {
  "use no memo";
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [prevPathname, setPrevPathname] = useState(pathname);
  const drawerRef = useRef<HTMLDivElement>(null);

  // ── Close drawer & reset hash on route change (render-time adjustment) ─
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
    if (pathname !== "/") {
      setActiveHash("");
    }
  }

  // ── Body scroll lock when mobile drawer is open ────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Scroll spy for homepage sections ───────────────────────────────
  useEffect(() => {
    if (pathname !== "/") return;

    let rafId: number | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const updateActiveSection = () => {
      rafId = null;
      const servicesEl = document.getElementById("services");
      if (!servicesEl) return;

      const rect = servicesEl.getBoundingClientRect();
      // Activate Services as soon as Core Competencies enters the upper 55% of the viewport
      const triggerY = Math.max(140, window.innerHeight * 0.55);

      if (rect.top <= triggerY) {
        setActiveHash((prev) => (prev === "#services" ? prev : "#services"));
      } else {
        setActiveHash((prev) => (prev === "" ? prev : ""));
      }
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const attachObserver = () => {
      const servicesEl = document.getElementById("services");
      if (!servicesEl || intersectionObserver) return false;

      intersectionObserver = new IntersectionObserver(
        () => {
          updateActiveSection();
        },
        {
          root: null,
          rootMargin: "-15% 0px -45% 0px",
          threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75, 1],
        }
      );
      intersectionObserver.observe(servicesEl);
      return true;
    };

    if (!attachObserver()) {
      mutationObserver = new MutationObserver(() => {
        if (attachObserver()) {
          mutationObserver?.disconnect();
          mutationObserver = null;
          scheduleUpdate();
        }
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const handleHashChange = () => {
      if (window.location.hash === "#services") {
        setActiveHash("#services");
      } else {
        scheduleUpdate();
      }
    };

    if (window.location.hash === "#services") {
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setActiveHash("#services");
      });
    } else {
      scheduleUpdate();
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    document.addEventListener("scroll", scheduleUpdate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("wheel", scheduleUpdate, { passive: true });
    window.addEventListener("touchmove", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      document.removeEventListener("scroll", scheduleUpdate, { capture: true });
      window.removeEventListener("wheel", scheduleUpdate);
      window.removeEventListener("touchmove", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [pathname]);

  /** Determine if a nav link matches the current route or hash anchor. */
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

  /** Handle smooth-scroll for hash links and scroll-to-top for Home. */
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 py-3 sm:py-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* ── Brand Logo ──────────────────────────────────────────── */}
        <Link
          href="/"
          onClick={() => handleLinkClick("/")}
          className="flex items-center gap-2.5 shrink-0"
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="Luminex Logistics Logo"
              fill
              sizes="(max-width: 640px) 40px, 48px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight block uppercase leading-none">
              Luminex
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-brand-red-600 tracking-wider block">
              Logistics
            </span>
          </div>
        </Link>

        {/* ── Desktop Navigation (visible at lg+) ─────────────────── */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm text-slate-700">
          {NAV_LINKS.map((link) => {
            const isActive = checkIsActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`py-1 transition-colors duration-200 border-b-2 ${isActive
                  ? "text-brand-red-600 font-semibold border-brand-red-600"
                  : "border-transparent hover:text-brand-red-600"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop CTAs (visible at lg+) ────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/track"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded font-bold text-sm border transition-colors duration-200 ${pathname === "/track"
              ? "border-brand-red-600 text-brand-red-600 bg-brand-red-50"
              : "border-slate-300 text-slate-700 hover:border-navy-900 hover:text-navy-900"
              }`}
          >
            <Truck className="w-4 h-4" />
            Track
          </Link>
          <Link
            href="/book"
            className={`px-4 py-2 rounded font-bold text-sm text-white transition-colors duration-200 ${pathname === "/book"
              ? "bg-brand-red-600"
              : "bg-slate-900 hover:bg-brand-red-600"
              }`}
          >
            Book Courier
          </Link>
        </div>

        {/* ── Mobile Toggle (visible below lg) ─────────────────────── */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden p-2 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
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

      {/* ── Mobile Drawer (animated slide-down) ──────────────────── */}
      <div
        ref={drawerRef}
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        aria-hidden={!isOpen}
      >
        <div className="bg-white border-t border-slate-100 px-4 sm:px-6 pt-4 pb-5 space-y-1">
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
                className={`block py-2.5 px-3 rounded-lg font-semibold text-sm transition-colors duration-150 ${isActive
                  ? "text-brand-red-600 bg-brand-red-50"
                  : "text-slate-700 hover:text-brand-red-600 hover:bg-slate-50"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile CTAs */}
          <div className="flex flex-col gap-2.5 pt-3 mt-2 border-t border-slate-100">
            <Link
              href="/track"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 border border-slate-300 text-slate-700 py-2.5 rounded-lg font-bold text-sm hover:border-navy-900 hover:text-navy-900 transition-colors duration-200"
            >
              <Truck className="w-4 h-4" />
              Track Document
            </Link>
            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-slate-900 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-brand-red-600 transition-colors duration-200"
            >
              Book Courier
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}