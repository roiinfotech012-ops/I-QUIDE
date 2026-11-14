"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Compass,
  GraduationCap,
  Layers,
  Lightbulb,
  Network,
  Radar,
  Sparkles,
  Users,
  Waypoints,
} from "lucide-react";
import type { SolutionRecord } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/primitives";

export function SolutionDetailHeroVisual({
  solution,
}: {
  solution: SolutionRecord;
}) {
  const prefersReducedMotion = useReducedMotion();
  const slug = solution.slug.toLowerCase();
  const [tutorState, setTutorState] = useState<
    "question" | "guidance" | "exploration"
  >("guidance");

  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
      {/* Ambient Themed Glow */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_55%_45%,rgba(99,91,255,0.34),rgba(56,123,250,0.20)_45%,rgba(11,16,38,0)_75%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-hero border border-white/15 bg-navy-light/90 p-6 text-cloud shadow-navy backdrop-blur-xl sm:p-8">
        {/* Top Conceptual Studio Header */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-iris" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender">
              {solution.shortTitle || solution.title} · Conceptual Architecture
            </span>
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-0.5 text-[10px] font-medium text-slate-300">
            Illustrative Concept Showcase
          </span>
        </div>

        {/* =================================================================
            1. PERSONALISED LEARNING
            Branching learning pathways, progressive content tiles, and
            individual learning journeys.
           ================================================================= */}
        {slug === "personalised-learning" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-navy p-5">
              <div className="mb-3 flex items-center justify-between text-[11px] text-slate-300">
                <span className="font-semibold text-white">
                  Branching Learning Pathway Graph
                </span>
                <span className="text-lavender">
                  Individualised Route Calibration
                </span>
              </div>

              <svg
                viewBox="0 0 520 190"
                className="h-auto w-full"
                role="img"
                aria-label="Conceptual branching learning pathways and individual learning journey"
              >
                <defs>
                  <linearGradient
                    id="detailPlGrad"
                    x1="30"
                    y1="95"
                    x2="490"
                    y2="95"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#387BFA" />
                    <stop offset="50%" stopColor="#635BFF" />
                    <stop offset="100%" stopColor="#16A085" />
                  </linearGradient>
                </defs>

                {/* Upper Branch: Visual & Diagrammatic Route */}
                <path
                  d="M 48 95 C 135 95, 160 36, 260 36 C 360 36, 385 95, 472 95"
                  stroke="#387BFA"
                  strokeWidth="2.2"
                  strokeDasharray="6 5"
                  fill="none"
                />

                {/* Central Adaptive Journey */}
                <motion.path
                  d="M 48 95 C 150 95, 185 95, 260 95 C 335 95, 370 95, 472 95"
                  stroke="url(#detailPlGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { pathLength: 0.25, opacity: 0.5 }
                  }
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.3, ease: "easeOut" }}
                />

                {/* Lower Branch: Foundational Prerequisite Scaffold */}
                <path
                  d="M 48 95 C 135 95, 160 154, 260 154 C 360 154, 385 95, 472 95"
                  stroke="#A78BFA"
                  strokeWidth="2.2"
                  strokeDasharray="6 5"
                  fill="none"
                />

                {/* Origin Node */}
                <circle cx="48" cy="95" r="10" fill="#387BFA" />
                <text
                  x="48"
                  y="124"
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="10"
                  fontWeight="600"
                >
                  Learner Profile
                </text>

                {/* Upper Node Label */}
                <rect
                  x="192"
                  y="12"
                  width="136"
                  height="30"
                  rx="9"
                  fill="#152248"
                  stroke="#387BFA"
                />
                <text
                  x="260"
                  y="31"
                  textAnchor="middle"
                  fill="#E0F2FE"
                  fontSize="10.5"
                  fontWeight="600"
                >
                  Visual Analogy Branch
                </text>

                {/* Center Node */}
                <circle
                  cx="260"
                  cy="95"
                  r="13"
                  fill="#635BFF"
                  stroke="#FAFBFF"
                  strokeWidth="3"
                />
                <text
                  x="260"
                  y="73"
                  textAnchor="middle"
                  fill="#A78BFA"
                  fontSize="10"
                  fontWeight="700"
                >
                  Adaptive Pacing Node
                </text>

                {/* Lower Node Label */}
                <rect
                  x="188"
                  y="140"
                  width="144"
                  height="30"
                  rx="9"
                  fill="#1C204B"
                  stroke="#A78BFA"
                />
                <text
                  x="260"
                  y="159"
                  textAnchor="middle"
                  fill="#F3EFFE"
                  fontSize="10.5"
                  fontWeight="600"
                >
                  Prerequisite Refresher
                </text>

                {/* Destination Mastery Node */}
                <circle
                  cx="472"
                  cy="95"
                  r="11"
                  fill="#16A085"
                  stroke="#FAFBFF"
                  strokeWidth="2.5"
                />
                <text
                  x="472"
                  y="124"
                  textAnchor="middle"
                  fill="#16A085"
                  fontSize="10"
                  fontWeight="700"
                >
                  Concept Mastery
                </text>
              </svg>
            </div>

            {/* Progressive Content Tiles */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  step: "Tile 01",
                  title: "Individual Needs",
                  desc: "Adapts to baseline familiarity & pace",
                },
                {
                  step: "Tile 02",
                  title: "Adaptive Pathway",
                  desc: "Multi-modal visual & guided routes",
                },
                {
                  step: "Tile 03",
                  title: "Learner Journey",
                  desc: "Supportive, confidence-led progression",
                },
              ].map((tile) => (
                <div
                  key={tile.step}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lavender">
                    {tile.step}
                  </span>
                  <p className="mt-1 font-heading text-xs font-bold text-white">
                    {tile.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-300">
                    {tile.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            2. AI TUTORS
            Premium conceptual conversational interface with Question,
            Guidance, and Exploration states.
            (Concept showcase only — not a live chatbot)
           ================================================================= */}
        {slug === "ai-tutors" && (
          <div className="space-y-4">
            {/* State Selector Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-navy p-2">
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    { id: "question", label: "01. Question State" },
                    { id: "guidance", label: "02. Guidance State" },
                    { id: "exploration", label: "03. Exploration State" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTutorState(tab.id)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                      tutorState === tab.id
                        ? "bg-iris text-white shadow-subtle"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <span className="px-2 text-[10px] font-medium text-lavender">
                Static Concept Preview
              </span>
            </div>

            {/* Conceptual Dialogue Canvas */}
            <div className="space-y-3.5 rounded-2xl border border-white/10 bg-navy p-5">
              {tutorState === "question" && (
                <>
                  <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-sky-intel/35 bg-sky-intel/15 p-3.5 text-xs text-slate-100">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-sky-300">
                      Learner Question State
                    </span>
                    &ldquo;Why does the rate of a chemical reaction increase
                    when temperature rises, beyond molecules simply moving
                    faster?&rdquo;
                  </div>
                  <div className="max-w-[88%] rounded-2xl rounded-tl-sm border border-iris/40 bg-iris/15 p-3.5 text-xs text-slate-100">
                    <span className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-lavender">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      iGUIDE Tutoring Concept · Context Framing
                    </span>
                    &ldquo;Great question. Movement speed is part of the story,
                    but let&apos;s look at the{" "}
                    <strong className="text-white">
                      activation energy threshold
                    </strong>{" "}
                    required for a collision to form new bonds.&rdquo;
                  </div>
                </>
              )}

              {tutorState === "guidance" && (
                <>
                  <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-iris/40 bg-iris/15 p-4 text-xs text-slate-100">
                    <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-lavender">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      iGUIDE Guided Socratic Prompt
                    </span>
                    <p className="leading-relaxed">
                      &ldquo;Imagine rolling a ball over a hill. If two
                      molecules collide gently, they bounce apart. What happens
                      when thermal energy increases the{" "}
                      <strong className="text-white">
                        proportion of particles
                      </strong>{" "}
                      that have enough energy to cross the hill?&rdquo;
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[11px] text-slate-200">
                      <span className="block font-semibold text-lavender">
                        Scaffolded Hint
                      </span>
                      Compare collision frequency vs. activation energy barrier.
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-[11px] text-slate-200">
                      <span className="block font-semibold text-emerald-300">
                        Pedagogical Goal
                      </span>
                      Prompts active reasoning rather than giving a pre-written
                      essay.
                    </div>
                  </div>
                </>
              )}

              {tutorState === "exploration" && (
                <>
                  <div className="max-w-[92%] rounded-2xl border border-emerald-success/35 bg-emerald-success/10 p-4 text-xs text-slate-100">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      Guided Educational Exploration State
                    </span>
                    <p className="leading-relaxed">
                      Connected concept unlocked:{" "}
                      <strong className="text-white">
                        Maxwell–Boltzmann Energy Distribution
                      </strong>
                      . Explore how shifting the curve changes the shaded area
                      above activation energy.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Explore Visual Curve Analogy",
                      "Try a Guided Concept Check",
                      "Connect to Catalysis Topic",
                    ].map((pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-200"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Note: This illustration demonstrates the iGUIDE AI Tutors solution
              concept and is not an interactive chatbot.
            </p>
          </div>
        )}

        {/* =================================================================
            3. SKILL ASSESSMENT
            Elegant competency map with assessment categories, skill
            indicators, and learning insights.
           ================================================================= */}
        {slug === "skill-assessment" && (
          <div className="space-y-4">
            <div className="grid items-center gap-5 rounded-2xl border border-white/10 bg-navy p-5 sm:grid-cols-12">
              <div className="sm:col-span-6">
                <svg
                  viewBox="0 0 220 200"
                  className="mx-auto h-auto w-full max-w-[210px]"
                  role="img"
                  aria-label="Conceptual competency map across four educational skill dimensions"
                >
                  <polygon
                    points="110,20 192,100 110,180 28,100"
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points="110,50 162,100 110,150 58,100"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="110"
                    y1="20"
                    x2="110"
                    y2="180"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <line
                    x1="28"
                    y1="100"
                    x2="192"
                    y2="100"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <polygon
                    points="110,32 178,100 110,158 52,100"
                    fill="rgba(99,91,255,0.32)"
                    stroke="#A78BFA"
                    strokeWidth="2.5"
                  />
                  <circle cx="110" cy="32" r="5" fill="#16A085" />
                  <circle cx="178" cy="100" r="5" fill="#387BFA" />
                  <circle cx="110" cy="158" r="5" fill="#635BFF" />
                  <circle cx="52" cy="100" r="5" fill="#F39C12" />
                </svg>
              </div>

              <div className="space-y-2.5 sm:col-span-6">
                {[
                  {
                    category: "Conceptual Foundations",
                    indicator: "Demonstrated Strength",
                    badgeClass: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
                  },
                  {
                    category: "Analytical Application",
                    indicator: "Strong Progression",
                    badgeClass: "text-sky-300 border-sky-400/30 bg-sky-400/10",
                  },
                  {
                    category: "Multi-Step Synthesis",
                    indicator: "Developing Competency",
                    badgeClass: "text-lavender border-iris/40 bg-iris/20",
                  },
                  {
                    category: "Prerequisite Linkage",
                    indicator: "Opportunity for Review",
                    badgeClass: "text-amber-300 border-amber-400/30 bg-amber-400/10",
                  },
                ].map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
                  >
                    <span className="text-xs font-semibold text-white">
                      {item.category}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                        item.badgeClass
                      )}
                    >
                      {item.indicator}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-slate-300">
              <strong className="text-lavender">Learning Insight:</strong>{" "}
              Continuous competency mapping highlights both demonstrated
              strengths and focused areas for development.
            </div>
          </div>
        )}

        {/* =================================================================
            4. GAMIFIED LEARNING
            Sophisticated interactive challenge illustrations, achievement
            symbols, and puzzle-inspired design.
           ================================================================= */}
        {slug === "gamified-learning" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-navy p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Conceptual Logic & Riddle Studio
                </span>
                <span className="text-[11px] font-medium text-lavender">
                  Refined Challenge Architecture
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  {
                    type: "Educational Puzzle",
                    title: "Pattern Symmetry",
                    desc: "Connect geometric sequences to algebraic rules.",
                    symbol: "◆",
                    accent: "border-iris/40 bg-iris/15 text-lavender",
                  },
                  {
                    type: "Conceptual Riddle",
                    title: "Conservation Paradox",
                    desc: "Deduce the missing variable in a closed system.",
                    symbol: "◈",
                    accent: "border-sky-400/40 bg-sky-400/15 text-sky-300",
                  },
                  {
                    type: "Interactive Challenge",
                    title: "Hypothesis Trial",
                    desc: "Test conditions to unlock the synthesis milestone.",
                    symbol: "✦",
                    accent:
                      "border-emerald-400/40 bg-emerald-400/15 text-emerald-300",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {card.type}
                      </span>
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-lg border text-xs font-bold",
                          card.accent
                        )}
                      >
                        {card.symbol}
                      </span>
                    </div>
                    <p className="mt-2 font-heading text-sm font-bold text-white">
                      {card.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Conceptual illustration of puzzle-inspired engagement — designed
              with sophistication rather than juvenile game mechanics.
            </p>
          </div>
        )}

        {/* =================================================================
            5. LEARNING ANALYTICS
            Polished conceptual learning analytics dashboard with charts,
            progress indicators, and competency visuals.
            (Clearly illustrative, not live learner data)
           ================================================================= */}
        {slug === "learning-analytics" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-navy p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-white">
                  Conceptual Progress & Knowledge-Gap Overview
                </span>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-200">
                  Illustrative Mockup · Not Live Learner Data
                </span>
              </div>

              <svg
                viewBox="0 0 500 145"
                className="h-auto w-full"
                role="img"
                aria-label="Illustrative learning analytics chart showing conceptual progress and knowledge-gap identification"
              >
                <defs>
                  <linearGradient
                    id="laAreaGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="145"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#635BFF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#635BFF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line
                  x1="20"
                  y1="35"
                  x2="480"
                  y2="35"
                  stroke="rgba(255,255,255,0.06)"
                />
                <line
                  x1="20"
                  y1="75"
                  x2="480"
                  y2="75"
                  stroke="rgba(255,255,255,0.06)"
                />
                <line
                  x1="20"
                  y1="115"
                  x2="480"
                  y2="115"
                  stroke="rgba(255,255,255,0.06)"
                />

                <path
                  d="M 30 112 C 115 104, 175 82, 250 74 C 325 66, 395 42, 470 28 L 470 130 L 30 130 Z"
                  fill="url(#laAreaGrad)"
                />
                <path
                  d="M 30 112 C 115 104, 175 82, 250 74 C 325 66, 395 42, 470 28"
                  stroke="#387BFA"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Knowledge Gap Highlight Callout */}
                <circle
                  cx="250"
                  cy="74"
                  r="7"
                  fill="#F39C12"
                  stroke="#FAFBFF"
                  strokeWidth="2"
                />
                <rect
                  x="175"
                  y="30"
                  width="150"
                  height="26"
                  rx="8"
                  fill="#182246"
                  stroke="#F39C12"
                />
                <text
                  x="250"
                  y="47"
                  textAnchor="middle"
                  fill="#FDE68A"
                  fontSize="10"
                  fontWeight="600"
                >
                  Prerequisite Gap Flagged
                </text>

                <circle
                  cx="470"
                  cy="28"
                  r="6"
                  fill="#16A085"
                  stroke="#FAFBFF"
                  strokeWidth="2"
                />
              </svg>

              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {[
                  {
                    label: "Progress Tracking",
                    note: "Topic milestone flow",
                  },
                  {
                    label: "Knowledge Gaps",
                    note: "Early concept alerts",
                  },
                  {
                    label: "Educator Insights",
                    note: "Data-informed direction",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5"
                  >
                    <p className="text-[11px] font-bold text-white">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-300">
                      {stat.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
            6. INSTITUTIONAL SOLUTIONS
            Connected learning ecosystem with institutional nodes,
            educators, and learner pathways.
           ================================================================= */}
        {slug === "institutional-solutions" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-navy p-5">
              <svg
                viewBox="0 0 520 195"
                className="h-auto w-full"
                role="img"
                aria-label="Connected institutional learning ecosystem linking schools, higher education, training organisations, educators, and learners"
              >
                <ellipse
                  cx="260"
                  cy="98"
                  rx="190"
                  ry="72"
                  fill="none"
                  stroke="rgba(99,91,255,0.35)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* Connecting Spokes */}
                <line
                  x1="260"
                  y1="98"
                  x2="95"
                  y2="48"
                  stroke="#387BFA"
                  strokeWidth="2"
                />
                <line
                  x1="260"
                  y1="98"
                  x2="425"
                  y2="48"
                  stroke="#A78BFA"
                  strokeWidth="2"
                />
                <line
                  x1="260"
                  y1="98"
                  x2="95"
                  y2="148"
                  stroke="#16A085"
                  strokeWidth="2"
                />
                <line
                  x1="260"
                  y1="98"
                  x2="425"
                  y2="148"
                  stroke="#635BFF"
                  strokeWidth="2"
                />

                {/* Central Hub */}
                <rect
                  x="185"
                  y="72"
                  width="150"
                  height="52"
                  rx="16"
                  fill="#635BFF"
                  stroke="#FAFBFF"
                  strokeWidth="2"
                />
                <text
                  x="260"
                  y="95"
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="12"
                  fontWeight="700"
                >
                  iGUIDE Ecosystem
                </text>
                <text
                  x="260"
                  y="112"
                  textAnchor="middle"
                  fill="#E0E7FF"
                  fontSize="9.5"
                >
                  Educators · Learners · Insights
                </text>

                {/* Node 1: Schools */}
                <rect
                  x="25"
                  y="26"
                  width="135"
                  height="42"
                  rx="11"
                  fill="#152248"
                  stroke="#387BFA"
                />
                <text
                  x="92"
                  y="51"
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="11"
                  fontWeight="600"
                >
                  Schools (K–12)
                </text>

                {/* Node 2: Colleges & Universities */}
                <rect
                  x="355"
                  y="26"
                  width="145"
                  height="42"
                  rx="11"
                  fill="#152248"
                  stroke="#A78BFA"
                />
                <text
                  x="427"
                  y="51"
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="11"
                  fontWeight="600"
                >
                  Higher Education
                </text>

                {/* Node 3: Training Organisations */}
                <rect
                  x="25"
                  y="128"
                  width="145"
                  height="42"
                  rx="11"
                  fill="#152248"
                  stroke="#16A085"
                />
                <text
                  x="97"
                  y="153"
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="11"
                  fontWeight="600"
                >
                  Training Organisations
                </text>

                {/* Node 4: Scalable Pathways */}
                <rect
                  x="355"
                  y="128"
                  width="145"
                  height="42"
                  rx="11"
                  fill="#152248"
                  stroke="#635BFF"
                />
                <text
                  x="427"
                  y="153"
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="11"
                  fontWeight="600"
                >
                  Learner Pathways
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* Fallback for any custom CMS-created solution slug */}
        {![
          "personalised-learning",
          "ai-tutors",
          "skill-assessment",
          "gamified-learning",
          "learning-analytics",
          "institutional-solutions",
        ].includes(slug) && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-navy">
            <Image
              src={solution.heroImage || "/visuals/solution-adaptive-engine.svg"}
              alt={solution.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function SolutionOverviewComposition({
  solution,
}: {
  solution: SolutionRecord;
}) {
  const pillars =
    solution.overviewPillars && solution.overviewPillars.length > 0
      ? solution.overviewPillars
      : solution.keyCapabilities.slice(0, 4).map((c) => c.title);

  return (
    <div className="grid items-center gap-12 lg:grid-cols-12">
      {/* Left 6 Columns: Narrative Overview + Core Pillars */}
      <div className="lg:col-span-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-iris/20 bg-lavender-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-iris">
          <span className="h-1.5 w-1.5 rounded-full bg-iris" />
          <span>SOLUTION OVERVIEW</span>
        </span>

        <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {solution.overviewHeading ||
            `Designed to Support Meaningful ${solution.shortTitle || solution.title}.`}
        </h2>

        {solution.overviewLead && (
          <p className="mt-4 text-base font-medium leading-relaxed text-ink">
            {solution.overviewLead}
          </p>
        )}

        <p className="mt-4 text-base leading-relaxed text-ink-secondary">
          {solution.description}
        </p>

        {/* Key Thematic Focus Areas */}
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Key Focus Areas
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar}
                className="flex items-center gap-3 rounded-2xl border border-border bg-cloud px-4 py-3 text-sm font-semibold text-ink shadow-subtle"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-iris/15 font-heading text-xs font-bold text-iris">
                  0{idx + 1}
                </span>
                <span className="capitalize">{pillar}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right 6 Columns: Polished Media & Challenge-Approach-Outcome Composition */}
      <div className="space-y-6 lg:col-span-6">
        {/* Desktop & Mobile Hero Media Frame */}
        <div className="overflow-hidden rounded-hero border border-border bg-navy p-4 shadow-card">
          {/* Desktop Media */}
          <div className="relative hidden aspect-[16/9] w-full overflow-hidden rounded-2xl bg-navy-light sm:block">
            <Image
              src={solution.heroImage || "/visuals/solution-adaptive-engine.svg"}
              alt={`${solution.title} conceptual visual`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* Mobile Media */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy-light sm:hidden">
            <Image
              src={
                solution.mobileHeroImage ||
                solution.heroImage ||
                "/visuals/solution-adaptive-engine.svg"
              }
              alt={`${solution.title} mobile conceptual visual`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Educational Context & Intended Approach Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-subtle">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Educational Context
            </span>
            <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
              {solution.challengeText}
            </p>
          </div>
          <div className="rounded-2xl border border-iris/30 bg-lavender-soft/45 p-5 shadow-subtle">
            <span className="text-[11px] font-bold uppercase tracking-wider text-iris">
              iGUIDE Direction
            </span>
            <p className="mt-2 text-xs leading-relaxed text-ink">
              {solution.approachText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
