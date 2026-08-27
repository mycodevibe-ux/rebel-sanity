import React from "react";
import Image from "next/image";
import { ArticleBodyFields } from "@/types/cms";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface ArticleBodyProps {
  fields: ArticleBodyFields;
}

export function ArticleBody({ fields }: ArticleBodyProps) {
  const featuredImg = fields?.featured_image || "/images/blog-post-1.png";
  const title = fields?.title || "Rice Terraces, Tegallalang";
  const tagsList = fields?.tags && fields.tags.length > 0 ? fields.tags.join(", ") : "Destination, Travel";

  return (
    <article className="space-y-8 font-poppins">
      {/* Top Main Image */}
      <div className="relative h-[340px] sm:h-[480px] w-full rounded-2xl overflow-hidden shadow-sm">
        <Image
          src={featuredImg}
          alt={title}
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      {/* Intro Paragraph */}
      <p className="text-xs sm:text-sm text-[#6c6c6c] leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      {/* Sub Heading */}
      <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-black pt-2">
        {title}
      </h2>

      {/* Paragraph */}
      <p className="text-xs sm:text-sm text-[#6c6c6c] leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
      </p>

      {/* Middle Image */}
      <div className="relative h-[320px] sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-sm">
        <Image
          src="/images/blog-post-2.png"
          alt="Couple smiling in nature"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Bottom Paragraph */}
      <p className="text-xs sm:text-sm text-[#6c6c6c] leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      {/* Tags & Social Share Bar */}
      <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Tags */}
        <div className="flex items-center gap-2 text-xs text-[#6c6c6c]">
          <span className="font-semibold text-black">Tags :</span>
          <span>{tagsList}</span>
        </div>

        {/* Share This */}
        <div className="flex items-center gap-2.5 text-xs text-[#6c6c6c]">
          <span className="font-semibold text-black">Share This :</span>
          <div className="flex items-center gap-2">
            <button aria-label="Share on Facebook" className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80">
              <Facebook className="w-3.5 h-3.5" />
            </button>
            <button aria-label="Share on Twitter" className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80">
              <Twitter className="w-3.5 h-3.5" />
            </button>
            <button aria-label="Share on LinkedIn" className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80">
              <Linkedin className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
