# 🧑‍💻 Task Sheet: Sprint 1 – Hero Section (LMX-S1-01)

Implement the **Hero Section** matching the Figma design exactly.

**Design Reference**: [`design/Home.png`](design/Home.png)  
**Figma**: https://www.figma.com/design/yvtYmkQiI24JxtZkdYNKGI/luminex?node-id=6-2

---

## 🛠️ Feature Goals

* Path: [Hero.tsx](src/components/Hero.tsx)
* Branch: `feature/LMX-S1-hero`

### Instructions

1. **Hero Layout & Background**:
   - Full-width section with a **dark navy overlay** (`navy-950` / `#040d1a` at ~85% opacity) over a background image.
   - The background image should depict a logistics/document handling scene (use a dark-toned photo from the `public/` folder or a placeholder dark gradient if unavailable).
   - Content is **centered** both horizontally and vertically within the hero area.
   - Minimum height: `min-h-[520px]` or equivalent to give the section visual weight.

2. **Hero Heading**:
   - Main headline: **"Secure Document Delivery Across Ghana"**
   - Typography: Large, bold, white serif-style or heavy sans-serif text.
   - The heading should be center-aligned and prominent (~`text-4xl md:text-5xl lg:text-6xl font-black`).

3. **Hero Subtitle**:
   - Text: *"Institutional-grade logistics engineered for high-value legal, corporate, and government documentation. Precision execution, guaranteed chain of custody."*
   - Centered below the heading, lighter weight, slightly muted white (`text-slate-200` or `text-white/80`).
   - Max-width constraint to prevent text from stretching too wide on large screens (~`max-w-2xl mx-auto`).

4. **CTA Buttons** (centered row below subtitle):
   - **Primary CTA**: "Track Shipment" button
     - Background: Brand Red (`bg-brand-red-500` / `#d32f2f`)
     - White text, rounded corners, icon prefix (📦 or a truck/shipment icon)
     - Links to `/track`
   - **Secondary CTA**: "Book Services" button
     - Outlined style or light background (`bg-white text-navy-900` or `border border-white text-white`)
     - Links to `/book`
   - Both buttons should have hover transitions.

5. **Visual Element (Right Side)**:
   - On the design there's a subtle visual element on the right (an image of a document/logistics pouch on a dark surface).
   - This can be achieved with a positioned image or simply part of the hero background. Not a separate column — the design uses a **single centered layout** with the image as part of the background ambiance.

6. **Responsive Behavior**:
   - On mobile, heading should scale down to `text-3xl`.
   - Buttons should stack vertically on very small screens.
   - Adequate vertical padding (`py-20 md:py-28`).

---

## 📋 Acceptance Criteria
- [ ] Hero section matches the design reference in layout, colors, and typography.
- [ ] "Track Shipment" links to `/track` and "Book Services" links to `/book`.
- [ ] Text is readable over the dark background (AAA contrast compliance).
- [ ] Section is fully responsive from mobile to desktop.
- [ ] Project passes `npm run build` and `npm run lint` on the feature branch.
