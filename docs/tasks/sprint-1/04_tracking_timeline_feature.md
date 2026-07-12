# 🧑‍💻 Task Sheet: Sprint 1 - Interactive Tracking Timeline (LMX-S1-04)

Configure the mock document database, set up the Next.js API route, write the track page wrapper, and build the interactive timeline widget.

---

## 🛠️ Feature Goals
* Paths:
  - `src/lib/trackingDb.ts` [NEW] (Create this file and `src/lib/` folder from scratch)
  - `src/app/api/track/route.ts` [NEW] (Create this file and `src/app/api/track/` folder from scratch)
  - `src/app/track/page.tsx` [NEW] (Create this file and the `src/app/track/` page folder from scratch)
  - [TrackingWidget.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/TrackingWidget.tsx)

### Instructions

1. **Mock Database (`trackingDb.ts`)**:
   - Define interfaces for:
     - `TrackingStep`: status (label, timestamp, location, operator name, description message).
     - `TrackingRecord`: trackingId, passportNumber (optional), tin (optional), documentType, documentName, sender, recipientName, destination, currentStatus, and timeline array.
   - Populate the database with the following mock records:
     - **Record 1**:
       - Tracking ID: `LMX-GRA-8064`
       - TIN: `C0064381064`
       - Document Name: `GRA Corporate Tax Clearance Certificate (TCC-2026)`
       - Sender: `Ghana Revenue Authority (GRA) - Large Taxpayer Office, Accra`
       - Recipient: `Checkmate Private Management Ltd. (Attn: Mr. Blessing Lamptey)`
       - Destination: `H302 Sowah Larbi Ave, GD-228-1968, Accra`
       - ID Required: `Ghana Card (National ID)`
       - Status: `delivered`
       - Timeline events: pickup_completed, in_transit, out_for_delivery, delivered.
     - **Record 2**:
       - Tracking ID: `LMX-GIS-9281`
       - Passport Number: `G2039281`
       - Document Name: `Biometric Passport Renewal (32-Pages)`
       - Sender: `Ghana Immigration Service (GIS) - Headquarters, Accra`
       - Recipient: `Kofi Boateng`
       - Destination: `Adum, Kumasi (Sector Depot)`
       - ID Required: `Ghana Card (National ID)`
       - Status: `in_transit`
       - Timeline events: pickup_completed, in_transit.
   - Implement `findTrackingRecord(query)` to find a record matching `trackingId`, `passportNumber`, or `tin` (case-insensitive and trimmed).

2. **Next.js 16 GET API Handler (`route.ts`)**:
   - Standard Web URL search parameters logic.
   - Query parameter: `query`.
   - If missing, return JSON `{ error: "Please enter a valid Tracking ID..." }` with status `400`.
   - If not found, return JSON `{ error: "No matching records found." }` with status `404`.
   - On success, return the full `TrackingRecord` JSON.

3. **Page Route Setup (`src/app/track/page.tsx`)**:
   - Create a clean page component rendering `<TrackingWidget />` inside a `<main>` container.

4. **Timeline Widget UI (`TrackingWidget.tsx`)**:
   - Bind input forms, perform request checks, and call `/api/track?query={val}`.
   - Handle loading state and display errors in red notices.
   - Render document metadata cards (Sender, Destination, Recipient Name, Verification ID).
   - Render a vertical chain of custody timeline listing statuses, timestamps, locations, messages, and operator signatures. Highlight the active/latest node in Red.

---

## 📋 Acceptance Criteria
- [ ] Searching `LMX-GRA-8064` fetches and displays the completed tax certificate timeline on `/track`.
- [ ] Searching `G2039281` fetches and displays the in-transit passport timeline on `/track`.
- [ ] Input queries ignore casing and whitespaces.
- [ ] Routing to `/track` loads the widget cleanly with no global layout duplicate headers/footers.
- [ ] Project passes `npm run build` locally.
