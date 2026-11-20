"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function BrandIntroSplash() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute || prefersReducedMotion) {
      setVisible(false);
      return;
    }

    // Lock scroll briefly during the 2.75s cinematic intro
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflow;
    }, 2750);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    };
  }, [isAdminRoute, prefersReducedMotion]);

  if (isAdminRoute || prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="iguide-intro-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7FAFF] via-white to-[#EAF1FA]"
          aria-label="iGUIDE Opening Animation"
        >
          {/* Ambient Royal Blue & Beacon Gold Radial Halo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.75, 1.15, 1], opacity: [0, 0.9, 0.75] }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="pointer-events-none absolute h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(240,195,42,0.22)_0%,rgba(30,72,131,0.12)_50%,rgba(255,255,255,0)_74%)] blur-2xl"
            aria-hidden="true"
          />

          {/* Centered Big Logo Stage + Sweeping Flight Trail */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Animated Curved Kite/Airplane Flight Trail SVG */}
            <svg
              viewBox="0 0 520 300"
              className="pointer-events-none absolute -top-24 h-[300px] w-[520px] overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="introFlightGrad" x1="120" y1="200" x2="400" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1E4883" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#2B64B0" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#F0C32A" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 260 155 C 360 120, 445 55, 390 22 C 330 -12, 165 18, 125 82 C 92 135, 175 162, 260 155"
                stroke="url(#introFlightGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeDasharray="8 8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.95, 0],
                }}
                transition={{
                  duration: 2.1,
                  delay: 0.3,
                  times: [0, 0.72, 1],
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* Composite Big iGUIDE Logo (Flying Plane + Wordmark) */}
            <motion.div
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex w-[220px] flex-col items-center sm:w-[270px]"
            >
              {/* Kite / Paper Airplane takes off, flies a full graceful loop, and lands RIGHT back onto the logo! */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                animate={{
                  x: [0, 0, 120, 145, 25, -110, -55, 0, 0],
                  y: [0, 0, -52, -118, -138, -75, -18, 0, 0],
                  rotate: [0, -6, -18, -32, -14, 18, 10, 0, 0],
                  scale: [1, 1.03, 1.08, 0.96, 0.92, 1.02, 1.05, 1.02, 1],
                }}
                transition={{
                  duration: 2.25,
                  times: [0, 0.14, 0.3, 0.44, 0.58, 0.72, 0.84, 0.94, 1],
                  ease: "easeInOut",
                }}
                className="relative z-20 w-full"
                style={{ willChange: "transform" }}
              >
                <Image
                  src="/brand/iguide-plane.png"
                  alt="iGUIDE soaring paper airplane"
                  width={270}
                  height={130}
                  priority
                  unoptimized
                  className="h-auto w-full object-contain drop-shadow-[0_14px_22px_rgba(30,72,131,0.22)]"
                />
              </motion.div>

              {/* Anchored Horizon Lines + iGUIDE Wordmark */}
              <Image
                src="/brand/iguide-wordmark.png"
                alt="iGUIDE"
                width={270}
                height={107}
                priority
                unoptimized
                className="-mt-3 h-auto w-full object-contain"
              />
            </motion.div>

            {/* Brand Tagline fades in cleanly right as the plane lands back on the logo */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.85 }}
              className="mt-5 font-heading text-sm font-bold tracking-[0.14em] text-iris uppercase sm:text-base"
            >
              Where Human Potential Meets Intelligence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
