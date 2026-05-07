"use client";

import { useState } from "react";
import type { Testimonial } from "@/app/testimonials/page";

interface TestimonialsListProps {
  testimonials: Testimonial[];
}

const sourceLabels: Record<string, string> = {
  yelp: "Yelp",
  google: "Google",
  "care.com": "Care.com",
};

const sourceColors: Record<string, string> = {
  yelp: "bg-[#d32323]",
  google: "bg-[#4285f4]",
  "care.com": "bg-[#6b3fa0]",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`material-symbols-outlined text-lg ${
            s <= rating ? "text-tertiary" : "text-surface-container-high"
          }`}
          style={{
            fontVariationSettings: s <= rating ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          star
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = testimonial.text.length > 200;
  const displayText =
    isLong && !expanded ? testimonial.text.slice(0, 200) + "..." : testimonial.text;

  return (
    <div
      className={`
        bg-surface-container-low rounded-xl p-8 relative
        transition-all duration-300 hover:shadow-lg
        ${testimonial.featured ? "border-l-8 border-secondary-container" : ""}
      `}
    >
      {/* Quote mark */}
      <span className="material-symbols-outlined text-6xl text-primary-container/40 absolute -top-2 left-4 pointer-events-none">
        format_quote
      </span>

      <div className="relative z-10">
        {/* Header: stars + date */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={testimonial.rating} />
          <span className="text-sm text-on-surface-variant/60 font-reading">
            {testimonial.date}
          </span>
        </div>

        {/* Review text */}
        <p className="font-reading text-on-surface leading-relaxed mb-4">
          &ldquo;{displayText}&rdquo;
        </p>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-primary font-bold hover:underline mb-4"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {/* Footer: name + source */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
          <div className="flex items-center gap-3">
            {/* Avatar circle with initial */}
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
              <span className="font-display text-lg text-primary">
                {testimonial.name.charAt(0)}
              </span>
            </div>
            <span className="font-headline font-bold text-on-surface">
              {testimonial.name}
            </span>
          </div>

          <a
            href={testimonial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${sourceColors[testimonial.source]} text-white
              text-xs font-bold px-3 py-1.5 rounded-full
              flex items-center gap-1
              hover:scale-95 transition-transform
            `}
          >
            {sourceLabels[testimonial.source]}
            <span className="material-symbols-outlined text-xs">
              open_in_new
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsList({
  testimonials,
}: TestimonialsListProps) {
  const [showAll, setShowAll] = useState(false);

  // Show featured first, then the rest
  const sorted = [...testimonials].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const displayed = showAll ? sorted : sorted.slice(0, 6);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayed.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>

      {!showAll && sorted.length > 6 && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(true)}
            className="border-2 border-primary text-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-95 transition-all flex items-center gap-3 mx-auto"
          >
            Show All {sorted.length} Reviews
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      )}
    </div>
  );
}
