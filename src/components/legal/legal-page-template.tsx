import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
} from "lucide-react";
import type { PageContentRecord, SiteSettingsRecord } from "@/lib/seed-data";
import {
  Breadcrumbs,
  Container,
  EyebrowLabel,
} from "@/components/ui/primitives";
import {
  extractArticleHeadings,
  SafeArticleContent,
} from "@/components/blogs/article-content-parser";
import { ArticleTableOfContents } from "@/components/blogs/article-reading-experience";

export interface LegalSectionsJson {
  lastUpdated?: string;
  isDraftForReview?: boolean;
  reviewNotice?: string;
  richContent?: string;
  sections?: { heading: string; body: string }[];
}

/**
 * Converts legacy structured sections into unified Markdown rich-text content
 * if `richContent` is not explicitly populated yet.
 */
export function resolveLegalRichContent(sectionsJson: LegalSectionsJson): string {
  if (
    typeof sectionsJson.richContent === "string" &&
    sectionsJson.richContent.trim().length > 0
  ) {
    return sectionsJson.richContent;
  }

  if (Array.isArray(sectionsJson.sections) && sectionsJson.sections.length > 0) {
    return sectionsJson.sections
      .map((sec) => `## ${sec.heading}\n\n${sec.body}`)
      .join("\n\n");
  }

  return "";
}

