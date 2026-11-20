"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { TestimonialRecord } from "@/lib/seed-data";
import { cn } from "@/lib/utils";

interface ReviewCardData {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  institution?: string;
  initials: string;
  accentBg: string;
}

const CURATED_COMMUNITY_VOICES: Omit<ReviewCardData, "id">[] = [
  {
    quote:
      "The adaptive pathways immediately identify where a student hesitates and offer calm, structured scaffolding before frustration sets in.",
    authorName: "Dr. Meenakshi Sundaram",
    authorRole: "Dean of Academic Innovation",
    institution: "Bengaluru",
    initials: "MS",
    accentBg: "#1E4883",
  },
  {
    quote:
      "iGUIDE's conversational AI tutor guides students with Socratic questions instead of handing out shortcuts. Truly built for real learning.",
    authorName: "Prof. Rajeshwar Kulkarni",
    authorRole: "Senior Faculty, Computer Science",
    institution: "Pune",
    initials: "RK",
    accentBg: "#2B64B0",
  },
  {
    quote:
      "Having pre-class comprehension insights lets our teachers spend lecture hours on deeper discussions rather than guessing who is stuck.",
    authorName: "Ananya Deshmukh",
    authorRole: "Academic Coordinator",
    institution: "Hyderabad",
    initials: "AD",
    accentBg: "#16A085",
  },
  {
    quote:
      "I used to hesitate asking basic doubts in class. With iGUIDE, I can explore concepts at my own pace and build genuine confidence.",
    authorName: "Karthik Subramanian",
    authorRole: "Undergraduate Engineering Learner",
    institution: "Chennai",
    initials: "KS",
    accentBg: "#1E4883",
  },
  {
    quote:
      "Clean, formal, and completely aligned with how Indian institutions actually teach. Our faculty adopted it seamlessly.",
    authorName: "Sangeeta Mukherjee",
    authorRole: "Principal & Curriculum Lead",
    institution: "Kolkata",
    initials: "SM",
    accentBg: "#B45309",
  },
  {
    quote:
      "The continuous skill assessment maps prerequisites clearly so every learner knows their exact strengths and next milestone.",
    authorName: "Vikramaditya Nair",
    authorRole: "Programme Director",
    institution: "Kochi",
    initials: "VN",
    accentBg: "#2B64B0",
  },
  {
    quote:
      "Interactive challenges turned revision week into the most engaging part of our semester. Students genuinely look forward to practice.",
    authorName: "Priya Venkatesh",
    authorRole: "Mathematics Educator",
    institution: "Bengaluru",
    initials: "PV",
    accentBg: "#1E4883",
  },
  {
    quote:
      "A thoughtful blend of artificial intelligence and human-centred pedagogy. Educators stay completely in control of the curriculum.",
    authorName: "Arjun Malhotra",
    authorRole: "Director of Digital Learning",
    institution: "New Delhi",
    initials: "AM",
    accentBg: "#16A085",
  },
  {
    quote:
      "Every first-time learner should experience adaptive scaffolding like this—it makes complex analytical topics feel intuitive.",
    authorName: "Kavitha Ramanathan",
    authorRole: "Postgraduate Researcher",
    institution: "Mysuru",
    initials: "KR",
    accentBg: "#1E4883",
  },
  {
    quote:
      "When it comes to educational technology, clarity and trust matter most. iGUIDE delivers transparent, measurable progress.",
    authorName: "Siddharth Rao",
    authorRole: "Head of Institutional Partnerships",
    institution: "Mumbai",
    initials: "SR",
    accentBg: "#2B64B0",
  },
  {
    quote:
      "The experience with iGUIDE has been remarkably smooth. My students stay curious, engaged, and well-prepared for assessments.",
    authorName: "Nandini Sharma",
    authorRole: "Science Faculty",
    institution: "Jaipur",
    initials: "NS",
    accentBg: "#B45309",
  },
];

interface CardSlotConfig {
  /** CSS position classes inside the sticky viewport */
  posClass: string;
  /** Outward X travel in px when zooming past camera */
  dx: number;
  /** Outward Y travel in px when zooming past camera */
  dy: number;
  /** Starting scale at scroll = 0 */
  startScale: number;
  /** Ending scale as card zooms past camera */
  endScale: number;
  /** Starting opacity (outer cards feel deeper/softer initially) */
  startOpacity: number;
  /** Width class */
  widthClass: string;
}

