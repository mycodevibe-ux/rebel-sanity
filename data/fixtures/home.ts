import { Page } from "@/types/cms";

export const homePageFixture: Page = {
  id: "page-home",
  title: "Home",
  slug: "home",
  seo: {
    title: "Rebel Rover — Make in your journey",
    description: "Explore the world with what you love beautiful natural beauty.",
  },
  rows: [
    {
      id: "home-hero",
      type: "hero_search",
      fields: {
        title: "Make in\nyour journey.",
        subtitle: "Explore the world with what you love beautiful natural beauty.",
        popular_places: "Popular Place : Bali, Istanbul, Rome, Paris.",
        background_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&auto=format&fit=crop&q=90",
        foreground_image: "",
        search_defaults: {
          location_placeholder: "Location",
          date_placeholder: "Date",
          people_placeholder: "People",
        },
        cta_label: "Explore now",
        cta_link: "/packages",
      },
    },
    {
      id: "home-explore",
      type: "card_repeater_asymmetric",
      fields: {
        heading: "Explore new worlds with\nexotic natural scenery",
        subheading: "Explore the world with what you love beautiful natural beauty.",
        featured_item: {
          image: "/images/home-img-2.png",
          caption_title: "Bali, Indonesia.",
          caption_text: "Bali is a beautiful tourist spot and is visited by many travelers.",
          quote_text: "”",
        },
        secondary_items: [
          {
            image: "/images/home-img-1.png",
            caption_title: "Explore new places",
            caption_text: "Great moments with good friends.",
          },
          {
            image: "/images/home-img-3.png",
            caption_title: "Iconic destinations",
            caption_text: "Unforgettable sights and cities.",
          },
        ],
      },
    },
    {
      id: "home-services",
      type: "service_grid",
      fields: {
        heading: "Why choose Us?",
        subheading: "our services have been trusted by world travelers.",
        items: [
          {
            icon: "/images/best-service.png",
            title: "Best Service",
            description: "our service is reliable and convenient, our service is quality.",
            link_label: "Leaern more",
            link_url: "/packages",
          },
          {
            icon: "/images/price.png",
            title: "Price Guarantee",
            description: "our service is reliable and convenient, our service is quality.",
            link_label: "Leaern more",
            link_url: "/packages",
          },
          {
            icon: "/images/handpicked.png",
            title: "Handpicked Hotels",
            description: "our service is reliable and convenient, our service is quality.",
            link_label: "Leaern more",
            link_url: "/packages",
          },
        ],
      },
    },
    {
      id: "home-partners",
      type: "partner_logos",
      fields: {
        heading: "Our tour partner",
        subheading: "There are many variation of passage of lorem ipsum available but the majority have suffered alteration",
        logos: [
          { image: "/images/Katana.svg", alt_text: "Katana" },
          { image: "/images/travava.svg", alt_text: "travava" },
          { image: "/images/bigui.svg", alt_text: "bigui" },
          { image: "/images/Booking.com.svg", alt_text: "Booking.com" },
          { image: "/images/Jakmaen.svg", alt_text: "Jakmaen" },
        ],
      },
    },
    {
      id: "home-testimonials",
      type: "testimonials",
      fields: {
        eyebrow: "TESTIMONIAL",
        heading: "What our client say",
        subheading: "Create a visual identity for your company and a overall brand",
        items: [
          {
            avatar_image: "/images/sara.png",
            name: "Sara Jay",
            role: "Treveller",
            quote_text: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
            rating: 5,
          },
          {
            avatar_image: "/images/danial.png",
            name: "Cristian Daniel",
            role: "Treveller",
            quote_text: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
            rating: 5,
          },
          {
            avatar_image: "/images/hasan.png",
            name: "Kausar Hasan",
            role: "Treveller",
            quote_text: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
            rating: 5,
          },
        ],
      },
    },
  ],
};
