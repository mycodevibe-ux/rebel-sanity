import { getPageBySlug } from "@/lib/cms/client";
import { RowRenderer } from "@/components/sections/RowRenderer";
import { notFound } from "next/navigation";

export default async function HomePage() {
  const page = await getPageBySlug("home");

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <RowRenderer rows={page.rows} />
    </main>
  );
}
