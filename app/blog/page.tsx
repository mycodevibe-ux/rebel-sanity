import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Travel Stories — Rebel Rover",
  description: "Explore world-class travel stories, destination guides, eco-travel tips, and vacation advice with Rebel Rover.",
};

export const defaultBlogPosts = [
  {
    id: "blog-1",
    title: "Travel Stories For Now and the Future",
    slug: "travel-stories-for-now-and-the-future",
    category: "Stories",
    author: "Hasmar",
    publishedDate: "January 18, 2024",
    coverImage: "/images/blog-post-1.png",
    excerpt: "Discover inspiring stories of sustainable exploration, secret destinations, and timeless memories around the world.",
    tags: ["Destination", "Stories"],
  },
  {
    id: "blog-2",
    title: "9 Popular Travel Destinations on Sale in 2024",
    slug: "9-popular-travel-destinations-on-sale",
    category: "Travel Deals",
    author: "David Miller",
    publishedDate: "14 Dec 2023",
    coverImage: "/images/paris.png",
    excerpt: "Check out the best discounts and budget-friendly vacation packages across Asia and Europe this season.",
    tags: ["Deals", "Packages"],
  },
  {
    id: "blog-3",
    title: "How Are We Going to Travel Sustainably in 2024?",
    slug: "how-are-we-going-to-travel",
    category: "Eco Travel",
    author: "Siti Sarah",
    publishedDate: "10 Nov 2023",
    coverImage: "/images/bali.png",
    excerpt: "Eco-friendly travel tips and practical ways to minimize your carbon footprint while seeing the world.",
    tags: ["Eco", "Tips"],
  },
  {
    id: "blog-4",
    title: "Top 10 Hidden Gems in South East Asia You Must Visit",
    slug: "top-10-hidden-gems-asia",
    category: "Adventure",
    author: "Cristian Daniel",
    publishedDate: "05 Oct 2023",
    coverImage: "/images/italy.png",
    excerpt: "From untouched tropical islands to misty mountain temples, explore the best secret spots.",
    tags: ["Asia", "Adventure"],
  },
  {
    id: "blog-5",
    title: "The Ultimate Travel Packing Guide for World Explorers",
    slug: "essential-travel-packing-guide",
    category: "Tips",
    author: "Sara Jay",
    publishedDate: "22 Sep 2023",
    coverImage: "/images/home-img-2.png",
    excerpt: "Master the art of light packing with our essential checklist for hassle-free adventures across continents.",
    tags: ["Tips", "Guide"],
  },
  {
    id: "blog-6",
    title: "Exotic Island Escapes You Need on Your Bucket List",
    slug: "exotic-island-escapes",
    category: "Destination",
    author: "Kausar Hasan",
    publishedDate: "15 Aug 2023",
    coverImage: "/images/dubai.png",
    excerpt: "Crystal-clear turquoise waters, white sand beaches, and serene tropical paradises waiting to be discovered.",
    tags: ["Destination", "Beaches"],
  },
];

const categoryList = [
  "All",
  "Stories",
  "Tips",
  "Travel Deals",
  "Eco Travel",
  "Adventure",
  "Destination",
];

interface BlogPageProps {
  searchParams?: {
    category?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const selectedCategory = searchParams?.category || "All";

  const livePosts = await client
    .fetch(blogPostsQuery, {}, { next: { revalidate: 0 } })
    .catch(() => null);

  const rawPosts = livePosts && livePosts.length > 0 ? livePosts : defaultBlogPosts;

  const allPosts = rawPosts.map((p: any, idx: number) => {
    // Map fallback image if live post image is missing
    const fallbackImage = defaultBlogPosts[idx % defaultBlogPosts.length].coverImage;
    return {
      id: p._id || p.id || `post-${idx}`,
      title: p.title || "Travel Story",
      slug: typeof p.slug === "string" ? p.slug : p.slug?.current || `travel-stories-for-now-and-the-future`,
      category: p.category || "Travel",
      author: p.author || "Admin",
      publishedDate: p.publishedDate || "Recent",
      coverImage: p.coverImage || fallbackImage,
      excerpt: p.excerpt || "Read inspiring travel stories and destination tips on Rebel Rover.",
    };
  });

  // Filter by category if selected
  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts.filter((post: any) =>
          post.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <main className="min-h-screen bg-white font-poppins">
      {/* 1. Hero Banner */}
      <section className="relative min-h-[300px] sm:min-h-[380px] w-full flex items-center justify-center overflow-hidden py-16">
        <Image
          src="/images/blog-banner.png"
          alt="Blog Hero Banner"
          fill
          priority
          className="object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1.5px]" />

        <Container size="content" className="relative z-10 text-center px-4 sm:px-8 max-w-4xl pt-8">
          <span className="inline-block bg-orange-500/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-md">
            Stories & Insights
          </span>
          <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-md">
            Travel Stories & Insights
          </h1>
          <p className="font-poppins text-xs sm:text-base text-white/90 mt-4 tracking-wide max-w-2xl mx-auto">
            Discover inspiring journeys, insider destination guides, sustainable tourism tips, and exclusive travel deals.
          </p>
        </Container>
      </section>

      {/* 2. Category Filter Bar */}
      <section className="py-8 bg-gray-50 border-b border-gray-100 sticky top-[72px] z-20 backdrop-blur-md bg-white/90">
        <Container size="content" className="px-4 sm:px-8">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {categoryList.map((cat) => {
              const isActive =
                cat === "All"
                  ? selectedCategory === "All"
                  : selectedCategory.toLowerCase() === cat.toLowerCase();

              const href = cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;

              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 select-none ${
                    isActive
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-white text-[#555555] hover:bg-gray-100 hover:text-black border border-gray-200"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Blog Cards Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <Container size="content" className="px-4 sm:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: any) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
                >
                  <div>
                    {/* Thumbnail with Category Pill Badge - Full Clickable Link */}
                    <Link href={`/blog/${post.slug}`} className="block relative h-60 w-full overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-md z-10">
                        <Tag className="w-3 h-3 text-orange-400" />
                        <span>{post.category}</span>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6 sm:p-7 space-y-3">
                      {/* Meta: Author & Date */}
                      <div className="flex items-center gap-4 text-xs text-[#777777]">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-orange-500" />
                          <span>{post.author}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" />
                          <span>{post.publishedDate}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-poppins font-bold text-lg sm:text-xl text-black group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="font-poppins text-xs sm:text-[13px] text-[#6c6c6c] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More Action Button */}
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-black group-hover:text-orange-600 transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-orange-500" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 max-w-2xl mx-auto">
              <h3 className="font-bold text-xl text-black">No articles found</h3>
              <p className="text-sm text-[#777777] mt-2">
                No blog posts found under &quot;{selectedCategory}&quot;.
              </p>
              <Link
                href="/blog"
                className="mt-6 inline-block px-6 py-2.5 btn-slide btn-shine text-white font-bold text-xs rounded-full shadow-md"
              >
                View All Articles
              </Link>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
