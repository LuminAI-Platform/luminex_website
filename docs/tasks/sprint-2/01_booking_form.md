# 🧑‍💻 Task Sheet: Sprint 2 – Courier Booking Form (LMX-S2-01)

Implement the **Schedule Delivery / Courier Booking Form** matching the design reference.

**Design Reference**: [`design/Book Courier - Luminex Logistics.png`](../../../design/Book%20Courier%20-%20Luminex%20Logistics.png)

---

## 🛠️ Feature Goals

* Path: [ContactForm.tsx](../../../src/components/ContactForm.tsx)
* Page Container: [src/app/book/page.tsx](../../../src/app/book/page.tsx)
* Branch: `feature/LMX-S2-booking`

### Instructions

1. **Page Title & Header**:
   - Page container max-width: `max-w-4xl mx-auto px-4 py-10`.
   - Title: **"Schedule Delivery"** (`text-3xl font-black text-navy-900 mb-2`).
   - Subtitle: *"Initiate a secure logistical transfer. Ensure all manifest details are accurate prior to confirmation."* (`text-slate-500 text-sm md:text-base mb-8`).

2. **Form Card Outer Container**:
   - Background: `bg-white border border-slate-200 rounded-xl p-6 md:p-10 shadow-sm`.

3. **Section 1: Sender Details**:
   - Section Header:
     - Icon: Location Pin / Map Marker (red accent).
     - Heading: **"1. Sender Details"** (`text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6`).
   - Fields Grid (2-column layout on desktop, 1-column on mobile):
     - **Full Name / Entity**:
       - Label: `Full Name / Entity` (`text-sm font-semibold text-slate-700 mb-1`)
       - Input placeholder: `e.g. Luminex Corporate Operations`
     - **Contact Number**:
       - Label: `Contact Number` (`text-sm font-semibold text-slate-700 mb-1`)
       - Input placeholder: `+233 ...`
     - **Collection Location (Digital Address / GPS)** (Full width span):
       - Label: `Collection Location (Digital Address / GPS)` (`text-sm font-semibold text-slate-700 mb-1`)
       - Input placeholder: `e.g. GA-123-4567, Accra`

4. **Section 2: Recipient Details**:
   - Section Header:
     - Icon: Delivery Truck (red accent).
     - Heading: **"2. Recipient Details"** (`text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6 mt-8`).
   - Fields Grid:
     - **Authorized Receiver**:
       - Label: `Authorized Receiver` (`text-sm font-semibold text-slate-700 mb-1`)
       - Input placeholder: `Legal name matching ID`
     - **Contact Number**:
       - Label: `Contact Number` (`text-sm font-semibold text-slate-700 mb-1`)
       - Input placeholder: `+233 ...`
     - **Destination Address** (Full width span):
       - Label: `Destination Address` (`text-sm font-semibold text-slate-700 mb-1`)
       - Input placeholder: `Secure facility or residential digital address`

5. **Section 3: Manifest Configuration**:
   - Section Header:
     - Icon: Document / File (red accent).
     - Heading: **"3. Manifest Configuration"** (`text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6 mt-8`).
   - Fields:
     - **Item/Document Description**:
       - Label: `Item/Document Description` (`text-sm font-semibold text-slate-700 mb-1`)
       - Textarea placeholder: `Briefly describe contents (e.g. Legal contracts, certified blueprints)` (rows=3 or 4)
     - **Doorstep Verification Protocol**:
       - Label: `Doorstep Verification Protocol` (`text-sm font-semibold text-slate-700 mb-1`)
       - Select dropdown with option choices:
         - `Select mandatory ID check` (default disabled/placeholder)
         - `National ID / Passport`
         - `Ghana Card Verification`
         - `Biometric Signature Handover`
         - `Executive / Corporate Seal`

6. **Security Clearance Notice Callout**:
   - Styled container: `bg-blue-50/80 border border-blue-100 rounded-lg p-4 my-8 flex items-start gap-3 text-slate-700`.
   - Icon: Shield / Lock Icon (`text-navy-900 shrink-0 mt-0.5`).
   - Content:
     - Header: **"Security Clearance Notice"** (`font-bold text-navy-900 text-sm mb-1`)
     - Text: *"By proceeding, you authorize Luminex Logistics to execute strict doorstep verification protocols. Deliveries will only be released to individuals presenting the exact identification specified above. Unauthorized recipients will trigger an immediate return to sender."* (`text-xs leading-relaxed text-slate-600`)

7. **Form Actions & Interactivity**:
   - Primary Submit Button aligned to the bottom right:
     - Label: **"Schedule Pickup ▷"** (or send icon).
     - Styling: `bg-[#b91c1c]` / `brand-red-500` hover `bg-brand-red-600` text-white font-semibold px-8 py-3 rounded-lg shadow flex items-center gap-2 transition ml-auto`.
   - Form State Handling:
     - Manage form input state (`useState`).
     - Display a success confirmation modal or toast upon submission with a generated CSN (Consignment Security Number e.g., `LMX-GRA-8064`).

---

## 📋 Acceptance Criteria
- [ ] Booking form layout matches the PNG design reference in field order, labels, icons, and styling.
- [ ] Form includes all 3 distinct sections (Sender, Recipient, Manifest) and the Security Clearance Notice callout.
- [ ] Inputs include proper focus states, placeholders, and required field validation.
- [ ] Submitting the form simulates a booking submission and presents confirmation / CSN tracking code.
- [ ] Form is fully responsive (smooth single-column layout on mobile devices).
- [ ] Project passes `npm run build` and `npm run lint` on the feature branch.
