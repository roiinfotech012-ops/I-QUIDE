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

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflow;
    }, 2650);

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
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7FAFF] via-white to-[#EAF1FA]"
          aria-label="iGUIDE Opening Animation"
        >
          {/* Ambient Royal Blue & Beacon Gold Radial Halo */}
          <motion.div
            initial={{ scale: 0.72, opacity: 0 }}
            animate={{ scale: [0.75, 1.12, 1], opacity: [0, 0.85, 0.7] }}
            transition={{ duration: 2.1, ease: "easeOut" }}
            className="pointer-events-none absolute h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(240,195,42,0.22)_0%,rgba(30,72,131,0.12)_50%,rgba(255,255,255,0)_74%)] blur-2xl"
            aria-hidden="true"
          />

          {/* Centered Big Logo Stage + Sweeping Nose-Forward Flight Trail */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Diagonal Golden-Blue Contrail tracing smoothly from bottom-left across center to top-right */}
            <svg
              viewBox="0 0 600 320"
              className="pointer-events-none absolute -top-24 h-[320px] w-[600px] overflow-visible"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="introNoseTrailGrad" x1="40" y1="290" x2="560" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1E4883" stopOpacity="0" />
                  <stop offset="45%" stopColor="#2B64B0" stopOpacity="0.6" />
                  <stop offset="85%" stopColor="#F0C32A" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#F0C32A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 40 290 C 170 250, 260 185, 310 155 C 380 112, 460 72, 560 28"
                stroke="url(#introNoseTrailGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeDasharray="9 8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 1, 1],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 1.9,
                  delay: 0.25,
                  times: [0, 0.7, 1],
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* Composite Big iGUIDE Logo (True Nose-Forward Takeoff & Glide-In Docking) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex w-[220px] flex-col items-center sm:w-[270px]"
            >
              {/* True nose-forward flight:
                  1) Brief anticipation pullback
                  2) Accelerates forward & upward off top-right
                  3) Seamless invisible reset to bottom-left
                  4) Glides smoothly forward & upward right back onto the logo with a gentle spring dock! */}
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: [0, -10, 240, -230, -90, 8, 0],
                  y: [0, 6, -165, 145, 52, -5, 0],
                  rotate: [0, -5, -10, -8, -4, 2, 0],
                  scale: [1, 0.97, 0.68, 0.62, 0.92, 1.04, 1],
                  opacity: [1, 1, 0, 0, 0.95, 1, 1],
                }}
                transition={{
                  duration: 2.05,
                  times: [0, 0.12, 0.42, 0.44, 0.68, 0.88, 1],
                  ease: "easeInOut",
                }}
                className="relative z-20 w-full"
                style={{ willChange: "transform, opacity" }}
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

            {/* Brand Tagline fades in cleanly right as the airplane docks back onto the logo */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.6 }}
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