const CARD_SLOTS: CardSlotConfig[] = [
  // Top Row
  {
    posClass: "left-[-2%] top-[3%]",
    dx: -340,
    dy: -220,
    startScale: 0.95,
    endScale: 1.85,
    startOpacity: 0.85,
    widthClass: "w-[270px]",
  },
  {
    posClass: "left-[21%] top-[4%]",
    dx: -160,
    dy: -240,
    startScale: 0.78,
    endScale: 1.55,
    startOpacity: 0.55,
    widthClass: "w-[240px]",
  },
  {
    posClass: "left-[46%] top-[2%]",
    dx: 40,
    dy: -250,
    startScale: 0.92,
    endScale: 1.75,
    startOpacity: 0.8,
    widthClass: "w-[265px]",
  },
  {
    posClass: "right-[1%] top-[4%]",
    dx: 310,
    dy: -210,
    startScale: 0.82,
    endScale: 1.65,
    startOpacity: 0.65,
    widthClass: "w-[250px]",
  },
  // Middle Perimeter (Left & Right)
  {
    posClass: "left-[-3%] top-[39%]",
    dx: -360,
    dy: 0,
    startScale: 0.88,
    endScale: 1.75,
    startOpacity: 0.72,
    widthClass: "w-[255px]",
  },
  {
    posClass: "right-[11%] top-[19%]",
    dx: 250,
    dy: -100,
    startScale: 0.94,
    endScale: 1.85,
    startOpacity: 0.92,
    widthClass: "w-[265px]",
  },
  {
    posClass: "right-[-2%] top-[41%]",
    dx: 360,
    dy: 10,
    startScale: 0.86,
    endScale: 1.72,
    startOpacity: 0.75,
    widthClass: "w-[255px]",
  },
  // Bottom Row
  {
    posClass: "left-[1%] bottom-[5%]",
    dx: -310,
    dy: 220,
    startScale: 0.82,
    endScale: 1.65,
    startOpacity: 0.68,
    widthClass: "w-[250px]",
  },
  {
    posClass: "left-[23%] bottom-[3%]",
    dx: -110,
    dy: 250,
    startScale: 0.94,
    endScale: 1.85,
    startOpacity: 0.9,
    widthClass: "w-[265px]",
  },
  {
    posClass: "right-[21%] bottom-[2%]",
    dx: 120,
    dy: 250,
    startScale: 0.96,
    endScale: 1.9,
    startOpacity: 0.95,
    widthClass: "w-[275px]",
  },
  {
    posClass: "right-[-1%] bottom-[7%]",
    dx: 330,
    dy: 210,
    startScale: 0.86,
    endScale: 1.72,
    startOpacity: 0.78,
    widthClass: "w-[255px]",
  },
];

