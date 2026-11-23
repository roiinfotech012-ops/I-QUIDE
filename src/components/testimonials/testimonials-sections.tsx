"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Compass,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import type { TestimonialRecord } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import { Container, EyebrowLabel, SectionHeading } from "@/components/ui/primitives";

function StarRating({
  rating,
  theme = "light",
}: {
  rating?: number;
  theme?: "light" | "dark";
}) {
  if (!rating || rating <= 0) return null;
  const clamped = Math.min(5, Math.max(1, Math.round(rating)));

  return (
    <div
      className="inline-flex items-center gap-1"
      aria-label={`Rated ${clamped} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, idx) => (
        <Star
          key={idx}
          className={cn(
            "h-4 w-4",
            idx < clamped
              ? "fill-amber-400 text-amber-400"
              : theme === "dark"
              ? "text-white/20"
              : "text-slate-200"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/* ============================================================================
   SECTION 2: FEATURED TESTIMONIALS
   Oversized featured testimonial composition with contrasting background.
   Only rendered if featured testimonials actually exist.
   ============================================================================ */
export function FeaturedTestimonialsShowcase({
  featuredTestimonials,
}: {
  featuredTestimonials: TestimonialRecord[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!featuredTestimonials || featuredTestimonials.length === 0) {
    return null;
  }

  const current =
    featuredTestimonials[activeIndex] ?? featuredTestimonials[0];
  if (!current) return null;

  const initials = current.authorName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-hero border border-white/15 bg-navy p-8 text-cloud shadow-navy sm:p-12 lg:p-16">
          {/* Subtle Ambient Glows & Oversized Decorative Quotation Mark */}
          <div
            className="pointer-events-none absolute -top-24 right-12 h-80 w-80 rounded-full bg-iris/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-12 h-72 w-72 rounded-full bg-sky-intel/20 blur-3xl"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute right-8 top-4 select-none font-heading text-[9rem] font-extrabold leading-none text-white/[0.05] sm:text-[13rem]"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <EyebrowLabel variant="dark">
                  FEATURED COMMUNITY VOICE
                </EyebrowLabel>
                {current.category && (
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                    {current.category}
                  </span>
                )}
              </div>

              {current.rating ? (
                <StarRating rating={current.rating} theme="dark" />
              ) : null}
            </div>

            {/* Oversized Editorial Quotation Typography */}
            <blockquote className="mt-8 max-w-4xl font-heading text-2xl font-medium leading-relaxed tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-[1.28]">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Reviewer Attribution Footer */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8">
              <div className="flex items-center gap-4">
                {current.avatarUrl ? (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-navy-light">
                    <Image
                      src={current.avatarUrl}
                      alt={current.authorName}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-iris/40 bg-iris/25 font-heading text-base font-bold text-lavender">
                    {initials}
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-heading text-lg font-bold text-white">
                      {current.authorName}
                    </p>
                    {current.isVerified && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                        <CheckCircle2
                          className="h-3 w-3"
                          aria-hidden="true"
                        />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-300">
                    {current.authorRole}
                    {current.institution ? (
                      <span className="text-lavender">
                        {" "}
                        · {current.institution}
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>

              {/* Multi-Featured Switcher if > 1 featured testimonial exists */}
              {featuredTestimonials.length > 1 && (
                <div className="flex items-center gap-2">
                  {featuredTestimonials.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`View featured testimonial ${idx + 1} by ${item.authorName}`}
                      className={cn(
                        "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender",
                        activeIndex === idx
                          ? "w-8 bg-iris"
                          : "w-2.5 bg-white/25 hover:bg-white/50"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================================
   SECTION 3: TESTIMONIAL COLLECTION
   Responsive testimonial grid with white and pale-lavender cards, refined
   borders, subtle shadows, generous internal padding, optional category filter,
   and a polished empty state when no testimonials are published.
   ============================================================================ */
export function TestimonialCollectionGrid({
  testimonials,
}: {
  testimonials: TestimonialRecord[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract optional audience categories from published CMS testimonials
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const item of testimonials) {
      if (item.category && item.category.trim()) {
        set.add(item.category.trim());
      }
    }
    if (set.size <= 1) return [];
    return ["All", ...Array.from(set)];
  }, [testimonials]);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return testimonials;
    return testimonials.filter((t) => t.category === selectedCategory);
  }, [testimonials, selectedCategory]);

  // Polished Empty State when no testimonials are published in the CMS
  if (testimonials.length === 0) {
    return (
      <div className="mt-12 overflow-hidden rounded-hero border border-border bg-gradient-to-b from-lavender-soft/45 via-white to-white p-8 shadow-card sm:p-12 lg:p-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-iris/20 bg-white text-iris shadow-subtle">
            <MessageSquareQuote className="h-7 w-7" aria-hidden="true" />
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-success/25 bg-emerald-success/10 px-3.5 py-1 text-[11px] font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Commitment to Authentic Community Voices</span>
          </span>

          <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Verified Community Testimonials Appear Here as They Are Published
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
            We believe trust in education begins with honesty. Rather than
            displaying placeholder or fabricated reviews, this collection is
            connected directly to the iGUIDE CMS and displays verified
            testimonials from learners, educators, institutions, and partners as
            they are authorised for publication.
          </p>

          {/* Navigation Links to Maintain Seamless Exploration */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-pill bg-iris px-6 py-3 text-xs font-semibold text-white shadow-subtle transition hover:bg-iris-dark"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>Explore Our 6 Solutions</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-pill border border-border bg-white px-6 py-3 text-xs font-semibold text-ink shadow-subtle transition hover:border-iris hover:text-iris"
            >
              <span>Read About iGUIDE</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-pill border border-border bg-white px-6 py-3 text-xs font-semibold text-ink shadow-subtle transition hover:border-iris hover:text-iris"
            >
              <span>Share Your Feedback</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      {/* Optional Audience Category Filter when multiple categories exist */}
      {categories.length > 0 && (
        <div
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filter testimonials by audience category"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                  active
                    ? "bg-iris text-white shadow-subtle"
                    : "border border-border bg-white text-ink-secondary hover:border-iris/40 hover:text-iris"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Responsive Variable-Height Masonry / Columns Grid */}
      <div className="columns-1 gap-8 space-y-8 md:columns-2 lg:columns-3">
        {filtered.map((item, idx) => {
          const isPaleLavender = idx % 2 === 1;
          const initials = item.authorName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <article
              key={item.id}
              className={cn(
                "group break-inside-avoid rounded-hero border border-border/80 p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated sm:p-9",
                isPaleLavender ? "bg-gradient-to-br from-lavender-soft/40 to-white" : "bg-white"
              )}
            >
              {/* Top Row: Category Badge & Optional Rating */}
              <div className="flex items-center justify-between gap-3">
                {item.category ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-iris/20 bg-white/90 px-3 py-1 text-[11px] font-semibold text-iris shadow-subtle">
                    <Sparkles className="h-3 w-3 text-lavender" />
                    {item.category}
                  </span>
                ) : (
                  <span className="font-heading text-3xl font-bold leading-none text-iris/35">
                    &ldquo;
                  </span>
                )}

                {item.rating ? (
                  <StarRating rating={item.rating} theme="light" />
                ) : null}
              </div>

              {/* Quote Body */}
              <blockquote className="mt-5 text-base leading-relaxed text-ink font-medium">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Verified Stakeholder Seal */}
              <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified Educational Feedback</span>
              </div>

              {item.contextNote && (
                <p className="mt-3 text-xs italic text-ink-muted">
                  {item.contextNote}
                </p>
              )}

              {/* Reviewer Attribution */}
              <div className="mt-7 flex items-center gap-3.5 border-t border-border/80 pt-5">
                {item.avatarUrl ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-border bg-cloud">
                    <Image
                      src={item.avatarUrl}
                      alt={item.authorName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-iris/15 font-heading text-sm font-bold text-iris">
                    {initials}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate font-heading text-sm font-bold text-ink">
                      {item.authorName}
                    </p>
                    {item.isVerified && (
                      <CheckCircle2
                        className="h-3.5 w-3.5 shrink-0 text-emerald-success"
                        aria-label="Verified endorsement"
                      />
                    )}
                  </div>
                  <p className="truncate text-xs font-medium text-ink-secondary">
                    {item.authorRole}
                  </p>
                  {item.institution && (
                    <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] font-semibold text-iris">
                      <Building2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span className="truncate">{item.institution}</span>
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
