import { Page } from "@/types/cms";

export const destinationPageFixture: Page = {
  id: "page-destination",
  title: "Destinations",
  slug: "destination",
  seo: {
    title: "Popular Travel Destinations — Rebel Rover",
    description: "Explore world-class travel destinations and vacation spots with Rebel Rover.",
  },
  rows: [
    {
      id: "destination-hero",
      type: "inner_page_hero",
      fields: {
        title: "Popular Destinations",
        breadcrumb_label: "Home > Destination",
        background_image: "/images/Package-banner.png",
      },
    },
    {
      id: "destination-card-grid",
      type: "destination_card_grid",
      fields: {
        heading: "Popular Destination",
        subheading: "Explore the world with what you love beautiful natural beauty and exotic sceneries.",
        cta_label: "Discover more",
        cta_url: "/destination",
        items: [],
      },
    },
    {
      id: "destination-airplane",
      type: "airplane_banner",
      fields: {},
    },
    {
      id: "destination-tips",
      type: "package_tips_article",
      fields: {},
    },
  ],
};
