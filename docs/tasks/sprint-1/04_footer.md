# 🧑‍💻 Task Sheet: Sprint 1 – Footer Section (LMX-S1-04)

Implement the **Footer** matching the Figma design exactly.

**Design Reference**: [`design/Home.png`](design/Home.png)  
**Figma**: https://www.figma.com/design/yvtYmkQiI24JxtZkdYNKGI/luminex?node-id=6-2

---

## 🛠️ Feature Goals

* Path: [Footer.tsx](src/components/Footer.tsx)
* Branch: `feature/LMX-S1-footer`

### Instructions

1. **Footer Layout** — 4-column grid on desktop, stacked on mobile:
   - **Column 1 – Brand & Legal**:
     - **"Luminex Logistics"** in bold white text.
     - Copyright: *"© 2026 Luminex Logistics Ltd."*
   - **Column 2 – Contact Info**:
     - **"Accra Head Office: H302 Sowah Larbi Ave"**
     - **"Support: +233 20 000 0000"**
   - **Column 3 – Legal Links**:
     - "Terms of Service" (link or placeholder `#`)
     - "Privacy Policy" (link or placeholder `#`)
   - **Column 4 – Social / Connect**:
     - Heading: **"CONNECT WITH US"** in uppercase, bold.
     - Social media icons row: Share icon, X (Twitter) icon, Globe icon.
     - Use simple SVG icons or unicode characters for the social icons.

2. **Footer Styling**:
   - Background: Dark navy (`bg-navy-950` / `#040d1a`).
   - Text: White (`text-white`) with muted variants for secondary text (`text-slate-400`).
   - Padding: `py-8 md:py-10`.
   - Max-width container: `max-w-7xl mx-auto px-4`.
   - Font sizes: Small (`text-sm`) for all footer content.

3. **Responsive Behavior**:
   - On mobile: Stack columns vertically with spacing between.
   - On tablet+: Horizontal 4-column layout (`grid grid-cols-1 md:grid-cols-4 gap-8`).

---

## 📋 Acceptance Criteria
- [ ] Footer renders at the bottom of every page (`/`, `/track`, `/book`) via the global layout.
- [ ] Brand name, address, support phone, and legal links display correctly.
- [ ] "CONNECT WITH US" section shows social media icons.
- [ ] Dark navy background with white text is consistent.
- [ ] Footer adapts responsively from mobile to desktop.
- [ ] Project passes `npm run build` and `npm run lint` on the feature branch.
