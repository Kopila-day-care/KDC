"use client";

import { useState, useCallback } from "react";

interface GalleryImage {
  id: string | number;
  alt: string;
  category: string;
  src: string;
  aspect: "square" | "tall" | "wide";
  color: string;
  icon: string;
}

interface Category {
  key: string;
  label: string;
  icon: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  categories: Category[];
}

function GalleryTile({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = !imgError;

  return (
    <button
      onClick={onClick}
      className={`
        ${image.color} rounded-xl overflow-hidden
        group cursor-pointer break-inside-avoid
        hover:shadow-xl transition-all duration-300
        hover:-translate-y-1 w-full text-left relative
        ${image.aspect === "tall" ? "aspect-[3/4]" : ""}
        ${image.aspect === "wide" ? "aspect-[4/3]" : ""}
        ${image.aspect === "square" ? "aspect-square" : ""}
      `}
    >
      {/* Real photo (hidden if errored) */}
      {!imgError && (
        <img
          src={image.src}
          alt={image.alt}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}

      {/* Placeholder fallback */}
      {!hasPhoto && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
          <span className="material-symbols-outlined text-on-surface/20 text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {image.icon}
          </span>
          <p className="font-reading text-sm text-on-surface-variant/60 text-center leading-snug px-2">
            {image.alt}
          </p>
        </div>
      )}

      {/* Hover overlay (for real photos) */}
      {hasPhoto && (
        <div className="absolute inset-0 bg-on-surface/0 group-hover:bg-on-surface/20 transition-colors duration-300" />
      )}

      {/* Category pill */}
      <span className="absolute top-3 right-3 bg-surface/60 backdrop-blur-sm text-on-surface-variant text-xs font-headline font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {image.category}
      </span>

      {/* Expand icon */}
      <span className="material-symbols-outlined absolute bottom-3 right-3 text-surface drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        zoom_in
      </span>
    </button>
  );
}

export default function GalleryGrid({ images, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxError, setLightboxError] = useState(false);

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const navigateLightbox = useCallback(
    (direction: -1 | 1) => {
      if (!lightboxImage) return;
      const idx = filtered.findIndex((i) => i.id === lightboxImage.id);
      const next = filtered[(idx + direction + filtered.length) % filtered.length];
      setLightboxImage(next);
      setLightboxError(false);
    },
    [lightboxImage, filtered]
  );

  return (
    <>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          const count =
            cat.key === "all"
              ? images.length
              : images.filter((i) => i.category === cat.key).length;

          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full font-headline font-bold text-sm
                transition-all duration-300
                ${
                  isActive
                    ? "bg-primary text-on-primary shadow-lg scale-105"
                    : "bg-surface-container-high text-on-surface-variant hover:bg-primary-container hover:text-primary"
                }
              `}
            >
              <span className="material-symbols-outlined text-xl">
                {cat.icon}
              </span>
              {cat.label}
              <span
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${isActive ? "bg-on-primary/20" : "bg-surface-container text-on-surface-variant"}
                `}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo Count */}
      <p className="text-center font-reading text-on-surface-variant mb-8">
        Showing{" "}
        <span className="font-bold text-primary">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "photo" : "photos"}
        {activeCategory !== "all" && (
          <>
            {" "}
            in{" "}
            <span className="font-bold text-secondary">
              {categories.find((c) => c.key === activeCategory)?.label}
            </span>
          </>
        )}
      </p>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filtered.map((image) => (
          <GalleryTile
            key={image.id}
            image={image}
            onClick={() => {
              setLightboxImage(image);
              setLightboxError(false);
            }}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-on-surface/80 backdrop-blur-md" />

          {/* Content */}
          <div
            className="relative z-10 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-surface hover:text-soft-rose transition-colors flex items-center gap-2 font-headline font-bold"
            >
              Close
              <span className="material-symbols-outlined">close</span>
            </button>

            <div
              className={`${lightboxImage.color} rounded-xl overflow-hidden shadow-2xl`}
            >
              {/* Image or placeholder */}
              <div className="aspect-[4/3] relative flex flex-col items-center justify-center">
                {!lightboxError && (
                  <img
                    src={lightboxImage.src}
                    alt={lightboxImage.alt}
                    onError={() => setLightboxError(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {lightboxError && (
                  <div className="p-12 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface/20 text-[120px] mb-6">
                      {lightboxImage.icon}
                    </span>
                    <p className="font-display text-2xl text-primary mb-2">
                      Photo Placeholder
                    </p>
                    <p className="font-reading text-on-surface-variant text-center max-w-md">
                      {lightboxImage.alt}
                    </p>
                  </div>
                )}
              </div>

              {/* Info bar */}
              <div className="bg-surface/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-headline font-bold text-primary text-sm capitalize">
                    {lightboxImage.category}
                  </p>
                  <p className="font-reading text-on-surface-variant text-sm">
                    {lightboxImage.alt}
                  </p>
                </div>

                {/* Nav buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox(-1);
                    }}
                    className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant">
                      chevron_left
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox(1);
                    }}
                    className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
