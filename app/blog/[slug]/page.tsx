import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { singleBlogPostQuery, blogPostsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { SidebarCategories } from "@/components/sections/SidebarCategories";
import { SidebarRecentPosts } from "@/components/sections/SidebarRecentPosts";
import { CtaContactCard } from "@/components/sections/CtaContactCard";
import { CommentForm } from "@/components/sections/CommentForm";
import { BlogCardGrid } from "@/components/sections/BlogCardGrid";
import { Calendar, User, Tag, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

const fallbackBlogs: Record<string, any> = {
  "travel-stories-for-now-and-the-future": {
    title: "Travel Stories For Now and the Future",
    author: "Hasmar",
    publishedDate: "January 18, 2021",
    category: "Stories, Tips",
    coverImage: "/images/blog-banner.png",
    featuredImage: "/images/blog-post-1.png",
    middleImage: "/images/blog-post-2.png",
    tags: ["Destination", "Travel"],
    excerpt: "Discover inspiring stories of sustainable exploration, secret destinations, and timeless memories.",
  },
  "9-popular-travel-destinations-on-sale": {
    title: "9 Popular Travel Destinations on Sale in 2024",
    author: "Admin",
    publishedDate: "14 Dec 2023",
    category: "Travel Deals",
    coverImage: "/images/home-img-1.png",
    featuredImage: "/images/home-img-1.png",
    middleImage: "/images/home-img-2.png",
    tags: ["Deals", "Packages"],
    excerpt: "Check out the best discounts and budget-friendly vacation packages across Asia and Europe.",
  },
  "how-are-we-going-to-travel": {
    title: "How Are We Going to Travel Sustainably in 2024?",
    author: "Admin",
    publishedDate: "10 Nov 2023",
    category: "Eco Travel",
    coverImage: "/images/home-img-3.png",
    featuredImage: "/images/home-img-3.png",
    middleImage: "/images/home-img-1.png",
    tags: ["Eco", "Future"],
    excerpt: "Eco-friendly travel tips and how to minimize your carbon footprint while seeing the world.",
  },
  "top-10-hidden-gems-asia": {
    title: "Top 10 Hidden Gems in South East Asia You Must Visit",
    author: "Sarah",
    publishedDate: "05 Oct 2023",
    category: "Adventure",
    coverImage: "/images/bali.png",
    featuredImage: "/images/bali.png",
    middleImage: "/images/italy.png",
    tags: ["Asia", "Guide"],
    excerpt: "From untouched islands to misty mountain temples, explore the best secret spots.",
  },
};

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const post = await client.fetch(singleBlogPostQuery, { slug: params.slug }, { next: { revalidate: 0 } }).catch(() => null);
  const fallback = fallbackBlogs[params.slug];
  const postTitle = post?.title || fallback?.title || "Blog Article";

  return {
    title: `${postTitle} — Rebel Rover Blog`,
    description: post?.excerpt || fallback?.excerpt || "Read this article on Rebel Rover.",
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const [postData, allLivePosts] = await Promise.all([
    client.fetch(singleBlogPostQuery, { slug: params.slug }, { next: { revalidate: 0 } }).catch(() => null),
    client.fetch(blogPostsQuery, {}, { next: { revalidate: 0 } }).catch(() => null),
  ]);

  const fallback = fallbackBlogs[params.slug];

  if (!postData && !fallback) {
    notFound();
  }

  const post = {
    title: postData?.title || fallback.title,
    author: postData?.author || fallback.author || "Admin",
    publishedDate: postData?.publishedDate || fallback.publishedDate || "Recent",
    category: postData?.category || fallback.category || "Stories",
    coverImage: postData?.coverImage || fallback.coverImage || "/images/blog-banner.png",
    featuredImage: postData?.coverImage || fallback.featuredImage || "/images/blog-post-1.png",
    middleImage: fallback?.middleImage || "/images/blog-post-2.png",
    tags: postData?.tags || fallback.tags || ["Travel", "Destination"],
    body: postData?.body,
    excerpt: postData?.excerpt || fallback.excerpt,
  };

  // Recent posts for sidebar (excluding current post)
  const recentPostsList = allLivePosts && allLivePosts.length > 0
    ? allLivePosts.filter((p: any) => p.slug !== params.slug).slice(0, 3).map((p: any) => ({
        thumbnail: p.coverImage || "/images/home-img-2.png",
        title: p.title,
        date: p.publishedDate || "Recent",
        url: `/blog/${p.slug}`,
      }))
    : Object.keys(fallbackBlogs)
        .filter((s) => s !== params.slug)
        .slice(0, 3)
        .map((s) => ({
          thumbnail: fallbackBlogs[s].featuredImage,
          title: fallbackBlogs[s].title,
          date: fallbackBlogs[s].publishedDate,
          url: `/blog/${s}`,
        }));

  // Related articles for bottom grid
  const relatedGridItems = allLivePosts && allLivePosts.length > 0
    ? allLivePosts.filter((p: any) => p.slug !== params.slug).slice(0, 3).map((p: any) => ({
        id: p._id,
        image: p.coverImage || "/images/home-img-1.png",
        category_label: p.category || "Travel",
        title: p.title,
        excerpt: p.excerpt || "Explore world-class travel stories and curated experiences.",
        published_date: p.publishedDate || "Recent",
        read_more_url: `/blog/${p.slug}`,
      }))
    : Object.keys(fallbackBlogs)
        .filter((s) => s !== params.slug)
        .slice(0, 3)
        .map((s) => ({
          id: s,
          image: fallbackBlogs[s].featuredImage,
          category_label: fallbackBlogs[s].category,
          title: fallbackBlogs[s].title,
          excerpt: fallbackBlogs[s].excerpt,
          published_date: fallbackBlogs[s].publishedDate,
          read_more_url: `/blog/${s}`,
        }));

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Banner */}
      <section className="relative min-h-[340px] sm:min-h-[420px] w-full flex items-center justify-center overflow-hidden py-16">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1.5px]" />

        <Container size="content" className="relative z-10 text-center px-4 sm:px-8 max-w-4xl pt-12">
          {/* Breadcrumb & Category Badge */}
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to All Blogs</span>
            </Link>
            <span className="bg-orange-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 className="font-poppins font-bold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight drop-shadow-md">
            {post.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs sm:text-sm text-white/90 font-medium">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-orange-400" />
              <span>By {post.author}</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>{post.publishedDate}</span>
            </span>
          </div>
        </Container>
      </section>

      {/* 2. Main Article Body & Sidebar */}
      <section className="py-16 sm:py-24 bg-white">
        <Container size="content" className="px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Article Body & Comment Form (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              <article className="space-y-8 font-poppins">
                {/* Main Featured Image */}
                <div className="relative h-[340px] sm:h-[460px] w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>

                {/* Excerpt / Intro Paragraph */}
                <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-normal">
                  {post.excerpt}
                </p>

                <p className="text-sm sm:text-base text-[#6c6c6c] leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                {/* Section Subheading */}
                <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-black pt-4">
                  Discovering the Untouched Beauty
                </h2>

                <p className="text-sm sm:text-base text-[#6c6c6c] leading-relaxed">
                  Mauris tempor tellus ante, ut fermentum erat gravida vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nec justo dui. Ut et consequat dui, a malesuada ipsum. Pellentesque nec turpis viverra, blandit mi a, accumsan justo.
                </p>

                {/* Middle Supporting Image */}
                <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={post.middleImage}
                    alt="Scenic Travel View"
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <p className="text-sm sm:text-base text-[#6c6c6c] leading-relaxed">
                  Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.
                </p>

                {/* Tags & Social Share Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Tags */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#6c6c6c] flex-wrap">
                    <span className="font-semibold text-black flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-orange-500" />
                      Tags:
                    </span>
                    {post.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/blog?category=${encodeURIComponent(tag)}`}
                        className="bg-gray-100 hover:bg-black hover:text-white transition-colors px-3 py-1 rounded-full text-xs font-medium text-black"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  {/* Share This */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#6c6c6c]">
                    <span className="font-semibold text-black">Share:</span>
                    <div className="flex items-center gap-2">
                      <button aria-label="Share on Facebook" className="w-8 h-8 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all hover:scale-105">
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button aria-label="Share on Twitter" className="w-8 h-8 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all hover:scale-105">
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button aria-label="Share on LinkedIn" className="w-8 h-8 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all hover:scale-105">
                        <Linkedin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Comment Form Card */}
              <CommentForm
                fields={{
                  heading: "Leave a Reply",
                  description: "Your email address will not be published. Required fields are marked *",
                  submit_label: "Post Comment",
                }}
              />
            </div>

            {/* Right Column: Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8 sticky top-28">
              <SidebarCategories
                fields={{
                  heading: "Categories",
                  items: [
                    { label: "All Categories", url: "/blog" },
                    { label: "Stories", url: "/blog?category=Stories" },
                    { label: "Tips", url: "/blog?category=Tips" },
                    { label: "Travel Deals", url: "/blog?category=Travel+Deals" },
                    { label: "Eco Travel", url: "/blog?category=Eco+Travel" },
                    { label: "Adventure", url: "/blog?category=Adventure" },
                  ],
                }}
              />

              <SidebarRecentPosts
                fields={{
                  heading: "Recent Posts",
                  items: recentPostsList,
                }}
              />

              <CtaContactCard
                fields={{
                  heading: "Have Any Question?",
                  description: "Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.",
                  phone: "+62 6943 6956",
                  email: "contact@domain.com",
                }}
              />
            </aside>
          </div>
        </Container>
      </section>

      {/* 3. Related Articles Card Grid */}
      {relatedGridItems.length > 0 && (
        <BlogCardGrid
          fields={{
            heading: "Related Articles",
            subheading: "Explore more travel stories and tips from our world travelers",
            items: relatedGridItems,
          }}
        />
      )}
    </main>
  );
}