function ZoomReviewCard({
  card,
  slot,
  progress,
}: {
  card: ReviewCardData;
  slot: CardSlotConfig;
  progress: MotionValue<number>;
}) {
  // Zoom outward & scale up cleanly as user scrolls through 0 -> 0.68
  const scale = useTransform(progress, [0, 0.55, 0.72], [slot.startScale, slot.endScale * 0.88, slot.endScale]);
  const x = useTransform(progress, [0, 0.72], [0, slot.dx]);
  const y = useTransform(progress, [0, 0.72], [0, slot.dy]);
  const opacity = useTransform(
    progress,
    [0, 0.25, 0.52, 0.7],
    [slot.startOpacity, 1, 0.88, 0]
  );

  return (
    <motion.div
      style={{ x, y, scale, opacity, willChange: "transform, opacity" }}
      className={cn(
        "pointer-events-none absolute rounded-2xl border border-border/80 bg-white/95 p-5 shadow-card backdrop-blur-sm",
        slot.posClass,
        slot.widthClass
      )}
    >
      <p className="text-[12.5px] leading-relaxed text-ink-secondary">
        &ldquo;{card.quote}&rdquo;
      </p>
      <div className="mt-3.5 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-subtle"
          style={{ backgroundColor: card.accentBg }}
        >
          {card.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-navy">
            {card.authorName}
          </p>
          <p className="truncate text-[10px] text-ink-muted">
            {card.authorRole}
            {card.institution ? ` · ${card.institution}` : ""}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ScrollZoomReviewsSection({
  testimonials,
  heading = "Trusted by Learners & Educators Across India",
}: {
  testimonials: TestimonialRecord[];
  heading?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring-damped progress for buttery 60fps scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25,
  });

  // Build 11 cards combining CMS testimonials first + curated community voices
  const accentColors = ["#1E4883", "#2B64B0", "#16A085", "#B45309"];
  const cmsMapped: ReviewCardData[] = (testimonials || []).map((t, i) => ({
    id: t.id,
    quote: t.quote,
    authorName: t.authorName,
    authorRole: t.authorRole,
    institution: t.institution,
    initials: t.authorName
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    accentBg: accentColors[i % accentColors.length],
  }));

  const cards: ReviewCardData[] = [...cmsMapped];
  for (let i = 0; cards.length < CARD_SLOTS.length; i++) {
    const fallback = CURATED_COMMUNITY_VOICES[i % CURATED_COMMUNITY_VOICES.length];
    cards.push({
      id: `curated-${i}`,
      ...fallback,
    });
  }

  // Center Headline transforms (visible 0 -> 0.48, gently zooms & fades out)
  const headlineScale = useTransform(smoothProgress, [0, 0.45, 0.56], [0.96, 1.08, 1.24]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.36, 0.52], [1, 1, 0]);
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.14], [1, 0]);

  // Grand iGUIDE Logo Reveal transforms (emerges cleanly 0.50 -> 0.92 right after side reviews zoom out!)
  const logoScale = useTransform(smoothProgress, [0.46, 0.78, 1], [0.58, 1, 1.05]);
  const logoOpacity = useTransform(smoothProgress, [0.46, 0.68, 1], [0, 1, 1]);
  const logoY = useTransform(smoothProgress, [0.46, 0.78], [40, 0]);
  const haloScale = useTransform(smoothProgress, [0.48, 0.85], [0.5, 1.25]);
  const haloOpacity = useTransform(smoothProgress, [0.48, 0.75, 1], [0, 0.85, 0.95]);

  // Paper Airplane cinematic swoop-in flight trajectory (flies in from bottom-left to dock above iGUIDE!)
  const planeX = useTransform(smoothProgress, [0.48, 0.78, 1], [-220, 0, 10]);
  const planeY = useTransform(smoothProgress, [0.48, 0.78, 1], [140, 0, -6]);
  const planeRotate = useTransform(smoothProgress, [0.48, 0.68, 0.82, 1], [-24, -8, 2, -2]);
  const planeScale = useTransform(smoothProgress, [0.48, 0.78, 1], [0.5, 1, 1.04]);
  const trailPathLength = useTransform(smoothProgress, [0.5, 0.82], [0, 1]);
  const trailOpacity = useTransform(smoothProgress, [0.5, 0.68, 0.92, 1], [0, 0.85, 0.55, 0.4]);

  return (
    <section
      id="community-voices"
      className="relative border-y border-border/80 bg-white"
      aria-label="Community Voices and Brand Reveal"
    >
      {/* DESKTOP & TABLET: Full Cinematic Scroll-Driven 3D Zoom Tunnel -> Logo Reveal */}
      {!prefersReducedMotion ? (
        <div
          ref={containerRef}
          className="relative hidden h-[260vh] md:block"
        >
          <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#F9FBFF] to-white">
            {/* Ambient subtle radial glow that blooms when the iGUIDE logo arrives */}
            <motion.div
              style={{ scale: haloScale, opacity: haloOpacity }}
              className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(240,195,42,0.20)_0%,rgba(30,72,131,0.12)_48%,rgba(255,255,255,0)_74%)] blur-2xl"
              aria-hidden="true"
            />

            {/* Layer 1: Surrounding 3D Zooming Review Cards */}
            <div className="pointer-events-none absolute inset-0 mx-auto max-w-[1520px]">
              {CARD_SLOTS.map((slot, idx) => (
                <ZoomReviewCard
                  key={cards[idx].id}
                  card={cards[idx]}
                  slot={slot}
                  progress={smoothProgress}
                />
              ))}
            </div>

            {/* Layer 2: Center Headline ("Trusted by Learners & Educators Across India") */}
            <motion.div
              style={{ scale: headlineScale, opacity: headlineOpacity }}
              className="pointer-events-none relative z-20 mx-auto max-w-2xl px-6 text-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold-light/80 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-navy shadow-subtle">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span>Community Voices</span>
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-[-0.03em] text-navy lg:text-5xl lg:leading-[1.12]">
                {heading}
              </h2>
              <motion.div
                style={{ opacity: scrollHintOpacity }}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted"
              >
                <span>Scroll to explore</span>
                <ChevronDown className="h-4 w-4 animate-bounce text-iris" aria-hidden="true" />
              </motion.div>
            </motion.div>

            {/* Layer 3: Grand Centered iGUIDE Logo Reveal with Flying Paper Airplane Animation */}
            <motion.div
              style={{ scale: logoScale, opacity: logoOpacity, y: logoY }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
            >
              <div className="group relative rounded-[36px] border border-border/80 bg-white/95 px-10 py-8 shadow-elevated backdrop-blur-xl sm:px-14 sm:py-10">
                {/* Animated Golden-Blue Flight Contrail curving behind the soaring paper airplane */}
                <svg
                  viewBox="0 0 340 200"
                  className="pointer-events-none absolute -left-16 -top-8 h-[200px] w-[340px] overflow-visible"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="planeTrailGrad" x1="10" y1="185" x2="215" y2="55" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#1E4883" stopOpacity="0" />
                      <stop offset="55%" stopColor="#2B64B0" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#F0C32A" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 12 185 C 68 170, 96 112, 152 92 C 185 80, 206 66, 224 52"
                    stroke="url(#planeTrailGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="7 7"
                    style={{
                      pathLength: trailPathLength,
                      opacity: trailOpacity,
                    }}
                  />
                </svg>

                {/* Composite Stacked Logo: Flying Paper Airplane (top) + Anchored iGUIDE Wordmark (bottom) */}
                <div className="relative mx-auto flex w-[210px] flex-col items-center sm:w-[250px]">
                  {/* Scroll-driven swoop-in wrapper */}
                  <motion.div
                    style={{
                      x: planeX,
                      y: planeY,
                      rotate: planeRotate,
                      scale: planeScale,
                      willChange: "transform",
                    }}
                    className="relative z-10 w-full"
                  >
                    {/* Continuous lifelike mid-air gliding loop */}
                    <motion.div
                      animate={{
                        y: [0, -10, -3, -12, 0],
                        x: [0, 7, 2, 9, 0],
                        rotate: [0, -4, 1.5, -3.5, 0],
                      }}
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        y: -16,
                        x: 14,
                        rotate: -7,
                        scale: 1.07,
                        transition: { type: "spring", stiffness: 260, damping: 16 },
                      }}
                      className="relative w-full cursor-pointer"
                    >
                      {/* Subtle animated wind streamlines trailing the tail */}
                      <motion.svg
                        viewBox="0 0 80 40"
                        className="pointer-events-none absolute -left-3 bottom-3 h-7 w-14 opacity-70"
                        fill="none"
                        aria-hidden="true"
                        animate={{ opacity: [0.25, 0.8, 0.25], x: [-4, 2, -4] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <path d="M10 26 L44 14" stroke="#F0C32A" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M22 33 L52 22" stroke="#2B64B0" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.65" />
                      </motion.svg>

                      <Image
                        src="/brand/iguide-plane.png"
                        alt="iGUIDE soaring paper airplane"
                        width={250}
                        height={120}
                        unoptimized
                        className="w-full h-auto object-contain drop-shadow-[0_12px_18px_rgba(30,72,131,0.22)]"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Anchored Horizon Lines + iGUIDE Wordmark */}
                  <Image
                    src="/brand/iguide-wordmark.png"
                    alt="iGUIDE"
                    width={250}
                    height={99}
                    unoptimized
                    className="-mt-2.5 w-full h-auto object-contain"
                  />
                </div>
              </div>

              <p className="mt-7 font-heading text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                Where Human Potential Meets{" "}
                <span className="text-iris">Intelligence.</span>
              </p>
              <p className="mt-2 max-w-lg text-sm text-ink-secondary">
                Adaptive, engaging, and accessible learning built for Indian schools, colleges, and universities.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  href="/solutions"
                  className="group inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3 text-xs font-bold text-white shadow-elevated transition hover:-translate-y-0.5 hover:bg-iris-hover sm:text-sm"
                >
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/testimonials"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-xs font-bold text-navy shadow-subtle transition hover:border-iris hover:text-iris sm:text-sm"
                >
                  <span>Read All Perspectives</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}

      {/* MOBILE & REDUCED-MOTION FALLBACK: Clean Editorial Grid + Centered iGUIDE Logo */}
      <div className={cn("py-16 px-4 sm:px-6", !prefersReducedMotion && "md:hidden")}>
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-gold-light/80 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-navy">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span>Community Voices</span>
          </span>
          <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            {heading}
          </h2>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.slice(0, 4).map((card) => (
            <div
              key={card.id}
              className="rounded-2xl border border-border bg-cloud/50 p-5 shadow-subtle"
            >
              <p className="text-xs leading-relaxed text-ink-secondary">
                &ldquo;{card.quote}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: card.accentBg }}
                >
                  {card.initials}
                </span>
                <div>
                  <p className="text-xs font-bold text-navy">{card.authorName}</p>
                  <p className="text-[10px] text-ink-muted">{card.authorRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <div className="rounded-3xl border border-border bg-white px-8 py-6 shadow-elevated">
            <div className="mx-auto flex w-[170px] flex-col items-center">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -8, -2, -10, 0],
                        x: [0, 5, 1, 6, 0],
                        rotate: [0, -4, 1.5, -3, 0],
                      }
                }
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full"
              >
                <Image
                  src="/brand/iguide-plane.png"
                  alt="iGUIDE soaring paper airplane"
                  width={170}
                  height={82}
                  unoptimized
                  className="w-full h-auto object-contain drop-shadow-[0_8px_12px_rgba(30,72,131,0.2)]"
                />
              </motion.div>
              <Image
                src="/brand/iguide-wordmark.png"
                alt="iGUIDE"
                width={170}
                height={67}
                unoptimized
                className="-mt-2 w-full h-auto object-contain"
              />
            </div>
          </div>
          <p className="mt-4 font-heading text-lg font-extrabold text-navy">
            Where Human Potential Meets Intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
