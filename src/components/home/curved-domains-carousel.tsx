"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SolutionRecord } from "@/lib/seed-data";
import { Container, DynamicIcon } from "@/components/ui/primitives";

const DOMAIN_THEMES = [
  {
    bg: "linear-gradient(180deg, #EAF1FA 0%, #F7FAFF 100%)",
    text: "#1E4883",
    sub: "#3B6299",
    badgeBg: "rgba(30, 72, 131, 0.10)",
    image: "/images/solution-personalised-learning.jpg",
  },
  {
    bg: "linear-gradient(180deg, #E8F8F0 0%, #F4FCF8 100%)",
    text: "#0F6E4A",
    sub: "#2F8564",
    badgeBg: "rgba(15, 110, 74, 0.10)",
    image: "/images/solution-ai-tutors.jpg",
  },
  {
    bg: "linear-gradient(180deg, #FEF6D8 0%, #FFFDF2 100%)",
    text: "#854D0E",
    sub: "#A16207",
    badgeBg: "rgba(133, 77, 14, 0.10)",
    image: "/images/solution-skill-assessment.jpg",
  },
  {
    bg: "linear-gradient(180deg, #F8EBFA 0%, #FDF7FE 100%)",
    text: "#6B21A8",
    sub: "#7E3AF2",
    badgeBg: "rgba(107, 33, 168, 0.10)",
    image: "/images/solution-gamified-learning.jpg",
  },
  {
    bg: "linear-gradient(180deg, #E3F4FA 0%, #F3FAFD 100%)",
    text: "#0E5A75",
    sub: "#24748F",
    badgeBg: "rgba(14, 90, 117, 0.10)",
    image: "/images/solution-learning-analytics.jpg",
  },
  {
    bg: "linear-gradient(180deg, #FDECE1 0%, #FFF6F0 100%)",
    text: "#8A3A15",
    sub: "#A8522A",
    badgeBg: "rgba(138, 58, 21, 0.10)",
    image: "/images/solution-institutional-solutions.jpg",
  },
];

