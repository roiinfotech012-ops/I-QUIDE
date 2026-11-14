import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  getAdminUsers,
  getAuditLogs,
  getBlogPosts,
  getEnquiries,
  getGalleryItems,
  getHeroBanners,
  getMediaAssets,
  getPageContents,
  getSiteSettings,
  getSolutions,
  getSystemStatus,
  getTestimonials,
} from "@/lib/cms";
import {
  AdminDashboardClient,
  type AdminTab,
} from "@/components/admin/admin-dashboard-client";

export async function renderProtectedAdminConsole({
  initialActiveTab = "overview",
  initialBlogEditId,
  initialCreateNewBlog = false,
}: {
  initialActiveTab?: AdminTab;
  initialBlogEditId?: string;
  initialCreateNewBlog?: boolean;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const [
    systemStatus,
    siteSettings,
    heroBanners,
    pageContents,
    solutions,
    galleryItems,
    testimonials,
    blogPosts,
    enquiries,
    mediaAssets,
    adminUsers,
    auditLogs,
  ] = await Promise.all([
    getSystemStatus(),
    getSiteSettings(),
    getHeroBanners(),
    getPageContents(),
    getSolutions(false),
    getGalleryItems(false),
    getTestimonials(false),
    getBlogPosts(false),
    getEnquiries(),
    getMediaAssets(),
    getAdminUsers(),
    getAuditLogs(40),
  ]);

  const sanitizedAdmins = adminUsers.map((u) => ({
    ...u,
    passwordHash: "",
  }));

  return (
    <AdminDashboardClient
      user={{
        name: session.user.name || "Administrator",
        email: session.user.email || "admin@advaita1.com",
        role: (session.user as { role?: string }).role || "SUPER_ADMIN",
      }}
      systemStatus={systemStatus}
      initialSiteSettings={siteSettings}
      initialHeroBanners={heroBanners}
      initialPageContents={pageContents}
      initialSolutions={solutions}
      initialGalleryItems={galleryItems}
      initialTestimonials={testimonials}
      initialBlogPosts={blogPosts}
      initialEnquiries={enquiries}
      initialMediaAssets={mediaAssets}
      initialAdminUsers={sanitizedAdmins}
      initialAuditLogs={auditLogs}
      initialActiveTab={initialActiveTab}
      initialBlogEditId={initialBlogEditId}
      initialCreateNewBlog={initialCreateNewBlog}
    />
  );
}
