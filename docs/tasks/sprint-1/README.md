# 📋 Sprint 1 Overview – Homepage Design Implementation

**Goal**: Implement the full homepage to match the Figma design exactly.  
**Design Reference**: [`design/Home.png`](design/Home.png)  
**Figma**: https://www.figma.com/design/yvtYmkQiI24JxtZkdYNKGI/luminex?node-id=6-2

---

## Current State

All homepage components except `Navbar` are **empty stubs** (`return null`). The Navbar was completed in Sprint 0. This sprint focuses on building the visible homepage sections from the approved design.

## Task Breakdown

| #  | Task | Component | Branch | Priority |
|----|------|-----------|--------|----------|
| 01 | [Hero Section](01_hero_section.md) | `Hero.tsx` | `feature/LMX-S1-hero` | 🔴 High |
| 02 | [Core Competencies](02_core_competencies.md) | `Services.tsx` | `feature/LMX-S1-competencies` | 🔴 High |
| 03 | [Testimonials / Trust](03_testimonials_trust.md) | `Fleet.tsx` | `feature/LMX-S1-testimonials` | 🟡 Medium |
| 04 | [Footer](04_footer.md) | `Footer.tsx` | `feature/LMX-S1-footer` | 🔴 High |

## Execution Order (Recommended)

Tasks **01, 02, and 04** can be worked in parallel since they are independent components. Task **03** depends on the design pattern established in **02** (shared section header style).

```
  01 (Hero) ──────────┐
  02 (Competencies) ──┤── 03 (Testimonials)
  04 (Footer) ────────┘
```

## Design System Notes

All tasks should reference the existing Tailwind theme tokens defined in [`globals.css`](src/app/globals.css):
- **Navy palette**: `navy-50` through `navy-950` (primary dark color: `navy-950` `#040d1a`)
- **Brand Red palette**: `brand-red-50` through `brand-red-900` (primary accent: `brand-red-500` `#d32f2f`)
- **Font**: Geist Sans via `--font-sans`

## Git Workflow Reminder
- Branch from `main` using `feature/LMX-S1-<name>`
- Run `npm run build` and `npm run lint` locally before pushing
- Open a PR targeting `main` and assign to the Tech Lead for review
