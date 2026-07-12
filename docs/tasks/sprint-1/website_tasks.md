# 🧑‍💻 Engineering Task Sheet: Luminex Logistics Website Implementation

This task sheet defines the implementation sprints for the standalone **Luminex Logistics Ltd.** website. The workspace has been pre-configured with the Tailwind CSS v4 styling rules, metadata layouts, serverless proxy routing rules, and the corporate logo.

Please implement the following modules inside the skeleton files provided in the codebase.

---

## 📋 Summary of Tasks
* **Task 1 (LMX-F1):** Style Verification, Asset Linking, and Corporate Navbar ( must be completed first)
* **Task 2 (LMX-F2):** Hero and Core Services (Medium Priority)
* **Task 3 (LMX-F3):** Operations & Leadership (Medium Priority)
* **Task 4 (LMX-F4):** Interactive Tracking Timeline (Critical Priority)
* **Task 5 (LMX-F5):** Dispatch Booking Form & Footer (High Priority)

---

## 🛠️ Detailed Task Outlines

### 🟠 TASK 1 · LMX-F1: Style Verification, Asset Linking, and Corporate Navbar
* **Goal:** Verify theme variables and build the fully responsive navigation header.
* **Stack/Paths:** 
  - [globals.css](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/app/globals.css) (Verify theme declarations)
  - [Navbar.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/Navbar.tsx)
  - Logo source: `public/logo.jpeg`
* **Instructions:**
  1. Verify custom Tailwind v4 configurations in `globals.css` (specifically Navy text color `text-navy-900` and Accent Red background `bg-brand-red`).
  2. Implement `Navbar.tsx` using semantic HTML (`<header>`, `<nav>`).
  3. Load the logo from `/logo.jpeg` using the Next.js `<Image>` component with proper width and height constraints. Set `preload` prop (Next.js 16).
  4. Display quick navigation links: *Home*, *Track Documents*, *Services*, *Operations*, *Leadership*.
  5. Add a "Book Courier" CTA button linking to the `#contact` section.
  6. Implement a hamburger button and state control (`isOpen`) to show/hide navigation on mobile.
* **Acceptance Criteria:**
  - [ ] Corporate logo renders correctly.
  - [ ] Navbar stays sticky at the top of the viewport on scroll.
  - [ ] Mobile navigation overlay toggle operates smoothly without breaking page widths.

---

### 🟡 TASK 2 · LMX-F2: Hero and Core Services Sections
* **Goal:** Build the primary marketing fold and services grid.
* **Stack/Paths:**
  - [Hero.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/Hero.tsx) (File starts empty)
  - [Services.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/Services.tsx) (File starts empty)
* **Instructions:**
  1. Build a premium dark Navy hero block in `Hero.tsx`. Ensure clean, strong corporate copy (avoid low-quality AI grid visualizers or floating glow cards).
  2. Implement primary CTA button linking to `#track` and secondary CTA linking to `#contact`.
  3. Lay out a document handling manifest panel on the right side of the hero detailing document sealing and security policies.
  4. Create a 3-column grid card structure in `Services.tsx` displaying the following 5 service offerings:
     * **Document Delivery**: Timely, secure transit of passports, tax forms, and agreements.
     * **Real-Time Tracking**: Chain of custody logs.
     * **Secure Storage**: Vault operations in transit.
     * **Verification Services**: Doorstep identity verification matching receiver ID.
     * **Customized Solutions**: Tailored corporate delivery channels.
* **Acceptance Criteria:**
  - [ ] Clicking Hero CTAs scrolls the viewport down smoothly to the targeted anchors.
  - [ ] Services list wraps cleanly to smaller widths (mobile-friendly).

---

### 🟡 TASK 3 · LMX-F3: Operations and Leadership Sections
* **Goal:** Detail the logistics operations (Fleet) and the management team.
* **Stack/Paths:**
  - [Fleet.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/Fleet.tsx) (File starts empty)
  - [Team.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/Team.tsx) (File starts empty)
* **Instructions:**
  1. Detail operational capabilities in `Fleet.tsx` describing:
     * **Secure Ground Transit**: Armored vans and motorcycles equipped with locks.
     * **Autonomous Drone Corridors**: Rapid transfer of passports between central regional vaults.
     * **GPS Vault Telemetry**: continuous coordinate tracking and sensor audits.
  2. Implement card profiles in `Team.tsx` listing the 4 corporate personnel:
     * **Mr. Josiah Otoo-Mensah**: Managing Director (Strategic direction)
     * **Mr. Blessing Lamptey**: CEO / Operations Manager (Logistics desk)
     * **Technology Director**: IT Infrastructure and cryptography keys
     * **Ms. Freda Amponsah**: Customer Service Manager (satisfaction monitoring)
