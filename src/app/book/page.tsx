import React from "react";
import { ContactForm } from "@/components/ContactForm";

export default function BookCourierPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-navy-900 mb-2">Schedule Delivery</h1>
        <p className="text-slate-500 text-sm md:text-base mb-8">
          Initiate a secure logistical transfer. Ensure all manifest details are accurate prior to confirmation.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}