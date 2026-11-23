import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  HelpCircle,
  Layers,
  Sparkles,
  Users,
} from "lucide-react";
import {
  getSolutionBySlug,
  getSolutions,
} from "@/lib/cms";
import {
  DEFAULT_SOLUTION_SECTION_ORDER,
  type SolutionBenefit,
  type SolutionSectionKey,
} from "@/lib/seed-data";
import { buildPageMetadata } from "@/lib/seo";
import {
  Breadcrumbs,
  Container,
  DynamicIcon,
  EyebrowLabel,
  SectionHeading,
} from "@/components/ui/primitives";
import { EnquiryForm } from "@/components/ui/enquiry-form";
import {
  SolutionDetailHeroVisual,
  SolutionOverviewComposition,
} from "@/components/solutions/solution-detail-sections";

export const revalidate = 60;

export async function generateStaticParams() {
  const solutions = await getSolutions(true);
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution || !solution.published) {
    return buildPageMetadata({
      title: "Solution Not Found | iGUIDE",
      path: `/solutions/${slug}`,
    });
  }
  return buildPageMetadata({
    title:
      solution.seoTitle ||
      `${solution.title} — ${solution.tagline} | iGUIDE Solutions`,
    description:
      solution.seoDescription ||
      solution.heroDescription ||
      solution.summary,
    path: `/solutions/${solution.slug}`,
    ogImage: solution.heroImage,
  });
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [solution, allPublishedSolutions] = await Promise.all([
    getSolutionBySlug(slug),
    getSolutions(true),
  ]);

  if (!solution || !solution.published) {
    notFound();
  }

  // Resolve 2–3 related published solutions from CMS
  const otherPublished = allPublishedSolutions.filter(
    (s) => s.slug !== solution.slug
  );
  const relatedSolutions = (
    solution.relatedSlugs && solution.relatedSlugs.length > 0
      ? solution.relatedSlugs
          .map((relSlug) =>
            otherPublished.find((item) => item.slug === relSlug)
          )
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : []
  );
  const displayedRelated = (
    relatedSolutions.length >= 2
      ? relatedSolutions
      : [
          ...relatedSolutions,
          ...otherPublished.filter(
            (item) => !relatedSolutions.some((r) => r.slug === item.slug)
          ),
        ]
  ).slice(0, 3);

  // Anticipated educational benefits (CMS-managed or derived gracefully)
  const benefitsList: SolutionBenefit[] =
    solution.benefits && solution.benefits.length > 0
      ? solution.benefits
      : [
          {
            title: "Human-Centred Pedagogical Clarity",
            description: solution.outcomeText,
            tag: "Educational Value",
          },
          {
            title: "Adaptable to Diverse Learning Contexts",
            description: solution.approachText,
            tag: "Flexible Direction",
          },
          {
            title: "Supports Both Educators & Learners",
            description:
              "Designed to complement classroom teaching and independent exploration without adding unnecessary complexity.",
            tag: "Collaborative Support",
          },
        ];

  const sectionOrder: SolutionSectionKey[] =
    solution.sectionOrder && solution.sectionOrder.length > 0
      ? solution.sectionOrder
      : DEFAULT_SOLUTION_SECTION_ORDER;

  const encodedSolutionTitle = encodeURIComponent(
    solution.shortTitle || solution.title
  );

  const renderSection = (sectionKey: SolutionSectionKey) => {
    switch (sectionKey) {
      /* ===================================================================
         SECTION 2: SOLUTION OVERVIEW
         Polished text-and-image composition explaining what the solution
         is intended to support.
         =================================================================== */
      case "overview":
        return (
          <section
            key="overview"
            id="solution-overview"
            className="py-20 sm:py-28"
          >
            <Container>
              <SolutionOverviewComposition solution={solution} />
            </Container>
          </section>
        );

      /* ===================================================================
         SECTION 3: KEY CAPABILITIES
         Display 3–6 CMS-managed capabilities with Title, Description,
         Icon or illustration, and Optional image.
         =================================================================== */
      case "capabilities":
        return (
          <section
            key="capabilities"
            id="key-capabilities"
            className="border-y border-border bg-subtle-gradient py-24 sm:py-32"
          >
            <Container>
              <SectionHeading
                eyebrow="KEY CAPABILITIES"
                title={`Core Capabilities of ${solution.shortTitle || solution.title}.`}
                description={
                  solution.subtitle ||
                  "Explore the foundational capabilities that shape this educational technology solution."
                }
                align="center"
              />

              <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
                {solution.keyCapabilities.slice(0, 6).map((cap, idx) => (
                  <div
                    key={cap.title}
                    className="group flex flex-col justify-between overflow-hidden rounded-hero border border-border bg-white p-7 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-iris/40 hover:shadow-elevated sm:p-8"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lavender-soft text-iris transition group-hover:bg-iris group-hover:text-white">
                          <DynamicIcon
                            name={cap.iconName || solution.iconName}
                            className="h-6 w-6"
                          />
                        </div>
                        <span className="rounded-full border border-border bg-cloud px-3 py-1 font-heading text-xs font-bold text-iris">
                          Capability 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="mt-6 font-heading text-xl font-bold text-ink sm:text-2xl">
                        {cap.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
                        {cap.description}
                      </p>
                    </div>

                    {cap.imageUrl && (
                      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-navy p-2">
                        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl bg-navy-light">
                          <Image
                            src={cap.imageUrl}
                            alt={`${cap.title} conceptual illustration`}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        );

      /* ===================================================================
         SECTION 4: BENEFITS
         Explain the anticipated educational benefits in a visually engaging
         format without unsupported performance statistics or guarantees.
         =================================================================== */
      case "benefits":
        return (
          <section
            key="benefits"
            id="educational-benefits"
            className="py-24 sm:py-32"
          >
            <Container>
              <div className="grid items-start gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <EyebrowLabel>EDUCATIONAL BENEFITS</EyebrowLabel>
                  <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    Anticipated Value for Learners & Educators.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-secondary">
                    {solution.outcomeText}
                  </p>

                  <div className="mt-8 rounded-hero border border-iris/25 bg-lavender-soft/50 p-6">
                    <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-iris">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      <span>Human-Centred Principle</span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink">
                      Designed to support thoughtful comprehension, educator
                      insight, and learner confidence—without visual noise or
                      unverified numerical claims.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
                  {benefitsList.map((benefit, idx) => (
                    <div
                      key={benefit.title}
                      className="flex flex-col justify-between rounded-feature border border-border bg-white p-6 shadow-subtle transition hover:border-iris/35"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-full bg-lavender-soft px-3 py-1 text-[11px] font-bold text-iris">
                            {benefit.tag || `Benefit 0${idx + 1}`}
                          </span>
                          <CheckCircle2
                            className="h-4 w-4 text-emerald-success"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="mt-4 font-heading text-lg font-bold text-ink">
                          {benefit.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        );

      /* ===================================================================
         SECTION 5: HOW IT WORKS — CONCEPTUAL OVERVIEW
         Create a simple visual sequence describing the intended educational
         approach. Clearly conceptual.
         =================================================================== */
      case "how-it-works":
        return (
          <section
            key="how-it-works"
            id="how-it-works"
            className="relative overflow-hidden border-y border-white/10 bg-navy py-24 text-cloud sm:py-32"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-neural-grid bg-[size:38px_38px] opacity-15"
              aria-hidden="true"
            />
            <Container className="relative z-10">
              <SectionHeading
                eyebrow="HOW IT WORKS — CONCEPTUAL OVERVIEW"
                title="Intended Educational Approach."
                description="A clear conceptual sequence illustrating how this solution is designed to support the learning journey."
                align="center"
                theme="dark"
              />

              <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                {solution.architectureSteps.map((step, idx) => (
                  <div
                    key={step.step}
                    className="relative flex flex-col justify-between rounded-hero border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-iris font-heading text-sm font-bold text-white shadow-glow">
                          {step.step || `0${idx + 1}`}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-lavender">
                          Conceptual Stage 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="mt-6 font-heading text-xl font-bold text-white">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {step.detail}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-lavender">
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Intelligence Path Sequence</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-slate-400">
                Conceptual overview: This sequence illustrates iGUIDE&apos;s
                educational design philosophy and modular solution approach.
              </p>
            </Container>
          </section>
        );

      /* ===================================================================
         SECTION 6: RELEVANT APPLICATIONS
         Show appropriate educational use contexts.
         =================================================================== */
      case "applications":
        return (
          <section
            key="applications"
            id="relevant-applications"
            className="py-24 sm:py-32"
          >
            <Container>
              <SectionHeading
                eyebrow="RELEVANT APPLICATIONS"
                title="Educational Contexts & Use Scenarios."
                description={`Explore how ${
                  solution.shortTitle || solution.title
                } can be applied across diverse learning environments.`}
                align="center"
              />

              <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
                {solution.useCases.map((uc, idx) => (
                  <div
                    key={uc.audience}
                    className="flex flex-col justify-between rounded-hero border border-border bg-white p-7 shadow-card"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-soft text-iris">
                          <Users className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Context 0{idx + 1}
                        </span>
                      </div>

                      <h3 className="mt-5 font-heading text-xl font-bold text-ink">
                        {uc.audience}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                        {uc.scenario}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-border pt-4">
                      <Link
                        href={`/contact?solution=${encodedSolutionTitle}&subject=${encodeURIComponent(
                          `${solution.title} for ${uc.audience}`
                        )}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-iris hover:underline"
                      >
                        <span>Enquire for {uc.audience}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {solution.faqs && solution.faqs.length > 0 && (
                <div className="mx-auto mt-14 max-w-3xl rounded-hero border border-border bg-cloud p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-iris">
                    <HelpCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Solution Clarification</span>
                  </div>
                  <div className="mt-4 space-y-4">
                    {solution.faqs.map((faq) => (
                      <div
                        key={faq.question}
                        className="rounded-2xl border border-border bg-white p-5"
                      >
                        <h4 className="font-heading text-base font-bold text-ink">
                          {faq.question}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Container>
          </section>
        );

      /* ===================================================================
         SECTION 7: RELATED SOLUTIONS
         Display 2–3 related published solutions from the CMS.
         =================================================================== */
      case "related-solutions":
        return (
          <section
            key="related-solutions"
            id="related-solutions"
            className="border-t border-border bg-lavender-soft/35 py-24 sm:py-32"
          >
            <Container>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                  eyebrow="CONNECTED ECOSYSTEM"
                  title="Related Solutions from iGUIDE."
                  description="Explore complementary capabilities across the iGUIDE Intelligence Path."
                />
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 rounded-pill border border-border bg-white px-5 py-2.5 text-xs font-semibold text-ink shadow-subtle transition hover:border-iris hover:text-iris"
                >
                  <span>View All 6 Solutions</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                {displayedRelated.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/solutions/${rel.slug}`}
                    className="group flex flex-col justify-between rounded-hero border border-border bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lavender-soft text-iris transition group-hover:bg-iris group-hover:text-white">
                          <DynamicIcon
                            name={rel.iconName}
                            className="h-5 w-5"
                          />
                        </div>
                        <span className="rounded-full border border-border bg-cloud px-3 py-1 text-[11px] font-semibold text-slate-600">
                          {rel.category}
                        </span>
                      </div>

                      <h3 className="mt-5 font-heading text-xl font-bold text-ink group-hover:text-iris">
                        {rel.title}
                      </h3>

                      <p className="mt-2 text-xs font-semibold text-iris">
                        {rel.tagline}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                        {rel.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-iris">
                      <span>Explore {rel.shortTitle || rel.title}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        );

      /* ===================================================================
         SECTION 8: ENQUIRY CTA
         Heading: "Interested in Exploring This Solution?"
         Provide: "Enquire Now" and "Contact Us" preserving the selected
         solution in the enquiry form, plus an inline solution enquiry form.
         =================================================================== */
      case "enquiry-cta":
        return (
          <section
            key="enquiry-cta"
            id="solution-enquiry"
            className="scroll-mt-20 py-24 sm:py-32"
          >
            <Container>
              {/* Prominent Enquiry CTA Banner */}
              <div className="relative overflow-hidden rounded-hero border border-border bg-navy px-6 py-14 text-cloud shadow-navy sm:px-12 sm:py-16">
                <div
                  className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-iris/30 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-lavender">
                      <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{solution.shortTitle || solution.title}</span>
                    </span>
                    <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      {solution.ctaText ||
                        "Interested in Exploring This Solution?"}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-300">
                      Connect with the iGUIDE team to discuss how{" "}
                      <strong className="text-white">{solution.title}</strong>{" "}
                      can support your school, college, university, or training
                      organisation.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/contact?solution=${encodedSolutionTitle}#enquiry-form`}
                      className="inline-flex items-center gap-2 rounded-pill bg-iris px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-iris-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                    >
                      <span>Enquire Now</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href={`/contact?solution=${encodedSolutionTitle}`}
                      className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                    >
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Direct Solution-Preselected Enquiry Form */}
              <div className="mt-16 grid items-start gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <EyebrowLabel>DIRECT SOLUTION ENQUIRY</EyebrowLabel>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-ink sm:text-3xl">
                    Enquire About {solution.shortTitle || solution.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    Your selected solution (
                    <strong className="text-ink">
                      {solution.shortTitle || solution.title}
                    </strong>
                    ) is pre-selected in this form—or click{" "}
                    <Link
                      href={`/contact?solution=${encodedSolutionTitle}`}
                      className="font-semibold text-iris underline"
                    >
                      Enquire Now / Contact Us
                    </Link>{" "}
                    above to open the dedicated Contact page with{" "}
                    {solution.shortTitle || solution.title} pre-populated.
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <EnquiryForm
                    solutions={allPublishedSolutions.map(
                      (s) => s.shortTitle || s.title
                    )}
                    defaultSolution={solution.shortTitle || solution.title}
                  />
                </div>
              </div>
            </Container>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* =====================================================================
          SECTION 1: SOLUTION HERO
          Breadcrumb, Solution eyebrow label, Large solution-specific heading,
          Supporting description, Primary "Enquire About This Solution" CTA,
          and Distinctive themed visual.
         ===================================================================== */}
      <section className="relative overflow-hidden border-b border-white/10 bg-navy pt-32 pb-20 text-cloud sm:pt-40 sm:pb-28">
        <div
          className="pointer-events-none absolute inset-0 bg-neural-grid bg-[size:36px_36px] opacity-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 right-1/4 h-[420px] w-[420px] rounded-full bg-iris/25 blur-[130px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Our Solutions", href: "/solutions" },
              { label: solution.shortTitle || solution.title },
            ]}
            theme="dark"
          />

          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left 6 Columns: Solution Hero Copy */}
            <div className="lg:col-span-6">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-iris/25 text-lavender">
                  <DynamicIcon name={solution.iconName} className="h-5 w-5" />
                </div>
                <EyebrowLabel variant="dark">
                  {solution.category || "iGUIDE SOLUTION"}
                </EyebrowLabel>
              </div>

              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:leading-[1.08]">
                {solution.title}
              </h1>

              <p className="mt-4 font-heading text-lg font-semibold text-gradient-dark sm:text-2xl">
                {solution.tagline}
              </p>

              <p className="mt-5 text-base leading-relaxed text-slate-200 sm:text-lg">
                {solution.heroDescription || solution.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/contact?solution=${encodedSolutionTitle}#enquiry-form`}
                  className="inline-flex items-center gap-2 rounded-pill bg-iris px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-iris-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                >
                  <span>Enquire About This Solution</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>All Solutions</span>
                </Link>
              </div>
            </div>

            {/* Right 6 Columns: Distinctive Themed Visual */}
            <div className="lg:col-span-6">
              <SolutionDetailHeroVisual solution={solution} />
            </div>
          </div>
        </Container>
      </section>

      {/* Render CMS-ordered sections (2 through 8) */}
      {sectionOrder.map((sectionKey) => renderSection(sectionKey))}
    </>
  );
}
