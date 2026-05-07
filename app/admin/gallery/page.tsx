"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/supabase/types";

const CATEGORIES = ["outdoor", "indoor", "meals", "activities"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_META: Record<Category, { icon: string; label: string }> = {
  outdoor: { icon: "park", label: "Outdoor" },
  indoor: { icon: "house", label: "Indoor" },
  meals: { icon: "restaurant", label: "Meals" },
  activities: { icon: "palette", label: "Activities" },
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<Category | null>(null);
  const [activeTab, setActiveTab] = useState<Category | "all">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState("");
  const [editCategory, setEditCategory] = useState<string>("general");
  const fileInputRefs = useRef<Record<Category, HTMLInputElement | null>>(
    {} as Record<Category, HTMLInputElement | null>
  );

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const uploadFiles = async (files: FileList | File[], category: Category) => {
    setUploading(category);
    const fileArray = Array.from(files);

    for (const file of fileArray) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          alert(`Failed to upload ${file.name}: ${uploadData.message}`);
          continue;
        }

        const galleryRes = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: uploadData.url,
            alt_text: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
            category,
          }),
        });
        const galleryData = await galleryRes.json();

        if (galleryData.success) {
          setImages((prev) => [...prev, galleryData.image]);
        }
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err);
      }
    }

    setUploading(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, category: Category) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files, category);
      e.target.value = "";
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  const startEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setEditAlt(image.alt_text || "");
    setEditCategory(image.category);
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alt_text: editAlt, category: editCategory }),
      });
      const data = await res.json();
      if (data.success) {
        setImages((prev) =>
          prev.map((img) => (img.id === id ? data.image : img))
        );
      }
    } catch (err) {
      console.error("Failed to update image:", err);
    }
    setEditingId(null);
  };

  const filteredImages =
    activeTab === "all" ? images : images.filter((img) => img.category === activeTab);

  return (
    <div>
      <h1 className="text-2xl font-headline font-bold text-on-surface mb-6">
        Gallery
      </h1>

      {/* Category upload buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          const count = images.filter((img) => img.category === cat).length;
          const isUploading = uploading === cat;

          return (
            <div key={cat} className="relative">
              <input
                ref={(el) => { fileInputRefs.current[cat] = el; }}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                multiple
                onChange={(e) => handleFileSelect(e, cat)}
                className="hidden"
              />
              <button
                onClick={() => fileInputRefs.current[cat]?.click()}
                disabled={isUploading}
                className="w-full bg-surface border border-outline-variant rounded-2xl p-4 hover:border-primary hover:bg-surface-container-low transition-colors text-left group disabled:opacity-60"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                    {meta.icon}
                  </span>
                  <span className="text-xs text-on-surface-variant bg-surface-container rounded-full px-2 py-0.5">
                    {count}
                  </span>
                </div>
                <div className="text-sm font-medium text-on-surface">{meta.label}</div>
                <div className="flex items-center gap-1 mt-1">
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border border-primary border-t-transparent" />
                      <span className="text-[10px] text-primary">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[14px] text-on-surface-variant/50 group-hover:text-primary transition-colors">
                        add_photo_alternate
                      </span>
                      <span className="text-[10px] text-on-surface-variant/50 group-hover:text-primary transition-colors">
                        Upload
                      </span>
                    </>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Filter tabs */}
      <div className="flex bg-surface-container rounded-xl p-1 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${
            activeTab === "all"
              ? "bg-surface text-on-surface font-medium shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          All ({images.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = images.filter((img) => img.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${
                activeTab === cat
                  ? "bg-surface text-on-surface font-medium shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {CATEGORY_META[cat].label} ({count})
            </button>
          );
        })}
      </div>

      {/* Image grid */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-outline-variant p-12 text-center">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40 block mb-2">
            photo_library
          </span>
          <p className="text-on-surface-variant">
            {activeTab === "all"
              ? "No gallery images yet"
              : `No ${CATEGORY_META[activeTab as Category].label.toLowerCase()} photos yet`}
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Use the upload buttons above to add photos
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-surface rounded-2xl border border-outline-variant overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={image.image_url}
                  alt={image.alt_text || "Gallery image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => startEdit(image)}
                    className="p-2 bg-surface/90 rounded-lg hover:bg-surface transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[18px] text-on-surface">edit</span>
                  </button>
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="p-2 bg-surface/90 rounded-lg hover:bg-error-container transition-colors"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-[18px] text-error">delete</span>
                  </button>
                </div>
              </div>

              {/* Info / Edit panel */}
              {editingId === image.id ? (
                <div className="p-3 space-y-2">
                  <input
                    type="text"
                    value={editAlt}
                    onChange={(e) => setEditAlt(e.target.value)}
                    placeholder="Alt text"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(image.id)}
                      className="flex-1 text-xs py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 text-xs py-1.5 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-3 py-2">
                  <div className="text-xs text-on-surface truncate">
                    {image.alt_text || "No alt text"}
                  </div>
                  <div className="text-[10px] text-on-surface-variant capitalize">
                    {image.category}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
