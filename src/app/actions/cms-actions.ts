"use server";

import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import {
  addMediaAsset,
  deleteAdminUser,
  deleteBlogPost,
  deleteEnquiry,
  deleteGalleryItem,
  deleteHeroBanner,
  deleteMediaAsset,
  deleteSolution,
  deleteTestimonial,
  getBlogPosts,
  getSolutions,
  recordAuditLog,
  updateEnquiryStatus,
  updateSiteSettings,
  upsertAdminUser,
  upsertBlogPost,
  upsertGalleryItem,
  upsertHeroBanner,
  upsertPageContent,
  upsertSolution,
  upsertTestimonial,
} from "@/lib/cms";
import type {
  AdminUserRecord,
  BlogPostRecord,
  EnquiryRecord,
  GalleryItemRecord,
  HeroBannerRecord,
  PageContentRecord,
  SiteSettingsRecord,
  SolutionRecord,
  TestimonialRecord,
} from "@/lib/seed-data";
import { slugify } from "@/lib/utils";

async function requireAdmin(
  allowedRoles: Array<"SUPER_ADMIN" | "ADMIN" | "EDITOR"> = [
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR",
  ]
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized: Administrator session required.");
  }
  const role =
    ((session.user as { role?: string }).role as
      | "SUPER_ADMIN"
      | "ADMIN"
      | "EDITOR") || "SUPER_ADMIN";
  if (!allowedRoles.includes(role)) {
    throw new Error("Forbidden: Insufficient administrator permissions.");
  }
  return {
    email: session.user.email || "admin@advaita1.com",
    name: session.user.name || "Administrator",
    role,
  };
}

function revalidateAllPublicPaths() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/solutions");
  revalidatePath("/gallery");
  revalidatePath("/testimonials");
  revalidatePath("/blogs");
  revalidatePath("/contact");
  revalidatePath("/privacy-policy");
  revalidatePath("/terms-and-conditions");
  revalidatePath("/admin");
}

export async function saveSiteSettingsAction(
  input: Partial<SiteSettingsRecord>
) {
  const actor = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  const updated = await updateSiteSettings(input);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPDATE_SITE_SETTINGS",
    entityType: "SiteSettings",
    entityId: "global",
    summary: "Updated global website settings, contact details, or social links.",
  });
  revalidateAllPublicPaths();
  return { success: true, data: updated };
}

export async function saveHeroBannerAction(
  input: Omit<HeroBannerRecord, "updatedAt">
) {
  const actor = await requireAdmin();
  const updated = await upsertHeroBanner(input);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPSERT_HERO_BANNER",
    entityType: "HeroBanner",
    entityId: updated.id,
    summary: `Saved hero banner "${updated.headline}" (Order: ${updated.displayOrder}, Active: ${updated.published}).`,
  });
  revalidateAllPublicPaths();
  return { success: true, data: updated };
}

export async function removeHeroBannerAction(id: string) {
  const actor = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  await deleteHeroBanner(id);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "DELETE_HERO_BANNER",
    entityType: "HeroBanner",
    entityId: id,
    summary: `Deleted hero banner (${id}).`,
  });
  revalidateAllPublicPaths();
  return { success: true };
}

export async function savePageContentAction(
  input: Omit<PageContentRecord, "updatedAt">
) {
  const actor = await requireAdmin();
  const updated = await upsertPageContent(input);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPDATE_PAGE_CONTENT",
    entityType: "PageContent",
    entityId: updated.pageSlug,
    summary: `Updated page content and SEO for /${updated.pageSlug}.`,
  });
  revalidateAllPublicPaths();
  return { success: true, data: updated };
}

