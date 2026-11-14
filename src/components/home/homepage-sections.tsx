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
    accent: "#635BFF",
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
    accent: "#387BFA",
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
    accent: "#A78BFA",
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
    accent: "#635BFF",
    illustrationType: "scalable-grid",
  },
];

export function WhyChooseIguideSection({
  heading = "Built for the Way Learning Should Be.",
}: {
  heading?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const active = WHY_CHOOSE_FEATURES[selectedIndex] ?? WHY_CHOOSE_FEATURES[0];
  const ActiveIcon = active.icon;

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="WHY CHOOSE iGUIDE?"
          title={heading}
          description="Select a pillar below to explore how iGUIDE combines human-centred pedagogy with intelligent technology."
        />

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Interactive Feature Selector (Left 5 Columns) */}
          <div
            className="flex flex-col justify-between gap-3 lg:col-span-5"
            role="tablist"
            aria-label="Why Choose iGUIDE Pillars"
          >
            {WHY_CHOOSE_FEATURES.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`why-tab-${item.id}`}
                  aria-selected={isSelected}
                  aria-controls={`why-panel-${item.id}`}
                  onClick={() => setSelectedIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSelectedIndex((idx + 1) % WHY_CHOOSE_FEATURES.length);
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSelectedIndex(
                        (idx - 1 + WHY_CHOOSE_FEATURES.length) %
                          WHY_CHOOSE_FEATURES.length
                      );
                    }
                  }}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-feature border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                    isSelected
                      ? "border-iris bg-white shadow-elevated"
                      : "border-border bg-cloud/70 hover:border-iris/35 hover:bg-white"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors",
                      isSelected
                        ? "bg-iris text-white"
                        : "border border-border bg-white text-ink-secondary group-hover:text-iris"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-heading text-base font-bold text-ink sm:text-lg">
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-bold",
                          isSelected ? "text-iris" : "text-ink-muted"
                        )}
                      >
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                      {item.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Adjacent Conceptual Illustration & Detail Panel (Right 7 Columns) */}
          <div
            role="tabpanel"
            id={`why-panel-${active.id}`}
            aria-labelledby={`why-tab-${active.id}`}
            className="flex flex-col justify-between overflow-hidden rounded-hero border border-border bg-navy p-7 text-cloud shadow-navy sm:p-10 lg:col-span-7"
          >
            {/* Conceptual Illustration Canvas */}
            <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-navy-light/90 p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-lavender">
                  <span className="h-2 w-2 rounded-full bg-iris" />
                  Conceptual Architecture Illustration · Pillar 0
                  {selectedIndex + 1}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400">
                  Illustrative Model
                </span>
              </div>

              <svg
                viewBox="0 0 560 200"
                className="h-44 w-full"
                role="img"
                aria-label={`Conceptual illustration for ${active.title}`}
              >
                <defs>
                  <linearGradient
                    id="whyGrad"
                    x1="0"
                    y1="100"
                    x2="560"
                    y2="100"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#635BFF" />
                    <stop offset="50%" stopColor="#387BFA" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>

                {/* Subtle grid lines */}
                <g stroke="rgba(255,255,255,0.06)" strokeWidth="1">
                  <line x1="0" y1="50" x2="560" y2="50" />
                  <line x1="0" y1="100" x2="560" y2="100" />
                  <line x1="0" y1="150" x2="560" y2="150" />
                </g>

                {active.illustrationType === "neural-topology" && (
                  <g>
                    <path
                      d="M60 150 C 160 140, 210 55, 310 75 C 400 95, 440 45, 500 45"
                      stroke="url(#whyGrad)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M60 150 C 180 170, 260 120, 360 115 C 430 110, 465 80, 500 45"
                      stroke="#387BFA"
                      strokeOpacity="0.4"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                      fill="none"
                    />
                    <circle cx="60" cy="150" r="9" fill="#387BFA" />
                    <circle
                      cx="200"
                      cy="95"
                      r="11"
                      fill="#635BFF"
                      stroke="#FAFBFF"
                      strokeWidth="2.5"
                    />
                    <circle cx="310" cy="75" r="10" fill="#A78BFA" />
                    <circle
                      cx="500"
                      cy="45"
                      r="12"
                      fill="#16A085"
                      stroke="#FAFBFF"
                      strokeWidth="2.5"
                    />
                  </g>
                )}

                {active.illustrationType === "adaptive-branches" && (
                  <g>
                    <path
                      d="M60 100 C 160 100, 180 42, 290 42 L 490 42"
                      stroke="#387BFA"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M60 100 L 490 100"
                      stroke="url(#whyGrad)"
                      strokeWidth="4.5"
                      fill="none"
                    />
                    <path
                      d="M60 100 C 160 100, 180 158, 290 158 L 490 158"
                      stroke="#A78BFA"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      fill="none"
                    />
                    <circle cx="60" cy="100" r="10" fill="#635BFF" />
                    <circle cx="290" cy="42" r="8" fill="#387BFA" />
                    <circle
                      cx="320"
                      cy="100"
                      r="11"
                      fill="#635BFF"
                      stroke="#FAFBFF"
                      strokeWidth="2.5"
                    />
                    <circle cx="290" cy="158" r="8" fill="#A78BFA" />
                    <circle cx="490" cy="100" r="10" fill="#16A085" />
                  </g>
                )}

                {active.illustrationType === "engagement-rings" && (
                  <g>
                    <circle
                      cx="280"
                      cy="100"
                      r="78"
                      stroke="#635BFF"
                      strokeOpacity="0.35"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle
                      cx="280"
                      cy="100"
                      r="52"
                      stroke="#387BFA"
                      strokeWidth="3"
                      strokeDasharray="10 6"
                      fill="none"
                    />
                    <circle cx="280" cy="100" r="24" fill="#635BFF" />
                    <circle cx="202" cy="100" r="8" fill="#387BFA" />
                    <circle cx="358" cy="100" r="8" fill="#A78BFA" />
                    <circle cx="280" cy="22" r="8" fill="#16A085" />
                  </g>
                )}

                {active.illustrationType === "insight-matrix" && (
                  <g>
                    <rect
                      x="90"
                      y="110"
                      width="52"
                      height="60"
                      rx="8"
                      fill="#387BFA"
                      fillOpacity="0.45"
                    />
                    <rect
                      x="170"
                      y="85"
                      width="52"
                      height="85"
                      rx="8"
                      fill="#387BFA"
                      fillOpacity="0.7"
                    />
                    <rect
                      x="250"
                      y="62"
                      width="52"
                      height="108"
                      rx="8"
                      fill="#635BFF"
                    />
                    <rect
                      x="330"
                      y="40"
                      width="52"
                      height="130"
                      rx="8"
                      fill="#A78BFA"
                    />
                    <rect
                      x="410"
                      y="25"
                      width="52"
                      height="145"
                      rx="8"
                      fill="#16A085"
                    />
                  </g>
                )}

                {active.illustrationType === "scalable-grid" && (
                  <g>
                    {[110, 225, 340, 455].map((x, i) => (
                      <g key={x}>
                        <rect
                          x={x - 42}
                          y="55"
                          width="84"
                          height="90"
                          rx="14"
                          fill="#18234B"
                          stroke={i % 2 === 0 ? "#635BFF" : "#387BFA"}
                          strokeWidth="2"
                        />
                        <circle
                          cx={x}
                          cy="100"
                          r="12"
                          fill={i === 3 ? "#16A085" : "#635BFF"}
                        />
                      </g>
                    ))}
                  </g>
                )}
              </svg>
            </div>

            {/* Active Pillar Description & Highlights */}
            <div className="mt-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-iris/25 text-lavender">
                  <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-lavender">
                    Pillar 0{selectedIndex + 1}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {active.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                {active.description}
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-2.5 border-t border-white/10 pt-5 sm:grid-cols-3">
                {active.highlights.map((pt) => (
                  <li
                    key={pt}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-snug text-slate-200"
                  >
                    <span className="mb-1.5 block h-1.5 w-6 rounded-full bg-brand-gradient" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
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
    accent: "#387BFA",
  },
  {
    step: "02",
    name: "Personalise.",
    subtitle: "Calibrate adaptive pathways & modalities",
    description:
      "Intelligence tailors the route forward—sequencing visual analogies, foundational refreshers, and structured explanations matched to individual readiness.",
    icon: Waypoints,
    accent: "#635BFF",
  },
  {
    step: "03",
    name: "Engage.",
    subtitle: "Interact through Socratic dialogue & challenges",
    description:
      "Learners test their understanding through conversational AI guidance, interactive logic challenges, and continuous formative feedback.",
    icon: Sparkles,
    accent: "#A78BFA",
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
                <stop offset="0%" stopColor="#387BFA" />
                <stop offset="35%" stopColor="#635BFF" />
                <stop offset="70%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#16A085" />
              </linearGradient>
            </defs>

            {/* Subtle background constellation wave */}
            <path
              d="M 120 55 C 280 15, 360 95, 480 55 C 600 15, 700 95, 840 55 C 960 15, 1020 75, 1080 55"
              stroke="#635BFF"
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
