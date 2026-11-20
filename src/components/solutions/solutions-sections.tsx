"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Compass,
  Lightbulb,
  Network,
  Radar,
  Sparkles,
  Waypoints,
} from "lucide-react";
import type { SolutionRecord } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/primitives";

export function SolutionsHeroShowcase({
  solutions,
}: {
  solutions: SolutionRecord[];
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
      {/* Ambient Iris & Intelligence Blue Glow */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_55%_45%,rgba(30,72,131,0.34),rgba(43,100,176,0.20)_45%,rgba(11,16,38,0)_75%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-hero border border-white/15 bg-navy-light/90 p-6 shadow-navy backdrop-blur-xl sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-success" />
            <span className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-200">
              iGUIDE Solution Architecture · 01–06
            </span>
          </div>
          <span className="rounded-full border border-iris/40 bg-iris/20 px-3 py-1 text-[11px] font-medium text-lavender">
            Connected Product Vision
          </span>
        </div>

        {/* Animated Abstract Learning Nodes & Floating Visual Panels */}
        <div className="relative my-5 overflow-hidden rounded-2xl border border-white/10 bg-navy p-5">
          <svg
            viewBox="0 0 540 215"
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label="Animated abstract learning nodes connecting all six iGUIDE educational solutions"
          >
            <defs>
              <linearGradient
                id="solHeroLineGrad"
                x1="30"
                y1="175"
                x2="510"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#2B64B0" />
                <stop offset="50%" stopColor="#1E4883" />
                <stop offset="100%" stopColor="#16A085" />
              </linearGradient>
            </defs>

            {/* Subtle background grid */}
            <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
              <line x1="0" y1="54" x2="540" y2="54" />
              <line x1="0" y1="108" x2="540" y2="108" />
              <line x1="0" y1="162" x2="540" y2="162" />
            </g>

            {/* Secondary constellation links */}
            <path
              d="M 55 162 L 150 75 L 255 142 L 350 62 L 435 128 L 495 45"
              stroke="rgba(240,195,42,0.26)"
              strokeWidth="1.75"
              strokeDasharray="5 5"
              fill="none"
            />

            {/* Primary Intelligence Path */}
            <motion.path
              d="M 55 162 C 110 155, 120 75, 150 75 C 195 75, 210 142, 255 142 C 300 142, 315 62, 350 62 C 390 62, 405 128, 435 128 C 468 128, 475 45, 495 45"
              stroke="url(#solHeroLineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              initial={
                prefersReducedMotion ? false : { pathLength: 0.2, opacity: 0.5 }
              }
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Six Solution Nodes */}
            {[
              { cx: 55, cy: 162, num: "01", label: "Personalised", color: "#1E4883" },
              { cx: 150, cy: 75, num: "02", label: "AI Tutors", color: "#2B64B0" },
              { cx: 255, cy: 142, num: "03", label: "Assessment", color: "#F0C32A" },
              { cx: 350, cy: 62, num: "04", label: "Gamified", color: "#16A085" },
              { cx: 435, cy: 128, num: "05", label: "Analytics", color: "#2B64B0" },
              { cx: 495, cy: 45, num: "06", label: "Institutional", color: "#1E4883" },
            ].map((node, i) => (
              <g key={node.num}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="18"
                  fill={node.color}
                  fillOpacity="0.18"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="9.5"
                  fill={node.color}
                  stroke="#FAFBFF"
                  strokeWidth="2.5"
                />
                <text
                  x={node.cx}
                  y={i % 2 === 0 ? node.cy + 26 : node.cy - 16}
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="10.5"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {node.num} · {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Floating Quick-Jump Visual Panels */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {solutions.slice(0, 6).map((sol, idx) => (
            <a
              key={sol.id}
              href={`#solution-0${idx + 1}`}
              className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-left transition hover:border-lavender/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-iris/25 font-heading text-[11px] font-bold text-lavender group-hover:bg-iris group-hover:text-white">
                0{idx + 1}
              </span>
              <span className="truncate text-xs font-semibold text-white">
                {sol.shortTitle || sol.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const SOLUTION_VISUAL_MAP = [
  {
    src: "/images/solution-personalised-learning.jpg",
    tag: "Adaptive Pathways · Individual Pacing",
    caption: "Dynamic conceptual scaffolding tailored to each learner's baseline and tempo.",
  },
  {
    src: "/images/solution-ai-tutors.jpg",
    tag: "Conversational Intelligence · Socratic Guidance",
    caption: "24/7 guided inquiry designed to build independent reasoning rather than passive shortcuts.",
  },
  {
    src: "/images/solution-skill-assessment.jpg",
    tag: "Competency Diagnostics · Continuous Mapping",
    caption: "Precision skill radar and formative checkpoints illuminating mastery across prerequisites.",
  },
  {
    src: "/images/solution-gamified-learning.jpg",
    tag: "Interactive Engagement · Conceptual Challenges",
    caption: "Structured logic quests, puzzles, and milestones that turn curiosity into active mastery.",
  },
  {
    src: "/images/solution-learning-analytics.jpg",
    tag: "Pedagogical Insights · Cohort Visibility",
    caption: "Privacy-conscious comprehension telemetry helping educators spot knowledge gaps early.",
  },
  {
    src: "/images/solution-institutional-solutions.jpg",
    tag: "Campus Architecture · Scalable Deployment",
    caption: "Unified AI learning infrastructure built for schools, colleges, universities, and training hubs.",
  },
];

export function SolutionThematicVisual({
  slug,
  index,
  title,
}: {
  slug: string;
  index: number;
  title: string;
}) {
  const key = slug.toLowerCase();
  const visual =
    key.includes("personalised")
      ? SOLUTION_VISUAL_MAP[0]
      : key.includes("tutor")
      ? SOLUTION_VISUAL_MAP[1]
      : key.includes("assessment")
      ? SOLUTION_VISUAL_MAP[2]
      : key.includes("gamif")
      ? SOLUTION_VISUAL_MAP[3]
      : key.includes("analytic")
      ? SOLUTION_VISUAL_MAP[4]
      : SOLUTION_VISUAL_MAP[index % SOLUTION_VISUAL_MAP.length] ||
        SOLUTION_VISUAL_MAP[5];

  return (
    <div className="group relative overflow-hidden rounded-hero border border-border bg-navy p-5 text-cloud shadow-elevated sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
            0{index + 1} · {title}
          </span>
        </div>
        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-slate-200">
          {visual.tag}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 bg-navy-light">
        <Image
          src={visual.src}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-3">
          <p className="text-xs leading-snug text-slate-100 drop-shadow-sm">
            {visual.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SolutionShowcaseReveal({
  children,
  id,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ConnectedEcosystemDiagram({
  solutions,
}: {
  solutions: SolutionRecord[];
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const coreSix = solutions.slice(0, 6);
  const current = coreSix[selectedIdx] ?? coreSix[0];

  const relationshipNotes = [
    "Adapts learning routes using insights from Skill Assessment and Learning Analytics.",
    "Provides conversational Socratic guidance along each student's Personalised Learning pathway.",
    "Evaluates competencies continuously and feeds readiness signals into Personalised Learning and Analytics.",
    "Reinforces conceptual mastery through interactive puzzles, riddles, and challenges.",
    "Synthesises progress and knowledge-gap insights across pathways, assessments, and activities.",
    "Unifies all capabilities into a scalable ecosystem for Schools, Colleges, Universities, and Training Organisations.",
  ];

  return (
    <div className="mt-14 rounded-hero border border-white/15 bg-navy-light/80 p-6 shadow-navy sm:p-10">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        {/* Left 7 Columns: Responsive SVG Connected-Node Diagram */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-navy p-4 sm:p-6">
            <svg
              viewBox="0 0 600 360"
              className="h-auto w-full"
              role="img"
              aria-label="Connected learning ecosystem diagram linking all six iGUIDE offerings around a shared vision"
            >
              <defs>
                <linearGradient
                  id="ecoHubGrad"
                  x1="80"
                  y1="60"
                  x2="520"
                  y2="300"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#2B64B0" />
                  <stop offset="50%" stopColor="#1E4883" />
                  <stop offset="100%" stopColor="#16A085" />
                </linearGradient>
              </defs>

              {/* Outer Orbital Ring */}
              <ellipse
                cx="300"
                cy="180"
                rx="215"
                ry="125"
                stroke="url(#ecoHubGrad)"
                strokeOpacity="0.45"
                strokeWidth="2.5"
                fill="none"
              />
              <ellipse
                cx="300"
                cy="180"
                rx="135"
                ry="78"
                stroke="#2B64B0"
                strokeOpacity="0.2"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                fill="none"
              />

              {/* Spokes from Center Vision Hub to the 6 Solution Nodes */}
              {[
                { x: 300, y: 55 },
                { x: 486, y: 118 },
                { x: 486, y: 242 },
                { x: 300, y: 305 },
                { x: 114, y: 242 },
                { x: 114, y: 118 },
              ].map((pt, idx) => (
                <line
                  key={idx}
                  x1="300"
                  y1="180"
                  x2={pt.x}
                  y2={pt.y}
                  stroke={selectedIdx === idx ? "#F0C32A" : "#273669"}
                  strokeWidth={selectedIdx === idx ? "3" : "1.5"}
                />
              ))}

              {/* Central Shared Vision Hub */}
              <circle
                cx="300"
                cy="180"
                r="48"
                fill="#131C3E"
                stroke="#1E4883"
                strokeWidth="3"
              />
              <text
                x="300"
                y="176"
                textAnchor="middle"
                fill="#F0C32A"
                fontSize="10"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                SHARED VISION
              </text>
              <text
                x="300"
                y="192"
                textAnchor="middle"
                fill="#FAFBFF"
                fontSize="12"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
              >
                iGUIDE Core
              </text>

              {/* Six Interactive Orbital Nodes */}
              {[
                { x: 300, y: 55, color: "#1E4883" },
                { x: 486, y: 118, color: "#2B64B0" },
                { x: 486, y: 242, color: "#F0C32A" },
                { x: 300, y: 305, color: "#16A085" },
                { x: 114, y: 242, color: "#2B64B0" },
                { x: 114, y: 118, color: "#1E4883" },
              ].map((pt, idx) => {
                const sol = coreSix[idx];
                if (!sol) return null;
                const isSelected = selectedIdx === idx;
                return (
                  <g
                    key={sol.id}
                    onClick={() => setSelectedIdx(idx)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${sol.shortTitle || sol.title} in ecosystem diagram`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedIdx(idx);
                      }
                    }}
                  >
                    <rect
                      x={pt.x - 68}
                      y={pt.y - 22}
                      width="136"
                      height="44"
                      rx="14"
                      fill={isSelected ? "#1E4883" : "#101836"}
                      stroke={isSelected ? "#FAFBFF" : pt.color}
                      strokeWidth={isSelected ? "2.5" : "2"}
                    />
                    <text
                      x={pt.x}
                      y={pt.y + 4}
                      textAnchor="middle"
                      fill="#FAFBFF"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      0{idx + 1}. {(sol.shortTitle || sol.title).split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right 5 Columns: Selected Capability Relationship Inspector */}
        <div className="flex flex-col justify-between space-y-5 lg:col-span-5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {coreSix.map((sol, idx) => (
              <button
                key={sol.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                  selectedIdx === idx
                    ? "border-iris bg-iris text-white shadow-subtle"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white"
                )}
              >
                0{idx + 1}. {sol.shortTitle || sol.title}
              </button>
            ))}
          </div>

          {current && (
            <div className="rounded-feature border border-white/12 bg-white/[0.05] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-iris/25 text-lavender">
                  <DynamicIcon name={current.iconName} className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-lavender">
                    Capability 0{selectedIdx + 1} · {current.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-200">
                {current.summary}
              </p>

              <div className="mt-4 rounded-xl border border-iris/30 bg-iris/15 p-3.5 text-xs text-slate-200">
                <strong className="block text-lavender">
                  Ecosystem Relationship:
                </strong>
                <span className="mt-1 block">
                  {relationshipNotes[selectedIdx] || relationshipNotes[0]}
                </span>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <Link
                  href={`/solutions/${current.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-lavender hover:text-white"
                >
                  <span>Explore {current.shortTitle || current.title}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function InstitutionalImpactEstimator() {
  const [cohortSize, setCohortSize] = useState<number>(2500);

  const hoursReclaimed = Math.round(cohortSize * 0.58);
  const gapsResolved = Math.min(94, Math.round(82 + (cohortSize / 25000) * 10));

  return (
    <div className="mt-16 overflow-hidden rounded-hero border border-border bg-white shadow-elevated">
      <div className="border-b border-border bg-subtle-gradient p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-iris">
              Institutional Capacity Simulator
            </span>
            <h3 className="mt-1 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
              Model Your Campus Impact
            </h3>
            <p className="mt-1 max-w-xl text-xs text-ink-secondary sm:text-sm">
              Adjust student cohort volume to estimate faculty hours reclaimed and diagnostic gap remediation velocity.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-iris/25 bg-iris-light px-3.5 py-1 text-xs font-bold text-iris">
            <Sparkles className="h-3.5 w-3.5" />
            Empirical Model v2.4
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Slider Controls */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between">
              <label htmlFor="cohort-slider" className="text-xs font-bold uppercase tracking-wider text-ink">
                Active Student Cohort:
              </label>
              <span className="font-heading text-xl font-extrabold text-iris">
                {cohortSize.toLocaleString()} Learners
              </span>
            </div>

            <input
              id="cohort-slider"
              type="range"
              min="500"
              max="20000"
              step="500"
              value={cohortSize}
              onChange={(e) => setCohortSize(Number(e.target.value))}
              className="mt-4 h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-border accent-iris"
            />

            <div className="mt-2 flex justify-between text-[11px] text-ink-muted">
              <span>500 (Department)</span>
              <span>10,000</span>
              <span>20,000+ (Enterprise)</span>
            </div>

            {/* Quick preset buttons */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "1,000 Dept", val: 1000 },
                { label: "2,500 College", val: 2500 },
                { label: "7,500 University", val: 7500 },
                { label: "15,000 Campus", val: 15000 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setCohortSize(preset.val)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-xs font-semibold transition",
                    cohortSize === preset.val
                      ? "border-iris bg-iris text-white shadow-subtle"
                      : "border-border bg-cloud text-ink-secondary hover:border-iris/40 hover:text-ink"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Impact Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
            <div className="rounded-2xl border border-border bg-cloud/50 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-iris">
                Faculty Time Reclaimed
              </span>
              <p className="mt-1 font-heading text-2xl font-extrabold text-ink">
                ~{hoursReclaimed.toLocaleString()} <span className="text-sm font-semibold text-ink-muted">hrs/yr</span>
              </p>
              <p className="mt-1 text-[11px] leading-snug text-ink-secondary">
                Saved from repetitive grading &amp; spent in high-touch mentorship.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-cloud/50 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-success">
                Early Gap Remediation
              </span>
              <p className="mt-1 font-heading text-2xl font-extrabold text-emerald-success">
                {gapsResolved}%
              </p>
              <p className="mt-1 text-[11px] leading-snug text-ink-secondary">
                Prerequisite bottlenecks resolved prior to summative assessments.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-cloud/50 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-intelligence">
                Interoperability
              </span>
              <p className="mt-1 font-heading text-2xl font-extrabold text-ink">
                100% LTI 1.3
              </p>
              <p className="mt-1 text-[11px] leading-snug text-ink-secondary">
                Native roster sync with Canvas, Moodle, Blackboard &amp; Brightspace.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-ink-secondary">
            * Estimates based on pilot cohort data with human-in-the-loop educator validation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white shadow-subtle transition hover:bg-iris"
          >
            <span>Request Campus Pilot Blueprint</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
