# 🧑‍💻 Task Sheet: Sprint 1 - Booking Form & Footer (LMX-S1-05)

Implement the booking page route, pickup booking request form, and compliant footer.

---

## 🛠️ Feature Goals
* Paths:
  - `src/app/book/page.tsx` [NEW] (Create this file and the `src/app/book/` page folder from scratch)
  - [ContactForm.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/ContactForm.tsx)
  - [Footer.tsx](file:///c:/Users/HP%20ELITEBOOK/OneDrive/Desktop/LuminAI/luminex_website/src/components/Footer.tsx)

### Instructions
1. **Page Route Setup (`src/app/book/page.tsx`)**:
   - Create a clean page component rendering `<ContactForm />` inside a `<main>` container.
2. **Pickup Booking Form (`ContactForm.tsx`)**:
   - Fields:
     - Sender Name and Contact Phone
     - Collection Point (GIS Passport Center, GRA Office, Law Chambers, Home)
     - Document Description (Biometric Passport, Tax Clearance Form, Registry Deeds)
     - Delivery Address (Digital address preferred)
     - Recipient Name, Phone, and Required Identity Check Type (Ghana Card, License, Passport)
   - Validation & Submission:
     - Form input fields must be required.
     - On submission, trigger loading indicators (simulate API call for 1s), then display a success screen.
     - Success banner should show a generated booking batch reference code (`LMX-REQ-XXXX`, where `XXXX` is a random 4-digit number).
     - Add a warning note indicating that doorstep verification requires the exact ID type selected.
3. **Footer Details (`Footer.tsx`)**:
   - Layout: 3-column corporate grid.
   - Column 1: Brand name and registration details:
     - Registration Number: **CS120930824**
     - TIN: **C0064381064**
   - Column 2: Quick links matching header elements.
   - Column 3: Business Address and emergency contacts:
     - Address: **H302 Sowah Larbi Ave, GD-228-1968, Accra, Ghana**
     - Contact: **Mr. Blessing Lamptey (CEO) - (054) 597-5896**

---

## 📋 Acceptance Criteria
- [ ] Navigating to `/book` loads the dispatch booking form correctly.
- [ ] Submitting forms validates that fields are filled.
- [ ] Success state completely replaces the input layout and lists the generated batch ID.
- [ ] Footer renders all registration and contact phone numbers accurately across all routes (`/`, `/track`, `/book`).
- [ ] Build compiles cleanly locally with zero warnings.
