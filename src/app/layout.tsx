import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.luminexlogistics.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luminex Logistics | Secure Document Delivery Across Ghana",
    template: "%s | Luminex Logistics",
  },
  description:
    "Luminex Logistics Ltd. (Registration No. CS120930824, TIN C0064381064) is Ghana's premier secure document logistics provider. Specialized custody transfer for legal contracts, government tenders, financial instruments, and corporate records with biometric and ID verification.",
  keywords: [
    "secure document delivery Ghana",
    "courier service Accra",
    "chain of custody courier",
    "legal document transport Accra",
    "tender document delivery Ghana",
    "corporate courier Ghana",
    "Luminex Logistics",
  ],
  authors: [{ name: "Luminex Logistics Ltd." }],
  creator: "Luminex Logistics Ltd.",
  publisher: "Luminex Logistics Ltd.",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Luminex Logistics | Secure Document Delivery Ghana",
    description:
      "Institutional-grade document logistics engineered for high-value legal, corporate, and government documentation across Ghana.",
    url: SITE_URL,
    siteName: "Luminex Logistics",
    images: [
      {
        url: "/hero-fold.jpg",
        width: 1200,
        height: 630,
        alt: "Luminex Logistics — Secure Document Courier Ghana",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminex Logistics | Secure Document Delivery Ghana",
    description:
      "Precision document courier network with verified chain of custody and real-time tracking in Ghana.",
    images: ["/hero-fold.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * JSON-LD structured data for search engines.
 * Declares Luminex Logistics as a verified LocalBusiness and DeliveryService in Ghana.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "DeliveryService"],
  name: "Luminex Logistics Ltd.",
  image: `${SITE_URL}/logo.jpeg`,
  "@id": `${SITE_URL}#organization`,
  url: SITE_URL,
  telephone: "+233302908471",
  email: "ops@luminexlogistics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "H302 Sowah Larbi Ave",
    addressLocality: "Accra",
    addressCountry: "GH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 5.6201,
    longitude: -0.1221,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Ghana",
  },
  serviceType: [
    "Secure Legal Document Transit",
    "Corporate Tender Courier",
    "Biometric Handover Verification",
    "GPS Telemetry Custody Tracking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-gray-900 antialiased font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}