import React from "react";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Compass,
  Cpu,
  GraduationCap,
  Layers,
  Lightbulb,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Users,
  Waypoints,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Component>
  );
}

export function EyebrowLabel({
  children,
  className,
  variant = "light",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]",
        variant === "light"
          ? "border border-iris/20 bg-iris-light/70 text-iris"
          : "border border-white/15 bg-white/10 text-lavender",
        className
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          variant === "light" ? "bg-gold ring-2 ring-gold/30" : "bg-gold"
        )}
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-brand-gradient bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlightedTitle,
  description,
  align = "left",
  theme = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlightedTitle?: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-4">
          <EyebrowLabel variant={theme === "dark" ? "dark" : "light"}>
            {eyebrow}
          </EyebrowLabel>
        </div>
      )}
      <h2
        className={cn(
          "font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]",
          theme === "dark" ? "text-cloud" : "text-ink"
        )}
      >
        {title}{" "}
        {highlightedTitle && <GradientText>{highlightedTitle}</GradientText>}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            theme === "dark" ? "text-slate-300" : "text-ink-secondary"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function PrimaryButton({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
  showArrow = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  showArrow?: boolean;
}) {
  const baseStyles = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full border border-gold/25 bg-iris px-6 py-3.5 text-sm font-semibold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-iris-hover hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        <span>{children}</span>
        {showArrow && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        )}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export function SecondaryButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "light",
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "light" | "dark";
  className?: string;
}) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris focus-visible:ring-offset-2",
    variant === "light"
      ? "border border-border bg-white text-ink shadow-subtle hover:border-iris/40 hover:text-iris"
      : "border border-white/20 bg-white/5 text-cloud backdrop-blur-sm hover:border-white/40 hover:bg-white/10",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseStyles}>
      {children}
    </button>
  );
}

export function Breadcrumbs({
  items,
  theme = "light",
}: {
  items: { label: string; href?: string }[];
  theme?: "light" | "dark";
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium sm:text-sm">
        <li>
          <Link
            href="/"
            className={cn(
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris rounded px-1",
              theme === "dark"
                ? "text-slate-400 hover:text-white"
                : "text-ink-secondary hover:text-iris"
            )}
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5",
                theme === "dark" ? "text-slate-500" : "text-ink-muted"
              )}
              aria-hidden="true"
            />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris rounded px-1",
                  theme === "dark"
                    ? "text-slate-400 hover:text-white"
                    : "text-ink-secondary hover:text-iris"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={cn(
                  "font-semibold",
                  theme === "dark" ? "text-lavender" : "text-ink"
                )}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-feature border border-dashed border-border bg-white/70 px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-iris-light text-iris">
        <Compass className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-xl font-bold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-ink-secondary">{description}</p>
      {actionLabel && actionHref && (
        <div className="mt-6">
          <PrimaryButton href={actionHref}>{actionLabel}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

export function LoadingSkeleton({
  rows = 3,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      className={cn("space-y-4", className)}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-28 w-full animate-pulse rounded-card border border-border bg-ice/50"
        />
      ))}
    </div>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:border-iris disabled:opacity-40"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "h-9 w-9 rounded-full text-xs font-semibold transition",
            page === currentPage
              ? "bg-iris text-white shadow-subtle"
              : "border border-border bg-white text-ink-secondary hover:border-iris hover:text-iris"
          )}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:border-iris disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waypoints,
  Sparkles,
  Radar,
  Network,
  BarChart3,
  Accessibility,
  BrainCircuit,
  GraduationCap,
  Layers,
  ShieldCheck,
  Users,
  BookOpen,
  Lightbulb,
  Cpu,
  CheckCircle2,
  Compass,
};

export function DynamicIcon({
  name,
  className = "h-6 w-6",
}: {
  name: string;
  className?: string;
}) {
  const IconComponent = ICON_MAP[name] || Waypoints;
  return <IconComponent className={className} aria-hidden="true" />;
}
