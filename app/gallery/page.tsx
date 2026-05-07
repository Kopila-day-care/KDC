import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic"; // Always fetch fresh gallery data

export const metadata: Metadata = {
  title: "Gallery | Kopila Day Care & Preschool",
  description:
    "Peek inside Kopila Day Care — outdoor play, creative arts, fresh meals, and the everyday moments that make our little community special.",
};

const categories = [
  { key: "all", label: "All Photos", icon: "photo_library" },
  { key: "outdoor", label: "Outdoor Play", icon: "park" },
  { key: "indoor", label: "Indoor Fun", icon: "house" },
  { key: "activities", label: "Arts & Crafts", icon: "palette" },
  { key: "meals", label: "Fresh Meals", icon: "restaurant" },
];

// Aspect pattern cycles per category for visual variety
const ASPECT_CYCLE: ("square" | "tall" | "wide")[] = ["wide", "tall", "square", "square", "tall", "wide"];

// Category-specific colors
const CATEGORY_COLORS: Record<string, string[]> = {
  outdoor: ["bg-primary-fixed", "bg-primary-container/40", "bg-tertiary-fixed", "bg-secondary-fixed"],
  indoor: ["bg-secondary-fixed", "bg-primary-fixed", "bg-tertiary-fixed", "bg-primary-container/40"],
  activities: ["bg-secondary-fixed", "bg-primary-fixed", "bg-tertiary-fixed", "bg-primary-container/40"],
  meals: ["bg-tertiary-fixed", "bg-secondary-fixed", "bg-primary-fixed", "bg-primary-container/40"],
};

// Category icons for placeholder display
const CATEGORY_ICONS: Record<string, string> = {
  outdoor: "park",
  indoor: "house",
  activities: "palette",
  meals: "restaurant",
};

export default async function GalleryPage() {
  const supabase = createServiceClient();
  const { data: dbImages } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });

  const images = (dbImages || []).map((img, i) => {
    const colors = CATEGORY_COLORS[img.category] || CATEGORY_COLORS.general;
    return {
      id: img.id,
      alt: img.alt_text || "Gallery photo",
      category: img.category,
      src: img.image_url,
      aspect: ASPECT_CYCLE[i % ASPECT_CYCLE.length],
      color: colors[i % colors.length],
      icon: CATEGORY_ICONS[img.category] || "photo_library",
    };
  });

  return (
    <>
      {/* Hero Section */}
      <header className="relative pt-32 pb-16 px-8 overflow-hidden">
        {/* Decorative icons */}
        <div className="absolute -bottom-10 -right-10 opacity-10 lg:opacity-20 transform rotate-12 pointer-events-none">
          <span className="material-symbols-outlined text-[180px] text-primary-container">
            photo_camera
          </span>
        </div>
        <div className="absolute top-24 left-8 opacity-10 lg:opacity-20 transform -rotate-6 pointer-events-none">
          <span className="material-symbols-outlined text-[120px] text-secondary">
            auto_awesome
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-handwritten text-6xl md:text-8xl font-bold text-secondary mb-4 leading-none">
              Our Gallery
            </h1>
            <p className="font-display text-primary text-3xl md:text-4xl mb-6">
              Little moments, big memories.
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border-l-8 border-secondary-container">
              <p className="font-reading text-lg text-on-surface-variant leading-relaxed">
                A peek into everyday life at Kopila — from messy art projects
                and garden adventures to cozy circle time and Indra&apos;s
                home-cooked meals. These are the moments that make our little
                community special.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="py-16 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {images.length > 0 ? (
            <GalleryGrid images={images} categories={categories} />
          ) : (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30 block mb-4">
                photo_library
              </span>
              <p className="font-display text-2xl text-primary mb-2">
                Gallery Coming Soon
              </p>
              <p className="font-reading text-on-surface-variant">
                We&apos;re adding photos of our everyday moments. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="material-symbols-outlined text-6xl text-primary-container">
            local_florist
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-primary">
            Want to See It in Person?
          </h2>
          <p className="font-reading text-lg text-on-surface-variant max-w-2xl mx-auto">
            Photos only tell part of the story. Come visit Kopila and see the
            warmth, laughter, and love that fills our space every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book-a-tour"
              className="bg-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg hover:scale-95 transition-all shadow-lg flex items-center gap-3"
            >
              Book a Tour
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-secondary-container text-secondary px-10 py-5 rounded-full font-bold text-lg hover:bg-secondary-container/20 transition-all flex items-center gap-3"
            >
              <span className="material-symbols-outlined">mail</span>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
