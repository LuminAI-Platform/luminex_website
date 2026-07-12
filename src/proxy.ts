import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Secure request headers injection for Luminex tracking and services API
  const response = NextResponse.next();

  // Log tracking API calls to ensure audit trail for sensitive documents
  if (request.nextUrl.pathname.startsWith('/api/track')) {
    const query = request.nextUrl.searchParams.get('query') || 'None';
    const clientIp = request.headers.get('x-forwarded-for') || 'Unknown IP';
    console.log(`[Luminex Audit Proxy] Secure tracking request initiated: Query="${query}" | ClientIP=${clientIp} | Timestamp=${new Date().toISOString()}`);
  }

  // Add high-compliance headers representing the secure document delivery platform
  response.headers.set('X-Luminex-Secure-Proxy', 'v16.0.0-Active');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Target only API and main page routes to optimize performance and prevent static asset blocking
export const config = {
  matcher: ['/', '/api/:path*'],
};
