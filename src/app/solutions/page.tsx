import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  School,
  Sparkles,
} from "lucide-react";
import {
  getPageContentBySlug,
  getSolutions,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  Container,
  DynamicIcon,
  EyebrowLabel,
  SectionHeading,
} from "@/components/ui/primitives";
import {
  ConnectedEcosystemDiagram,
  InstitutionalImpactEstimator,
  SolutionShowcaseReveal,
  SolutionsHeroShowcase,
  SolutionThematicVisual,
} from "@/components/solutions/solutions-sections";

export async function generateMetadata() {
  const page = await getPageContentBySlug("solutions");
  return buildPageMetadata({
    title:
      page?.seoTitle ||
      "Our Solutions | Intelligent Solutions for Evolving Learning Needs | iGUIDE",
    description:
      page?.seoDescription ||
      "Explore a connected vision of personalised learning, AI-supported tutoring, interactive engagement, meaningful assessment, and data-informed education.",
    path: "/solutions",
  });
}

const DEFAULT_SOLUTION_FEATURES: Record<string, string[]> = {
  "personalised-learning": [
    "Adaptive Paths",
    "Individualised Experiences",
    "Learner-Centred Approach",
  ],
  "ai-tutors": [
    "Intelligent Assistance",
    "Conversational Interaction",
    "Learning Support",
  ],
  "skill-assessment": [
    "Continuous Evaluation",
    "Competency Mapping",
    "Strength Identification",
  ],
  "gamified-learning": [
    "Puzzles and Riddles",
    "Interactive Challenges",
    "Game-Based Engagement",
  ],
  "learning-analytics": [
    "Progress Tracking",
    "Knowledge-Gap Identification",
    "Data-Informed Insights",
  ],
  "institutional-solutions": [
    "Schools",
    "Higher Education",
    "Training Organisations",
  ],
};

const WHO_WE_SUPPORT_CARDS = [
  {
    title: "Schools",
    subtitle: "Primary & Secondary Education",
    icon: School,
    accent: "from-iris/15 via-lavender-soft/60 to-white",
    description:
      "Potential applications include differentiated classroom learning pathways, guided homework assistance, continuous foundational skill checks, and engaging concept-reinforcement challenges.",
    applications: [
      "Adaptive learning paths aligned to classroom topics",
      "Guided Socratic tutoring for independent study",
      "Early identification of foundational concept gaps",
    ],
  },
  {
    title: "Colleges and Universities",
    subtitle: "Higher & Further Education",
    icon: GraduationCap,
    accent: "from-sky-intel/15 via-sky-tint/70 to-white",
    description:
      "Potential applications span modular subject support across large cohorts, competency mapping for complex disciplines, and academic progress visibility for faculties and departments.",
    applications: [
      "24/7 conversational concept support across seminars",
      "Competency mapping for degree and diploma pathways",
      "Cohort-level learning analytics for academic educators",
    ],
  },
  {
    title: "Training Organisations",
    subtitle: "Professional & Vocational Learning",
    icon: Briefcase,
    accent: "from-emerald-success/15 via-lavender-soft/45 to-white",
    description:
      "Potential applications include structured capability assessments, personalised upskilling pathways, interactive scenario challenges, and clear skill-readiness reporting.",
    applications: [
      "Role-focused skill assessment and baseline mapping",
      "Self-paced adaptive modules for diverse learners",
      "Actionable progress insights for programme facilitators",
    ],
  },
];

