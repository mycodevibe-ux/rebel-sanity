import { Page } from "@/types/cms";

export const contactPageFixture: Page = {
  id: "page-contact",
  title: "Contact",
  slug: "contact",
  seo: {
    title: "Contact Us — Rebel Rover",
    description: "Get in touch with Rebel Rover for reservations and support.",
  },
  rows: [
    {
      id: "contact-hero",
      type: "inner_page_hero",
      fields: {
        title: "Contact",
        breadcrumb_label: "Home > Contact",
        background_image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&auto=format&fit=crop&q=85",
      },
    },
    {
      id: "contact-combined-section",
      type: "contact_form_card",
      fields: {
        decorative_image: "",
        form_heading: "Get In Touch",
        submit_label: "Send Message",
      },
    },
  ],
};
