import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminSolutionsPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "solutions" });
}
