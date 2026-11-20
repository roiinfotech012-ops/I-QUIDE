"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  BookOpen,
  CheckCircle2,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  FolderKanban,
  Globe,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  MessageSquareQuote,
  Phone,
  Plus,
  Save,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import {
  removeAdminUserAction,
  removeBlogPostAction,
  removeEnquiryAction,
  removeGalleryItemAction,
  removeHeroBannerAction,
  removeMediaAssetAction,
  removeSolutionAction,
  removeTestimonialAction,
  saveAdminUserAction,
  saveBlogPostAction,
  saveGalleryItemAction,
  saveHeroBannerAction,
  savePageContentAction,
  saveSiteSettingsAction,
  saveSolutionAction,
  saveTestimonialAction,
  updateEnquiryAction,
  uploadMediaAssetAction,
} from "@/app/actions/cms-actions";
import type {
  AdminUserRecord,
  AuditLogRecord,
  BlogPostRecord,
  EnquiryRecord,
  GalleryItemRecord,
  HeroBannerRecord,
  MediaAssetRecord,
  PageContentRecord,
  SiteSettingsRecord,
  SolutionRecord,
  TestimonialRecord,
} from "@/lib/seed-data";
import { cn, formatDate } from "@/lib/utils";

export type AdminTab =
  | "overview"
  | "banners"
  | "pages"
  | "hero-pages"
  | "solutions"
  | "gallery"
  | "testimonials"
  | "blogs"
  | "blog-categories"
  | "enquiries"
  | "contact"
  | "social"
  | "settings"
  | "users"
  | "media";

const TAB_ROUTES: Record<AdminTab, string> = {
  overview: "/admin",
  banners: "/admin/banners",
  pages: "/admin/pages",
  "hero-pages": "/admin/pages",
  solutions: "/admin/solutions",
  gallery: "/admin/gallery",
  testimonials: "/admin/testimonials",
  blogs: "/admin/blogs",
  "blog-categories": "/admin/blogs?tab=categories",
  enquiries: "/admin/enquiries",
  contact: "/admin/contact",
  social: "/admin/social",
  settings: "/admin/settings",
  users: "/admin/users",
  media: "/admin/gallery",
};

