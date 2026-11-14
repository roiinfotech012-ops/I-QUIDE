"use client";

import React, { useState } from "react";
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
        className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_55%_45%,rgba(99,91,255,0.34),rgba(56,123,250,0.20)_45%,rgba(11,16,38,0)_75%)] blur-2xl"
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
                <stop offset="0%" stopColor="#387BFA" />
                <stop offset="50%" stopColor="#635BFF" />
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
              stroke="rgba(167,139,250,0.26)"
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
              { cx: 55, cy: 162, num: "01", label: "Personalised", color: "#635BFF" },
              { cx: 150, cy: 75, num: "02", label: "AI Tutors", color: "#387BFA" },
              { cx: 255, cy: 142, num: "03", label: "Assessment", color: "#A78BFA" },
              { cx: 350, cy: 62, num: "04", label: "Gamified", color: "#16A085" },
              { cx: 435, cy: 128, num: "05", label: "Analytics", color: "#387BFA" },
              { cx: 495, cy: 45, num: "06", label: "Institutional", color: "#635BFF" },
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

  return (
    <div className="relative overflow-hidden rounded-hero border border-border bg-navy p-6 text-cloud shadow-elevated sm:p-8">
      {/* Subtle Top Header Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-iris" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-lavender">
            0{index + 1} · {title}
          </span>
        </div>
        <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400">
          Conceptual Visual Illustration
        </span>
      </div>

      {/* 01: Personalised Learning — Branching Adaptive Learning Paths */}
      {(key.includes("personalised") || index === 0) &&
        index === 0 && (
          <div>
            <div className="rounded-2xl border border-white/10 bg-navy-light/90 p-5">
              <svg
                viewBox="0 0 520 220"
                className="h-auto w-full"
                role="img"
                aria-label="Conceptual illustration of branching adaptive learning paths"
              >
                <defs>
                  <linearGradient
                    id="plGrad"
                    x1="30"
                    y1="110"
                    x2="490"
                    y2="110"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#387BFA" />
                    <stop offset="50%" stopColor="#635BFF" />
                    <stop offset="100%" stopColor="#16A085" />
                  </linearGradient>
                </defs>

                {/* Upper Visual / Analogy Branch */}
                <path
                  d="M 55 110 C 140 110, 165 44, 260 44 C 355 44, 380 110, 465 110"
                  stroke="#387BFA"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  fill="none"
                />
                {/* Central Adaptive Mastery Path */}
                <path
                  d="M 55 110 C 155 110, 185 88, 260 110 C 335 132, 375 110, 465 110"
                  stroke="url(#plGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Lower Prerequisite Refresher Branch */}
                <path
                  d="M 55 110 C 140 110, 165 176, 260 176 C 355 176, 380 110, 465 110"
                  stroke="#A78BFA"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  fill="none"
                />

                {/* Nodes & Conceptual Labels */}
                <circle cx="55" cy="110" r="10" fill="#387BFA" />
                <text
                  x="55"
                  y="140"
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="11"
                  fontWeight="600"
                >
                  Learner Baseline
                </text>

                <rect
                  x="195"
                  y="16"
                  width="130"
                  height="34"
                  rx="10"
                  fill="#16224A"
                  stroke="#387BFA"
                />
                <text
                  x="260"
                  y="37"
                  textAnchor="middle"
                  fill="#EAF5FF"
                  fontSize="11"
                  fontWeight="600"
                >
                  Visual Analogy Route
                </text>

                <circle
                  cx="260"
                  cy="110"
                  r="13"
                  fill="#635BFF"
                  stroke="#FAFBFF"
                  strokeWidth="3"
                />

                <rect
                  x="190"
                  y="160"
                  width="140"
                  height="34"
                  rx="10"
                  fill="#1C224C"
                  stroke="#A78BFA"
                />
                <text
                  x="260"
                  y="181"
                  textAnchor="middle"
                  fill="#F3EFFE"
                  fontSize="11"
                  fontWeight="600"
                >
                  Prerequisite Scaffold
                </text>

                <circle
                  cx="465"
                  cy="110"
                  r="11"
                  fill="#16A085"
                  stroke="#FAFBFF"
                  strokeWidth="2.5"
                />
                <text
                  x="465"
                  y="140"
                  textAnchor="middle"
                  fill="#16A085"
                  fontSize="11"
                  fontWeight="700"
                >
                  Mastery Goal
                </text>
              </svg>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2.5 text-center text-[11px]">
              <div className="rounded-xl bg-white/5 p-2.5 text-slate-300">
                <strong className="block text-white">Adaptive Paths</strong>
                Dynamic routing
              </div>
              <div className="rounded-xl bg-white/5 p-2.5 text-slate-300">
                <strong className="block text-white">Individualised</strong>
                Tailored modalities
              </div>
              <div className="rounded-xl bg-white/5 p-2.5 text-slate-300">
                <strong className="block text-white">Learner-Centred</strong>
                Paced for clarity
              </div>
            </div>
          </div>
        )}

      {/* 02: AI Tutors — Sophisticated Conceptual Tutoring Conversation */}
      {index === 1 && (
        <div className="space-y-3.5 rounded-2xl border border-white/10 bg-navy-light/90 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-intelligence/25 text-xs font-bold text-intelligence">
              L
            </div>
            <div className="max-w-sm rounded-2xl rounded-tl-sm border border-white/10 bg-navy p-3.5 text-xs text-slate-200">
              <p className="font-semibold text-intelligence">
                Learner Inquiry
              </p>
              <p className="mt-1">
                &ldquo;I understand how force and mass relate, but why does velocity
                stay constant when net force is zero?&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-start justify-end gap-3">
            <div className="max-w-md rounded-2xl rounded-tr-sm border border-iris/40 bg-iris/15 p-4 text-xs text-white">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-semibold text-lavender">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  AI Tutor · Socratic Guidance
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                  Step 1 of 2
                </span>
              </div>
              <p className="mt-2 leading-relaxed text-slate-100">
                &ldquo;Great question. Imagine a puck gliding across frictionless ice.
                If nothing pushes or slows it down, what would cause its speed to
                change?&rdquo;
              </p>
            </div>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-iris text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-success/25 text-xs font-bold text-emerald-300">
              L
            </div>
            <div className="max-w-sm rounded-2xl rounded-tl-sm border border-emerald-success/30 bg-emerald-success/10 p-3.5 text-xs text-slate-100">
              <p className="font-semibold text-emerald-300">
                Conceptual Breakthrough
              </p>
              <p className="mt-1">
                &ldquo;Nothing would! So force causes acceleration—a change in
                velocity—not motion itself.&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 03: Skill Assessment — Competency Mapping & Assessment Visualization */}
      {index === 2 && (
        <div className="rounded-2xl border border-white/10 bg-navy-light/90 p-5">
          <div className="grid items-center gap-6 sm:grid-cols-12">
            <div className="sm:col-span-6">
              <svg
                viewBox="0 0 240 220"
                className="mx-auto h-48 w-full max-w-[230px]"
                role="img"
                aria-label="Conceptual radar chart showing multi-dimensional competency mapping"
              >
                <g stroke="#29386B" strokeWidth="1.5" fill="none">
                  <circle cx="120" cy="110" r="82" />
                  <circle cx="120" cy="110" r="54" />
                  <circle cx="120" cy="110" r="28" />
                  <line x1="38" y1="110" x2="202" y2="110" />
                  <line x1="120" y1="28" x2="120" y2="192" />
                </g>
                <polygon
                  points="120,38 188,88 164,172 78,162 56,82"
                  fill="#635BFF"
                  fillOpacity="0.28"
                  stroke="#635BFF"
                  strokeWidth="3"
                />
                <circle cx="120" cy="38" r="5.5" fill="#16A085" />
                <circle cx="188" cy="88" r="5.5" fill="#387BFA" />
                <circle cx="164" cy="172" r="5.5" fill="#A78BFA" />
                <circle cx="78" cy="162" r="5.5" fill="#635BFF" />
                <circle cx="56" cy="82" r="5.5" fill="#387BFA" />
              </svg>
            </div>

            <div className="space-y-3 sm:col-span-6">
              {[
                {
                  domain: "Conceptual Reasoning",
                  tag: "Demonstrated Strength",
                  pct: "88%",
                  color: "bg-emerald-success",
                },
                {
                  domain: "Analytical Application",
                  tag: "Active Progression",
                  pct: "76%",
                  color: "bg-iris",
                },
                {
                  domain: "Foundational Synthesis",
                  tag: "Growth Opportunity",
                  pct: "64%",
                  color: "bg-intelligence",
                },
              ].map((row) => (
                <div
                  key={row.domain}
                  className="rounded-xl border border-white/10 bg-navy p-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">
                      {row.domain}
                    </span>
                    <span className="text-[11px] text-lavender">{row.tag}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn("h-full rounded-full", row.color)}
                      style={{ width: row.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 04: Gamified Learning — Polished Interactive Challenge Board */}
      {index === 3 && (
        <div className="rounded-2xl border border-white/10 bg-navy-light/90 p-5">
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {[
              {
                stage: "Challenge 01",
                type: "Pattern & Logic Riddle",
                title: "Sequence Equilibrium",
                status: "Completed",
                accent: "border-emerald-success/40 bg-emerald-success/10 text-emerald-300",
              },
              {
                stage: "Challenge 02",
                type: "Interactive Puzzle",
                title: "Circuit Synthesis Quest",
                status: "Active Exploration",
                accent: "border-iris bg-iris/20 text-lavender",
              },
              {
                stage: "Challenge 03",
                type: "Applied Scenario",
                title: "Systems Mastery Lab",
                status: "Unlocks Next",
                accent: "border-white/10 bg-navy text-slate-400",
              },
            ].map((tile) => (
              <div
                key={tile.stage}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border p-4",
                  tile.accent
                )}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {tile.stage}
                  </span>
                  <h4 className="mt-1.5 font-heading text-sm font-bold text-white">
                    {tile.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-300">{tile.type}</p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-2.5 text-[10px] font-semibold">
                  <span>{tile.status}</span>
                  <Lightbulb className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-navy px-4 py-3 text-xs">
            <span className="text-slate-300">
              Engagement Mode:{" "}
              <strong className="text-white">
                Puzzles, Riddles & Mastery Challenges
              </strong>
            </span>
            <span className="font-semibold text-lavender">
              Intrinsic Curiosity Loop
            </span>
          </div>
        </div>
      )}

      {/* 05: Learning Analytics — Illustrative Analytics Charts & Knowledge-Gap Visualisation */}
      {index === 4 && (
        <div className="rounded-2xl border border-white/10 bg-navy-light/90 p-5">
          <div className="grid items-center gap-5 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <p className="mb-3 text-xs font-semibold text-slate-300">
                Cohort Progress & Concept Readiness Trajectory
              </p>
              <svg
                viewBox="0 0 320 155"
                className="h-36 w-full"
                role="img"
                aria-label="Illustrative analytics chart showing progress tracking and knowledge-gap identification"
              >
                <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
                  <line x1="20" y1="30" x2="300" y2="30" />
                  <line x1="20" y1="75" x2="300" y2="75" />
                  <line x1="20" y1="120" x2="300" y2="120" />
                </g>
                <rect x="40" y="78" width="32" height="52" rx="6" fill="#387BFA" fillOpacity="0.55" />
                <rect x="95" y="56" width="32" height="74" rx="6" fill="#387BFA" />
                {/* Highlighted Knowledge Gap Bar */}
                <rect
                  x="150"
                  y="86"
                  width="32"
                  height="44"
                  rx="6"
                  fill="#A78BFA"
                  stroke="#FAFBFF"
                  strokeWidth="1.5"
                />
                <rect x="205" y="42" width="32" height="88" rx="6" fill="#635BFF" />
                <rect x="260" y="24" width="32" height="106" rx="6" fill="#16A085" />
              </svg>
            </div>

            <div className="space-y-3 sm:col-span-5">
              <div className="rounded-xl border border-lavender/35 bg-iris/15 p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-lavender">
                  Knowledge-Gap Identified
                </p>
                <p className="mt-1 text-xs font-bold text-white">
                  Module 03 · Prerequisite Concept
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-300">
                  Highlights where targeted review strengthens cohort progression.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-navy p-3.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Data-Informed Insight
                </p>
                <p className="mt-1 text-xs text-slate-200">
                  Clear progress visibility for educators and learners.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 06: Institutional Solutions — Connected Institutional Learning Ecosystem */}
      {index >= 5 && (
        <div className="rounded-2xl border border-white/10 bg-navy-light/90 p-5">
          <svg
            viewBox="0 0 520 205"
            className="h-auto w-full"
            role="img"
            aria-label="Connected institutional learning ecosystem spanning Schools, Higher Education, and Training Organisations"
          >
            <line
              x1="105"
              y1="102"
              x2="260"
              y2="102"
              stroke="#635BFF"
              strokeWidth="3"
            />
            <line
              x1="260"
              y1="102"
              x2="415"
              y2="102"
              stroke="#387BFA"
              strokeWidth="3"
            />
            <path
              d="M 105 102 Q 260 22 415 102"
              stroke="#A78BFA"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
            />
            <path
              d="M 105 102 Q 260 182 415 102"
              stroke="#16A085"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
            />

            {[
              {
                cx: 105,
                title: "Schools",
                sub: "K-12 & Secondary",
                stroke: "#387BFA",
              },
              {
                cx: 260,
                title: "Higher Education",
                sub: "Colleges & Universities",
                stroke: "#635BFF",
              },
              {
                cx: 415,
                title: "Training Orgs",
                sub: "Skill & Professional",
                stroke: "#16A085",
              },
            ].map((inst) => (
              <g key={inst.title}>
                <rect
                  x={inst.cx - 68}
                  y="64"
                  width="136"
                  height="76"
                  rx="16"
                  fill="#0B1026"
                  stroke={inst.stroke}
                  strokeWidth="2.5"
                />
                <text
                  x={inst.cx}
                  y="98"
                  textAnchor="middle"
                  fill="#FAFBFF"
                  fontSize="12.5"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  {inst.title}
                </text>
                <text
                  x={inst.cx}
                  y="118"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="10.5"
                  fontFamily="Inter, sans-serif"
                >
                  {inst.sub}
                </text>
              </g>
            ))}
          </svg>
        </div>
      )}
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
                  <stop offset="0%" stopColor="#387BFA" />
                  <stop offset="50%" stopColor="#635BFF" />
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
                stroke="#387BFA"
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
                  stroke={selectedIdx === idx ? "#A78BFA" : "#273669"}
                  strokeWidth={selectedIdx === idx ? "3" : "1.5"}
                />
              ))}

              {/* Central Shared Vision Hub */}
              <circle
                cx="300"
                cy="180"
                r="48"
                fill="#131C3E"
                stroke="#635BFF"
                strokeWidth="3"
              />
              <text
                x="300"
                y="176"
                textAnchor="middle"
                fill="#A78BFA"
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
                { x: 300, y: 55, color: "#635BFF" },
                { x: 486, y: 118, color: "#387BFA" },
                { x: 486, y: 242, color: "#A78BFA" },
                { x: 300, y: 305, color: "#16A085" },
                { x: 114, y: 242, color: "#387BFA" },
                { x: 114, y: 118, color: "#635BFF" },
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
                      fill={isSelected ? "#635BFF" : "#101836"}
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
