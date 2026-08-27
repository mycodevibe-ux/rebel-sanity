import { ImageAsset, LinkItem, SEOData } from "./content";

// Base Row Settings
export interface RowSettings {
  id?: string;
  paddingTop?: string;
  paddingBottom?: string;
  backgroundColor?: string;
  className?: string;
}

// -------------------------------------------------------------
// Row Field Interfaces (Strictly per §5 of Analysis)
// -------------------------------------------------------------

// 1. Hero / Search Row (Home only)
export interface HeroSearchFields {
  title: string;
  subtitle: string;
  popular_places: string;
  background_image: string;
  foreground_image?: string;
  search_defaults: {
    location_placeholder: string;
    date_placeholder: string;
    people_placeholder: string;
  };
  cta_label: string;
  cta_link: string;
}

// 2. Inner Page Hero (About, Package, Blog, Contact)
export interface InnerPageHeroFields {
  title: string;
  breadcrumb_label: string;
  background_image: string;
  meta?: {
    author?: string;
    date?: string;
    category?: string;
    tags?: string[];
  };
}

// 3. Service Grid (Why Choose Us)
export interface ServiceCardItem {
  icon: string;
  title: string;
  description: string;
  link_label: string;
  link_url: string;
}

export interface ServiceGridFields {
  heading: string;
  subheading: string;
  items: ServiceCardItem[];
}

// 4. Asymmetric Card Repeater (Explore / Tips & Articles)
export interface AsymmetricFeatureItem {
  image: string;
  caption_title?: string;
  caption_text?: string;
  quote_text?: string;
  quote_author?: string;
}

export interface AsymmetricFeatureFields {
  heading: string;
  subheading: string;
  featured_item: AsymmetricFeatureItem;
  secondary_items: AsymmetricFeatureItem[];
  cta_label?: string;
  cta_url?: string;
}

// 5. Partner Logos
export interface PartnerLogoItem {
  image: string;
  alt_text: string;
  link_url?: string;
}

export interface PartnerLogosFields {
  heading: string;
  subheading: string;
  logos: PartnerLogoItem[];
}

// 6. Testimonials
export interface TestimonialItem {
  avatar_image: string;
  name: string;
  role: string;
  quote_text: string;
  rating: number; // 1-5
}

export interface TestimonialsFields {
  eyebrow?: string;
  heading: string;
  subheading: string;
  items: TestimonialItem[];
}

// 7. Destination Card Grid (Package listing)
export interface DestinationCardItem {
  id: string;
  image: string;
  name: string;
  price: string;
  duration_label: string;
  description: string;
  rating: number;
  booking_cta_label: string;
  booking_cta_url: string;
}

export interface DestinationCardGridFields {
  heading: string;
  subheading: string;
  cta_label?: string;
  cta_url?: string;
  items: DestinationCardItem[];
}

// 8. Blog Card Grid
export interface BlogCardItem {
  id: string;
  image: string;
  category_label: string;
  title: string;
  excerpt: string;
  read_more_url: string;
  published_date: string;
}

export interface BlogCardGridFields {
  heading: string;
  subheading: string;
  cta_label?: string;
  cta_url?: string;
  items: BlogCardItem[];
}

// 9. Article Body (Single Blog Detail)
export interface RichTextBlock {
  type: "paragraph" | "image" | "quote" | "heading";
  content: string;
  caption?: string;
}

export interface ArticleBodyFields {
  featured_image: string;
  title: string;
  body_richtext: RichTextBlock[];
  tags: string[];
  share_enabled: boolean;
}

// 10. Sidebar: Categories
export interface SidebarCategoryItem {
  label: string;
  url: string;
  count?: number;
}

export interface SidebarCategoriesFields {
  heading: string;
  items: SidebarCategoryItem[];
}

// 11. Sidebar: Recent Posts
export interface SidebarRecentPostItem {
  thumbnail: string;
  title: string;
  date: string;
  url: string;
}

export interface SidebarRecentPostsFields {
  heading: string;
  items: SidebarRecentPostItem[];
}

// 12. Sidebar: CTA Contact Card (Have a Question)
export interface CtaContactCardFields {
  background_image: string;
  heading: string;
  description: string;
  phone: string;
  email: string;
}

// 13. Comment Form
export interface CommentFormFields {
  heading: string;
  description: string;
  submit_label: string;
}

// 14. Contact Info Grid
export interface ContactInfoItem {
  title?: string;
  address: string;
  phone: string;
  email: string;
}

export interface ContactInfoGridFields {
  items: ContactInfoItem[];
}

// 15. Contact Form Card
export interface ContactFormCardFields {
  decorative_image: string;
  form_heading?: string;
  submit_label: string;
}

// 16. Stats / Counters (About Us)
export interface StatCounterItem {
  icon: string;
  number: string;
  label: string;
}

export interface StatsCountersFields {
  background_image: string;
  items: StatCounterItem[];
}

