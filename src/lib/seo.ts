import type { Metadata } from "next";
import { getSiteSettings } from "./cms";

export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://iguide.edu.in"
  );
}

export async function buildPageMetadata({
  title,
  description,
  path = "/",
  ogImage = "/visuals/gallery-learning-commons.svg",
  noIndex = false,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const resolvedTitle = title || settings.defaultSeoTitle;
  const resolvedDescription = description || settings.defaultSeoDescription;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: settings.brandName,
      locale: "en_IN",
      type: openGraphType,
      ...(openGraphType === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
            section,
            tags,
          }
        : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
    icons: {
      icon: settings.faviconUrl || "/favicon.svg",
    },
  };
}

export function buildArticleJsonLd({
  title,
  description,
  slug,
  coverImage,
  publishedAt,
  updatedAt,
  authorName,
  category,
  tags,
  brandName = "iGUIDE",
  logoUrl = "/brand/iguide-logo.png",
}: {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  authorName?: string;
  category?: string;
  tags?: string[];
  brandName?: string;
  logoUrl?: string;
}) {
  const baseUrl = getBaseUrl();
  const articleUrl = `${baseUrl}/blogs/${slug}`;
  const imageUrl = coverImage.startsWith("http")
    ? coverImage
    : `${baseUrl}${coverImage.startsWith("/") ? coverImage : `/${coverImage}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    articleSection: category,
    keywords: tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      name: authorName || brandName,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}${logoUrl.startsWith("/") ? logoUrl : `/${logoUrl}`}`,
      },
    },
  };
}

export function buildOrganizationJsonLd(settings: {
  brandName: string;
  tagline: string;
  primaryEmail: string;
  primaryPhone: string;
  address: string;
  logoUrl: string;
}) {
  const baseUrl = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: settings.brandName,
    slogan: settings.tagline,
    url: baseUrl,
    logo: `${baseUrl}${settings.logoUrl}`,
    email: settings.primaryEmail,
    telephone: settings.primaryPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Koramangala",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  };
}
