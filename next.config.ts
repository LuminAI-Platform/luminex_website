import type { NextConfig } from "next";
import os from "os";

const isDev = process.env.NODE_ENV === "development";

function getLocalDevOrigins(): string[] {
  const origins = new Set<string>(["localhost", "127.0.0.1", "10.21.16.49"]);
  try {
    const interfaces = os.networkInterfaces();
    for (const list of Object.values(interfaces)) {
      for (const iface of list || []) {
        if (iface.family === "IPv4" && iface.address) {
          origins.add(iface.address);
        }
      }
    }
  } catch {
    // Fallback to default origins
  }
  return Array.from(origins);
}

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' ${isDev ? "ws: wss: " : ""}https://*.supabase.co https://api.resend.com; frame-src 'self' https://www.google.com https://maps.google.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me;`,
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  allowedDevOrigins: getLocalDevOrigins(),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
