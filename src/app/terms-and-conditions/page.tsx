import React from "react";
import { getPageContentBySlug, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { LegalPageTemplate } from "@/components/legal/legal-page-template";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getPageContentBySlug("terms-and-conditions");
  return buildPageMetadata({
    title: page?.seoTitle || "Terms & Conditions (Draft for Review) | iGUIDE",
    description:
      page?.seoDescription ||
      "Draft Terms & Conditions for the iGUIDE corporate website, prepared for administrator and legal review.",
    path: "/terms-and-conditions",
    noIndex: page ? !page.published : false,
  });
}

export default async function TermsAndConditionsPage() {
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getPageContentBySlug("terms-and-conditions"),
  ]);

  return (
    <LegalPageTemplate
      page={page}
      settings={settings}
      fallbackTitle="Terms & Conditions (Draft for Review)"
      fallbackEyebrow="LEGAL & INFORMATION"
      fallbackSubtitle="Draft informational terms regarding access to and use of the iGUIDE website and its educational solution descriptions, prepared for administrator and legal review."
      activeRoute="/terms-and-conditions"
    />
  );
}
