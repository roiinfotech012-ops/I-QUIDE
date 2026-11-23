import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import {
  getPageContentBySlug,
  getSiteSettings,
  getTestimonials,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import {
  Container,
  EyebrowLabel,
  SectionHeading,
} from "@/components/ui/primitives";
import {
  FeaturedTestimonialsShowcase,
  TestimonialCollectionGrid,
} from "@/components/testimonials/testimonials-sections";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getPageContentBySlug("testimonials");
  return buildPageMetadata({
    title:
      page?.seoTitle ||
      "Community Voices & Testimonials — Perspectives That Inspire Our Journey | iGUIDE",
    description:
      page?.seoDescription ||
      "Explore experiences and perspectives shared by people and organisations connected with iGUIDE.",
    path: "/testimonials",
  });
}

export default async function TestimonialsPage() {
  const [settings, page, testimonials] = await Promise.all([
    getSiteSettings(),
    getPageContentBySlug("testimonials"),
    getTestimonials(true),
  ]);

  const sections = (page?.sectionsJson || {}) as {
    philosophyEyebrow?: string;
    philosophyHeading?: string;
    philosophyStatement?: string;
    ctaHeading?: string;
    ctaDescription?: string;
    ctaButtonLabel?: string;
    ctaButtonHref?: string;
  };

  const eyebrow = page?.eyebrow || "COMMUNITY VOICES";
  const heroTitle = page?.title || "Perspectives That Inspire Our Journey.";
  const subtitle =
    page?.subtitle ||
    "Explore experiences and perspectives shared by people and organisations connected with iGUIDE.";

  const featuredTestimonials = testimonials.filter((t) => t.isFeatured);

  return (
    <>
      {/* =====================================================================
          SECTION 1: TESTIMONIALS HERO
          Sophisticated light hero with subtle abstract quotation marks and
          calm gradient elements.
         ===================================================================== */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-lavender-soft/65 via-cloud to-white pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Calm Ambient Gradient Elements */}
        <div
          className="pointer-events-none absolute -top-24 right-1/4 h-[380px] w-[380px] rounded-full bg-iris/15 blur-[110px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-10 h-[320px] w-[320px] rounded-full bg-sky-intel/10 blur-[100px]"
          aria-hidden="true"
        />

        {/* Subtle Abstract Quotation Marks Watermark */}
        <div
          className="pointer-events-none absolute right-6 top-6 select-none font-heading text-[11rem] font-extrabold leading-none text-iris/[0.06] sm:right-16 sm:text-[16rem]"
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <div
          className="pointer-events-none absolute bottom-2 left-6 hidden select-none font-heading text-[10rem] font-extrabold leading-none text-sky-intel/[0.05] lg:block"
          aria-hidden="true"
        >
          &rdquo;
        </div>

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
            <span className="font-semibold text-iris">Testimonials</span>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex justify-center">
              <EyebrowLabel variant="light">{eyebrow}</EyebrowLabel>
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              {heroTitle.includes("Inspire Our Journey") ? (
                <>
                  Perspectives That{" "}
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    Inspire Our Journey.
                  </span>
                </>
              ) : (
                heroTitle
              )}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
              {subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 2: FEATURED TESTIMONIALS
          Oversized featured testimonial composition with contrasting background.
          Only displayed if featured testimonials actually exist.
         ===================================================================== */}
      {featuredTestimonials.length > 0 && (
        <FeaturedTestimonialsShowcase
          featuredTestimonials={featuredTestimonials}
        />
      )}

      {/* =====================================================================
          SECTION 3: TESTIMONIAL COLLECTION
          Responsive testimonial grid with white & pale-lavender cards (or
          polished empty state if no testimonials are published yet).
         ===================================================================== */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="COMMUNITY PERSPECTIVES"
            title="Voices Across Learners, Educators & Institutions."
            description="Authentic reflections and feedback managed through the iGUIDE CMS."
            align="center"
          />

          <TestimonialCollectionGrid testimonials={testimonials} />
        </Container>
      </section>

      {/* =====================================================================
          SECTION 4: BRAND PHILOSOPHY
          Short typography-driven interlude connecting authentic learner
          feedback to the organisation's human-centred mission.
         ===================================================================== */}
      <section className="border-y border-border bg-lavender-soft/40 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <EyebrowLabel>
              {sections.philosophyEyebrow || "OUR HUMAN-CENTRED PHILOSOPHY"}
            </EyebrowLabel>

            <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight text-ink sm:text-4xl lg:leading-[1.22]">
              {sections.philosophyHeading ||
                "Every Voice Shapes More Thoughtful, Adaptive Learning."}
            </h2>

            <p className="mx-auto mt-5 max-w-3xl font-heading text-lg font-medium leading-relaxed text-ink-secondary sm:text-xl">
              &ldquo;
              {sections.philosophyStatement ||
                settings.missionStatement ||
                "Leverage intelligent technology to support effective, personalised learning."}
              &rdquo;
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-secondary">
              Listening closely to the experiences of students, teachers,
              academic leaders, and training partners keeps our technology
              grounded in genuine human needs—ensuring intelligence always
              serves clarity, empathy, and purposeful growth.
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 5: CTA
          Heading: "Let's Start a Conversation About Learning."
          CTA: "Contact iGUIDE"
         ===================================================================== */}
      <section className="py-20 sm:py-28">
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
                Connect With iGUIDE
              </span>

              <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {sections.ctaHeading ||
                  "Let's Start a Conversation About Learning."}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {sections.ctaDescription ||
                  "Whether you would like to share your experience or explore how iGUIDE can support your learning community, our team would love to hear from you."}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={sections.ctaButtonHref || "/contact"}
                  className="inline-flex items-center gap-2 rounded-pill bg-iris px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-iris-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                >
                  <span>{sections.ctaButtonLabel || "Contact iGUIDE"}</span>
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