export function LegalPageTemplate({
  page,
  settings,
  fallbackTitle,
  fallbackEyebrow,
  fallbackSubtitle,
  activeRoute,
}: {
  page?: PageContentRecord;
  settings: SiteSettingsRecord;
  fallbackTitle: string;
  fallbackEyebrow: string;
  fallbackSubtitle: string;
  activeRoute: "/privacy-policy" | "/terms-and-conditions";
}) {
  const sectionsJson = (page?.sectionsJson || {}) as LegalSectionsJson;
  const title = page?.title || fallbackTitle;
  const eyebrow = page?.eyebrow || fallbackEyebrow;
  const subtitle = page?.subtitle || fallbackSubtitle;
  const lastUpdated = sectionsJson.lastUpdated || "November 2026 (Draft)";
  const isDraftForReview = sectionsJson.isDraftForReview !== false;
  const reviewNotice =
    sectionsJson.reviewNotice ||
    "DRAFT FOR ADMINISTRATOR & LEGAL REVIEW — The following informational text is a structured draft template prepared for iGUIDE administrator and legal counsel review. It does not constitute a final legally binding policy or legal compliance certification until formally reviewed and approved by authorised legal counsel.";

  const richContent = resolveLegalRichContent(sectionsJson);
  const headings = extractArticleHeadings(richContent);
  const hasToc = headings.length > 0;

  const isPublished = page ? page.published : true;

  const companionPolicy =
    activeRoute === "/privacy-policy"
      ? {
          label: "Terms & Conditions",
          href: "/terms-and-conditions",
          description:
            "Review the informational terms governing access to and use of the iGUIDE website.",
        }
      : {
          label: "Privacy Policy",
          href: "/privacy-policy",
          description:
            "Review how iGUIDE handles website enquiries and visitor contact details.",
        };

  return (
    <article className="bg-white">
      {/* PREMIUM MINIMAL PAGE HERO */}
      <header className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-[#F4F8FD] via-[#F8FAFD] to-white pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,72,131,0.1)_0%,rgba(43,100,176,0.04)_50%,transparent_72%)] blur-3xl"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <Breadcrumbs items={[{ label: title }]} />

          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <EyebrowLabel>{eyebrow}</EyebrowLabel>

              {lastUpdated && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1 text-xs font-medium text-ink-muted shadow-subtle">
                  <Calendar
                    className="h-3.5 w-3.5 text-iris"
                    aria-hidden="true"
                  />
                  <span>Last Updated: {lastUpdated}</span>
                </span>
              )}

              {isDraftForReview ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-50 px-3.5 py-1 font-mono text-[10px] font-bold tracking-wider text-amber-800 uppercase">
                  <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                  <span>Draft for Legal Review</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/80 bg-emerald-50 px-3.5 py-1 font-mono text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
                  <FileCheck2 className="h-3 w-3" aria-hidden="true" />
                  <span>Approved Policy</span>
                </span>
              )}
            </div>

            <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:leading-[1.1]">
              {title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-secondary sm:text-lg">
              {subtitle}
            </p>
          </div>
        </Container>
      </header>

      {/* NARROW READING LAYOUT WITH OPTIONAL STICKY TABLE OF CONTENTS */}
      <section className="py-14 sm:py-20">
        <Container>
          {!isPublished ? (
            <div className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-amber-50/70 p-8 text-center">
              <AlertTriangle
                className="mx-auto h-8 w-8 text-amber-600"
                aria-hidden="true"
              />
              <h2 className="mt-4 font-heading text-xl font-bold text-ink">
                Policy Document Currently Unpublished for Review
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                This legal page is currently marked as unpublished in the iGUIDE CMS while undergoing administrative review. For questions, please contact{" "}
                <a
                  href={`mailto:${settings.primaryEmail}`}
                  className="font-semibold text-iris underline"
                >
                  {settings.primaryEmail}
                </a>
                .
              </p>
            </div>
          ) : (
            <div
              className={
                hasToc
                  ? "mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14"
                  : "mx-auto max-w-[720px]"
              }
            >
              {/* Optional Sticky Table of Contents on Desktop */}
              {hasToc && (
                <div className="lg:col-span-4 xl:col-span-3">
                  <ArticleTableOfContents
                    headings={headings}
                    variant="desktop"
                  />
                </div>
              )}

              {/* Narrow Reading Column (max-w-[720px]) */}
              <div
                className={
                  hasToc ? "lg:col-span-8 xl:col-span-9" : "w-full"
                }
              >
                <div className="mx-auto max-w-[720px]">
                  {/* Prominent Draft Review Banner when pending formal legal approval */}
                  {isDraftForReview && (
                    <div
                      role="note"
                      aria-label="Draft legal review notice"
                      className="mb-10 rounded-3xl border border-amber-300/80 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 p-6 shadow-subtle sm:p-7"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                          <Scale className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h2 className="font-heading text-sm font-bold tracking-wide text-amber-950 uppercase">
                            Draft Content — Pending Administrator & Legal Review
                          </h2>
                          <p className="mt-1.5 text-xs leading-relaxed text-amber-900/90 sm:text-sm">
                            {reviewNotice}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Collapsible Mobile Table of Contents */}
                  {hasToc && (
                    <ArticleTableOfContents
                      headings={headings}
                      variant="mobile"
                    />
                  )}

                  {/* Rich-Text Policy Content */}
                  <div className="rounded-[32px] border border-border/90 bg-white p-7 shadow-subtle sm:p-11">
                    <SafeArticleContent
                      content={richContent}
                      headings={headings}
                    />
                  </div>

                  {/* Documented Contact Desk Card */}
                  <div className="mt-10 rounded-3xl border border-border bg-cloud/80 p-7 sm:p-8">
                    <div className="flex items-center gap-2.5 text-iris">
                      <Shield className="h-5 w-5" aria-hidden="true" />
                      <h2 className="font-heading text-lg font-bold text-ink">
                        Questions or Administrative Enquiries
                      </h2>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      If you have questions regarding this document or wish to request updates to enquiry information you have shared with{" "}
                      <strong className="text-ink">{settings.brandName}</strong>, please contact us using our documented details below:
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-4 border-t border-border/80 pt-5 text-xs text-ink-secondary sm:grid-cols-3">
                      <div className="flex items-start gap-2.5">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-iris"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block font-bold text-ink">
                            Address
                          </span>
                          <span className="mt-0.5 block leading-relaxed">
                            {settings.address}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Mail
                          className="mt-0.5 h-4 w-4 shrink-0 text-iris"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block font-bold text-ink">
                            Email
                          </span>
                          <a
                            href={`mailto:${settings.primaryEmail}`}
                            className="mt-0.5 block font-semibold text-iris underline decoration-iris/40 underline-offset-4 hover:text-intelligence"
                          >
                            {settings.primaryEmail}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Phone
                          className="mt-0.5 h-4 w-4 shrink-0 text-intelligence"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="block font-bold text-ink">
                            Phone
                          </span>
                          <a
                            href={`tel:${settings.primaryPhone.replace(/[^\d+]/g, "")}`}
                            className="mt-0.5 block font-semibold text-ink hover:text-iris"
                          >
                            {settings.primaryPhone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Companion Legal Document Cross-Link */}
                  <div className="mt-8 flex flex-col justify-between gap-4 rounded-3xl border border-lavender/40 bg-gradient-to-r from-[#F4F8FD] via-white to-[#EEF4FF] p-6 sm:flex-row sm:items-center">
                    <div>
                      <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-iris uppercase">
                        Related Information Page
                      </span>
                      <h3 className="mt-1 font-heading text-base font-bold text-ink">
                        {companionPolicy.label}
                      </h3>
                      <p className="mt-0.5 text-xs text-ink-secondary">
                        {companionPolicy.description}
                      </p>
                    </div>
                    <Link
                      href={companionPolicy.href}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-xs font-bold text-iris shadow-subtle transition hover:border-iris hover:bg-iris hover:text-white"
                    >
                      <span>Read {companionPolicy.label}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </article>
  );
}
