import React from "react";
import { getPageContentBySlug, getSiteSettings } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { LegalPageTemplate } from "@/components/legal/legal-page-template";

export const revalidate = 60;

export async function generateMetadata() {
  const page = await getPageContentBySlug("privacy-policy");
  return buildPageMetadata({
    title: page?.seoTitle || "Privacy Policy (Draft for Review) | iGUIDE",
    description:
      page?.seoDescription ||
      "Draft Privacy Policy for iGUIDE website enquiries and visitor information, prepared for administrator and legal review.",
    path: "/privacy-policy",
    noIndex: page ? !page.published : false,
  });
}

export default async function PrivacyPolicyPage() {
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getPageContentBySlug("privacy-policy"),
  ]);

  return (
    <LegalPageTemplate
      page={page}
      settings={settings}
      fallbackTitle="Privacy Policy (Draft for Review)"
      fallbackEyebrow="LEGAL & INFORMATION"
      fallbackSubtitle="Draft informational overview of how the iGUIDE website handles enquiry submissions and visitor contact details, prepared for administrator and legal review."
      activeRoute="/privacy-policy"
    />
  );
}
