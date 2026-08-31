import { MetadataRoute } from "next";

/**
 * Generates web application manifest for mobile installation / bookmarking.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luminex Logistics — Secure Document Delivery",
    short_name: "Luminex Logistics",
    description:
      "Ghana's premier secure document courier network for corporate, legal, and government documentation.",
    start_url: "/",
    display: "standalone",
    background_color: "#040d1a",
    theme_color: "#040d1a",
    icons: [
      {
        src: "/icon.jpeg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
