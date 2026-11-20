import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Compass } from "lucide-react";
import {
  Container,
  EyebrowLabel,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/primitives";

export default function BlogArticleNotFound() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F8FD] via-white to-cloud pt-36 pb-28 sm:pt-44 sm:pb-36">
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,72,131,0.12)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative z-10 text-center">
        <div className="mx-auto max-w-2xl rounded-[32px] border border-border bg-white p-10 shadow-elevated sm:p-14">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-iris/10 text-iris">
            <BookOpen className="h-6 w-6" aria-hidden="true" />
          </div>

          <EyebrowLabel>ARTICLE UNAVAILABLE</EyebrowLabel>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            We Could Not Find That Article.
          </h1>

          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            The article you are looking for may have been moved, unpublished, or the URL may be incorrect. Explore our latest published perspectives on intelligent learning below.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton href="/blogs">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Explore All Insights & Blogs</span>
            </PrimaryButton>
            <SecondaryButton href="/solutions">
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>Discover Our Solutions</span>
            </SecondaryButton>
          </div>

          <div className="mt-8 border-t border-border/70 pt-6 text-xs text-ink-muted">
            Looking for something specific?{" "}
            <Link
              href="/contact"
              className="font-semibold text-iris underline-offset-4 hover:underline"
            >
              Connect with the iGUIDE team
            </Link>
            .
          </div>
        </div>
      </Container>
    </section>
  );
}