export default async function SolutionsPage() {
  const [page, solutions] = await Promise.all([
    getPageContentBySlug("solutions"),
    getSolutions(true),
  ]);

  const eyebrow = page?.eyebrow || "OUR SOLUTIONS";
  const heroTitle =
    page?.title || "Intelligent Solutions for Evolving Learning Needs.";
  const subtitle =
    page?.subtitle ||
    "Explore a connected vision of personalised learning, AI-supported tutoring, interactive engagement, meaningful assessment, and data-informed education.";

  return (
    <>
      {/* =====================================================================
          SECTION 1: SOLUTIONS HERO
          Modern hero with animated abstract learning nodes & floating panels
         ===================================================================== */}
      <section className="relative overflow-hidden border-b border-white/10 bg-navy pt-10 pb-20 text-cloud sm:pt-14 sm:pb-28">
        <div
          className="pointer-events-none absolute inset-0 bg-neural-grid bg-[size:36px_36px] opacity-20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-28 right-1/4 h-[460px] w-[460px] rounded-full bg-iris/25 blur-[130px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-0 left-10 h-[360px] w-[360px] rounded-full bg-sky-intel/20 blur-[120px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-300"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight
              className="h-3.5 w-3.5 text-slate-500"
              aria-hidden="true"
            />
            <span className="font-semibold text-lavender">Our Solutions</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left 6 Columns: Editorial Copy */}
            <div className="lg:col-span-6">
              <div className="mb-4">
                <EyebrowLabel variant="dark">{eyebrow}</EyebrowLabel>
              </div>

              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
                {heroTitle.includes("Evolving Learning Needs") ? (
                  <>
                    Intelligent Solutions for{" "}
                    <span className="text-gradient-dark">
                      Evolving Learning Needs.
                    </span>
                  </>
                ) : (
                  heroTitle
                )}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#solution-discovery"
                  className="inline-flex items-center gap-2 rounded-pill bg-iris px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-iris-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                >
                  <span>Explore the Possibilities</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  <span>Discuss Your Requirements</span>
                </Link>
              </div>
            </div>

            {/* Right 6 Columns: Animated Abstract Learning Nodes & Floating Panels */}
            <div className="lg:col-span-6">
              <SolutionsHeroShowcase solutions={solutions} />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 2: SOLUTION DISCOVERY
          Alternating full-width product showcases (01–06)
         ===================================================================== */}
      <section
        id="solution-discovery"
        className="scroll-mt-20 py-24 sm:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="SOLUTION DISCOVERY"
            title="Explore the Possibilities."
            description="Six interconnected AI-powered educational capabilities—each thoughtfully designed to make learning more adaptive, engaging, and insightful."
            align="center"
          />

          <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
            {solutions.map((solution, idx) => {
              const isImageLeft = idx % 2 === 0;
              const numLabel = `0${idx + 1}`;
              const displayTitle = solution.shortTitle || solution.title;
              const threeFeatures: string[] = (
                DEFAULT_SOLUTION_FEATURES[solution.slug] ||
                (solution.keyCapabilities?.length
                  ? solution.keyCapabilities
                      .slice(0, 3)
                      .map((cap) =>
                        typeof cap === "string" ? cap : cap.title
                      )
                  : [
                      "Adaptive Architecture",
                      "Human-Centred Design",
                      "Pedagogical Clarity",
                    ])
              ).slice(0, 3);

              return (
                <SolutionShowcaseReveal
                  key={solution.id}
                  id={`solution-0${idx + 1}`}
                  delay={0.05}
                  className="scroll-mt-28 rounded-hero border border-border bg-white p-6 shadow-card transition hover:border-iris/35 sm:p-10 lg:p-12"
                >
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Illustrated Thematic Panel (Alternating Left / Right on Desktop) */}
                    <div
                      className={cn(
                        "lg:col-span-7",
                        isImageLeft ? "lg:order-1" : "lg:order-2"
                      )}
                    >
                      <SolutionThematicVisual
                        slug={solution.slug}
                        index={idx}
                        title={displayTitle}
                      />
                    </div>

                    {/* Product Showcase Content Column */}
                    <div
                      className={cn(
                        "lg:col-span-5",
                        isImageLeft ? "lg:order-2" : "lg:order-1"
                      )}
                    >
                      <div className="inline-flex items-center gap-3 rounded-full border border-iris/20 bg-lavender-soft/75 px-3.5 py-1.5">
                        <span className="font-heading text-xs font-extrabold tracking-widest text-iris">
                          SOLUTION {numLabel}
                        </span>
                        <span
                          className="h-1 w-1 rounded-full bg-iris"
                          aria-hidden="true"
                        />
                        <span className="text-xs font-semibold text-navy">
                          {solution.category}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-3.5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lavender-soft text-iris">
                          <DynamicIcon
                            name={solution.iconName}
                            className="h-6 w-6"
                          />
                        </div>
                        <h3 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                          {displayTitle}
                        </h3>
                      </div>

                      <p className="mt-4 text-base leading-relaxed text-slate-600">
                        {solution.summary}
                      </p>

                      {/* Three Key Features */}
                      <div className="mt-6">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                          Key Capabilities
                        </p>
                        <ul className="mt-3 space-y-2.5">
                          {threeFeatures.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-3 rounded-xl border border-border bg-cloud px-4 py-2.5 text-sm font-semibold text-ink"
                            >
                              <CheckCircle2
                                className="h-4 w-4 shrink-0 text-iris"
                                aria-hidden="true"
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Explore Solution CTA */}
                      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                        <Link
                          href={`/solutions/${solution.slug}`}
                          className="inline-flex items-center gap-2 rounded-pill bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
                        >
                          <span>Explore Solution</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <span className="text-xs font-medium text-slate-400">
                          {numLabel} / 06 · iGUIDE Ecosystem
                        </span>
                      </div>
                    </div>
                  </div>
                </SolutionShowcaseReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 3: CONNECTED LEARNING ECOSYSTEM
          Heading: "Different Capabilities. One Shared Vision."
         ===================================================================== */}
      <section className="relative overflow-hidden border-y border-white/10 bg-navy py-24 text-cloud sm:py-32">
        <div
          className="pointer-events-none absolute inset-0 bg-neural-grid bg-[size:40px_40px] opacity-15"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <SectionHeading
            eyebrow="CONNECTED LEARNING ECOSYSTEM"
            title="Different Capabilities. One Shared Vision."
            description="Every iGUIDE offering is designed as part of a coherent educational architecture—where adaptive pathways, conversational tutoring, continuous assessment, interactive challenges, and analytics work in harmony."
            align="center"
            theme="dark"
          />

          <ConnectedEcosystemDiagram solutions={solutions} />
        </Container>
      </section>

      {/* =====================================================================
          SECTION 4: WHO WE SUPPORT
          Three premium cards: Schools, Colleges and Universities, Training Organisations
         ===================================================================== */}
      <section className="bg-lavender-soft/35 py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="WHO WE SUPPORT"
            title="Designed for Diverse Educational Environments."
            description="Explore how iGUIDE's intelligent learning capabilities can be applied across academic and professional learning settings."
            align="center"
          />

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {WHO_WE_SUPPORT_CARDS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <SolutionShowcaseReveal
                  key={item.title}
                  delay={idx * 0.08}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-hero border border-border bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated"
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b opacity-80",
                      item.accent
                    )}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-iris/20 bg-white p-3 text-iris shadow-subtle">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-border bg-cloud px-3 py-1 text-[11px] font-semibold text-slate-600">
                        {item.subtitle}
                      </span>
                    </div>

                    <h3 className="mt-6 font-heading text-2xl font-bold text-ink">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-6 border-t border-border pt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.13em] text-iris">
                        Potential Applications
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {item.applications.map((app) => (
                          <li
                            key={app}
                            className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-success"
                              aria-hidden="true"
                            />
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 border-t border-border pt-4">
                    <Link
                      href={`/contact?subject=${encodeURIComponent(
                        `Enquiry for ${item.title}`
                      )}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-iris transition group-hover:translate-x-0.5"
                    >
                      <span>Discuss applications for {item.title}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </SolutionShowcaseReveal>
              );
            })}
          </div>

          <InstitutionalImpactEstimator />
        </Container>
      </section>

      {/* =====================================================================
          SECTION 5: ENQUIRY CTA
          Heading: "Find the Right Direction for Your Learning Needs."
          Primary CTA: "Discuss Your Requirements"
          Secondary CTA: "Contact iGUIDE"
         ===================================================================== */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-hero border border-border bg-navy px-6 py-16 text-cloud shadow-navy sm:px-14 sm:py-20">
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-iris/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-intel/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-lavender">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Tailored Educational Pathways
              </span>

              <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Find the Right Direction for Your Learning Needs.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Whether you are exploring a single capability or planning a
                connected educational ecosystem, our team is ready to discuss
                your goals and requirements.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact?intent=requirements"
                  className="inline-flex items-center gap-2 rounded-pill bg-iris px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-iris-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
                >
                  <span>Discuss Your Requirements</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Contact iGUIDE</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
