import { defineField, defineType } from "sanity";

export const contactInquiryType = defineType({
  name: "contactInquiry",
  title: "Contact Inquiries",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Sender Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "subject",
      title: "Subject / Inquired Service",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message Content",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      date: "submittedAt",
    },
    prepare({ title, subtitle, date }) {
      return {
        title: title || "New Inquiry",
        subtitle: `${subtitle || ""} • ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
