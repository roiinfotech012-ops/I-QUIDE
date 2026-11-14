import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminEditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return renderProtectedAdminConsole({
    initialActiveTab: "blogs",
    initialBlogEditId: id,
  });
}
