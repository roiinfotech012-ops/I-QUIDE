import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminUsersPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "users" });
}