export function CurvedDomainsCarousel({
  solutions,
}: {
  solutions: SolutionRecord[];
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const coreSix = solutions.slice(0, 6);
  // Repeat 3x so the horizontal ribbon loops seamlessly across ultrawide screens
  const loopItems = [...coreSix, ...coreSix, ...coreSix];

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const CARD_WIDTH = 246;
    const GAP = 26;
    const STEP = CARD_WIDTH + GAP;
    const SINGLE_SET_WIDTH = coreSix.length * STEP;
    let rafId = 0;
    let lastTime = performance.now();

    const renderFrame = (now: number) => {
      const dt = Math.min(48, now - lastTime);
      lastTime = now;

      if (!prefersReduced && !pausedRef.current && SINGLE_SET_WIDTH > 0) {
        // Smooth, unhurried editorial glide speed (~42px/sec)
        offsetRef.current = (offsetRef.current + dt * 0.042) % SINGLE_SET_WIDTH;
      }

      const stage = stageRef.current;
      if (stage) {
        const stageWidth = stage.clientWidth || 1280;
        const centerX = stageWidth / 2;

        for (let i = 0; i < loopItems.length; i++) {
          const el = cardRefs.current[i];
          if (!el) continue;

          // Position card horizontally in the looping strip
          let x = i * STEP - offsetRef.current;
          // Wrap smoothly so strip always covers left & right edges
          const totalWidth = loopItems.length * STEP;
          while (x < -STEP * 1.5) x += totalWidth;
          while (x > totalWidth - STEP * 1.5) x -= totalWidth;

          const cardCenter = x + CARD_WIDTH / 2;
          // Normalized distance from center (-1 at left edge, 0 at center, +1 at right edge)
          const norm = Math.max(-1.25, Math.min(1.25, (cardCenter - centerX) / (stageWidth * 0.5)));

          // Concave 3D amphitheater curvature (exact Groww curved perspective feel):
          // Outer edges curve inward toward the viewer & scale slightly taller; center sits clean & slightly recessed
          const rotateY = -norm * 26; // deg
          const scale = 0.88 + Math.pow(Math.abs(norm), 1.6) * 0.22;
          const translateZ = Math.pow(Math.abs(norm), 1.7) * 55;
          const translateY = Math.pow(Math.abs(norm), 2) * -4;

          el.style.transform = `translate3d(${x}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
          el.style.zIndex = String(Math.round(10 + Math.abs(norm) * 20));
        }
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);
    return () => window.cancelAnimationFrame(rafId);
  }, [coreSix.length, loopItems.length]);

  const handlePause = (pause: boolean) => {
    pausedRef.current = pause;
    setIsPaused(pause);
  };

  if (coreSix.length === 0) return null;

  return (
    <section
      className="relative z-20 overflow-hidden bg-white py-16 sm:py-20"
      aria-label="Core Learning Domains"
    >
      {/* Centered Clean Header + Action Pill (Exact Reference Structure) */}
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-[-0.025em] text-navy sm:text-4xl lg:text-[2.65rem]">
            Core learning domains,{" "}
            <span className="text-iris">simplified for every mind</span>
          </h2>

          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2 text-xs font-bold text-navy shadow-subtle transition hover:-translate-y-0.5 hover:border-iris hover:text-iris"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-extrabold text-navy">
                ▶
              </span>
              <span>Explore All 6 Solutions</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </Container>

      {/* 3D Curved Moving Card Stage */}
      <div
        ref={stageRef}
        onMouseEnter={() => handlePause(true)}
        onMouseLeave={() => handlePause(false)}
        className="relative mx-auto mt-10 h-[350px] w-full max-w-[1600px] overflow-hidden sm:h-[370px]"
        style={{ perspective: "1050px", transformStyle: "preserve-3d" }}
      >
        {/* Subtle edge fade vignettes */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-40 w-10 bg-gradient-to-r from-white via-white/40 to-transparent sm:w-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-40 w-10 bg-gradient-to-l from-white via-white/40 to-transparent sm:w-20"
          aria-hidden="true"
        />

        {loopItems.map((sol, idx) => {
          const theme = DOMAIN_THEMES[idx % DOMAIN_THEMES.length];
          return (
            <Link
              key={`${sol.id}-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              href={`/solutions/${sol.slug}`}
              className="group absolute left-0 top-6 flex h-[300px] w-[246px] flex-col justify-between overflow-hidden rounded-[28px] border border-black/[0.04] shadow-card transition-shadow duration-300 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris sm:h-[315px]"
              style={{
                background: theme.bg,
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              {/* Top Domain Heading & Icon */}
              <div className="relative z-10 p-5 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{ backgroundColor: theme.badgeBg, color: theme.text }}
                  >
                    <DynamicIcon name={sol.iconName} className="h-4 w-4" />
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                    style={{ backgroundColor: theme.badgeBg, color: theme.text }}
                  >
                    0{(idx % coreSix.length) + 1}
                  </span>
                </div>

                <h3
                  className="mt-3 font-heading text-xl font-extrabold leading-tight tracking-tight"
                  style={{ color: theme.text }}
                >
                  {sol.shortTitle || sol.title}
                </h3>
                <p
                  className="mt-1 text-[11px] font-semibold"
                  style={{ color: theme.sub }}
                >
                  {sol.category}
                </p>
              </div>

              {/* Bottom Blended Indian Academic Visual */}
              <div
                className="relative mt-auto h-[170px] w-full overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 28%, black 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 28%, black 100%)",
                }}
              >
                <Image
                  src={theme.image}
                  alt={sol.title}
                  fill
                  sizes="260px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Subtle status cue */}
      <p className="mt-2 text-center text-[11px] font-medium text-ink-muted">
        {isPaused
          ? "Paused — click any domain card to explore"
          : "Hover any card to pause & explore"}
      </p>
    </section>
  );
}
