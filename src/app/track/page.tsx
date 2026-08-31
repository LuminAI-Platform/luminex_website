import React from "react";
import { Metadata } from "next";
import { TrackingWidget } from "@/components/TrackingWidget";

export const metadata: Metadata = {
  title: "Track Document | Luminex Logistics",
  description:
    "Track your secure document consignment in real-time. Enter your Consignment Security Number (CSN) to verify chain-of-custody status.",
};

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <TrackingWidget />
      </div>
    </main>
  );
}