import { getPageBySlug } from "@/lib/cms/client";
import { RowRenderer } from "@/components/sections/RowRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Packages & Destinations — Rebel Rover",
  description: "Explore world-class travel packages and vacation destinations with Rebel Rover.",
};

export default async function PackagesPage() {
  const page = await getPageBySlug("packages");

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <RowRenderer rows={page.rows} />
    </main>
  );
}
