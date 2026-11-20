"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  Maximize2,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
  Waypoints,
  X,
} from "lucide-react";
import type { GalleryItemRecord, TestimonialRecord } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import {
  Container,
  EyebrowLabel,
  PrimaryButton,
  SectionHeading,
} from "@/components/ui/primitives";

const WHY_CHOOSE_FEATURES = [
  {
    id: "ai-innovation",
    title: "AI-Powered Innovation",
    tagline: "Purposeful intelligence grounded in pedagogy.",
    description:
      "We apply modern artificial intelligence where it creates genuine educational clarity—synthesising complex concepts, mapping prerequisite dependencies, and supporting conversational inquiry without adding technical complexity.",
    highlights: [
      "Curriculum-aligned knowledge graph architecture",
      "Explainable conceptual scaffolding & Socratic prompts",
      "Human-in-the-loop governance that keeps educators in command",
    ],
    icon: BrainCircuit,
    accent: "#1E4883",
    illustrationType: "neural-topology",
  },
  {
    id: "personalised-learning",
    title: "Personalised Learning",
    tagline: "Adaptive pathways that honour individual pacing.",
    description:
      "Every learner brings a distinct set of prior experiences, strengths, and questions. iGUIDE dynamically calibrates explanation depth, analogies, and practice sequences so learning adapts to the mind in front of it.",
    highlights: [
      "Real-time pacing and cognitive load balance",
      "Multi-modal explanations (visual, textual, and guided steps)",
      "Supportive prerequisite bridges when hesitation appears",
    ],
    icon: Waypoints,
    accent: "#2B64B0",
    illustrationType: "adaptive-branches",
  },
  {
    id: "meaningful-engagement",
    title: "Meaningful Engagement",
    tagline: "Active curiosity over passive screen time.",
    description:
      "True engagement comes from the joy of figuring things out. Through interactive challenges, conceptual puzzles, and Socratic dialogue, learners transition from passive observers to active problem-solvers.",
    highlights: [
      "Interactive challenges and conceptual logic quests",
      "Constructive, low-stress formative checkpoints",
      "Intrinsic mastery milestones along the Intelligence Path",
    ],
    icon: Sparkles,
    accent: "#F0C32A",
    illustrationType: "engagement-rings",
  },
  {
    id: "data-informed-insights",
    title: "Data-Informed Insights",
    tagline: "Timely comprehension visibility for educators.",
    description:
      "Instead of waiting for end-of-term exam scores, iGUIDE surfaces clear, privacy-conscious comprehension signals—helping educators spot knowledge gaps early and focus classroom time where it matters most.",
    highlights: [
      "Early identification of concept & prerequisite bottlenecks",
      "Readable cohort readiness digests before seminars",
      "Competency & skill growth mapping over time",
    ],
    icon: BarChart3,
    accent: "#16A085",
    illustrationType: "insight-matrix",
  },
  {
    id: "scalable-solutions",
    title: "Scalable Educational Solutions",
    tagline: "Coherent architecture for schools, universities & training.",
    description:
      "Whether supporting a single academic department or an entire multi-campus institution, iGUIDE's modular capabilities integrate smoothly with existing curricula and evolve alongside your academic vision.",
    highlights: [
      "Modular adoption across K-12, higher education & training",
      "Accessible, mobile-first and WCAG-conscious design system",
      "Extensible foundation ready for future learning programmes",
    ],
    icon: Layers,
    accent: "#1E4883",
    illustrationType: "scalable-grid",
  },
];

const PILLAR_VISUALS = [
  {
    image: "/images/pillar-ai-innovation.jpg",
    linkHref: "/solutions/ai-tutors",
    linkLabel: "Explore AI-Powered Innovation",
  },
  {
    image: "/images/pillar-personalised-learning.jpg",
    linkHref: "/solutions/personalised-learning",
    linkLabel: "Explore Personalised Learning",
  },
  {
    image: "/images/pillar-meaningful-engagement.jpg",
    linkHref: "/solutions/gamified-learning",
    linkLabel: "Explore Meaningful Engagement",
  },
  {
    image: "/images/pillar-data-insights.jpg",
    linkHref: "/solutions/learning-analytics",
    linkLabel: "Explore Data-Informed Insights",
  },
  {
    image: "/images/pillar-scalable-solutions.jpg",
    linkHref: "/solutions/institutional-solutions",
    linkLabel: "Explore Institutional Solutions",
  },
];

