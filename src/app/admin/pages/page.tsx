import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminPagesPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "pages" });
}
