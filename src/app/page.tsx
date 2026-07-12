import React from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      {/* Header & Logo Section */}
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-32 px-6 bg-slate-50 text-slate-800">
        <div className="max-w-xl text-center space-y-6">
          <h1 className="text-4xl font-black text-navy-900 tracking-tight uppercase">
            Luminex Logistics Portal
          </h1>
          <p className="text-sm font-semibold text-slate-500 leading-relaxed">
            Welcome to the secure document logistics system. Reference the sprint task sheet at <code className="bg-slate-100 px-1 py-0.5 rounded text-navy-900 font-bold font-mono">docs/tasks/sprint-1/website_tasks.md</code> to begin implementing the website modules.
          </p>
          <div className="w-12 h-1 bg-brand-red mx-auto rounded"></div>
        </div>
      </main>
    </>
  );
}
