import fs from "fs/promises";
import net from "net";
import path from "path";
import { prisma } from "./prisma";
import {
  AdminUserRecord,
  AuditLogRecord,
  BlogPostRecord,
  CmsStoreData,
  EnquiryRecord,
  GalleryItemRecord,
  HeroBannerRecord,
  INITIAL_CMS_DATA,
  MediaAssetRecord,
  PageContentRecord,
  SiteSettingsRecord,
  SolutionRecord,
  TestimonialRecord,
} from "./seed-data";

const STORE_FILE_PATH = path.join(process.cwd(), "data", "cms-store.json");

let cachedPostgresAvailable: boolean | null = null;
let lastPostgresCheckTime = 0;

function checkTcpPort(host: string, port: number, timeoutMs = 350): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let settled = false;
    const finish = (ok: boolean) => {
      if (!settled) {
        settled = true;
        socket.destroy();
        resolve(ok);
      }
    };
    socket.setTimeout(timeoutMs);
    socket.once("connect", () => finish(true));
    socket.once("timeout", () => finish(false));
    socket.once("error", () => finish(false));
    socket.connect(port, host);
  });
}

export async function checkPostgresConnection(): Promise<boolean> {
  const now = Date.now();
  if (cachedPostgresAvailable !== null && now - lastPostgresCheckTime < 15000) {
    return cachedPostgresAvailable;
  }
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    cachedPostgresAvailable = false;
    lastPostgresCheckTime = now;
    return false;
  }
  try {
    const parsedUrl = new URL(dbUrl);
    const host = parsedUrl.hostname || "localhost";
    const port = Number(parsedUrl.port) || 5432;
    const reachable = await checkTcpPort(host, port);
    if (!reachable) {
      cachedPostgresAvailable = false;
      lastPostgresCheckTime = now;
      return false;
    }
    await prisma.$queryRaw`SELECT 1`;
    cachedPostgresAvailable = true;
  } catch {
    cachedPostgresAvailable = false;
  }
  lastPostgresCheckTime = now;
  return cachedPostgresAvailable;
}

