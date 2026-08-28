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
import { BlogCommentsSection } from "@/components/sections/BlogCommentsSection";
import { BlogCardGrid } from "@/components/sections/BlogCardGrid";
import { Calendar, User, Tag, Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

const SLUG_IMAGE_MAP: Record<string, string> = {
  "travel-stories-for-now-and-the-future": "/images/blog-post-1.png",
  "9-popular-travel-destinations-on-sale": "/images/paris.png",
  "how-are-we-going-to-travel": "/images/bali.png",
  "top-10-hidden-gems-asia": "/images/italy.png",
  "exotic-island-escapes": "/images/dubai.png",
  "essential-travel-packing-guide": "/images/home-img-2.png",
  "blog-1": "/images/blog-post-1.png",
  "blog-2": "/images/paris.png",
  "blog-3": "/images/bali.png",
  "blog-4": "/images/italy.png",
  "blog-5": "/images/dubai.png",
  "blog-6": "/images/home-img-2.png",
};

const DISTINCT_FALLBACK_IMAGES = [
  "/images/blog-post-1.png",
  "/images/paris.png",
  "/images/bali.png",
  "/images/italy.png",
  "/images/dubai.png",
  "/images/home-img-2.png",
  "/images/home-img-1.png",
  "/images/home-img-3.png",
  "/images/blog-post-2.png",
  "/images/article.png",
];

function getPostSlug(p: any): string {
  if (!p) return "";
  if (typeof p.slug === "string") return p.slug;
  if (p.slug?.current) return p.slug.current;
  if (p._id && p._id.startsWith("blog-")) return p._id;
  return "";
}

function getPostImage(p: any, idx: number): string {
  if (p?.coverImage && typeof p.coverImage === "string") return p.coverImage;
  const s = getPostSlug(p);
  if (s && SLUG_IMAGE_MAP[s]) return SLUG_IMAGE_MAP[s];
  return DISTINCT_FALLBACK_IMAGES[idx % DISTINCT_FALLBACK_IMAGES.length];
}

const detailedFallbackBlogs: Record<string, any> = {
  "travel-stories-for-now-and-the-future": {
    title: "Travel Stories For Now and the Future",
    author: "Hasmar",
    publishedDate: "January 18, 2024",
    category: "Stories",
    coverImage: "/images/blog-banner.png",
    featuredImage: "/images/blog-post-1.png",
    middleImage: "/images/blog-post-2.png",
    tags: ["Destination", "Stories"],
    intro:
      "Travel is more than just crossing borders; it is about rediscovering our connection with the world, understanding varied cultures, and creating timeless memories that remain with us forever.",
    heading1: "Rice Terraces & Untouched Landscapes",
    paragraph1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    paragraph2:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Traveling responsibly allows future generations to witness the exotic sceneries we cherish today.",
  },
  "9-popular-travel-destinations-on-sale": {
    title: "9 Popular Travel Destinations on Sale in 2024",
    author: "David Miller",
    publishedDate: "14 Dec 2023",
    category: "Travel Deals",
    coverImage: "/images/paris.png",
    featuredImage: "/images/paris.png",
    middleImage: "/images/Package-banner.png",
    tags: ["Deals", "Packages"],
    intro:
      "Looking for your next dream getaway without breaking the bank? We have curated the top 9 most sought-after destinations offering seasonal discounts and all-inclusive packages.",
    heading1: "From European Capitals to Romantic Getaways",
    paragraph1:
      "Whether you are wandering through the romantic cobblestone streets of Paris or admiring the historic architecture of European old towns, budget-friendly luxury travel is more accessible in 2024 than ever before.",
    paragraph2:
      "Booking early and taking advantage of customized tour itineraries guarantees optimal flight deals, five-star handpicked hotel stays, and authentic cultural tours guided by certified experts.",
  },
  "how-are-we-going-to-travel": {
    title: "How Are We Going to Travel Sustainably in 2024?",
    author: "Siti Sarah",
    publishedDate: "10 Nov 2023",
    category: "Eco Travel",
    coverImage: "/images/bali.png",
    featuredImage: "/images/bali.png",
    middleImage: "/images/home-img-3.png",
    tags: ["Eco", "Tips"],
    intro:
      "Sustainable tourism is shaping the future of global exploration. Discover how conscious travelers are minimizing environmental footprints while actively supporting local communities.",
    heading1: "Embracing Low-Impact & Eco-Friendly Adventures",
    paragraph1:
      "Choosing eco-certified lodges, eliminating single-use plastics, and participating in community-led conservation tours help preserve delicate marine ecosystems and sacred mountain reserves.",
    paragraph2:
      "By traveling mindfully and respecting cultural traditions, we turn every journey into a positive force for social and ecological preservation across global destinations.",
  },
  "top-10-hidden-gems-asia": {
    title: "Top 10 Hidden Gems in South East Asia You Must Visit",
    author: "Cristian Daniel",
    publishedDate: "05 Oct 2023",
    category: "Adventure",
    coverImage: "/images/italy.png",
    featuredImage: "/images/italy.png",
    middleImage: "/images/home-img-1.png",
    tags: ["Asia", "Adventure"],
    intro:
      "Venture off the beaten path and explore secluded islands, ancient cliff temples, and serene rainforest sanctuaries hidden deep within Southeast Asia.",
    heading1: "Secret Waterfalls & Untamed Archipelago Trails",
    paragraph1:
      "Far from crowded tourist corridors lie pristine turquoise lagoons, remote limestone karsts, and emerald rice valleys preserved in authentic natural splendor.",
    paragraph2:
      "Local homestays and guided trek expeditions provide rare glimpses into traditional folklore, exotic culinary heritage, and unspoiled wilderness.",
  },
  "exotic-island-escapes": {
    title: "Exotic Desert & Futuristic Wonders in Dubai",
    author: "Kausar Hasan",
    publishedDate: "15 Aug 2023",
    category: "Destination",
    coverImage: "/images/dubai.png",
    featuredImage: "/images/dubai.png",
    middleImage: "/images/aboutbg.png",
    tags: ["Destination", "Dubai"],
    intro:
      "Experience the captivating blend of golden Arabian dunes and futuristic architectural marvels in Dubai. Discover luxury desert safaris, sky-high dining, and sunset boat cruises.",
    heading1: "Majestic Dunes & Modern Skylines",
    paragraph1:
      "From dune bashing across crimson sands to standing atop the highest observation decks in the world, Dubai offers unparalleled luxury and world-class hospitality.",
    paragraph2:
      "Explore historic gold souks, vibrant spice markets, and serene palm-fringed private beaches that make this city an essential stop on any world itinerary.",
  },
  "essential-travel-packing-guide": {
    title: "The Ultimate Travel Packing Guide for World Explorers",
    author: "Sara Jay",
    publishedDate: "22 Sep 2023",
    category: "Tips",
    coverImage: "/images/home-img-2.png",
    featuredImage: "/images/home-img-2.png",
    middleImage: "/images/article.png",
    tags: ["Tips", "Guide"],
    intro:
      "Smart packing is the foundation of every stress-free journey. Master the art of minimalist, versatile travel gear tailored for any climate or adventure.",
    heading1: "Pack Light, Travel Far: The Essential Checklist",
    paragraph1:
      "From breathable merino wool layers to universal power adapters and waterproof organizers, selecting multifunctional gear maximizes comfort and saves baggage fees.",
    paragraph2:
      "Always leave room in your luggage for unique handcrafted souvenirs and keepsakes gathered from local bazaars and artisan markets.",
  },
};

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const post = await client
    .fetch(singleBlogPostQuery, { slug: params.slug }, { next: { revalidate: 0 } })
    .catch(() => null);

  const fallback = detailedFallbackBlogs[params.slug];
  const postTitle = post?.title || fallback?.title || "Blog Article";

  return {
    title: `${postTitle} — Rebel Rover Blog`,
    description: post?.excerpt || fallback?.intro || "Read this article on Rebel Rover.",
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const [postData, allLivePosts] = await Promise.all([
    client.fetch(singleBlogPostQuery, { slug: params.slug }, { next: { revalidate: 0 } }).catch(() => null),
    client.fetch(blogPostsQuery, {}, { next: { revalidate: 0 } }).catch(() => null),
  ]);

  const fallback =
    detailedFallbackBlogs[params.slug] ||
    detailedFallbackBlogs["travel-stories-for-now-and-the-future"];

  const matchedSlugImage = SLUG_IMAGE_MAP[params.slug] || fallback.featuredImage;

  const post = {
    title: postData?.title || fallback.title,
    author: postData?.author || fallback.author || "Admin",
    publishedDate: postData?.publishedDate || fallback.publishedDate || "Recent",
    category: postData?.category || fallback.category || "Stories",
    coverImage: postData?.coverImage || matchedSlugImage || "/images/blog-banner.png",
    featuredImage: postData?.coverImage || matchedSlugImage || "/images/blog-post-1.png",
    middleImage: fallback.middleImage || "/images/blog-post-2.png",
    tags: postData?.tags || fallback.tags || ["Travel", "Destination"],
    intro: postData?.excerpt || fallback.intro,
    heading1: fallback.heading1,
    paragraph1: fallback.paragraph1,
    paragraph2: fallback.paragraph2,
  };

  // Recent posts for sidebar with 100% DISTINCT thumbnail images (excluding current post)
  const rawRecentList =
    allLivePosts && allLivePosts.length > 0
      ? allLivePosts.filter((p: any) => getPostSlug(p) !== params.slug)
      : Object.keys(detailedFallbackBlogs)
          .filter((s) => s !== params.slug)
          .map((s) => ({ slug: s, ...detailedFallbackBlogs[s] }));

  const recentPostsList = rawRecentList.slice(0, 3).map((p: any, idx: number) => {
    const slugStr = getPostSlug(p) || `post-${idx + 1}`;
    return {
      thumbnail: getPostImage(p, idx + 1), // Offset by 1 to guarantee distinct image
      title: p.title,
      date: p.publishedDate || "Recent",
      url: `/blog/${slugStr}`,
    };
  });

  // Related articles for bottom grid with 100% DISTINCT images
  const relatedGridItems = rawRecentList.slice(0, 3).map((p: any, idx: number) => {
    const slugStr = getPostSlug(p) || `post-${idx + 1}`;
    return {
      id: p._id || slugStr,
      image: getPostImage(p, idx + 2), // Offset by 2 for unique bottom grid cards
      category_label: p.category || "Travel",
      title: p.title,
      excerpt: p.excerpt || p.intro || "Explore world-class travel stories and curated experiences.",
      published_date: p.publishedDate || "Recent",
      read_more_url: `/blog/${slugStr}`,
    };
  });

  return (
    <main className="min-h-screen bg-white font-poppins">
      {/* 1. Large Hero Banner */}
      <section className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] w-full flex items-center justify-center overflow-hidden py-24">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover object-center brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1.5px]" />

        <Container size="content" className="relative z-10 text-center px-4 sm:px-8 max-w-4xl pt-16">
          {/* Back button & Category Badge */}
          <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/95 hover:text-white transition-all bg-white/15 backdrop-blur-md px-5 py-2 rounded-full border border-white/25 hover:bg-white/25 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>
            <span className="bg-orange-500 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
              {post.category}
            </span>
          </div>

          <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-2xl">
            {post.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex items-center justify-center gap-8 mt-7 text-xs sm:text-base text-white/95 font-medium">
            <span className="flex items-center gap-2.5">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <span>By {post.author}</span>
            </span>
            <span className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <span>{post.publishedDate}</span>
            </span>
          </div>
        </Container>
      </section>

      {/* 2. Main Article Body & Sidebar */}
      <section className="py-20 sm:py-28 bg-white">
        <Container size="content" className="px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Article Body & Comment Form (8 cols) */}
            <div className="lg:col-span-8 space-y-14">
              <article className="space-y-9 font-poppins">
                {/* Main Featured Image */}
                <div className="relative h-[380px] sm:h-[520px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>

                {/* Excerpt / Intro Paragraph */}
                <p className="text-lg sm:text-xl text-black font-semibold leading-relaxed">
                  {post.intro}
                </p>

                <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                  {post.paragraph1}
                </p>

                {/* Section Subheading */}
                <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-black pt-4">
                  {post.heading1}
                </h2>

                <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                  {post.paragraph2}
                </p>

                {/* Middle Supporting Image */}
                <div className="relative h-[320px] sm:h-[440px] w-full rounded-3xl overflow-hidden shadow-md border border-gray-100">
                  <Image
                    src={post.middleImage}
                    alt="Supporting Travel Experience"
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                  Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula.
                </p>

                {/* Tags & Social Share Bar */}
                <div className="pt-9 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Tags */}
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#6c6c6c] flex-wrap">
                    <span className="font-bold text-black flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-orange-500" />
                      Tags:
                    </span>
                    {post.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/blog?category=${encodeURIComponent(tag)}`}
                        className="bg-gray-100 hover:bg-black hover:text-white transition-colors px-4 py-1.5 rounded-full text-xs font-semibold text-black"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>

                  {/* Share This */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-[#6c6c6c]">
                    <span className="font-bold text-black">Share:</span>
                    <div className="flex items-center gap-2">
                      <button aria-label="Share on Facebook" className="w-9 h-9 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm">
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button aria-label="Share on Twitter" className="w-9 h-9 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm">
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button aria-label="Share on LinkedIn" className="w-9 h-9 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center transition-all hover:scale-105 shadow-sm">
                        <Linkedin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Live Comments & Comment Form */}
              <BlogCommentsSection postSlug={post.slug} postTitle={post.title} />
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
                    { label: "Destination", url: "/blog?category=Destination" },
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
