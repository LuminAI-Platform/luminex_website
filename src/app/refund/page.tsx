import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  RotateCcw,
  ShieldCheck,
  Clock,
  AlertTriangle,
  FileText,
  Phone,
  Mail,
  CheckCircle2,
  Truck,
  Calendar,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Refund, Cancellation & Rescheduling Policy | Luminex Logistics",
  description:
    "Official policy governing refunds, cancellations, rescheduling, and failed delivery protocols for corporate and institutional customers at Luminex Logistics Ltd.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 md:py-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* ── Page Header ────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-900 tracking-tight">
              Refund, Cancellation & Rescheduling Policy
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 pl-4 font-mono">
            Corporate & Institutional Customers | Republic of Ghana | Luminex Logistics Ltd.
          </p>
        </div>

        {/* ── Summary Callout Banner ─────────────────────────────── */}
        <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 border border-navy-900 flex flex-col sm:flex-row items-start gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-brand-red-500/20 text-brand-red-500 flex items-center justify-center shrink-0 border border-brand-red-500/30">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-navy-900 border border-navy-800 px-3 py-0.5 rounded-full text-xs font-semibold text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-brand-red-500" />
              Institutional Service Standard
            </div>
            <h3 className="font-bold text-white text-base sm:text-lg">
              Balancing Operational Flexibility with Logistics Readiness
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This policy establishes the rules applicable when a corporate or institutional Customer cancels, modifies, reschedules, or requests a refund for a Luminex Logistics service. Where a negotiated institutional contract contains different terms, the negotiated contract will prevail.
            </p>
          </div>
        </div>

        {/* ── Core Policy Document ───────────────────────────────── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 space-y-10 text-sm text-slate-600 leading-relaxed shadow-xs">
          {/* Section 1: Our Approach */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-brand-red-500 shrink-0" />
              1. Our Approach
            </h2>
            <p>
              Luminex understands that institutional logistics requirements can change quickly. A bank may need an urgent document delivered to another branch. A law firm may need a confidential file redirected. A hospital may need a document delivered to a different authorized recipient. A company may need dozens of scheduled deliveries moved because of an operational change.
            </p>
            <p>
              Our policy therefore aims to balance customer flexibility with the real operational costs incurred when a delivery has already been assigned, collected, or dispatched. We do not believe customers should be charged unnecessarily for changes that can reasonably be accommodated.
            </p>
            <p>
              At the same time, once a courier, vehicle, technology resource, or operational team has been committed to a shipment, Luminex may have already incurred costs that cannot be recovered.
            </p>
          </section>

          {/* Section 2: Cancellation Stages */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-brand-red-500 shrink-0" />
              2. Cancellation Stages & Terms
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                  Stage 1: Before Assignment
                </span>
                <h4 className="font-bold text-navy-900 text-sm">Cancellation Before Courier Assignment</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Full refund or account credit, less any non-refundable third-party charges expressly disclosed at booking. For invoice customers, the cancelled transaction is simply removed from the invoice.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                  Stage 2: After Assignment
                </span>
                <h4 className="font-bold text-navy-900 text-sm">Cancellation After Courier Assignment</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Where cancellation occurs after assignment but before pickup, a cancellation fee of up to <strong>25%</strong> of the delivery charge applies. This may be waived if the courier is reallocated without operational loss.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full inline-block">
                  Stage 3: After Pickup
                </span>
                <h4 className="font-bold text-navy-900 text-sm">Cancellation After Pickup</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Once collected, delivery has entered execution. Does not qualify for full refund. Customers may choose return to sender, redirection, or rescheduling. Charges apply for transportation undertaken.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded-full inline-block">
                  Stage 4: After Dispatch
                </span>
                <h4 className="font-bold text-navy-900 text-sm">Cancellation After Dispatch</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Treated as return, redirection, or rescheduling. Customer is responsible for costs incurred, return transportation, additional mileage, waiting time, and any special handling.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Failed Delivery & Recipient Unavailability */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <AlertTriangle className="w-5 h-5 text-brand-red-500 shrink-0" />
              3. Failed Delivery & Recipient Unavailability
            </h2>
            <p>
              If delivery cannot be completed because the recipient is unavailable, refuses delivery, cannot complete required verification, cannot be located, provides an invalid authorization, or is otherwise unable to accept the document, Luminex will notify the Customer or follow agreed delivery instructions.
            </p>
            <p className="font-semibold text-navy-900 text-xs sm:text-sm">
              The Customer may select:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>Rescheduling to a confirmed time window;</li>
              <li>Delivery to an authorized alternative recipient;</li>
              <li>Return to sender; or</li>
              <li>Another mutually agreed solution.</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <strong>Courtesy Redelivery Policy:</strong> Luminex will redeliver packages on courtesy <strong>twice</strong>. If handover remains unfulfilled after two attempts, the package will be securely returned to the central warehouse vault.
              </div>
            </div>
          </section>

          {/* Section 4: Rescheduling */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5 text-brand-red-500 shrink-0" />
              4. Rescheduling Terms
            </h2>
            <p>
              Corporate and institutional Customers may request changes to delivery dates or windows:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Before Courier Assignment:</strong> Luminex makes reasonable efforts to reschedule with zero fees.</li>
              <li><strong>After Courier Assignment:</strong> Rescheduling charges may apply if additional operational costs are incurred.</li>
              <li><strong>After Collection:</strong> Treated as a new delivery instruction with applicable transportation or handling charges.</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <h4 className="font-bold text-navy-900 text-xs sm:text-sm">Rescheduling Due to Luminex</h4>
                <p className="text-xs text-slate-600">
                  If an operational failure on our part prevents delivery within the agreed window, Luminex will notify the customer, prioritize the shipment, reschedule at <strong>no additional charge</strong>, and apply SLA service credits where applicable.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <h4 className="font-bold text-navy-900 text-xs sm:text-sm">Events Outside Our Control (Force Majeure)</h4>
                <p className="text-xs text-slate-600">
                  Where affected by severe weather, flooding, traffic disruption, civil unrest, or telecom outages, Luminex will reschedule as soon as practicable. Additional charges will not apply unless substantial extra costs are incurred and agreed upon.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Refunds for Failed or Undelivered Shipments */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <RotateCcw className="w-5 h-5 text-brand-red-500 shrink-0" />
              5. Refunds for Failed or Undelivered Shipments
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Luminex-Caused Failure:</strong> Where Luminex cannot complete delivery due to our own operational failure, the customer is entitled to a full or partial refund, replacement delivery at no charge, account credit, or applicable SLA credit.
              </p>
              <p>
                <strong>Customer-Caused Failure:</strong> A refund will generally not be available where failure results from incorrect address details, recipient unavailability, failure to provide required ID or authorization, late cancellation after execution has begun, or improperly prepared items.
              </p>
              <p>
                <strong>Duplicate / Erroneous Bookings:</strong> Where accidental duplicate bookings are promptly reported before execution, Luminex will cancel duplicates without penalty. If executed, standard service charges apply.
              </p>
            </div>
          </section>

          {/* Section 6: Refund Processing & Review Period */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Clock className="w-5 h-5 text-brand-red-500 shrink-0" />
              6. Refund Processing & Review Period
            </h2>
            <p>
              Approved refunds are credited through the original payment method or applied against the customer&rsquo;s future invoice balance. Applicable service fees may be deducted prior to settlement.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-navy-900">
                <Clock className="w-4 h-4 text-brand-red-500" />
                Review & Acknowledgment Timelines
              </div>
              <p className="text-slate-600">
                • <strong>Acknowledgment:</strong> Within 1 business day of receipt.
                <br />
                • <strong>Review Completion:</strong> Within 3–5 business days, subject to the complexity of the matter.
              </p>
            </div>

            <p className="text-xs text-slate-600 pt-1">
              To lodge a request, submit your Customer Name, Account/Reference CSN, Booking Date, and Reason to our Customer Relations Office.
            </p>
          </section>

          {/* Section 7: Sensitive Documents & Institutional Exceptions */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Truck className="w-5 h-5 text-brand-red-500 shrink-0" />
              7. Sensitive Documents & Institutional Contract Exceptions
            </h2>
            <p>
              Because Luminex handles sensitive legal, financial, and governmental documents, cancellations and redirection requests require additional identity verification. Redirections will be refused if authorization cannot be verified, protecting clients from unauthorized interception.
            </p>
            <p>
              Enterprise and institutional clients with dedicated framework contracts enjoy customized terms, including volume cancellation allowances, dedicated capacity, and custom escalation procedures.
            </p>
          </section>

          {/* Section 8: Contact Channel */}
          <section className="space-y-3 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900 flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Phone className="w-5 h-5 text-brand-red-500 shrink-0" />
              8. Customer Relations Office Contact
            </h2>
            <p>
              To initiate a refund, rescheduling, or cancellation request, contact our Customer Relations desk directly:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 font-mono text-xs text-navy-900">
              <p><strong>Desk:</strong> Luminex Logistics Clients Relation Office</p>
              <p><strong>Telephone / WhatsApp:</strong>{" "}
                <a href="tel:+233596464461" className="text-brand-red-600 hover:underline">
                  +233 59 646 4461
                </a>
              </p>
              <p><strong>Email:</strong>{" "}
                <a href="mailto:luminexlogisticsltd@gmail.com" className="text-brand-red-600 hover:underline">
                  luminexlogisticsltd@gmail.com
                </a>
              </p>
              <p><strong>Address:</strong> H302 Sowah Larbi Ave, Accra, Ghana</p>
            </div>
          </section>

          {/* Cross Links */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-brand-red-600 hover:underline font-semibold">
                ← Terms of Service
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/privacy" className="text-brand-red-600 hover:underline font-semibold">
                Privacy Policy →
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-navy-900 hover:text-brand-red-600 font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              Contact Customer Relations
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
