"use client";

import React, { useState } from "react";
import { CheckCircle2, Truck, MapPin, BadgeCheck, Loader2, AlertCircle } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────

interface TimelineStep {
  id: string;
  title: string;
  timestamp?: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  courier?: string;
  requiredId?: string;
}

// ── Baseline Demo Data ───────────────────────────────────────────────

const DEFAULT_TIMELINE: TimelineStep[] = [
  {
    id: "1",
    title: "Accra HQ Intake",
    timestamp: "08:00 AM, Oct 24",
    description: "Document received and sealed in tamper-evident sleeve.",
    status: "completed",
  },
  {
    id: "2",
    title: "Sorting Vault Transit",
    timestamp: "10:30 AM, Oct 24",
    description: "Cleared central security vault routing.",
    status: "completed",
  },
  {
    id: "3",
    title: "Out for Secure Delivery",
    description:
      "Consignment is in the custody of vetted courier en route to destination.",
    status: "in_progress",
    courier: "Agent K. Mensah",
    requiredId: "National ID / Passport",
  },
  {
    id: "4",
    title: "Destination Verification",
    description: "Awaiting final biometric signature and handover.",
    status: "pending",
  },
];

// ── Sub-components ───────────────────────────────────────────────────

/** Timeline node badge — changes icon/color based on step status. */
function StepNode({ status }: { status: TimelineStep["status"] }) {
  const baseClass =
    "absolute -left-[calc(0.75rem+1px)] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ring-4 ring-white";

  if (status === "completed") {
    return (
      <div className={`${baseClass} bg-emerald-800 text-white`}>
        <CheckCircle2 className="w-3.5 h-3.5" />
      </div>
    );
  }

  if (status === "in_progress") {
    return (
      <div className={`${baseClass} bg-brand-red-500 text-white`}>
        <Truck className="w-3.5 h-3.5" />
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} bg-slate-100 text-slate-400 border border-slate-300`}
    >
      <MapPin className="w-3.5 h-3.5" />
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────

/**
 * Secure Document Tracking Portal.
 *
 * Provides a CSN lookup form connected to `/api/track/[csn]` and renders
 * a live chain-of-custody timeline with completed / in-progress / pending step visualizations.
 */
export function TrackingWidget() {
  const [csnQuery, setCsnQuery] = useState("LMX-GRA-8064");
  const [activeData, setActiveData] = useState<TimelineStep[] | null>(DEFAULT_TIMELINE);
  const [activeCSN, setActiveCSN] = useState("LMX-GRA-8064");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** Fetch tracking timeline from backend API. */
  const fetchTrackingData = async (csn: string) => {
    const trimmedCSN = csn.trim().toUpperCase();
    if (!trimmedCSN) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/track/${encodeURIComponent(trimmedCSN)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `No active consignment found matching record "${trimmedCSN}". Please verify your CSN.`
        );
      }

      setActiveData(data.steps || []);
      setActiveCSN(trimmedCSN);
    } catch (err: unknown) {
      setActiveData(null);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred while looking up consignment records.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /** Handle CSN search form submit. */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrackingData(csnQuery);
  };

  return (
    <div className="space-y-6">
      {/* ── Search Card ──────────────────────────────────────────── */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
        <div className="bg-navy-950 p-5 sm:p-6 md:p-8 text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-1">
            Secure Document Tracking
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base">
            Enter your Consignment Security Number (CSN) to verify custody
            status.
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 md:p-8">
          <form onSubmit={handleSearch}>
            <label
              htmlFor="csnInput"
              className="text-sm font-semibold text-slate-700 mb-2 block"
            >
              Consignment Security Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <input
                id="csnInput"
                type="text"
                value={csnQuery}
                onChange={(e) => setCsnQuery(e.target.value)}
                placeholder="e.g. LMX-GRA-8064"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 sm:py-3 text-sm text-slate-900 font-mono tracking-wide placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-shadow"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-60 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-sm whitespace-nowrap transition-colors duration-200 cursor-pointer text-sm focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying…</span>
                  </>
                ) : (
                  <span>Track Document</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Error Message ────────────────────────────────────────── */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ── Chain of Custody Timeline ────────────────────────────── */}
      {activeData && activeData.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 sm:mb-8 flex-wrap gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Chain of Custody
            </h2>
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
              CSN: {activeCSN}
            </span>
          </div>

          <div className="relative space-y-6 sm:space-y-8 pl-6 sm:pl-8 border-l-2 border-slate-200 ml-3 sm:ml-4">
            {activeData.map((step) => (
              <div key={step.id} className="relative">
                <StepNode status={step.status} />

                {step.status === "in_progress" ? (
                  /* Active Step — highlighted card */
                  <div className="bg-blue-50/40 border-t-2 border-brand-red-500 rounded-lg p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-bold text-brand-red-500 text-sm sm:text-base">
                        {step.title}
                      </h3>
                      <span className="text-xs font-bold text-brand-red-500 uppercase tracking-wider">
                        In Progress
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-3 sm:mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Courier Badge Card */}
                    {(step.courier || step.requiredId) && (
                      <div className="bg-white border border-blue-100 rounded-md p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        {step.courier && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center">
                              <BadgeCheck className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                                Assigned Courier
                              </p>
                              <p className="text-xs sm:text-sm text-slate-900 font-bold">
                                {step.courier}
                              </p>
                            </div>
                          </div>
                        )}

                        {step.requiredId && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                              Required ID
                            </p>
                            <p className="text-xs sm:text-sm font-bold text-brand-red-500">
                              {step.requiredId}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Completed / Pending Step */
                  <div>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3
                        className={`font-bold text-sm sm:text-base ${
                          step.status === "pending"
                            ? "text-slate-400"
                            : "text-slate-900"
                        }`}
                      >
                        {step.title}
                      </h3>
                      {step.timestamp && (
                        <span className="text-xs text-slate-400 font-medium">
                          {step.timestamp}
                        </span>
                      )}
                      {step.status === "pending" && (
                        <span className="text-xs text-slate-400 font-medium">
                          Pending
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                        step.status === "pending"
                          ? "text-slate-400"
                          : "text-slate-600"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}