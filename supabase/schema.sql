-- ==============================================================================
-- Luminex Logistics — Production Database Schema (Supabase PostgreSQL)
-- Description: Core schema for Bookings, Chain of Custody Timeline, and Inquiries
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Bookings (Consignments) Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    csn VARCHAR(30) UNIQUE NOT NULL,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    sender_contact TEXT NOT NULL,
    collection_address TEXT NOT NULL,
    receiver_name TEXT NOT NULL,
    receiver_contact TEXT NOT NULL,
    destination_address TEXT NOT NULL,
    description TEXT NOT NULL,
    verification_protocol VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING' CHECK (status IN (
        'PENDING',
        'CONFIRMED',
        'ASSIGNED',
        'PICKED_UP',
        'IN_TRANSIT',
        'DELIVERED',
        'CANCELLED'
    )),
    assigned_courier TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Tracking Events (Chain of Custody Audit Log)
CREATE TABLE IF NOT EXISTS public.tracking_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    csn VARCHAR(30) NOT NULL,
    step_number INT NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('completed', 'in_progress', 'pending')),
    assigned_courier TEXT,
    required_id TEXT,
    event_timestamp TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'UNREAD' CHECK (status IN ('UNREAD', 'IN_PROGRESS', 'RESOLVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Client Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    csn VARCHAR(32),
    author_name TEXT NOT NULL,
    author_title TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    quote TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_csn ON public.bookings(csn);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracking_events_csn ON public.tracking_events(csn);
CREATE INDEX IF NOT EXISTS idx_tracking_events_booking_id ON public.tracking_events(booking_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved_created ON public.testimonials(is_approved, created_at DESC);

-- 6. Updated Timestamp Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE PROCEDURE public.handle_updated_at();

-- 7. Row Level Security (RLS) Configuration
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies
-- ─── Bookings ───────────────────────────────────────────────────────
-- Service role has full access for server-side API route handlers
CREATE POLICY "Service role full access to bookings" ON public.bookings
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow booking creation via server routes; block direct public table scraping of PII
CREATE POLICY "Enable insert for public" ON public.bookings
    FOR INSERT TO public WITH CHECK (true);

-- ─── Tracking Events ────────────────────────────────────────────────
-- Allow read of non-PII tracking milestones (filtered by CSN in /api/track/[csn])
CREATE POLICY "Enable read tracking events" ON public.tracking_events
    FOR SELECT TO public USING (true);

-- Allow server routes to insert initial tracking event and service_role to manage all events
CREATE POLICY "Enable insert initial tracking event" ON public.tracking_events
    FOR INSERT TO public WITH CHECK (step_number = 1);

CREATE POLICY "Service role manages tracking events" ON public.tracking_events
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ─── Inquiries ──────────────────────────────────────────────────────
-- Allow public to submit contact inquiries; only service_role can read
CREATE POLICY "Enable insert for inquiries" ON public.inquiries
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Service role reads inquiries" ON public.inquiries
    FOR SELECT TO service_role USING (true);

-- ─── Testimonials ───────────────────────────────────────────────────
-- Allow reading approved testimonials and submitting new reviews via /api/testimonials
CREATE POLICY "Enable read approved testimonials" ON public.testimonials
    FOR SELECT TO public USING (is_approved = true);

CREATE POLICY "Enable insert for testimonials" ON public.testimonials
    FOR INSERT TO public WITH CHECK (rating >= 1 AND rating <= 5);

CREATE POLICY "Service role full access to testimonials" ON public.testimonials
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 9. Seed Baseline Consignment for Demonstration / Testing
INSERT INTO public.bookings (
    csn,
    sender_name,
    sender_email,
    sender_contact,
    collection_address,
    receiver_name,
    receiver_contact,
    destination_address,
    description,
    verification_protocol,
    status,
    assigned_courier
) VALUES (
    'LMX-8F3K-92B4',
    'Ghana Revenue Authority - Large Taxpayer Office',
    'audit@gra.gov.gh',
    '+233 30 221 3400',
    'Kinbu Road, Accra HQ',
    'Zenith Legal Chambers (Attn: Lead Partner)',
    '+233 30 290 8471',
    'High Street Judicial Enclave, Accra',
    'Certified Annual Corporate Tax Clearance Instruments',
    'national_id',
    'IN_TRANSIT',
    'Agent K.'
) ON CONFLICT (csn) DO NOTHING;

INSERT INTO public.tracking_events (
    booking_id,
    csn,
    step_number,
    title,
    description,
    status,
    event_timestamp
)
SELECT 
    id,
    'LMX-8F3K-92B4',
    1,
    'Accra HQ Intake',
    'Received at our Accra office and sealed.',
    'completed',
    timezone('utc'::text, now() - INTERVAL '4 hours')
FROM public.bookings WHERE csn = 'LMX-8F3K-92B4'
ON CONFLICT DO NOTHING;

INSERT INTO public.tracking_events (
    booking_id,
    csn,
    step_number,
    title,
    description,
    status,
    event_timestamp
)
SELECT 
    id,
    'LMX-8F3K-92B4',
    2,
    'Accra Hub Sorting',
    'Sorted at our Accra hub.',
    'completed',
    timezone('utc'::text, now() - INTERVAL '2 hours')
FROM public.bookings WHERE csn = 'LMX-8F3K-92B4'
ON CONFLICT DO NOTHING;

INSERT INTO public.tracking_events (
    booking_id,
    csn,
    step_number,
    title,
    description,
    status,
    assigned_courier,
    required_id
)
SELECT 
    id,
    'LMX-8F3K-92B4',
    3,
    'Out for Delivery',
    'With your courier, on the way.',
    'in_progress',
    'Agent K.',
    'National ID / Passport'
FROM public.bookings WHERE csn = 'LMX-8F3K-92B4'
ON CONFLICT DO NOTHING;

INSERT INTO public.tracking_events (
    booking_id,
    csn,
    step_number,
    title,
    description,
    status
)
SELECT 
    id,
    'LMX-8F3K-92B4',
    4,
    'Destination Handover',
    'Waiting for the recipient''s signature.',
    'pending'
FROM public.bookings WHERE csn = 'LMX-8F3K-92B4'
ON CONFLICT DO NOTHING;
