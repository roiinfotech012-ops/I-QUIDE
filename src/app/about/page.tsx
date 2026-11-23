import React from "react";
import Image from "next/image";
import {
  BarChart3,
  BrainCircuit,
  Compass,
  HeartHandshake,
  Layers,
  Sparkles,
  Waypoints,
} from "lucide-react";
import {
  getPageContentBySlug,
  getSiteSettings,
  getSolutions,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  Breadcrumbs,
  Container,
  EyebrowLabel,
  GradientText,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
} from "@/components/ui/primitives";
import { AnimatedReveal } from "@/components/ui/animated-reveal";
import {
  AboutHeroIllustration,
  type ApproachPrinciple,
  EducationalEcosystemConnected,
  OurApproachInteractive,
  ParadigmComparisonSection,
} from "@/components/about/about-sections";

export async function generateMetadata() {
  const page = await getPageContentBySlug("about");
  return buildPageMetadata({
    title:
      page?.seoTitle ||
      "About Us | iGUIDE — Technology with Intelligence. Learning with Purpose.",
    description: page?.seoDescription,
    path: "/about",
  });
}

const ABOUT_STRENGTH_IMAGES = [
  { src: "/images/about-vision.jpg", alt: "Intelligent Education Technology architecture" },
  { src: "/images/solution-personalised-learning.jpg", alt: "Personalised adaptive learning experience" },
  { src: "/images/solution-gamified-learning.jpg", alt: "Interactive learning experiences and engagement" },
  { src: "/images/solution-learning-analytics.jpg", alt: "Data-informed learning insights" },
  { src: "/images/solution-institutional-solutions.jpg", alt: "Scalable institutional education ecosystem" },
];

