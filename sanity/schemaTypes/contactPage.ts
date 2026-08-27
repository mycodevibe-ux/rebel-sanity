import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      placeholder: "Contact Page Content",
      initialValue: "Contact Page Content",
    }),

    // --- Hero ---
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      placeholder: "Contact",
      initialValue: "Contact",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb Label",
      type: "string",
      placeholder: "Home > Contact",
      initialValue: "Home > Contact",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
    }),

    // --- Form & Heading ---
    defineField({
      name: "formHeading",
      title: "Contact Form Heading",
      type: "string",
      placeholder: "Get In Touch",
      initialValue: "Get In Touch",
    }),
    defineField({
      name: "formSubheading",
      title: "Contact Subheading",
      type: "text",
      rows: 2,
      placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
      initialValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
    }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      placeholder: "Send Message",
      initialValue: "Send Message",
    }),

    // --- Dynamic Branch Offices List (Add More / Remove) ---
    defineField({
      name: "offices",
      title: "🏢 Branch Offices (Add More / Remove Offices)",
      description: "You can add new offices with '+ Add item' or delete any office using the trash/remove icon.",
      type: "array",
      of: [
        {
          type: "object",
          name: "officeItem",
          title: "Branch Office",
          fields: [
            {
              name: "city",
              title: "City / Office Name",
              type: "string",
              placeholder: "e.g. Bali Branch Office",
            },
            {
              name: "phone",
              title: "Phone Number",
              type: "string",
              placeholder: "e.g. +62 6943 6957",
            },
            {
              name: "email",
              title: "Email Address",
              type: "string",
              placeholder: "e.g. bali@domain.com",
            },
            {
              name: "address",
              title: "Office Address",
              type: "string",
              placeholder: "e.g. Jl. Sunset Road, Seminyak",
            },
          ],
          preview: {
            select: {
              title: "city",
              subtitle: "phone",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "New Office",
                subtitle: subtitle || "No phone added",
              };
            },
          },
        },
      ],
    }),
  ],
});