export async function saveSolutionAction(
  input: Omit<SolutionRecord, "updatedAt">
) {
  const actor = await requireAdmin();
  const baseSlug = slugify(input.slug || input.title) || `solution-${Date.now()}`;
  const allSolutions = await getSolutions(false);
  const slugConflict = allSolutions.find(
    (s) => s.slug === baseSlug && s.id !== input.id
  );
  const cleanSlug = slugConflict ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

  const updated = await upsertSolution({
    ...input,
    slug: cleanSlug,
  });
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPSERT_SOLUTION",
    entityType: "Solution",
    entityId: updated.slug,
    summary: `Saved solution "${updated.title}" (/solutions/${updated.slug}, Published: ${updated.published}).`,
  });
  revalidateAllPublicPaths();
  revalidatePath(`/solutions/${cleanSlug}`);
  return { success: true, data: updated };
}

export async function removeSolutionAction(id: string) {
  const actor = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  await deleteSolution(id);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "DELETE_SOLUTION",
    entityType: "Solution",
    entityId: id,
    summary: `Deleted solution (${id}).`,
  });
  revalidateAllPublicPaths();
  return { success: true };
}

export async function saveGalleryItemAction(
  input: Omit<GalleryItemRecord, "updatedAt">
) {
  const actor = await requireAdmin();
  const updated = await upsertGalleryItem(input);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPSERT_GALLERY_ITEM",
    entityType: "GalleryItem",
    entityId: updated.id,
    summary: `Saved gallery item "${updated.title}" (${updated.category}).`,
  });
  revalidateAllPublicPaths();
  return { success: true, data: updated };
}

export async function removeGalleryItemAction(id: string) {
  const actor = await requireAdmin();
  await deleteGalleryItem(id);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "DELETE_GALLERY_ITEM",
    entityType: "GalleryItem",
    entityId: id,
    summary: `Deleted gallery item (${id}).`,
  });
  revalidateAllPublicPaths();
  return { success: true };
}

export async function saveTestimonialAction(
  input: Omit<TestimonialRecord, "updatedAt">
) {
  const actor = await requireAdmin();
  const updated = await upsertTestimonial(input);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPSERT_TESTIMONIAL",
    entityType: "Testimonial",
    entityId: updated.id,
    summary: `Saved testimonial from ${updated.authorName} (Published: ${updated.published}).`,
  });
  revalidateAllPublicPaths();
  return { success: true, data: updated };
}

export async function removeTestimonialAction(id: string) {
  const actor = await requireAdmin();
  await deleteTestimonial(id);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "DELETE_TESTIMONIAL",
    entityType: "Testimonial",
    entityId: id,
    summary: `Deleted testimonial (${id}).`,
  });
  revalidateAllPublicPaths();
  return { success: true };
}

export async function saveBlogPostAction(
  input: Omit<BlogPostRecord, "updatedAt">
) {
  const actor = await requireAdmin();
  const baseSlug = slugify(input.slug || input.title) || `article-${Date.now()}`;
  const allPosts = await getBlogPosts(false);
  const slugConflict = allPosts.find(
    (b) => b.slug === baseSlug && b.id !== input.id
  );
  const cleanSlug = slugConflict
    ? `${baseSlug}-${Date.now().toString().slice(-4)}`
    : baseSlug;

  const updated = await upsertBlogPost({
    ...input,
    slug: cleanSlug,
  });
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPSERT_BLOG_POST",
    entityType: "BlogPost",
    entityId: updated.slug,
    summary: `Saved blog article "${updated.title}" (/blogs/${updated.slug}, Published: ${updated.published}).`,
  });
  revalidateAllPublicPaths();
  revalidatePath(`/blogs/${cleanSlug}`);
  return { success: true, data: updated };
}

export async function removeBlogPostAction(id: string) {
  const actor = await requireAdmin();
  await deleteBlogPost(id);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "DELETE_BLOG_POST",
    entityType: "BlogPost",
    entityId: id,
    summary: `Deleted blog article (${id}).`,
  });
  revalidateAllPublicPaths();
  return { success: true };
}

export async function updateEnquiryAction(
  id: string,
  status: EnquiryRecord["status"],
  adminNotes?: string
) {
  const actor = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  const updated = await updateEnquiryStatus(id, status, adminNotes);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPDATE_ENQUIRY_STATUS",
    entityType: "Enquiry",
    entityId: id,
    summary: `Updated enquiry ${id} status to ${status}.`,
  });
  revalidatePath("/admin");
  return { success: true, data: updated };
}

