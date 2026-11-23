import React from "react";
import { Compass } from "lucide-react";
import {
  Container,
  EyebrowLabel,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-navy pt-36 pb-24 text-cloud">
      <Container className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-iris/20 text-lavender">
          <Compass className="h-8 w-8" aria-hidden="true" />
        </div>
        <EyebrowLabel variant="dark">404 · PATHWAY NOT FOUND</EyebrowLabel>
        <h1 className="mt-5 font-heading text-4xl font-bold text-white sm:text-5xl">
          This Learning Node Has Moved or Does Not Exist
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
          Return to the iGUIDE homepage or explore our six core AI-powered
          educational solutions.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton href="/" showArrow>
            Return to Homepage
          </PrimaryButton>
          <SecondaryButton href="/solutions" variant="dark">
            Explore Our Solutions
          </SecondaryButton>
        </div>
      </Container>
    </section>
  );
}