// 17. Gallery (About Us)
export interface GalleryItem {
  image: string;
  caption_label: string;
}

export interface GalleryFields {
  eyebrow?: string;
  heading: string;
  items: GalleryItem[];
}

// 18. Founder Quote Row (About Us)
export interface FounderQuoteFields {
  image: string;
  quote_icon?: string;
  body_paragraphs: string[];
  name: string;
  title: string;
}

// 19. Feature Blocks (About Us Mission/Vision/Teamwork)
export interface FeatureBlockItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureBlocksFields {
  items: FeatureBlockItem[];
}

// -------------------------------------------------------------
// Row Union Types
// -------------------------------------------------------------

export type RowType =
  | "hero_search"
  | "inner_page_hero"
  | "service_grid"
  | "card_repeater_asymmetric"
  | "partner_logos"
  | "testimonials"
  | "destination_card_grid"
  | "blog_card_grid"
  | "article_body"
  | "sidebar_categories"
  | "sidebar_recent_posts"
  | "cta_contact_card"
  | "comment_form"
  | "contact_info_grid"
  | "contact_form_card"
  | "stats_counters"
  | "gallery"
  | "founder_quote"
  | "feature_blocks";

export interface BaseRow<TType extends RowType, TFields> {
  id: string;
  type: TType;
  settings?: RowSettings;
  fields: TFields;
}

export type HeroSearchRow = BaseRow<"hero_search", HeroSearchFields>;
export type InnerPageHeroRow = BaseRow<"inner_page_hero", InnerPageHeroFields>;
export type ServiceGridRow = BaseRow<"service_grid", ServiceGridFields>;
export type AsymmetricFeatureRow = BaseRow<"card_repeater_asymmetric", AsymmetricFeatureFields>;
export type PartnerLogosRow = BaseRow<"partner_logos", PartnerLogosFields>;
export type TestimonialsRow = BaseRow<"testimonials", TestimonialsFields>;
export type DestinationCardGridRow = BaseRow<"destination_card_grid", DestinationCardGridFields>;
export type BlogCardGridRow = BaseRow<"blog_card_grid", BlogCardGridFields>;
export type ArticleBodyRow = BaseRow<"article_body", ArticleBodyFields>;
export type SidebarCategoriesRow = BaseRow<"sidebar_categories", SidebarCategoriesFields>;
export type SidebarRecentPostsRow = BaseRow<"sidebar_recent_posts", SidebarRecentPostsFields>;
export type CtaContactCardRow = BaseRow<"cta_contact_card", CtaContactCardFields>;
export type CommentFormRow = BaseRow<"comment_form", CommentFormFields>;
export type ContactInfoGridRow = BaseRow<"contact_info_grid", ContactInfoGridFields>;
export type ContactFormCardRow = BaseRow<"contact_form_card", ContactFormCardFields>;
export type StatsCountersRow = BaseRow<"stats_counters", StatsCountersFields>;
export type GalleryRow = BaseRow<"gallery", GalleryFields>;
export type FounderQuoteRow = BaseRow<"founder_quote", FounderQuoteFields>;
export type FeatureBlocksRow = BaseRow<"feature_blocks", FeatureBlocksFields>;

export type Row =
  | HeroSearchRow
  | InnerPageHeroRow
  | ServiceGridRow
  | AsymmetricFeatureRow
  | PartnerLogosRow
  | TestimonialsRow
  | DestinationCardGridRow
  | BlogCardGridRow
  | ArticleBodyRow
  | SidebarCategoriesRow
  | SidebarRecentPostsRow
  | CtaContactCardRow
  | CommentFormRow
  | ContactInfoGridRow
  | ContactFormCardRow
  | StatsCountersRow
  | GalleryRow
  | FounderQuoteRow
  | FeatureBlocksRow;

// -------------------------------------------------------------
// Page & Global Layout Types
// -------------------------------------------------------------

export interface Page {
  id: string;
  title: string;
  slug: string;
  seo?: SEOData;
  rows: Row[];
}

export interface HeaderData {
  logo: {
    src: string;
    alt: string;
    textLogo?: {
      brand: string;
      tagline: string;
    };
  };
  navLinks: Array<{
    label: string;
    href: string;
    hasDropdown?: boolean;
  }>;
  searchEnabled: boolean;
}

export interface NewsletterSubscribeData {
  heading: string;
  subtext: string;
  input_placeholder: string;
  cta_label: string;
  background_image?: string;
}

export interface FooterData {
  subscribe_newsletter: NewsletterSubscribeData;
  logo: {
    src: string;
    alt: string;
    textLogo?: {
      brand: string;
      tagline: string;
    };
  };
  blurb_text: string;
  contact_info: {
    address: string;
    phone: string;
    email: string;
  };
  quick_links: Array<{
    label: string;
    href: string;
  }>;
  social_links: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  copyright_text: string;
}

export interface GlobalSettings {
  header: HeaderData;
  footer: FooterData;
}
