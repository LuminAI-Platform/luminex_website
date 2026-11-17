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

// ── Sub-components ───────────────────────────────────────────────────

/** Timeline node badge — changes icon/color based on step status. */
function StepNode({ status }: { status: TimelineStep["status"] }) {
  const baseClass =
    "absolute -left-[calc(1.5rem+13px)] sm:-left-[calc(2rem+13px)] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ring-4 ring-white";

  if (status === "completed") {
    return (
      <div className={`${baseClass} bg-emerald-800 text-white`}>
        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
    );
  }

  if (status === "in_progress") {
    return (
      <div className={`${baseClass} bg-blue-700 text-white`}>
        <Truck className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={`${baseClass} bg-slate-100 text-slate-400 border border-slate-300`}
    >
      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────

/**
 * Document Tracking Portal.
 *
 * Provides a tracking number lookup form connected to `/api/track/[csn]` and
 * displays delivery progress once a valid consignment is found.
 */
export function TrackingWidget() {
  const [csnQuery, setCsnQuery] = useState("");
  const [activeData, setActiveData] = useState<TimelineStep[] | null>(null);
  const [activeCSN, setActiveCSN] = useState("");
  const [isSample, setIsSample] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** Fetch tracking timeline from backend API. */
  const fetchTrackingData = async (csn: string) => {
    const trimmedCSN = csn.trim().toUpperCase();
    if (!trimmedCSN) {
      setActiveData(null);
      setActiveCSN("");
      setIsSample(false);
      setErrorMessage(
        "Please enter your Consignment Security Number (CSN) to track your document."
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/track/${encodeURIComponent(trimmedCSN)}`);
      let data: {
        csn?: string;
        steps?: TimelineStep[];
        isSample?: boolean;
        error?: string;
      } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || !data) {
        throw new Error(
          data?.error ||
          `We couldn't find a consignment matching CSN "${trimmedCSN}". Please check the number and try again.`
        );
      }

      const steps: TimelineStep[] = data.steps ?? [];
      if (steps.length === 0) {
        throw new Error(
          `We couldn't find a consignment matching CSN "${trimmedCSN}". Please check the number and try again.`
        );
      }
      setActiveData(steps);
      setActiveCSN(data.csn || trimmedCSN);
      setIsSample(Boolean(data.isSample));
    } catch (err: unknown) {
      setActiveData(null);
      setActiveCSN("");
      setIsSample(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          "Something went wrong while checking your consignment. Please try again in a moment."
        );
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
        <div className="bg-navy-950 p-4 sm:p-6 md:p-8 text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-1">
            Secure Document Tracking
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            Enter your Consignment Security Number (CSN) to see where your
            document is.
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSearch}>
            <label
              htmlFor="csnInput"
              className="text-sm font-semibold text-slate-700 mb-2 block"
            >
              Consignment Security Number (CSN)
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              <input
                id="csnInput"
                type="text"
                value={csnQuery}
                onChange={(e) => setCsnQuery(e.target.value)}
                placeholder="e.g. LMX-8F3K-92B4"
                aria-describedby="csnHelper"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 sm:py-3 text-sm text-slate-900 font-mono tracking-wide placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900 transition-shadow"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-brand-red-500 hover:bg-brand-red-600 disabled:opacity-60 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-sm whitespace-nowrap transition-colors duration-200 cursor-pointer text-sm focus-visible:ring-2 focus-visible:ring-brand-red-500 focus-visible:ring-offset-2 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Verifying…</span>
                  </>
                ) : (
                  <span>Track document</span>
                )}
              </button>
            </div>
            <div id="csnHelper" className="flex items-center justify-between flex-wrap gap-2 mt-2">
              <p className="text-sm text-slate-600">
                You&apos;ll find this on your booking confirmation or receipt.
              </p>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  const sampleCSN = "LMX-8F3K-92B4";
                  setCsnQuery(sampleCSN);
                  fetchTrackingData(sampleCSN);
                }}
                className="text-xs font-semibold text-blue-800 hover:text-blue-900 disabled:opacity-50 underline underline-offset-2 cursor-pointer"
              >
                View sample (LMX-8F3K-92B4)
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Error Message ────────────────────────────────────────── */}
      {errorMessage && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-start gap-2.5"
        >
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ── Chain of Custody Timeline ────────────────────────────── */}
      {activeData && activeData.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-sm">
          {isSample && (
            <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 px-3.5 py-2.5 text-xs sm:text-sm text-blue-900 font-medium">
              Sample preview — this illustrates how your live Chain of Custody timeline appears once a consignment is booked.
            </div>
          )}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 sm:mb-8 flex-wrap gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Chain of Custody
            </h2>
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
              CSN: {activeCSN}
            </span>
          </div>

          <ol className="relative space-y-6 sm:space-y-8 pl-6 sm:pl-8 border-l-2 border-slate-200 ml-3 sm:ml-4">
            {activeData.map((step) => (
              <li key={step.id} className="relative">
                <StepNode status={step.status} />

                {step.status === "in_progress" ? (
                  /* Active Step — highlighted card */
                  <div className="bg-blue-50/40 border-t-2 border-blue-700 rounded-lg p-3 sm:p-5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-bold text-blue-800 text-sm sm:text-base">
                        <span className="sr-only">In progress: </span>
                        {step.title}
                      </h3>
                      <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                        In Progress
                      </span>
                    </div>

                    {step.timestamp && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Last updated: {step.timestamp}
                      </p>
                    )}

                    <p className="text-sm text-slate-600 mt-1 mb-3 sm:mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Courier Badge Card */}
                    {(step.courier || step.requiredId) && (
                      <div className="bg-white border border-blue-100 rounded-md p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        {step.courier && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center">
                              <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                            </div>
                            <div>
                              <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                                Assigned Courier
                              </p>
                              <p className="text-sm text-slate-900 font-bold">
                                {step.courier}
                              </p>
                            </div>
                          </div>
                        )}

                        {step.requiredId && (
                          <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-slate-600">
                              Required ID
                            </p>
                            <p className="text-sm font-bold text-blue-800">
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
                        className={`font-bold text-sm sm:text-base ${step.status === "pending"
                          ? "text-slate-500"
                          : "text-slate-900"
                          }`}
                      >
                        <span className="sr-only">
                          {step.status === "completed" ? "Completed: " : "Pending: "}
                        </span>
                        {step.title}
                      </h3>
                      {step.timestamp && (
                        <span className="text-xs text-slate-500 font-medium">
                          {step.timestamp}
                        </span>
                      )}
                      {step.status === "pending" && (
                        <span className="text-xs text-slate-500 font-medium">
                          Pending
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm mt-1 leading-relaxed ${step.status === "pending"
                        ? "text-slate-500"
                        : "text-slate-600"
                        }`}
                    >
                      {step.description}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}