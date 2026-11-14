"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import type { SiteSettingsRecord, SolutionRecord } from "@/lib/seed-data";
import { cn } from "@/lib/utils";
import { Container, DynamicIcon } from "@/components/ui/primitives";

export function StickyHeader({
  settings,
  solutions,
}: {
  settings: SiteSettingsRecord;
  solutions: SolutionRecord[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isAdminRoute) return null;

  // Homepage hero has a light editorial background with radial glow, while subpages use dark hero headers
  const isHomeTop = pathname === "/" && !scrolled && !mobileMenuOpen;
  const isDarkHeroTop = pathname !== "/" && !scrolled && !mobileMenuOpen;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Solutions", href: "/solutions", hasDropdown: true },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-300 sm:px-6",
            scrolled || mobileMenuOpen
              ? "border border-border/90 bg-white/95 shadow-elevated backdrop-blur-xl"
              : isHomeTop
              ? "border border-border/75 bg-white/80 shadow-subtle backdrop-blur-md"
              : "border border-white/15 bg-navy/60 backdrop-blur-md"
          )}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
            aria-label={`${settings.brandName} Home`}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-navy shadow-subtle transition-transform group-hover:scale-105">
              <svg
                viewBox="0 0 44 44"
                className="h-7 w-7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 31C14.5 31 15.5 13 22 13C28.5 13 27 24 35 13"
                  stroke="url(#hdrGrad)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="31" r="3" fill="#387BFA" />
                <circle cx="22" cy="13" r="3" fill="#635BFF" />
                <circle cx="35" cy="13" r="3.4" fill="#A78BFA" />
                <defs>
                  <linearGradient
                    id="hdrGrad"
                    x1="9"
                    y1="31"
                    x2="35"
                    y2="13"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#635BFF" />
                    <stop offset="50%" stopColor="#387BFA" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-heading text-lg font-extrabold tracking-tight transition-colors sm:text-xl",
                  isDarkHeroTop ? "text-white" : "text-ink"
                )}
              >
                {settings.brandName}
              </span>
              <span
                className={cn(
                  "text-[9px] font-semibold tracking-[0.14em] uppercase",
                  isDarkHeroTop ? "text-lavender" : "text-ink-muted"
                )}
              >
                Intelligent EdTech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex lg:items-center lg:gap-1"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-l-full pl-4 pr-1.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                          isDarkHeroTop
                            ? isActive
                              ? "text-white font-semibold"
                              : "text-slate-200 hover:text-white"
                            : isActive
                            ? "text-iris font-semibold"
                            : "text-ink-secondary hover:text-ink"
                        )}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                        aria-label="Toggle Our Solutions menu"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className={cn(
                          "rounded-r-full pr-3 pl-1 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                          isDarkHeroTop
                            ? "text-slate-200 hover:text-white"
                            : "text-ink-secondary hover:text-ink"
                        )}
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            dropdownOpen && "rotate-180"
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    {/* Six Solutions Mega Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute left-1/2 top-full w-[760px] -translate-x-1/2 pt-3">
                        <div className="overflow-hidden rounded-feature border border-border/80 bg-white/98 p-6 shadow-elevated backdrop-blur-2xl">
                          <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-3 px-1">
                            <div className="flex items-center gap-2">
                              <span className="flex h-2 w-2 rounded-full bg-emerald-success animate-pulse" />
                              <p className="text-[11px] font-bold uppercase tracking-widest text-iris">
                                iGUIDE Neural Architecture · 6 Core Offerings
                              </p>
                            </div>
                            <Link
                              href="/solutions"
                              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-iris transition hover:text-navy"
                            >
                              <span>Explore Full Directory</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-12 gap-5">
                            {/* Left: 6 solutions grid (8 cols) */}
                            <div className="col-span-8 grid grid-cols-2 gap-2.5">
                              {solutions.slice(0, 6).map((sol, idx) => (
                                <Link
                                  key={sol.id}
                                  href={`/solutions/${sol.slug}`}
                                  className="group flex items-start gap-3 rounded-2xl border border-transparent p-2.5 transition-all hover:border-iris/20 hover:bg-ice/50 hover:shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
                                >
                                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-iris-light text-iris transition-all group-hover:scale-105 group-hover:bg-iris group-hover:text-white">
                                    <DynamicIcon
                                      name={sol.iconName}
                                      className="h-4 w-4"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-ink transition-colors group-hover:text-iris">
                                      0{idx + 1}. {sol.shortTitle || sol.title}
                                    </p>
                                    <p className="mt-0.5 line-clamp-1 text-[11px] leading-snug text-ink-secondary">
                                      {sol.tagline}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            {/* Right: Featured Showcase spotlight (4 cols) */}
                            <div className="col-span-4 flex flex-col justify-between rounded-2xl border border-iris/20 bg-gradient-to-br from-navy via-navy to-navy-light p-4 text-white shadow-subtle">
                              <div>
                                <span className="inline-block rounded-full bg-iris/30 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-lavender">
                                  Flagship Offering
                                </span>
                                <h4 className="mt-2 font-heading text-sm font-bold text-white">
                                  Adaptive Learning Paths
                                </h4>
                                <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                                  Dynamic knowledge graphs that calibrate cognitive scaffolding to individual learner pace.
                                </p>
                              </div>
                              <Link
                                href="/solutions/adaptive-learning-paths"
                                className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-iris px-3 py-2 text-xs font-semibold text-white transition hover:bg-iris-hover"
                              >
                                <span>Discover Solution</span>
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                    isDarkHeroTop
                      ? isActive
                        ? "bg-white/15 text-white font-semibold"
                        : "text-slate-200 hover:bg-white/10 hover:text-white"
                      : isActive
                      ? "bg-iris-light/70 text-iris font-semibold"
                      : "text-ink-secondary hover:bg-cloud hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA & Mobile Drawer Trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white shadow-subtle transition hover:-translate-y-0.5 hover:bg-iris-hover hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
            >
              <span>Enquire Now</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              className={cn(
                "inline-flex items-center justify-center rounded-full p-2.5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                isDarkHeroTop
                  ? "border border-white/20 bg-white/10 text-white"
                  : "border border-border bg-cloud text-ink"
              )}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Accessible Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="mt-3 rounded-feature border border-border bg-white p-5 shadow-elevated lg:hidden"
          >
            <ul className="space-y-1.5">
              {navItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <li key={item.label} className="rounded-xl bg-cloud/60 p-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className="px-2 py-1.5 text-sm font-semibold text-ink"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileSolutionsOpen((prev) => !prev)
                          }
                          aria-expanded={mobileSolutionsOpen}
                          className="rounded-lg p-1.5 text-ink-secondary hover:text-iris"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              mobileSolutionsOpen && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      {mobileSolutionsOpen && (
                        <ul className="mt-2 space-y-1 border-t border-border pt-2 pl-2">
                          {solutions.map((sol, idx) => (
                            <li key={sol.id}>
                              <Link
                                href={`/solutions/${sol.slug}`}
                                className="block rounded-lg px-2 py-2 text-xs font-medium text-ink-secondary hover:bg-white hover:text-iris"
                              >
                                0{idx + 1}. {sol.shortTitle || sol.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-ice/60 hover:text-iris"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-5 border-t border-border pt-4">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-iris px-5 py-3 text-sm font-semibold text-white shadow-subtle"
              >
                <span>Enquire Now</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
