import { Page } from "@/types/cms";

export const blogPageFixture: Page = {
  id: "page-blog",
  title: "Single Blog",
  slug: "blog",
  seo: {
    title: "Travel Stories For Now and the Future — Rebel Rover Blog",
    description: "Read inspiring travel stories and destination tips on Rebel Rover.",
  },
  rows: [
    {
      id: "blog-hero",
      type: "inner_page_hero",
      fields: {
        title: "Travel Stories For Now\nand the Future",
        breadcrumb_label: "Home > Blog",
        background_image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1920&auto=format&fit=crop&q=85",
        meta: {
          author: "Hasmar",
          date: "January 18, 2021",
          category: "Stories, Tips",
          tags: ["Destintion", "Travel"],
        },
      },
    },
    {
      id: "blog-article",
      type: "article_body",
      fields: {
        featured_image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1000&auto=format&fit=crop&q=85",
        title: "Rice Terraces, Tegallalang",
        body_richtext: [
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
          {
            type: "heading",
            content: "Rice Terraces, Tegallalang",
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
          },
          {
            type: "image",
            content: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&auto=format&fit=crop&q=85",
            caption: "",
          },
          {
            type: "paragraph",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
          },
        ],
        tags: ["Destintion", "Travel"],
        share_enabled: true,
      },
    },
    {
      id: "blog-sidebar-recent",
      type: "sidebar_recent_posts",
      fields: {
        heading: "Recent Post",
        items: [
          {
            thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&auto=format&fit=crop&q=80",
            title: "Travel Stories for Now and the Future",
            date: "14 Dec 2022",
            url: "/blog",
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=200&auto=format&fit=crop&q=80",
            title: "9 Popular Travel Destintion on Sale in 2022",
            date: "14 Dec 2022",
            url: "/blog",
          },
          {
            thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&auto=format&fit=crop&q=80",
            title: "How Are We Going to Travel in 2022?",
            date: "14 Dec 2022",
            url: "/blog",
          },
        ],
      },
    },
    {
      id: "blog-sidebar-categories",
      type: "sidebar_categories",
      fields: {
        heading: "Catagories",
        items: [
          { label: "Travel", url: "/blog" },
          { label: "Tips", url: "/blog" },
          { label: "Stories", url: "/blog" },
          { label: "Destination", url: "/blog" },
        ],
      },
    },
    {
      id: "blog-sidebar-cta",
      type: "cta_contact_card",
      fields: {
        background_image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&auto=format&fit=crop&q=80",
        heading: "Have Any Question?",
        description: "Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.",
        phone: "+62 6943 6956",
        email: "contact@domain.com",
      },
    },
    {
      id: "blog-comment-form",
      type: "comment_form",
      fields: {
        heading: "Leave a Reply",
        description: "Your email address will not be published. Required fields are marked *",
        submit_label: "Post Comment",
      },
    },
  ],
};
