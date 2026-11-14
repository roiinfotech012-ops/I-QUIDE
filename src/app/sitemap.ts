import type { MetadataRoute } from "next";
import { getBlogPosts, getSolutions } from "@/lib/cms";
import { getBaseUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const [solutions, blogs] = await Promise.all([
    getSolutions(true),
    getBlogPosts(true),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/solutions",
    "/gallery",
    "/testimonials",
    "/blogs",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const solutionRoutes = solutions.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const blogRoutes = blogs.map((b) => ({
    url: `${baseUrl}/blogs/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...solutionRoutes, ...blogRoutes];
}
