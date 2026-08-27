import { Page } from "@/types/cms";

export const packagePageFixture: Page = {
  id: "page-package",
  title: "Packages",
  slug: "packages",
  seo: {
    title: "Travel Packages — Rebel Rover",
    description: "Explore popular travel destinations with Rebel Rover.",
  },
  rows: [
    {
      id: "package-hero",
      type: "inner_page_hero",
      fields: {
        title: "Travel Packages",
        breadcrumb_label: "Home > Package",
        background_image: "/images/Package-banner.png",
      },
    },
    {
      id: "package-destinations",
      type: "destination_card_grid",
      fields: {
        heading: "Popular Destination",
        subheading: "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        cta_label: "Discover more",
        cta_url: "/packages",
        items: [],
      },
    },
    {
      id: "package-airplane",
      type: "airplane_banner",
      fields: {},
    },
    {
      id: "package-tips",
      type: "package_tips_article",
      fields: {},
    },
  ],
};
