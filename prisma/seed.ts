import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { INITIAL_CMS_DATA } from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding iGUIDE PostgreSQL database...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@advaita1.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "iGuide@Admin2026!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: "iGUIDE Administrator" },
    create: {
      email: adminEmail,
      name: "iGUIDE Administrator",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  const s = INITIAL_CMS_DATA.siteSettings;
  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {
      brandName: s.brandName,
      tagline: s.tagline,
      visionStatement: s.visionStatement,
      missionStatement: s.missionStatement,
      logoUrl: s.logoUrl,
      faviconUrl: s.faviconUrl,
      primaryEmail: s.primaryEmail,
      primaryPhone: s.primaryPhone,
      whatsappNumber: s.whatsappNumber,
      whatsappVerified: s.whatsappVerified,
      address: s.address,
      officeHours: s.officeHours,
      footerDescription: s.footerDescription,
      copyrightText: s.copyrightText,
      socialLinks: s.socialLinks,
      defaultSeoTitle: s.defaultSeoTitle,
      defaultSeoDescription: s.defaultSeoDescription,
    },
    create: {
      id: "global",
      brandName: s.brandName,
      tagline: s.tagline,
      visionStatement: s.visionStatement,
      missionStatement: s.missionStatement,
      logoUrl: s.logoUrl,
      faviconUrl: s.faviconUrl,
      primaryEmail: s.primaryEmail,
      primaryPhone: s.primaryPhone,
      whatsappNumber: s.whatsappNumber,
      whatsappVerified: s.whatsappVerified,
      address: s.address,
      officeHours: s.officeHours,
      footerDescription: s.footerDescription,
      copyrightText: s.copyrightText,
      socialLinks: s.socialLinks,
      defaultSeoTitle: s.defaultSeoTitle,
      defaultSeoDescription: s.defaultSeoDescription,
    },
  });

  for (const banner of INITIAL_CMS_DATA.heroBanners) {
    await prisma.heroBanner.upsert({
      where: { id: banner.id },
      update: {
        pageSlug: banner.pageSlug,
        eyebrow: banner.eyebrow,
        headline: banner.headline,
        highlightedText: banner.highlightedText,
        subheadline: banner.subheadline,
        primaryCtaLabel: banner.primaryCtaLabel,
        primaryCtaHref: banner.primaryCtaHref,
        secondaryCtaLabel: banner.secondaryCtaLabel,
        secondaryCtaHref: banner.secondaryCtaHref,
        visualCaption: banner.visualCaption,
        published: banner.published,
        displayOrder: banner.displayOrder,
      },
      create: {
        id: banner.id,
        pageSlug: banner.pageSlug,
        eyebrow: banner.eyebrow,
        headline: banner.headline,
        highlightedText: banner.highlightedText,
        subheadline: banner.subheadline,
        primaryCtaLabel: banner.primaryCtaLabel,
        primaryCtaHref: banner.primaryCtaHref,
        secondaryCtaLabel: banner.secondaryCtaLabel,
        secondaryCtaHref: banner.secondaryCtaHref,
        visualCaption: banner.visualCaption,
        published: banner.published,
        displayOrder: banner.displayOrder,
      },
    });
  }

  for (const page of INITIAL_CMS_DATA.pageContents) {
    await prisma.pageContent.upsert({
      where: { pageSlug: page.pageSlug },
      update: {
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        sectionsJson: page.sectionsJson as object,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        published: page.published,
      },
      create: {
        id: page.id,
        pageSlug: page.pageSlug,
        eyebrow: page.eyebrow,
        title: page.title,
        subtitle: page.subtitle,
        sectionsJson: page.sectionsJson as object,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        published: page.published,
      },
    });
  }

  for (const sol of INITIAL_CMS_DATA.solutions) {
    await prisma.solution.upsert({
      where: { slug: sol.slug },
      update: {
        title: sol.title,
        shortTitle: sol.shortTitle,
        subtitle: sol.subtitle,
        tagline: sol.tagline,
        category: sol.category,
        summary: sol.summary,
        heroDescription: sol.heroDescription,
        description: sol.description,
        overviewHeading: sol.overviewHeading,
        overviewLead: sol.overviewLead,
        overviewPillars: (sol.overviewPillars ?? []) as object,
        challengeText: sol.challengeText,
        approachText: sol.approachText,
        outcomeText: sol.outcomeText,
        iconName: sol.iconName,
        heroImage: sol.heroImage,
        mobileHeroImage: sol.mobileHeroImage,
        accentColor: sol.accentColor,
        keyCapabilities: sol.keyCapabilities as object,
        benefits: (sol.benefits ?? []) as object,
        useCases: sol.useCases as object,
        architectureSteps: sol.architectureSteps as object,
        faqs: sol.faqs as object,
        sectionOrder: (sol.sectionOrder ?? []) as object,
        relatedSlugs: (sol.relatedSlugs ?? []) as object,
        ctaText: sol.ctaText,
        displayOrder: sol.displayOrder,
        featured: sol.featured,
        published: sol.published,
        seoTitle: sol.seoTitle,
        seoDescription: sol.seoDescription,
      },
      create: {
        id: sol.id,
        slug: sol.slug,
        title: sol.title,
        shortTitle: sol.shortTitle,
        subtitle: sol.subtitle,
        tagline: sol.tagline,
        category: sol.category,
        summary: sol.summary,
        heroDescription: sol.heroDescription,
        description: sol.description,
        overviewHeading: sol.overviewHeading,
        overviewLead: sol.overviewLead,
        overviewPillars: (sol.overviewPillars ?? []) as object,
        challengeText: sol.challengeText,
        approachText: sol.approachText,
        outcomeText: sol.outcomeText,
        iconName: sol.iconName,
        heroImage: sol.heroImage,
        mobileHeroImage: sol.mobileHeroImage,
        accentColor: sol.accentColor,
        keyCapabilities: sol.keyCapabilities as object,
        benefits: (sol.benefits ?? []) as object,
        useCases: sol.useCases as object,
        architectureSteps: sol.architectureSteps as object,
        faqs: sol.faqs as object,
        sectionOrder: (sol.sectionOrder ?? []) as object,
        relatedSlugs: (sol.relatedSlugs ?? []) as object,
        ctaText: sol.ctaText,
        displayOrder: sol.displayOrder,
        featured: sol.featured,
        published: sol.published,
        seoTitle: sol.seoTitle,
        seoDescription: sol.seoDescription,
      },
    });
  }

  for (const item of INITIAL_CMS_DATA.galleryItems) {
    await prisma.galleryItem.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        caption: item.caption,
        category: item.category,
        imageUrl: item.imageUrl,
        altText: item.altText,
        location: item.location,
        aspect: item.aspect,
        featured: item.featured,
        published: item.published,
        displayOrder: item.displayOrder,
      },
      create: {
        id: item.id,
        title: item.title,
        caption: item.caption,
        category: item.category,
        imageUrl: item.imageUrl,
        altText: item.altText,
        location: item.location,
        aspect: item.aspect,
        featured: item.featured,
        published: item.published,
        displayOrder: item.displayOrder,
      },
    });
  }

  for (const test of INITIAL_CMS_DATA.testimonials) {
    await prisma.testimonial.upsert({
      where: { id: test.id },
      update: {
        quote: test.quote,
        authorName: test.authorName,
        authorRole: test.authorRole,
        institution: test.institution,
        category: test.category,
        contextNote: test.contextNote,
        isVerified: test.isVerified,
        isFeatured: test.isFeatured,
        published: test.published,
        displayOrder: test.displayOrder,
      },
      create: {
        id: test.id,
        quote: test.quote,
        authorName: test.authorName,
        authorRole: test.authorRole,
        institution: test.institution,
        category: test.category,
        contextNote: test.contextNote,
        isVerified: test.isVerified,
        isFeatured: test.isFeatured,
        published: test.published,
        displayOrder: test.displayOrder,
      },
    });
  }

  for (const post of INITIAL_CMS_DATA.blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        readTimeMinutes: post.readTimeMinutes,
        authorName: post.authorName,
        authorRole: post.authorRole,
        coverImage: post.coverImage,
        tags: post.tags,
        featured: post.featured,
        published: post.published,
        publishedAt: new Date(post.publishedAt),
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
      },
      create: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        readTimeMinutes: post.readTimeMinutes,
        authorName: post.authorName,
        authorRole: post.authorRole,
        coverImage: post.coverImage,
        tags: post.tags,
        featured: post.featured,
        published: post.published,
        publishedAt: new Date(post.publishedAt),
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
      },
    });
  }

  console.log("iGUIDE PostgreSQL database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Failed to seed database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
