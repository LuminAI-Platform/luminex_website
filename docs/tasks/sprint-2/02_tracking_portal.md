# 🧑‍💻 Task Sheet: Sprint 2 – Secure Document Tracking Portal (LMX-S2-02)

Implement the **Secure Document Tracking Portal & Chain of Custody Timeline** matching the design reference.

**Design Reference**: [`design/Tracking Portal - Luminex Logistics.png`](../../../design/Tracking%20Portal%20-%20Luminex%20Logistics.png)

---

## 🛠️ Feature Goals

* Path: [TrackingWidget.tsx](../../../src/components/TrackingWidget.tsx)
* Page Container: [src/app/track/page.tsx](../../../src/app/track/page.tsx)
* Branch: `feature/LMX-S2-tracking`

### Instructions

1. **Page Layout Container**:
   - Container max-width: `max-w-4xl mx-auto px-4 py-10 space-y-6`.

2. **Search Card (Consignment Lookup)**:
   - Outer Box: `rounded-xl overflow-hidden shadow-sm border border-slate-200`.
   - **Header Banner**:
     - Dark Navy background (`bg-[#0a1628]` / `navy-950` p-6 md:p-8 text-white).
     - Title: **"Secure Document Tracking"** (`text-2xl md:text-3xl font-black mb-1`).
     - Subtitle: *"Enter your Consignment Security Number (CSN) to verify custody status."* (`text-slate-300 text-sm md:text-base`).
   - **Input Body**:
     - White background (`bg-white p-6 md:p-8`).
     - Field Label: **"Consignment Security Number"** (`text-sm font-semibold text-slate-700 mb-2 block`).
     - Search Input & Button Row (`flex flex-col sm:flex-row gap-4 items-stretch sm:items-center`):
       - Input field: `w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 font-mono tracking-wide placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900`.
       - Pre-filled default value or placeholder: `LMX-GRA-8064`.
       - Search Button: **"Track Document"** (`bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow whitespace-nowrap transition`).

3. **Chain of Custody Timeline Card**:
   - Card Container: `bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm`.
   - Section Title: **"Chain of Custody"** (`text-xl font-bold text-navy-900 border-b border-slate-200 pb-4 mb-8`).
   - Vertical Progress Timeline (`relative space-y-8 pl-8 border-l-2 border-slate-200 ml-4` or custom stepper node alignment):

   - **Step 1: Accra HQ Intake** (Completed):
     - Node Badge: Dark emerald/green circular badge (`bg-emerald-800 text-white`) with checkmark `✓` icon.
     - Header Row:
       - Title: **Accra HQ Intake** (`font-bold text-navy-900 text-base`)
       - Timestamp (right aligned): `08:00 AM, Oct 24` (`text-xs text-slate-400 font-medium`)
     - Description: `Document received and sealed in tamper-evident sleeve.` (`text-sm text-slate-600 mt-1`).

   - **Step 2: Sorting Vault Transit** (Completed):
     - Node Badge: Dark emerald/green circular badge (`bg-emerald-800 text-white`) with checkmark `✓` icon.
     - Header Row:
       - Title: **Sorting Vault Transit** (`font-bold text-navy-900 text-base`)
       - Timestamp (right aligned): `10:30 AM, Oct 24` (`text-xs text-slate-400 font-medium`)
     - Description: `Cleared central security vault routing.` (`text-sm text-slate-600 mt-1`).

   - **Step 3: Out for Secure Delivery** (Active / In Progress):
     - Node Badge: Rounded square or circular red badge (`bg-brand-red-500 text-white`) with truck icon.
     - Active Card Box (`bg-blue-50/40 border-t-2 border-brand-red-500 rounded-lg p-5 mt-2`):
       - Top Row:
         - Status Title: **Out for Secure Delivery** (`font-bold text-brand-red-600 text-base`)
         - Status Badge (right aligned): **In Progress** (`text-xs font-bold text-brand-red-600`)
       - Subtitle: `Consignment is in the custody of vetted courier en route to destination.` (`text-sm text-slate-600 mt-1 mb-4`).
       - **Nested Courier Badge Card**:
         - Inner White Container (`bg-white border border-blue-100 rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`):
         - Left Column: ID badge icon + `ASSIGNED COURIER`: **Agent K. Mensah** (`text-sm text-slate-900 font-bold`).
         - Right Column: `REQUIRED ID`: **National ID / Passport** (`text-sm font-bold text-brand-red-600`).

   - **Step 4: Destination Verification** (Pending):
     - Node Badge: Light gray circular badge (`bg-slate-100 text-slate-400 border border-slate-300`) with location pin icon.
     - Header Row:
       - Title: **Destination Verification** (`font-bold text-slate-400 text-base`)
       - Status Badge (right aligned): **Pending** (`text-xs text-slate-400 font-medium`)
     - Description: `Awaiting final biometric signature and handover.` (`text-sm text-slate-400 mt-1`).

4. **Mock Interactivity**:
   - Provide initial state pre-populated with `LMX-GRA-8064` displaying the timeline above.
   - Searching a different CSN should simulate a state lookup or error message if not found.

---

## 📋 Acceptance Criteria
- [ ] Tracking portal search header and input match the PNG design reference.
- [ ] Timeline card renders all 4 steps of the "Chain of Custody" with appropriate status node icons (completed, active, pending).
- [ ] Step 3 (Out for Secure Delivery) features the highlighted container, active status badge, and nested assigned courier / required ID card.
- [ ] Layout is fully responsive across mobile, tablet, and desktop.
- [ ] Project passes `npm run build` and `npm run lint` on the feature branch.
