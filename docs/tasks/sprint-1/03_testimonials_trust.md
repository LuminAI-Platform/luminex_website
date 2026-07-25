# 🧑‍💻 Task Sheet: Sprint 1 – Testimonials / Trust Section (LMX-S1-03)

Implement the **"Trust from Ghana's Leading Institutions"** testimonials section matching the Figma design exactly.

**Design Reference**: [`design/Home.png`](design/Home.png)  
**Figma**: https://www.figma.com/design/yvtYmkQiI24JxtZkdYNKGI/luminex?node-id=6-2

---

## 🛠️ Feature Goals

* Path: [Fleet.tsx](src/components/Fleet.tsx) — **Rename this component's purpose** from "Fleet/Operations" to "Testimonials/Trust". The component file stays as `Fleet.tsx` for now (to avoid breaking the import in `page.tsx`), but the rendered content should be the testimonials section from the design.
* Anchor ID: `id="operations"` on the section wrapper (navbar links to `/#operations`)
* Branch: `feature/LMX-S1-testimonials`

### Instructions

1. **Section Header** (same pattern as Core Competencies):
   - Vertical **red accent bar** on the left of the heading.
   - Heading: **"Trust from Ghana's Leading Institutions"** — large bold text (`text-3xl md:text-4xl font-black text-navy-900`).
   - Subtitle: *"Our commitment to security and precision has made us the preferred logistics partner for the nation's most demanding sectors."*
   - Subtitle: `text-slate-500`, constrained max-width.

2. **Testimonial Cards Grid** — 3 columns on desktop, 1 on mobile:
   - **Card 1**:
     - Rating: ★★★★★ (5 red stars)
     - Quote: *"Luminex has redefined our expectations for legal document handling. Their chain of custody protocols are unmatched in the West African market."*
     - Author: **Kofi Mensah**
     - Title: *Senior Partner, Global Legal Chambers*
   - **Card 2**:
     - Rating: ★★★★★ (5 red stars)
     - Quote: *"The real-time GPS telemetry provides the transparency our compliance department requires for high-value government tenders."*
     - Author: **Ama Boateng**
     - Title: *Director of Operations, National Infrastructure Agency*
   - **Card 3**:
     - Rating: ★★★★★ (5 red stars)
     - Quote: *"Speed is essential, but security is non-negotiable. Luminex delivers both with a level of professionalism that is truly world-class."*
     - Author: **Dr. Samuel Osei**
     - Title: *Chief Technology Officer, Zenith Financial Group*

3. **Card Design**:
   - White background, subtle border (`border border-slate-200`), rounded corners.
   - Padding: `p-6`.
   - Stars at the top: rendered in brand red (`text-brand-red-500`).
   - Quote text: Italic, `text-slate-600`, `text-sm leading-relaxed`.
   - Author name: Bold, `text-navy-900 font-bold`.
   - Author title: `text-xs text-slate-400 italic`.

4. **Section Styling**:
   - Light background: `bg-slate-50` or `bg-white`.
   - Generous vertical padding: `py-16 md:py-24`.
   - Max-width container: `max-w-6xl mx-auto px-4`.
   - A thin horizontal divider (`border-t border-slate-100`) separating this from the section above.

---

## 📋 Acceptance Criteria
- [ ] Three testimonial cards render in a clean 3-column grid.
- [ ] Star ratings display in brand red.
- [ ] Quote text, author names, and titles match the design content exactly.
- [ ] Section heading has the red accent bar matching the Core Competencies pattern.
- [ ] Grid collapses to single column on mobile.
- [ ] `id="operations"` anchor works with navbar link `/#operations`.
- [ ] Project passes `npm run build` and `npm run lint` on the feature branch.
