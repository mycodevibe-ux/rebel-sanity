import { getPageBySlug } from "@/lib/cms/client";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { SidebarCategories } from "@/components/sections/SidebarCategories";
import { SidebarRecentPosts } from "@/components/sections/SidebarRecentPosts";
import { CtaContactCard } from "@/components/sections/CtaContactCard";
import { CommentForm } from "@/components/sections/CommentForm";
import { BlogCardGrid } from "@/components/sections/BlogCardGrid";
import type { Metadata } from "next";
import {
  InnerPageHeroRow,
  ArticleBodyRow,
  SidebarCategoriesRow,
  SidebarRecentPostsRow,
  CtaContactCardRow,
  CommentFormRow,
  BlogCardGridRow,
} from "@/types/cms";

export const metadata: Metadata = {
  title: "Travel Stories & Articles — Rebel Rover Blog",
  description: "Read inspiring travel stories, sustainable tourism advice, and practical guides on Rebel Rover.",
};

export default async function BlogPage() {
  const page = await getPageBySlug("blog");

  if (!page) {
    notFound();
  }

  const heroRow = page.rows.find((r) => r.type === "inner_page_hero") as InnerPageHeroRow | undefined;
  const articleRow = page.rows.find((r) => r.type === "article_body") as ArticleBodyRow | undefined;
  const categoriesRow = page.rows.find((r) => r.type === "sidebar_categories") as SidebarCategoriesRow | undefined;
  const recentRow = page.rows.find((r) => r.type === "sidebar_recent_posts") as SidebarRecentPostsRow | undefined;
  const ctaRow = page.rows.find((r) => r.type === "cta_contact_card") as CtaContactCardRow | undefined;
  const commentRow = page.rows.find((r) => r.type === "comment_form") as CommentFormRow | undefined;
  const gridRow = page.rows.find((r) => r.type === "blog_card_grid") as BlogCardGridRow | undefined;

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero */}
      {heroRow && <InnerPageHero fields={heroRow.fields} />}

      {/* 2. Main Blog Article & Sidebar 2-Column Section */}
      <section className="py-16 sm:py-24">
        <Container size="content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Article Body & Comment Form (8 cols) */}
            <div className="lg:col-span-8">
              {articleRow && <ArticleBody fields={articleRow.fields} />}
              {commentRow && <CommentForm fields={commentRow.fields} />}
            </div>

            {/* Right Column: Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8 sticky top-28">
              {categoriesRow && <SidebarCategories fields={categoriesRow.fields} />}
              {recentRow && <SidebarRecentPosts fields={recentRow.fields} />}
              {ctaRow && <CtaContactCard fields={ctaRow.fields} />}
            </aside>
          </div>
        </Container>
      </section>

      {/* 3. Related Articles Card Grid */}
      {gridRow && <BlogCardGrid fields={gridRow.fields} />}
    </main>
  );
}
