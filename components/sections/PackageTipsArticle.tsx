import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery } from "@/sanity/lib/queries";
import { ArrowRight } from "lucide-react";

const SLUG_IMAGE_MAP: Record<string, string> = {
  "travel-stories-for-now-and-the-future": "/images/article.png",
  "9-popular-travel-destinations-on-sale": "/images/paris.png",
  "how-are-we-going-to-travel": "/images/bali.png",
  "top-10-hidden-gems-asia": "/images/italy.png",
  "exotic-island-escapes": "/images/dubai.png",
  "essential-travel-packing-guide": "/images/home-img-2.png",
};

const defaultArticles = [
  {
    id: "art-1",
    title: "9 Popular Travel Destinations on Sale in 2024",
    slug: "9-popular-travel-destinations-on-sale",
    category: "Perfect | Tips",
    excerpt: "Check out the best discounts and budget-friendly vacation packages across Asia and Europe this season.",
    image: "/images/paris.png",
  },
  {
    id: "art-2",
    title: "How Are We Going to Travel Sustainably in 2024?",
    slug: "how-are-we-going-to-travel",
    category: "Tips | Travel",
    excerpt: "Eco-friendly travel tips and practical ways to minimize your carbon footprint while seeing the world.",
    image: "/images/bali.png",
  },
  {
    id: "art-3",
    title: "Travel Stories For Now and the Future",
    slug: "travel-stories-for-now-and-the-future",
    category: "Stories | Tips",
    excerpt: "Discover inspiring stories of sustainable exploration, secret destinations, and timeless memories around the world.",
    image: "/images/article.png",
  },
];

export async function PackageTipsArticle() {
  const livePosts = await client
    .fetch(blogPostsQuery, {}, { next: { revalidate: 0 } })
    .catch(() => null);

  let articles = defaultArticles;

  if (livePosts && livePosts.length >= 3) {
    articles = livePosts.slice(0, 3).map((p: any, idx: number) => {
      const slugStr = typeof p.slug === "string" ? p.slug : p.slug?.current || defaultArticles[idx].slug;
      const img = p.coverImage || SLUG_IMAGE_MAP[slugStr] || defaultArticles[idx].image;
      return {
        id: p._id || `art-${idx}`,
        title: p.title || defaultArticles[idx].title,
        slug: slugStr,
        category: p.category ? `${p.category} | Guide` : defaultArticles[idx].category,
        excerpt: p.excerpt || defaultArticles[idx].excerpt,
        image: img,
      };
    });
  }

  const card1 = articles[0] || defaultArticles[0];
  const card2 = articles[1] || defaultArticles[1];
  const featured = articles[2] || defaultArticles[2];

  return (
    <section className="py-20 sm:py-28 bg-white font-poppins">
      <Container size="content" className="px-4 sm:px-8">
        {/* Top Header Row with Left Titles & Right View More Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[44px] lg:leading-[54px] text-black tracking-tight">
              Tips &amp; Article
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed font-normal">
              Stay updated with the latest travel insights, insider packing advice, and world exploration stories.
            </p>
          </div>

          {/* Right View More Button */}
          <Link
            href="/blog"
            className="px-8 py-3.5 btn-slide btn-shine text-white font-poppins font-bold text-xs sm:text-sm rounded-full shrink-0 shadow-md self-start md:self-auto"
          >
            View all articles
          </Link>
        </div>

        {/* 2-Column Asymmetric Layout (Left 5 cols, Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: 2 Stacked White Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-poppins text-xs sm:text-sm text-orange-500 font-semibold block mb-2">
                  {card1.category}
                </span>
                <h3 className="font-poppins font-bold text-xl sm:text-[22px] text-black leading-snug mb-3 group-hover:text-orange-600 transition-colors">
                  <Link href={`/blog/${card1.slug}`}>{card1.title}</Link>
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed mb-6 font-normal line-clamp-3">
                  {card1.excerpt}
                </p>
              </div>
              <div>
                <Link
                  href={`/blog/${card1.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3 btn-slide btn-shine text-white font-poppins font-bold text-xs rounded-full shadow-sm"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between group">
              <div>
                <span className="font-poppins text-xs sm:text-sm text-orange-500 font-semibold block mb-2">
                  {card2.category}
                </span>
                <h3 className="font-poppins font-bold text-xl sm:text-[22px] text-black leading-snug mb-3 group-hover:text-orange-600 transition-colors">
                  <Link href={`/blog/${card2.slug}`}>{card2.title}</Link>
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed mb-6 font-normal line-clamp-3">
                  {card2.excerpt}
                </p>
              </div>
              <div>
                <Link
                  href={`/blog/${card2.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3 btn-slide btn-shine text-white font-poppins font-bold text-xs rounded-full shadow-sm"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Large Article Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between group">
            {/* Featured Photo - Clickable */}
            <Link href={`/blog/${featured.slug}`} className="block relative h-[340px] sm:h-[390px] w-full overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </Link>

            {/* Featured Content Body */}
            <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <span className="font-poppins text-xs sm:text-sm text-orange-500 font-semibold block mb-2">
                  {featured.category}
                </span>
                <h3 className="font-poppins font-bold text-2xl sm:text-[26px] text-black leading-snug mb-3 group-hover:text-orange-600 transition-colors">
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed mb-6 font-normal line-clamp-3">
                  {featured.excerpt}
                </p>
              </div>
              <div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3 btn-slide btn-shine text-white font-poppins font-bold text-xs rounded-full shadow-sm"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
