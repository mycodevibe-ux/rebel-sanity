import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { customPageQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

interface CustomPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CustomPageProps): Promise<Metadata> {
  const pageData = await client.fetch(customPageQuery, { slug: params.slug }, { next: { revalidate: 0 } }).catch(() => null);

  if (!pageData) {
    return {
      title: "Page Not Found — Rebel Rover",
    };
  }

  return {
    title: `${pageData.title} — Rebel Rover`,
    description: `Explore ${pageData.title} on Rebel Rover Travel.`,
  };
}

export default async function DynamicCustomPage({ params }: CustomPageProps) {
  // Ignored slugs that have dedicated directories
  const reservedSlugs = ["about", "packages", "blog", "contact", "studio", "api", "destination"];
  if (reservedSlugs.includes(params.slug)) {
    notFound();
  }

  const pageData = await client.fetch(customPageQuery, { slug: params.slug }, { next: { revalidate: 0 } }).catch(() => null);

  if (!pageData) {
    notFound();
  }

  const heroTitle = pageData.heroTitle || pageData.title;
  const breadcrumb = pageData.breadcrumb || `Home > ${pageData.title}`;
  const heroBg = pageData.heroBackgroundImage || "/images/about-banner.png";

  return (
    <main className="min-h-screen bg-white">
      {/* Dynamic Inner Hero Banner */}
      <section className="relative h-[280px] sm:h-[340px] lg:h-[400px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={heroBg}
          alt={heroTitle}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <Container size="content" className="relative z-10 text-center px-4">
          <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-md">
            {heroTitle}
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-white/90 mt-3 tracking-wide">
            {breadcrumb}
          </p>
        </Container>
      </section>

      {/* Page Content Container */}
      <section className="py-16 sm:py-24 bg-white">
        <Container size="content" className="max-w-4xl px-4 sm:px-8">
          <div className="prose prose-lg max-w-none font-poppins text-[#555555] leading-relaxed space-y-6">
            {pageData.content && Array.isArray(pageData.content) && pageData.content.length > 0 ? (
              pageData.content.map((block: any, idx: number) => {
                if (block._type === "block") {
                  const text = block.children?.map((c: any) => c.text).join("") || "";
                  if (block.style === "h2") {
                    return (
                      <h2 key={idx} className="font-bold text-2xl sm:text-3xl text-black pt-6 pb-2">
                        {text}
                      </h2>
                    );
                  }
                  if (block.style === "h3") {
                    return (
                      <h3 key={idx} className="font-bold text-xl sm:text-2xl text-black pt-4 pb-1">
                        {text}
                      </h3>
                    );
                  }
                  return (
                    <p key={idx} className="text-sm sm:text-base text-[#555555] leading-relaxed">
                      {text}
                    </p>
                  );
                }
                return null;
              })
            ) : (
              <p className="text-gray-500 italic">
                Content for this page is being updated via Sanity CMS.
              </p>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
