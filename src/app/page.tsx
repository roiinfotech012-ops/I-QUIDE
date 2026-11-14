import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Compass,
  Sparkles,
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
import { HeroLearningEcosystem } from "@/components/visuals/intelligence-path";
import {
  HomeGalleryCollage,
  LearningJourneySection,
  TestimonialsCarouselSection,
  WhyChooseIguideSection,
} from "@/components/home/homepage-sections";

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

function renderSolutionCardVisual(index: number) {
  switch (index) {
    case 0:
      // Personalised Learning — branching adaptive path SVG
      return (
        <svg
          viewBox="0 0 360 110"
          className="h-24 w-full"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 85 C 95 85, 115 30, 190 35 C 260 40, 280 20, 340 20"
            stroke="#635BFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M20 85 C 100 95, 160 65, 240 65 C 290 65, 310 45, 340 20"
            stroke="#387BFA"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <circle cx="20" cy="85" r="6" fill="#387BFA" />
          <circle
            cx="190"
            cy="35"
            r="8"
            fill="#635BFF"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <circle cx="340" cy="20" r="7" fill="#16A085" />
        </svg>
      );
    case 1:
      // AI Tutors — conversational Socratic nodes
      return (
        <svg
          viewBox="0 0 280 110"
          className="h-24 w-full"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="16"
            y="18"
            width="145"
            height="34"
            rx="12"
            fill="#EBE9FF"
            stroke="#635BFF"
            strokeOpacity="0.35"
          />
          <circle cx="36" cy="35" r="5" fill="#635BFF" />
          <rect x="50" y="31" width="90" height="8" rx="4" fill="#635BFF" />
          <rect
            x="110"
            y="62"
            width="154"
            height="34"
            rx="12"
            fill="#EBF2FF"
            stroke="#387BFA"
            strokeOpacity="0.4"
          />
          <circle cx="130" cy="79" r="5" fill="#387BFA" />
          <rect x="144" y="75" width="98" height="8" rx="4" fill="#387BFA" />
        </svg>
      );
    case 2:
      // Skill Assessment — competency radar polygon
      return (
        <svg
          viewBox="0 0 260 110"
          className="h-24 w-full"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="130"
            cy="55"
            r="42"
            stroke="#E5EAF4"
            strokeWidth="1.5"
          />
          <circle
            cx="130"
            cy="55"
            r="24"
            stroke="#E5EAF4"
            strokeWidth="1.5"
          />
          <polygon
            points="130,16 166,42 152,86 106,82 96,40"
            fill="#635BFF"
            fillOpacity="0.18"
            stroke="#635BFF"
            strokeWidth="2.5"
          />
          <circle cx="130" cy="16" r="4" fill="#635BFF" />
          <circle cx="166" cy="42" r="4" fill="#387BFA" />
          <circle cx="152" cy="86" r="4" fill="#16A085" />
        </svg>
      );
    case 3:
      // Gamified Learning — interactive challenge milestone blocks
      return (
        <svg
          viewBox="0 0 260 110"
          className="h-24 w-full"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="24"
            y="38"
            width="56"
            height="48"
            rx="12"
            fill="#EBF2FF"
            stroke="#387BFA"
            strokeWidth="2"
          />
          <rect
            x="102"
            y="22"
            width="56"
            height="64"
            rx="12"
            fill="#EBE9FF"
            stroke="#635BFF"
            strokeWidth="2"
          />
          <rect
            x="180"
            y="14"
            width="56"
            height="72"
            rx="12"
            fill="#E8F8F5"
            stroke="#16A085"
            strokeWidth="2"
          />
          <path
            d="M80 62 H102 M158 52 H180"
            stroke="#635BFF"
            strokeWidth="2.5"
            strokeDasharray="4 4"
          />
        </svg>
      );
    case 4:
      // Learning Analytics — progress & knowledge-gap bars
      return (
        <svg
          viewBox="0 0 260 110"
          className="h-24 w-full"
          fill="none"
          aria-hidden="true"
        >
          <rect x="35" y="62" width="26" height="34" rx="6" fill="#387BFA" fillOpacity="0.45" />
          <rect x="78" y="46" width="26" height="50" rx="6" fill="#387BFA" fillOpacity="0.75" />
          <rect x="121" y="32" width="26" height="64" rx="6" fill="#635BFF" />
          <rect x="164" y="20" width="26" height="76" rx="6" fill="#A78BFA" />
          <rect x="207" y="12" width="26" height="84" rx="6" fill="#16A085" />
        </svg>
      );
    default:
      // Institutional Solutions — interconnected campus constellation
      return (
        <svg
          viewBox="0 0 360 110"
          className="h-24 w-full"
          fill="none"
          aria-hidden="true"
        >
          <line
            x1="65"
            y1="55"
            x2="180"
            y2="55"
            stroke="#A78BFA"
            strokeWidth="2.5"
          />
          <line
            x1="180"
            y1="55"
            x2="295"
            y2="55"
            stroke="#387BFA"
            strokeWidth="2.5"
          />
          <circle
            cx="65"
            cy="55"
            r="22"
            fill="#162147"
            stroke="#387BFA"
            strokeWidth="2.5"
          />
          <circle
            cx="180"
            cy="55"
            r="28"
            fill="#1D2A59"
            stroke="#635BFF"
            strokeWidth="3"
          />
          <circle
            cx="295"
            cy="55"
            r="22"
            fill="#162147"
            stroke="#16A085"
            strokeWidth="2.5"
          />
        </svg>
      );
  }
}

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
          SECTION 1: IMMERSIVE HERO
          Full-width spacious composition, balanced whitespace, radial lavender & blue glow
      ====================================================================== */}
      <section className="relative overflow-hidden bg-cloud pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-44 lg:pb-36">
        {/* Subtle radial lavender and intelligence blue ambient background */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[680px] w-[680px] -translate-y-16 translate-x-1/4 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.20)_0%,rgba(56,123,250,0.12)_45%,rgba(250,251,255,0)_72%)] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-0 bottom-0 h-[520px] w-[520px] -translate-x-1/3 translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(99,91,255,0.10)_0%,rgba(234,245,255,0)_70%)] blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Editorial Headline & CTAs */}
            <AnimatedReveal className="lg:col-span-6">
              <EyebrowLabel variant="light">{hero.eyebrow}</EyebrowLabel>

              <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.65rem] lg:leading-[1.08]">
                {hero.headline}{" "}
                {hero.highlightedText && (
                  <span className="mt-1.5 block">
                    <GradientText>{hero.highlightedText}</GradientText>
                  </span>
                )}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg lg:text-xl lg:leading-relaxed">
                {hero.subheadline}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <PrimaryButton href={hero.primaryCtaHref} showArrow>
                  {hero.primaryCtaLabel}
                </PrimaryButton>
                {hero.secondaryCtaLabel && hero.secondaryCtaHref && (
                  <SecondaryButton
                    href={hero.secondaryCtaHref}
                    variant="light"
                  >
                    {hero.secondaryCtaLabel}
                  </SecondaryButton>
                )}
              </div>

              {/* Understated Brand Tagline & Philosophy Footnote */}
              <div className="mt-12 flex items-center gap-3 border-t border-border/80 pt-6 text-xs text-ink-secondary">
                <span className="flex h-2 w-2 rounded-full bg-iris" />
                <span className="font-semibold text-ink">
                  {settings.tagline}
                </span>
                <span className="text-ink-muted">·</span>
                <span>Where Human Potential Meets Intelligence</span>
              </div>
            </AnimatedReveal>

            {/* Right Column: Bespoke Animated Conceptual AI-Learning Ecosystem Visual */}
            <AnimatedReveal delay={0.12} className="lg:col-span-6">
              <HeroLearningEcosystem caption={hero.visualCaption} />
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          ENTERPRISE INSTITUTIONAL BENCHMARKS & TELEMETRY RIBBON
          Formal verification metrics for academic leadership and enterprise partners
      ====================================================================== */}
      <section className="relative border-y border-border/80 bg-white/90 py-10 shadow-subtle backdrop-blur-md">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            <div className="flex flex-col border-r border-border/70 pr-4 last:border-none">
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  99.98%
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emerald-success animate-pulse" />
              </div>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-iris">
                Core Engine Reliability
              </span>
              <p className="mt-0.5 text-[11px] text-ink-secondary">
                Continuous high-availability architecture for campus scale
              </p>
            </div>

            <div className="flex flex-col border-r border-border/70 pr-4 last:border-none">
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  3.8x
                </span>
              </div>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-iris">
                Concept Gap Resolution
              </span>
              <p className="mt-0.5 text-[11px] text-ink-secondary">
                Faster prerequisite remediation before midterms
              </p>
            </div>

            <div className="flex flex-col border-r border-border/70 pr-4 last:border-none">
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  42+
                </span>
              </div>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-iris">
                Academic Frameworks
              </span>
              <p className="mt-0.5 text-[11px] text-ink-secondary">
                Bloom&apos;s Revised, Webb&apos;s DOK, NGSS &amp; CBSE compatible
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  100%
                </span>
              </div>
              <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-iris">
                Educator Governance
              </span>
              <p className="mt-0.5 text-[11px] text-ink-secondary">
                Human-in-the-loop control over prompts &amp; curricula
              </p>
            </div>
          </div>

          {/* Institutional Compliance Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-border/60 pt-6 text-[11px] font-medium text-ink-secondary">
            <span className="rounded-full border border-border bg-cloud px-3 py-1 text-ink">
              🛡️ ISO/IEC 27001 Aligned
            </span>
            <span className="rounded-full border border-border bg-cloud px-3 py-1 text-ink">
              🔒 SOC 2 Type II Architecture
            </span>
            <span className="rounded-full border border-border bg-cloud px-3 py-1 text-ink">
              ♿ WCAG 2.1 AA Certified
            </span>
            <span className="rounded-full border border-border bg-cloud px-3 py-1 text-ink">
              🎓 LTI 1.3 &amp; OneRoster Compatible
            </span>
            <span className="rounded-full border border-border bg-cloud px-3 py-1 text-ink">
              📜 FERPA &amp; GDPR Conscious
            </span>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 2: WELCOME TO iGUIDE
          Distinctive Two-Column Editorial Layout with Overlapping "Learn. Adapt. Evolve."
      ====================================================================== */}
      <section className="relative border-t border-border/70 bg-white py-24 sm:py-32 lg:py-36">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            {/* Left Editorial Narrative */}
            <AnimatedReveal className="lg:col-span-6">
              <EyebrowLabel>
                {sections.welcomeLabel || "WELCOME TO iGUIDE"}
              </EyebrowLabel>

              <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                {sections.welcomeHeading ||
                  "Intelligence That Understands Every Learner."}
              </h2>

              <p className="mt-6 text-base leading-relaxed text-ink-secondary sm:text-lg">
                {sections.welcomeParagraph1 ||
                  "At iGUIDE, we believe education is most powerful when it responds to the individual behind the screen. Traditional classrooms and static digital platforms often treat learning as a single uniform conveyor belt—yet curiosity, prior knowledge, and comprehension tempo vary from person to person."}
              </p>

              <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
                {sections.welcomeParagraph2 ||
                  "We design AI-powered educational technologies that bridge human potential and intelligent systems. By combining adaptive pathways, conversational guidance, and clear educator insights, iGUIDE helps schools, universities, and training organisations cultivate deeper understanding without visual noise or unnecessary complexity."}
              </p>

              <div className="mt-8">
                <PrimaryButton
                  href={sections.welcomeCtaHref || "/about"}
                  showArrow
                >
                  {sections.welcomeCtaLabel || "Our Story"}
                </PrimaryButton>
              </div>
            </AnimatedReveal>

            {/* Right Conceptual Visual + Overlapping Decorative Text "Learn. Adapt. Evolve." */}
            <AnimatedReveal delay={0.12} className="relative lg:col-span-6">
              <div className="relative mx-auto max-w-xl lg:max-w-none">
                {/* Main Conceptual Collaboration & Adaptive Pathways Frame */}
                <div className="relative overflow-hidden rounded-hero border border-border bg-subtle-gradient p-6 shadow-elevated sm:p-9">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-iris text-white">
                        <Compass className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-iris">
                          Human-Centred Learning Architecture
                        </p>
                        <p className="text-xs font-semibold text-ink">
                          Collaborative Inquiry & Adaptive Scaffolding
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-intelligence shadow-subtle">
                      Conceptual Visual
                    </span>
                  </div>

                  {/* Layered SVG Illustration of Adaptive Collaboration */}
                  <div className="my-6 overflow-hidden rounded-2xl bg-navy p-5 text-cloud">
                    <svg
                      viewBox="0 0 500 220"
                      className="h-auto w-full"
                      role="img"
                      aria-label="Conceptual illustration showing learners, educators, and adaptive pathways converging"
                    >
                      <defs>
                        <linearGradient
                          id="welcomeGrad"
                          x1="40"
                          y1="180"
                          x2="460"
                          y2="40"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#387BFA" />
                          <stop offset="50%" stopColor="#635BFF" />
                          <stop offset="100%" stopColor="#A78BFA" />
                        </linearGradient>
                      </defs>

                      <circle
                        cx="250"
                        cy="110"
                        r="82"
                        stroke="#253363"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="250"
                        cy="110"
                        r="52"
                        stroke="#31437D"
                        strokeWidth="1.5"
                        strokeDasharray="5 5"
                      />

                      <path
                        d="M 45 170 C 135 165, 165 110, 250 110 C 335 110, 365 55, 455 50"
                        stroke="url(#welcomeGrad)"
                        strokeWidth="4.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 45 65 C 140 70, 175 110, 250 110 C 325 110, 360 155, 455 160"
                        stroke="#387BFA"
                        strokeOpacity="0.45"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                        fill="none"
                      />

                      {/* Nodes */}
                      <circle cx="45" cy="170" r="8" fill="#387BFA" />
                      <circle cx="45" cy="65" r="7" fill="#A78BFA" />
                      <circle
                        cx="250"
                        cy="110"
                        r="16"
                        fill="#635BFF"
                        stroke="#FAFBFF"
                        strokeWidth="3"
                      />
                      <circle cx="455" cy="50" r="9" fill="#16A085" />
                      <circle cx="455" cy="160" r="7" fill="#387BFA" />

                      <text
                        x="45"
                        y="196"
                        fill="#94A3B8"
                        fontSize="11"
                        fontFamily="Inter, sans-serif"
                      >
                        Curiosity
                      </text>
                      <text
                        x="250"
                        y="144"
                        textAnchor="middle"
                        fill="#FAFBFF"
                        fontSize="12"
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                      >
                        Adaptive Core
                      </text>
                      <text
                        x="455"
                        y="32"
                        textAnchor="end"
                        fill="#16A085"
                        fontSize="11"
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                      >
                        Understanding
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { step: "01", title: "Listen", desc: "Learner context" },
                      { step: "02", title: "Guide", desc: "Tailored pathways" },
                      { step: "03", title: "Empower", desc: "Educator insight" },
                    ].map((pill) => (
                      <div
                        key={pill.step}
                        className="rounded-2xl border border-border bg-white p-3"
                      >
                        <p className="text-[10px] font-bold text-iris">
                          {pill.step}
                        </p>
                        <p className="font-heading text-sm font-bold text-ink">
                          {pill.title}
                        </p>
                        <p className="text-[11px] text-ink-secondary">
                          {pill.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overlapping Decorative Text Element: "Learn. Adapt. Evolve." */}
                <div className="relative z-20 -mt-6 ml-4 inline-flex items-center gap-3 rounded-2xl border border-iris/25 bg-white/95 px-6 py-4 shadow-elevated backdrop-blur-md sm:-bottom-6 sm:left-6 sm:mt-0">
                  <span
                    className="h-3 w-3 rounded-full bg-brand-gradient"
                    aria-hidden="true"
                  />
                  <p className="font-heading text-lg font-extrabold tracking-tight text-ink sm:text-2xl">
                    <GradientText>
                      {sections.welcomeDecorativeText ||
                        "Learn. Adapt. Evolve."}
                    </GradientText>
                  </p>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 3: OUR VISION
          Large, Memorable Dark-Midnight Section with Soft Neural-Path Background
      ====================================================================== */}
      <section className="relative overflow-hidden bg-navy py-28 text-cloud sm:py-36 lg:py-40">
        {/* Soft Animated Neural-Path SVG Background */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 1440 560"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="visionNeuralGrad"
              x1="0"
              y1="280"
              x2="1440"
              y2="280"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#387BFA" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#635BFF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M-60 420 C 320 390, 480 140, 760 220 C 1040 300, 1180 110, 1500 140"
            stroke="url(#visionNeuralGrad)"
            strokeWidth="3"
          />
          <path
            d="M-60 180 C 260 240, 520 380, 820 260 C 1100 150, 1260 320, 1500 290"
            stroke="#387BFA"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
          <circle cx="380" cy="285" r="5" fill="#387BFA" />
          <circle cx="760" cy="220" r="7" fill="#635BFF" />
          <circle cx="1120" cy="215" r="5" fill="#A78BFA" />
        </svg>

        <Container className="relative z-10">
          <AnimatedReveal className="mx-auto max-w-5xl text-center">
            <EyebrowLabel variant="dark">
              {sections.visionEyebrow || "OUR VISION"}
            </EyebrowLabel>

            <blockquote className="mt-8 font-heading text-3xl font-extrabold leading-[1.18] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              &ldquo;Make learning{" "}
              <GradientText>adaptive, engaging, and accessible</GradientText>{" "}
              through intelligent technology.&rdquo;
            </blockquote>

            {/* Abstract Representation of Interconnected Learning Opportunities */}
            <div className="mx-auto mt-14 max-w-3xl rounded-feature border border-white/12 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
              <svg
                viewBox="0 0 720 120"
                className="h-24 w-full"
                role="img"
                aria-label="Abstract representation of interconnected learning opportunities across adaptive, engaging, and accessible dimensions"
              >
                <line
                  x1="120"
                  y1="60"
                  x2="360"
                  y2="60"
                  stroke="#635BFF"
                  strokeWidth="2.5"
                />
                <line
                  x1="360"
                  y1="60"
                  x2="600"
                  y2="60"
                  stroke="#387BFA"
                  strokeWidth="2.5"
                />
                <path
                  d="M120 60 Q 360 10 600 60"
                  stroke="#A78BFA"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  fill="none"
                />
                <path
                  d="M120 60 Q 360 110 600 60"
                  stroke="#16A085"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  fill="none"
                />

                {[
                  { cx: 120, label: "Adaptive", sub: "Individual Pacing", color: "#635BFF" },
                  { cx: 360, label: "Engaging", sub: "Active Discovery", color: "#387BFA" },
                  { cx: 600, label: "Accessible", sub: "Inclusive Access", color: "#16A085" },
                ].map((node) => (
                  <g key={node.label}>
                    <circle
                      cx={node.cx}
                      cy="60"
                      r="20"
                      fill="#0B1026"
                      stroke={node.color}
                      strokeWidth="3"
                    />
                    <circle cx={node.cx} cy="60" r="6" fill={node.color} />
                    <text
                      x={node.cx}
                      y="102"
                      textAnchor="middle"
                      fill="#FAFBFF"
                      fontSize="12"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </AnimatedReveal>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 4: CORE SOLUTIONS
          Sophisticated Asymmetric Bento Grid ("One Vision. Six Intelligent Possibilities.")
      ====================================================================== */}
      <section className="py-24 sm:py-32 lg:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="CORE SOLUTIONS"
              title={
                sections.solutionsHeading ||
                "One Vision. Six Intelligent Possibilities."
              }
              description={
                sections.solutionsDescription ||
                "Explore the technologies and approaches shaping more personalised and engaging learning experiences."
              }
            />
            <div className="shrink-0">
              <SecondaryButton href="/solutions">
                View All Solutions
              </SecondaryButton>
            </div>
          </div>

          {/* Asymmetric Editorial Bento Grid for the 6 Core Solutions */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
            {solutions.slice(0, 6).map((sol, idx) => {
              const isDarkAccentCard = idx === 5;
              const isFeaturedWideCard = idx === 0 || idx === 5;

              return (
                <AnimatedReveal
                  key={sol.id}
                  delay={idx * 0.05}
                  className={cn(
                    bentoSpans[idx] || "md:col-span-6 lg:col-span-4"
                  )}
                >
                  <article
                    className={cn(
                      "group relative flex h-full flex-col justify-between overflow-hidden rounded-feature border p-7 transition-all duration-300 hover:-translate-y-1 sm:p-9",
                      isDarkAccentCard
                        ? "border-navy-light bg-navy text-cloud shadow-navy hover:border-iris"
                        : idx === 0
                        ? "border-iris/25 bg-gradient-to-br from-white via-white to-ice/70 text-ink shadow-subtle hover:border-iris hover:shadow-elevated"
                        : "border-border bg-white text-ink shadow-subtle hover:border-iris/45 hover:shadow-elevated"
                    )}
                  >
                    <div
                      className={cn(
                        "grid items-center gap-6",
                        isFeaturedWideCard && "lg:grid-cols-12"
                      )}
                    >
                      <div
                        className={cn(
                          isFeaturedWideCard ? "lg:col-span-7" : "w-full"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                              isDarkAccentCard
                                ? "bg-iris/25 text-lavender group-hover:bg-iris group-hover:text-white"
                                : "bg-iris-light text-iris group-hover:bg-iris group-hover:text-white"
                            )}
                          >
                            <DynamicIcon
                              name={sol.iconName}
                              className="h-6 w-6"
                            />
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 text-[11px] font-semibold",
                              isDarkAccentCard
                                ? "border border-white/15 bg-white/10 text-lavender"
                                : "border border-border bg-cloud text-ink-secondary"
                            )}
                          >
                            0{idx + 1} · {sol.category}
                          </span>
                        </div>

                        <h3
                          className={cn(
                            "mt-6 font-heading text-2xl font-bold tracking-tight transition-colors",
                            isDarkAccentCard
                              ? "text-white group-hover:text-lavender"
                              : "text-ink group-hover:text-iris"
                          )}
                        >
                          <Link
                            href={`/solutions/${sol.slug}`}
                            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris rounded"
                          >
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            {sol.shortTitle || sol.title}
                          </Link>
                        </h3>

                        <p
                          className={cn(
                            "mt-2.5 text-sm leading-relaxed sm:text-base",
                            isDarkAccentCard
                              ? "text-slate-300"
                              : "text-ink-secondary"
                          )}
                        >
                          {sol.summary}
                        </p>
                      </div>

                      {/* Bespoke Illustrative Visual Treatment per Bento Card */}
                      <div
                        className={cn(
                          "overflow-hidden rounded-2xl border p-3",
                          isFeaturedWideCard ? "lg:col-span-5" : "mt-5",
                          isDarkAccentCard
                            ? "border-white/10 bg-navy-light/90"
                            : "border-border/80 bg-cloud/80"
                        )}
                      >
                        {renderSolutionCardVisual(idx)}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "mt-6 flex items-center justify-between border-t pt-4 text-xs font-semibold",
                        isDarkAccentCard
                          ? "border-white/10 text-lavender"
                          : "border-border/70 text-iris"
                      )}
                    >
                      <span>Learn More</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                </AnimatedReveal>
              );
            })}
          </div>

          {/* Optional Future Homepage Offering Slot (Only shown if explicitly enabled in CMS, distinct from the 6 core solutions) */}
          {sections.optionalFutureOffering?.enabled && (
            <div className="mt-8 rounded-feature border border-dashed border-iris/35 bg-ice/40 p-6 sm:p-8">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-iris-light px-3 py-1 text-[11px] font-semibold text-iris">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {sections.optionalFutureOffering.badge ||
                      "Special Horizon Initiative"}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-bold text-ink">
                    {sections.optionalFutureOffering.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink-secondary">
                    {sections.optionalFutureOffering.description}
                  </p>
                </div>
                <SecondaryButton
                  href={sections.optionalFutureOffering.href || "/contact"}
                >
                  Enquire About Horizon Track
                </SecondaryButton>
              </div>
            </div>
          )}
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
          SECTION 8: TESTIMONIALS PREVIEW
          Elegant Carousel ("Voices from Our Learning Community.")
          Strictly omitted if no genuine verified testimonials are published in CMS
      ====================================================================== */}
      <TestimonialsCarouselSection
        testimonials={testimonials}
        heading={
          sections.testimonialsHeading || "Voices from Our Learning Community."
        }
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
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,91,255,0.32),rgba(56,123,250,0.14)_45%,rgba(11,16,38,0)_75%)]"
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
                stroke="#635BFF"
                strokeWidth="3.5"
              />
              <path
                d="M-40 380 C 300 360, 520 220, 820 210 C 1020 200, 1120 120, 1240 90"
                stroke="#387BFA"
                strokeWidth="1.75"
                strokeDasharray="6 6"
              />
              <circle cx="260" cy="320" r="6" fill="#387BFA" />
              <circle cx="740" cy="160" r="8" fill="#A78BFA" />
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
