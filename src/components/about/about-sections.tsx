"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Compass,
  Lightbulb,
  Sparkles,
  Waypoints,
} from "lucide-react";
import type { SolutionRecord } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/primitives";

export interface ApproachPrinciple {
  code: string;
  title: string;
  tagline?: string;
  detail: string;
  pillars?: string[];
}

export function AboutHeroIllustration() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
      {/* Subtle Lavender & Intelligence Blue Glow */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_55%_45%,rgba(167,139,250,0.32),rgba(99,91,255,0.18)_45%,rgba(11,16,38,0)_75%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-hero border border-white/15 bg-navy-light/90 p-6 shadow-navy backdrop-blur-xl sm:p-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-lavender" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-lavender">
              The Intelligence Path · Brand Motif
            </span>
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
            Purpose-Led Architecture
          </span>
        </div>

        {/* Custom Animated Line Patterns & Abstract Intelligence Path SVG */}
        <div className="relative my-6 overflow-hidden rounded-2xl border border-white/10 bg-navy p-5 sm:p-6">
          <svg
            viewBox="0 0 520 240"
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label="Abstract Intelligence Path illustration with lavender accents and flowing connected nodes"
          >
            <defs>
              <linearGradient
                id="aboutHeroGrad"
                x1="20"
                y1="200"
                x2="500"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="50%" stopColor="#635BFF" />
                <stop offset="100%" stopColor="#387BFA" />
              </linearGradient>
              <radialGradient id="lavenderPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.48" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Delicate harmonic wave lines */}
            <path
              d="M 20 195 C 120 190, 170 75, 270 110 C 370 145, 415 55, 495 45"
              stroke="rgba(167, 139, 250, 0.22)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 20 165 C 135 215, 200 135, 305 130 C 395 125, 435 85, 495 45"
              stroke="rgba(56, 123, 250, 0.28)"
              strokeWidth="1.75"
              strokeDasharray="6 6"
              fill="none"
            />
            <path
              d="M 20 115 C 110 85, 195 160, 270 110 C 345 60, 420 95, 495 45"
              stroke="rgba(167, 139, 250, 0.30)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              fill="none"
            />

            {/* Primary Animated Intelligence Path */}
            <motion.path
              d="M 32 185 C 125 180, 150 92, 235 108 C 320 124, 355 58, 488 46"
              stroke="url(#aboutHeroGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
              initial={
                prefersReducedMotion ? false : { pathLength: 0.2, opacity: 0.5 }
              }
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Constellation Nodes */}
            {[
              {
                cx: 32,
                cy: 185,
                label: "Curiosity",
                sub: "Human Potential",
                color: "#A78BFA",
              },
              {
                cx: 158,
                cy: 122,
                label: "Adaptation",
                sub: "Tailored Pacing",
                color: "#635BFF",
              },
              {
                cx: 315,
                cy: 96,
                label: "Engagement",
                sub: "Active Inquiry",
                color: "#387BFA",
              },
              {
                cx: 488,
                cy: 46,
                label: "Capability",
                sub: "Accessible Growth",
                color: "#16A085",
              },
            ].map((node, i) => (
              <g key={node.label}>
                <circle cx={node.cx} cy={node.cy} r="24" fill="url(#lavenderPulse)" />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={i === 1 || i === 3 ? "9.5" : "8"}
                  fill={node.color}
                  stroke="#FAFBFF"
                  strokeWidth="2.5"
                />
                <text
                  x={node.cx}
                  y={node.cy + 24}
                  textAnchor={
                    i === 0 ? "start" : i === 3 ? "end" : "middle"
                  }
                  fill="#FAFBFF"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Bottom Lavender-Accented Philosophy Pills */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              title: "Adaptive",
              detail: "Calibrated to individual comprehension",
            },
            {
              title: "Engaging",
              detail: "Interactive discovery & dialogue",
            },
            {
              title: "Accessible",
              detail: "Inclusive pathways for every learner",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-lavender/20 bg-white/[0.04] p-3.5"
            >
              <p className="font-heading text-xs font-bold text-lavender">
                {item.title}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-slate-300">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OurApproachInteractive({
  principles,
}: {
  principles: ApproachPrinciple[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = principles[activeIndex] ?? principles[0];

  const getPrincipleIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return BrainCircuit;
      case 1:
        return Lightbulb;
      case 2:
        return Sparkles;
      default:
        return BarChart3;
    }
  };

  return (
    <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-12">
      {/* Left 5 Columns: Interactive Principle Selector Cards */}
      <div
        className="flex flex-col justify-between gap-3.5 lg:col-span-5"
        role="tablist"
        aria-label="Our Four Approach Principles"
      >
        {principles.map((principle, idx) => {
          const Icon = getPrincipleIcon(idx);
          const isSelected = idx === activeIndex;
          return (
            <button
              key={principle.code || principle.title}
              type="button"
              role="tab"
              id={`approach-tab-${idx}`}
              aria-selected={isSelected}
              aria-controls={`approach-panel-${idx}`}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIndex((idx + 1) % principles.length);
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex(
                    (idx - 1 + principles.length) % principles.length
                  );
                }
              }}
              className={cn(
                "group flex w-full items-start gap-4 rounded-feature border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                isSelected
                  ? "border-iris bg-white shadow-elevated"
                  : "border-border bg-cloud/80 hover:border-iris/35 hover:bg-white"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors",
                  isSelected
                    ? "bg-iris text-white shadow-subtle"
                    : "border border-border bg-white text-ink-secondary group-hover:text-iris"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-widest",
                      isSelected ? "text-iris" : "text-ink-muted"
                    )}
                  >
                    Principle {principle.code || `0${idx + 1}`}
                  </span>
                </div>
                <h3 className="mt-1 font-heading text-lg font-bold text-ink">
                  {principle.title}
                </h3>
                {principle.tagline && (
                  <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                    {principle.tagline}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Right 7 Columns: Revealed Detailed Description & Synchronized Visual */}
      {current && (
        <div
          role="tabpanel"
          id={`approach-panel-${activeIndex}`}
          aria-labelledby={`approach-tab-${activeIndex}`}
          className="flex flex-col justify-between overflow-hidden rounded-hero border border-border bg-navy p-7 text-cloud shadow-navy sm:p-10 lg:col-span-7"
        >
          {/* Synchronized Conceptual Visual */}
          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-navy-light/90 p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-lavender">
                Approach Architecture · {current.code || `0${activeIndex + 1}`}{" "}
                {current.title}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[10px] text-slate-300">
                Interactive Blueprint
              </span>
            </div>

            <svg
              viewBox="0 0 540 175"
              className="h-40 w-full"
              role="img"
              aria-label={`Conceptual diagram for ${current.title}`}
            >
              <defs>
                <linearGradient
                  id="approachLineGrad"
                  x1="30"
                  y1="90"
                  x2="510"
                  y2="90"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#635BFF" />
                  <stop offset="50%" stopColor="#387BFA" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>

              {activeIndex === 0 && (
                <g>
                  <path
                    d="M50 135 C 150 130, 190 45, 285 65 C 375 85, 425 35, 490 35"
                    stroke="url(#approachLineGrad)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50 135 C 165 155, 250 110, 355 105 C 425 100, 455 70, 490 35"
                    stroke="#A78BFA"
                    strokeOpacity="0.4"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    fill="none"
                  />
                  <circle cx="50" cy="135" r="8" fill="#387BFA" />
                  <circle
                    cx="195"
                    cy="82"
                    r="11"
                    fill="#635BFF"
                    stroke="#FAFBFF"
                    strokeWidth="2.5"
                  />
                  <circle cx="285" cy="65" r="9" fill="#A78BFA" />
                  <circle
                    cx="490"
                    cy="35"
                    r="11"
                    fill="#16A085"
                    stroke="#FAFBFF"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {activeIndex === 1 && (
                <g>
                  <rect
                    x="55"
                    y="42"
                    width="120"
                    height="90"
                    rx="16"
                    fill="#162147"
                    stroke="#387BFA"
                    strokeWidth="2"
                  />
                  <rect
                    x="210"
                    y="28"
                    width="120"
                    height="118"
                    rx="16"
                    fill="#1B2856"
                    stroke="#635BFF"
                    strokeWidth="2.5"
                  />
                  <rect
                    x="365"
                    y="42"
                    width="120"
                    height="90"
                    rx="16"
                    fill="#162147"
                    stroke="#16A085"
                    strokeWidth="2"
                  />
                  <line
                    x1="175"
                    y1="87"
                    x2="210"
                    y2="87"
                    stroke="#A78BFA"
                    strokeWidth="3"
                  />
                  <line
                    x1="330"
                    y1="87"
                    x2="365"
                    y2="87"
                    stroke="#A78BFA"
                    strokeWidth="3"
                  />
                </g>
              )}

              {activeIndex === 2 && (
                <g>
                  <circle
                    cx="270"
                    cy="88"
                    r="68"
                    stroke="#A78BFA"
                    strokeOpacity="0.35"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="270"
                    cy="88"
                    r="44"
                    stroke="#387BFA"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    fill="none"
                  />
                  <circle cx="270" cy="88" r="20" fill="#635BFF" />
                  <circle cx="202" cy="88" r="7" fill="#387BFA" />
                  <circle cx="338" cy="88" r="7" fill="#16A085" />
                </g>
              )}

              {activeIndex >= 3 && (
                <g>
                  <rect
                    x="90"
                    y="98"
                    width="48"
                    height="52"
                    rx="8"
                    fill="#387BFA"
                    fillOpacity="0.5"
                  />
                  <rect
                    x="170"
                    y="76"
                    width="48"
                    height="74"
                    rx="8"
                    fill="#387BFA"
                    fillOpacity="0.8"
                  />
                  <rect
                    x="250"
                    y="54"
                    width="48"
                    height="96"
                    rx="8"
                    fill="#635BFF"
                  />
                  <rect
                    x="330"
                    y="36"
                    width="48"
                    height="114"
                    rx="8"
                    fill="#A78BFA"
                  />
                  <rect
                    x="410"
                    y="20"
                    width="48"
                    height="130"
                    rx="8"
                    fill="#16A085"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Detailed Description & Pillars */}
          <div className="mt-7">
            <span className="text-xs font-semibold uppercase tracking-widest text-lavender">
              Principle {current.code || `0${activeIndex + 1}`}
            </span>
            <h3 className="mt-1.5 font-heading text-2xl font-bold text-white sm:text-3xl">
              {current.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {current.detail}
            </p>

            {current.pillars && current.pillars.length > 0 && (
              <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                {current.pillars.map((pillar) => (
                  <div
                    key={pillar}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-lavender"
                      aria-hidden="true"
                    />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function EducationalEcosystemConnected({
  solutions,
}: {
  solutions: SolutionRecord[];
}) {
  const coreSix = solutions.slice(0, 6);

  return (
    <div className="relative mt-14">
      {/* Desktop Intelligence Path Connecting Spine */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:flex lg:items-center lg:justify-center"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 540"
          className="h-full w-full opacity-35"
          fill="none"
        >
          <defs>
            <linearGradient
              id="ecoConnectGrad"
              x1="100"
              y1="100"
              x2="1100"
              y2="440"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#387BFA" />
              <stop offset="50%" stopColor="#635BFF" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          <path
            d="M 200 135 C 450 135, 500 270, 600 270 C 700 270, 750 135, 1000 135"
            stroke="url(#ecoConnectGrad)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <path
            d="M 200 405 C 450 405, 500 270, 600 270 C 700 270, 750 405, 1000 405"
            stroke="url(#ecoConnectGrad)"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <line
            x1="200"
            y1="135"
            x2="1000"
            y2="135"
            stroke="#635BFF"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <line
            x1="200"
            y1="405"
            x2="1000"
            y2="405"
            stroke="#387BFA"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Central Intelligence Path Hub Badge */}
      <div className="relative z-10 mb-8 flex justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-iris/30 bg-white px-6 py-3 shadow-elevated">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-lavender">
            <Waypoints className="h-4 w-4" aria-hidden="true" />
          </div>
          <span className="font-heading text-xs font-extrabold uppercase tracking-[0.14em] text-ink">
            Connected via the iGUIDE Intelligence Path
          </span>
        </div>
      </div>

      {/* Connected Six Solutions Grid */}
      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coreSix.map((sol, idx) => (
          <Link
            key={sol.id}
            href={`/solutions/${sol.slug}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-feature border border-border bg-white p-7 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-iris hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
          >
            {/* Top Connected Node Indicator */}
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-iris-light text-iris transition-colors group-hover:bg-iris group-hover:text-white">
                  <DynamicIcon name={sol.iconName} className="h-6 w-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-cloud px-3 py-1 text-[11px] font-bold text-ink-secondary">
                  <span className="h-2 w-2 rounded-full bg-iris" />
                  Node 0{idx + 1}
                </span>
              </div>

              <h3 className="mt-6 font-heading text-xl font-bold text-ink transition-colors group-hover:text-iris sm:text-2xl">
                {sol.shortTitle || sol.title}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                {sol.summary}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4 text-xs font-semibold text-iris">
              <span>Explore {sol.shortTitle || sol.title}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ParadigmComparisonSection() {
  return (
    <div className="mt-16 overflow-hidden rounded-hero border border-border bg-white shadow-elevated">
      <div className="border-b border-border bg-subtle-gradient px-6 py-5 sm:px-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-iris">
          Pedagogical Paradigm Comparison
        </span>
        <h3 className="mt-1 font-heading text-xl font-extrabold text-ink sm:text-2xl">
          Why Adaptive Intelligence Outperforms Static Systems
        </h3>
      </div>

      <div className="grid divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Left: Traditional Limitations */}
        <div className="p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
            <span>✕ Conventional Static EdTech</span>
          </div>
          <ul className="mt-6 space-y-4 text-sm text-ink-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                ×
              </span>
              <span>
                <strong>Rigid Linear Progression:</strong> Forces all students through identical lesson sequences regardless of prior comprehension or mastery pace.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                ×
              </span>
              <span>
                <strong>High-Friction Knowledge Gaps:</strong> When a learner stumbles on an unaddressed prerequisite, frustration builds and engagement plummets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                ×
              </span>
              <span>
                <strong>Delayed Educator Insights:</strong> Educators receive diagnostic test results weeks later, missing timely classroom intervention windows.
              </span>
            </li>
          </ul>
        </div>

        {/* Right: The iGUIDE Advantage */}
        <div className="bg-cloud/40 p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
            <span>✓ The iGUIDE Neural Architecture</span>
          </div>
          <ul className="mt-6 space-y-4 text-sm text-ink-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                ✓
              </span>
              <span>
                <strong>Dynamic Knowledge Graphs:</strong> Continuously adjusts explanation modalities, practice difficulty, and cognitive scaffolding in real time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                ✓
              </span>
              <span>
                <strong>Subtle Prerequisite Scaffolding:</strong> Automatically bridges conceptual bottlenecks with friendly Socratic prompts without punitive scoring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                ✓
              </span>
              <span>
                <strong>Real-Time Faculty Cockpit:</strong> Empowers teachers with pre-class readiness digests, highlighting exactly where seminars need focus.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
