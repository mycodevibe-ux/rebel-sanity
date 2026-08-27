import { defineField, defineType } from "sanity";

export const packagesPageType = defineType({
  name: "packagesPage",
  title: "Packages Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Travel Packages Page Content",
    }),

    // --- Hero ---
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Travel Packages",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb Label",
      type: "string",
      initialValue: "Home > Package",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),

    // --- Popular Destinations Grid Section ---
    defineField({
      name: "destinationsHeading",
      title: "Destinations Grid Heading",
      type: "string",
      initialValue: "Popular Destination",
    }),
    defineField({
      name: "destinationsSubheading",
      title: "Destinations Grid Subheading",
      type: "text",
      rows: 2,
      initialValue: "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    }),
    defineField({
      name: "destinationsCtaLabel",
      title: "Destinations Bottom CTA Label",
      type: "string",
      initialValue: "Discover more",
    }),
    defineField({
      name: "destinationsCtaUrl",
      title: "Destinations Bottom CTA Link",
      type: "string",
      initialValue: "/packages",
    }),

    // --- Airplane Promo Banner ---
    defineField({
      name: "airplaneBannerImage",
      title: "Airplane Promo Banner Image",
      type: "image",
      options: { hotspot: true },
    }),

    // --- Travel Tips Article ---
    defineField({
      name: "tipsHeading",
      title: "Tips Section Heading",
      type: "string",
      initialValue: "Travel Tips and Advice",
    }),
  ],
});
