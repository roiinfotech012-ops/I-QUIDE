"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import type { BlogPostRecord } from "@/lib/seed-data";
import { cn, formatDate } from "@/lib/utils";
import { EyebrowLabel, Pagination } from "./primitives";

const DEFAULT_BLOG_CATEGORIES = [
  "Artificial Intelligence",
  "Education Technology",
  "Personalised Learning",
  "Learning Innovation",
  "Industry Insights",
  "Company Updates",
];

const POSTS_PER_PAGE = 6;

export function BlogExplorer({
  posts,
  cmsCategories = DEFAULT_BLOG_CATEGORIES,
}: {
  posts: BlogPostRecord[];
  cmsCategories?: string[];
}) {
  // Ensure only published articles are ever displayed on the public website
  const publishedPosts = useMemo(
    () => posts.filter((p) => p.published),
    [posts]
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [urlInitialized, setUrlInitialized] = useState<boolean>(false);

  // Merge CMS-configured categories with any custom categories on published posts
  const categories = useMemo(() => {
    const merged = new Set<string>(["All"]);
    for (const cat of cmsCategories) {
      if (cat && cat.trim()) merged.add(cat.trim());
    }
    for (const post of publishedPosts) {
      if (post.category && post.category.trim()) {
        merged.add(post.category.trim());
      }
    }
    return Array.from(merged);
  }, [cmsCategories, publishedPosts]);

  // Read initial URL query parameters (?category=..., ?q=..., ?page=...)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("category");
    const qParam = params.get("q");
    const pageParam = Number(params.get("page"));

    if (catParam && categories.includes(catParam)) {
      setSelectedCategory(catParam);
    }
    if (qParam) {
      setSearchQuery(qParam);
    }
    if (pageParam && pageParam > 0) {
      setCurrentPage(pageParam);
    }
    setUrlInitialized(true);
  }, [categories]);

  // Sync state to URL query parameters
  useEffect(() => {
    if (!urlInitialized || typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (selectedCategory !== "All") {
      params.set("category", selectedCategory);
    }
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (currentPage > 1) {
      params.set("page", String(currentPage));
    }
    const queryString = params.toString();
    const nextUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;
    window.history.replaceState(null, "", nextUrl);
  }, [selectedCategory, searchQuery, currentPage, urlInitialized]);

  // Designate one CMS-featured published article
  const featuredArticle = useMemo(
    () =>
      publishedPosts.find((p) => p.featured) || publishedPosts[0] || null,
    [publishedPosts]
  );

  // Filter published articles by category and search query (title, excerpt, content, tags)
  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return publishedPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [publishedPosts, selectedCategory, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / POSTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedArticles = useMemo(
    () =>
      filteredArticles.slice(
        (safePage - 1) * POSTS_PER_PAGE,
        safePage * POSTS_PER_PAGE
      ),
    [filteredArticles, safePage]
  );

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  if (publishedPosts.length === 0) {
    return (
      <div className="rounded-hero border border-dashed border-border bg-white p-12 text-center shadow-subtle">
        <p className="font-heading text-xl font-bold text-ink">
          No Articles Published Yet
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-secondary">
          Administrators can create and publish editorial articles through the
          iGUIDE CMS.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-20 sm:space-y-24">
      {/* =====================================================================
          SECTION 2: FEATURED ARTICLE
          Editorial 60/40 composition displaying one CMS-designated featured
          published article (Wide featured image, category, title, excerpt,
          publication date, and Read Article CTA).
         ===================================================================== */}
      {featuredArticle && (
        <section aria-label="Featured Article">
          <div className="mb-6 flex items-center justify-between gap-4">
            <EyebrowLabel>FEATURED EDITORIAL DISPATCH</EyebrowLabel>
            <span className="hidden text-xs font-medium text-ink-muted sm:inline">
              iGUIDE Editorial & Research Publication
            </span>
          </div>

          <article className="group overflow-hidden rounded-hero border border-border bg-white shadow-card transition duration-300 hover:border-iris/40">
            <div className="grid items-stretch lg:grid-cols-12">
              {/* Left 60% (7 of 12 cols): Wide Featured Image */}
              <Link
                href={`/blogs/${featuredArticle.slug}`}
                className="relative block min-h-[280px] overflow-hidden bg-navy sm:min-h-[380px] lg:col-span-7"
                aria-label={`Read featured article: ${featuredArticle.title}`}
              >
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-navy/85 px-3.5 py-1 text-xs font-semibold text-lavender backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Featured Article</span>
                  </span>
                </div>
              </Link>

              {/* Right 40% (5 of 12 cols): Editorial Details */}
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full border border-iris/20 bg-lavender-soft px-3 py-1 font-semibold text-iris">
                      {featuredArticle.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-ink-muted">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      <time dateTime={featuredArticle.publishedAt}>
                        {formatDate(featuredArticle.publishedAt)}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1 text-ink-muted">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{featuredArticle.readTimeMinutes} min read</span>
                    </span>
                  </div>

                  <h2 className="mt-5 font-heading text-2xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-iris sm:text-3xl">
                    <Link href={`/blogs/${featuredArticle.slug}`}>
                      {featuredArticle.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  <div>
                    <p className="text-xs font-bold text-ink">
                      {featuredArticle.authorName}
                    </p>
                    <p className="text-[11px] text-ink-muted">
                      {featuredArticle.authorRole}
                    </p>
                  </div>

                  <Link
                    href={`/blogs/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 rounded-pill bg-navy px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-iris focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* =====================================================================
          SECTIONS 3, 4 & 5:
          - Section 3: Categories (Refined CMS-Editable Filter Navigation)
          - Section 5: Search & URL Query Parameter Controls
          - Section 4: Latest Articles Grid (Subtle image zoom & underline animation)
         ===================================================================== */}
      <section aria-label="Latest Articles and Discovery">
        <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
          <div>
            <EyebrowLabel>LATEST ARTICLES</EyebrowLabel>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Explore All Perspectives.
            </h2>
          </div>

          {/* Search Input (Title, Excerpt & Content) */}
          <div className="relative w-full lg:w-80">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search articles by title or content…"
              aria-label="Search articles by title or content"
              className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-9 text-xs text-ink shadow-subtle placeholder:text-ink-muted focus:border-iris focus:outline-none focus:ring-2 focus:ring-iris/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-muted hover:text-ink"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Section 3: Categories Filter Navigation */}
        <div
          className="mt-6 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter articles by category"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iris",
                  active
                    ? "bg-iris text-white shadow-subtle"
                    : "border border-border bg-white text-ink-secondary hover:border-iris/40 hover:text-iris"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Section 4: Latest Articles Grid (or Search Empty State) */}
        {paginatedArticles.length === 0 ? (
          <div className="mt-12 rounded-hero border border-dashed border-border bg-white px-6 py-16 text-center">
            <p className="font-heading text-xl font-bold text-ink">
              No Matching Articles Found
            </p>
            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-ink-secondary">
              No published articles matched{" "}
              {searchQuery ? (
                <>
                  your search for{" "}
                  <strong className="text-ink">&ldquo;{searchQuery}&rdquo;</strong>
                </>
              ) : (
                "the selected category"
              )}
              {selectedCategory !== "All" ? (
                <>
                  {" "}
                  in <strong className="text-ink">{selectedCategory}</strong>
                </>
              ) : null}
              .
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white shadow-subtle transition hover:bg-iris-dark"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset Search & Category Filter</span>
            </button>
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedArticles.map((post) => (
                <article
                  key={post.id}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-feature border border-border bg-white transition-colors duration-200 hover:border-iris/40"
                >
                  <div>
                    {/* Featured Image with Subtle Hover Zoom */}
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="relative block aspect-[16/10] w-full overflow-hidden bg-navy"
                      aria-label={`Read ${post.title}`}
                    >
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </Link>

                    <div className="p-6 pb-4">
                      {/* Category & Publication Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="rounded-full border border-iris/20 bg-lavender-soft/80 px-3 py-0.5 font-semibold text-iris">
                          {post.category}
                        </span>
                        <time
                          dateTime={post.publishedAt}
                          className="text-ink-muted"
                        >
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>

                      {/* Blog Title */}
                      <h3 className="mt-4 line-clamp-2 font-heading text-lg font-bold leading-snug text-ink transition-colors group-hover:text-iris">
                        <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                      </h3>

                      {/* Short Excerpt */}
                      <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-ink-secondary sm:text-sm">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More Link with Elegant Underline Animation */}
                  <div className="px-6 pb-6 pt-2">
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="relative inline-flex items-center gap-1.5 pb-0.5 text-xs font-semibold text-iris after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-iris after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                      >
                        <span>Read More</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                      <span className="text-[11px] text-ink-muted">
                        {post.readTimeMinutes} min read
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Section 5: Pagination */}
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          </>
        )}
      </section>
    </div>
  );
}
