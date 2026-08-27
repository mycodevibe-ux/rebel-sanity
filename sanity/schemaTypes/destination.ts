import { defineField, defineType } from "sanity";

export const destinationType = defineType({
  name: "destination",
  title: "Destinations & Packages",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Destination Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (e.g. $299.00)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g. 2days / 3days)",
      type: "string",
      initialValue: "3days",
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "rating",
      title: "Rating (Stars 1 to 5)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "booking_cta_label",
      title: "Booking Button Label",
      type: "string",
      initialValue: "Booking now",
    }),
    defineField({
      name: "booking_cta_url",
      title: "Booking Button Link / URL",
      type: "string",
      initialValue: "/contact",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "image",
    },
  },
});
