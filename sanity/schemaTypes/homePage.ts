import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      placeholder: "Home Page Content",
      initialValue: "Home Page Content",
    }),

    // --- Hero Section ---
    defineField({
      name: "heroTitle",
      title: "Hero Main Title",
      type: "text",
      rows: 2,
      placeholder: "Make in\nyour journey.",
      initialValue: "Make in\nyour journey.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      placeholder: "Explore the world with what you love beautiful natural beauty.",
      initialValue: "Explore the world with what you love beautiful natural beauty.",
    }),
    defineField({
      name: "popularPlaces",
      title: "Popular Places Text",
      type: "string",
      placeholder: "Popular Place : Bali, Istanbul, Rome, Paris.",
      initialValue: "Popular Place : Bali, Istanbul, Rome, Paris.",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero Search/CTA Button Label",
      type: "string",
      placeholder: "Explore now",
      initialValue: "Explore now",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero Button Link",
      type: "string",
      placeholder: "/packages",
      initialValue: "/packages",
    }),

    // --- Explore Asymmetric Section ---
    defineField({
      name: "exploreHeading",
      title: "Explore Section Heading",
      type: "text",
      rows: 2,
      placeholder: "Explore new worlds with\nexotic natural scenery",
      initialValue: "Explore new worlds with\nexotic natural scenery",
    }),
    defineField({
      name: "exploreSubheading",
      title: "Explore Section Subheading",
      type: "text",
      rows: 2,
      placeholder: "Explore the world with what you love beautiful natural beauty.",
      initialValue: "Explore the world with what you love beautiful natural beauty.",
    }),
    defineField({
      name: "exploreFeaturedItem",
      title: "Featured Big Card",
      type: "object",
      fields: [
        { name: "image", title: "Image", type: "image", options: { hotspot: true } },
        { name: "captionTitle", title: "Caption Title (e.g. Bali, Indonesia.)", type: "string", placeholder: "Bali, Indonesia." },
        { name: "captionText", title: "Caption Text", type: "text", rows: 2, placeholder: "Bali is a beautiful tourist spot and is visited by many travelers." },
      ],
    }),
    defineField({
      name: "exploreSecondaryItems",
      title: "Secondary Cards (2 Cards)",
      type: "array",
      of: [
        {
          type: "object",
          name: "secondaryCard",
          fields: [
            { name: "image", title: "Card Image", type: "image", options: { hotspot: true } },
            { name: "captionTitle", title: "Caption Title", type: "string" },
            { name: "captionText", title: "Caption Text", type: "text", rows: 2 },
          ],
        },
      ],
    }),

    // --- Services Section Header ---
    defineField({
      name: "servicesHeading",
      title: "Why Choose Us Heading",
      type: "string",
      placeholder: "Why choose Us?",
      initialValue: "Why choose Us?",
    }),
    defineField({
      name: "servicesSubheading",
      title: "Why Choose Us Subheading",
      type: "string",
      placeholder: "our services have been trusted by world travelers.",
      initialValue: "our services have been trusted by world travelers.",
    }),

    // --- Tour Partners Section ---
    defineField({
      name: "partnersHeading",
      title: "Tour Partners Heading",
      type: "string",
      placeholder: "Our tour partner",
      initialValue: "Our tour partner",
    }),
    defineField({
      name: "partnersSubheading",
      title: "Tour Partners Subheading",
      type: "text",
      rows: 2,
      placeholder: "There are many variation of passage of lorem ipsum available but the majority have suffered alteration",
      initialValue: "There are many variation of passage of lorem ipsum available but the majority have suffered alteration",
    }),
    defineField({
      name: "partnerLogos",
      title: "Partner Logos List",
      type: "array",
      of: [
        {
          type: "object",
          name: "partnerLogo",
          fields: [
            { name: "image", title: "Logo Image", type: "image" },
            { name: "altText", title: "Partner / Brand Name", type: "string" },
          ],
        },
      ],
    }),

    // --- Testimonials Section Header ---
    defineField({
      name: "testimonialsEyebrow",
      title: "Testimonials Eyebrow Tag",
      type: "string",
      placeholder: "TESTIMONIAL",
      initialValue: "TESTIMONIAL",
    }),
    defineField({
      name: "testimonialsHeading",
      title: "Testimonials Heading",
      type: "string",
      placeholder: "What our client say",
      initialValue: "What our client say",
    }),
    defineField({
      name: "testimonialsSubheading",
      title: "Testimonials Subheading",
      type: "string",
      placeholder: "Create a visual identity for your company and a overall brand",
      initialValue: "Create a visual identity for your company and a overall brand",
    }),
  ],
});
