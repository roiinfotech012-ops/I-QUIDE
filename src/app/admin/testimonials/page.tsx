import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminTestimonialsPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "testimonials" });
}
