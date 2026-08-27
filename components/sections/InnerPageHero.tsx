import React from "react";
import Image from "next/image";
import Link from "next/link";
import { InnerPageHeroFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { ChevronRight } from "lucide-react";

interface InnerPageHeroProps {
  fields: InnerPageHeroFields;
}

export function InnerPageHero({ fields }: InnerPageHeroProps) {
  let defaultBanner = "/images/about-banner.png";
  const titleLower = (fields?.title || "").toLowerCase();

  if (titleLower.includes("about")) {
    defaultBanner = "/images/about-banner.png";
  } else if (titleLower.includes("package")) {
    defaultBanner = "/images/Package-banner.png";
  } else if (titleLower.includes("stories") || titleLower.includes("blog")) {
    defaultBanner = "/images/blog-banner.png";
  } else if (titleLower.includes("contact")) {
    defaultBanner = "/images/contact-banner.png";
  }

  const bannerImg = fields?.background_image || defaultBanner;

  const pageLabel = fields?.breadcrumb_label
    ? fields.breadcrumb_label.replace(/Home\s*[>/]\s*/, "")
    : fields?.title || "Page";

  return (
    <section className="relative h-[920px] min-h-[920px] flex items-center justify-center pt-48 sm:pt-56 pb-28 overflow-hidden bg-[#0c1e33]">
      {/* 1. Full Height Hero Banner Artwork */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImg}
          alt={fields?.title || "Hero banner"}
          fill
          priority
          className="object-cover object-center"
        />
        {/* Top gradient scrim for crisp header text */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/45 to-transparent pointer-events-none" />
      </div>

      <Container size="content" className="relative z-10 text-center px-4 sm:px-6">
        {/* Centered Page Title */}
        <h1 className="font-poppins font-bold text-5xl sm:text-7xl lg:text-[78px] lg:leading-[90px] text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] whitespace-pre-line mb-4">
          {fields?.title}
        </h1>

        {/* Centered Breadcrumb */}
        <div className="inline-flex items-center gap-2 text-sm sm:text-base font-poppins text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
          <Link href="/" className="hover:underline opacity-95 hover:opacity-100 font-medium">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
          <span className="font-semibold text-white">
            {pageLabel}
          </span>
        </div>

        {/* Optional Blog Meta Row */}
        {fields?.meta && (
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-6 pt-4 text-xs sm:text-sm text-white font-poppins drop-shadow-md">
            {fields.meta.author && (
              <div className="flex items-center gap-2">
                <span>👤</span>
                <span>{fields.meta.author}</span>
              </div>
            )}
            {fields.meta.date && (
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{fields.meta.date}</span>
              </div>
            )}
            {fields.meta.category && (
              <div className="flex items-center gap-2">
                <span>📁</span>
                <span>{fields.meta.category}</span>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
