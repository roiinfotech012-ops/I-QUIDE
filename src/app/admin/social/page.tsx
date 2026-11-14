import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminSocialPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "social" });
}