export function AdminDashboardClient({
  user,
  systemStatus,
  initialSiteSettings,
  initialHeroBanners,
  initialPageContents,
  initialSolutions,
  initialGalleryItems,
  initialTestimonials,
  initialBlogPosts,
  initialEnquiries,
  initialMediaAssets,
  initialAdminUsers = [],
  initialAuditLogs = [],
  initialActiveTab = "overview",
  initialBlogEditId,
  initialCreateNewBlog = false,
}: {
  user: { name: string; email: string; role?: string };
  systemStatus: {
    postgresConnected: boolean;
    storageEngine: string;
    resendConfigured: boolean;
    emailMode: string;
  };
  initialSiteSettings: SiteSettingsRecord;
  initialHeroBanners: HeroBannerRecord[];
  initialPageContents: PageContentRecord[];
  initialSolutions: SolutionRecord[];
  initialGalleryItems: GalleryItemRecord[];
  initialTestimonials: TestimonialRecord[];
  initialBlogPosts: BlogPostRecord[];
  initialEnquiries: EnquiryRecord[];
  initialMediaAssets: MediaAssetRecord[];
  initialAdminUsers?: AdminUserRecord[];
  initialAuditLogs?: AuditLogRecord[];
  initialActiveTab?: AdminTab;
  initialBlogEditId?: string;
  initialCreateNewBlog?: boolean;
}) {
  const [activeTab, setActiveTabState] = useState<AdminTab>(initialActiveTab);
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const setActiveTab = (tab: AdminTab) => {
    setActiveTabState(tab);
    if (typeof window !== "undefined") {
      const targetUrl = TAB_ROUTES[tab] || "/admin";
      window.history.replaceState(null, "", targetUrl);
    }
  };

  // State mirrors
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings);
  const [heroBanners, setHeroBanners] = useState<HeroBannerRecord[]>(
    initialHeroBanners.length > 0
      ? initialHeroBanners
      : [
          {
            id: "hero-home-main",
            pageSlug: "home",
            eyebrow: "THE FUTURE OF INTELLIGENT LEARNING",
            headline: "Every Mind Learns Differently.",
            highlightedText: "Intelligence Makes It Possible.",
            subheadline:
              "Discover a more adaptive, engaging, and human-centred approach to education—powered by intelligent technology.",
            desktopImage: "/visuals/solution-adaptive-engine.svg",
            mobileImage: "/visuals/solution-adaptive-engine.svg",
            primaryCtaLabel: "Explore Our Solutions",
            primaryCtaHref: "/solutions",
            secondaryCtaLabel: "Discover iGUIDE",
            secondaryCtaHref: "/about",
            visualCaption: "Intelligence Path Ecosystem",
            published: true,
            displayOrder: 1,
            updatedAt: new Date().toISOString(),
          },
        ]
  );
  const [heroBanner, setHeroBanner] = useState<HeroBannerRecord>(
    heroBanners[0]
  );
  const [pageContents, setPageContents] = useState(initialPageContents);
  const [selectedPageSlug, setSelectedPageSlug] = useState(
    initialPageContents[0]?.pageSlug || "home"
  );

  const [solutions, setSolutions] = useState(initialSolutions);
  const [editingSolution, setEditingSolution] = useState<
    SolutionRecord | undefined
  >(initialSolutions[0]);

  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [editingGallery, setEditingGallery] = useState<
    GalleryItemRecord | undefined
  >(initialGalleryItems[0]);

  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<
    TestimonialRecord | undefined
  >(initialTestimonials[0]);

  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [editingBlog, setEditingBlog] = useState<BlogPostRecord | undefined>(
    () => {
      if (initialCreateNewBlog) {
        return {
          id: `blog-${Date.now()}`,
          slug: `new-iguide-article-${initialBlogPosts.length + 1}`,
          title: "New iGUIDE Editorial Perspective",
          excerpt: "Concise editorial introduction for cards and search engines.",
          content:
            "## Introduction\n\nWrite your structured long-form article here.",
          category: "Artificial Intelligence",
          readTimeMinutes: 5,
          authorName: "iGUIDE Editorial Desk",
          authorRole: "Pedagogical Systems Architecture",
          coverImage: "/visuals/blog-adaptive-pedagogy.svg",
          tags: ["Artificial Intelligence", "Education Technology"],
          featured: false,
          published: false,
          publishedAt: new Date().toISOString(),
          seoTitle: "New Editorial Perspective | iGUIDE Insights",
          seoDescription: "Concise editorial introduction for search engines.",
          updatedAt: new Date().toISOString(),
        };
      }
      if (initialBlogEditId) {
        const matched = initialBlogPosts.find(
          (b) => b.id === initialBlogEditId || b.slug === initialBlogEditId
        );
        if (matched) return matched;
      }
      return initialBlogPosts[0];
    }
  );
  const [newBlogCategoryName, setNewBlogCategoryName] = useState("");

  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [enquiryFilter, setEnquiryFilter] = useState<string>("ALL");
  const [enquirySearch, setEnquirySearch] = useState<string>("");
  const [enquiryDateFilter, setEnquiryDateFilter] = useState<string>("ALL");
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(
    initialEnquiries[0]?.id || null
  );

  const [mediaAssets, setMediaAssets] = useState(initialMediaAssets);
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>(
    initialAdminUsers
  );
  const [auditLogs] = useState<AuditLogRecord[]>(initialAuditLogs);
  const [newAdminForm, setNewAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR" as AdminUserRecord["role"],
    enabled: true,
  });

  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const currentPageContent =
    pageContents.find((p) => p.pageSlug === selectedPageSlug) ||
    pageContents[0];

  const blogPageRecord = pageContents.find((p) => p.pageSlug === "blog");
  const blogCategoriesList: string[] =
    ((blogPageRecord?.sectionsJson as { categories?: string[] })
      ?.categories as string[]) || [
      "Artificial Intelligence",
      "Education Technology",
      "Personalised Learning",
      "Learning Innovation",
      "Industry Insights",
      "Company Updates",
    ];

  const navItems: {
    id: AdminTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    {
      id: "banners",
      label: `Hero Banners (${heroBanners.length})`,
      icon: Layers,
    },
    { id: "pages", label: "Page Content", icon: FileText },
    {
      id: "solutions",
      label: `Solutions (${solutions.length})`,
      icon: FolderKanban,
    },
    {
      id: "gallery",
      label: `Gallery (${galleryItems.length})`,
      icon: ImageIcon,
    },
    {
      id: "testimonials",
      label: `Testimonials (${testimonials.length})`,
      icon: MessageSquareQuote,
    },
    { id: "blogs", label: `Blogs (${blogPosts.length})`, icon: BookOpen },
    {
      id: "blog-categories",
      label: `Blog Categories (${blogCategoriesList.length})`,
      icon: Tag,
    },
    {
      id: "enquiries",
      label: `Enquiries (${enquiries.length})`,
      icon: Mail,
    },
    { id: "contact", label: "Contact Details", icon: Phone },
    { id: "social", label: "Social Media", icon: Share2 },
    { id: "settings", label: "Website Settings", icon: Settings },
    {
      id: "users",
      label: `Admin Users (${adminUsers.length || 1})`,
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-cloud text-ink">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 px-6 py-3.5 text-ink shadow-subtle backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-iris to-intelligence text-white shadow-subtle">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-iris">
                iGUIDE Enterprise CMS
              </span>
              <h1 className="font-heading text-lg font-extrabold tracking-tight text-ink">
                Administrative Content & Enquiry Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-border bg-cloud px-3 py-1 text-xs text-ink-secondary sm:inline-flex sm:items-center sm:gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-iris" aria-hidden="true" />
              <span>
                <strong className="text-ink">{user.email}</strong> (
                {user.role || "SUPER_ADMIN"})
              </span>
            </span>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-ink transition hover:border-iris hover:text-iris"
            >
              <span>View Public Site</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Feedback Banner */}
      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl bg-navy px-5 py-3.5 text-xs font-semibold text-white shadow-navy border border-iris"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <nav
              aria-label="CMS Modules"
              className="space-y-1 rounded-3xl border border-border bg-white p-3.5 shadow-subtle"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const active =
                  activeTab === item.id ||
                  (activeTab === "hero-pages" && item.id === "pages");
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition",
                      active
                        ? "bg-iris text-white shadow-subtle"
                        : "text-ink-secondary hover:bg-ice hover:text-iris"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Module Content */}
          <div className="lg:col-span-9">
            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-white p-6 shadow-subtle sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="font-heading text-2xl font-extrabold text-ink">
                        Executive CMS Dashboard
                      </h2>
                      <p className="mt-1 text-xs text-ink-secondary">
                        Live database metrics, recent enquiries, publication summaries, and quick editorial actions.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab("blogs")}
                        className="inline-flex items-center gap-1.5 rounded-full bg-iris px-4 py-2 text-xs font-semibold text-white hover:bg-iris-hover"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>New Blog Article</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("enquiries")}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-cloud px-4 py-2 text-xs font-semibold text-ink hover:border-iris"
                      >
                        <Mail className="h-3.5 w-3.5 text-iris" />
                        <span>Review Enquiries</span>
                      </button>
                    </div>
                  </div>

                  {/* 6 Required Dashboard Cards */}
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {[
                      {
                        label: "Published Blogs",
                        value: blogPosts.filter((b) => b.published).length,
                        sub: `${blogPosts.filter((b) => !b.published).length} drafts`,
                        tab: "blogs" as AdminTab,
                      },
                      {
                        label: "Published Solutions",
                        value: solutions.filter((s) => s.published).length,
                        sub: `${solutions.length} total`,
                        tab: "solutions" as AdminTab,
                      },
                      {
                        label: "Gallery Images",
                        value: galleryItems.length,
                        sub: `${galleryItems.filter((g) => g.published).length} published`,
                        tab: "gallery" as AdminTab,
                      },
                      {
                        label: "Testimonials",
                        value: testimonials.length,
                        sub: `${testimonials.filter((t) => t.published).length} published`,
                        tab: "testimonials" as AdminTab,
                      },
                      {
                        label: "Total Enquiries",
                        value: enquiries.length,
                        sub: "All time",
                        tab: "enquiries" as AdminTab,
                      },
                      {
                        label: "New Enquiries",
                        value: enquiries.filter((e) => e.status === "NEW")
                          .length,
                        sub: "Awaiting action",
                        tab: "enquiries" as AdminTab,
                      },
                    ].map((metric) => (
                      <button
                        key={metric.label}
                        type="button"
                        onClick={() => setActiveTab(metric.tab)}
                        className="rounded-2xl border border-border bg-cloud/70 p-4 text-left transition hover:-translate-y-0.5 hover:border-iris hover:bg-white hover:shadow-subtle"
                      >
                        <p className="font-heading text-2xl font-extrabold text-iris">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-xs font-bold text-ink">
                          {metric.label}
                        </p>
                        <p className="mt-0.5 text-[10px] text-ink-muted">
                          {metric.sub}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Recent Enquiries + Recently Updated Content Split */}
                  <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-cloud/50 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-sm font-bold text-ink">
                          Recent Enquiries
                        </h3>
                        <button
                          type="button"
                          onClick={() => setActiveTab("enquiries")}
                          className="text-xs font-semibold text-iris hover:underline"
                        >
                          View All →
                        </button>
                      </div>
                      <div className="mt-4 space-y-2.5">
                        {enquiries.slice(0, 4).map((enq) => (
                          <div
                            key={enq.id}
                            className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="truncate font-bold text-ink">
                                {enq.fullName} · {enq.institutionName}
                              </p>
                              <p className="truncate text-[11px] text-ink-muted">
                                {enq.solutionInterest} •{" "}
                                {formatDate(enq.createdAt)}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                                enq.status === "NEW"
                                  ? "bg-iris/15 text-iris"
                                  : enq.status === "ARCHIVED"
                                    ? "bg-slate-200 text-slate-700"
                                    : "bg-emerald-100 text-emerald-800"
                              )}
                            >
                              {enq.status === "NEW"
                                ? "New"
                                : enq.status === "ARCHIVED"
                                  ? "Closed"
                                  : "Contacted"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-cloud/50 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-sm font-bold text-ink">
                          Recently Updated Content
                        </h3>
                        <button
                          type="button"
                          onClick={() => setActiveTab("pages")}
                          className="text-xs font-semibold text-iris hover:underline"
                        >
                          Manage Pages →
                        </button>
                      </div>
                      <div className="mt-4 space-y-2.5">
                        {blogPosts.slice(0, 4).map((post) => (
                          <div
                            key={post.id}
                            className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="truncate font-bold text-ink">
                                {post.title}
                              </p>
                              <p className="truncate text-[11px] text-ink-muted">
                                {post.category} • Updated{" "}
                                {formatDate(post.updatedAt)}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase",
                                post.published
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              )}
                            >
                              {post.published ? "Published" : "Draft"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Infrastructure Transparency Panel */}
                  <div className="mt-6 rounded-2xl border border-border bg-ice/50 p-5">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink">
                      <Database className="h-4 w-4 text-iris" aria-hidden="true" />
                      <span>Infrastructure & Integration Status</span>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                      <div className="rounded-xl border border-border bg-white p-4">
                        <p className="font-semibold text-ink">
                          Database Persistence Engine
                        </p>
                        <p className="mt-1 text-ink-secondary">
                          {systemStatus.storageEngine}
                        </p>
                        <p className="mt-2 text-[11px] text-ink-muted">
                          Prisma schema: <code>prisma/schema.prisma</code>{" "}
                          (PostgreSQL). Run{" "}
                          <code>npm run db:push && npm run db:seed</code> once
                          your PostgreSQL instance is running on{" "}
                          <code>DATABASE_URL</code>.
                        </p>
                      </div>
                      <div className="rounded-xl border border-border bg-white p-4">
                        <p className="font-semibold text-ink">
                          Transactional Email Service (Resend)
                        </p>
                        <p className="mt-1 text-ink-secondary">
                          {systemStatus.emailMode}
                        </p>
                        <p className="mt-2 text-[11px] text-ink-muted">
                          Provide <code>RESEND_API_KEY</code> in{" "}
                          <code>.env</code> to dispatch live notification emails
                          to <code>{siteSettings.primaryEmail}</code>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2A: HERO BANNERS CRUD (/admin/banners) */}
            {activeTab === "banners" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-white p-6 shadow-subtle sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="font-heading text-xl font-bold text-ink">
                        Hero Banners Management
                      </h2>
                      <p className="mt-1 text-xs text-ink-secondary">
                        Create, edit, reorder, preview, and publish/unpublish homepage hero banners.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const created: HeroBannerRecord = {
                          id: `hero-${Date.now()}`,
                          pageSlug: "home",
                          eyebrow: "THE FUTURE OF INTELLIGENT LEARNING",
                          headline: "New Hero Banner Headline",
                          highlightedText: "Intelligence Makes It Possible.",
                          subheadline:
                            "Discover a more adaptive, engaging, and human-centred approach to education.",
                          desktopImage: "/visuals/solution-adaptive-engine.svg",
                          mobileImage: "/visuals/solution-adaptive-engine.svg",
                          primaryCtaLabel: "Explore Our Solutions",
                          primaryCtaHref: "/solutions",
                          secondaryCtaLabel: "Discover iGUIDE",
                          secondaryCtaHref: "/about",
                          visualCaption: "Intelligence Path Ecosystem",
                          published: true,
                          displayOrder: heroBanners.length + 1,
                          updatedAt: new Date().toISOString(),
                        };
                        setHeroBanners((prev) => [...prev, created]);
                        setHeroBanner(created);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-iris px-4 py-2 text-xs font-semibold text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Hero Banner</span>
                    </button>
                  </div>

                  {/* Banner Selector Pills */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {heroBanners.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setHeroBanner(b)}
                        className={cn(
                          "rounded-xl border px-3.5 py-2 text-xs font-semibold transition",
                          heroBanner.id === b.id
                            ? "border-iris bg-iris text-white"
                            : "border-border bg-cloud text-ink-secondary"
                        )}
                      >
                        #{b.displayOrder} · {b.headline.slice(0, 28)}{" "}
                        {b.published ? "(Active)" : "(Inactive)"}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Eyebrow / Subtitle Label
                      </label>
                      <input
                        type="text"
                        value={heroBanner.eyebrow}
                        onChange={(e) =>
                          setHeroBanner({
                            ...heroBanner,
                            eyebrow: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Banner Title / Main Headline
                      </label>
                      <input
                        type="text"
                        value={heroBanner.headline}
                        onChange={(e) =>
                          setHeroBanner({
                            ...heroBanner,
                            headline: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Gradient Highlighted Headline
                      </label>
                      <input
                        type="text"
                        value={heroBanner.highlightedText}
                        onChange={(e) =>
                          setHeroBanner({
                            ...heroBanner,
                            highlightedText: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={heroBanner.displayOrder}
                        onChange={(e) =>
                          setHeroBanner({
                            ...heroBanner,
                            displayOrder: Number(e.target.value) || 1,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Desktop Image URL
                      </label>
                      <input
                        type="text"
                        value={
                          heroBanner.desktopImage ||
                          "/visuals/solution-adaptive-engine.svg"
                        }
                        onChange={(e) =>
                          setHeroBanner({
                            ...heroBanner,
                            desktopImage: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Mobile Image URL
                      </label>
                      <input
                        type="text"
                        value={
                          heroBanner.mobileImage ||
                          "/visuals/solution-adaptive-engine.svg"
                        }
                        onChange={(e) =>
                          setHeroBanner({
                            ...heroBanner,
                            mobileImage: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs text-ink"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-ink">
                        Description / Subheadline
                      </label>
                      <textarea
                        rows={3}
                        value={heroBanner.subheadline}
                        onChange={(e) =>
                          setHeroBanner({
                            ...heroBanner,
                            subheadline: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs text-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Primary CTA Label & Link
                      </label>
                      <div className="mt-1 flex gap-2">
                        <input
                          type="text"
                          value={heroBanner.primaryCtaLabel}
                          onChange={(e) =>
                            setHeroBanner({
                              ...heroBanner,
                              primaryCtaLabel: e.target.value,
                            })
                          }
                          className="w-1/2 rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                        <input
                          type="text"
                          value={heroBanner.primaryCtaHref}
                          onChange={(e) =>
                            setHeroBanner({
                              ...heroBanner,
                              primaryCtaHref: e.target.value,
                            })
                          }
                          className="w-1/2 rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Secondary CTA Label & Link
                      </label>
                      <div className="mt-1 flex gap-2">
                        <input
                          type="text"
                          value={heroBanner.secondaryCtaLabel}
                          onChange={(e) =>
                            setHeroBanner({
                              ...heroBanner,
                              secondaryCtaLabel: e.target.value,
                            })
                          }
                          className="w-1/2 rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                        <input
                          type="text"
                          value={heroBanner.secondaryCtaHref}
                          onChange={(e) =>
                            setHeroBanner({
                              ...heroBanner,
                              secondaryCtaHref: e.target.value,
                            })
                          }
                          className="w-1/2 rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Live Banner Preview Card */}
                  <div className="mt-6 rounded-2xl border border-lavender/40 bg-gradient-to-r from-[#F4F8FD] via-white to-[#EEF4FF] p-5">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-iris uppercase">
                      Live Hero Banner Preview • {heroBanner.eyebrow}
                    </span>
                    <h3 className="mt-1 font-heading text-xl font-extrabold text-ink">
                      {heroBanner.headline}{" "}
                      <span className="text-iris">
                        {heroBanner.highlightedText}
                      </span>
                    </h3>
                    <p className="mt-1 text-xs text-ink-secondary">
                      {heroBanner.subheadline}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                      <input
                        type="checkbox"
                        checked={heroBanner.published}
                        onChange={(e) =>
                          setHeroBanner({
                            ...heroBanner,
                            published: e.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded text-iris"
                      />
                      <span>Active / Published on Homepage</span>
                    </label>

                    <div className="flex items-center gap-3">
                      {heroBanners.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              await removeHeroBannerAction(heroBanner.id);
                              const next = heroBanners.filter(
                                (b) => b.id !== heroBanner.id
                              );
                              setHeroBanners(next);
                              if (next[0]) setHeroBanner(next[0]);
                              notify("Hero banner deleted.");
                            });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          startTransition(async () => {
                            const res = await saveHeroBannerAction(heroBanner);
                            if (res.success) {
                              setHeroBanners((prev) => {
                                const exists = prev.some(
                                  (b) => b.id === res.data.id
                                );
                                return exists
                                  ? prev.map((b) =>
                                      b.id === res.data.id ? res.data : b
                                    )
                                  : [...prev, res.data];
                              });
                              notify("Hero Banner saved and published.");
                            }
                          });
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white shadow-subtle hover:bg-iris-hover"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Save Hero Banner</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2B: PAGE CONTENT & SEO (/admin/pages) */}
            {(activeTab === "pages" || activeTab === "hero-pages") && (
              <div className="space-y-8">
                {/* Page Headings, Descriptions & SEO Metadata Editor */}
                {currentPageContent && (
                  <div className="rounded-feature border border-border bg-white p-6 shadow-subtle sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="font-heading text-xl font-bold text-ink">
                          Page Headings & SEO Metadata
                        </h2>
                        <p className="mt-1 text-xs text-ink-secondary">
                          Select any public page to update its hero heading,
                          subtitle, and search engine metadata.
                        </p>
                      </div>
                      <select
                        value={selectedPageSlug}
                        onChange={(e) => setSelectedPageSlug(e.target.value)}
                        aria-label="Select page to edit"
                        className="rounded-xl border border-border bg-cloud px-4 py-2 text-xs font-semibold text-ink"
                      >
                        {pageContents.map((p) => (
                          <option key={p.pageSlug} value={p.pageSlug}>
                            Page: /{p.pageSlug === "home" ? "" : p.pageSlug}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Section / Page Eyebrow
                        </label>
                        <input
                          type="text"
                          value={currentPageContent.eyebrow}
                          onChange={(e) =>
                            setPageContents((prev) =>
                              prev.map((p) =>
                                p.pageSlug === currentPageContent.pageSlug
                                  ? { ...p, eyebrow: e.target.value }
                                  : p
                              )
                            )
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Page Heading Title
                        </label>
                        <input
                          type="text"
                          value={currentPageContent.title}
                          onChange={(e) =>
                            setPageContents((prev) =>
                              prev.map((p) =>
                                p.pageSlug === currentPageContent.pageSlug
                                  ? { ...p, title: e.target.value }
                                  : p
                              )
                            )
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-ink">
                          Page Subtitle / Description
                        </label>
                        <textarea
                          rows={2}
                          value={currentPageContent.subtitle}
                          onChange={(e) =>
                            setPageContents((prev) =>
                              prev.map((p) =>
                                p.pageSlug === currentPageContent.pageSlug
                                  ? { ...p, subtitle: e.target.value }
                                  : p
                              )
                            )
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          SEO Title Tag
                        </label>
                        <input
                          type="text"
                          value={currentPageContent.seoTitle}
                          onChange={(e) =>
                            setPageContents((prev) =>
                              prev.map((p) =>
                                p.pageSlug === currentPageContent.pageSlug
                                  ? { ...p, seoTitle: e.target.value }
                                  : p
                              )
                            )
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          SEO Meta Description
                        </label>
                        <input
                          type="text"
                          value={currentPageContent.seoDescription}
                          onChange={(e) =>
                            setPageContents((prev) =>
                              prev.map((p) =>
                                p.pageSlug === currentPageContent.pageSlug
                                  ? { ...p, seoDescription: e.target.value }
                                  : p
                              )
                            )
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                        />
                      </div>

                      {/* Legal Pages Dedicated Rich-Text & Review Fields */}
                      {(currentPageContent.pageSlug === "privacy-policy" ||
                        currentPageContent.pageSlug ===
                          "terms-and-conditions") && (
                        <>
                          <div>
                            <label className="block text-xs font-semibold text-ink">
                              URL Slug
                            </label>
                            <input
                              type="text"
                              readOnly
                              value={`/${currentPageContent.pageSlug}`}
                              className="mt-1 w-full rounded-xl border border-border bg-cloud/60 px-3.5 py-2.5 font-mono text-xs text-ink-muted"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-ink">
                              Last Updated Label
                            </label>
                            <input
                              type="text"
                              value={
                                ((
                                  currentPageContent.sectionsJson as {
                                    lastUpdated?: string;
                                  }
                                )?.lastUpdated as string) || ""
                              }
                              onChange={(e) =>
                                setPageContents((prev) =>
                                  prev.map((p) =>
                                    p.pageSlug === currentPageContent.pageSlug
                                      ? {
                                          ...p,
                                          sectionsJson: {
                                            ...(p.sectionsJson || {}),
                                            lastUpdated: e.target.value,
                                          },
                                        }
                                      : p
                                  )
                                )
                              }
                              placeholder="e.g., November 2026"
                              className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <label className="block text-xs font-semibold text-ink">
                                Legal Policy Rich-Text Content (Markdown)
                              </label>
                              <div className="flex flex-wrap items-center gap-1.5">
                                {[
                                  {
                                    label: "+ H2 Heading",
                                    snippet: "\n\n## Section Heading\n\n",
                                  },
                                  {
                                    label: "+ H3 Subheading",
                                    snippet: "\n\n### Subsection Heading\n\n",
                                  },
                                  {
                                    label: "+ Bullet List",
                                    snippet:
                                      "\n\n- **Item:** Policy detail.\n- **Item:** Policy detail.\n",
                                  },
                                  {
                                    label: "+ Review Note",
                                    snippet:
                                      "\n\n> Draft Note: Pending legal review.\n\n",
                                  },
                                  {
                                    label: "+ Link",
                                    snippet: " [Contact Us](/contact) ",
                                  },
                                ].map((tool) => (
                                  <button
                                    key={tool.label}
                                    type="button"
                                    onClick={() => {
                                      const existing =
                                        ((
                                          currentPageContent.sectionsJson as {
                                            richContent?: string;
                                          }
                                        )?.richContent as string) || "";
                                      setPageContents((prev) =>
                                        prev.map((p) =>
                                          p.pageSlug ===
                                          currentPageContent.pageSlug
                                            ? {
                                                ...p,
                                                sectionsJson: {
                                                  ...(p.sectionsJson || {}),
                                                  richContent: `${existing}${tool.snippet}`,
                                                },
                                              }
                                            : p
                                        )
                                      );
                                    }}
                                    className="rounded-lg border border-border bg-white px-2.5 py-1 text-[10px] font-semibold text-ink-secondary hover:border-iris hover:text-iris"
                                  >
                                    {tool.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <textarea
                              rows={10}
                              value={
                                ((
                                  currentPageContent.sectionsJson as {
                                    richContent?: string;
                                  }
                                )?.richContent as string) || ""
                              }
                              onChange={(e) =>
                                setPageContents((prev) =>
                                  prev.map((p) =>
                                    p.pageSlug === currentPageContent.pageSlug
                                      ? {
                                          ...p,
                                          sectionsJson: {
                                            ...(p.sectionsJson || {}),
                                            richContent: e.target.value,
                                          },
                                        }
                                      : p
                                  )
                                )
                              }
                              className="mt-1.5 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 font-mono text-xs"
                            />
                          </div>

                          <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
                            <label className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800">
                              <input
                                type="checkbox"
                                checked={
                                  (
                                    currentPageContent.sectionsJson as {
                                      isDraftForReview?: boolean;
                                    }
                                  )?.isDraftForReview !== false
                                }
                                onChange={(e) =>
                                  setPageContents((prev) =>
                                    prev.map((p) =>
                                      p.pageSlug === currentPageContent.pageSlug
                                        ? {
                                            ...p,
                                            sectionsJson: {
                                              ...(p.sectionsJson || {}),
                                              isDraftForReview:
                                                e.target.checked,
                                            },
                                          }
                                        : p
                                    )
                                  )
                                }
                                className="h-4 w-4 rounded text-iris"
                              />
                              <span>
                                Label as &ldquo;Draft for Administrator & Legal Review&rdquo;
                              </span>
                            </label>
                          </div>
                        </>
                      )}

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-ink">
                          Structured Page Sections Content (JSON — Headings, Story, Approach Principles, Strengths & CTAs)
                        </label>
                        <textarea
                          rows={8}
                          defaultValue={JSON.stringify(
                            currentPageContent.sectionsJson || {},
                            null,
                            2
                          )}
                          key={`${currentPageContent.pageSlug}-${
                            ((
                              currentPageContent.sectionsJson as {
                                lastUpdated?: string;
                                isDraftForReview?: boolean;
                              }
                            )?.lastUpdated as string) || ""
                          }`}
                          onBlur={(e) => {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              setPageContents((prev) =>
                                prev.map((p) =>
                                  p.pageSlug === currentPageContent.pageSlug
                                    ? { ...p, sectionsJson: parsed }
                                    : p
                                )
                              );
                            } catch {
                              notify(
                                "Invalid JSON format in Structured Page Sections."
                              );
                            }
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 font-mono text-xs"
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                      <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                        <input
                          type="checkbox"
                          checked={currentPageContent.published}
                          onChange={(e) =>
                            setPageContents((prev) =>
                              prev.map((p) =>
                                p.pageSlug === currentPageContent.pageSlug
                                  ? { ...p, published: e.target.checked }
                                  : p
                              )
                            )
                          }
                          className="h-4 w-4 rounded text-iris"
                        />
                        <span>Published (Publicly Indexable)</span>
                      </label>

                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          startTransition(async () => {
                            await savePageContentAction(currentPageContent);
                            notify(
                              `Page "/${currentPageContent.pageSlug}" content and SEO saved.`
                            );
                          });
                        }}
                        className="inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white shadow-subtle hover:bg-iris-hover"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Save Page Content & SEO</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SOLUTIONS MANAGER */}
            {activeTab === "solutions" && (
              <div className="space-y-6">
                <div className="rounded-feature border border-border bg-white p-6 shadow-subtle sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="font-heading text-xl font-bold text-ink">
                        Solutions Manager
                      </h2>
                      <p className="mt-1 text-xs text-ink-secondary">
                        Manage the six core solution pages, display order,
                        descriptions, and publication state.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newSol: SolutionRecord = {
                          id: `sol-${Date.now()}`,
                          slug: `new-solution-${solutions.length + 1}`,
                          title: "New AI Educational Solution",
                          shortTitle: "New Solution",
                          tagline: "Intelligent learning capability",
                          category: "Core Learning Intelligence",
                          summary: "Summary of the solution module.",
                          description: "Full description of the solution.",
                          challengeText: "The educational challenge addressed.",
                          approachText: "How iGUIDE approaches the challenge.",
                          outcomeText: "The institutional and learner outcome.",
                          iconName: "Waypoints",
                          heroImage: "/visuals/solution-adaptive-engine.svg",
                          accentColor: "#1E4883",
                          keyCapabilities: [
                            {
                              title: "Core Capability",
                              description: "Capability description.",
                            },
                          ],
                          useCases: [
                            {
                              audience: "Higher Education",
                              scenario: "Institutional application scenario.",
                            },
                          ],
                          architectureSteps: [
                            {
                              step: "01",
                              title: "Discovery",
                              detail: "Baseline diagnostic mapping.",
                            },
                          ],
                          faqs: [],
                          displayOrder: solutions.length + 1,
                          featured: true,
                          published: true,
                          seoTitle: "New AI Solution | iGUIDE",
                          seoDescription: "Explore this iGUIDE AI solution.",
                          updatedAt: new Date().toISOString(),
                        };
                        setEditingSolution(newSol);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-iris px-4 py-2 text-xs font-semibold text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>New Solution</span>
                    </button>
                  </div>

                  {/* Solution Selector Pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {solutions.map((sol) => (
                      <button
                        key={sol.id}
                        type="button"
                        onClick={() => setEditingSolution(sol)}
                        className={cn(
                          "rounded-xl border px-3.5 py-2 text-xs font-semibold transition",
                          editingSolution?.id === sol.id
                            ? "border-iris bg-iris-light text-iris"
                            : "border-border bg-cloud text-ink-secondary hover:border-iris/40"
                        )}
                      >
                        #{sol.displayOrder} · {sol.shortTitle || sol.title}
                      </button>
                    ))}
                  </div>

                  {editingSolution && (
                    <div className="mt-6 space-y-4 border-t border-border pt-6">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Full Solution Title
                          </label>
                          <input
                            type="text"
                            value={editingSolution.title}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                title: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Short Navigation Title
                          </label>
                          <input
                            type="text"
                            value={editingSolution.shortTitle}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                shortTitle: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            URL Slug
                          </label>
                          <input
                            type="text"
                            value={editingSolution.slug}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                slug: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Category
                          </label>
                          <input
                            type="text"
                            value={editingSolution.category}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                category: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Desktop Hero Media URL
                          </label>
                          <input
                            type="text"
                            value={editingSolution.heroImage}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                heroImage: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Mobile Hero Media URL
                          </label>
                          <input
                            type="text"
                            value={
                              editingSolution.mobileHeroImage ||
                              editingSolution.heroImage
                            }
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                mobileHeroImage: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Display Order
                          </label>
                          <input
                            type="number"
                            value={editingSolution.displayOrder}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                displayOrder: Number(e.target.value) || 1,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Tagline
                          </label>
                          <input
                            type="text"
                            value={editingSolution.tagline}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                tagline: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Subtitle / Focus Statement
                          </label>
                          <input
                            type="text"
                            value={editingSolution.subtitle || ""}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                subtitle: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Hero Description
                        </label>
                        <textarea
                          rows={2}
                          value={
                            editingSolution.heroDescription ||
                            editingSolution.description
                          }
                          onChange={(e) =>
                            setEditingSolution({
                              ...editingSolution,
                              heroDescription: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Summary (Card Excerpt)
                        </label>
                        <textarea
                          rows={2}
                          value={editingSolution.summary}
                          onChange={(e) =>
                            setEditingSolution({
                              ...editingSolution,
                              summary: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Detailed Description
                        </label>
                        <textarea
                          rows={3}
                          value={editingSolution.description}
                          onChange={(e) =>
                            setEditingSolution({
                              ...editingSolution,
                              description: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            The Challenge
                          </label>
                          <textarea
                            rows={3}
                            value={editingSolution.challengeText}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                challengeText: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            The iGUIDE Approach
                          </label>
                          <textarea
                            rows={3}
                            value={editingSolution.approachText}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                approachText: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Institutional Outcome
                          </label>
                          <textarea
                            rows={3}
                            value={editingSolution.outcomeText}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                outcomeText: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                      </div>

                      {/* CTA, Related Solutions, Section Order & SEO Metadata */}
                      <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Enquiry CTA Heading
                          </label>
                          <input
                            type="text"
                            value={
                              editingSolution.ctaText ||
                              "Interested in Exploring This Solution?"
                            }
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                ctaText: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            Related Solution Slugs (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={(editingSolution.relatedSlugs || []).join(
                              ", "
                            )}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                relatedSlugs: e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean),
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-ink">
                            Reorderable Page Sections (comma-separated section keys)
                          </label>
                          <input
                            type="text"
                            value={(
                              editingSolution.sectionOrder || [
                                "overview",
                                "capabilities",
                                "benefits",
                                "how-it-works",
                                "applications",
                                "related-solutions",
                                "enquiry-cta",
                              ]
                            ).join(", ")}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                sectionOrder: e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(
                                    Boolean
                                  ) as typeof editingSolution.sectionOrder,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            SEO Meta Title
                          </label>
                          <input
                            type="text"
                            value={editingSolution.seoTitle}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                seoTitle: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-ink">
                            SEO Meta Description
                          </label>
                          <input
                            type="text"
                            value={editingSolution.seoDescription}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                seoDescription: e.target.value,
                              })
                            }
                            className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                          <input
                            type="checkbox"
                            checked={editingSolution.published}
                            onChange={(e) =>
                              setEditingSolution({
                                ...editingSolution,
                                published: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded text-iris"
                          />
                          <span>Published on Live Website</span>
                        </label>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => {
                              startTransition(async () => {
                                await removeSolutionAction(editingSolution.id);
                                const remaining = solutions.filter(
                                  (s) => s.id !== editingSolution.id
                                );
                                setSolutions(remaining);
                                if (remaining[0]) setEditingSolution(remaining[0]);
                                notify("Solution deleted.");
                              });
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>

                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => {
                              startTransition(async () => {
                                const res = await saveSolutionAction(
                                  editingSolution
                                );
                                if (res.success) {
                                  setSolutions((prev) => {
                                    const exists = prev.some(
                                      (s) => s.id === res.data.id
                                    );
                                    const next = exists
                                      ? prev.map((s) =>
                                          s.id === res.data.id ? res.data : s
                                        )
                                      : [...prev, res.data];
                                    return next.sort(
                                      (a, b) => a.displayOrder - b.displayOrder
                                    );
                                  });
                                  setEditingSolution(res.data);
                                  notify(
                                    `Solution "${res.data.title}" saved and published.`
                                  );
                                }
                              });
                            }}
                            className="inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white shadow-subtle hover:bg-iris-hover"
                          >
                            <Save className="h-3.5 w-3.5" />
                            <span>Save Solution</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: GALLERY MANAGER */}
            {activeTab === "gallery" && (
              <div className="rounded-feature border border-border bg-white p-6 shadow-subtle sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-ink">
                      Visual Gallery Manager
                    </h2>
                    <p className="mt-1 text-xs text-ink-secondary">
                      Add, categorise, or reorder visual studies in the public
                      gallery.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingGallery({
                        id: `gal-${Date.now()}`,
                        title: "New Ecosystem Study",
                        caption: "Architectural study description.",
                        category: "Platform Architecture",
                        imageUrl: "/visuals/gallery-learning-commons.svg",
                        altText: "iGUIDE visual study",
                        location: "iGUIDE Studio, Bengaluru",
                        aspect: "landscape",
                        featured: false,
                        published: true,
                        displayOrder: galleryItems.length + 1,
                        updatedAt: new Date().toISOString(),
                      })
                    }
                    className="inline-flex items-center gap-1.5 rounded-full bg-iris px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Gallery Item</span>
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {galleryItems.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setEditingGallery(g)}
                      className={cn(
                        "rounded-xl border px-3.5 py-2 text-xs font-semibold transition",
                        editingGallery?.id === g.id
                          ? "border-iris bg-iris-light text-iris"
                          : "border-border bg-cloud text-ink-secondary"
                      )}
                    >
                      {g.title}
                    </button>
                  ))}
                </div>

                {editingGallery && (
                  <div className="mt-6 space-y-4 border-t border-border pt-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Title
                        </label>
                        <input
                          type="text"
                          value={editingGallery.title}
                          onChange={(e) =>
                            setEditingGallery({
                              ...editingGallery,
                              title: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Category (Select or Enter Custom Category)
                        </label>
                        <input
                          type="text"
                          value={editingGallery.category}
                          onChange={(e) =>
                            setEditingGallery({
                              ...editingGallery,
                              category: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {[
                            "Events & Activities",
                            "Educational Initiatives",
                            "Technology & Innovation",
                            "Workshops & Training",
                            "General Gallery",
                          ].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() =>
                                setEditingGallery({
                                  ...editingGallery,
                                  category: cat,
                                })
                              }
                              className={cn(
                                "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition",
                                editingGallery.category === cat
                                  ? "border-iris bg-iris text-white"
                                  : "border-border bg-white text-ink-secondary hover:border-iris"
                              )}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Image URL or Direct Upload
                        </label>
                        <input
                          type="text"
                          value={editingGallery.imageUrl}
                          onChange={(e) =>
                            setEditingGallery({
                              ...editingGallery,
                              imageUrl: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                        <label className="mt-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-iris hover:border-iris">
                          <Upload className="h-3 w-3" />
                          <span>Upload Image File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const fd = new FormData();
                              fd.append("file", file);
                              fd.append("altText", editingGallery.title);
                              fd.append("category", "Gallery");
                              startTransition(async () => {
                                const res = await uploadMediaAssetAction(fd);
                                if (res.success && res.data) {
                                  setMediaAssets((prev) => [res.data, ...prev]);
                                  setEditingGallery({
                                    ...editingGallery,
                                    imageUrl: res.data.url,
                                  });
                                  notify("Gallery image uploaded and linked.");
                                }
                              });
                            }}
                          />
                        </label>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Location / Context
                        </label>
                        <input
                          type="text"
                          value={editingGallery.location}
                          onChange={(e) =>
                            setEditingGallery({
                              ...editingGallery,
                              location: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Aspect Ratio (Editorial Grid Layout)
                        </label>
                        <select
                          value={editingGallery.aspect}
                          onChange={(e) =>
                            setEditingGallery({
                              ...editingGallery,
                              aspect: e.target.value as
                                | "landscape"
                                | "portrait"
                                | "square",
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        >
                          <option value="landscape">Landscape (16:10)</option>
                          <option value="portrait">Portrait (4:5)</option>
                          <option value="square">Square (1:1)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={editingGallery.displayOrder}
                          onChange={(e) =>
                            setEditingGallery({
                              ...editingGallery,
                              displayOrder: Number(e.target.value) || 1,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-ink">
                          Caption (Optional)
                        </label>
                        <textarea
                          rows={2}
                          value={editingGallery.caption}
                          onChange={(e) =>
                            setEditingGallery({
                              ...editingGallery,
                              caption: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                      <div className="flex flex-wrap items-center gap-5">
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                          <input
                            type="checkbox"
                            checked={editingGallery.published}
                            onChange={(e) =>
                              setEditingGallery({
                                ...editingGallery,
                                published: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded text-iris"
                          />
                          <span>Published</span>
                        </label>
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-iris">
                          <input
                            type="checkbox"
                            checked={editingGallery.featured}
                            onChange={(e) =>
                              setEditingGallery({
                                ...editingGallery,
                                featured: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded text-iris"
                          />
                          <span>Mark as Featured</span>
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              await removeGalleryItemAction(editingGallery.id);
                              const next = galleryItems.filter(
                                (g) => g.id !== editingGallery.id
                              );
                              setGalleryItems(next);
                              if (next[0]) setEditingGallery(next[0]);
                              notify("Gallery item removed.");
                            });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              const res = await saveGalleryItemAction(
                                editingGallery
                              );
                              if (res.success) {
                                setGalleryItems((prev) => {
                                  const exists = prev.some(
                                    (g) => g.id === res.data.id
                                  );
                                  return exists
                                    ? prev.map((g) =>
                                        g.id === res.data.id ? res.data : g
                                      )
                                    : [...prev, res.data];
                                });
                                notify("Gallery study saved.");
                              }
                            });
                          }}
                          className="inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white"
                        >
                          <Save className="h-3.5 w-3.5" />
                          <span>Save Gallery Item</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: TESTIMONIALS & PERSPECTIVES MANAGER */}
            {activeTab === "testimonials" && (
              <div className="rounded-feature border border-border bg-white p-6 shadow-subtle sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-ink">
                      Testimonials & Stakeholder Perspectives
                    </h2>
                    <p className="mt-1 text-xs text-ink-secondary">
                      Manage stakeholder quotes, featured status on the
                      homepage, and verified institutional endorsement badges.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingTestimonial({
                        id: `test-${Date.now()}`,
                        quote:
                          "Enter authorised institutional quote or stakeholder perspective.",
                        authorName: "Name / Stakeholder Lens",
                        authorRole: "Academic Role",
                        institution: "Institution Name",
                        category: "Educators",
                        contextNote: "",
                        isVerified: false,
                        isFeatured: true,
                        published: true,
                        displayOrder: testimonials.length + 1,
                        updatedAt: new Date().toISOString(),
                      })
                    }
                    className="inline-flex items-center gap-1.5 rounded-full bg-iris px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {testimonials.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEditingTestimonial(t)}
                      className={cn(
                        "rounded-xl border px-3.5 py-2 text-xs font-semibold transition",
                        editingTestimonial?.id === t.id
                          ? "border-iris bg-iris-light text-iris"
                          : "border-border bg-cloud text-ink-secondary"
                      )}
                    >
                      {t.authorName}
                    </button>
                  ))}
                </div>

                {editingTestimonial && (
                  <div className="mt-6 space-y-4 border-t border-border pt-6">
                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Quote Text
                      </label>
                      <textarea
                        rows={3}
                        value={editingTestimonial.quote}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            quote: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Author / Perspective Name
                        </label>
                        <input
                          type="text"
                          value={editingTestimonial.authorName}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              authorName: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Role / Designation
                        </label>
                        <input
                          type="text"
                          value={editingTestimonial.authorRole}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              authorRole: e.target.value,
                            })
                          }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Institution / Context
                        </label>
                        <input
                          type="text"
                          value={editingTestimonial.institution}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              institution: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Audience Category (Optional)
                        </label>
                        <input
                          type="text"
                          value={editingTestimonial.category}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              category: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {[
                            "Learners",
                            "Educators",
                            "Institutions",
                            "Partners",
                          ].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() =>
                                setEditingTestimonial({
                                  ...editingTestimonial,
                                  category: cat,
                                })
                              }
                              className={cn(
                                "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition",
                                editingTestimonial.category === cat
                                  ? "border-iris bg-iris text-white"
                                  : "border-border bg-white text-ink-secondary hover:border-iris"
                              )}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Reviewer Photograph URL (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="/uploads/... or leave blank for initials"
                          value={editingTestimonial.avatarUrl || ""}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              avatarUrl: e.target.value || undefined,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                        <label className="mt-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-iris hover:border-iris">
                          <Upload className="h-3 w-3" />
                          <span>Upload Reviewer Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const fd = new FormData();
                              fd.append("file", file);
                              fd.append("altText", editingTestimonial.authorName);
                              fd.append("category", "Testimonials");
                              startTransition(async () => {
                                const res = await uploadMediaAssetAction(fd);
                                if (res.success && res.data) {
                                  setMediaAssets((prev) => [res.data, ...prev]);
                                  setEditingTestimonial({
                                    ...editingTestimonial,
                                    avatarUrl: res.data.url,
                                  });
                                  notify("Reviewer photo uploaded.");
                                }
                              });
                            }}
                          />
                        </label>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Optional Star Rating
                        </label>
                        <select
                          value={editingTestimonial.rating ?? ""}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              rating: e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        >
                          <option value="">No Rating Displayed</option>
                          <option value="5">★★★★★ (5 Stars)</option>
                          <option value="4">★★★★☆ (4 Stars)</option>
                          <option value="3">★★★☆☆ (3 Stars)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={editingTestimonial.displayOrder}
                          onChange={(e) =>
                            setEditingTestimonial({
                              ...editingTestimonial,
                              displayOrder: Number(e.target.value) || 1,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                      <div className="flex flex-wrap items-center gap-5">
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                          <input
                            type="checkbox"
                            checked={editingTestimonial.published}
                            onChange={(e) =>
                              setEditingTestimonial({
                                ...editingTestimonial,
                                published: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded text-iris"
                          />
                          <span>Published</span>
                        </label>
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                          <input
                            type="checkbox"
                            checked={editingTestimonial.isFeatured}
                            onChange={(e) =>
                              setEditingTestimonial({
                                ...editingTestimonial,
                                isFeatured: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded text-iris"
                          />
                          <span>Featured on Homepage</span>
                        </label>
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-success">
                          <input
                            type="checkbox"
                            checked={editingTestimonial.isVerified}
                            onChange={(e) =>
                              setEditingTestimonial({
                                ...editingTestimonial,
                                isVerified: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded text-emerald-success"
                          />
                          <span>Authorised / Verified Institutional Quote</span>
                        </label>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              await removeTestimonialAction(
                                editingTestimonial.id
                              );
                              const next = testimonials.filter(
                                (t) => t.id !== editingTestimonial.id
                              );
                              setTestimonials(next);
                              if (next[0]) setEditingTestimonial(next[0]);
                              notify("Testimonial deleted.");
                            });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              const res = await saveTestimonialAction(
                                editingTestimonial
                              );
                              if (res.success) {
                                setTestimonials((prev) => {
                                  const exists = prev.some(
                                    (t) => t.id === res.data.id
                                  );
                                  return exists
                                    ? prev.map((t) =>
                                        t.id === res.data.id ? res.data : t
                                      )
                                    : [...prev, res.data];
                                });
                                notify("Testimonial saved.");
                              }
                            });
                          }}
                          className="inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white"
                        >
                          <Save className="h-3.5 w-3.5" />
                          <span>Save Testimonial</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: BLOGS & MONOGRAPHS MANAGER */}
            {activeTab === "blogs" && (
              <div className="rounded-feature border border-border bg-white p-6 shadow-subtle sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-ink">
                      Blog Articles & Research Monographs
                    </h2>
                    <p className="mt-1 text-xs text-ink-secondary">
                      Author, edit, categorise, and publish articles with full
                      SEO metadata.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingBlog({
                        id: `blog-${Date.now()}`,
                        slug: `new-iguide-article-${blogPosts.length + 1}`,
                        title: "New Pedagogical Research Monograph",
                        excerpt: "Article summary for listing cards and SEO.",
                        content:
                          "## Section Heading\n\nWrite your structured article content here.",
                        category: "Adaptive Pedagogy",
                        readTimeMinutes: 5,
                        authorName: "iGUIDE Editorial & Research Desk",
                        authorRole: "Pedagogical Systems Architecture",
                        coverImage: "/visuals/blog-adaptive-pedagogy.svg",
                        tags: ["Adaptive Learning", "AI in Education"],
                        featured: false,
                        published: true,
                        publishedAt: new Date().toISOString(),
                        seoTitle: "New Pedagogical Monograph | iGUIDE Blog",
                        seoDescription: "Article summary for search engines.",
                        updatedAt: new Date().toISOString(),
                      })
                    }
                    className="inline-flex items-center gap-1.5 rounded-full bg-iris px-4 py-2 text-xs font-semibold text-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>New Blog Article</span>
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {blogPosts.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setEditingBlog(b)}
                      className={cn(
                        "rounded-xl border px-3.5 py-2 text-xs font-semibold transition",
                        editingBlog?.id === b.id
                          ? "border-iris bg-iris-light text-iris"
                          : "border-border bg-cloud text-ink-secondary"
                      )}
                    >
                      {b.title.slice(0, 36)}…
                    </button>
                  ))}
                </div>

                {editingBlog && (
                  <div className="mt-6 space-y-4 border-t border-border pt-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Article Title
                        </label>
                        <input
                          type="text"
                          value={editingBlog.title}
                          onChange={(e) =>
                            setEditingBlog({
                              ...editingBlog,
                              title: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={editingBlog.slug}
                          onChange={(e) =>
                            setEditingBlog({
                              ...editingBlog,
                              slug: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Category (Select or Create Custom Category)
                        </label>
                        <input
                          type="text"
                          value={editingBlog.category}
                          onChange={(e) =>
                            setEditingBlog({
                              ...editingBlog,
                              category: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {[
                            "Artificial Intelligence",
                            "Education Technology",
                            "Personalised Learning",
                            "Learning Innovation",
                            "Industry Insights",
                            "Company Updates",
                          ].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() =>
                                setEditingBlog({
                                  ...editingBlog,
                                  category: cat,
                                })
                              }
                              className={cn(
                                "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition",
                                editingBlog.category === cat
                                  ? "border-iris bg-iris text-white"
                                  : "border-border bg-white text-ink-secondary hover:border-iris"
                              )}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Featured Image URL or Upload
                        </label>
                        <input
                          type="text"
                          value={editingBlog.coverImage}
                          onChange={(e) =>
                            setEditingBlog({
                              ...editingBlog,
                              coverImage: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                        <label className="mt-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-iris hover:border-iris">
                          <Upload className="h-3 w-3" />
                          <span>Upload Featured Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const fd = new FormData();
                              fd.append("file", file);
                              fd.append("altText", editingBlog.title);
                              fd.append("category", "Blog");
                              startTransition(async () => {
                                const res = await uploadMediaAssetAction(fd);
                                if (res.success && res.data) {
                                  setMediaAssets((prev) => [res.data, ...prev]);
                                  setEditingBlog({
                                    ...editingBlog,
                                    coverImage: res.data.url,
                                  });
                                  notify("Featured image uploaded and linked.");
                                }
                              });
                            }}
                          />
                        </label>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Publication Date
                        </label>
                        <input
                          type="date"
                          value={
                            editingBlog.publishedAt
                              ? editingBlog.publishedAt.slice(0, 10)
                              : new Date().toISOString().slice(0, 10)
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                              setEditingBlog({
                                ...editingBlog,
                                publishedAt: new Date(
                                  `${val}T09:00:00.000Z`
                                ).toISOString(),
                              });
                            }
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          Read Time (Minutes)
                        </label>
                        <input
                          type="number"
                          value={editingBlog.readTimeMinutes}
                          onChange={(e) =>
                            setEditingBlog({
                              ...editingBlog,
                              readTimeMinutes: Number(e.target.value) || 5,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink">
                        Excerpt
                      </label>
                      <textarea
                        rows={2}
                        value={editingBlog.excerpt}
                        onChange={(e) =>
                          setEditingBlog({
                            ...editingBlog,
                            excerpt: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="block text-xs font-semibold text-ink">
                          Rich Editorial Content
                        </label>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {[
                            {
                              label: "+ H2 Heading",
                              snippet: "\n\n## Section Heading\n\n",
                            },
                            {
                              label: "+ H3 Subheading",
                              snippet: "\n\n### Subsection Heading\n\n",
                            },
                            {
                              label: "+ Bold",
                              snippet: " **highlighted text** ",
                            },
                            {
                              label: "+ Blockquote",
                              snippet:
                                "\n\n> Thoughtful editorial insight or guiding principle.\n> — iGUIDE Editorial Desk\n\n",
                            },
                            {
                              label: "+ Bullet List",
                              snippet:
                                "\n\n- **Key Point:** Description here.\n- **Key Point:** Description here.\n",
                            },
                            {
                              label: "+ Link",
                              snippet:
                                " [Personalised Learning](/solutions/personalised-learning) ",
                            },
                            {
                              label: "+ Image",
                              snippet:
                                '\n\n![Editorial illustration](/visuals/blog-adaptive-pedagogy.svg "Conceptual learning pathway diagram")\n\n',
                            },
                            {
                              label: "+ Table",
                              snippet:
                                "\n\n| Dimension | Traditional Approach | iGUIDE Approach |\n| :--- | :--- | :--- |\n| Pacing | Fixed linear schedule | Adaptive to individual readiness |\n\n",
                            },
                          ].map((tool) => (
                            <button
                              key={tool.label}
                              type="button"
                              onClick={() =>
                                setEditingBlog({
                                  ...editingBlog,
                                  content: `${editingBlog.content}${tool.snippet}`,
                                })
                              }
                              className="rounded-lg border border-border bg-white px-2.5 py-1 text-[10px] font-semibold text-ink-secondary hover:border-iris hover:text-iris"
                            >
                              {tool.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea
                        rows={9}
                        value={editingBlog.content}
                        onChange={(e) =>
                          setEditingBlog({
                            ...editingBlog,
                            content: e.target.value,
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-cloud px-3 py-2 font-mono text-xs"
                      />
                    </div>

                    {/* SEO Configuration */}
                    <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          SEO Meta Title
                        </label>
                        <input
                          type="text"
                          value={editingBlog.seoTitle}
                          onChange={(e) =>
                            setEditingBlog({
                              ...editingBlog,
                              seoTitle: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink">
                          SEO Meta Description
                        </label>
                        <input
                          type="text"
                          value={editingBlog.seoDescription}
                          onChange={(e) =>
                            setEditingBlog({
                              ...editingBlog,
                              seoDescription: e.target.value,
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                      <div className="flex flex-wrap items-center gap-5">
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-ink">
                          <input
                            type="checkbox"
                            checked={editingBlog.published}
                            onChange={(e) =>
                              setEditingBlog({
                                ...editingBlog,
                                published: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded text-iris"
                          />
                          <span>Published on Public Website</span>
                        </label>
                        <label className="inline-flex items-center gap-2 text-xs font-semibold text-iris">
                          <input
                            type="checkbox"
                            checked={editingBlog.featured}
                            onChange={(e) =>
                              setEditingBlog({
                                ...editingBlog,
                                featured: e.target.checked,
                              })
                            }
                            className="h-4 w-4 rounded text-iris"
                          />
                          <span>Mark as Featured Article</span>
                        </label>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const draft = { ...editingBlog, published: false };
                            setEditingBlog(draft);
                            startTransition(async () => {
                              const res = await saveBlogPostAction(draft);
                              if (res.success) {
                                setBlogPosts((prev) => {
                                  const exists = prev.some(
                                    (b) => b.id === res.data.id
                                  );
                                  return exists
                                    ? prev.map((b) =>
                                        b.id === res.data.id ? res.data : b
                                      )
                                    : [res.data, ...prev];
                                });
                                setEditingBlog(res.data);
                                notify("Article saved as draft.");
                              }
                            });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-ink hover:border-iris"
                        >
                          <span>Save Draft</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              await removeBlogPostAction(editingBlog.id);
                              const next = blogPosts.filter(
                                (b) => b.id !== editingBlog.id
                              );
                              setBlogPosts(next);
                              if (next[0]) setEditingBlog(next[0]);
                              notify("Blog post deleted.");
                            });
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              const res = await saveBlogPostAction(editingBlog);
                              if (res.success) {
                                setBlogPosts((prev) => {
                                  const exists = prev.some(
                                    (b) => b.id === res.data.id
                                  );
                                  return exists
                                    ? prev.map((b) =>
                                        b.id === res.data.id ? res.data : b
                                      )
                                    : [res.data, ...prev];
                                });
                                setEditingBlog(res.data);
                                notify("Blog article saved and published.");
                              }
                            });
                          }}
                          className="inline-flex items-center gap-2 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white"
                        >
                          <Save className="h-3.5 w-3.5" />
                          <span>Save Blog Post</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6B: BLOG CATEGORIES MANAGER (/admin/blogs?tab=categories) */}
            {activeTab === "blog-categories" && (
              <div className="rounded-3xl border border-border bg-white p-6 shadow-subtle sm:p-8">
                <h2 className="font-heading text-xl font-bold text-ink">
                  Blog Categories Management
                </h2>
                <p className="mt-1 text-xs text-ink-secondary">
                  Add, organise, or remove categories shown on the public Insights & Blogs filter bar.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <input
                    type="text"
                    value={newBlogCategoryName}
                    onChange={(e) => setNewBlogCategoryName(e.target.value)}
                    placeholder="New category name (e.g., Higher Education)"
                    className="min-w-[240px] flex-1 rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs text-ink"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const trimmed = newBlogCategoryName.trim();
                      if (!trimmed || !blogPageRecord) return;
                      if (blogCategoriesList.includes(trimmed)) {
                        notify("Category already exists.");
                        return;
                      }
                      const updatedList = [...blogCategoriesList, trimmed];
                      const updatedPage: PageContentRecord = {
                        ...blogPageRecord,
                        sectionsJson: {
                          ...(blogPageRecord.sectionsJson || {}),
                          categories: updatedList,
                        },
                      };
                      setPageContents((prev) =>
                        prev.map((p) =>
                          p.pageSlug === "blog" ? updatedPage : p
                        )
                      );
                      setNewBlogCategoryName("");
                      startTransition(async () => {
                        await savePageContentAction(updatedPage);
                        notify(`Added blog category "${trimmed}".`);
                      });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-iris px-5 py-2.5 text-xs font-semibold text-white hover:bg-iris-hover"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Category</span>
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {blogCategoriesList.map((cat) => {
                    const postCount = blogPosts.filter(
                      (b) => b.category === cat
                    ).length;
                    return (
                      <div
                        key={cat}
                        className="flex items-center justify-between rounded-2xl border border-border bg-cloud/70 px-4 py-3"
                      >
                        <div>
                          <p className="text-xs font-bold text-ink">{cat}</p>
                          <p className="text-[11px] text-ink-muted">
                            {postCount} {postCount === 1 ? "article" : "articles"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (!blogPageRecord) return;
                            const updatedList = blogCategoriesList.filter(
                              (c) => c !== cat
                            );
                            const updatedPage: PageContentRecord = {
                              ...blogPageRecord,
                              sectionsJson: {
                                ...(blogPageRecord.sectionsJson || {}),
                                categories: updatedList,
                              },
                            };
                            setPageContents((prev) =>
                              prev.map((p) =>
                                p.pageSlug === "blog" ? updatedPage : p
                              )
                            );
                            startTransition(async () => {
                              await savePageContentAction(updatedPage);
                              notify(`Removed category "${cat}".`);
                            });
                          }}
                          className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-100"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 7: INSTITUTIONAL ENQUIRIES, SEARCH, DRAWER & CSV/EXCEL EXPORT (/admin/enquiries) */}
            {activeTab === "enquiries" && (
              <div className="rounded-3xl border border-border bg-white p-6 shadow-subtle sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-ink">
                      Enquiries Management & Export
                    </h2>
                    <p className="mt-1 text-xs text-ink-secondary">
                      Search, filter by status or date, add internal notes, and export formula-safe CSV or Excel reports.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`/api/admin/enquiries/export?format=csv&status=${encodeURIComponent(enquiryFilter)}`}
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-iris"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export CSV</span>
                    </a>
                    <a
                      href={`/api/admin/enquiries/export?format=excel&status=${encodeURIComponent(enquiryFilter)}`}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-cloud px-4 py-2.5 text-xs font-semibold text-ink transition hover:border-iris hover:text-iris"
                    >
                      <Download className="h-3.5 w-3.5 text-iris" />
                      <span>Export Excel (.xls)</span>
                    </a>
                  </div>
                </div>

                {/* Search + Status + Date Filters */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-12">
                  <div className="relative sm:col-span-6">
                    <Search
                      className="pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                      placeholder="Search by name, email, organisation, solution, or message..."
                      className="w-full rounded-xl border border-border bg-cloud py-2.5 pr-3 pl-9 text-xs text-ink"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <select
                      value={enquiryFilter}
                      onChange={(e) => setEnquiryFilter(e.target.value)}
                      aria-label="Filter enquiries by status"
                      className="w-full rounded-xl border border-border bg-cloud px-3 py-2.5 text-xs font-semibold text-ink"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="NEW">New</option>
                      <option value="IN_REVIEW">Contacted (In Review)</option>
                      <option value="RESPONDED">Contacted (Responded)</option>
                      <option value="ARCHIVED">Closed</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <select
                      value={enquiryDateFilter}
                      onChange={(e) => setEnquiryDateFilter(e.target.value)}
                      aria-label="Filter enquiries by date range"
                      className="w-full rounded-xl border border-border bg-cloud px-3 py-2.5 text-xs font-semibold text-ink"
                    >
                      <option value="ALL">All Dates</option>
                      <option value="7D">Last 7 Days</option>
                      <option value="30D">Last 30 Days</option>
                    </select>
                  </div>
                </div>

                {(() => {
                  const filteredEnquiries = enquiries.filter((e) => {
                    const matchesStatus =
                      enquiryFilter === "ALL" || e.status === enquiryFilter;
                    const q = enquirySearch.trim().toLowerCase();
                    const matchesSearch =
                      !q ||
                      e.fullName.toLowerCase().includes(q) ||
                      e.email.toLowerCase().includes(q) ||
                      e.institutionName.toLowerCase().includes(q) ||
                      e.solutionInterest.toLowerCase().includes(q) ||
                      e.message.toLowerCase().includes(q);
                    let matchesDate = true;
                    if (enquiryDateFilter !== "ALL") {
                      const days = enquiryDateFilter === "7D" ? 7 : 30;
                      const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
                      matchesDate = new Date(e.createdAt).getTime() >= cutoff;
                    }
                    return matchesStatus && matchesSearch && matchesDate;
                  });

                  const activeEnquiry =
                    filteredEnquiries.find((e) => e.id === selectedEnquiryId) ||
                    filteredEnquiries[0];

                  return (
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                      {/* Enquiries List */}
                      <div className="space-y-3 lg:col-span-6">
                        {filteredEnquiries.length === 0 ? (
                          <div className="rounded-2xl border border-border bg-cloud p-8 text-center text-xs text-ink-muted">
                            No enquiries match your current search or filter criteria.
                          </div>
                        ) : (
                          filteredEnquiries.map((enq) => (
                            <button
                              key={enq.id}
                              type="button"
                              onClick={() => setSelectedEnquiryId(enq.id)}
                              className={cn(
                                "w-full rounded-2xl border p-4 text-left transition",
                                activeEnquiry?.id === enq.id
                                  ? "border-iris bg-ice/60 shadow-subtle"
                                  : "border-border bg-cloud/60 hover:border-iris/40"
                              )}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="rounded-full bg-iris/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-iris">
                                  {enq.solutionInterest}
                                </span>
                                <span
                                  className={cn(
                                    "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                                    enq.status === "NEW"
                                      ? "bg-iris text-white"
                                      : enq.status === "ARCHIVED"
                                        ? "bg-slate-200 text-slate-700"
                                        : "bg-emerald-100 text-emerald-800"
                                  )}
                                >
                                  {enq.status === "NEW"
                                    ? "New"
                                    : enq.status === "ARCHIVED"
                                      ? "Closed"
                                      : "Contacted"}
                                </span>
                              </div>
                              <p className="mt-2 font-heading text-sm font-bold text-ink">
                                {enq.fullName}
                              </p>
                              <p className="text-xs text-ink-secondary">
                                {enq.institutionName} • {enq.email}
                              </p>
                              <p className="mt-1 line-clamp-2 text-[11px] text-ink-muted">
                                {enq.message}
                              </p>
                            </button>
                          ))
                        )}
                      </div>

                      {/* Enquiry Detail Drawer */}
                      <div className="lg:col-span-6">
                        {activeEnquiry && (
                          <div className="sticky top-24 rounded-2xl border border-border bg-cloud/70 p-6">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <span className="font-mono text-[10px] font-semibold text-iris uppercase">
                                  Enquiry Detail • {activeEnquiry.id}
                                </span>
                                <h3 className="mt-1 font-heading text-lg font-bold text-ink">
                                  {activeEnquiry.fullName}
                                </h3>
                                <p className="text-xs text-ink-secondary">
                                  {activeEnquiry.institutionName} ({activeEnquiry.roleType})
                                </p>
                              </div>
                              <button
                                type="button"
                                aria-label="Delete enquiry"
                                onClick={() => {
                                  startTransition(async () => {
                                    await removeEnquiryAction(activeEnquiry.id);
                                    setEnquiries((prev) =>
                                      prev.filter(
                                        (item) => item.id !== activeEnquiry.id
                                      )
                                    );
                                    notify("Enquiry deleted.");
                                  });
                                }}
                                className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="mt-4 space-y-1.5 rounded-xl border border-border bg-white p-4 text-xs">
                              <p>
                                <strong>Email:</strong> {activeEnquiry.email}
                              </p>
                              <p>
                                <strong>Phone:</strong> {activeEnquiry.phone}
                              </p>
                              <p>
                                <strong>Interested Solution:</strong>{" "}
                                {activeEnquiry.solutionInterest}
                              </p>
                              <p>
                                <strong>Submitted:</strong>{" "}
                                {formatDate(activeEnquiry.createdAt)}
                              </p>
                            </div>

                            <div className="mt-4">
                              <p className="text-xs font-bold text-ink">
                                Visitor Message
                              </p>
                              <p className="mt-1 rounded-xl border border-border bg-white p-3.5 text-xs leading-relaxed text-ink-secondary">
                                {activeEnquiry.message}
                              </p>
                            </div>

                            <div className="mt-4 space-y-3 border-t border-border pt-4">
                              <div>
                                <label className="block text-xs font-bold text-ink">
                                  Workflow Status
                                </label>
                                <select
                                  value={activeEnquiry.status}
                                  onChange={(e) => {
                                    const newStatus = e.target
                                      .value as EnquiryRecord["status"];
                                    startTransition(async () => {
                                      await updateEnquiryAction(
                                        activeEnquiry.id,
                                        newStatus,
                                        activeEnquiry.adminNotes
                                      );
                                      setEnquiries((prev) =>
                                        prev.map((item) =>
                                          item.id === activeEnquiry.id
                                            ? { ...item, status: newStatus }
                                            : item
                                        )
                                      );
                                      notify(`Enquiry status updated.`);
                                    });
                                  }}
                                  className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-ink"
                                >
                                  <option value="NEW">New</option>
                                  <option value="IN_REVIEW">
                                    Contacted (In Review)
                                  </option>
                                  <option value="RESPONDED">
                                    Contacted (Responded)
                                  </option>
                                  <option value="ARCHIVED">Closed</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-bold text-ink">
                                  Internal Administrator Notes
                                </label>
                                <textarea
                                  rows={3}
                                  value={activeEnquiry.adminNotes}
                                  onChange={(e) => {
                                    const notes = e.target.value;
                                    setEnquiries((prev) =>
                                      prev.map((item) =>
                                        item.id === activeEnquiry.id
                                          ? { ...item, adminNotes: notes }
                                          : item
                                      )
                                    );
                                  }}
                                  placeholder="Add internal follow-up notes..."
                                  className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2 text-xs text-ink"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  startTransition(async () => {
                                    await updateEnquiryAction(
                                      activeEnquiry.id,
                                      activeEnquiry.status,
                                      activeEnquiry.adminNotes
                                    );
                                    notify("Internal enquiry notes saved.");
                                  });
                                }}
                                className="inline-flex items-center gap-2 rounded-full bg-iris px-4 py-2 text-xs font-semibold text-white hover:bg-iris-hover"
                              >
                                <Save className="h-3.5 w-3.5" />
                                <span>Save Notes</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAB 8: SECURE MEDIA UPLOAD LIBRARY */}
            {activeTab === "media" && (
              <div className="rounded-feature border border-border bg-white p-6 shadow-subtle sm:p-8">
                <h2 className="font-heading text-xl font-bold text-ink">
                  Media Asset Upload Library
                </h2>
                <p className="mt-1 text-xs text-ink-secondary">
                  Upload SVG, PNG, JPG, or WEBP assets (up to 5 MB) for use in
                  Solutions, Gallery, Blogs, or Brand settings.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    startTransition(async () => {
                      const res = await uploadMediaAssetAction(formData);
                      if (res.success && res.data) {
                        setMediaAssets((prev) => [res.data!, ...prev]);
                        form.reset();
                        notify(`Uploaded ${res.data.fileName}`);
                      } else {
                        notify(res.error || "Upload failed");
                      }
                    });
                  }}
                  className="mt-5 grid grid-cols-1 gap-4 rounded-2xl border border-dashed border-iris/40 bg-ice/40 p-5 sm:grid-cols-3"
                >
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Image File (SVG/PNG/JPG/WEBP) *
                    </label>
                    <input
                      type="file"
                      name="file"
                      required
                      accept=".svg,.png,.jpg,.jpeg,.webp"
                      className="mt-1.5 w-full text-xs text-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Alt Text Description
                    </label>
                    <input
                      type="text"
                      name="altText"
                      placeholder="Descriptive alt text for accessibility"
                      className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-iris px-4 py-2.5 text-xs font-semibold text-white"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload Media Asset</span>
                    </button>
                  </div>
                </form>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {mediaAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex flex-col justify-between rounded-2xl border border-border bg-cloud p-4"
                    >
                      <div>
                        <p className="truncate font-heading text-xs font-bold text-ink">
                          {asset.originalName}
                        </p>
                        <p className="mt-0.5 truncate font-mono text-[11px] text-iris">
                          {asset.url}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(asset.url);
                            notify(`Copied ${asset.url} to clipboard`);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink-secondary hover:text-iris"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy Path</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            startTransition(async () => {
                              await removeMediaAssetAction(asset.id);
                              setMediaAssets((prev) =>
                                prev.filter((m) => m.id !== asset.id)
                              );
                              notify("Media asset entry deleted.");
                            });
                          }}
                          className="text-[11px] font-semibold text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: GLOBAL SITE SETTINGS, CONTACT, SOCIALS & SEO */}
            {activeTab === "settings" && (
              <div className="rounded-feature border border-border bg-white p-6 shadow-subtle sm:p-8">
                <div className="flex items-center gap-2 text-iris">
                  <Globe className="h-5 w-5" aria-hidden="true" />
                  <h2 className="font-heading text-xl font-bold text-ink">
                    Global Brand, Contact Details, Socials & Default SEO
                  </h2>
                </div>
                <p className="mt-1 text-xs text-ink-secondary">
                  Changes saved here immediately update the Sticky Header,
                  Global Footer, Contact Us page, and default OpenGraph / SEO
                  metadata.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={siteSettings.brandName}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          brandName: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Brand Tagline
                    </label>
                    <input
                      type="text"
                      value={siteSettings.tagline}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          tagline: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      Documented Vision Statement
                    </label>
                    <input
                      type="text"
                      value={siteSettings.visionStatement}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          visionStatement: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      Mission Statement
                    </label>
                    <textarea
                      rows={2}
                      value={siteSettings.missionStatement}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          missionStatement: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={siteSettings.primaryEmail}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          primaryEmail: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={siteSettings.primaryPhone}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          primaryPhone: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      Registered Office Address
                    </label>
                    <input
                      type="text"
                      value={siteSettings.address}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          address: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Authorised WhatsApp Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., +91 8247654106"
                      value={siteSettings.whatsappNumber}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          whatsappNumber: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-success">
                      <input
                        type="checkbox"
                        checked={siteSettings.whatsappVerified}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            whatsappVerified: e.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded text-emerald-success"
                      />
                      <span>
                        Enable Verified WhatsApp Conversation Button on Site
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Logo Asset Path
                    </label>
                    <input
                      type="text"
                      value={siteSettings.logoUrl}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          logoUrl: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Favicon Asset Path
                    </label>
                    <input
                      type="text"
                      value={siteSettings.faviconUrl}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          faviconUrl: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      LinkedIn Profile URL (Only shown when configured)
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/company/..."
                      value={siteSettings.socialLinks?.linkedin || ""}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          socialLinks: {
                            ...siteSettings.socialLinks,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      YouTube / X URL (Only shown when configured)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={siteSettings.socialLinks?.youtube || ""}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          socialLinks: {
                            ...siteSettings.socialLinks,
                            youtube: e.target.value,
                          },
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      Default SEO Title
                    </label>
                    <input
                      type="text"
                      value={siteSettings.defaultSeoTitle}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          defaultSeoTitle: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      Default SEO Description
                    </label>
                    <textarea
                      rows={2}
                      value={siteSettings.defaultSeoDescription}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          defaultSeoDescription: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Dark-Background Logo Variant
                    </label>
                    <input
                      type="text"
                      value={siteSettings.logoDarkUrl || siteSettings.logoUrl}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          logoDarkUrl: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Default Open Graph Image
                    </label>
                    <input
                      type="text"
                      value={
                        siteSettings.defaultOgImage ||
                        "/visuals/gallery-learning-commons.svg"
                      }
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          defaultOgImage: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Analytics Measurement ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="G-XXXXXXXXXX"
                      value={siteSettings.analyticsMeasurementId || ""}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          analyticsMeasurementId: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Copyright Text
                    </label>
                    <input
                      type="text"
                      value={siteSettings.copyrightText}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          copyrightText: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      Footer Description
                    </label>
                    <textarea
                      rows={2}
                      value={siteSettings.footerDescription}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          footerDescription: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await saveSiteSettingsAction(siteSettings);
                        notify(
                          "Global website settings, contact details, and SEO updated."
                        );
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3 text-xs font-semibold text-white shadow-subtle hover:bg-iris-hover"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Global Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 10: CONTACT DETAILS (/admin/contact) */}
            {activeTab === "contact" && (
              <div className="rounded-3xl border border-border bg-white p-6 shadow-subtle sm:p-8">
                <h2 className="font-heading text-xl font-bold text-ink">
                  Contact Details & Map Configuration
                </h2>
                <p className="mt-1 text-xs text-ink-secondary">
                  All public phone, email, address, Google Maps, and WhatsApp links read directly from these CMS values.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      Company Address
                    </label>
                    <input
                      type="text"
                      value={siteSettings.address}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          address: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={siteSettings.primaryPhone}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          primaryPhone: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={siteSettings.primaryEmail}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          primaryEmail: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      Google Maps URL
                    </label>
                    <input
                      type="url"
                      value={
                        siteSettings.googleMapsUrl ||
                        "https://www.google.com/maps/search/?api=1&query=Aspire+Co-works,+Koramangala,+Bengaluru,+Karnataka,+India"
                      }
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          googleMapsUrl: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink">
                      WhatsApp Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="+91 8247654106"
                      value={siteSettings.whatsappNumber}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          whatsappNumber: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-success">
                      <input
                        type="checkbox"
                        checked={siteSettings.whatsappVerified}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            whatsappVerified: e.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded text-emerald-success"
                      />
                      <span>Confirm WhatsApp Click-to-Chat Enabled</span>
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-ink">
                      WhatsApp Predefined Message
                    </label>
                    <input
                      type="text"
                      value={
                        siteSettings.whatsappDefaultMessage ||
                        "Hello iGUIDE Team, I would like to enquire about your intelligent educational solutions."
                      }
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          whatsappDefaultMessage: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-border bg-cloud px-3.5 py-2.5 text-xs"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await saveSiteSettingsAction(siteSettings);
                        notify("Contact details saved and published.");
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3 text-xs font-semibold text-white shadow-subtle hover:bg-iris-hover"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Contact Details</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 11: SOCIAL MEDIA MANAGEMENT (/admin/social) */}
            {activeTab === "social" && (
              <div className="rounded-3xl border border-border bg-white p-6 shadow-subtle sm:p-8">
                <h2 className="font-heading text-xl font-bold text-ink">
                  Social Media Management
                </h2>
                <p className="mt-1 text-xs text-ink-secondary">
                  Configure and enable official social channels. Only enabled platforms with valid URLs are displayed on the public website.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    { key: "linkedin" as const, label: "LinkedIn" },
                    { key: "x" as const, label: "X (Twitter)" },
                    { key: "youtube" as const, label: "YouTube" },
                    { key: "instagram" as const, label: "Instagram" },
                  ].map((platform) => {
                    const currentVal =
                      siteSettings.socialLinks?.[platform.key] || "";
                    return (
                      <div
                        key={platform.key}
                        className="flex flex-col gap-3 rounded-2xl border border-border bg-cloud/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-[140px]">
                          <p className="text-xs font-bold text-ink">
                            {platform.label}
                          </p>
                          <p className="text-[11px] text-ink-muted">
                            {currentVal ? "Configured" : "Not configured (hidden)"}
                          </p>
                        </div>
                        <input
                          type="url"
                          placeholder={`https://${platform.key === "x" ? "x.com" : `${platform.key}.com`}/...`}
                          value={currentVal}
                          onChange={(e) =>
                            setSiteSettings({
                              ...siteSettings,
                              socialLinks: {
                                ...siteSettings.socialLinks,
                                [platform.key]: e.target.value,
                              },
                            })
                          }
                          className="flex-1 rounded-xl border border-border bg-white px-3.5 py-2 text-xs text-ink"
                        />
                        {currentVal && (
                          <button
                            type="button"
                            onClick={() =>
                              setSiteSettings({
                                ...siteSettings,
                                socialLinks: {
                                  ...siteSettings.socialLinks,
                                  [platform.key]: "",
                                },
                              })
                            }
                            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
                          >
                            Disable
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      startTransition(async () => {
                        await saveSiteSettingsAction(siteSettings);
                        notify("Social media links updated.");
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3 text-xs font-semibold text-white shadow-subtle hover:bg-iris-hover"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Social Links</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 12: ADMINISTRATOR USERS & AUDIT LOGS (/admin/users) */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-white p-6 shadow-subtle sm:p-8">
                  <h2 className="font-heading text-xl font-bold text-ink">
                    Administrator Accounts & Role Access
                  </h2>
                  <p className="mt-1 text-xs text-ink-secondary">
                    Manage authorised administrators, assign Super Admin / Admin / Editor roles, reset passwords, and disable accounts.
                  </p>

                  {/* Add / Invite Administrator Form */}
                  <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-border bg-cloud/60 p-5 sm:grid-cols-2 lg:grid-cols-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newAdminForm.name}
                      onChange={(e) =>
                        setNewAdminForm({
                          ...newAdminForm,
                          name: e.target.value,
                        })
                      }
                      className="rounded-xl border border-border bg-white px-3 py-2 text-xs"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={newAdminForm.email}
                      onChange={(e) =>
                        setNewAdminForm({
                          ...newAdminForm,
                          email: e.target.value,
                        })
                      }
                      className="rounded-xl border border-border bg-white px-3 py-2 text-xs"
                    />
                    <input
                      type="password"
                      placeholder="Initial Password (min 8 chars)"
                      value={newAdminForm.password}
                      onChange={(e) =>
                        setNewAdminForm({
                          ...newAdminForm,
                          password: e.target.value,
                        })
                      }
                      className="rounded-xl border border-border bg-white px-3 py-2 text-xs"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newAdminForm.role}
                        onChange={(e) =>
                          setNewAdminForm({
                            ...newAdminForm,
                            role: e.target.value as AdminUserRecord["role"],
                          })
                        }
                        className="flex-1 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      </select>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => {
                          startTransition(async () => {
                            const res = await saveAdminUserAction(newAdminForm);
                            if (!res.success || !res.data) {
                              notify(
                                res.error || "Unable to create administrator."
                              );
                              return;
                            }
                            setAdminUsers((prev) => {
                              const exists = prev.some(
                                (u) => u.id === res.data!.id
                              );
                              return exists
                                ? prev.map((u) =>
                                    u.id === res.data!.id ? res.data! : u
                                  )
                                : [...prev, res.data!];
                            });
                            setNewAdminForm({
                              name: "",
                              email: "",
                              password: "",
                              role: "EDITOR",
                              enabled: true,
                            });
                            notify("Administrator account saved.");
                          });
                        }}
                        className="rounded-xl bg-iris px-4 py-2 text-xs font-semibold text-white hover:bg-iris-hover"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Existing Admins Table */}
                  <div className="mt-6 space-y-3">
                    {adminUsers.map((adm) => (
                      <div
                        key={adm.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-cloud/60 p-4 text-xs"
                      >
                        <div>
                          <p className="font-bold text-ink">{adm.name}</p>
                          <p className="text-ink-secondary">{adm.email}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-iris/10 px-3 py-1 font-mono text-[10px] font-bold text-iris">
                            {adm.role}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-3 py-1 font-mono text-[10px] font-bold",
                              adm.enabled
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-200 text-slate-600"
                            )}
                          >
                            {adm.enabled ? "Active" : "Disabled"}
                          </span>
                          {adm.id !== "admin-primary" && (
                            <button
                              type="button"
                              onClick={() => {
                                startTransition(async () => {
                                  const res = await removeAdminUserAction(
                                    adm.id
                                  );
                                  if (res.success) {
                                    setAdminUsers((prev) =>
                                      prev.filter((u) => u.id !== adm.id)
                                    );
                                    notify("Administrator removed.");
                                  }
                                });
                              }}
                              className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Audit Logs */}
                <div className="rounded-3xl border border-border bg-white p-6 shadow-subtle sm:p-8">
                  <h3 className="font-heading text-base font-bold text-ink">
                    Security & Administrative Audit Log
                  </h3>
                  <div className="mt-4 space-y-2">
                    {auditLogs.slice(0, 12).map((log) => (
                      <div
                        key={log.id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-cloud/50 px-4 py-2.5 text-xs"
                      >
                        <div>
                          <span className="font-mono text-[10px] font-bold text-iris">
                            [{log.action}]
                          </span>{" "}
                          <span className="font-medium text-ink">
                            {log.summary}
                          </span>
                        </div>
                        <span className="text-[11px] text-ink-muted">
                          {log.actorEmail} • {formatDate(log.createdAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
