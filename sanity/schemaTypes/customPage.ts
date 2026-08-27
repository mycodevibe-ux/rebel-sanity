import { defineField, defineType } from "sanity";

export const customPageType = defineType({
  name: "customPage",
  title: "Custom Pages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      placeholder: "e.g. Privacy Policy, FAQ, Terms of Service, Special Offers",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      description: "Click Generate to create URL path from title (e.g. privacy-policy or faq)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Banner Title",
      type: "string",
      placeholder: "e.g. Frequently Asked Questions",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb Label",
      type: "string",
      placeholder: "e.g. Home > FAQ",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Page Content",
      description: "Add headings, paragraphs, bullet lists, and rich media.",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "heroBackgroundImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled Page",
        subtitle: subtitle ? `/${subtitle}` : "No slug",
        media,
      };
    },
  },
});
