import { defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "About Us Page Content",
    }),

    // --- Hero ---
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "About Us",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb Label",
      type: "string",
      initialValue: "Home > About Us",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),

    // --- Feature Blocks ---
    defineField({
      name: "featureBlocks",
      title: "Feature Blocks (Teamwork, Vision, Mission)",
      type: "array",
      of: [
        {
          type: "object",
          name: "featureItem",
          fields: [
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              options: {
                list: [
                  { title: "Users (Great teamwork)", value: "users" },
                  { title: "Rocket (Our vision)", value: "rocket" },
                  { title: "Trending Up (Our mission)", value: "trending-up" },
                ],
              },
              initialValue: "users",
            },
            { name: "title", title: "Feature Title", type: "string" },
            { name: "description", title: "Feature Description", type: "text", rows: 3 },
          ],
        },
      ],
    }),

    // --- Founder Quote ---
    defineField({
      name: "founderImage",
      title: "Founder Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "founderName",
      title: "Founder Name",
      type: "string",
      initialValue: "Siti Sarah",
    }),
    defineField({
      name: "founderTitle",
      title: "Founder Title / Role",
      type: "string",
      initialValue: "Founder Travosca",
    }),
    defineField({
      name: "founderParagraphs",
      title: "Founder Quote Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),

    // --- Stats Counters ---
    defineField({
      name: "statsBackgroundImage",
      title: "Stats Section Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stats",
      title: "Stats Counters",
      type: "array",
      of: [
        {
          type: "object",
          name: "statItem",
          fields: [
            {
              name: "icon",
              title: "Icon Name",
              type: "string",
              options: {
                list: [
                  { title: "Users", value: "users" },
                  { title: "User", value: "user" },
                  { title: "Mountain", value: "mountain" },
                  { title: "Award", value: "award" },
                ],
              },
              initialValue: "users",
            },
            { name: "number", title: "Stat Number (e.g. 126 +)", type: "string" },
            { name: "label", title: "Stat Label (e.g. Satisfied Client)", type: "string" },
          ],
        },
      ],
    }),

    // --- Gallery ---
    defineField({
      name: "galleryEyebrow",
      title: "Gallery Eyebrow Tag",
      type: "string",
      initialValue: "Gallery",
    }),
    defineField({
      name: "galleryHeading",
      title: "Gallery Heading",
      type: "string",
      initialValue: "Unforgettable moment",
    }),
    defineField({
      name: "galleryItems",
      title: "Gallery Moments (Images & Captions)",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryPhoto",
          fields: [
            { name: "image", title: "Photo", type: "image", options: { hotspot: true } },
            { name: "captionLabel", title: "Destination / Location Name (e.g. Bali, Paris)", type: "string" },
          ],
        },
      ],
    }),
  ],
});
