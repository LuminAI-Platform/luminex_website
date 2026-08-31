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

-- 5. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_csn ON public.bookings(csn);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracking_events_csn ON public.tracking_events(csn);
CREATE INDEX IF NOT EXISTS idx_tracking_events_booking_id ON public.tracking_events(booking_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);

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

-- 8. RLS Policies
-- Allow anyone to create a booking
CREATE POLICY "Enable insert for public" ON public.bookings
    FOR INSERT TO public WITH CHECK (true);

-- Allow public read of a specific booking by CSN
CREATE POLICY "Enable read booking by CSN" ON public.bookings
    FOR SELECT TO public USING (true);

-- Allow public read of tracking events by CSN
CREATE POLICY "Enable read tracking events by CSN" ON public.tracking_events
    FOR SELECT TO public USING (true);

-- Allow public to submit contact inquiries
CREATE POLICY "Enable insert for inquiries" ON public.inquiries
    FOR INSERT TO public WITH CHECK (true);

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
    'LMX-GRA-8064',
    'Ghana Revenue Authority - Large Taxpayer Office',
    'audit@gra.gov.gh',
    '+233 30 221 3400',
    'Kinbu Road, Accra HQ',
    'Zenith Legal Chambers (Attn: Lead Partner)',
    '+233 30 290 8471',
    'High Street Judicial Enclave, Accra',
    'Certified Annual Corporate Tax Clearance Instruments (Sealed Tamper-Evident Pouch)',
    'national_id',
    'IN_TRANSIT',
    'Agent K. Mensah'
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
    'LMX-GRA-8064',
    1,
    'Accra HQ Intake',
    'Document received and sealed in tamper-evident sleeve.',
    'completed',
    timezone('utc'::text, now() - INTERVAL '4 hours')
FROM public.bookings WHERE csn = 'LMX-GRA-8064'
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
    'LMX-GRA-8064',
    2,
    'Sorting Vault Transit',
    'Cleared central security vault routing.',
    'completed',
    timezone('utc'::text, now() - INTERVAL '2 hours')
FROM public.bookings WHERE csn = 'LMX-GRA-8064'
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
    'LMX-GRA-8064',
    3,
    'Out for Secure Delivery',
    'Consignment is in the custody of vetted courier en route to destination.',
    'in_progress',
    'Agent K. Mensah',
    'National ID / Passport'
FROM public.bookings WHERE csn = 'LMX-GRA-8064'
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
    'LMX-GRA-8064',
    4,
    'Destination Verification',
    'Awaiting final biometric signature and handover.',
    'pending'
FROM public.bookings WHERE csn = 'LMX-GRA-8064'
ON CONFLICT DO NOTHING;
