# 🧑‍💻 Task Sheet: Sprint 1 - Navbar & Global Layout (LMX-S1-01)

Implement the semantic navigation header and register brand assets on the global layout wrapper.

---

## 🛠️ Feature Goals
* Path: [Navbar.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/Navbar.tsx)
* Layout Wrapper: [layout.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/app/layout.tsx)
* Assets: Logo is located at `public/logo.jpeg`

### Instructions
1. **Logo Integration**: Load the logo from `/logo.jpeg` using the Next.js `<Image>` component. Observe Next.js 16 requirements: do not use the deprecated `priority` prop, use the `preload` prop instead. 
2. **Branding Text**: Position the brand name next to the logo icon:
   - Primary: **Luminex** (Bold typography, Navy color `#0A1931`)
   - Subtitle: **Logistics** (Accent Red `#C0392B`)
3. **Multi-page Navigation Links**: Render links for page navigation and anchor offsets:
   - *Home* (links to `/`)
   - *Track Documents* (links to `/track` route)
   - *Services* (links to home page anchor `/#services`)
   - *Operations* (links to home page anchor `/#operations`)
   - *Leadership* (links to home page anchor `/#team`)
4. **Call to Action (CTA)**: Build a "Book Courier" action button linking directly to the dedicated booking route `/book`.
5. **Mobile Responsiveness**: Implement a toggling hamburger menu state (`isOpen`). Smaller screens should collapse navigation links and reveal them in a collapsible vertical stack upon button click.
6. **Global Wrapper Integration**: Import and place `<Navbar />` and `<Footer />` globally in `layout.tsx` enclosing the `{children}` tag so that all pages share a single navigation and footer layout frame.

---

## 📋 Acceptance Criteria
- [ ] Corporate logo renders cleanly with correct proportions on desktop and mobile.
- [ ] Navbar remains sticky (`sticky top-0`) at the top of the viewport when scrolling.
- [ ] Navbar links redirect to `/track` and `/book` routes correctly from any sub-page.
- [ ] Mobile hamburger toggle opens and closes the mobile menu smoothly.
- [ ] Project passes `npm run build` and `npm run lint` before committing feature branch.
