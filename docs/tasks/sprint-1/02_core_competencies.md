# 🧑‍💻 Task Sheet: Sprint 1 – Core Competencies Section (LMX-S1-02)

Implement the **Core Competencies** services grid matching the Figma design exactly.

**Design Reference**: [`design/Home.png`](design/Home.png)  
**Figma**: https://www.figma.com/design/yvtYmkQiI24JxtZkdYNKGI/luminex?node-id=6-2

---

## 🛠️ Feature Goals

* Path: [Services.tsx](src/components/Services.tsx)
* Anchor ID: `id="services"` on the section wrapper
* Branch: `feature/LMX-S1-competencies`

### Instructions

1. **Section Header**:
   - A vertical **red accent bar** (3-4px wide, ~40px tall) on the left side of the heading.
   - Heading: **"Core Competencies"** — large bold text (`text-3xl md:text-4xl font-black text-navy-900`).
   - Subtitle below: *"Rigorous protocols applied to every tier of logistics, ensuring confidentiality and precision for specialized deliveries."*
   - Subtitle styled in muted gray (`text-slate-500`), constrained width.

2. **Service Cards Grid** — 3 columns on desktop, 1 column on mobile:
   - **Row 1** (3 cards):
     - **Document Delivery**
       - Icon: Document/file icon in a rounded red-tinted badge
       - Description: *"Point-to-point secure transfer of legal contracts, government filings, and corporate tender documents with verifiable chain of custody."*
     - **GPS Telemetry**
       - Icon: GPS/location tracking icon in red-tinted badge
       - Description: *"Real-time geospatial tracking of all assets. Institutional clients receive direct API access to live routing data for auditing."*
     - **Vault Storage**
       - Icon: Vault/shield icon in red-tinted badge
       - Description: *"Climate-controlled, biometric-restricted holding facilities for documents requiring temporary staging between secure transfers."*
   - **Row 2** (2 cards + CTA):
     - **ID Verification**
       - Icon: ID card icon in red-tinted badge
       - Description: *"Mandatory multi-factor recipient authentication before handover. Digital signature and government ID cross-referencing on delivery."*
     - **Corporate Portals**
       - Icon: Building/corporate icon in red-tinted badge
       - Description: *"Dedicated extranets for volume clients. Manage dispatch schedules, download audit trails, and oversee multi-regional logistics programs from a centralized dashboard."*
     - **Request Access CTA** (positioned in the third column space):
       - An outlined button: **"Request Access →"**
       - Style: `border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white` with arrow icon
       - Links to `/book`

3. **Card Design** (each card):
   - White background, subtle border (`border border-slate-200`), rounded corners (`rounded-lg`).
   - Padding: `p-6`
   - Icon badge at top-left: Small rounded square with light red background (`bg-brand-red-50`) containing the icon in brand red.
   - Service title: Bold, `text-lg font-bold text-navy-900`, positioned below the icon.
   - Description: `text-sm text-slate-600 leading-relaxed`.

4. **Section Styling**:
   - White/light background section (`bg-white` or `bg-slate-50`).
   - Generous vertical padding: `py-16 md:py-24`.
   - Max-width container: `max-w-6xl mx-auto px-4`.

---

## 📋 Acceptance Criteria
- [ ] Section renders 5 service cards in a 3×2 grid layout matching the design.
- [ ] Each card has the icon badge, bold title, and descriptive text.
- [ ] "Request Access →" button appears in the bottom-right area of the grid.
- [ ] Red accent bar appears to the left of the section heading.
- [ ] Grid collapses cleanly to a single column on mobile.
- [ ] `id="services"` anchor works with navbar link `/#services`.
- [ ] Project passes `npm run build` and `npm run lint` on the feature branch.
