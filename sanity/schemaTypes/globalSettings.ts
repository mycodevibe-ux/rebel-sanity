import { defineField, defineType } from "sanity";

export const globalSettingsType = defineType({
  name: "globalSettings",
  title: "Global Settings (Header & Footer)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Identifier",
      type: "string",
      placeholder: "Main Global Settings",
      initialValue: "Main Global Settings",
    }),

    // --- Header Group ---
    defineField({
      name: "siteName",
      title: "Brand Name",
      type: "string",
      placeholder: "REBEL ROVER",
      initialValue: "REBEL ROVER",
    }),
    defineField({
      name: "siteTagline",
      title: "Brand Tagline",
      type: "text",
      rows: 2,
      placeholder: "HAS A NICE RING TO IT, COMBINING THE ADVENTUROUS SPIRIT OF A REBEL",
      initialValue: "HAS A NICE RING TO IT, COMBINING THE ADVENTUROUS SPIRIT OF A REBEL",
    }),
    defineField({
      name: "headerLogo",
      title: "Header White Logo Image",
      description: "Logo displayed on top dark header navigation bar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Menu Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            { name: "label", title: "Link Label", type: "string" },
            { name: "href", title: "Link URL / Route", type: "string" },
            { name: "hasDropdown", title: "Show Dropdown Indicator", type: "boolean", initialValue: false },
          ],
        },
      ],
    }),

    // --- Newsletter Group ---
    defineField({
      name: "newsletterHeading",
      title: "Newsletter Banner Heading",
      type: "string",
      placeholder: "Subcribe to get special price",
      initialValue: "Subcribe to get special price",
    }),
    defineField({
      name: "newsletterSubtext",
      title: "Newsletter Subtext",
      type: "text",
      rows: 2,
      placeholder: "Dont wanna miss something? subscribe right now and get special promotion and monthly newsletter",
      initialValue: "Dont wanna miss something? subscribe right now and get special promotion and monthly newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Newsletter Input Placeholder",
      type: "string",
      placeholder: "Type your  email here",
      initialValue: "Type your  email here",
    }),
    defineField({
      name: "newsletterCtaLabel",
      title: "Newsletter Button Label",
      type: "string",
      placeholder: "Subscribe",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "newsletterBgImage",
      title: "Newsletter Background Image",
      type: "image",
      options: { hotspot: true },
    }),

    // --- Footer Group ---
    defineField({
      name: "footerLogo",
      title: "Footer Blue Logo Image",
      description: "Logo displayed in the footer area with white background",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "blurbText",
      title: "Footer About Blurb",
      type: "text",
      rows: 3,
      placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra condimentum.",
      initialValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra condimentum.",
    }),
    defineField({
      name: "address",
      title: "Contact Address",
      type: "string",
      placeholder: "732 Despard St, Atlanta",
      initialValue: "732 Despard St, Atlanta",
    }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
      placeholder: "+97 888 8888",
      initialValue: "+97 888 8888",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      placeholder: "info@traveller.com",
      initialValue: "info@traveller.com",
    }),
    defineField({
      name: "quickLinks",
      title: "Footer Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "quickLink",
          fields: [
            { name: "label", title: "Link Label", type: "string" },
            { name: "href", title: "Link URL / Route", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialItem",
          fields: [
            { name: "platform", title: "Platform Name (e.g. Facebook, Twitter, Instagram, YouTube)", type: "string" },
            { name: "url", title: "Profile / Page URL", type: "string" },
            { name: "icon", title: "Icon Image (optional)", type: "image" },
          ],
        },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Footer Copyright Text",
      type: "string",
      placeholder: "Copyright © All rights reserved (Website Developed & Managed by CREATIVECHROMA)",
      initialValue: "Copyright © All rights reserved (Website Developed & Managed by CREATIVECHROMA)",
    }),
  ],
});
