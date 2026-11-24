import type { NextConfig } from "next";

function normalizeHostEntry(raw: string): string {
  return raw
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "");
}

function resolveAllowedHosts(): string[] {
  const raw = process.env.ALLOWED_HOSTS?.trim();
  const entries = raw
    ? raw
        .split(",")
        .map(normalizeHostEntry)
        .filter(Boolean)
    : ["*"];

  if (entries.includes("*")) {
    return ["*"];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    try {
      const host = new URL(siteUrl).host;
      if (host && !entries.includes(host)) {
        entries.push(host);
      }
    } catch {
      // Ignore malformed NEXT_PUBLIC_SITE_URL
    }
  }

  return entries.length > 0 ? entries : ["*"];
}

function resolveImageRemotePatterns() {
  const raw = process.env.ALLOWED_IMAGE_HOSTS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map(normalizeHostEntry)
    .filter(Boolean)
    .map((hostname) => ({
      protocol: "https" as const,
      hostname: hostname.split(":")[0],
    }));
}

const allowedHosts = resolveAllowedHosts();

const nextConfig: NextConfig = {
  allowedDevOrigins: allowedHosts.includes("*")
    ? ["*", "localhost", "127.0.0.1"]
    : allowedHosts,
  images: {
    remotePatterns: resolveImageRemotePatterns(),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
      allowedOrigins: allowedHosts,
    },
  },
};

export default nextConfig;
