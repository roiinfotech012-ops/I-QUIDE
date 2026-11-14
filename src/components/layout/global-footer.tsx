"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Lock, Mail, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import type { SiteSettingsRecord, SolutionRecord } from "@/lib/seed-data";
import { Container } from "@/components/ui/primitives";

export function GlobalFooter({
  settings,
  solutions,
}: {
  settings: SiteSettingsRecord;
  solutions: SolutionRecord[];
}) {
  const pathname = usePathname();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  if (pathname?.startsWith("/admin")) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) return;
    setSubscribed(true);
    setEmailInput("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  const activeSocials = Object.entries(settings.socialLinks || {}).filter(
    ([, url]) => typeof url === "string" && url.trim().length > 0
  );

  return (
    <footer className="relative overflow-hidden border-t border-border-dark bg-navy text-cloud">
      {/* Top glowing ambient accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-iris to-transparent" />

      {/* Understated Intelligence Path Graphic Accent */}
      <svg
        className="pointer-events-none absolute left-0 top-0 h-64 w-full opacity-10"
        viewBox="0 0 1440 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 190 C 320 180, 520 50, 840 90 C 1100 120, 1280 40, 1440 20"
          stroke="#635BFF"
          strokeWidth="2.5"
        />
        <circle cx="320" cy="180" r="5" fill="#387BFA" />
        <circle cx="840" cy="90" r="6" fill="#A78BFA" />
      </svg>

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand Identity & Vision */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-navy-light shadow-subtle">
                <Sparkles className="h-5 w-5 text-lavender" aria-hidden="true" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                {settings.brandName}
              </span>
            </Link>

            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-lavender">
              {settings.tagline}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {settings.footerDescription}
            </p>

            {/* Newsletter Dispatch Input */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Subscribe to AI &amp; Pedagogy Research
              </p>
              {subscribed ? (
                <div className="mt-2.5 inline-flex items-center gap-2 rounded-xl bg-emerald-success/20 px-3.5 py-2 text-xs font-semibold text-emerald-300">
                  <Check className="h-4 w-4" />
                  <span>Thank you for subscribing to research updates!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-2.5 flex max-w-sm gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter academic email"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:border-iris focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-iris px-4 py-2 text-xs font-semibold text-white transition hover:bg-iris-hover"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {activeSocials.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {activeSocials.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium capitalize text-slate-300 transition hover:border-lavender hover:text-white"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Solutions", href: "/solutions" },
                { label: "Visual Gallery", href: "/gallery" },
                { label: "Perspectives", href: "/testimonials" },
                { label: "Research & Blogs", href: "/blogs" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-lavender"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Six Core Solutions */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Core AI Solutions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              {solutions.slice(0, 6).map((sol) => (
                <li key={sol.id}>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="transition-colors hover:text-lavender"
                  >
                    {sol.shortTitle || sol.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details & Status */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-white">
              Bengaluru Headquarters
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-1 h-4 w-4 shrink-0 text-lavender"
                  aria-hidden="true"
                />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  className="h-4 w-4 shrink-0 text-intelligence"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${settings.primaryPhone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {settings.primaryPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="h-4 w-4 shrink-0 text-lavender"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${settings.primaryEmail}`}
                  className="transition-colors hover:text-white"
                >
                  {settings.primaryEmail}
                </a>
              </li>
            </ul>

            {/* Live Operational Status */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-300">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-success animate-pulse" />
                  Systems Operational
                </span>
                <span className="text-[11px] font-bold text-emerald-400">99.98% SLA</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                SOC2 Type II Aligned · ISO/IEC 27001 Conscious
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Admin Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>{settings.copyrightText}</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-lavender"
            >
              <Lock className="h-3 w-3" aria-hidden="true" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
