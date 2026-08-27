import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Why Choose Us (Services)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title (e.g. Best Service)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Service Icon Image",
      type: "image",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "link_label",
      title: "Link Label (e.g. Leaern more)",
      type: "string",
      initialValue: "Leaern more",
    }),
    defineField({
      name: "link_url",
      title: "Link URL",
      type: "string",
      initialValue: "/packages",
    }),
  ],
});
