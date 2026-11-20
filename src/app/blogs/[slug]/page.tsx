import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getSiteSettings,
} from "@/lib/cms";
import {
  buildArticleJsonLd,
  buildPageMetadata,
  getBaseUrl,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import {
  Breadcrumbs,
  Container,
  EyebrowLabel,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/primitives";
import {
  extractArticleHeadings,
  SafeArticleContent,
} from "@/components/blogs/article-content-parser";
import {
  ArticleShareBar,
  ArticleTableOfContents,
  ReadingProgressBar,
} from "@/components/blogs/article-reading-experience";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getBlogPosts(true);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || !post.published) {
    return buildPageMetadata({
      title: "Article Not Found | iGUIDE",
      path: `/blogs/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: post.seoTitle || `${post.title} | iGUIDE Insights & Blogs`,
    description: post.seoDescription || post.excerpt,
    path: `/blogs/${post.slug}`,
    ogImage: post.coverImage,
    openGraphType: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    authors: post.authorName ? [post.authorName] : undefined,
    section: post.category,
    tags: post.tags,
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPublishedPosts, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(true),
    getSiteSettings(),
  ]);

  if (!post || !post.published) {
    notFound();
  }

  const headings = extractArticleHeadings(post.content);
  const hasToc = headings.length > 0;

  // Prefer matching categories first, then overlapping tags, then most recent publication date (up to 3)
  const relatedPosts = allPublishedPosts
    .filter((candidate) => candidate.slug !== post.slug && candidate.published)
    .map((candidate) => {
      const sameCategoryScore = candidate.category === post.category ? 10 : 0;
      const sharedTagsCount = candidate.tags.filter((t) =>
        post.tags.includes(t)
      ).length;
      return {
        post: candidate,
        score: sameCategoryScore + sharedTagsCount * 2,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (
        new Date(b.post.publishedAt).getTime() -
        new Date(a.post.publishedAt).getTime()
      );
    })
    .slice(0, 3)
    .map((entry) => entry.post);

  const baseUrl = getBaseUrl();
  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.seoDescription || post.excerpt,
    slug: post.slug,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    authorName: post.authorName,
    category: post.category,
    tags: post.tags,
    brandName: settings.brandName,
    logoUrl: settings.logoUrl,
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights & Blogs",
        item: `${baseUrl}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/blogs/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="bg-white">
        <ReadingProgressBar />
        {/* SECTION 1: ARTICLE HEADER */}
        <header className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-[#F4F8FD] via-[#F8FAFD] to-white pt-28 pb-14 sm:pt-36 sm:pb-16">
          {/* Subtle Ambient Glows & Editorial Line Art */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(30,72,131,0.11)_0%,rgba(43,100,176,0.05)_48%,transparent_72%)] blur-3xl"
            aria-hidden="true"
          />

          <Container className="relative z-10">
            <Breadcrumbs
              items={[
                { label: "Insights & Blogs", href: "/blogs" },
                {
                  label: post.category,
                  href: `/blogs?category=${encodeURIComponent(post.category)}`,
                },
                { label: post.title },
              ]}
            />

            <div className="mx-auto max-w-4xl">
              {/* Category + Publication Date + Read Time */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/blogs?category=${encodeURIComponent(post.category)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-iris/25 bg-iris/10 px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-iris uppercase transition-colors hover:bg-iris hover:text-white"
                >
                  <span>{post.category}</span>
                </Link>

                <span className="text-border" aria-hidden="true">
                  •
                </span>

                <time
                  dateTime={post.publishedAt}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted"
                >
                  <Calendar
                    className="h-3.5 w-3.5 text-iris"
                    aria-hidden="true"
                  />
                  <span>{formatDate(post.publishedAt)}</span>
                </time>

                {post.readTimeMinutes > 0 && (
                  <>
                    <span className="text-border" aria-hidden="true">
                      •
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                      <Clock
                        className="h-3.5 w-3.5 text-intelligence"
                        aria-hidden="true"
                      />
                      <span>{post.readTimeMinutes} min read</span>
                    </span>
                  </>
                )}
              </div>

              {/* Large Editorial Headline */}
              <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[52px] lg:leading-[1.1]">
                {post.title}
              </h1>

              {/* Article Excerpt / Introduction */}
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-secondary sm:text-xl sm:leading-[1.65]">
                {post.excerpt}
              </p>

              {/* Optional Author Name & Role if Configured */}
              {post.authorName && (
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-6">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-lavender/40 bg-gradient-to-br from-iris/15 to-intelligence/15 text-iris shadow-subtle">
                      <User className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink">
                        {post.authorName}
                      </div>
                      {post.authorRole && (
                        <div className="text-xs font-medium text-ink-muted">
                          {post.authorRole}
                        </div>
                      )}
                    </div>
                  </div>

                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary transition-colors hover:text-iris"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>All Insights & Blogs</span>
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </header>

        {/* SECTION 2: FEATURED IMAGE */}
        <section
          aria-label="Featured article visual"
          className="pt-10 pb-4 sm:pt-14 sm:pb-8"
        >
          <Container>
            <div className="mx-auto max-w-5xl">
              <figure className=" overflow-hidden rounded-[28px] border border-border bg-navy shadow-elevated sm:rounded-[36px]">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={post.coverImage}
                    alt={`${post.title} — ${post.category} editorial illustration`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                  />
                </div>
              </figure>
            </div>
          </Container>
        </section>

        {/* SECTION 3: ARTICLE READING LAYOUT & SECTION 4: SHARE ARTICLE */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Container>
            <div
              className={
                hasToc
                  ? "mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14"
                  : "mx-auto max-w-[740px]"
              }
            >
              {/* Sticky Table of Contents Sidebar on Desktop */}
              {hasToc && (
                <div className="lg:col-span-4 xl:col-span-3">
                  <ArticleTableOfContents
                    headings={headings}
                    variant="desktop"
                  />
                </div>
              )}

              {/* Main Editorial Reading Column (680-760px optimal line width) */}
              <div
                className={
                  hasToc
                    ? "lg:col-span-8 xl:col-span-9"
                    : "w-full"
                }
              >
                <div className="mx-auto max-w-[720px]">
                  {/* Collapsible Mobile Table of Contents */}
                  {hasToc && (
                    <ArticleTableOfContents
                      headings={headings}
                      variant="mobile"
                    />
                  )}

                  {/* Safe Rich-Text Content */}
                  <SafeArticleContent
                    content={post.content}
                    headings={headings}
                  />

                  {/* Article Tags */}
                  {post.tags.length > 0 && (
                    <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                      <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
                        <Tag className="h-3.5 w-3.5 text-iris" aria-hidden="true" />
                        <span>Topics:</span>
                      </span>
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blogs?q=${encodeURIComponent(tag)}`}
                          className="rounded-full border border-lavender/35 bg-ice/75 px-3.5 py-1 text-xs font-semibold text-ink-secondary transition-colors hover:border-iris/40 hover:bg-iris/10 hover:text-iris"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* SECTION 4: SHARE ARTICLE */}
                  <div className="mt-12">
                    <ArticleShareBar
                      title={post.title}
                      excerpt={post.excerpt}
                      slug={post.slug}
                    />
                  </div>

                  {/* Back to Insights Link */}
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-8">
                    <SecondaryButton href="/blogs">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      <span>Back to Insights & Blogs</span>
                    </SecondaryButton>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-iris transition-colors hover:text-intelligence"
                    >
                      <span>Discuss this perspective with iGUIDE</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </article>

      {/* SECTION 5: RELATED ARTICLES */}
      {relatedPosts.length > 0 && (
        <section
          aria-labelledby="related-articles-heading"
          className="border-t border-border bg-gradient-to-b from-cloud to-white py-20 sm:py-24"
        >
          <Container>
            <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <EyebrowLabel>CONTINUE READING</EyebrowLabel>
                <h2
                  id="related-articles-heading"
                  className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
                >
                  Related Perspectives on Intelligent Learning
                </h2>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-bold text-iris transition-colors hover:text-intelligence"
              >
                <span>View All Articles</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-border bg-white shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-iris/35 hover:shadow-elevated"
                >
                  <Link
                    href={`/blogs/${related.slug}`}
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-navy"
                  >
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="rounded-full border border-white/20 bg-navy/80 px-3 py-1 font-mono text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                        {related.category}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-ink-muted">
                        <Calendar
                          className="h-3.5 w-3.5 text-iris"
                          aria-hidden="true"
                        />
                        <time dateTime={related.publishedAt}>
                          {formatDate(related.publishedAt)}
                        </time>
                      </div>

                      <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-ink transition-colors group-hover:text-iris">
                        <Link href={`/blogs/${related.slug}`}>
                          {related.title}
                        </Link>
                      </h3>

                      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-ink-secondary">
                        {related.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-border/70 pt-4">
                      <Link
                        href={`/blogs/${related.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-iris transition-colors group-hover:text-intelligence"
                      >
                        <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-intelligence after:transition-all after:duration-300 group-hover:after:w-full">
                          Read More
                        </span>
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* SECTION 6: CTA */}
      <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(30,72,131,0.28),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(43,100,176,0.22),transparent_55%)]"
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl rounded-[32px] border border-white/15 bg-white/[0.04] p-8 text-center backdrop-blur-xl sm:p-14">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-lavender/30 bg-lavender/10 px-4 py-1.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-lavender uppercase">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>THE INTELLIGENCE PATH</span>
            </div>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Exploring Intelligent Learning Solutions?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              See how iGUIDE brings personalised pathways, AI tutoring, skill assessment, interactive engagement, and learning analytics together for schools, colleges, universities, and training organisations.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton href="/solutions">
                <span>Discover Our Solutions</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PrimaryButton>
              <SecondaryButton
                href="/contact"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <span>Connect with iGUIDE</span>
              </SecondaryButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
