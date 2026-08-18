"use client";

import React, { useState } from "react";

interface TimelineStep {
  id: string;
  title: string;
  timestamp?: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  courier?: string;
  requiredId?: string;
}

const mockDatabase: Record<string, TimelineStep[]> = {
  "LMX-GRA-8064": [
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
      description: "Consignment is in the custody of vetted courier en route to destination.",
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
  ],
};

export function TrackingWidget() {
  const [csnQuery, setCsnQuery] = useState("LMX-GRA-8064");
  const [activeData, setActiveData] = useState<TimelineStep[] | null>(mockDatabase["LMX-GRA-8064"]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = mockDatabase[csnQuery.trim().toUpperCase()];
    if (result) {
      setActiveData(result);
      setErrorMessage(null);
    } else {
      setActiveData(null);
      setErrorMessage(`No active consignment found matching record "${csnQuery}". Please verify your CSN.`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Search Card Container */}
      <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
        <div className="bg-navy-950 p-6 md:p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-black mb-1">
            Secure Document Tracking
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            Enter your Consignment Security Number (CSN) to verify custody status.
          </p>
        </div>

        <div className="bg-white p-6 md:p-8">
          <form onSubmit={handleSearch}>
            <label htmlFor="csnInput" className="text-sm font-semibold text-slate-700 mb-2 block">
              Consignment Security Number
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <input
                id="csnInput"
                type="text"
                value={csnQuery}
                onChange={(e) => setCsnQuery(e.target.value)}
                placeholder="e.g. LMX-GRA-8064"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 font-mono tracking-wide placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <button
                type="submit"
                className="bg-brand-red-500 hover:bg-brand-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow-sm whitespace-nowrap transition cursor-pointer"
              >
                Track Document
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
          {errorMessage}
        </div>
      )}

      {/* Chain of Custody Timeline Card */}
      {activeData && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-8">
            Chain of Custody
          </h2>

          <div className="relative space-y-8 pl-8 border-l-2 border-slate-200 ml-4">
            {activeData.map((step) => (
              <div key={step.id} className="relative group">
                
                {/* Node Badges */}
                {step.status === "completed" && (
                  <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                    ✓
                  </div>
                )}

                {step.status === "in_progress" && (
                  <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-brand-red-500 text-white flex items-center justify-center text-xs ring-4 ring-white">
                    🚚
                  </div>
                )}

                {step.status === "pending" && (
                  <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center text-xs ring-4 ring-white">
                    📍
                  </div>
                )}

                {/* Step Layout Content */}
                {step.status === "in_progress" ? (
                  /* Step 3: Active Card Box */
                  <div className="bg-blue-50/40 border-t-2 border-brand-red-500 rounded-lg p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-brand-red-500 text-base">
                        {step.title}
                      </h3>
                      <span className="text-xs font-bold text-brand-red-500 uppercase tracking-wider">
                        In Progress
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-1 mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Nested Courier Badge Card */}
                    <div className="bg-white border border-blue-100 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                          🪪
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">ASSIGNED COURIER</p>
                          <p className="text-sm text-slate-900 font-bold">{step.courier}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">REQUIRED ID</p>
                        <p className="text-sm font-bold text-brand-red-500">{step.requiredId}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Completed / Pending Content Row */
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`font-bold text-base ${step.status === "pending" ? "text-slate-400" : "text-slate-900"}`}>
                        {step.title}
                      </h3>
                      {step.timestamp && (
                        <span className="text-xs text-slate-400 font-medium">{step.timestamp}</span>
                      )}
                      {step.status === "pending" && (
                        <span className="text-xs text-slate-400 font-medium">Pending</span>
                      )}
                    </div>
                    <p className={`text-sm mt-1 leading-relaxed ${step.status === "pending" ? "text-slate-400" : "text-slate-600"}`}>
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