import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminBannersPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "banners" });
}
