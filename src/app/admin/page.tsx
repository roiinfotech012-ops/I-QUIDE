import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Admin CMS | iGUIDE Content & Enquiry Management",
    path: "/admin",
    noIndex: true,
  });
}

export default async function AdminPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "overview" });
}
