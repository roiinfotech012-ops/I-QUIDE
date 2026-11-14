"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  CheckCircle2,
  Compass,
  Layers,
  Radar,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroLearningEcosystem({ caption }: { caption?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [activePerspective, setActivePerspective] = useState<"learner" | "educator" | "institution">("learner");
  const [activeNode, setActiveNode] = useState<number>(1);

  const ecosystemNodes = [
    {
      id: 0,
      stage: "Stage 01 · Discover",
      title: "Curiosity & Baseline Inquiry",
      metric: "Readiness Mapped",
      progress: 32,
      detail:
        "Identifies prior knowledge and preferred conceptual framing through low-stress diagnostic exploration.",
      color: "#387BFA",
    },
    {
      id: 1,
      stage: "Stage 02 · Personalise",
      title: "Adaptive Pathway Calibration",
      metric: "Multi-Modal Scaffolding",
      progress: 64,
      detail:
        "Dynamically sequences visual analogies, prerequisite refreshers, and worked examples around the learner.",
      color: "#635BFF",
    },
    {
      id: 2,
      stage: "Stage 03 · Engage",
      title: "Conversational & Interactive Mastery",
      metric: "Socratic Dialogue Active",
      progress: 84,
      detail:
        "Supports active problem-solving through AI tutor guidance, conceptual challenges, and formative feedback.",
      color: "#A78BFA",
    },
    {
      id: 3,
      stage: "Stage 04 · Grow",
      title: "Durable Capability & Insight",
      metric: "Comprehension Verified",
      progress: 96,
      detail:
        "Consolidates long-term understanding while equipping educators with clear progress insights.",
      color: "#16A085",
    },
  ];

  const current = ecosystemNodes[activeNode] ?? ecosystemNodes[1];

  const perspectiveDetails = {
    learner: {
      badge: "Learner Journey",
      stat1Label: "Cognitive Scaffolding",
      stat1Val: "Multi-Modal",
      stat2Label: "Socratic Feedback",
      stat2Val: "Real-Time Active",
    },
    educator: {
      badge: "Educator Cockpit",
      stat1Label: "Intervention Alerts",
      stat1Val: "0 Bottlenecks",
      stat2Label: "Readiness Digest",
      stat2Val: "94.8% Synced",
    },
    institution: {
      badge: "Campus Enterprise",
      stat1Label: "System Reliability",
      stat1Val: "99.98% Core",
      stat2Label: "Data Governance",
      stat2Val: "SOC2 / FERPA",
    },
  }[activePerspective];

  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:max-w-none">
      {/* Subtle radial lavender and intelligence-blue glow behind the visual */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-[44px] bg-[radial-gradient(circle_at_60%_40%,rgba(167,139,250,0.34),rgba(56,123,250,0.22)_45%,rgba(99,91,255,0)_75%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-hero border border-border/90 bg-navy p-5 text-cloud shadow-navy sm:p-7">
        {/* Top conceptual header bar with interactive view toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-success animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-200">
              iGUIDE Intelligence Engine · Live Architecture
            </span>
          </div>

          {/* Perspective View Switcher */}
          <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1 text-[11px]">
            <button
              type="button"
              onClick={() => setActivePerspective("learner")}
              className={cn(
                "rounded-full px-3 py-1 font-medium transition",
                activePerspective === "learner"
                  ? "bg-iris text-white shadow-subtle"
                  : "text-slate-300 hover:text-white"
              )}
            >
              Learner
            </button>
            <button
              type="button"
              onClick={() => setActivePerspective("educator")}
              className={cn(
                "rounded-full px-3 py-1 font-medium transition",
                activePerspective === "educator"
                  ? "bg-iris text-white shadow-subtle"
                  : "text-slate-300 hover:text-white"
              )}
            >
              Educator
            </button>
            <button
              type="button"
              onClick={() => setActivePerspective("institution")}
              className={cn(
                "rounded-full px-3 py-1 font-medium transition",
                activePerspective === "institution"
                  ? "bg-iris text-white shadow-subtle"
                  : "text-slate-300 hover:text-white"
              )}
            >
              Institution
            </button>
          </div>
        </div>

        {/* Composited SVG Constellation & Floating Educational Interface Nodes */}
        <div className="relative my-5 rounded-2xl border border-white/10 bg-navy-light/90 p-4 sm:p-6">
          {/* Floating mini interface badge — top left */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-navy/85 px-3 py-1.5 text-[11px] text-slate-200">
              <Waypoints className="h-3.5 w-3.5 text-intelligence" aria-hidden="true" />
              <span>Adaptive Node Routing</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-iris/30 bg-iris/15 px-3 py-1.5 text-[11px] text-lavender">
              <Sparkles className="h-3.5 w-3.5 text-lavender" aria-hidden="true" />
              <span>Comprehension Index: {current.progress}%</span>
            </div>
          </div>

          <svg
            viewBox="0 0 560 215"
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label="Conceptual AI learning ecosystem showing the Intelligence Path from Discover to Personalise, Engage, and Grow"
          >
            <defs>
              <linearGradient
                id="heroPathGrad"
                x1="30"
                y1="170"
                x2="530"
                y2="42"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#387BFA" />
                <stop offset="48%" stopColor="#635BFF" />
                <stop offset="80%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#16A085" />
              </linearGradient>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#635BFF" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#635BFF" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle architectural grid */}
            <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
              <line x1="0" y1="52" x2="560" y2="52" />
              <line x1="0" y1="106" x2="560" y2="106" />
              <line x1="0" y1="160" x2="560" y2="160" />
              <line x1="140" y1="0" x2="140" y2="215" />
              <line x1="280" y1="0" x2="280" y2="215" />
              <line x1="420" y1="0" x2="420" y2="215" />
            </g>

            {/* Secondary alternative learner path */}
            <path
              d="M 48 166 C 130 192, 195 142, 290 132 C 385 122, 435 92, 512 46"
              fill="none"
              stroke="rgba(167, 139, 250, 0.28)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            {/* Tertiary scaffold path */}
            <path
              d="M 48 166 C 120 108, 175 72, 225 110 C 275 144, 365 58, 512 46"
              fill="none"
              stroke="rgba(56, 123, 250, 0.24)"
              strokeWidth="1.75"
            />

            {/* Primary Intelligence Path curve */}
            <motion.path
              d="M 48 166 C 135 164, 155 96, 225 110 C 295 124, 325 66, 390 72 C 455 78, 475 46, 512 46"
              fill="none"
              stroke="url(#heroPathGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              initial={
                prefersReducedMotion ? false : { pathLength: 0.25, opacity: 0.65 }
              }
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
            />

            {/* Interactive Nodes along the Intelligence Path */}
            {[
              { id: 0, cx: 48, cy: 166, label: "Discover", color: "#387BFA" },
              { id: 1, cx: 225, cy: 110, label: "Personalise", color: "#635BFF" },
              { id: 2, cx: 390, cy: 72, label: "Engage", color: "#A78BFA" },
              { id: 3, cx: 512, cy: 46, label: "Grow", color: "#16A085" },
            ].map((node) => {
              const isSelected = activeNode === node.id;
              return (
                <g
                  key={node.id}
                  onClick={() => setActiveNode(node.id)}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect ${node.label} node`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveNode(node.id);
                    }
                  }}
                >
                  {isSelected && (
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="26"
                      fill="url(#nodeGlow)"
                    />
                  )}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isSelected ? "11" : "8"}
                    fill={node.color}
                    stroke="#FAFBFF"
                    strokeWidth={isSelected ? "3" : "2"}
                  />
                  <text
                    x={node.cx}
                    y={node.cy + 25}
                    textAnchor="middle"
                    fill={isSelected ? "#FAFBFF" : "#94A3B8"}
                    fontSize="11"
                    fontWeight={isSelected ? "700" : "500"}
                    fontFamily="Inter, sans-serif"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Stage Selector Pills */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ecosystemNodes.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNode(node.id)}
                className={cn(
                  "rounded-xl border px-3 py-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                  activeNode === node.id
                    ? "border-iris bg-iris/25 text-white shadow-subtle"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:bg-white/10"
                )}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-lavender">
                  0{node.id + 1}
                </p>
                <p className="truncate text-xs font-semibold">
                  {node.stage.split("· ")[1]}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Floating Educational Interface Panels & Subtle Progress Indicator */}
        <div className="grid gap-3.5 sm:grid-cols-12">
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-4 sm:col-span-7">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-lavender">
                {current.stage}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-success/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                {current.metric}
              </span>
            </div>
            <h3 className="mt-1.5 font-heading text-lg font-bold text-white">
              {current.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {current.detail}
            </p>
            {/* Subtle progress bar */}
            <div className="mt-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-gradient transition-all duration-500"
                  style={{ width: `${current.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2.5 rounded-2xl border border-white/12 bg-gradient-to-br from-iris/25 to-intelligence/10 p-4 sm:col-span-5">
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-lavender" aria-hidden="true" />
                <span>{perspectiveDetails.badge}</span>
              </span>
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-lavender">
                Active Telemetry
              </span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-200">
              <div className="flex items-center justify-between rounded-lg bg-navy/65 px-2.5 py-1.5">
                <span>{perspectiveDetails.stat1Label}</span>
                <span className="font-semibold text-lavender">{perspectiveDetails.stat1Val}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-navy/65 px-2.5 py-1.5">
                <span>{perspectiveDetails.stat2Label}</span>
                <span className="font-semibold text-emerald-300">{perspectiveDetails.stat2Val}</span>
              </div>
            </div>
          </div>
        </div>

        {caption && (
          <p className="mt-4 text-center text-[11px] text-slate-400">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}

export function InteractivePathwaySimulator() {
  const [selectedTab, setSelectedTab] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Curiosity & Diagnostic Discovery",
      subtitle: "Listening to how each learner frames a problem",
      icon: Compass,
      learnerState:
        "A student encounters a new concept in analytical reasoning or science and hesitates on an underlying prerequisite relationship.",
      iguideResponse:
        "Instead of marking the student wrong and moving on, iGUIDE detects the prerequisite dependency and gently surfaces a visual analogy alongside a 3-minute foundational refresher.",
      educatorView:
        "Educator sees a calm readiness indicator showing which foundational concepts were reviewed before class.",
    },
    {
      number: "02",
      title: "Adaptive Modality Calibration",
      subtitle: "Presenting rigorous concepts in the format that clicks",
      icon: Waypoints,
      learnerState:
        "Different minds absorb complex ideas through different entry points—some through spatial diagrams, others through formal proofs or applied case studies.",
      iguideResponse:
        "The Intelligence Path dynamically sequences multi-modal explanations and scaffolded practice problems matched to the learner's demonstrated comprehension tempo.",
      educatorView:
        "Faculty retain full syllabus alignment while the platform personalises the explanatory route for each student.",
    },
    {
      number: "03",
      title: "Formative Socratic Dialogue",
      subtitle: "Continuous low-stakes checkpoints that build confidence",
      icon: Radar,
      learnerState:
        "During practice, a student makes a mid-step reasoning error while having the right overall intuition.",
      iguideResponse:
        "The Formative Assessment Matrix isolates the exact step where reasoning diverged and offers a Socratic guiding question rather than giving away the final answer.",
      educatorView:
        "Cohort telemetry highlights shared bottlenecks so seminar time can focus on high-value discussion.",
    },
    {
      number: "04",
      title: "Inclusive & Durable Mastery",
      subtitle: "Universal Design for Learning with spaced synthesis",
      icon: Accessibility,
      learnerState:
        "Learners prepare to synthesise multiple modules into an applied project or cumulative evaluation.",
      iguideResponse:
        "iGUIDE schedules personalized retrieval touchpoints and provides UDL-compliant reading, glossary, and visual map tools so every student can demonstrate mastery equitably.",
      educatorView:
        "Department leaders receive clear outcome-attainment insights aligned with institutional standards.",
    },
  ];

  const active = steps[selectedTab] ?? steps[0];
  const ActiveIcon = active.icon;

  return (
    <div className="rounded-hero border border-border bg-white p-6 shadow-subtle sm:p-10">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Step selector column */}
        <div className="space-y-3 lg:col-span-5" role="tablist" aria-label="Intelligence Path Stages">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isSelected = selectedTab === index;
            return (
              <button
                key={step.number}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedTab(index)}
                className={cn(
                  "flex w-full items-start gap-4 rounded-card border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                  isSelected
                    ? "border-iris bg-iris-light/50 shadow-subtle"
                    : "border-border bg-cloud hover:border-iris/30 hover:bg-white"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors",
                    isSelected
                      ? "bg-iris text-white"
                      : "bg-white text-ink-secondary border border-border"
                  )}
                >
                  {step.number}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-heading text-base font-bold text-ink">
                      {step.title}
                    </p>
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isSelected ? "text-iris" : "text-ink-muted"
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-1 text-xs text-ink-secondary">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active stage detail panel */}
        <div className="flex flex-col justify-between rounded-feature bg-navy p-6 text-cloud sm:p-8 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-iris/20 text-lavender">
                  <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-lavender">
                    Intelligence Path · Stage {active.number}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                    {active.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  01 · Classroom & Learner Context
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                  {active.learnerState}
                </p>
              </div>

              <div className="rounded-2xl border border-iris/40 bg-iris/15 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-lavender">
                  02 · iGUIDE Intelligent Response
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white">
                  {active.iguideResponse}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-success/30 bg-emerald-success/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  03 · Educator & Institutional Visibility
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-100">
                  {active.educatorView}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-lavender" aria-hidden="true" />
              Powered by iGUIDE Pedagogical Graph
            </span>
            <span>Stage {active.number} of 04</span>
          </div>
        </div>
      </div>
    </div>
  );
}
