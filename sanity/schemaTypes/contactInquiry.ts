import { defineField, defineType } from "sanity";

export const contactInquiryType = defineType({
  name: "contactInquiry",
  title: "Contact Messages",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Sender Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Subject / Topic",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message Content",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Lead Status",
      type: "string",
      initialValue: "New",
      options: {
        list: [
          { title: "🟢 New Message", value: "New" },
          { title: "🟡 In Progress / Contacted", value: "In Progress" },
          { title: "✅ Completed / Resolved", value: "Completed" },
        ],
      },
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted Date & Time",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "subject",
      date: "submittedAt",
      status: "status",
    },
    prepare({ title, subtitle, date, status }) {
      return {
        title: title || "New Inquiry",
        subtitle: `[${status || "New"}] ${subtitle || "No subject"} • ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
