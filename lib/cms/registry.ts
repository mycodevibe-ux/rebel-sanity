import { Row, RowType } from "@/types/cms";

export const ROW_TYPES: Record<RowType, RowType> = {
  hero_search: "hero_search",
  inner_page_hero: "inner_page_hero",
  service_grid: "service_grid",
  card_repeater_asymmetric: "card_repeater_asymmetric",
  partner_logos: "partner_logos",
  testimonials: "testimonials",
  destination_card_grid: "destination_card_grid",
  blog_card_grid: "blog_card_grid",
  article_body: "article_body",
  sidebar_categories: "sidebar_categories",
  sidebar_recent_posts: "sidebar_recent_posts",
  cta_contact_card: "cta_contact_card",
  comment_form: "comment_form",
  contact_info_grid: "contact_info_grid",
  contact_form_card: "contact_form_card",
  stats_counters: "stats_counters",
  gallery: "gallery",
  founder_quote: "founder_quote",
  feature_blocks: "feature_blocks",
};

export function isValidRowType(type: string): type is RowType {
  return type in ROW_TYPES;
}
