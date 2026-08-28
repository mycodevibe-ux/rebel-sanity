import { defineField, defineType } from "sanity";

export const newsletterSubscriberType = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Subscriber Email Address",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Subscription Status",
      type: "string",
      initialValue: "Active",
      options: {
        list: [
          { title: "Active (Subscribed)", value: "Active" },
          { title: "Unsubscribed", value: "Unsubscribed" },
        ],
      },
    }),
    defineField({
      name: "source",
      title: "Source Form",
      type: "string",
      initialValue: "Website Footer Newsletter",
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed Date & Time",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "status",
      date: "subscribedAt",
    },
    prepare({ title, subtitle, date }) {
      return {
        title: title || "New Subscriber",
        subtitle: `${subtitle || "Active"} • ${date ? new Date(date).toLocaleString() : "Recently"}`,
      };
    },
  },
});