function renderStrengthIllustration(index: number) {
  const img = ABOUT_STRENGTH_IMAGES[index % ABOUT_STRENGTH_IMAGES.length];
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/80 bg-navy shadow-subtle">
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover transition-transform duration-700 hover:scale-105"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

export default async function AboutPage() {
  const [settings, page, solutions] = await Promise.all([
    getSiteSettings(),
    getPageContentBySlug("about"),
    getSolutions(true),
  ]);

  const sections = (page?.sectionsJson || {}) as {
    storyEyebrow?: string;
    storyHeading?: string;
    storyLead?: string;
    storyBody?: string;
    humanPurposeTitle?: string;
    humanPurposeBody?: string;
    visionCardLabel?: string;
    visionCardStatement?: string;
    visionCardSubtext?: string;
    missionCardLabel?: string;
    missionCardStatement?: string;
    missionCardSubtext?: string;
    approachEyebrow?: string;
    approachHeading?: string;
    approachDescription?: string;
    principles?: ApproachPrinciple[];
    ecosystemEyebrow?: string;
    ecosystemHeading?: string;
    ecosystemDescription?: string;
    whyEyebrow?: string;
    whyHeading?: string;
    whyDescription?: string;
    strengths?: {
      code: string;
      title: string;
      subtitle: string;
      description: string;
    }[];
    closingCtaHeading?: string;
    closingCtaDescription?: string;
  };

  const principles: ApproachPrinciple[] = sections.principles || [
    {
      code: "01",
      title: "Artificial Intelligence",
      tagline: "Adaptive intelligence that responds to individual comprehension.",
      detail:
        "We apply artificial intelligence thoughtfully to model concept dependencies, calibrate learning paths, and provide conversational Socratic support—ensuring intelligence serves genuine understanding rather than passive automation.",
      pillars: [
        "Adaptive pathway routing tailored to learner readiness",
        "Contextual Socratic assistance and concept scaffolding",
        "Explainable, educator-aligned pedagogical boundaries",
      ],
    },
    {
      code: "02",
      title: "Educational Innovation",
      tagline: "Modernising how knowledge is structured and experienced.",
      detail:
        "Educational innovation means moving beyond static slides and one-size-fits-all curricula. We design multi-modal learning environments that combine visual topologies, structured explanations, and guided inquiry.",
      pillars: [
        "Connected curriculum knowledge graphs",
        "Multi-modal representations for diverse learning styles",
        "Universal Design for Learning (UDL) accessibility focus",
      ],
    },
    {
      code: "03",
      title: "Meaningful Engagement",
      tagline: "Cultivating active curiosity and intellectual discovery.",
      detail:
        "Engagement is strongest when learners actively participate in solving problems. Through interactive challenges, conceptual puzzles, and constructive feedback loops, we turn study time into purposeful exploration.",
      pillars: [
        "Interactive challenges and conceptual logic activities",
        "Low-stress formative checkpoints that build confidence",
        "Clear mastery progression along the Intelligence Path",
      ],
    },
    {
      code: "04",
      title: "Learning Analytics",
      tagline: "Illuminating progress and knowledge gaps with clarity.",
      detail:
        "Actionable learning insights help both learners and educators understand where competencies are strong and where additional support is needed—transforming assessment from a post-mortem score into an ongoing compass.",
      pillars: [
        "Early knowledge-gap and prerequisite identification",
        "Clear progress monitoring across concepts and skills",
        "Privacy-conscious insights for educators and institutions",
      ],
    },
  ];

  const strengths = sections.strengths || [
    {
      code: "01",
      title: "Intelligent education technology",
      subtitle: "Purpose-built AI architecture for education",
      description:
        "Rather than retrofitting generic software for classrooms, iGUIDE designs intelligent systems specifically around comprehension, curriculum alignment, and human-centred learning.",
    },
    {
      code: "02",
      title: "Personalisation",
      subtitle: "Pathways calibrated to every individual mind",
      description:
        "Adaptive pacing, prerequisite scaffolding, and flexible concept representations ensure learners receive the right level of challenge and support at the right moment.",
    },
    {
      code: "03",
      title: "Interactive experiences",
      subtitle: "Dialogue, challenges, and active discovery",
      description:
        "From conversational AI tutors to gamified logic challenges, learners engage actively with ideas instead of passively consuming static pages.",
    },
    {
      code: "04",
      title: "Data-informed learning insights",
      subtitle: "Clarity on strengths, progress, and knowledge gaps",
      description:
        "Continuous skill diagnostics and readable analytics empower educators and learners to make timely, informed decisions throughout the learning journey.",
    },
    {
      code: "05",
      title: "Scalable institutional applications",
      subtitle: "Built for schools, colleges, universities & training",
      description:
        "A modular, extensible ecosystem that adapts smoothly to single departments, entire campuses, or specialised professional training programmes.",
    },
  ];

  return (
    <>
      {/* =====================================================================
          SECTION 1: EDITORIAL ABOUT HERO
          Split composition, oversized headline, lavender accents & custom animated line patterns
      ====================================================================== */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-20 text-cloud sm:pt-40 sm:pb-28 lg:pb-32">
        {/* Subtle Lavender & Iris Radial Accents */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(240,195,42,0.22)_0%,rgba(30,72,131,0.10)_45%,rgba(11,16,38,0)_75%)] blur-3xl"
          aria-hidden="true"
        />

        {/* Custom Background Line Patterns */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
          viewBox="0 0 1440 600"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-80 480 C 320 440, 560 180, 920 220 C 1180 250, 1320 110, 1520 60"
            stroke="#F0C32A"
            strokeWidth="2"
          />
          <path
            d="M-80 540 C 360 490, 620 280, 980 290 C 1220 300, 1360 180, 1520 130"
            stroke="#2B64B0"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>

        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: "About Us" }]} theme="dark" />

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Split Column: Oversized Editorial Headline */}
            <AnimatedReveal className="lg:col-span-7">
              <EyebrowLabel variant="dark">
                {page?.eyebrow || "ABOUT iGUIDE"}
              </EyebrowLabel>

              <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.55rem] lg:leading-[1.08]">
                Technology with Intelligence.{" "}
                <span className="mt-1 block">
                  <GradientText>Learning with Purpose.</GradientText>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
                {page?.subtitle ||
                  "Explore our vision for a world where intelligent technology helps create more adaptive, engaging, and accessible learning experiences."}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <PrimaryButton href="/solutions" showArrow>
                  Explore Our Solutions
                </PrimaryButton>
                <SecondaryButton href="/contact" variant="dark">
                  Get in Touch
                </SecondaryButton>
              </div>
            </AnimatedReveal>

            {/* Right Split Column: Abstract Intelligence Path Illustration */}
            <AnimatedReveal delay={0.12} className="lg:col-span-5">
              <AboutHeroIllustration />
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 2: OUR STORY
          Asymmetric Two-Column Layout + Large Thematic Visual + Contrasting Human-Purpose Panel
      ====================================================================== */}
      <section className="py-24 sm:py-32 lg:py-36">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Left 5 Columns: Editorial Story Narrative + Contrasting Information Panel */}
            <AnimatedReveal className="lg:col-span-5">
              <EyebrowLabel>
                {sections.storyEyebrow || "OUR STORY"}
              </EyebrowLabel>

              <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:leading-[1.15]">
                {sections.storyHeading ||
                  "Reimagining What's Possible in Education."}
              </h2>

              <p className="mt-6 text-base font-medium leading-relaxed text-ink sm:text-lg">
                {sections.storyLead ||
                  "iGUIDE focuses on AI-powered educational technology intended to support personalised, effective, and engaging learning across diverse academic and training environments."}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
                {sections.storyBody ||
                  "Learning is deeply personal. Every learner brings unique curiosity, prior knowledge, and ways of understanding complex concepts. Yet traditional educational tools often deliver uniform content at a single fixed pace. iGUIDE exists to bridge that gap—bringing together thoughtful artificial intelligence and human-centred design so technology adapts to the learner, rather than forcing the learner to adapt to rigid software."}
              </p>

              {/* Smaller Contrasting Information Panel Highlighting the Human-Centred Purpose of Technology */}
              <div className="mt-8 rounded-feature bg-navy p-7 text-cloud shadow-elevated">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-iris/25 text-lavender">
                    <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {sections.humanPurposeTitle ||
                      "The Human-Centred Purpose of Technology"}
                  </h3>
                </div>
                <p className="mt-3.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {sections.humanPurposeBody ||
                    "Technology in education should never exist for complexity or novelty. Its true purpose is to remove friction, clarify understanding, empower educators with meaningful insight, and open accessible pathways for every mind to grow."}
                </p>
              </div>
            </AnimatedReveal>

            {/* Right 7 Columns: Large Thematic Custom Illustration */}
            <AnimatedReveal delay={0.12} className="lg:col-span-7">
              <div className="overflow-hidden rounded-hero border border-border bg-white p-6 shadow-elevated sm:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-iris">
                      Pedagogical Philosophy Visual
                    </span>
                    <h3 className="mt-1 font-heading text-xl font-bold text-ink">
                      Where Human Potential Meets Intelligent Guidance
                    </h3>
                  </div>
                  <span className="rounded-full bg-iris-light px-3.5 py-1 text-xs font-semibold text-iris">
                    Adaptive · Engaging · Accessible
                  </span>
                </div>

                {/* Custom Multi-Layered SVG Thematic Illustration */}
                <div className="my-7 overflow-hidden rounded-2xl border border-border bg-subtle-gradient p-6">
                  <svg
                    viewBox="0 0 640 300"
                    className="h-auto w-full"
                    role="img"
                    aria-label="Thematic illustration showing individual learner curiosity supported by adaptive pathways and educator insight"
                  >
                    <defs>
                      <linearGradient
                        id="storyPathGrad"
                        x1="40"
                        y1="230"
                        x2="600"
                        y2="70"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#2B64B0" />
                        <stop offset="50%" stopColor="#1E4883" />
                        <stop offset="100%" stopColor="#F0C32A" />
                      </linearGradient>
                    </defs>

                    {/* Background concentric learning rings */}
                    <circle
                      cx="320"
                      cy="150"
                      r="118"
                      stroke="#D8E4F8"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="320"
                      cy="150"
                      r="78"
                      stroke="#C5D6F5"
                      strokeWidth="1.5"
                      strokeDasharray="6 6"
                    />

                    {/* Adaptive pathways */}
                    <path
                      d="M 55 235 C 165 230, 210 150, 320 150 C 430 150, 475 75, 585 65"
                      stroke="url(#storyPathGrad)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 55 85 C 165 95, 220 150, 320 150 C 420 150, 475 210, 585 220"
                      stroke="#2B64B0"
                      strokeOpacity="0.4"
                      strokeWidth="2.5"
                      strokeDasharray="7 7"
                      fill="none"
                    />

                    {/* Cards inside illustration */}
                    <rect
                      x="45"
                      y="35"
                      width="160"
                      height="62"
                      rx="14"
                      fill="#FFFFFF"
                      stroke="#E5EAF4"
                    />
                    <text
                      x="65"
                      y="62"
                      fill="#1E4883"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      INDIVIDUAL PACE
                    </text>
                    <text
                      x="65"
                      y="81"
                      fill="#101428"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      Curiosity & Inquiry
                    </text>

                    <rect
                      x="435"
                      y="198"
                      width="165"
                      height="62"
                      rx="14"
                      fill="#0B1D3A"
                    />
                    <text
                      x="455"
                      y="224"
                      fill="#F0C32A"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      SHARED PURPOSE
                    </text>
                    <text
                      x="455"
                      y="243"
                      fill="#FAFBFF"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="Inter, sans-serif"
                    >
                      Confident Mastery
                    </text>

                    {/* Central convergence node */}
                    <circle
                      cx="320"
                      cy="150"
                      r="28"
                      fill="#0B1D3A"
                      stroke="#1E4883"
                      strokeWidth="4"
                    />
                    <circle cx="320" cy="150" r="9" fill="#F0C32A" />
                    <circle cx="55" cy="235" r="9" fill="#2B64B0" />
                    <circle cx="585" cy="65" r="10" fill="#16A085" />
                  </svg>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: Compass,
                      title: "Personalised",
                      detail: "Adapting to individual learning paths and tempo",
                    },
                    {
                      icon: Sparkles,
                      title: "Effective",
                      detail: "Grounded in conceptual clarity and scaffolding",
                    },
                    {
                      icon: Layers,
                      title: "Engaging",
                      detail: "Interactive challenges and conversational guidance",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-border bg-cloud p-4"
                      >
                        <Icon
                          className="h-5 w-5 text-iris"
                          aria-hidden="true"
                        />
                        <p className="mt-2.5 font-heading text-sm font-bold text-ink">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-ink-secondary">
                          {item.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 3: VISION AND MISSION
          Two Oversized, Artistically Arranged Cards:
          - Vision Card: Lavender & White background + Abstract Growth Visual
          - Mission Card: Midnight background + Delicate Blue AI-Network Visual
      ====================================================================== */}
      <section className="border-y border-border bg-cloud py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="PURPOSE & DIRECTION"
            title="Guided by a Clear Vision."
            highlightedTitle="Driven by a Focused Mission."
            align="center"
          />

          <div className="mt-14 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* VISION CARD — Lavender & White Background + Abstract Growth Visual */}
            <AnimatedReveal className="lg:col-span-6">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-hero border border-lavender/35 bg-gradient-to-br from-lavender-light via-white to-ice/70 p-8 shadow-elevated sm:p-12">
                <div>
                  <EyebrowLabel variant="light">
                    {sections.visionCardLabel || "OUR VISION"}
                  </EyebrowLabel>

                  <h3 className="mt-6 font-heading text-2xl font-extrabold leading-[1.2] tracking-tight text-ink sm:text-3xl lg:text-4xl">
                    &ldquo;
                    {sections.visionCardStatement || settings.visionStatement}
                    &rdquo;
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-secondary sm:text-base">
                    {sections.visionCardSubtext ||
                      "Expanding educational opportunity through responsive pathways that adapt to how each individual learns best."}
                  </p>
                </div>

                {/* Abstract Growth Visual */}
                <div className="mt-10 overflow-hidden rounded-2xl border border-lavender/30 bg-white/85 p-5 shadow-subtle backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-iris">
                    <span>Abstract Growth Trajectory</span>
                    <span>Adaptive · Engaging · Accessible</span>
                  </div>
                  <svg
                    viewBox="0 0 480 130"
                    className="h-28 w-full"
                    role="img"
                    aria-label="Abstract growth visual with ascending lavender and iris curves"
                  >
                    <defs>
                      <linearGradient
                        id="visionGrowthFill"
                        x1="240"
                        y1="15"
                        x2="240"
                        y2="125"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#1E4883" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#F0C32A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20 112 C 120 108, 180 78, 270 58 C 350 40, 400 22, 460 18 L 460 120 L 20 120 Z"
                      fill="url(#visionGrowthFill)"
                    />
                    <path
                      d="M 20 112 C 120 108, 180 78, 270 58 C 350 40, 400 22, 460 18"
                      stroke="#1E4883"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 20 112 C 140 95, 220 92, 320 62 C 385 42, 420 35, 460 18"
                      stroke="#F0C32A"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      fill="none"
                    />
                    <circle cx="135" cy="95" r="6" fill="#F0C32A" />
                    <circle cx="270" cy="58" r="7.5" fill="#1E4883" />
                    <circle
                      cx="460"
                      cy="18"
                      r="9"
                      fill="#16A085"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>
            </AnimatedReveal>

            {/* MISSION CARD — Midnight Background + Delicate Blue AI-Network Visual */}
            <AnimatedReveal delay={0.1} className="lg:col-span-6">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-hero border border-white/15 bg-navy p-8 text-cloud shadow-navy sm:p-12">
                <div
                  className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(43,100,176,0.22)_0%,rgba(11,16,38,0)_70%)] blur-2xl"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <EyebrowLabel variant="dark">
                    {sections.missionCardLabel || "OUR MISSION"}
                  </EyebrowLabel>

                  <h3 className="mt-6 font-heading text-2xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-3xl lg:text-4xl">
                    &ldquo;
                    {sections.missionCardStatement || settings.missionStatement}
                    &rdquo;
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
                    {sections.missionCardSubtext ||
                      "Connecting intelligent systems, pedagogical clarity, and actionable insights to elevate everyday learning."}
                  </p>
                </div>

                {/* Delicate Blue AI-Network Visual */}
                <div className="relative z-10 mt-10 overflow-hidden rounded-2xl border border-intelligence/30 bg-navy-light/90 p-5">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-intelligence">
                    <span>Intelligent Network Topology</span>
                    <span>Effective · Personalised</span>
                  </div>
                  <svg
                    viewBox="0 0 480 130"
                    className="h-28 w-full"
                    role="img"
                    aria-label="Delicate blue AI-network visual with interconnected nodes"
                  >
                    <g stroke="#2B64B0" strokeOpacity="0.35" strokeWidth="1.5">
                      <line x1="65" y1="95" x2="175" y2="42" />
                      <line x1="65" y1="95" x2="195" y2="98" />
                      <line x1="175" y1="42" x2="195" y2="98" />
                      <line x1="175" y1="42" x2="310" y2="55" />
                      <line x1="195" y1="98" x2="310" y2="55" />
                      <line x1="195" y1="98" x2="335" y2="104" />
                      <line x1="310" y1="55" x2="425" y2="35" />
                      <line x1="335" y1="104" x2="425" y2="35" />
                    </g>
                    <path
                      d="M 65 95 L 175 42 L 310 55 L 425 35"
                      stroke="#2B64B0"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {[
                      { cx: 65, cy: 95, r: 6, fill: "#2B64B0" },
                      { cx: 175, cy: 42, r: 8, fill: "#1E4883" },
                      { cx: 195, cy: 98, r: 5.5, fill: "#2B64B0" },
                      { cx: 310, cy: 55, r: 8.5, fill: "#2B64B0" },
                      { cx: 335, cy: 104, r: 5.5, fill: "#F0C32A" },
                      { cx: 425, cy: 35, r: 9, fill: "#16A085" },
                    ].map((n, idx) => (
                      <circle
                        key={idx}
                        cx={n.cx}
                        cy={n.cy}
                        r={n.r}
                        fill={n.fill}
                        stroke="#0B1D3A"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 4: OUR APPROACH
          Interactive Visual Layout ("Human-Centred by Design. Intelligence-Led by Innovation.")
      ====================================================================== */}
      <section className="py-24 sm:py-32 lg:py-36">
        <Container>
          <SectionHeading
            eyebrow={sections.approachEyebrow || "OUR APPROACH"}
            title={
              sections.approachHeading ||
              "Human-Centred by Design. Intelligence-Led by Innovation."
            }
            description={
              sections.approachDescription ||
              "Explore the four core principles that guide how we design, architect, and refine every educational experience at iGUIDE."
            }
          />

          <OurApproachInteractive principles={principles} />
          <ParadigmComparisonSection />
        </Container>
      </section>

      {/* =====================================================================
          SECTION 5: OUR EDUCATIONAL ECOSYSTEM
          Connected Visual Ecosystem of the Six Core Solutions Using the Intelligence Path Motif
      ====================================================================== */}
      <section className="border-y border-border bg-subtle-gradient py-24 sm:py-32 lg:py-36">
        <Container>
          <SectionHeading
            eyebrow={
              sections.ecosystemEyebrow || "OUR EDUCATIONAL ECOSYSTEM"
            }
            title={
              sections.ecosystemHeading ||
              "Six Connected Capabilities. One Unified Vision."
            }
            description={
              sections.ecosystemDescription ||
              "Every iGUIDE solution is linked along the Intelligence Path—working together to support learners, educators, and institutions."
            }
            align="center"
          />

          <EducationalEcosystemConnected solutions={solutions} />
        </Container>
      </section>

      {/* =====================================================================
          SECTION 6: WHY iGUIDE?
          Alternating Feature Layout ("Designed Around Learning. Built for Possibility.")
      ====================================================================== */}
      <section className="py-24 sm:py-32 lg:py-36">
        <Container>
          <SectionHeading
            eyebrow={sections.whyEyebrow || "WHY iGUIDE?"}
            title={
              sections.whyHeading ||
              "Designed Around Learning. Built for Possibility."
            }
            description={
              sections.whyDescription ||
              "Our strengths bring together intelligent engineering, pedagogical empathy, and institutional scalability."
            }
          />

          <div className="mt-16 space-y-10">
            {strengths.map((item, idx) => {
              const isReversed = idx % 2 === 1;
              const Icons = [
                BrainCircuit,
                Waypoints,
                Sparkles,
                BarChart3,
                Layers,
              ];
              const Icon = Icons[idx % Icons.length];

              return (
                <AnimatedReveal key={item.code || item.title}>
                  <div className="grid items-center gap-8 rounded-feature border border-border bg-white p-7 shadow-subtle transition-all hover:border-iris/35 hover:shadow-elevated sm:p-10 lg:grid-cols-12">
                    <div
                      className={cn(
                        "lg:col-span-7",
                        isReversed && "lg:order-2"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-iris-light font-heading text-xs font-extrabold text-iris">
                          {item.code || `0${idx + 1}`}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-intelligence">
                          {item.subtitle}
                        </span>
                      </div>

                      <h3 className="mt-4 font-heading text-2xl font-bold capitalize text-ink sm:text-3xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
                        {item.description}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "lg:col-span-5",
                        isReversed && "lg:order-1"
                      )}
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-cloud p-3">
                        <div className="mb-2 flex items-center justify-between px-2 pt-1 text-[11px] font-semibold text-ink-muted">
                          <span className="inline-flex items-center gap-1.5 text-iris">
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                            Strength 0{idx + 1}
                          </span>
                          <span>iGUIDE Architecture</span>
                        </div>
                        {renderStrengthIllustration(idx)}
                      </div>
                    </div>
                  </div>
                </AnimatedReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================================
          SECTION 7: CLOSING CTA
          Heading: "Let's Build a More Intelligent Future for Learning."
          Buttons: "Explore Our Solutions" & "Get in Touch"
      ====================================================================== */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-hero bg-navy px-6 py-16 text-cloud shadow-navy sm:px-14 sm:py-24">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(240,195,42,0.28),rgba(43,100,176,0.14)_45%,rgba(11,16,38,0)_75%)]"
              aria-hidden="true"
            />
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
              viewBox="0 0 1200 400"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M-40 330 C 260 310, 460 110, 780 150 C 980 180, 1100 60, 1240 30"
                stroke="#F0C32A"
                strokeWidth="3"
              />
              <circle cx="260" cy="310" r="6" fill="#2B64B0" />
              <circle cx="780" cy="150" r="8" fill="#1E4883" />
            </svg>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <EyebrowLabel variant="dark">
                TECHNOLOGY WITH INTELLIGENCE · LEARNING WITH PURPOSE
              </EyebrowLabel>

              <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                {sections.closingCtaHeading ||
                  "Let's Build a More Intelligent Future for Learning."}
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {sections.closingCtaDescription ||
                  "Explore our six core solutions or connect with the iGUIDE team to discuss how intelligent educational technology can support your institution."}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton href="/solutions" showArrow>
                  Explore Our Solutions
                </PrimaryButton>
                <SecondaryButton href="/contact" variant="dark">
                  Get in Touch
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
