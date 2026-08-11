import React from "react";
import { TrackingWidget } from "@/components/TrackingWidget";

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <TrackingWidget />
      </div>
    </main>
  );
}