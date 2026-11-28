"use client";

import React, { useEffect, useState } from "react";

export interface PolicySectionDef {
  id: string;
  number: number;
  navLabel: string;
  title: string;
}

interface PolicyTocNavProps {
  sections: readonly PolicySectionDef[];
}

/**
 * Lightweight IntersectionObserver scroll-spy navigation for policy pages.
 * Highlights the active clause with a left accent bar without scroll-loop reflows.
 */
export default function PolicyTocNav({ sections }: PolicyTocNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    const visibleIds = new Set<string>();

    const pickTopmostVisible = () => {
      for (const sec of sections) {
        if (visibleIds.has(sec.id)) {
          setActiveId((prev) => (prev === sec.id ? prev : sec.id));
          return;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }
        pickTopmostVisible();
      },
      {
        root: null,
        rootMargin: "-96px 0px -62% 0px",
        threshold: 0,
      }
    );

    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    }

    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sections.some((s) => s.id === hash)) {
        setActiveId(hash);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHash);
    };
  }, [sections]);

  return (
    <nav
      aria-label="On this page"
      className="border-l border-slate-200 space-y-0.5"
    >
      {sections.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setActiveId(item.id)}
            aria-current={isActive ? "location" : undefined}
            className={`-ml-px block border-l-2 pl-3 py-1.5 text-xs leading-snug transition-colors ${
              isActive
                ? "border-brand-red-600 text-navy-900 font-semibold"
                : "border-transparent text-slate-500 hover:text-navy-900 hover:border-slate-300"
            }`}
          >
            <span
              className={`tabular-nums mr-1.5 ${
                isActive ? "text-brand-red-600" : "text-slate-400"
              }`}
            >
              {item.number}.
            </span>
            {item.navLabel}
          </a>
        );
      })}
    </nav>
  );
}
