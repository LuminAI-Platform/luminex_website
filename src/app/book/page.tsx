import React from "react";
import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Schedule Delivery | Luminex Logistics",
  description:
    "Book a secure courier pickup for legal, corporate, or government documents. Initiate a chain-of-custody transfer with Luminex Logistics.",
};

export default function BookCourierPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <h1 className="text-3xl font-black text-navy-900 mb-2">Schedule Delivery</h1>
        <p className="text-slate-500 text-sm md:text-base mb-6 sm:mb-8">
          Initiate a secure logistical transfer. Ensure all manifest details are accurate prior to confirmation.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}