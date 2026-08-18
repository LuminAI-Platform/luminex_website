# Luminex Logistics — Brand & Design System Guide

> **Purpose:** This document will help you build new pages that are visually consistent with the existing site — without a Figma file.

---

## 1. Color Palette

### Primary Colors — Navy

| Token | Hex | Usage |
|:---|:---|:---|
| `navy-50` | `#f4f6fa` | Light navy tint backgrounds |
| `navy-100` | `#e1e7f0` | Secondary borders |
| `navy-200` | `#b8c7db` | Muted text on dark |
| `navy-300` | `#8fa7c7` | — |
| `navy-400` | `#6687b2` | — |
| `navy-500` | `#3d679e` | — |
| `navy-600` | `#2b4f7c` | — |
| `navy-700` | `#1d3656` | — |
| `navy-800` | `#0f2036` | Deep navy backgrounds |
| `navy-900` | `#0a1931` | Primary heading text, button backgrounds |
| `navy-950` | `#040d1a` | Hero backgrounds, footer, darkest navy |

### Accent Colors — Brand Red

| Token | Hex | Usage |
|:---|:---|:---|
| `brand-red-50` | `#fef2f2` | Icon background tint |
| `brand-red-100` | `#fee2e2` | — |
| `brand-red-500` | `#d32f2f` | **Primary CTA buttons**, active links, icon color, accent bars |
| `brand-red-600` | `#c0392b` | Button hover states |
| `brand-red-700` | `#9e2a1e` | Dark hover on red buttons |
| `brand-red-900` | `#5c140d` | — |

### Neutrals & Backgrounds

| Token | Hex | Usage |
|:---|:---|:---|
| `bg-light` / `slate-50` | `#f8fafc` | Page backgrounds |
| `bg-white` | `#ffffff` | Card backgrounds |
| `neutral-dark` | `#1f2937` | Body text |
| `slate-200` | — | Borders |
| `slate-300` | — | Input borders |
| `slate-400` | — | Muted/secondary text |
| `slate-500` | — | Subtitle text |
| `slate-600` | — | Body text in cards |
| `slate-700` | — | Nav link text |

> [!IMPORTANT]
> **NEVER use hardcoded hex values.** Always use the Tailwind tokens defined in `globals.css`. For example, use `text-brand-red-500` not `text-[#d32f2f]`.

---

## 2. Typography

### Font Stack
```
Primary: Geist Sans (--font-geist-sans)
Monospace: Geist Mono (--font-geist-mono) — used for tracking numbers (CSN)
```

Both fonts are loaded via `next/font/google` in `layout.tsx`.

### Type Scale

| Element | Classes | Example |
|:---|:---|:---|
| Page H1 | `text-3xl sm:text-5xl md:text-6xl font-black tracking-tight` | Hero headline |
| Section H2 | `text-3xl md:text-4xl font-black text-navy-900 tracking-tight` | "Core Competencies" |
| Card H3 | `text-lg font-bold text-navy-900` | "Document Delivery" |
| Subtitle | `text-base md:text-lg text-slate-500 leading-relaxed` | Section descriptions |
| Body text | `text-sm text-slate-600 leading-relaxed` | Card descriptions |
| Small/Meta | `text-xs text-slate-400` | Timestamps, labels |
| Uppercase labels | `text-xs font-bold uppercase tracking-wider` | "ASSIGNED COURIER" |

---

## 3. Layout & Spacing

### Container
```
max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
```
- All sections use `max-w-6xl` (not `max-w-7xl`) for content
- The Navbar uses `max-w-7xl` for a slightly wider header

### Section Padding
```
py-16 md:py-24
```

### Grid System
```
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```
- 3-column grids for service cards, testimonials, team cards
- 2-column grids for form layouts
- 4-column grid for footer

---

## 4. Component Patterns

### Section Header (with Red Accent Bar)
```tsx
<div className="mb-12">
  <div className="flex items-center gap-3 mb-3">
    <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
    <h2 className="text-3xl md:text-4xl font-black text-navy-900 tracking-tight">
      Section Title
    </h2>
  </div>
  <p className="text-slate-500 max-w-2xl pl-4.5 text-base">
    Section description text goes here.
  </p>
</div>
```

### Card (Standard)
```tsx
<div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-xs">
  <div>
    <div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500 mb-4">
      <IconComponent className="w-5 h-5" />
    </div>
    <h3 className="text-lg font-bold text-navy-900 mb-2">Card Title</h3>
    <p className="text-sm text-slate-600 leading-relaxed">Card body text.</p>
  </div>
</div>
```

### Card (Hoverable — Team/Interactive)
```tsx
<div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-all duration-200">
  {/* content */}
</div>
```

### Primary Button (Red CTA)
```tsx
<button className="bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-xs transition-all cursor-pointer">
  Button Text
</button>
```

### Secondary Button (Outlined)
```tsx
<button className="inline-flex items-center gap-2 px-5 py-2.5 border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold text-sm rounded transition-colors duration-200">
  Button Text
  <ArrowRight className="w-4 h-4" />
</button>
```

### Ghost Button (Hero secondary)
```tsx
<button className="px-6 py-3.5 bg-navy-900/80 hover:bg-navy-800 border border-slate-600 hover:border-slate-400 text-white font-semibold text-sm rounded backdrop-blur-sm transition-all duration-200">
  Button Text
</button>
```

### Form Input
```tsx
<input
  type="text"
  required
  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 focus:border-navy-900"
/>
```

### Form Section Header
```tsx
<h2 className="text-xl font-bold text-navy-900 flex items-center gap-2 border-b border-slate-100 pb-3 mb-6">
  <IconComponent className="w-5 h-5 text-brand-red-500 shrink-0" />
  1. Section Name
</h2>
```

### Info Callout Box
```tsx
<div className="bg-blue-50/80 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-slate-700">
  <LockIcon className="w-5 h-5 text-navy-900 shrink-0 mt-0.5" />
  <div>
    <h4 className="font-bold text-navy-900 text-sm mb-1">Title</h4>
    <p className="text-xs leading-relaxed text-slate-600">Content</p>
  </div>
</div>
```

---

## 5. Icons

**Library:** [Lucide React](https://lucide.dev/icons/) (`lucide-react`)

Standard icon sizing:
- In icon containers: `w-5 h-5` or `w-6 h-6`
- Inline with text: `w-4 h-4`

Icon container pattern:
```tsx
<div className="w-10 h-10 rounded-md bg-brand-red-50 flex items-center justify-center text-brand-red-500">
  <IconName className="w-5 h-5" />
</div>
```

---

## 6. Do's & Don'ts

### ✅ Do's
- Use `font-black` for headings (extra bold weight)
- Use `rounded-lg` or `rounded-xl` for cards (never sharp corners)
- Use `shadow-xs` or `shadow-sm` on cards (subtle, never heavy shadows)
- Use `transition-all duration-200` for hover effects
- Use the red accent bar before section headings
- Use `border border-slate-200` on all cards
- Add `leading-relaxed` to paragraph text

### ❌ Don'ts
- **Don't hardcode hex colors** — always use Tailwind tokens
- **Don't use generic stock photos** — use authentic or AI-generated brand imagery
- **Don't skip the focus ring** on form elements (accessibility)
- **Don't use heavy drop shadows** — keep it subtle and flat
- **Don't use serif fonts** — the brand is exclusively sans-serif
- **Don't use colors outside the palette** (no bright blue, green, purple etc.)
- **Don't break the max-w-6xl container** for content sections
