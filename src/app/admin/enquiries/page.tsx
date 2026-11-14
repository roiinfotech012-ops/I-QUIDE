import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminEnquiriesPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "enquiries" });
}
