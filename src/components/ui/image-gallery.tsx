"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  Maximize2,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import type { GalleryItemRecord } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import { EmptyState } from "./primitives";

const DEFAULT_CMS_CATEGORIES = [
  "Events & Activities",
  "Educational Initiatives",
  "Technology & Innovation",
  "Workshops & Training",
  "General Gallery",
];

export function ImageGallery({
  items,
  cmsCategories = DEFAULT_CMS_CATEGORIES,
  initialPageSize = 6,
}: {
  items: GalleryItemRecord[];
  cmsCategories?: string[];
  initialPageSize?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(initialPageSize);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Focus restoration & touch swipe refs for Lightbox
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Merge CMS-configured categories with any custom categories used on items
  const categories = useMemo(() => {
    const merged = new Set<string>(["All"]);
    for (const cat of cmsCategories) {
      if (cat && cat.trim()) merged.add(cat.trim());
    }
    for (const item of items) {
      if (item.category && item.category.trim()) {
        merged.add(item.category.trim());
      }
    }
    return Array.from(merged);
  }, [cmsCategories, items]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  const hasMore = visibleCount < filteredItems.length;

  // Keyboard navigation, Escape to close, and scroll lock for Full-Screen Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog close button for screen-reader & keyboard users
    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setLightboxIndex(null);
        lastTriggerRef.current?.focus();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredItems.length]);

  const closeLightbox = () => {
    setLightboxIndex(null);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 20);
  };

  if (items.length === 0) {
    return (
      <EmptyState
        title="No Gallery Visuals Published Yet"
        description="The digital exhibition currently has no published visuals. Administrators can upload images, assign categories, and publish items through the iGUIDE CMS."
        actionLabel="Explore Our Solutions"
        actionHref="/solutions"
      />
    );
  }

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const getAspectClass = (aspect?: GalleryItemRecord["aspect"]) => {
    if (aspect === "portrait") return "aspect-[4/4.6]";
    if (aspect === "square") return "aspect-[4/3.6]";
    return "aspect-[16/10]";
  };

  return (
    <div>
      {/* =====================================================================
          SECTION 2: CATEGORY NAVIGATION
          Accessible, animated filter navigation driven by CMS categories
         ===================================================================== */}
      <div className="mb-12 flex flex-col justify-between gap-4 border-b border-border pb-6 lg:flex-row lg:items-center">
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter gallery exhibition by category"
        >
          {categories.map((category) => {
            const active = selectedCategory === category;
            const count =
              category === "All"
                ? items.length
                : items.filter((i) => i.category === category).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(initialPageSize);
                  setLightboxIndex(null);
                }}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                  active
                    ? "text-white"
                    : "border border-border bg-white text-ink-secondary hover:border-iris/40 hover:text-iris"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="galleryActiveCategoryPill"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-full bg-iris shadow-subtle"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{category}</span>
                <span
                  className={cn(
                    "relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    active
                      ? "bg-white/20 text-white"
                      : "bg-cloud text-slate-500"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
          <Layers className="h-4 w-4 text-iris" aria-hidden="true" />
          <span>
            Showing{" "}
            <strong className="text-ink">{visibleItems.length}</strong> of{" "}
            <strong className="text-ink">{filteredItems.length}</strong>{" "}
            curated items
          </span>
        </div>
      </div>

      {/* Category Empty State if a selected CMS category currently has 0 items */}
      {filteredItems.length === 0 ? (
        <div className="rounded-hero border border-dashed border-border bg-white/80 px-6 py-16 text-center">
          <p className="font-heading text-lg font-bold text-ink">
            No Published Items in &ldquo;{selectedCategory}&rdquo; Yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-ink-secondary">
            Select another exhibition category above or view all published
            gallery items.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white shadow-subtle transition hover:bg-iris-dark"
          >
            <span>View All Gallery Items</span>
          </button>
        </div>
      ) : (
        <>
          {/* =================================================================
              SECTION 3: GALLERY GRID
              Responsive editorial & masonry-inspired exhibition grid with
              mixed aspect ratios, subtle hover zoom, titles, and captions
             ================================================================= */}
          <motion.div
            layout={!prefersReducedMotion}
            className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, idx) => (
                <motion.figure
                  key={item.id}
                  layout={!prefersReducedMotion}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 18 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }
                  }
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group relative flex flex-col overflow-hidden rounded-hero border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated"
                >
                  {/* Mixed Aspect Image Frame */}
                  <div
                    className={cn(
                      "relative w-full overflow-hidden bg-navy",
                      getAspectClass(item.aspect)
                    )}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.altText || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Full-Screen Lightbox Trigger Overlay */}
                    <button
                      type="button"
                      onClick={(e) => {
                        lastTriggerRef.current = e.currentTarget;
                        setLightboxIndex(idx);
                      }}
                      aria-label={`Open "${item.title}" in full-screen lightbox`}
                      className="absolute inset-0 flex items-center justify-center bg-navy/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-iris"
                    >
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-ink shadow-elevated transition-transform duration-200 group-hover:scale-100">
                        <Maximize2
                          className="h-3.5 w-3.5 text-iris"
                          aria-hidden="true"
                        />
                        <span>View in Exhibition Lightbox</span>
                      </span>
                    </button>

                    {/* Top Badges: Category & Optional Featured Status */}
                    <div className="pointer-events-none absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-white/15 bg-navy/85 px-3 py-1 text-[11px] font-semibold text-lavender backdrop-blur-md">
                        {item.category}
                      </span>
                      {item.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-iris/40 bg-iris/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-subtle backdrop-blur-md">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Editorial Caption Block */}
                  <figcaption className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                        <span>Plate 0{idx + 1}</span>
                        <span className="capitalize">{item.aspect} format</span>
                      </div>

                      <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-ink transition-colors group-hover:text-iris">
                        {item.title}
                      </h3>

                      {item.caption && (
                        <p className="mt-2.5 text-xs leading-relaxed text-ink-secondary">
                          {item.caption}
                        </p>
                      )}
                    </div>

                    {item.location && (
                      <div className="mt-5 flex items-center justify-between border-t border-border pt-3.5 text-[11px] text-ink-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin
                            className="h-3.5 w-3.5 text-iris"
                            aria-hidden="true"
                          />
                          <span>{item.location}</span>
                        </span>
                        <span className="font-semibold text-iris opacity-0 transition-opacity group-hover:opacity-100">
                          Inspect →
                        </span>
                      </div>
                    )}
                  </figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* =================================================================
              SECTION 5: LOAD MORE
              Smooth progressive loading without layout shifts
             ================================================================= */}
          <div className="mt-14 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between text-xs font-medium text-ink-secondary">
                <span>Exhibition Progress</span>
                <span>
                  {visibleItems.length} / {filteredItems.length} viewed
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ice">
                <div
                  className="h-full rounded-full bg-brand-gradient transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round(
                        (visibleItems.length /
                          Math.max(1, filteredItems.length)) *
                          100
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>

            {hasMore ? (
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(filteredItems.length, prev + initialPageSize)
                  )
                }
                className="mt-6 inline-flex items-center gap-2 rounded-pill border border-border bg-white px-7 py-3.5 text-xs font-semibold text-ink shadow-subtle transition hover:-translate-y-0.5 hover:border-iris hover:text-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
              >
                <Plus className="h-4 w-4 text-iris" aria-hidden="true" />
                <span>
                  Load More Visuals (
                  {filteredItems.length - visibleItems.length} remaining)
                </span>
              </button>
            ) : (
              filteredItems.length > initialPageSize && (
                <button
                  type="button"
                  onClick={() => setVisibleCount(initialPageSize)}
                  className="mt-6 inline-flex items-center gap-2 rounded-pill border border-border bg-white px-6 py-2.5 text-xs font-semibold text-ink-secondary transition hover:border-iris hover:text-iris"
                >
                  <span>Show Initial View</span>
                </button>
              )
            )}
          </div>
        </>
      )}

      {/* =====================================================================
          SECTION 4: FULL-SCREEN LIGHTBOX
          Enlarged image, title, caption, prev/next navigation, keyboard
          navigation, Escape to close, focus management, mobile swipe, and
          image counter.
         ===================================================================== */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery Lightbox: ${activeLightboxItem.title}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          onTouchStart={(e) => {
            touchStartXRef.current = e.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current === null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
            const deltaX = endX - touchStartXRef.current;
            touchStartXRef.current = null;
            if (Math.abs(deltaX) > 48) {
              if (deltaX < 0) {
                setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
              } else {
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredItems.length) %
                    filteredItems.length
                );
              }
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-3 backdrop-blur-xl sm:p-6 lg:p-10"
        >
          <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-hero border border-white/15 bg-navy-light text-cloud shadow-navy">
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-iris/40 bg-iris/25 px-3 py-1 font-heading text-xs font-bold text-lavender">
                  {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                  {String(filteredItems.length).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-300">
                  {activeLightboxItem.category}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                aria-label="Close full-screen lightbox (Escape)"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
              >
                <span>Close</span>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Central Enlarged Image Stage */}
            <div className="relative aspect-[16/9] min-h-[260px] w-full flex-1 bg-navy sm:min-h-[380px]">
              <Image
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.altText || activeLightboxItem.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-contain p-3 sm:p-6"
              />

              {/* Floating Prev / Next Controls on Desktop & Tablet */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredItems.length) %
                          filteredItems.length
                      )
                    }
                    aria-label="Previous image (Left Arrow)"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-navy/85 p-3 text-white shadow-elevated backdrop-blur-md transition hover:border-lavender hover:bg-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender sm:left-5"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex + 1) % filteredItems.length
                      )
                    }
                    aria-label="Next image (Right Arrow)"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-navy/85 p-3 text-white shadow-elevated backdrop-blur-md transition hover:border-lavender hover:bg-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender sm:right-5"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption, Metadata & Counter Bar */}
            <div className="flex flex-col justify-between gap-4 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:px-7">
              <div className="max-w-2xl">
                <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                  {activeLightboxItem.title}
                </h3>
                {activeLightboxItem.caption && (
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    {activeLightboxItem.caption}
                  </p>
                )}
                {activeLightboxItem.location && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-lavender">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{activeLightboxItem.location}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <span className="text-[11px] text-slate-400">
                  Swipe or use ← → keys
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredItems.length) %
                          filteredItems.length
                      )
                    }
                    aria-label="Previous image"
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex + 1) % filteredItems.length
                      )
                    }
                    aria-label="Next image"
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
