import { defineField, defineType } from "sanity";

export const bookingInquiryType = defineType({
  name: "bookingInquiry",
  title: "Tour Booking Inquiries",
  type: "document",
  fields: [
    defineField({
      name: "packageName",
      title: "Package / Tour Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "name",
      title: "Lead Name",
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
      name: "phone",
      title: "Phone Number",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "guests",
      title: "Number of Guests",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "specialRequests",
      title: "Special Requests / Notes",
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
      subtitle: "packageName",
      date: "submittedAt",
    },
    prepare({ title, subtitle, date }) {
      return {
        title: `${title || "Guest"} - ${subtitle || "Tour"}`,
        subtitle: date ? `Booked ${new Date(date).toLocaleDateString()}` : "New Booking",
      };
    },
  },
});
