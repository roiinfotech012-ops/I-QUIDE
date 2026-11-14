import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminSettingsPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "settings" });
}
