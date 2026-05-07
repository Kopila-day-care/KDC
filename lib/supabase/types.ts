export interface Booking {
  id: string;
  parent_name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  notes: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface Availability {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  max_bookings: number;
}

export interface BlockedDate {
  id: string;
  blocked_date: string;
  reason: string | null;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  parent_name: string;
  quote_short: string;
  quote_full: string | null;
  rating: number;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  category: "outdoor" | "indoor" | "meals" | "activities";
  sort_order: number;
  created_at: string;
}

export interface BusinessSettings {
  id: number;
  business_name: string;
  phone: string;
  email: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  hours_json: Record<string, { open: string; close: string } | null>;
  google_maps_url: string;
  updated_at: string;
}