export async function readLocalStore(): Promise<CmsStoreData> {
  try {
    const raw = await fs.readFile(STORE_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<CmsStoreData>;
    return {
      siteSettings: parsed.siteSettings ?? INITIAL_CMS_DATA.siteSettings,
      heroBanners: parsed.heroBanners ?? INITIAL_CMS_DATA.heroBanners,
      pageContents: parsed.pageContents ?? INITIAL_CMS_DATA.pageContents,
      solutions: parsed.solutions ?? INITIAL_CMS_DATA.solutions,
      galleryItems: parsed.galleryItems ?? INITIAL_CMS_DATA.galleryItems,
      testimonials: parsed.testimonials ?? INITIAL_CMS_DATA.testimonials,
      blogPosts: parsed.blogPosts ?? INITIAL_CMS_DATA.blogPosts,
      enquiries: parsed.enquiries ?? INITIAL_CMS_DATA.enquiries,
      mediaAssets: parsed.mediaAssets ?? INITIAL_CMS_DATA.mediaAssets,
      adminUsers: parsed.adminUsers ?? INITIAL_CMS_DATA.adminUsers ?? [],
      auditLogs: parsed.auditLogs ?? INITIAL_CMS_DATA.auditLogs ?? [],
    };
  } catch {
    await writeLocalStore(INITIAL_CMS_DATA);
    return INITIAL_CMS_DATA;
  }
}

export async function writeLocalStore(data: CmsStoreData): Promise<void> {
  const dir = path.dirname(STORE_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(STORE_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getSystemStatus() {
  const postgresConnected = await checkPostgresConnection();
  const resendConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0
  );
  return {
    postgresConnected,
    storageEngine: postgresConnected
      ? "PostgreSQL (Prisma ORM)"
      : "Server Persistent Store (Awaiting PostgreSQL DATABASE_URL connection)",
    resendConfigured,
    emailMode: resendConfigured
      ? "Resend Live Transactional Email"
      : "Server Audit Log (Set RESEND_API_KEY in .env to enable live email dispatch)",
  };
}

// --- Site Settings ---
export async function getSiteSettings(): Promise<SiteSettingsRecord> {
  if (await checkPostgresConnection()) {
    try {
      const row = await prisma.siteSettings.findUnique({
        where: { id: "global" },
      });
      if (row) {
        return {
          ...row,
          socialLinks: (row.socialLinks as SiteSettingsRecord["socialLinks"]) ?? {},
          updatedAt: row.updatedAt.toISOString(),
        };
      }
    } catch {
      // Fallback to local store
    }
  }
  const store = await readLocalStore();
  return store.siteSettings;
}

export async function updateSiteSettings(
  input: Partial<SiteSettingsRecord>
): Promise<SiteSettingsRecord> {
  const store = await readLocalStore();
  const updated: SiteSettingsRecord = {
    ...store.siteSettings,
    ...input,
    id: "global",
    updatedAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.siteSettings.upsert({
        where: { id: "global" },
        update: {
          brandName: updated.brandName,
          tagline: updated.tagline,
          visionStatement: updated.visionStatement,
          missionStatement: updated.missionStatement,
          logoUrl: updated.logoUrl,
          faviconUrl: updated.faviconUrl,
          primaryEmail: updated.primaryEmail,
          primaryPhone: updated.primaryPhone,
          whatsappNumber: updated.whatsappNumber,
          whatsappVerified: updated.whatsappVerified,
          address: updated.address,
          officeHours: updated.officeHours,
          footerDescription: updated.footerDescription,
          copyrightText: updated.copyrightText,
          socialLinks: updated.socialLinks as object,
          defaultSeoTitle: updated.defaultSeoTitle,
          defaultSeoDescription: updated.defaultSeoDescription,
        },
        create: {
          id: "global",
          brandName: updated.brandName,
          tagline: updated.tagline,
          visionStatement: updated.visionStatement,
          missionStatement: updated.missionStatement,
          logoUrl: updated.logoUrl,
          faviconUrl: updated.faviconUrl,
          primaryEmail: updated.primaryEmail,
          primaryPhone: updated.primaryPhone,
          whatsappNumber: updated.whatsappNumber,
          whatsappVerified: updated.whatsappVerified,
          address: updated.address,
          officeHours: updated.officeHours,
          footerDescription: updated.footerDescription,
          copyrightText: updated.copyrightText,
          socialLinks: updated.socialLinks as object,
          defaultSeoTitle: updated.defaultSeoTitle,
          defaultSeoDescription: updated.defaultSeoDescription,
        },
      });
    } catch {
      // Continue to persist in local store as well
    }
  }

  store.siteSettings = updated;
  await writeLocalStore(store);
  return updated;
}

// --- Hero Banners ---
export async function getHeroBanners(pageSlug?: string): Promise<HeroBannerRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.heroBanner.findMany({
        where: pageSlug ? { pageSlug } : undefined,
        orderBy: { displayOrder: "asc" },
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          pageSlug: r.pageSlug,
          eyebrow: r.eyebrow,
          headline: r.headline,
          highlightedText: r.highlightedText ?? "",
          subheadline: r.subheadline,
          primaryCtaLabel: r.primaryCtaLabel,
          primaryCtaHref: r.primaryCtaHref,
          secondaryCtaLabel: r.secondaryCtaLabel ?? "",
          secondaryCtaHref: r.secondaryCtaHref ?? "",
          visualCaption: r.visualCaption ?? "",
          published: r.published,
          displayOrder: r.displayOrder,
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  const list = pageSlug
    ? store.heroBanners.filter((h) => h.pageSlug === pageSlug)
    : store.heroBanners;
  return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function upsertHeroBanner(
  banner: Omit<HeroBannerRecord, "updatedAt">
): Promise<HeroBannerRecord> {
  const store = await readLocalStore();
  const updated: HeroBannerRecord = {
    ...banner,
    updatedAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.heroBanner.upsert({
        where: { id: updated.id },
        update: {
          pageSlug: updated.pageSlug,
          eyebrow: updated.eyebrow,
          headline: updated.headline,
          highlightedText: updated.highlightedText,
          subheadline: updated.subheadline,
          primaryCtaLabel: updated.primaryCtaLabel,
          primaryCtaHref: updated.primaryCtaHref,
          secondaryCtaLabel: updated.secondaryCtaLabel,
          secondaryCtaHref: updated.secondaryCtaHref,
          visualCaption: updated.visualCaption,
          published: updated.published,
          displayOrder: updated.displayOrder,
        },
        create: {
          id: updated.id,
          pageSlug: updated.pageSlug,
          eyebrow: updated.eyebrow,
          headline: updated.headline,
          highlightedText: updated.highlightedText,
          subheadline: updated.subheadline,
          primaryCtaLabel: updated.primaryCtaLabel,
          primaryCtaHref: updated.primaryCtaHref,
          secondaryCtaLabel: updated.secondaryCtaLabel,
          secondaryCtaHref: updated.secondaryCtaHref,
          visualCaption: updated.visualCaption,
          published: updated.published,
          displayOrder: updated.displayOrder,
        },
      });
    } catch {
      // Continue
    }
  }

  const idx = store.heroBanners.findIndex((b) => b.id === updated.id);
  if (idx >= 0) {
    store.heroBanners[idx] = updated;
  } else {
    store.heroBanners.push(updated);
  }
  await writeLocalStore(store);
  return updated;
}

// --- Page Contents ---
export async function getPageContents(): Promise<PageContentRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.pageContent.findMany();
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          pageSlug: r.pageSlug,
          eyebrow: r.eyebrow,
          title: r.title,
          subtitle: r.subtitle,
          sectionsJson: (r.sectionsJson as Record<string, unknown>) ?? {},
          seoTitle: r.seoTitle,
          seoDescription: r.seoDescription,
          published: r.published,
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  return store.pageContents;
}

export async function getPageContentBySlug(
  pageSlug: string
): Promise<PageContentRecord | undefined> {
  const all = await getPageContents();
  return all.find((p) => p.pageSlug === pageSlug);
}

export async function upsertPageContent(
  input: Omit<PageContentRecord, "updatedAt">
): Promise<PageContentRecord> {
  const store = await readLocalStore();
  const updated: PageContentRecord = {
    ...input,
    updatedAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.pageContent.upsert({
        where: { pageSlug: updated.pageSlug },
        update: {
          eyebrow: updated.eyebrow,
          title: updated.title,
          subtitle: updated.subtitle,
          sectionsJson: updated.sectionsJson as object,
          seoTitle: updated.seoTitle,
          seoDescription: updated.seoDescription,
          published: updated.published,
        },
        create: {
          id: updated.id,
          pageSlug: updated.pageSlug,
          eyebrow: updated.eyebrow,
          title: updated.title,
          subtitle: updated.subtitle,
          sectionsJson: updated.sectionsJson as object,
          seoTitle: updated.seoTitle,
          seoDescription: updated.seoDescription,
          published: updated.published,
        },
      });
    } catch {
      // Continue
    }
  }

  const idx = store.pageContents.findIndex((p) => p.pageSlug === updated.pageSlug);
  if (idx >= 0) {
    store.pageContents[idx] = updated;
  } else {
    store.pageContents.push(updated);
  }
  await writeLocalStore(store);
  return updated;
}

// --- Solutions ---
export async function getSolutions(onlyPublished = false): Promise<SolutionRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.solution.findMany({
        where: onlyPublished ? { published: true } : undefined,
        orderBy: { displayOrder: "asc" },
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          shortTitle: r.shortTitle,
          subtitle: r.subtitle ?? undefined,
          tagline: r.tagline,
          category: r.category,
          summary: r.summary,
          heroDescription: r.heroDescription ?? undefined,
          description: r.description,
          overviewHeading: r.overviewHeading ?? undefined,
          overviewLead: r.overviewLead ?? undefined,
          overviewPillars:
            (r.overviewPillars as unknown as SolutionRecord["overviewPillars"]) ??
            undefined,
          challengeText: r.challengeText,
          approachText: r.approachText,
          outcomeText: r.outcomeText,
          iconName: r.iconName,
          heroImage: r.heroImage,
          mobileHeroImage: r.mobileHeroImage ?? undefined,
          accentColor: r.accentColor,
          keyCapabilities:
            (r.keyCapabilities as unknown as SolutionRecord["keyCapabilities"]) ?? [],
          benefits:
            (r.benefits as unknown as SolutionRecord["benefits"]) ?? undefined,
          useCases: (r.useCases as unknown as SolutionRecord["useCases"]) ?? [],
          architectureSteps:
            (r.architectureSteps as unknown as SolutionRecord["architectureSteps"]) ?? [],
          faqs: (r.faqs as unknown as SolutionRecord["faqs"]) ?? [],
          sectionOrder:
            (r.sectionOrder as unknown as SolutionRecord["sectionOrder"]) ??
            undefined,
          relatedSlugs:
            (r.relatedSlugs as unknown as SolutionRecord["relatedSlugs"]) ??
            undefined,
          ctaText: r.ctaText ?? undefined,
          displayOrder: r.displayOrder,
          featured: r.featured,
          published: r.published,
          seoTitle: r.seoTitle,
          seoDescription: r.seoDescription,
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  const filtered = onlyPublished
    ? store.solutions.filter((s) => s.published)
    : store.solutions;
  return [...filtered].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getSolutionBySlug(
  slug: string
): Promise<SolutionRecord | undefined> {
  const all = await getSolutions(false);
  return all.find((s) => s.slug === slug);
}

export async function upsertSolution(
  input: Omit<SolutionRecord, "updatedAt">
): Promise<SolutionRecord> {
  const store = await readLocalStore();
  const updated: SolutionRecord = {
    ...input,
    updatedAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.solution.upsert({
        where: { slug: updated.slug },
        update: {
          title: updated.title,
          shortTitle: updated.shortTitle,
          subtitle: updated.subtitle,
          tagline: updated.tagline,
          category: updated.category,
          summary: updated.summary,
          heroDescription: updated.heroDescription,
          description: updated.description,
          overviewHeading: updated.overviewHeading,
          overviewLead: updated.overviewLead,
          overviewPillars: (updated.overviewPillars ?? []) as unknown as object,
          challengeText: updated.challengeText,
          approachText: updated.approachText,
          outcomeText: updated.outcomeText,
          iconName: updated.iconName,
          heroImage: updated.heroImage,
          mobileHeroImage: updated.mobileHeroImage,
          accentColor: updated.accentColor,
          keyCapabilities: updated.keyCapabilities as unknown as object,
          benefits: (updated.benefits ?? []) as unknown as object,
          useCases: updated.useCases as unknown as object,
          architectureSteps: updated.architectureSteps as unknown as object,
          faqs: updated.faqs as unknown as object,
          sectionOrder: (updated.sectionOrder ?? []) as unknown as object,
          relatedSlugs: (updated.relatedSlugs ?? []) as unknown as object,
          ctaText: updated.ctaText,
          displayOrder: updated.displayOrder,
          featured: updated.featured,
          published: updated.published,
          seoTitle: updated.seoTitle,
          seoDescription: updated.seoDescription,
        },
        create: {
          id: updated.id,
          slug: updated.slug,
          title: updated.title,
          shortTitle: updated.shortTitle,
          subtitle: updated.subtitle,
          tagline: updated.tagline,
          category: updated.category,
          summary: updated.summary,
          heroDescription: updated.heroDescription,
          description: updated.description,
          overviewHeading: updated.overviewHeading,
          overviewLead: updated.overviewLead,
          overviewPillars: (updated.overviewPillars ?? []) as unknown as object,
          challengeText: updated.challengeText,
          approachText: updated.approachText,
          outcomeText: updated.outcomeText,
          iconName: updated.iconName,
          heroImage: updated.heroImage,
          mobileHeroImage: updated.mobileHeroImage,
          accentColor: updated.accentColor,
          keyCapabilities: updated.keyCapabilities as unknown as object,
          benefits: (updated.benefits ?? []) as unknown as object,
          useCases: updated.useCases as unknown as object,
          architectureSteps: updated.architectureSteps as unknown as object,
          faqs: updated.faqs as unknown as object,
          sectionOrder: (updated.sectionOrder ?? []) as unknown as object,
          relatedSlugs: (updated.relatedSlugs ?? []) as unknown as object,
          ctaText: updated.ctaText,
          displayOrder: updated.displayOrder,
          featured: updated.featured,
          published: updated.published,
          seoTitle: updated.seoTitle,
          seoDescription: updated.seoDescription,
        },
      });
    } catch {
      // Continue
    }
  }

  const idx = store.solutions.findIndex(
    (s) => s.id === updated.id || s.slug === updated.slug
  );
  if (idx >= 0) {
    store.solutions[idx] = updated;
  } else {
    store.solutions.push(updated);
  }
  await writeLocalStore(store);
  return updated;
}

export async function deleteSolution(id: string): Promise<void> {
  const store = await readLocalStore();
  if (await checkPostgresConnection()) {
    try {
      await prisma.solution.delete({ where: { id } });
    } catch {
      // Continue
    }
  }
  store.solutions = store.solutions.filter((s) => s.id !== id);
  await writeLocalStore(store);
}

// --- Gallery Items ---
export async function getGalleryItems(onlyPublished = false): Promise<GalleryItemRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.galleryItem.findMany({
        where: onlyPublished ? { published: true } : undefined,
        orderBy: { displayOrder: "asc" },
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          title: r.title,
          caption: r.caption,
          category: r.category,
          imageUrl: r.imageUrl,
          altText: r.altText,
          location: r.location ?? "",
          aspect: (r.aspect as GalleryItemRecord["aspect"]) ?? "landscape",
          featured: r.featured,
          published: r.published,
          displayOrder: r.displayOrder,
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  const list = onlyPublished
    ? store.galleryItems.filter((g) => g.published)
    : store.galleryItems;
  return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function upsertGalleryItem(
  input: Omit<GalleryItemRecord, "updatedAt">
): Promise<GalleryItemRecord> {
  const store = await readLocalStore();
  const updated: GalleryItemRecord = {
    ...input,
    updatedAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.galleryItem.upsert({
        where: { id: updated.id },
        update: {
          title: updated.title,
          caption: updated.caption,
          category: updated.category,
          imageUrl: updated.imageUrl,
          altText: updated.altText,
          location: updated.location,
          aspect: updated.aspect,
          featured: updated.featured,
          published: updated.published,
          displayOrder: updated.displayOrder,
        },
        create: {
          id: updated.id,
          title: updated.title,
          caption: updated.caption,
          category: updated.category,
          imageUrl: updated.imageUrl,
          altText: updated.altText,
          location: updated.location,
          aspect: updated.aspect,
          featured: updated.featured,
          published: updated.published,
          displayOrder: updated.displayOrder,
        },
      });
    } catch {
      // Continue
    }
  }

  const idx = store.galleryItems.findIndex((g) => g.id === updated.id);
  if (idx >= 0) {
    store.galleryItems[idx] = updated;
  } else {
    store.galleryItems.push(updated);
  }
  await writeLocalStore(store);
  return updated;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const store = await readLocalStore();
  if (await checkPostgresConnection()) {
    try {
      await prisma.galleryItem.delete({ where: { id } });
    } catch {
      // Continue
    }
  }
  store.galleryItems = store.galleryItems.filter((g) => g.id !== id);
  await writeLocalStore(store);
}

// --- Testimonials ---
export async function getTestimonials(onlyPublished = false): Promise<TestimonialRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.testimonial.findMany({
        where: onlyPublished ? { published: true } : undefined,
        orderBy: { displayOrder: "asc" },
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          quote: r.quote,
          authorName: r.authorName,
          authorRole: r.authorRole,
          institution: r.institution,
          category: r.category,
          avatarUrl: r.avatarUrl ?? undefined,
          contextNote: r.contextNote ?? "",
          isVerified: r.isVerified,
          isFeatured: r.isFeatured,
          published: r.published,
          displayOrder: r.displayOrder,
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  const list = onlyPublished
    ? store.testimonials.filter((t) => t.published)
    : store.testimonials;
  return [...list].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function upsertTestimonial(
  input: Omit<TestimonialRecord, "updatedAt">
): Promise<TestimonialRecord> {
  const store = await readLocalStore();
  const updated: TestimonialRecord = {
    ...input,
    updatedAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.testimonial.upsert({
        where: { id: updated.id },
        update: {
          quote: updated.quote,
          authorName: updated.authorName,
          authorRole: updated.authorRole,
          institution: updated.institution,
          category: updated.category,
          avatarUrl: updated.avatarUrl,
          contextNote: updated.contextNote,
          isVerified: updated.isVerified,
          isFeatured: updated.isFeatured,
          published: updated.published,
          displayOrder: updated.displayOrder,
        },
        create: {
          id: updated.id,
          quote: updated.quote,
          authorName: updated.authorName,
          authorRole: updated.authorRole,
          institution: updated.institution,
          category: updated.category,
          avatarUrl: updated.avatarUrl,
          contextNote: updated.contextNote,
          isVerified: updated.isVerified,
          isFeatured: updated.isFeatured,
          published: updated.published,
          displayOrder: updated.displayOrder,
        },
      });
    } catch {
      // Continue
    }
  }

  const idx = store.testimonials.findIndex((t) => t.id === updated.id);
  if (idx >= 0) {
    store.testimonials[idx] = updated;
  } else {
    store.testimonials.push(updated);
  }
  await writeLocalStore(store);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const store = await readLocalStore();
  if (await checkPostgresConnection()) {
    try {
      await prisma.testimonial.delete({ where: { id } });
    } catch {
      // Continue
    }
  }
  store.testimonials = store.testimonials.filter((t) => t.id !== id);
  await writeLocalStore(store);
}

// --- Blog Posts ---
export async function getBlogPosts(onlyPublished = false): Promise<BlogPostRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.blogPost.findMany({
        where: onlyPublished ? { published: true } : undefined,
        orderBy: { publishedAt: "desc" },
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt,
          content: r.content,
          category: r.category,
          readTimeMinutes: r.readTimeMinutes,
          authorName: r.authorName,
          authorRole: r.authorRole,
          coverImage: r.coverImage,
          tags: (r.tags as string[]) ?? [],
          featured: r.featured,
          published: r.published,
          publishedAt: r.publishedAt.toISOString(),
          seoTitle: r.seoTitle,
          seoDescription: r.seoDescription,
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  const list = onlyPublished
    ? store.blogPosts.filter((b) => b.published)
    : store.blogPosts;
  return [...list].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPostRecord | undefined> {
  const all = await getBlogPosts(false);
  return all.find((b) => b.slug === slug);
}

export async function upsertBlogPost(
  input: Omit<BlogPostRecord, "updatedAt">
): Promise<BlogPostRecord> {
  const store = await readLocalStore();
  const updated: BlogPostRecord = {
    ...input,
    updatedAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.blogPost.upsert({
        where: { slug: updated.slug },
        update: {
          title: updated.title,
          excerpt: updated.excerpt,
          content: updated.content,
          category: updated.category,
          readTimeMinutes: updated.readTimeMinutes,
          authorName: updated.authorName,
          authorRole: updated.authorRole,
          coverImage: updated.coverImage,
          tags: updated.tags,
          featured: updated.featured,
          published: updated.published,
          publishedAt: new Date(updated.publishedAt),
          seoTitle: updated.seoTitle,
          seoDescription: updated.seoDescription,
        },
        create: {
          id: updated.id,
          slug: updated.slug,
          title: updated.title,
          excerpt: updated.excerpt,
          content: updated.content,
          category: updated.category,
          readTimeMinutes: updated.readTimeMinutes,
          authorName: updated.authorName,
          authorRole: updated.authorRole,
          coverImage: updated.coverImage,
          tags: updated.tags,
          featured: updated.featured,
          published: updated.published,
          publishedAt: new Date(updated.publishedAt),
          seoTitle: updated.seoTitle,
          seoDescription: updated.seoDescription,
        },
      });
    } catch {
      // Continue
    }
  }

  const idx = store.blogPosts.findIndex(
    (b) => b.id === updated.id || b.slug === updated.slug
  );
  if (idx >= 0) {
    store.blogPosts[idx] = updated;
  } else {
    store.blogPosts.push(updated);
  }
  await writeLocalStore(store);
  return updated;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const store = await readLocalStore();
  if (await checkPostgresConnection()) {
    try {
      await prisma.blogPost.delete({ where: { id } });
    } catch {
      // Continue
    }
  }
  store.blogPosts = store.blogPosts.filter((b) => b.id !== id);
  await writeLocalStore(store);
}

// --- Enquiries ---
export async function getEnquiries(): Promise<EnquiryRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          fullName: r.fullName,
          email: r.email,
          phone: r.phone,
          institutionName: r.institutionName,
          roleType: r.roleType,
          solutionInterest: r.solutionInterest,
          subject: r.subject,
          message: r.message,
          consentAccepted: r.consentAccepted,
          status: r.status,
          adminNotes: r.adminNotes ?? "",
          notificationSent: r.notificationSent,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  return [...store.enquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createEnquiry(
  input: Omit<
    EnquiryRecord,
    "id" | "status" | "adminNotes" | "notificationSent" | "createdAt" | "updatedAt"
  > & { notificationSent?: boolean }
): Promise<EnquiryRecord> {
  const store = await readLocalStore();
  const now = new Date().toISOString();
  const record: EnquiryRecord = {
    id: `enq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    institutionName: input.institutionName,
    roleType: input.roleType,
    solutionInterest: input.solutionInterest,
    subject: input.subject,
    message: input.message,
    consentAccepted: input.consentAccepted,
    status: "NEW",
    adminNotes: "",
    notificationSent: input.notificationSent ?? false,
    createdAt: now,
    updatedAt: now,
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.enquiry.create({
        data: {
          id: record.id,
          fullName: record.fullName,
          email: record.email,
          phone: record.phone,
          institutionName: record.institutionName,
          roleType: record.roleType,
          solutionInterest: record.solutionInterest,
          subject: record.subject,
          message: record.message,
          consentAccepted: record.consentAccepted,
          status: "NEW",
          adminNotes: "",
          notificationSent: record.notificationSent,
        },
      });
    } catch {
      // Continue
    }
  }

  store.enquiries.unshift(record);
  await writeLocalStore(store);
  return record;
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryRecord["status"],
  adminNotes?: string,
  notificationSent?: boolean
): Promise<EnquiryRecord | null> {
  const store = await readLocalStore();
  const idx = store.enquiries.findIndex((e) => e.id === id);
  if (idx < 0) return null;

  const updated: EnquiryRecord = {
    ...store.enquiries[idx],
    status,
    adminNotes: adminNotes ?? store.enquiries[idx].adminNotes,
    notificationSent:
      notificationSent !== undefined
        ? notificationSent
        : store.enquiries[idx].notificationSent,
    updatedAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.enquiry.update({
        where: { id },
        data: {
          status,
          adminNotes: updated.adminNotes,
          notificationSent: updated.notificationSent,
        },
      });
    } catch {
      // Continue
    }
  }

  store.enquiries[idx] = updated;
  await writeLocalStore(store);
  return updated;
}

export async function deleteEnquiry(id: string): Promise<void> {
  const store = await readLocalStore();
  if (await checkPostgresConnection()) {
    try {
      await prisma.enquiry.delete({ where: { id } });
    } catch {
      // Continue
    }
  }
  store.enquiries = store.enquiries.filter((e) => e.id !== id);
  await writeLocalStore(store);
}

// --- Media Assets ---
export async function getMediaAssets(): Promise<MediaAssetRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.mediaAsset.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          fileName: r.fileName,
          originalName: r.originalName,
          mimeType: r.mimeType,
          sizeBytes: r.sizeBytes,
          url: r.url,
          altText: r.altText,
          category: r.category,
          createdAt: r.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  return store.mediaAssets;
}

export async function addMediaAsset(
  asset: Omit<MediaAssetRecord, "id" | "createdAt">
): Promise<MediaAssetRecord> {
  const store = await readLocalStore();
  const record: MediaAssetRecord = {
    ...asset,
    id: `media-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.mediaAsset.create({
        data: {
          id: record.id,
          fileName: record.fileName,
          originalName: record.originalName,
          mimeType: record.mimeType,
          sizeBytes: record.sizeBytes,
          url: record.url,
          altText: record.altText,
          category: record.category,
        },
      });
    } catch {
      // Continue
    }
  }

  store.mediaAssets.unshift(record);
  await writeLocalStore(store);
  return record;
}

export async function deleteMediaAsset(id: string): Promise<void> {
  const store = await readLocalStore();
  if (await checkPostgresConnection()) {
    try {
      await prisma.mediaAsset.delete({ where: { id } });
    } catch {
      // Continue
    }
  }
  store.mediaAssets = store.mediaAssets.filter((m) => m.id !== id);
  await writeLocalStore(store);
}

export async function deleteHeroBanner(id: string): Promise<void> {
  const store = await readLocalStore();
  if (await checkPostgresConnection()) {
    try {
      await prisma.heroBanner.delete({ where: { id } });
    } catch {
      // Continue
    }
  }
  store.heroBanners = store.heroBanners.filter((b) => b.id !== id);
  await writeLocalStore(store);
}

// --- Admin Users & Role Management ---
export async function getAdminUsers(): Promise<AdminUserRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.adminUser.findMany({
        orderBy: { createdAt: "asc" },
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          email: r.email,
          name: r.name,
          passwordHash: r.passwordHash,
          role: (r.role as AdminUserRecord["role"]) || "SUPER_ADMIN",
          enabled: r.enabled,
          lastLoginAt: r.lastLoginAt?.toISOString(),
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  return store.adminUsers ?? INITIAL_CMS_DATA.adminUsers ?? [];
}

export async function upsertAdminUser(
  input: Omit<AdminUserRecord, "createdAt" | "updatedAt"> & {
    createdAt?: string;
  }
): Promise<AdminUserRecord> {
  const store = await readLocalStore();
  const list = store.adminUsers ?? [];
  const existing = list.find(
    (u) =>
      u.id === input.id || u.email.toLowerCase() === input.email.toLowerCase()
  );
  const now = new Date().toISOString();
  const updated: AdminUserRecord = {
    id: existing?.id || input.id || `admin-${Date.now()}`,
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    passwordHash: input.passwordHash || existing?.passwordHash || "",
    role: input.role,
    enabled: input.enabled,
    lastLoginAt: input.lastLoginAt ?? existing?.lastLoginAt,
    createdAt: existing?.createdAt || input.createdAt || now,
    updatedAt: now,
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.adminUser.upsert({
        where: { email: updated.email },
        update: {
          name: updated.name,
          passwordHash: updated.passwordHash,
          role: updated.role,
          enabled: updated.enabled,
        },
        create: {
          id: updated.id,
          email: updated.email,
          name: updated.name,
          passwordHash: updated.passwordHash,
          role: updated.role,
          enabled: updated.enabled,
        },
      });
    } catch {
      // Continue
    }
  }

  const idx = list.findIndex(
    (u) => u.id === updated.id || u.email === updated.email
  );
  if (idx >= 0) {
    list[idx] = updated;
  } else {
    list.push(updated);
  }
  store.adminUsers = list;
  await writeLocalStore(store);
  return updated;
}

export async function deleteAdminUser(id: string): Promise<void> {
  const store = await readLocalStore();
  if (await checkPostgresConnection()) {
    try {
      await prisma.adminUser.delete({ where: { id } });
    } catch {
      // Continue
    }
  }
  store.adminUsers = (store.adminUsers ?? []).filter((u) => u.id !== id);
  await writeLocalStore(store);
}

// --- Audit Logs ---
export async function getAuditLogs(limit = 50): Promise<AuditLogRecord[]> {
  if (await checkPostgresConnection()) {
    try {
      const rows = await prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
      });
      if (rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          actorEmail: r.actorEmail,
          actorRole: r.actorRole,
          action: r.action,
          entityType: r.entityType,
          entityId: r.entityId,
          summary: r.summary,
          createdAt: r.createdAt.toISOString(),
        }));
      }
    } catch {
      // Fallback
    }
  }
  const store = await readLocalStore();
  return (store.auditLogs ?? []).slice(0, limit);
}

export async function recordAuditLog(input: {
  actorEmail: string;
  actorRole?: string;
  action: string;
  entityType: string;
  entityId: string;
  summary: string;
}): Promise<AuditLogRecord> {
  const store = await readLocalStore();
  const entry: AuditLogRecord = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    actorEmail: input.actorEmail,
    actorRole: input.actorRole || "SUPER_ADMIN",
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    summary: input.summary,
    createdAt: new Date().toISOString(),
  };

  if (await checkPostgresConnection()) {
    try {
      await prisma.auditLog.create({
        data: {
          id: entry.id,
          actorEmail: entry.actorEmail,
          actorRole: entry.actorRole,
          action: entry.action,
          entityType: entry.entityType,
          entityId: entry.entityId,
          summary: entry.summary,
        },
      });
    } catch {
      // Continue
    }
  }

  store.auditLogs = [entry, ...(store.auditLogs ?? [])].slice(0, 150);
  await writeLocalStore(store);
  return entry;
}
