import { defineField, defineType } from "sanity";

export const blogCommentType = defineType({
  name: "blogComment",
  title: "Blog Comments",
  type: "document",
  fields: [
    defineField({
      name: "postSlug",
      title: "Blog Post Slug",
      type: "string",
    }),
    defineField({
      name: "postTitle",
      title: "Blog Post Title",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Author Email",
      type: "string",
    }),
    defineField({
      name: "comment",
      title: "Comment Content",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Comment Status",
      type: "string",
      initialValue: "Approved",
      options: {
        list: [
          { title: "✅ Approved (Visible)", value: "Approved" },
          { title: "🟡 Pending Review", value: "Pending" },
          { title: "❌ Spam / Rejected", value: "Rejected" },
        ],
      },
    }),
    defineField({
      name: "createdAt",
      title: "Posted At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "comment",
      date: "createdAt",
    },
    prepare({ title, subtitle, date }) {
      return {
        title: title || "Anonymous Comment",
        subtitle: `${subtitle || ""} • ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
