import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminGalleryPage() {
  return renderProtectedAdminConsole({ initialActiveTab: "gallery" });
}
