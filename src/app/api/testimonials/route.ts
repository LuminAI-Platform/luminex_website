import { NextResponse } from "next/server";
import { createRateLimiter } from "@/lib/rate-limit";
import {
  getLocalConsignment,
  getLocalTestimonials,
  getSupabaseServerClient,
  saveLocalTestimonial,
  type LocalTestimonialRecord,
} from "@/lib/supabase";

/**
 * Rate limiter: 5 valid testimonial submissions per IP per 60 seconds.
 * Evaluated only AFTER input validation succeeds so typos never burn quota.
 */
const testimonialLimiter = createRateLimiter({
  namespace: "testimonials_valid",
  maxRequests: 5,
  windowMs: 60_000,
});

export type TestimonialKind = "verified_delivery" | "client_review" | "featured_partner";

export type TestimonialItem = LocalTestimonialRecord;

interface SupabaseTestimonialRow {
  id: string;
  rating: number;
  quote: string;
  author_name: string;
  author_title: string;
  verified: boolean;
  created_at: string;
}

/**
 * Detects keyboard-mashed gibberish (e.g. "jjj", "jpppp", "hjjjjjjjjjjjoo"):
 * - 4 or more identical characters in a row
 * - Single unbroken token longer than 24 characters
 * - Fewer than minimum required real alphabetic words
 */
function isGibberishText(input: string, minWords: number): boolean {
  const trimmed = input.trim();
  if (!trimmed) return true;

  // Reject 4+ identical consecutive characters (e.g. "pppp", "jjjj", "oooo")
  if (/(.)\1{3,}/i.test(trimmed)) {
    return true;
  }

  // Must contain at least one vowel and reasonable letter ratio
  const lettersOnly = trimmed.replace(/[^a-zA-Z]/g, "");
  if (lettersOnly.length < 2 || !/[aeiouyAEIOUY]/.test(lettersOnly)) {
    return true;
  }

  // Reject any single token without spaces longer than 28 chars
  const tokens = trimmed.split(/\s+/);
  if (tokens.some((t) => t.length > 28)) {
    return true;
  }

  // Count words that have at least 2 letters
  const realWords = tokens.filter((t) => /[a-zA-Z]{2,}/.test(t));
  if (realWords.length < minWords) {
    return true;
  }

  return false;
}

/**
 * GET /api/testimonials
 * Returns approved live customer testimonials from Supabase or the local disk store.
 */
export async function GET() {
  const supabase = getSupabaseServerClient();
  let dbItems: TestimonialItem[] = [];

  if (supabase) {
    try {
      const { data } = await supabase
        .from<SupabaseTestimonialRow[]>("testimonials")
        .select("id, rating, quote, author_name, author_title, verified, created_at")
        .eq("is_approved", "true")
        .order("created_at", { ascending: false });

      if (Array.isArray(data) && data.length > 0) {
        dbItems = data
          .filter(
            (row) =>
              !isGibberishText(row.author_name, 1) &&
              !isGibberishText(row.quote, 3)
          )
          .map((row) => ({
            id: row.id,
            rating: Number(row.rating) || 5,
            quote: row.quote,
            author: row.author_name,
            title: row.author_title,
            verified: Boolean(row.verified),
            kind: row.verified ? "verified_delivery" : "client_review",
            createdAt: row.created_at,
          }));
      }
    } catch (err) {
      console.error("[Supabase Testimonials GET Error]:", err);
    }
  }

  const localItems = getLocalTestimonials().filter(
    (item) => !isGibberishText(item.author, 1) && !isGibberishText(item.quote, 3)
  );
  const seenQuotes = new Set<string>();
  const combined: TestimonialItem[] = [];

  for (const item of [...localItems, ...dbItems]) {
    const key = `${item.author.toLowerCase()}::${item.quote.toLowerCase()}`;
    if (!seenQuotes.has(key)) {
      seenQuotes.add(key);
      combined.push(item);
    }
    if (combined.length >= 6) break;
  }

  return NextResponse.json({
    success: true,
    testimonials: combined,
  });
}

/**
 * POST /api/testimonials
 * Accepts a new client testimonial with content quality checks & optional CSN verification.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      author,
      title,
      quote,
      rating,
      csn,
      honeypot,
    }: {
      author?: string;
      title?: string;
      quote?: string;
      rating?: number;
      csn?: string;
      honeypot?: string;
    } = body;

    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your feedback.",
      });
    }

    const cleanAuthor = (author || "").trim().slice(0, 80);
    const cleanTitle = (title || "").trim().slice(0, 100);
    const cleanQuote = (quote || "").trim().slice(0, 350);
    const cleanRating = Math.min(5, Math.max(1, Math.round(Number(rating) || 5)));
    const cleanCSN = (csn || "").trim().toUpperCase();

    if (cleanAuthor.length < 3 || isGibberishText(cleanAuthor, 1)) {
      return NextResponse.json(
        { error: "Please enter your real name (e.g. Nana Kwaku Boateng)." },
        { status: 400 }
      );
    }

    if (cleanTitle.length < 3 || isGibberishText(cleanTitle, 1)) {
      return NextResponse.json(
        { error: "Please enter a valid role or organization name." },
        { status: 400 }
      );
    }

    if (cleanQuote.length < 15 || isGibberishText(cleanQuote, 3)) {
      return NextResponse.json(
        {
          error:
            "Please share a clear review of at least 3 words describing your delivery experience.",
        },
        { status: 400 }
      );
    }

    // ── Rate Limiting (counted only after validation passes) ─────────
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { success: withinLimit } = testimonialLimiter.check(ip);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute and try again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // Check if an optional CSN matches a real booking (never mark sample CSN as a real verified customer)
    let isVerified = false;
    if (
      cleanCSN &&
      cleanCSN !== "LMX-8F3K-92B4" &&
      /^[A-Z0-9-]{5,32}$/.test(cleanCSN)
    ) {
      if (getLocalConsignment(cleanCSN)) {
        isVerified = true;
      } else {
        const supabase = getSupabaseServerClient();
        if (supabase) {
          try {
            const { data: booking } = await supabase
              .from<{ id: string }>("bookings")
              .select("id")
              .eq("csn", cleanCSN)
              .single();
            if (booking?.id) {
              isVerified = true;
            }
          } catch {
            // Silent fallback: do not leak whether a CSN exists via error response
          }
        }
      }
    }

    const newItem: TestimonialItem = {
      id: `review-${Date.now()}`,
      rating: cleanRating,
      quote: cleanQuote,
      author: cleanAuthor,
      title: cleanTitle,
      verified: isVerified,
      kind: isVerified ? "verified_delivery" : "client_review",
      createdAt: new Date().toISOString(),
    };

    // Persist to Supabase when configured, and always sync to local/fallback store
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { error: insertError } = await supabase.from("testimonials").insert([
        {
          csn: isVerified ? cleanCSN : null,
          author_name: cleanAuthor,
          author_title: cleanTitle,
          rating: cleanRating,
          quote: cleanQuote,
          verified: isVerified,
          is_approved: true,
        },
      ]);

      if (insertError) {
        console.error("[Supabase Testimonials Insert Error]:", insertError);
        return NextResponse.json(
          { error: "Unable to save your review right now. Please try again." },
          { status: 500 }
        );
      }
    } else {
      saveLocalTestimonial(newItem);
    }

    return NextResponse.json({
      success: true,
      testimonial: newItem,
    });
  } catch (err) {
    console.error("[Testimonials POST Exception]:", err);
    return NextResponse.json(
      { error: "Unable to save your feedback right now. Please try again." },
      { status: 500 }
    );
  }
}
