-- ============================================
-- Kopila Childcare Database Schema
-- ============================================

-- 1. BOOKINGS — Tour booking requests from parents
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. AVAILABILITY — Defines which time slots are bookable
CREATE TABLE availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL
    CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  max_bookings INTEGER DEFAULT 1
);

-- 3. BLOCKED_DATES — Holidays or days the owner marks unavailable
CREATE TABLE blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT
);

-- 4. INQUIRIES — Contact form submissions
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. TESTIMONIALS — Parent testimonials (admin-managed)
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_name TEXT NOT NULL,
  quote_short TEXT NOT NULL,
  quote_full TEXT,
  rating INTEGER DEFAULT 5
    CHECK (rating BETWEEN 1 AND 5),
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. TEAM_MEMBERS — Staff profiles (admin-managed)
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. BLOG_POSTS — Weekly blog / newsletter posts (admin-managed)
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. GALLERY_IMAGES — Photo gallery (admin-managed)
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  category TEXT DEFAULT 'general'
    CHECK (category IN ('general', 'outdoor', 'indoor', 'meals', 'activities')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. MAILING_LIST — Email signups
CREATE TABLE mailing_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- 10. BUSINESS_SETTINGS — Editable business info (singleton)
CREATE TABLE business_settings (
  id INTEGER DEFAULT 1 PRIMARY KEY CHECK (id = 1),
  business_name TEXT DEFAULT 'Kopila Childcare and Preschool',
  phone TEXT DEFAULT '(510) 282-6653',
  email TEXT DEFAULT '',
  address_street TEXT DEFAULT '17040 Esteban St',
  address_city TEXT DEFAULT 'Hayward',
  address_state TEXT DEFAULT 'CA',
  address_zip TEXT DEFAULT '94541',
  hours_json JSONB DEFAULT '{
    "monday": {"open": "7:30 AM", "close": "5:30 PM"},
    "tuesday": {"open": "7:30 AM", "close": "5:30 PM"},
    "wednesday": {"open": "7:30 AM", "close": "5:30 PM"},
    "thursday": {"open": "7:30 AM", "close": "5:30 PM"},
    "friday": {"open": "7:30 AM", "close": "5:30 PM"},
    "saturday": null,
    "sunday": null
  }',
  google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=17040+Esteban+St+Hayward+CA+94541',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default business settings row
INSERT INTO business_settings (id) VALUES (1);

-- Default availability: Mon-Fri, 30-min tour slots from 9AM-4PM
INSERT INTO availability (day_of_week, start_time, end_time) VALUES
  (1, '09:00', '09:30'), (1, '09:30', '10:00'), (1, '10:00', '10:30'),
  (1, '10:30', '11:00'), (1, '14:00', '14:30'), (1, '14:30', '15:00'),
  (1, '15:00', '15:30'), (1, '15:30', '16:00'),
  (2, '09:00', '09:30'), (2, '09:30', '10:00'), (2, '10:00', '10:30'),
  (2, '10:30', '11:00'), (2, '14:00', '14:30'), (2, '14:30', '15:00'),
  (2, '15:00', '15:30'), (2, '15:30', '16:00'),
  (3, '09:00', '09:30'), (3, '09:30', '10:00'), (3, '10:00', '10:30'),
  (3, '10:30', '11:00'), (3, '14:00', '14:30'), (3, '14:30', '15:00'),
  (3, '15:00', '15:30'), (3, '15:30', '16:00'),
  (4, '09:00', '09:30'), (4, '09:30', '10:00'), (4, '10:00', '10:30'),
  (4, '10:30', '11:00'), (4, '14:00', '14:30'), (4, '14:30', '15:00'),
  (4, '15:00', '15:30'), (4, '15:30', '16:00'),
  (5, '09:00', '09:30'), (5, '09:30', '10:00'), (5, '10:00', '10:30'),
  (5, '10:30', '11:00'), (5, '14:00', '14:30'), (5, '14:30', '15:00'),
  (5, '15:00', '15:30'), (5, '15:30', '16:00');

-- Default team members
INSERT INTO team_members (name, role, bio, sort_order) VALUES
  ('Basanti M.', 'Owner + Lead Teacher',
   'With over 15 years of experience including work with children with special needs, Basanti (Ms. B) forms natural bonds with every child. Her warmth, patience, and dedication to early childhood development make Kopila feel like a second home.',
   1),
  ('Indra', 'Co-Caregiver & Chef',
   'A warm, steady presence, Indra prepares healthy home-cooked meals daily — breakfast and lunch — and helps create a nurturing, family-like atmosphere where both children and parents feel welcomed and cared for.',
   2);

-- Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE mailing_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- Public read access for front-facing content
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read team members" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public can read business settings" ON business_settings FOR SELECT USING (true);
CREATE POLICY "Public can read availability" ON availability FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read blocked dates" ON blocked_dates FOR SELECT USING (true);

-- Public write access for submissions
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert mailing list" ON mailing_list FOR INSERT WITH CHECK (true);

-- Service role (admin API routes) gets full access via SUPABASE_SERVICE_ROLE_KEY
-- No additional policies needed — service role bypasses RLS
