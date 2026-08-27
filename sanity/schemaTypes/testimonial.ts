import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonials (Client Reviews)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Client Name (e.g. Sara Jay)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Tag (e.g. Treveller)",
      type: "string",
      initialValue: "Treveller",
    }),
    defineField({
      name: "avatar",
      title: "Client Avatar Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "stars",
      title: "Stars (1 to 5)",
      type: "number",
      initialValue: 5,
    }),
    defineField({
      name: "quote",
      title: "Review / Testimonial Text",
      type: "text",
      rows: 3,
    }),
  ],
});
