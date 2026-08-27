import { getPageBySlug } from "@/lib/cms/client";
import { RowRenderer } from "@/components/sections/RowRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Rebel Rover Travel",
  description: "Get in touch with Rebel Rover for holiday package reservations, customized itineraries, and travel support.",
};

export default async function ContactPage() {
  const page = await getPageBySlug("contact");

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <RowRenderer rows={page.rows} />
    </main>
  );
}