* **Acceptance Criteria:**
  - [ ] Layout scales properly without overlapping grids or boxes.
  - [ ] No internal equity percentages or confidential financial arrangements are listed.

---

### 🔴 TASK 4 · LMX-F4: Interactive Tracking Timeline
* **Goal:** Implement the tracking database library, set up the Next.js API route, and build the interactive tracking status timeline.
* **Stack/Paths:**
  - [trackingDb.ts](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/lib/trackingDb.ts) [NEW] (Create this file and the `src/lib/` directory from scratch)
  - [route.ts](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/app/api/track/route.ts) [NEW] (Create this file and the `src/app/api/track/` directory from scratch)
  - [TrackingWidget.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/TrackingWidget.tsx) (File starts empty)
* **Instructions:**
  1. In `trackingDb.ts`, define the TypeScript interfaces for `TrackingStep` and `TrackingRecord`, and declare a mock database array containing the following records for validation:
     * **Record 1 (TIN search)**:
       - Tracking ID: `LMX-GRA-8064`
       - TIN: `C0064381064`
       - Document: `GRA Corporate Tax Clearance Certificate (TCC-2026)`
       - Sender: `Ghana Revenue Authority (GRA) - Large Taxpayer Office, Accra`
       - Recipient: `Checkmate Private Management Ltd. (Attn: Mr. Blessing Lamptey)`
       - Destination: `H302 Sowah Larbi Ave, GD-228-1968, Accra`
       - ID Required: `Ghana Card (National ID)`
       - Status: `delivered`
       - Timeline events: pickup_completed, in_transit, out_for_delivery, delivered.
     * **Record 2 (Passport search)**:
       - Tracking ID: `LMX-GIS-9281`
       - Passport Number: `G2039281`
       - Document: `Biometric Passport Renewal (32-Pages)`
       - Sender: `Ghana Immigration Service (GIS) - Headquarters, Accra`
       - Recipient: `Kofi Boateng`
       - Destination: `Adum, Kumasi (Sector Depot)`
       - ID Required: `Ghana Card (National ID)`
       - Status: `in_transit`
       - Timeline events: pickup_completed, in_transit.
  2. Implement the `findTrackingRecord(query)` helper to search by trackingId, passportNumber, or TIN.
  3. In `src/app/api/track/route.ts`, code the GET request handler that extracts the `query` search parameter and invokes `findTrackingRecord`. Respond with JSON records, or status codes 404 (not found) and 400 (bad request).
  4. In `TrackingWidget.tsx`, bind input text to form submissions, fetch `/api/track?query={val}`, and render:
     * Document profile information (Agency, Destination, Recipient Name).
     * Vertical timeline showing status label, location, operator name, message, and timestamp. Highlight the latest checkpoint in red.
* **Acceptance Criteria:**
  - [ ] Input search matches regardless of trailing spaces or casing.
  - [ ] Searching `LMX-GRA-8064` yields the completed tracking progress timeline.
  - [ ] Searching `G2039281` yields the in-transit passport timeline.
  - [ ] Search errors are handled cleanly without crashing.

---

### 🟠 TASK 5 · LMX-F5: Dispatch Booking Form & Footer
* **Goal:** Implement the booking scheduler inputs, simulate submission, and build a compliant footer.
* **Stack/Paths:**
  - [ContactForm.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/ContactForm.tsx) (File starts empty)
  - [Footer.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/Footer.tsx) (File starts empty)
* **Instructions:**
  1. In `ContactForm.tsx`, bind input forms covering:
     * Sender Name and Phone
     * Collection Point (select drop-down)
     * Document Name/Details
     * Destination Address (Street / Digital address)
     * Recipient Name, Phone, and Required Identity Check Type
  2. Implement form submission handler: validate fields, simulate an API dispatch timer of 1 second, and reveal a success banner with a randomized booking ID (`LMX-REQ-XXXX`).
  3. In `Footer.tsx`, output a 3-column corporate layout:
     * **Column 1**: Brand Name, and registration details (Reg No. CS120930824, TIN C0064381064).
     * **Column 2**: Quick links matching header elements.
     * **Column 3**: Business address (H302 Sowah Larbi Ave, GD-228-1968, Accra) and operations phone line (Mr. Blessing Lamptey - (054) 597-5896).
* **Acceptance Criteria:**
  - [ ] Submitting forms validates that required fields are filled.
  - [ ] A success message with a generated booking reference replaces the input form.
  - [ ] Footer renders all registration and contact numbers accurately.
