# Luminex Logistics — New Page Specifications

> **For the developer:** Each page spec below details the route, layout, components, content structure, and styling rules. All pages must follow the design system tokens and component patterns defined in the [Brand & Design System Guide](./brand_design_system.md).

---

## Page 1: About Us

**Route:** `/about`  
**File:** `src/app/about/page.tsx`  
**Priority:** 🔴 Critical

### SEO Metadata
```ts
export const metadata: Metadata = {
  title: "About Us | Luminex Logistics — Ghana's Premier Secure Courier",
  description: "Learn about Luminex Logistics Ltd., Ghana's leading secure document delivery company. Our story, mission, team, certifications, and commitment to precision logistics.",
};
```

### Component Breakdown

#### Section 1 — Hero Banner
- Background: `bg-navy-950 text-white py-16 md:py-24`
- Centered container: `max-w-4xl mx-auto text-center px-4`
- H1: "About Luminex Logistics" (`text-3xl md:text-5xl font-black`)
- Subtitle: Company mission and legal registration notice (`Registration No. CS120930824 | TIN C0064381064`)

#### Section 2 — By The Numbers (Stats Grid)
- Background: `bg-white py-12 border-b border-slate-100`
- Grid: `grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 sm:px-6`
- 4 Stat Cards:
  1. **10,000+** Documents Delivered Annually (`text-3xl md:text-4xl font-black text-brand-red-500`)
  2. **99.9%** On-Time Fulfillment Rate
  3. **50+** Corporate & Legal Partners
  4. **3** Regional Custody Hubs

#### Section 3 — Company Story & Mission
- Background: `bg-slate-50 py-16 md:py-20`
- Section Header with vertical red accent bar: "Engineered for Integrity"
- 2-column or structured timeline layout describing the founding, focus on chain-of-custody protocols, and institutional compliance standards.

#### Section 4 — Certifications & Compliance
- Background: `bg-white py-16 md:py-20 border-t border-slate-100`
- Section Header: "Certifications & Regulatory Compliance"
- 3-column card grid (`grid grid-cols-1 md:grid-cols-3 gap-6`):
  1. **ISO 9001:2015** — Quality Management System
  2. **Ghana Data Protection Act (DPA)** — Registered data controller compliance
  3. **Bonded Courier Licensing** — Fully authorized document transit credentials

#### Section 5 — Office Headquarters
- Container: `max-w-6xl mx-auto px-4 py-16`
- 2-column layout:
  - **Left:** Google Maps embed `<iframe>` centered on Sowah Larbi Ave, Accra
  - **Right:** Physical address details, dispatch desk contact, and operating hours

---

## Page 2: Contact Us

**Route:** `/contact`  
**File:** `src/app/contact/page.tsx`  
**Priority:** 🔴 Critical

### SEO Metadata
```ts
export const metadata: Metadata = {
  title: "Contact Us | Luminex Logistics",
  description: "Get in touch with Luminex Logistics. Reach our dispatch center in Accra via phone, email, WhatsApp, or visit our head office.",
};
```

### Component Breakdown

#### Section 1 — Header
- Section header with red accent bar: "Get in Touch"
- Subtitle: "Reach our dispatch operations team directly for enterprise accounts, urgent transfers, or support."

#### Section 2 — Two-Column Interactive Layout
Container: `max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8`

**Left (Col Span 7): Inquiry Form**
- Card: `bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs`
- Form fields:
  - Full Name (`type="text"`, required)
  - Corporate / Contact Email (`type="email"`, required)
  - Phone Number (`type="tel"`, pattern validation)
  - Inquiry Type / Subject (Select: Enterprise Account, Consignment Query, General Support)
  - Message (`textarea`, rows=4, maxLength=500)
- Button: `bg-brand-red-500 hover:bg-brand-red-600 text-white font-semibold px-8 py-3 rounded-lg`

**Right (Col Span 5): Direct Contact Information**
- Stacked info cards (`bg-white border border-slate-200 rounded-xl p-5 space-y-4`):
  1. 📞 **Telephone:** Support line with click-to-call link
  2. 📧 **Direct Email:** `ops@luminexlogistics.com`
  3. 💬 **WhatsApp Direct:** Fast chat dispatch link
  4. 📍 **Accra Headquarters:** H302 Sowah Larbi Ave, Accra, Ghana

#### Section 3 — Operating Hours Banner
- Full-width banner: `bg-navy-950 text-slate-300 py-6 text-center text-sm font-medium`
- "Operational Hours: Monday – Friday: 08:00 – 18:00 GMT | Saturday: 09:00 – 13:00 GMT | 24/7 Armored Standby for Enterprise Contracts"

