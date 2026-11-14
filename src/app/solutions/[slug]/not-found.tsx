import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import { Container, EyebrowLabel } from "@/components/ui/primitives";

export default function SolutionNotFound() {
  return (
    <section className="relative overflow-hidden bg-navy py-28 text-cloud sm:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-neural-grid bg-[size:36px_36px] opacity-20"
        aria-hidden="true"
      />
      <Container className="relative z-10 text-center">
        <EyebrowLabel variant="dark">SOLUTION NOT FOUND · 404</EyebrowLabel>

        <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-lavender">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </div>

        <h1 className="mx-auto mt-6 max-w-2xl font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
          This Solution Route Is Unavailable or Unpublished.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300">
          The requested solution page could not be found or is currently saved
          as a draft in the iGUIDE CMS. Explore our six published AI-powered
          educational solutions below.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 rounded-pill bg-iris px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-iris-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Explore All Solutions</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>Contact iGUIDE</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
