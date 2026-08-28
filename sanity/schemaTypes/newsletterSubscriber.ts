import { defineField, defineType } from "sanity";

export const newsletterSubscriberType = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Subscriber Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "email",
      date: "subscribedAt",
    },
    prepare({ title, date }) {
      return {
        title: title || "New Subscriber",
        subtitle: date ? `Joined ${new Date(date).toLocaleDateString()}` : "Subscribed",
      };
    },
  },
});