export function WhyChooseIguideSection({
  heading = "Built for the Way Learning Should Be.",
}: {
  heading?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const cards = WHY_CHOOSE_FEATURES.map((item) =>
      document.getElementById(`pillar-scroll-card-${item.id}`)
    ).filter(Boolean) as HTMLElement[];

    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      {
        rootMargin: "-32% 0px -42% 0px",
        threshold: 0.1,
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToPillar = (id: string) => {
    const el = document.getElementById(`pillar-scroll-card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      className="relative bg-[#071124] py-24 text-white sm:py-32"
      aria-label="Why Choose iGUIDE"
    >
      {/* Subtle top ambient gold/blue accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT STICKY COLUMN: Title, Subtitle & Live Scroll-Synced Pillar Tracker */}
          <div className="lg:sticky lg:top-32 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span>WHY CHOOSE iGUIDE?</span>
            </div>

            <h2 className="mt-5 font-heading text-3xl font-extrabold tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.95rem] lg:leading-[1.08]">
              {heading}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
              Scroll to explore how iGUIDE blends human-centred Indian pedagogy with intelligent technology—built for learners, educators, and institutions.
            </p>

            {/* Live Scroll-Synced Pillar Progress List */}
            <div className="mt-9 hidden space-y-2 border-l border-white/15 pl-4 lg:block">
              {WHY_CHOOSE_FEATURES.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToPillar(item.id)}
                    className={cn(
                      "group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all duration-200",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                    )}
                  >
                    {isActive && (
                      <span
                        className="absolute -left-[17px] top-2 bottom-2 w-[3px] rounded-full bg-gold"
                        aria-hidden="true"
                      />
                    )}
                    <span className="font-heading text-xs font-bold tracking-wide">
                      0{idx + 1}. {item.title}
                    </span>
                    <ArrowRight
                      className={cn(
                        "h-3.5 w-3.5 transition-all",
                        isActive
                          ? "translate-x-0 text-gold opacity-100"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT SCROLLING COLUMN: 5 Animated Feature Cards (Exact Reference Split-Scroll Aesthetic) */}
          <div className="space-y-16 sm:space-y-24 lg:col-span-7">
            {WHY_CHOOSE_FEATURES.map((item, idx) => {
              const Icon = item.icon;
              const visual = PILLAR_VISUALS[idx % PILLAR_VISUALS.length];

              return (
                <motion.article
                  key={item.id}
                  id={`pillar-scroll-card-${item.id}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0.3, y: 48, scale: 0.96 }
                  }
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="group"
                >
                  {/* Clean Edge-to-Edge HD Photograph (Zero colored outer border) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#0A152B] shadow-2xl">
                    <Image
                      src={visual.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071124]/45 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy/80 px-3.5 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
                      <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                      <span>Pillar 0{idx + 1}</span>
                    </span>
                  </div>

                  {/* Clean Title, Gold Action Link, Description & 3 Highlights Underneath */}
                  <div className="mt-6 px-1">
                    <h3 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {item.title}
                    </h3>
                    <a
                      href={visual.linkHref}
                      className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-bold text-gold transition hover:text-gold-hover"
                    >
                      <span>{visual.linkLabel}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                      {item.description}
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      {item.highlights.map((pt) => (
                        <div
                          key={pt}
                          className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[11.5px] leading-snug text-slate-200"
                        >
                          <span className="mb-1.5 block h-1 w-5 rounded-full bg-gold" />
                          {pt}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

const LEARNING_JOURNEY_STAGES = [
  {
    step: "01",
    name: "Discover.",
    subtitle: "Spark curiosity & map baseline understanding",
    description:
      "Every journey begins with inquiry. Low-stress diagnostic exploration identifies prior knowledge, misconceptions, and how a learner naturally approaches new ideas.",
    icon: Compass,
    accent: "#2B64B0",
  },
  {
    step: "02",
    name: "Personalise.",
    subtitle: "Calibrate adaptive pathways & modalities",
    description:
      "Intelligence tailors the route forward—sequencing visual analogies, foundational refreshers, and structured explanations matched to individual readiness.",
    icon: Waypoints,
    accent: "#1E4883",
  },
  {
    step: "03",
    name: "Engage.",
    subtitle: "Interact through Socratic dialogue & challenges",
    description:
      "Learners test their understanding through conversational AI guidance, interactive logic challenges, and continuous formative feedback.",
    icon: Sparkles,
    accent: "#F0C32A",
  },
  {
    step: "04",
    name: "Grow.",
    subtitle: "Consolidate durable capability & insight",
    description:
      "Concepts move from short-term familiarity into confident, transferable capability—supported by clear progress insights for both learners and educators.",
    icon: TrendingUp,
    accent: "#16A085",
  },
];

export function LearningJourneySection({
  heading = "From Curiosity to Capability.",
}: {
  heading?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="overflow-hidden border-y border-border bg-subtle-gradient py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="THE LEARNING JOURNEY"
          title={heading}
          description="An explanatory look at the four conceptual stages of the iGUIDE Intelligence Path—illustrating how curiosity evolves into lasting capability."
          align="center"
        />

        {/* Desktop Horizontal Connected SVG Intelligence Path */}
        <div className="relative mt-16 hidden lg:block">
          <svg
            viewBox="0 0 1200 110"
            className="w-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="journeyLineGrad"
                x1="80"
                y1="55"
                x2="1120"
                y2="55"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#2B64B0" />
                <stop offset="35%" stopColor="#1E4883" />
                <stop offset="70%" stopColor="#F0C32A" />
                <stop offset="100%" stopColor="#16A085" />
              </linearGradient>
            </defs>

            {/* Subtle background constellation wave */}
            <path
              d="M 120 55 C 280 15, 360 95, 480 55 C 600 15, 700 95, 840 55 C 960 15, 1020 75, 1080 55"
              stroke="#1E4883"
              strokeOpacity="0.18"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            {/* Primary Animated Intelligence Path */}
            <motion.path
              d="M 120 55 C 250 90, 350 20, 480 55 C 610 90, 710 20, 840 55 C 950 85, 1020 35, 1080 55"
              stroke="url(#journeyLineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={
                prefersReducedMotion ? false : { pathLength: 0, opacity: 0.4 }
              }
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {[120, 440, 760, 1080].map((cx, idx) => (
              <g key={cx}>
                <circle
                  cx={cx}
                  cy="55"
                  r="18"
                  fill="#FFFFFF"
                  stroke={LEARNING_JOURNEY_STAGES[idx].accent}
                  strokeWidth="4"
                />
                <circle
                  cx={cx}
                  cy="55"
                  r="7"
                  fill={LEARNING_JOURNEY_STAGES[idx].accent}
                />
              </g>
            ))}
          </svg>

          <div className="mt-4 grid grid-cols-4 gap-6">
            {LEARNING_JOURNEY_STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="group relative flex flex-col justify-between rounded-feature border border-border bg-white p-7 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-extrabold uppercase tracking-widest text-iris">
                        Stage {stage.step}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-iris-light text-iris">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="mt-4 font-heading text-2xl font-extrabold text-ink">
                      {stage.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-intelligence">
                      {stage.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                      {stage.description}
                    </p>
                  </div>
                  <div
                    className="mt-6 h-1 w-12 rounded-full"
                    style={{ backgroundColor: stage.accent }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertically Connected Sequence */}
        <div className="relative mt-12 space-y-6 lg:hidden">
          <div
            className="pointer-events-none absolute bottom-8 left-6 top-8 w-0.5 bg-gradient-to-b from-intelligence via-iris to-emerald-success"
            aria-hidden="true"
          />
          {LEARNING_JOURNEY_STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <div key={stage.step} className="relative flex items-start gap-5">
                <div
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white text-xs font-extrabold text-white shadow-subtle"
                  style={{ backgroundColor: stage.accent }}
                >
                  {stage.step}
                </div>
                <div className="flex-1 rounded-feature border border-border bg-white p-6 shadow-subtle">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-xl font-extrabold text-ink">
                      {stage.name}
                    </h3>
                    <Icon className="h-5 w-5 text-iris" aria-hidden="true" />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-intelligence">
                    {stage.subtitle}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function HomeGalleryCollage({
  items,
  heading = "Moments That Inspire Learning.",
}: {
  items: GalleryItemRecord[];
  heading?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const previewItems = items.slice(0, 5);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % previewItems.length
        );
      if (e.key === "ArrowLeft")
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + previewItems.length) % previewItems.length
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, previewItems.length]);

  if (previewItems.length === 0) return null;

  const activeItem =
    lightboxIndex !== null ? previewItems[lightboxIndex] : null;

  // Asymmetric spans for 5 items in a 12-column editorial collage
  const spanClasses = [
    "md:col-span-6 lg:col-span-7",
    "md:col-span-6 lg:col-span-5",
    "md:col-span-4 lg:col-span-4",
    "md:col-span-4 lg:col-span-4",
    "md:col-span-4 lg:col-span-4",
  ];

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="VISUAL ECOSYSTEM & GALLERY"
            title={heading}
            description="Explore conceptual visual studies, collaborative learning environments, and adaptive pathway blueprints curated in the iGUIDE CMS."
          />
          <div className="shrink-0">
            <PrimaryButton href="/gallery" showArrow>
              Explore Our Gallery
            </PrimaryButton>
          </div>
        </div>

        {/* Asymmetric Editorial Collage */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
          {previewItems.map((item, idx) => (
            <figure
              key={item.id}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-feature border border-border bg-white shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated",
                spanClasses[idx] || "md:col-span-6 lg:col-span-4"
              )}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden bg-navy",
                  idx < 2 ? "aspect-[16/10]" : "aspect-[3/2]"
                )}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`Open ${item.title} in lightbox`}
                  className="absolute inset-0 flex items-center justify-center bg-navy/45 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink shadow-elevated">
                    <Maximize2
                      className="h-3.5 w-3.5 text-iris"
                      aria-hidden="true"
                    />
                    <span>Inspect Visual</span>
                  </span>
                </button>
                <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-[11px] font-semibold text-lavender backdrop-blur-md">
                  {item.category}
                </span>
              </div>

              <figcaption className="flex flex-1 items-center justify-between gap-4 p-5">
                <div>
                  <h3 className="font-heading text-base font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-secondary">
                    {item.caption}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Accessible Lightbox Modal */}
        {activeItem && lightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4 backdrop-blur-md sm:p-8"
          >
            <div className="relative w-full max-w-4xl overflow-hidden rounded-hero border border-white/15 bg-navy-light text-cloud shadow-navy">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-lavender">
                    {activeItem.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close lightbox"
                  className="rounded-full border border-white/15 bg-white/5 p-2 text-slate-300 transition hover:bg-white/15 hover:text-white"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full bg-navy">
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.altText || activeItem.title}
                  fill
                  sizes="100vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4">
                <p className="max-w-2xl text-xs leading-relaxed text-slate-300">
                  {activeItem.caption}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + previewItems.length) %
                          previewItems.length
                      )
                    }
                    aria-label="Previous image"
                    className="rounded-full border border-white/15 bg-white/5 p-2 text-white hover:bg-white/15"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs text-slate-400">
                    {lightboxIndex + 1} / {previewItems.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex + 1) % previewItems.length
                      )
                    }
                    aria-label="Next image"
                    className="rounded-full border border-white/15 bg-white/5 p-2 text-white hover:bg-white/15"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export function TestimonialsCarouselSection({
  testimonials,
  heading = "Voices from Our Learning Community.",
}: {
  testimonials: TestimonialRecord[];
  heading?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Only display genuine published testimonials from the CMS. If none are published, omit the section entirely.
  const genuinePublished = testimonials.filter(
    (t) => t.published && t.isVerified
  );
  if (genuinePublished.length === 0) {
    return null;
  }

  const current = genuinePublished[activeIndex] ?? genuinePublished[0];

  return (
    <section className="border-t border-border bg-ice/40 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <EyebrowLabel>COMMUNITY ENDORSEMENTS</EyebrowLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {heading}
            </h2>
          </div>

          {genuinePublished.length > 1 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(
                    (activeIndex - 1 + genuinePublished.length) %
                      genuinePublished.length
                  )
                }
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-ink shadow-subtle transition hover:border-iris hover:text-iris"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((activeIndex + 1) % genuinePublished.length)
                }
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-ink shadow-subtle transition hover:border-iris hover:text-iris"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 rounded-hero border border-border bg-white p-8 shadow-elevated sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-iris-light text-iris">
              <Quote className="h-6 w-6" aria-hidden="true" />
            </div>
            {current.rating && current.rating > 0 && (
              <div
                className="flex items-center gap-1 text-amber-500"
                aria-label={`Rated ${current.rating} out of 5 stars`}
              >
                {Array.from({ length: current.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>

          <blockquote className="mt-6 font-heading text-xl font-medium leading-relaxed text-ink sm:text-2xl lg:text-3xl">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex items-center gap-4">
              {current.avatarUrl && (
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border">
                  <Image
                    src={current.avatarUrl}
                    alt={current.authorName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-heading text-base font-bold text-ink">
                  {current.authorName}
                </p>
                <p className="text-xs text-ink-secondary">
                  {current.authorRole}
                  {current.institution ? ` · ${current.institution}` : ""}
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold text-ink-muted">
              {activeIndex + 1} of {genuinePublished.length}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
