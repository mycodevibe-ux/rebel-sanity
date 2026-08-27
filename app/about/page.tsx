import { getPageBySlug } from "@/lib/cms/client";
import { RowRenderer } from "@/components/sections/RowRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Rebel Rover Travel",
  description: "Learn more about Rebel Rover, our mission, vision, team, and unforgettable travel experiences.",
};

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <RowRenderer rows={page.rows} />
    </main>
  );
}
