import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const sp = await searchParams;
  return renderProtectedAdminConsole({
    initialActiveTab: sp.tab === "categories" ? "blog-categories" : "blogs",
  });
}
