import React from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteSettings, getSolutions } from "@/lib/cms";
import { buildOrganizationJsonLd, buildPageMetadata } from "@/lib/seo";
import { StickyHeader } from "@/components/layout/sticky-header";
import { GlobalFooter } from "@/components/layout/global-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata() {
  return buildPageMetadata({});
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, solutions] = await Promise.all([
    getSiteSettings(),
    getSolutions(true),
  ]);

  const orgJsonLd = buildOrganizationJsonLd(settings);

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-cloud text-ink selection:bg-iris/20 selection:text-iris">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-iris focus:px-5 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-white focus:shadow-elevated"
        >
          Skip to main content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        <StickyHeader settings={settings} solutions={solutions} />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <GlobalFooter settings={settings} solutions={solutions} />
      </body>
    </html>
  );
}
