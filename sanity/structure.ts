import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Rebel Rover CMS")
    .items([
      // 1. Global Settings
      S.listItem()
        .title("⚙️ Global Settings (Header & Footer)")
        .child(
          S.document()
            .schemaType("globalSettings")
            .documentId("globalSettings")
            .title("Header & Footer Settings")
        ),

      S.divider(),

      // 2. Pages
      S.listItem()
        .title("📄 Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("🏠 Home Page")
                .child(
                  S.document()
                    .schemaType("homePage")
                    .documentId("homePage")
                    .title("Home Page Content")
                ),
              S.listItem()
                .title("ℹ️ About Us Page")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                    .title("About Us Content")
                ),
              S.listItem()
                .title("🎒 Packages Page")
                .child(
                  S.document()
                    .schemaType("packagesPage")
                    .documentId("packagesPage")
                    .title("Packages Page Content")
                ),
              S.listItem()
                .title("📞 Contact Page")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                    .title("Contact Page Content")
                ),
              S.divider(),
              S.documentTypeListItem("customPage").title("✨ Custom Pages"),
            ])
        ),

      S.divider(),

      // 3. Collections
      S.documentTypeListItem("destination").title("🌴 Destinations & Packages"),
      S.documentTypeListItem("service").title("💼 Services (Why Choose Us)"),
      S.documentTypeListItem("testimonial").title("💬 Testimonials & Reviews"),
      S.documentTypeListItem("blogPost").title("✍️ Blog Posts & Articles"),

      S.divider(),

      // 4. Leads & Customer Inquiries
      S.documentTypeListItem("contactInquiry").title("📬 Contact Messages"),
      S.documentTypeListItem("newsletterSubscriber").title("✉️ Newsletter Subscribers"),
      S.documentTypeListItem("bookingInquiry").title("🎫 Tour Bookings"),
    ]);
