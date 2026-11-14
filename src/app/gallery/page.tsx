import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Layers, Sparkles } from "lucide-react";
import {
  getGalleryItems,
  getPageContentBySlug,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import {
  Container,
  EyebrowLabel,
} from "@/components/ui/primitives";
import { ImageGallery } from "@/components/ui/image-gallery";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getPageContentBySlug("gallery");
  return buildPageMetadata({
    title:
      page?.seoTitle ||
      "The iGUIDE Gallery — A Glimpse into the World of Learning and Innovation",
    description:
      page?.seoDescription ||
      "Explore the iGUIDE digital gallery across Events & Activities, Educational Initiatives, Technology & Innovation, Workshops & Training, and General Gallery.",
    path: "/gallery",
  });
}

const DEFAULT_GALLERY_CATEGORIES = [
  "Events & Activities",
  "Educational Initiatives",
  "Technology & Innovation",
  "Workshops & Training",
  "General Gallery",
];

export default async function GalleryPage() {
  const [page, galleryItems] = await Promise.all([
    getPageContentBySlug("gallery"),
    getGalleryItems(true),
  ]);

  const sections = (page?.sectionsJson || {}) as {
    categories?: string[];
    closingCtaHeading?: string;
    closingCtaDescription?: string;
    closingCtaButtonLabel?: string;
    closingCtaButtonHref?: string;
  };

  const cmsCategories =
    Array.isArray(sections.categories) && sections.categories.length > 0
      ? sections.categories
      : DEFAULT_GALLERY_CATEGORIES;

  const eyebrow = page?.eyebrow || "THE iGUIDE GALLERY";
  const heroTitle =
    page?.title || "A Glimpse into the World of Learning and Innovation.";
  const subtitle =
    page?.subtitle ||
    "Explore a curated digital exhibition of educational initiatives, intelligent learning architecture studies, interactive workshop concepts, and visual innovation.";

  return (
    <>
      {/* =====================================================================
          SECTION 1: GALLERY HERO
          Eyebrow: "THE iGUIDE GALLERY"
          Heading: "A Glimpse into the World of Learning and Innovation."
          Refined editorial hero with subtle background graphics & large type.
         ===================================================================== */}
      <section className="relative overflow-hidden border-b border-white/10 bg-navy pt-12 pb-20 text-cloud sm:pt-16 sm:pb-28">
        {/* Subtle Neural & Intelligence Path Background Graphics */}
        <div
          className="pointer-events-none absolute inset-0 bg-neural-grid bg-[size:38px_38px] opacity-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-28 right-1/4 h-[440px] w-[440px] rounded-full bg-iris/25 blur-[130px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-12 h-[340px] w-[340px] rounded-full bg-sky-intel/20 blur-[120px]"
          aria-hidden="true"
        />

        {/* Decorative SVG Intelligence Path Line */}
        <svg
          viewBox="0 0 1200 220"
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-full opacity-25"
          aria-hidden="true"
        >
          <path
            d="M 0 180 C 320 160, 480 40, 780 95 C 980 130, 1090 45, 1200 30"
            stroke="#A78BFA"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-300"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight
              className="h-3.5 w-3.5 text-slate-500"
              aria-hidden="true"
            />
            <span className="font-semibold text-lavender">Gallery</span>
          </nav>

          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-5">
                <EyebrowLabel variant="dark">{eyebrow}</EyebrowLabel>
              </div>

              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                {heroTitle.includes("Learning and Innovation") ? (
                  <>
                    A Glimpse into the World of{" "}
                    <span className="text-gradient-dark">
                      Learning and Innovation.
                    </span>
                  </>
                ) : (
                  heroTitle
                )}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                {subtitle}
              </p>
            </div>

            {/* Editorial Exhibition Metadata Card */}
            <div className="lg:col-span-4">
              <div className="rounded-hero border border-white/15 bg-navy-light/85 p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-lavender">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  <span>Digital Exhibition Index</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  Browse curated plates across{" "}
                  <strong className="text-white">
                    {cmsCategories.length} categories
                  </strong>
                  . Select any visual study to open the full-screen lightbox
                  with keyboard and touch navigation.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3.5 text-[11px] text-slate-300">
                  <span>Published Visuals: {galleryItems.length}</span>
                  <span className="text-emerald-300">CMS-Managed</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTIONS 2, 3, 4 & 5:
          - Category Navigation (All, Events & Activities, Educational
            Initiatives, Technology & Innovation, Workshops & Training,
            General Gallery)
          - Responsive Editorial / Masonry Gallery Grid
          - Full-Screen Lightbox (Prev/Next, Keyboard, Escape, Focus, Swipe)
          - Functional Load More Pagination
         ===================================================================== */}
      <section className="py-20 sm:py-28">
        <Container>
          <ImageGallery
            items={galleryItems}
            cmsCategories={cmsCategories}
            initialPageSize={6}
          />
        </Container>
      </section>

      {/* =====================================================================
          SECTION 6: CLOSING CTA
          Heading: "Discover More About iGUIDE."
          Button: "Get to Know Us"
         ===================================================================== */}
      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-hero border border-border bg-navy px-6 py-16 text-cloud shadow-navy sm:px-14 sm:py-20">
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-iris/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-intel/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-lavender">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Where Human Potential Meets Intelligence
              </span>

              <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {sections.closingCtaHeading || "Discover More About iGUIDE."}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {sections.closingCtaDescription ||
                  "Explore our story, educational philosophy, and vision for adaptive, engaging, and accessible learning."}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={sections.closingCtaButtonHref || "/about"}
                  className="inline-flex items-center gap-2 rounded-pill bg-iris px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-iris-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                >
                  <span>{sections.closingCtaButtonLabel || "Get to Know Us"}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  <span>Explore Our Solutions</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