export async function removeEnquiryAction(id: string) {
  const actor = await requireAdmin(["SUPER_ADMIN", "ADMIN"]);
  await deleteEnquiry(id);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "DELETE_ENQUIRY",
    entityType: "Enquiry",
    entityId: id,
    summary: `Deleted enquiry record (${id}).`,
  });
  revalidatePath("/admin");
  return { success: true };
}

export async function uploadMediaAssetAction(formData: FormData) {
  const actor = await requireAdmin();
  const file = formData.get("file") as File | null;
  const altText =
    ((formData.get("altText") as string) || "iGUIDE media asset").trim();
  const category =
    ((formData.get("category") as string) || "General").trim();

  if (!file || file.size === 0) {
    return { success: false, error: "Please select a valid image file." };
  }

  const allowedTypes = [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
    "image/webp",
  ];
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: "Only SVG, PNG, JPG, and WEBP image files are permitted.",
    };
  }

  if (file.size > 5 * 1024 * 1024) {
    return {
      success: false,
      error: "File size must be under 5 MB.",
    };
  }

  const ext = path.extname(file.name) || ".svg";
  const baseName = slugify(path.basename(file.name, ext)) || "asset";
  const safeFileName = `${baseName}-${Date.now()}${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, safeFileName), buffer);

  const asset = await addMediaAsset({
    fileName: safeFileName,
    originalName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    url: `/uploads/${safeFileName}`,
    altText,
    category,
  });

  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "UPLOAD_MEDIA",
    entityType: "MediaAsset",
    entityId: asset.id,
    summary: `Uploaded media asset "${asset.originalName}" (${Math.round(asset.sizeBytes / 1024)} KB).`,
  });

  revalidateAllPublicPaths();
  return { success: true, data: asset };
}

export async function removeMediaAssetAction(id: string) {
  const actor = await requireAdmin();
  await deleteMediaAsset(id);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "DELETE_MEDIA",
    entityType: "MediaAsset",
    entityId: id,
    summary: `Deleted media asset (${id}).`,
  });
  revalidatePath("/admin");
  return { success: true };
}

export async function saveAdminUserAction(input: {
  id?: string;
  email: string;
  name: string;
  password?: string;
  role: AdminUserRecord["role"];
  enabled: boolean;
}) {
  const actor = await requireAdmin(["SUPER_ADMIN"]);
  const cleanEmail = input.email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return { success: false, error: "Please provide a valid email address." };
  }

  let passwordHash = "";
  if (input.password && input.password.trim().length > 0) {
    if (input.password.trim().length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters long.",
      };
    }
    passwordHash = await bcrypt.hash(input.password.trim(), 12);
  }

  const saved = await upsertAdminUser({
    id: input.id || `admin-${Date.now()}`,
    email: cleanEmail,
    name: input.name.trim() || "Administrator",
    passwordHash,
    role: input.role,
    enabled: input.enabled,
  });

  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: input.password ? "ADMIN_USER_PASSWORD_SET" : "UPSERT_ADMIN_USER",
    entityType: "AdminUser",
    entityId: saved.id,
    summary: `Saved administrator account ${saved.email} (Role: ${saved.role}, Enabled: ${saved.enabled}).`,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  return {
    success: true,
    data: {
      ...saved,
      passwordHash: "",
    },
  };
}

export async function removeAdminUserAction(id: string) {
  const actor = await requireAdmin(["SUPER_ADMIN"]);
  if (id === "admin-primary") {
    return {
      success: false,
      error: "The primary bootstrap administrator account cannot be deleted.",
    };
  }
  await deleteAdminUser(id);
  await recordAuditLog({
    actorEmail: actor.email,
    actorRole: actor.role,
    action: "DELETE_ADMIN_USER",
    entityType: "AdminUser",
    entityId: id,
    summary: `Removed administrator account (${id}).`,
  });
  revalidatePath("/admin");
  revalidatePath("/admin/users");
  return { success: true };
}
