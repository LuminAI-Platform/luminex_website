"use client";

import React, { useEffect, useState } from "react";
import { getAccraHoursStatus } from "@/lib/site-config";

export default function AccraHoursStatus() {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    label: string;
  } | null>(null);

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      setStatus(getAccraHoursStatus());
    });
    const interval = window.setInterval(() => {
      setStatus(getAccraHoursStatus());
    }, 60_000);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearInterval(interval);
    };
  }, []);

  if (!status) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
      <span
        aria-hidden="true"
        className={`w-2 h-2 rounded-full ${
          status.isOpen ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      <span>{status.label}</span>
    </span>
  );
}
