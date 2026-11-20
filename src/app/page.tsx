import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calendar,
  Check,
  Compass,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Waypoints,
} from "lucide-react";
import {
  getBlogPosts,
  getGalleryItems,
  getHeroBanners,
  getPageContentBySlug,
  getSiteSettings,
  getSolutions,
  getTestimonials,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { cn, formatDate } from "@/lib/utils";
import {
  Container,
  DynamicIcon,
  EyebrowLabel,
  GradientText,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
} from "@/components/ui/primitives";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import {
  HomeGalleryCollage,
  LearningJourneySection,
  WhyChooseIguideSection,
} from "@/components/home/homepage-sections";
import { ScrollZoomReviewsSection } from "@/components/home/scroll-zoom-reviews";
import { CurvedDomainsCarousel } from "@/components/home/curved-domains-carousel";

export async function generateMetadata() {
  const page = await getPageContentBySlug("home");
  return buildPageMetadata({
    title:
      page?.seoTitle ||
      "iGUIDE | Every Mind Learns Differently. Intelligence Makes It Possible.",
    description: page?.seoDescription,
    path: "/",
  });
}

const SOLUTION_GENERATED_IMAGES = [
  "/images/solution-personalised-learning.jpg",
  "/images/solution-ai-tutors.jpg",
  "/images/solution-skill-assessment.jpg",
  "/images/solution-gamified-learning.jpg",
  "/images/solution-learning-analytics.jpg",
  "/images/solution-institutional-solutions.jpg",
];

export default async function HomePage() {
  const [
    settings,
    banners,
    homePage,
    solutions,
    galleryItems,
    testimonials,
    blogs,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroBanners("home"),
    getPageContentBySlug("home"),
    getSolutions(true),
    getGalleryItems(true),
    getTestimonials(true),
    getBlogPosts(true),
  ]);

  const hero = banners.find((b) => b.published) || {
    eyebrow: "THE FUTURE OF INTELLIGENT LEARNING",
    headline: "Every Mind Learns Differently.",
    highlightedText: "Intelligence Makes It Possible.",
    subheadline:
      "Discover a more adaptive, engaging, and human-centred approach to education—powered by intelligent technology.",
    primaryCtaLabel: "Explore Our Solutions",
    primaryCtaHref: "/solutions",
    secondaryCtaLabel: "Discover iGUIDE",
    secondaryCtaHref: "/about",
    visualCaption:
      "Conceptual Intelligence Path ecosystem — illustrating connected learning nodes and adaptive progression.",
  };

  const sections = (homePage?.sectionsJson || {}) as {
    welcomeLabel?: string;
    welcomeHeading?: string;
    welcomeParagraph1?: string;
    welcomeParagraph2?: string;
    welcomeCtaLabel?: string;
    welcomeCtaHref?: string;
    welcomeDecorativeText?: string;
    visionEyebrow?: string;
    visionStatement?: string;
    solutionsHeading?: string;
    solutionsDescription?: string;
    optionalFutureOffering?: {
      enabled?: boolean;
      badge?: string;
      title?: string;
      description?: string;
      href?: string;
    };
    whyChooseHeading?: string;
    journeyHeading?: string;
    galleryHeading?: string;
    testimonialsHeading?: string;
    insightsHeading?: string;
    signatureCtaHeading?: string;
    signatureCtaDescription?: string;
  };

  const latestBlogs = blogs.slice(0, 3);
  const leadBlog = latestBlogs[0];
  const secondaryBlogs = latestBlogs.slice(1, 3);

  // Asymmetric Bento spans for the 6 primary solution cards
  const bentoSpans = [
    "md:col-span-6 lg:col-span-7",
    "md:col-span-6 lg:col-span-5",
    "md:col-span-6 lg:col-span-4",
    "md:col-span-6 lg:col-span-4",
    "md:col-span-6 lg:col-span-4",
    "md:col-span-12 lg:col-span-12",
  ];

  return (
    <>
      {/* =====================================================================
          SECTION 1: CLEAN EDITORIAL HERO BANNER
          Reference-matched airy left composition + vivid right-anchored Indian students photo + single sleek right-docked benefit card
      ====================================================================== */}
      <section className="relative overflow-hidden bg-[#F7FAFF] pt-32 pb-20 sm:pt-36 sm:pb-24 lg:min-h-[650px] lg:pt-36 lg:pb-24">
        {/* Vivid sunlit Indian campus photograph anchored cleanly on the right with smooth left-edge feather mask */}
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden md:block"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 34%, rgba(0,0,0,0.45) 43%, black 52%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 34%, rgba(0,0,0,0.45) 43%, black 52%)",
          }}
        >
          <Image
            src="/images/hero-indian-students.jpg"
            alt="Indian university students collaborating outdoors on a sunlit campus with a laptop"
            fill
            priority
            unoptimized
            quality={100}
            sizes="100vw"
            className="object-cover object-[center_28%]"
          />
        </div>

        <Container className="relative z-10">
          <div className="grid items-center gap-8 md:grid-cols-12">
            {/* LEFT COLUMN: Clean Crisp Headline, Royal Blue Accent, Buttons & Trust Strip */}
            <div className="md:col-span-6 lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-iris/15 bg-iris-light/90 px-3.5 py-1.5 text-[11px] font-bold text-iris shadow-subtle">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span># AI-Powered Platform for Indian Education</span>
              </div>

              <h1 className="mt-5 font-heading text-4xl font-extrabold tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
                Every Mind Learns.
                <span className="mt-1 block text-iris">
                  Intelligence Makes It Possible.
                </span>
              </h1>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-secondary sm:text-base">
                Adaptive, human-centred AI education designed for Indian schools, colleges, and universities—helping every learner progress at their own pace.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  href={hero.primaryCtaHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-iris px-6 py-3.5 text-sm font-bold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:bg-iris-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white/95 px-5 py-3.5 text-sm font-bold text-navy shadow-subtle transition-all duration-200 hover:-translate-y-0.5 hover:border-iris hover:text-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
                >
                  <PlayCircle className="h-4 w-4 text-iris" aria-hidden="true" />
                  <span>How It Works</span>
                </Link>
              </div>

              {/* Clean Institutional Trust Line */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#1E4883", "#2B64B0", "#F0C32A", "#16A085"].map((bg, i) => (
                    <span
                      key={bg}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow-subtle"
                      style={{ backgroundColor: bg }}
                    >
                      {["IN", "ED", "AI", "IG"][i]}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-gold text-xs" aria-label="Quality focus">
                    <span>★★★★★</span>
                  </div>
                  <p className="text-[11px] font-semibold text-ink-secondary">
                    Built in Bengaluru for Indian Schools &amp; Universities
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile-only crisp full-color HD photo card */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border shadow-elevated md:hidden">
              <Image
                src="/images/hero-indian-students.jpg"
                alt="Indian university students collaborating outdoors on a sunlit campus with a laptop"
                fill
                priority
                unoptimized
                quality={100}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            {/* RIGHT COLUMN: Open unobstructed viewport for the full HD Indian students hero visual */}
            <div className="hidden md:col-span-6 md:block md:min-h-[420px] lg:col-span-7" aria-hidden="true" />
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 2: 3D CURVED MOVING CORE LEARNING DOMAINS CAROUSEL
          Groww-inspired concave cylindrical perspective marquee with pastel domain cards
      ====================================================================== */}
      <CurvedDomainsCarousel solutions={solutions} />

      {/* =====================================================================
          SECTION 3: FEATURED SOLUTIONS SHOWCASE + DARK NAVY METRICS BAR
          Soft blue-tinted rounded container housing uniform high-res solution cards + dark maritime navy stats strip
      ====================================================================== */}
      <section className="py-10 sm:py-14">
        <Container>
          <div className="rounded-[36px] border border-border/70 bg-[#EEF4FC]/85 p-6 sm:p-10 lg:p-12">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-iris">
                  FEATURED CAPABILITIES
                </p>
                <h2 className="mt-1.5 font-heading text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                  {sections.solutionsHeading ||
                    "Intelligent Learning Solutions"}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-ink-secondary">
                  {sections.solutionsDescription ||
                    "Six connected AI capabilities thoughtfully built for learners, educators, and Indian academic institutions."}
                </p>
              </div>
              <Link
                href="/solutions"
                className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-iris transition hover:text-navy"
              >
                <span>View All 6 Solutions</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Clean Uniform 3-Column Solution Cards Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {solutions.slice(0, 6).map((sol, idx) => {
                const imageSrc =
                  SOLUTION_GENERATED_IMAGES[idx] ||
                  "/images/solution-personalised-learning.jpg";
                return (
                  <article
                    key={sol.id}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-iris/40 hover:shadow-elevated"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy">
                      <Image
                        src={imageSrc}
                        alt={sol.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-3.5 top-3.5 rounded-full bg-navy/85 px-3 py-1 text-[10px] font-bold text-gold backdrop-blur-md">
                        0{idx + 1} · {sol.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div>
                        <h3 className="font-heading text-lg font-extrabold tracking-tight text-navy transition-colors group-hover:text-iris">
                          <Link
                            href={`/solutions/${sol.slug}`}
                            className="focus-visible:outline-none"
                          >
                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                            {sol.shortTitle || sol.title}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-secondary sm:text-sm">
                          {sol.summary}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3.5 text-xs font-bold text-iris">
                        <span>Explore Capability</span>
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Sleek Dark Maritime Navy Rounded Metrics Bar (Exact Reference Style) */}
            <div className="mt-10 rounded-3xl bg-navy px-6 py-7 text-white shadow-navy sm:px-10">
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {[
                  {
                    icon: Compass,
                    value: "6 Core",
                    label: "Connected AI Solutions",
                  },
                  {
                    icon: ShieldCheck,
                    value: "99.98%",
                    label: "Platform Reliability",
                  },
                  {
                    icon: GraduationCap,
                    value: "42+",
                    label: "Academic Frameworks",
                  },
                  {
                    icon: Users,
                    value: "100%",
                    label: "Educator Governance",
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-gold">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-heading text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                          {stat.value}
                        </p>
                        <p className="text-[11px] font-medium text-slate-300">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 4: "LEARN ON YOUR TERMS" MULTI-DEVICE PLATFORM SHOWCASE
          Reference-matched left editorial checklist + right overlapping Phone / Laptop / Tablet UI preview
      ====================================================================== */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="overflow-hidden rounded-[36px] border border-border/80 bg-gradient-to-br from-[#F7FAFF] via-white to-[#EEF4FC] px-6 py-12 shadow-card sm:px-12 lg:py-16">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              {/* Left 5 Columns: Narrative & Checkmarks */}
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-iris">
                  LEARN ANYTIME, ANYWHERE
                </p>
                <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                  Learn on Your Terms.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
                  Whether learners are on a laptop in the campus library, a tablet in class, or a smartphone at home, the iGUIDE Intelligence Path stays seamlessly in sync.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "Seamless access across desktop, tablet & mobile",
                    "Adaptive pathways that remember every concept",
                    "Real-time comprehension insights for educators",
                  ].map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-3 text-sm font-semibold text-navy"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-iris-light text-iris">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-xl bg-iris px-6 py-3.5 text-sm font-bold text-white shadow-elevated transition-all hover:-translate-y-0.5 hover:bg-iris-hover"
                  >
                    <span>Start Exploring Today</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              {/* Right 7 Columns: Overlapping Laptop + Smartphone + Tablet Mastery Showcase */}
              <div className="relative mx-auto w-full max-w-[660px] lg:col-span-7">
                {/* Center Laptop Frame */}
                <div className="mx-auto w-[92%] overflow-hidden rounded-2xl border-[6px] border-navy bg-white shadow-elevated sm:w-[82%]">
                  <div className="flex items-center justify-between border-b border-border bg-cloud px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="rounded-full bg-white px-3 py-0.5 text-[10px] font-semibold text-ink-muted border border-border">
                      app.iguide.edu.in · Learner Dashboard
                    </span>
                    <span className="h-5 w-5 rounded-full bg-iris text-[9px] font-bold text-white flex items-center justify-center">
                      IG
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="font-heading text-sm font-extrabold text-navy">
                      Welcome back — Continue your Intelligence Path
                    </p>
                    <p className="text-[11px] text-ink-secondary">
                      Personalised pathway synced with your classroom curriculum
                    </p>

                    <div className="mt-4 grid grid-cols-12 gap-4">
                      {/* Progress Ring Card */}
                      <div className="col-span-5 flex flex-col items-center justify-center rounded-2xl border border-border bg-cloud/70 p-4">
                        <div className="relative flex h-20 w-20 items-center justify-center">
                          <svg viewBox="0 0 64 64" className="h-20 w-20 -rotate-90">
                            <circle
                              cx="32"
                              cy="32"
                              r="25"
                              fill="none"
                              stroke="#DCE5F2"
                              strokeWidth="6"
                            />
                            <circle
                              cx="32"
                              cy="32"
                              r="25"
                              fill="none"
                              stroke="#1E4883"
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray="157"
                              strokeDashoffset="34.5"
                            />
                          </svg>
                          <span className="absolute font-heading text-base font-extrabold text-navy">
                            78%
                          </span>
                        </div>
                        <p className="mt-2 text-[10px] font-bold text-iris">
                          Concept Mastery
                        </p>
                      </div>

                      {/* Active Module Card */}
                      <div className="col-span-7 flex flex-col justify-between rounded-2xl border border-border bg-white p-4 shadow-subtle">
                        <div>
                          <span className="rounded-full bg-gold-light px-2.5 py-0.5 text-[9px] font-bold text-navy">
                            Active Module
                          </span>
                          <p className="mt-2 font-heading text-xs font-extrabold text-navy">
                            Adaptive Analytical Reasoning
                          </p>
                          <p className="mt-1 text-[10px] text-ink-secondary">
                            Socratic AI Tutor ready · Next checkpoint unlocked
                          </p>
                        </div>
                        <div className="mt-3 rounded-lg bg-iris py-1.5 text-center text-[10px] font-bold text-white">
                          Continue Learning →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Overlapping Mobile Phone Mockup */}
                <div className="hidden sm:block absolute -bottom-4 left-0 w-[145px] overflow-hidden rounded-[22px] border-[5px] border-navy bg-white p-3 shadow-elevated">
                  <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-border" />
                  <p className="text-[10px] font-extrabold text-navy">
                    iGUIDE Mobile
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    <div className="rounded-lg bg-iris-light p-2 text-center text-[9px] font-bold text-iris">
                      Paths
                    </div>
                    <div className="rounded-lg bg-gold-light p-2 text-center text-[9px] font-bold text-navy">
                      AI Tutor
                    </div>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2 w-full rounded bg-cloud" />
                    <div className="h-2 w-3/4 rounded bg-iris/20" />
                  </div>
                </div>

                {/* Right Overlapping Tablet Milestone Certificate Mockup */}
                <div className="hidden sm:block absolute -bottom-4 right-0 w-[190px] overflow-hidden rounded-2xl border-[5px] border-navy bg-white p-3.5 shadow-elevated">
                  <div className="rounded-xl border border-gold/50 bg-gradient-to-br from-gold-light/60 via-white to-iris-light/40 p-3 text-center">
                    <span className="inline-block rounded-full bg-gold px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-navy">
                      Verified Milestone
                    </span>
                    <p className="mt-1.5 font-heading text-[11px] font-extrabold text-navy">
                      Competency Achieved
                    </p>
                    <p className="mt-0.5 text-[9px] text-ink-secondary">
                      iGUIDE Adaptive Assessment
                    </p>
                    <div className="mx-auto mt-2 h-6 w-6 rounded-full bg-gold/90 text-navy flex items-center justify-center text-[10px] font-extrabold">
                      ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Educational Environments Strip (Truthful, no fabricated corporate logos) */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-y border-border/80 py-6 text-center md:flex-row md:text-left">
            <span className="text-xs font-semibold text-ink-muted">
              Built for leading Indian educational environments
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-heading text-xs font-bold tracking-wide text-ink-secondary sm:text-sm">
              <span>K-12 Schools</span>
              <span className="text-border">•</span>
              <span>Colleges &amp; Universities</span>
              <span className="text-border">•</span>
              <span>STEM &amp; Engineering</span>
              <span className="text-border">•</span>
              <span>Training Institutes</span>
              <span className="text-border">•</span>
              <span>Academic Research</span>
            </div>
          </div>
        </Container>
      </section>
      {/* =====================================================================
          SECTION 5: WHY CHOOSE iGUIDE?
          Interactive Benefits Selector ("Built for the Way Learning Should Be.")
      ====================================================================== */}
      <WhyChooseIguideSection
        heading={
          sections.whyChooseHeading || "Built for the Way Learning Should Be."
        }
      />

      {/* =====================================================================
          SECTION 6: THE LEARNING JOURNEY
          Horizontal Process Visual ("From Curiosity to Capability.")
      ====================================================================== */}
      <LearningJourneySection
        heading={sections.journeyHeading || "From Curiosity to Capability."}
      />

      {/* =====================================================================
          SECTION 7: GALLERY PREVIEW
          Asymmetric Editorial Collage ("Moments That Inspire Learning.")
      ====================================================================== */}
      <HomeGalleryCollage
        items={galleryItems}
        heading={sections.galleryHeading || "Moments That Inspire Learning."}
      />

      {/* =====================================================================
          SECTION 8: SCROLL-ZOOM COMMUNITY VOICES -> GRAND iGUIDE LOGO REVEAL
          Sticky 3D zoom-through testimonial cards that zoom outward as you scroll, revealing the centered iGUIDE logo
      ====================================================================== */}
      <ScrollZoomReviewsSection
        testimonials={testimonials}
        heading="Trusted by Learners & Educators Across India"
      />

      {/* =====================================================================
          SECTION 9: LATEST INSIGHTS
          Distinctive Editorial Composition ("Ideas Shaping Tomorrow's Learning.")
      ====================================================================== */}
      {latestBlogs.length > 0 && (
        <section className="border-t border-border bg-white py-24 sm:py-32">
          <Container>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <SectionHeading
                eyebrow="LATEST INSIGHTS"
                title={
                  sections.insightsHeading ||
                  "Ideas Shaping Tomorrow's Learning."
                }
                description="Research notes, pedagogical perspectives, and practical essays from the iGUIDE editorial desk."
              />
              <div className="shrink-0">
                <SecondaryButton href="/blogs">
                  View All Insights
                </SecondaryButton>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Featured Lead Article Card (Larger Left 7 Columns) */}
              {leadBlog && (
                <article className="group flex flex-col justify-between overflow-hidden rounded-feature border border-border bg-cloud shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated lg:col-span-7">
                  <div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy">
                      <Image
                        src={leadBlog.coverImage}
                        alt={leadBlog.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-5 top-5 rounded-full bg-navy/85 px-3.5 py-1 text-xs font-semibold text-lavender backdrop-blur-md">
                        {leadBlog.category}
                      </span>
                    </div>

                    <div className="p-7 sm:p-9">
                      <div className="flex items-center gap-2 text-xs text-ink-muted">
                        <Calendar
                          className="h-3.5 w-3.5 text-iris"
                          aria-hidden="true"
                        />
                        <span>{formatDate(leadBlog.publishedAt)}</span>
                      </div>

                      <h3 className="mt-3 font-heading text-2xl font-bold leading-snug text-ink transition-colors group-hover:text-iris sm:text-3xl">
                        <Link href={`/blogs/${leadBlog.slug}`}>
                          {leadBlog.title}
                        </Link>
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
                        {leadBlog.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border px-7 py-5 sm:px-9">
                    <span className="text-xs font-medium text-ink-secondary">
                      {leadBlog.authorName}
                    </span>
                    <Link
                      href={`/blogs/${leadBlog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-iris hover:underline"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )}

              {/* Two Stacked Companion Editorial Cards (Right 5 Columns) */}
              <div className="flex flex-col justify-between gap-8 lg:col-span-5">
                {secondaryBlogs.map((post) => (
                  <article
                    key={post.id}
                    className="group flex flex-1 flex-col justify-between overflow-hidden rounded-feature border border-border bg-white p-6 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated sm:p-7"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-iris-light px-3 py-1 text-[11px] font-semibold text-iris">
                          {post.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                          <Calendar
                            className="h-3.5 w-3.5 text-intelligence"
                            aria-hidden="true"
                          />
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>

                      <div className="mt-4 flex items-start gap-4">
                        <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-navy sm:block">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="112px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-bold leading-snug text-ink transition-colors group-hover:text-iris sm:text-xl">
                            <Link href={`/blogs/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-secondary sm:text-sm">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-end border-t border-border pt-4">
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-iris hover:underline"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =====================================================================
          SECTION 10: SIGNATURE CTA
          Impressive Dark Section with Glowing Intelligence Path Background
      ====================================================================== */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-hero bg-navy px-6 py-16 text-cloud shadow-navy sm:px-14 sm:py-24">
            {/* Glowing Intelligence Path Background */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,72,131,0.32),rgba(43,100,176,0.14)_45%,rgba(11,16,38,0)_75%)]"
              aria-hidden="true"
            />
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
              viewBox="0 0 1200 420"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M-40 340 C 260 320, 420 120, 740 160 C 960 190, 1080 70, 1240 40"
                stroke="#1E4883"
                strokeWidth="3.5"
              />
              <path
                d="M-40 380 C 300 360, 520 220, 820 210 C 1020 200, 1120 120, 1240 90"
                stroke="#2B64B0"
                strokeWidth="1.75"
                strokeDasharray="6 6"
              />
              <circle cx="260" cy="320" r="6" fill="#2B64B0" />
              <circle cx="740" cy="160" r="8" fill="#F0C32A" />
              <circle cx="1080" cy="70" r="6" fill="#16A085" />
            </svg>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <EyebrowLabel variant="dark">
                WHERE HUMAN POTENTIAL MEETS INTELLIGENCE
              </EyebrowLabel>

              <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                {sections.signatureCtaHeading ||
                  "Let's Shape What's Next in Learning."}
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {sections.signatureCtaDescription ||
                  "Discover how intelligent educational technology can support your learning community."}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton href="/contact" showArrow>
                  Start a Conversation
                </PrimaryButton>
                <SecondaryButton href="/solutions" variant="dark">
                  Explore Solutions
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
