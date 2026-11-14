import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminContactPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "contact" });
}
