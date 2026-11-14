"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Check,
  ChevronDown,
  Link2,
  Linkedin,
  ListTree,
  Mail,
  MessageCircle,
  Share2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleHeading } from "./article-content-parser";

/**
 * Sticky Desktop + Collapsible Mobile Table of Contents
 */
export function ArticleTableOfContents({
  headings,
  variant = "desktop",
}: {
  headings: ArticleHeading[];
  variant?: "desktop" | "mobile";
}) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "-100px 0px -65% 0px",
      threshold: 0.1,
    });

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  if (variant === "mobile") {
    return (
      <div className="mb-8 rounded-2xl border border-border bg-cloud/80 p-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between text-left"
        >
          <span className="inline-flex items-center gap-2 font-heading text-xs font-bold tracking-wider text-ink uppercase">
            <ListTree className="h-4 w-4 text-iris" aria-hidden="true" />
            <span>Table of Contents ({headings.length})</span>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-ink-muted transition-transform duration-200",
              mobileOpen && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>

        {mobileOpen && (
          <nav
            aria-label="Mobile table of contents"
            className="mt-4 border-t border-border/70 pt-3"
          >
            <ol className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={cn(heading.level === 3 && "pl-4")}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                      activeId === heading.id
                        ? "bg-iris/10 font-semibold text-iris"
                        : "text-ink-secondary hover:text-ink"
                    )}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    );
  }

  return (
    <aside aria-label="Article table of contents" className="hidden lg:block">
      <div className="sticky top-28 space-y-6">
        <div className="rounded-3xl border border-border/90 bg-white/90 p-6 shadow-subtle backdrop-blur-md">
          <div className="mb-4 flex items-center gap-2 border-b border-border/70 pb-3.5">
            <BookOpen className="h-4 w-4 text-iris" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold tracking-[0.16em] text-ink uppercase">
              In This Article
            </span>
          </div>

          <nav aria-label="On this page">
            <ol className="relative space-y-1.5 border-l border-border/80 pl-3">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                return (
                  <li
                    key={heading.id}
                    className={cn(
                      "relative transition-all",
                      heading.level === 3 && "pl-3"
                    )}
                  >
                    {isActive && (
                      <span
                        className="absolute top-1.5 bottom-1.5 -left-[13px] w-0.5 rounded-full bg-iris"
                        aria-hidden="true"
                      />
                    )}
                    <a
                      href={`#${heading.id}`}
                      onClick={() => setActiveId(heading.id)}
                      className={cn(
                        "block rounded-xl px-2.5 py-1.5 text-xs leading-snug transition-colors",
                        isActive
                          ? "bg-iris/10 font-semibold text-iris"
                          : "font-medium text-ink-muted hover:bg-cloud hover:text-ink"
                      )}
                    >
                      {heading.text}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Subtle Intelligence Path Note Card */}
        <div className="rounded-3xl border border-lavender/35 bg-gradient-to-br from-[#F6F5FF] via-white to-[#EEF4FF] p-5 shadow-subtle">
          <div className="flex items-center gap-2 text-xs font-bold text-iris">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Exploring iGUIDE Solutions?</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
            See how these educational concepts come together across our six core capabilities.
          </p>
          <Link
            href="/solutions"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-iris transition-colors hover:text-intelligence"
          >
            <span>Explore Solutions</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

/**
 * Functional Share Bar (Section 4: Share Article)
 * Supports native Web Share API, Copy Link, LinkedIn, X/Twitter, WhatsApp, and Email.
 * Never fabricates share counts.
 */
export function ArticleShareBar({
  title,
  excerpt,
  slug,
}: {
  title: string;
  excerpt: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [shareUrl, setShareUrl] = useState(
    `https://iguide.edu.in/blogs/${slug}`
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/blogs/${slug}`);
      setCanNativeShare(typeof navigator?.share === "function");
    }
  }, [slug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator?.share !== "function") return;
    try {
      await navigator.share({
        title,
        text: excerpt,
        url: shareUrl,
      });
    } catch {
      // User dismissed share sheet
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(`${title} — ${excerpt}`);

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const xTwitterHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const whatsAppHref = `https://api.whatsapp.com/send?text=${encodedSummary}%20${encodedUrl}`;
  const emailHref = `mailto:?subject=${encodedTitle}&body=${encodedSummary}%0A%0ARead%20more:%20${encodedUrl}`;

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-r from-cloud via-white to-[#F6F5FF] p-6 sm:p-8 shadow-subtle">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-iris uppercase">
            Share This Perspective
          </span>
          <h3 className="mt-1 font-heading text-lg font-bold text-ink">
            Share Article with Colleagues & Educators
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Spark a conversation around adaptive pedagogy and human-centred learning.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 rounded-full border border-iris/30 bg-iris/10 px-4 py-2.5 text-xs font-semibold text-iris transition-colors hover:bg-iris hover:text-white"
            >
              <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Share</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy article link"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all",
              copied
                ? "border-emerald-500/40 bg-emerald-50 text-emerald-700"
                : "border-border bg-white text-ink hover:border-iris/40 hover:text-iris"
            )}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <a
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2.5 text-xs font-semibold text-ink-secondary transition-colors hover:border-iris/40 hover:text-iris"
          >
            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>

          <a
            href={xTwitterHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X (Twitter)"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2.5 text-xs font-semibold text-ink-secondary transition-colors hover:border-iris/40 hover:text-iris"
          >
            <span className="font-mono text-xs font-bold" aria-hidden="true">
              𝕏
            </span>
            <span>Post</span>
          </a>

          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2.5 text-xs font-semibold text-ink-secondary transition-colors hover:border-iris/40 hover:text-iris"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <a
            href={emailHref}
            aria-label="Share via Email"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2.5 text-xs font-semibold text-ink-secondary transition-colors hover:border-iris/40 hover:text-iris"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Real-time Article Reading Progress Bar
 * Fixed at top of screen for long-form editorial reading.
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const pct = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-iris via-intelligence to-lavender transition-all duration-150 ease-out shadow-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
