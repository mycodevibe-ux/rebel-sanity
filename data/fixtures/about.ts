import { Page } from "@/types/cms";

export const aboutPageFixture: Page = {
  id: "page-about",
  title: "About Us",
  slug: "about",
  seo: {
    title: "About Us — Rebel Rover",
    description: "Learn more about Rebel Rover, our team, vision, and mission.",
  },
  rows: [
    {
      id: "about-hero",
      type: "inner_page_hero",
      fields: {
        title: "About Us",
        breadcrumb_label: "Home > About Us",
        background_image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&auto=format&fit=crop&q=85",
      },
    },
    {
      id: "about-features",
      type: "feature_blocks",
      fields: {
        items: [
          {
            icon: "users",
            title: "Great team work",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor nunc non neque euismod porttitor. Nullam lacus est, tincidunt eget sapien eget, maximus convallis massa. Curabitur quis tellus a tortor egestas viverra.",
          },
          {
            icon: "rocket",
            title: "Our vision",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..",
          },
          {
            icon: "trending-up",
            title: "Our mision",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..",
          },
        ],
      },
    },
    {
      id: "about-founder",
      type: "founder_quote",
      fields: {
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=85",
        quote_icon: "quote",
        body_paragraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor sapien et urna tincidunt fringilla. Vivamus at augue interdum, blandit arcu quis, laoreet ipsum. In eu ipsum urna. Suspendisse suscipit est et neque.",
          "Mauris tempor tellus ante, ut fermentum erat gravida vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nec justo dui. Ut et consequat dui, a malesuada ipsum. Pellentesque nec turpis viverra, blandit mi a, accumsan justo.",
        ],
        name: "Siti Sarah",
        title: "Founder Travosca",
      },
    },
    {
      id: "about-stats",
      type: "stats_counters",
      fields: {
        background_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=85",
        items: [
          { icon: "users", number: "126 +", label: "Satisfied Client" },
          { icon: "user", number: "230 +", label: "New Traveller" },
          { icon: "mountain", number: "230 +", label: "Destination" },
          { icon: "award", number: "230 +", label: "Award" },
        ],
      },
    },
    {
      id: "about-gallery",
      type: "gallery",
      fields: {
        eyebrow: "Gallery",
        heading: "Unforgettable moment",
        items: [
          {
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=85",
            caption_label: "Bali",
          },
          {
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&auto=format&fit=crop&q=85",
            caption_label: "Dubai",
          },
          {
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=85",
            caption_label: "Paris",
          },
          {
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=85",
            caption_label: "Italy",
          },
        ],
      },
    },
  ],
};
