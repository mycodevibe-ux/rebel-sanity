import React from "react";
import { Row } from "@/types/cms";
import { HeroSearch } from "./HeroSearch";
import { InnerPageHero } from "./InnerPageHero";
import { ServiceGrid } from "./ServiceGrid";
import { AsymmetricFeatureRow } from "./AsymmetricFeatureRow";
import { PartnerLogos } from "./PartnerLogos";
import { TestimonialGrid } from "./TestimonialGrid";
import { DestinationCardGrid } from "./DestinationCardGrid";
import { BlogCardGrid } from "./BlogCardGrid";
import { ArticleBody } from "./ArticleBody";
import { SidebarCategories } from "./SidebarCategories";
import { SidebarRecentPosts } from "./SidebarRecentPosts";
import { CtaContactCard } from "./CtaContactCard";
import { CommentForm } from "./CommentForm";
import { ContactInfoGrid } from "./ContactInfoGrid";
import { ContactFormCard } from "./ContactFormCard";
import { StatsCounters } from "./StatsCounters";
import { Gallery } from "./Gallery";
import { FounderQuote } from "./FounderQuote";
import { FeatureBlocks } from "./FeatureBlocks";
import { AirplaneBanner } from "./AirplaneBanner";
import { PackageTipsArticle } from "./PackageTipsArticle";

interface RowRendererProps {
  rows: Row[];
}

export function RowRenderer({ rows }: RowRendererProps) {
  return (
    <div className="w-full flex flex-col">
      {rows.map((row: any) => {
        switch (row.type) {
          case "hero_search":
            return <HeroSearch key={row.id} fields={row.fields} />;

          case "inner_page_hero":
            return <InnerPageHero key={row.id} fields={row.fields} />;

          case "service_grid":
            return <ServiceGrid key={row.id} fields={row.fields} />;

          case "card_repeater_asymmetric":
            return <AsymmetricFeatureRow key={row.id} fields={row.fields} />;

          case "partner_logos":
            return <PartnerLogos key={row.id} fields={row.fields} />;

          case "testimonials":
            return <TestimonialGrid key={row.id} fields={row.fields} />;

          case "destination_card_grid":
            return <DestinationCardGrid key={row.id} fields={row.fields} />;

          case "airplane_banner":
            return <AirplaneBanner key={row.id} />;

          case "package_tips_article":
            return <PackageTipsArticle key={row.id} />;

          case "blog_card_grid":
            return <BlogCardGrid key={row.id} fields={row.fields} />;

          case "article_body":
            return <ArticleBody key={row.id} fields={row.fields} />;

          case "sidebar_categories":
            return <SidebarCategories key={row.id} fields={row.fields} />;

          case "sidebar_recent_posts":
            return <SidebarRecentPosts key={row.id} fields={row.fields} />;

          case "cta_contact_card":
            return <CtaContactCard key={row.id} fields={row.fields} />;

          case "comment_form":
            return <CommentForm key={row.id} fields={row.fields} />;

          case "contact_info_grid":
            return <ContactInfoGrid key={row.id} fields={row.fields} />;

          case "contact_form_card":
            return <ContactFormCard key={row.id} fields={row.fields} />;

          case "stats_counters":
            return <StatsCounters key={row.id} fields={row.fields} />;

          case "gallery":
            return <Gallery key={row.id} fields={row.fields} />;

          case "founder_quote":
            return <FounderQuote key={row.id} fields={row.fields} />;

          case "feature_blocks":
            return <FeatureBlocks key={row.id} fields={row.fields} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