---

## Page 3: Terms of Service

**Route:** `/terms`  
**File:** `src/app/terms/page.tsx`  
**Priority:** 🔴 Critical (Legal compliance)

### SEO Metadata
```ts
export const metadata: Metadata = {
  title: "Terms of Service | Luminex Logistics",
  description: "Terms and conditions governing document transit, liability, custody verification, and service protocols at Luminex Logistics Ltd.",
};
```

### Component Breakdown
- **Layout:** Standard legal document container (`max-w-4xl mx-auto px-4 py-16`)
- **Header:** H1 "Terms of Service", last revision date, and summary banner
- **Sections:**
  1. **Acceptance of Terms & Service Scope**
  2. **Sender Obligations & Manifest Accuracy**
  3. **Mandatory Chain-of-Custody & Doorstep ID Verification**
  4. **Prohibited & Restricted Items Policy**
  5. **Limitation of Liability & Declared Value Coverage**
  6. **Cancellations, Re-routing, and Failed Handover Protocol**
  7. **Governing Law & Jurisdiction (Republic of Ghana)**

---

## Page 4: Privacy Policy

**Route:** `/privacy`  
**File:** `src/app/privacy/page.tsx`  
**Priority:** 🔴 Critical (Ghana DPA compliance)

### SEO Metadata
```ts
export const metadata: Metadata = {
  title: "Privacy Policy | Luminex Logistics",
  description: "Privacy Notice detailing personal data collection, biometric handover verification, and compliance with Ghana's Data Protection Act (Act 843).",
};
```

### Component Breakdown
- **Layout:** Shared layout with `/terms` (`max-w-4xl mx-auto px-4 py-16`)
- **Header:** H1 "Privacy Policy", last revision date, compliance badge
- **Sections:**
  1. **Data Controller Information (Luminex Logistics Ltd.)**
  2. **Categories of Personal Data Collected (Sender, Recipient, Manifest, GPS Telemetry)**
  3. **Lawful Basis & Purpose of Processing (Contractual fulfillment & ID verification)**
  4. **Biometric & Identity Verification Protocols at Delivery**
  5. **Data Retention & Secure Deletion Schedules**
  6. **Third-Party Disclosures (CRM, SMS Gateways, Cloud Infrastructure)**
  7. **Data Subject Rights under Act 843 (Access, Rectification, Erasure)**
  8. **Data Protection Officer Contact Point**

---

## Page 5: FAQ

**Route:** `/faq`  
**File:** `src/app/faq/page.tsx`  
**Priority:** 🟡 High

### SEO Metadata
```ts
export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Luminex Logistics",
  description: "Find answers regarding document booking, CSN tracking, identity verification requirements, and secure handling protocols.",
};
```

### Component Breakdown

#### Section 1 — Header
- Section header with red accent bar: "Frequently Asked Questions"
- Subtitle: "Clear answers about booking, tracking, security verification, and enterprise services."

#### Section 2 — Categorized Accordions
Container: `max-w-4xl mx-auto px-4 py-8 space-y-8`

**Category 1: Booking & Manifests**
- *How far in advance must I schedule a courier?*
- *What document types can be securely transported?*
- *Can I modify delivery details after booking confirmation?*

**Category 2: Tracking & Custody**
- *What is a CSN (Consignment Security Number)?*
- *How often is GPS telemetry updated during transit?*
- *What does 'Sorting Vault Transit' mean in the tracking log?*

**Category 3: Doorstep ID & Handover Verification**
- *What forms of identification are accepted at delivery?*
- *What happens if the named receiver is unavailable at destination?*
- *Are digital signatures and handover logs legally admissible?*

**Category 4: Enterprise & Billing**
- *Do you offer dedicated corporate portals for law firms and banks?*
- *What are your standard payment terms and invoice options?*

#### Section 3 — Support Callout
- Bottom card: `bg-navy-50 border border-navy-100 rounded-xl p-8 text-center`
- Text: "Have a specific question not covered above?"
- Direct links to `/contact` and `/book`

---

## Navigation & Global Updates for Developer

### Navbar Links (`src/components/Navbar.tsx`)
```ts
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Track Documents", href: "/track" },
  { name: "Services", href: "/#services" },
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];
```

### Footer Links (`src/components/Footer.tsx`)
- Link `Terms of Service` to `/terms`
- Link `Privacy Policy` to `/privacy`
