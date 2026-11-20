import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import {
  getBlogPosts,
  getPageContentBySlug,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import {
  Container,
  EyebrowLabel,
} from "@/components/ui/primitives";
import { BlogExplorer } from "@/components/ui/blog-explorer";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getPageContentBySlug("blog");
  return buildPageMetadata({
    title:
      page?.seoTitle ||
      "Insights & Ideas — Exploring What's Next in Intelligent Learning | iGUIDE",
    description:
      page?.seoDescription ||
      "Perspectives on education, artificial intelligence, meaningful engagement, and emerging learning technologies.",
    path: "/blogs",
  });
}

const DEFAULT_BLOG_CATEGORIES = [
  "Artificial Intelligence",
  "Education Technology",
  "Personalised Learning",
  "Learning Innovation",
  "Industry Insights",
  "Company Updates",
];

export default async function BlogsPage() {
  const [page, posts] = await Promise.all([
    getPageContentBySlug("blog"),
    getBlogPosts(true),
  ]);

  const sections = (page?.sectionsJson || {}) as {
    categories?: string[];
    ctaHeading?: string;
    ctaDescription?: string;
    ctaButtonLabel?: string;
    ctaButtonHref?: string;
  };

  const cmsCategories =
    Array.isArray(sections.categories) && sections.categories.length > 0
      ? sections.categories
      : DEFAULT_BLOG_CATEGORIES;

  const eyebrow = page?.eyebrow || "INSIGHTS & IDEAS";
  const heroTitle =
    page?.title || "Exploring What's Next in Intelligent Learning.";
  const subtitle =
    page?.subtitle ||
    "Perspectives on education, artificial intelligence, meaningful engagement, and emerging learning technologies.";

  return (
    <>
      {/* =====================================================================
          SECTION 1: EDITORIAL HERO
          Eyebrow: "INSIGHTS & IDEAS"
          Heading: "Exploring What's Next in Intelligent Learning."
          Description: "Perspectives on education, artificial intelligence,
          meaningful engagement, and emerging learning technologies."
          Exceptionally elegant typography with a minimal abstract background.
         ===================================================================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-lavender-soft/60 via-cloud to-white pt-12 pb-20 sm:pt-16 sm:pb-24">
        {/* Minimal Abstract Background Graphics */}
        <div
          className="pointer-events-none absolute -top-24 right-1/4 h-[380px] w-[380px] rounded-full bg-iris/10 blur-[110px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-12 h-[300px] w-[300px] rounded-full bg-sky-intel/10 blur-[100px]"
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 1200 180"
          className="pointer-events-none absolute bottom-0 left-0 h-auto w-full opacity-35"
          aria-hidden="true"
        >
          <path
            d="M 0 140 C 340 130, 520 35, 840 85 C 1020 112, 1120 40, 1200 24"
            stroke="#F0C32A"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs font-medium text-ink-secondary"
          >
            <Link href="/" className="transition hover:text-iris">
              Home
            </Link>
            <ChevronRight
              className="h-3.5 w-3.5 text-slate-400"
              aria-hidden="true"
            />
            <span className="font-semibold text-iris">Insights & Blogs</span>
          </nav>

          <div className="max-w-3xl">
            <div className="mb-5">
              <EyebrowLabel variant="light">{eyebrow}</EyebrowLabel>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              {heroTitle.includes("Intelligent Learning") ? (
                <>
                  Exploring What&apos;s Next in{" "}
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    Intelligent Learning.
                  </span>
                </>
              ) : (
                heroTitle
              )}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
              {subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTIONS 2, 3, 4 & 5:
          - Section 2: Featured Article (Editorial 60/40 Composition)
          - Section 3: Categories (CMS-Managed Filter Navigation)
          - Section 4: Latest Articles Grid
          - Section 5: Search & Pagination with URL Query Parameters
         ===================================================================== */}
      <section className="py-20 sm:py-28">
        <Container>
          <BlogExplorer posts={posts} cmsCategories={cmsCategories} />
        </Container>
      </section>

      {/* =====================================================================
          SECTION 6: CTA
          Heading: "Let's Turn Ideas into Conversations."
          Button: "Connect with iGUIDE"
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
                Editorial & Advisory Dialogue
              </span>

              <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {sections.ctaHeading ||
                  "Let's Turn Ideas into Conversations."}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {sections.ctaDescription ||
                  "Speak with the iGUIDE team about how intelligent educational technologies can support your learners, educators, and institution."}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={sections.ctaButtonHref || "/contact"}
                  className="inline-flex items-center gap-2 rounded-pill bg-iris px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-iris-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                >
                  <span>{sections.ctaButtonLabel || "Connect with iGUIDE"}</span>
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
