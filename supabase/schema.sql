-- Supabase Schema for Sri Lanka Tour Company Website
-- Tables: reviews, enquiries
-- Storage: review-images bucket

-- 1. Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,       -- never shown publicly on frontend
  customer_whatsapp TEXT NOT NULL,    -- never shown publicly on frontend
  package_name TEXT,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  image_url TEXT,                     -- nullable, from Supabase Storage bucket 'review-images'
  is_approved BOOLEAN DEFAULT TRUE,   -- set false if you want manual moderation before publishing
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  package_name TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',          -- 'new' / 'contacted' / 'closed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for reviews table
-- Public can read approved reviews with rating >= 3
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.reviews;
CREATE POLICY "Public can view approved reviews"
  ON public.reviews
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true AND rating >= 3);

-- Public can submit new reviews (or via serverless function with service_role)
DROP POLICY IF EXISTS "Public can insert reviews" ON public.reviews;
CREATE POLICY "Public can insert reviews"
  ON public.reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 5. RLS Policies for enquiries table
-- Public can submit enquiries
DROP POLICY IF EXISTS "Public can insert enquiries" ON public.enquiries;
CREATE POLICY "Public can insert enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Service role bypasses RLS automatically for admin reads/updates/deletions.

-- 6. Setup Storage Bucket for review images
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Public read access to review-images
DROP POLICY IF EXISTS "Public can read review images" ON storage.objects;
CREATE POLICY "Public can read review images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'review-images');

-- Public upload access to review-images
DROP POLICY IF EXISTS "Public can upload review images" ON storage.objects;
CREATE POLICY "Public can upload review images"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'review-images');
