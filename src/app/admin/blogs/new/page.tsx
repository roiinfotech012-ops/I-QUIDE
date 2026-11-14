import { renderProtectedAdminConsole } from "@/lib/admin-page-loader";
export default async function AdminNewBlogPage() {
  return renderProtectedAdminConsole({
    initialActiveTab: "blogs",
    initialCreateNewBlog: true,
  });
}
