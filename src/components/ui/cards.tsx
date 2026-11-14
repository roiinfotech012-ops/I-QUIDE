import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Info,
  MessageCircle,
  Phone,
  Quote,
} from "lucide-react";
import type {
  BlogPostRecord,
  SolutionRecord,
  TestimonialRecord,
} from "@/lib/seed-data";
import { cn, formatDate } from "@/lib/utils";
import {
  Breadcrumbs,
  Container,
  DynamicIcon,
  EyebrowLabel,
  GradientText,
  PrimaryButton,
  SecondaryButton,
} from "./primitives";

export function PageHero({
  eyebrow,
  title,
  highlightedTitle,
  subtitle,
  breadcrumbs,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  theme = "dark",
  children,
}: {
  eyebrow?: string;
  title: string;
  highlightedTitle?: string;
  subtitle: string;
  breadcrumbs?: { label: string; href?: string }[];
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  theme?: "dark" | "light";
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24",
        theme === "dark"
          ? "bg-navy text-cloud"
          : "bg-subtle-gradient text-ink border-b border-border"
      )}
    >
      {/* Background constellation motif */}
      <div
        className="pointer-events-none absolute inset-0 bg-dark-gradient opacity-90"
        aria-hidden="true"
      />
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-15"
        viewBox="0 0 600 400"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M50 350 C 180 320, 260 160, 410 180 C 510 190, 540 90, 590 40"
          stroke="#635BFF"
          strokeWidth="2"
        />
        <circle cx="180" cy="320" r="4" fill="#387BFA" />
        <circle cx="410" cy="180" r="6" fill="#A78BFA" />
      </svg>

      <Container className="relative z-10">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} theme={theme} />}
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className={cn(children ? "lg:col-span-7" : "lg:col-span-9")}>
            {eyebrow && (
              <div className="mb-5">
                <EyebrowLabel variant={theme === "dark" ? "dark" : "light"}>
                  {eyebrow}
                </EyebrowLabel>
              </div>
            )}
            <h1
              className={cn(
                "font-heading text-3xl font-bold tracking-tight sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]",
                theme === "dark" ? "text-white" : "text-ink"
              )}
            >
              {title}{" "}
              {highlightedTitle && (
                <GradientText>{highlightedTitle}</GradientText>
              )}
            </h1>
            <p
              className={cn(
                "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
                theme === "dark" ? "text-slate-300" : "text-ink-secondary"
              )}
            >
              {subtitle}
            </p>
            {(primaryCtaLabel || secondaryCtaLabel) && (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {primaryCtaLabel && primaryCtaHref && (
                  <PrimaryButton href={primaryCtaHref} showArrow>
                    {primaryCtaLabel}
                  </PrimaryButton>
                )}
                {secondaryCtaLabel && secondaryCtaHref && (
                  <SecondaryButton
                    href={secondaryCtaHref}
                    variant={theme === "dark" ? "dark" : "light"}
                  >
                    {secondaryCtaLabel}
                  </SecondaryButton>
                )}
              </div>
            )}
          </div>
          {children && <div className="lg:col-span-5">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function SolutionCard({
  solution,
  index = 0,
}: {
  solution: SolutionRecord;
  index?: number;
}) {
  return (
    <article className="group relative flex flex-col justify-between rounded-feature border border-border bg-white p-6 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated sm:p-8">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-iris-light text-iris transition-colors group-hover:bg-iris group-hover:text-white">
            <DynamicIcon name={solution.iconName} className="h-6 w-6" />
          </div>
          <span className="rounded-full border border-border bg-cloud px-3 py-1 text-[11px] font-semibold text-ink-secondary">
            0{index + 1} · {solution.category}
          </span>
        </div>

        <h3 className="mt-6 font-heading text-xl font-bold text-ink transition-colors group-hover:text-iris sm:text-2xl">
          <Link
            href={`/solutions/${solution.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris rounded"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {solution.title}
          </Link>
        </h3>

        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-intelligence">
          {solution.tagline}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          {solution.summary}
        </p>

        {solution.keyCapabilities.length > 0 && (
          <ul className="mt-5 space-y-2 border-t border-border pt-4">
            {solution.keyCapabilities.slice(0, 2).map((cap) => (
              <li
                key={cap.title}
                className="flex items-start gap-2 text-xs text-ink-secondary"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris"
                  aria-hidden="true"
                />
                <span>
                  <strong className="font-semibold text-ink">
                    {cap.title}:
                  </strong>{" "}
                  {cap.description.slice(0, 75)}
                  {cap.description.length > 75 ? "…" : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-semibold text-iris">
        <span>Explore Architecture & Use Cases</span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

export function FeatureCard({
  iconName,
  eyebrow,
  title,
  description,
  className,
  theme = "light",
}: {
  iconName: string;
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
  theme?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "rounded-feature border p-6 transition-all duration-200 sm:p-8",
        theme === "light"
          ? "border-border bg-white shadow-subtle hover:border-iris/35 hover:shadow-elevated"
          : "border-white/12 bg-white/[0.04] text-cloud hover:border-lavender/40",
        className
      )}
    >
      <div
        className={cn(
          "mb-5 flex h-11 w-11 items-center justify-center rounded-2xl",
          theme === "light"
            ? "bg-iris-light text-iris"
            : "bg-iris/25 text-lavender"
        )}
      >
        <DynamicIcon name={iconName} className="h-5 w-5" />
      </div>
      {eyebrow && (
        <p
          className={cn(
            "mb-1.5 text-[11px] font-semibold uppercase tracking-widest",
            theme === "light" ? "text-iris" : "text-lavender"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h3
        className={cn(
          "font-heading text-xl font-bold",
          theme === "light" ? "text-ink" : "text-white"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-2.5 text-sm leading-relaxed",
          theme === "light" ? "text-ink-secondary" : "text-slate-300"
        )}
      >
        {description}
      </p>
    </div>
  );
}

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialRecord;
}) {
  return (
    <article className="flex h-full flex-col justify-between rounded-feature border border-border bg-white p-6 shadow-subtle transition-all hover:border-iris/30 sm:p-8">
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-iris-light text-iris">
            <Quote className="h-5 w-5" aria-hidden="true" />
          </div>
          {testimonial.isVerified ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-success/10 px-3 py-1 text-[11px] font-semibold text-emerald-success">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              Verified Institutional Endorsement
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-cloud px-3 py-1 text-[11px] font-medium text-ink-secondary">
              <Info className="h-3.5 w-3.5 text-iris" aria-hidden="true" />
              Stakeholder Perspective Lens
            </span>
          )}
        </div>

        <blockquote className="mt-6 font-heading text-lg font-medium leading-relaxed text-ink">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="font-heading text-sm font-bold text-ink">
              {testimonial.authorName}
            </p>
            <p className="text-xs text-ink-secondary">
              {testimonial.authorRole} · {testimonial.institution}
            </p>
          </div>
          <span className="rounded-lg bg-ice px-2.5 py-1 text-[11px] font-semibold text-intelligence">
            {testimonial.category}
          </span>
        </div>
        {testimonial.contextNote && (
          <p className="mt-2.5 text-[11px] italic text-ink-muted">
            {testimonial.contextNote}
          </p>
        )}
      </div>
    </article>
  );
}

export function BlogCard({ post }: { post: BlogPostRecord }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-feature border border-border bg-white shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:shadow-elevated">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 text-[11px] font-semibold text-lavender backdrop-blur-md">
          {post.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex items-center gap-4 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-iris" aria-hidden="true" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-intelligence" aria-hidden="true" />
              {post.readTimeMinutes} min read
            </span>
          </div>

          <h3 className="mt-3 font-heading text-xl font-bold leading-snug text-ink transition-colors group-hover:text-iris">
            <Link
              href={`/blogs/${post.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris rounded"
            >
              {post.title}
            </Link>
          </h3>

          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-ink-secondary">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <div className="text-xs">
            <p className="font-semibold text-ink">{post.authorName}</p>
            <p className="text-ink-muted">{post.authorRole}</p>
          </div>
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-iris hover:underline"
          >
            Read Monograph
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ContactCTA({
  eyebrow = "START YOUR INSTITUTIONAL JOURNEY",
  title = "Ready to Bring Adaptive Intelligence to Your Institution?",
  description = "Speak with the iGUIDE architecture team in Bengaluru to explore curriculum mapping, educator co-pilot workshops, or an institutional pilot tailored to your learners.",
  primaryLabel = "Schedule a Consultation",
  primaryHref = "/contact",
  phone = "+91 8247654106",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  phone?: string;
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-hero bg-navy px-6 py-14 text-cloud shadow-navy sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-dark-gradient"
            aria-hidden="true"
          />
          <svg
            className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-96 opacity-20"
            viewBox="0 0 400 300"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 260 C 120 240, 180 120, 280 140 C 340 150, 360 60, 390 20"
              stroke="#635BFF"
              strokeWidth="4"
            />
            <circle cx="120" cy="240" r="6" fill="#387BFA" />
            <circle cx="280" cy="140" r="8" fill="#A78BFA" />
          </svg>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <EyebrowLabel variant="dark">{eyebrow}</EyebrowLabel>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton href={primaryHref} showArrow>
                {primaryLabel}
              </PrimaryButton>
              <SecondaryButton
                href={`tel:${phone.replace(/\s+/g, "")}`}
                variant="dark"
              >
                <Phone className="h-4 w-4 text-lavender" aria-hidden="true" />
                <span>Call {phone}</span>
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function WhatsAppButton({
  whatsappNumber,
  whatsappVerified,
  fallbackPhone,
}: {
  whatsappNumber?: string;
  whatsappVerified?: boolean;
  fallbackPhone?: string;
}) {
  // Only render a live WhatsApp link when a verified WhatsApp number is configured in the CMS
  if (whatsappVerified && whatsappNumber && whatsappNumber.trim().length > 5) {
    const cleanDigits = whatsappNumber.replace(/[^\d]/g, "");
    const href = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(
      "Hello iGUIDE team, I would like to enquire about your AI-powered educational solutions."
    )}`;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-emerald-success/30 bg-emerald-success/10 px-4 py-2.5 text-xs font-semibold text-emerald-success transition hover:bg-emerald-success hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-success"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span>Authorised WhatsApp Enquiry</span>
      </a>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-cloud px-4 py-2 text-xs text-ink-secondary">
      <MessageCircle className="h-4 w-4 text-iris" aria-hidden="true" />
      <span>
        Direct Phone Desk:{" "}
        <a
          href={`tel:${(fallbackPhone || "+918247654106").replace(/\s+/g, "")}`}
          className="font-semibold text-ink underline hover:text-iris"
        >
          {fallbackPhone || "+91 8247654106"}
        </a>{" "}
        <span className="text-ink-muted">(WhatsApp configurable in CMS)</span>
      </span>
    </div>
  );
}
