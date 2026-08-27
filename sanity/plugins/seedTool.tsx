"use client";

import React, { useState } from "react";
import { useClient, definePlugin } from "sanity";
import { Card, Stack, Text, Button, Box, Heading, Flex, Spinner } from "@sanity/ui";

function SeedComponent() {
  const client = useClient({ apiVersion: "2024-08-26" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSeedAll = async () => {
    setStatus("loading");
    setMessage("Populating all CMS documents (Global Settings, Pages, 4 Blogs, 6 Destinations, 5 Services, 5 Reviews)...");

    try {
      // 1. Contact Page Document
      await client.createOrReplace({
        _id: "contactPage",
        _type: "contactPage",
        title: "Contact Page Content",
        heroTitle: "Contact",
        breadcrumb: "Home > Contact",
        formHeading: "Get In Touch",
        formSubheading:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        submitLabel: "Send Message",
        offices: [
          {
            _key: "office-1",
            city: "Lhoksemawe, Aceh",
            phone: "+62 6943 6956",
            email: "contact@domain.com",
            address: "Jl. Darussalam Hagu selatan",
          },
          {
            _key: "office-2",
            city: "Bali Branch Office",
            phone: "+62 6943 6957",
            email: "bali@domain.com",
            address: "Jl. Sunset Road, Seminyak",
          },
          {
            _key: "office-3",
            city: "Jakarta Headquarters",
            phone: "+62 6943 6958",
            email: "jakarta@domain.com",
            address: "Jl. Sudirman Kav 28",
          },
          {
            _key: "office-4",
            city: "Singapore Liaison",
            phone: "+65 6843 6959",
            email: "singapore@domain.com",
            address: "Marina Bay Financial Centre",
          },
        ],
      });
      await client.delete("drafts.contactPage").catch(() => null);

      // 2. Global Settings Document
      await client.createOrReplace({
        _id: "globalSettings",
        _type: "globalSettings",
        title: "Main Global Settings",
        siteName: "REBEL ROVER",
        siteTagline: "HAS A NICE RING TO IT, COMBINING THE ADVENTUROUS SPIRIT OF A REBEL",
        navLinks: [
          { _key: "nav-1", label: "Home", href: "/", hasDropdown: false },
          { _key: "nav-2", label: "About Us", href: "/about", hasDropdown: false },
          { _key: "nav-3", label: "Packages", href: "/packages", hasDropdown: false },
          { _key: "nav-4", label: "Blog", href: "/blog", hasDropdown: false },
          { _key: "nav-5", label: "Contact", href: "/contact", hasDropdown: false },
        ],
        newsletterHeading: "Subcribe to get special price",
        newsletterSubtext:
          "Dont wanna miss something? subscribe right now and get special promotion and monthly newsletter",
        newsletterPlaceholder: "Type your  email here",
        newsletterCtaLabel: "Subscribe",
        blurbText:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra condimentum.",
        address: "732 Despard St, Atlanta",
        phone: "+97 888 8888",
        email: "info@traveller.com",
        quickLinks: [
          { _key: "ql-1", label: "Home", href: "/" },
          { _key: "ql-2", label: "About Us", href: "/about" },
          { _key: "ql-3", label: "Packages", href: "/packages" },
          { _key: "ql-4", label: "Blog", href: "/blog" },
          { _key: "ql-5", label: "Contact", href: "/contact" },
        ],
        copyrightText:
          "Copyright © All rights reserved (Website Developed & Managed by CREATIVECHROMA)",
      });
      await client.delete("drafts.globalSettings").catch(() => null);

      // 3. Home Page Document
      await client.createOrReplace({
        _id: "homePage",
        _type: "homePage",
        title: "Home Page Content",
        heroTitle: "Make in\nyour journey.",
        heroSubtitle: "Explore the world with what you love beautiful natural beauty.",
        popularPlaces: "Popular Place : Bali, Istanbul, Rome, Paris.",
        heroCtaLabel: "Explore now",
        heroCtaLink: "/packages",
        exploreHeading: "Explore new worlds with\nexotic natural scenery",
        exploreSubheading: "Explore the world with what you love beautiful natural beauty.",
        exploreFeaturedItem: {
          captionTitle: "Bali, Indonesia.",
          captionText: "Bali is a beautiful tourist spot and is visited by many travelers.",
        },
        servicesHeading: "Why choose Us?",
        servicesSubheading: "our services have been trusted by world travelers.",
        partnersHeading: "Our tour partner",
        partnersSubheading:
          "There are many variation of passage of lorem ipsum available but the majority have suffered alteration",
        testimonialsEyebrow: "TESTIMONIAL",
        testimonialsHeading: "What our client say",
        testimonialsSubheading: "Create a visual identity for your company and a overall brand",
      });
      await client.delete("drafts.homePage").catch(() => null);

      // 4. About Page Document
      await client.createOrReplace({
        _id: "aboutPage",
        _type: "aboutPage",
        title: "About Us Page Content",
        heroTitle: "About Us",
        breadcrumb: "Home > About Us",
        founderName: "Siti Sarah",
        founderTitle: "Founder Travosca",
        founderParagraphs: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor sapien et urna tincidunt fringilla. Vivamus at augue interdum, blandit arcu quis, laoreet ipsum. In eu ipsum urna. Suspendisse suscipit est et neque.",
          "Mauris tempor tellus ante, ut fermentum erat gravida vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nec justo dui. Ut et consequat dui, a malesuada ipsum. Pellentesque nec turpis viverra, blandit mi a, accumsan justo.",
        ],
        galleryEyebrow: "Gallery",
        galleryHeading: "Unforgettable moment",
      });
      await client.delete("drafts.aboutPage").catch(() => null);

      // 5. Packages Page Document
      await client.createOrReplace({
        _id: "packagesPage",
        _type: "packagesPage",
        title: "Travel Packages Page Content",
        heroTitle: "Travel Packages",
        breadcrumb: "Home > Package",
        destinationsHeading: "Popular Destination",
        destinationsSubheading:
          "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
        destinationsCtaLabel: "Discover more",
        destinationsCtaUrl: "/packages",
        tipsHeading: "Travel Tips and Advice",
      });
      await client.delete("drafts.packagesPage").catch(() => null);

      // 6. Blog Posts (4 full articles)
      await client.createOrReplace({
        _id: "blog-1",
        _type: "blogPost",
        title: "Travel Stories For Now and the Future",
        slug: { _type: "slug", current: "travel-stories-for-now-and-the-future" },
        category: "Stories, Tips",
        author: "Hasmar",
        publishedDate: "January 18, 2021",
        excerpt:
          "Discover inspiring stories of sustainable exploration, secret destinations, and timeless memories.",
        tags: ["Destination", "Travel"],
      });

      await client.createOrReplace({
        _id: "blog-2",
        _type: "blogPost",
        title: "9 Popular Travel Destinations on Sale in 2024",
        slug: { _type: "slug", current: "9-popular-travel-destinations-on-sale" },
        category: "Travel Deals",
        author: "Admin",
        publishedDate: "14 Dec 2023",
        excerpt:
          "Check out the best discounts and budget-friendly vacation packages across Asia and Europe.",
        tags: ["Deals", "Packages"],
      });

      await client.createOrReplace({
        _id: "blog-3",
        _type: "blogPost",
        title: "How Are We Going to Travel Sustainably in 2024?",
        slug: { _type: "slug", current: "how-are-we-going-to-travel" },
        category: "Eco Travel",
        author: "Admin",
        publishedDate: "10 Nov 2023",
        excerpt:
          "Eco-friendly travel tips and how to minimize your carbon footprint while seeing the world.",
        tags: ["Eco", "Future"],
      });

      await client.createOrReplace({
        _id: "blog-4",
        _type: "blogPost",
        title: "Top 10 Hidden Gems in South East Asia You Must Visit",
        slug: { _type: "slug", current: "top-10-hidden-gems-asia" },
        category: "Adventure",
        author: "Sarah",
        publishedDate: "05 Oct 2023",
        excerpt:
          "From untouched islands to misty mountain temples, explore the best secret spots.",
        tags: ["Asia", "Guide"],
      });

      // 7. Destinations & Packages (6 items)
      await client.createOrReplace({
        _id: "dest-1",
        _type: "destination",
        name: "Paris",
        slug: { _type: "slug", current: "paris" },
        price: "$299.00",
        duration: "3days",
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        booking_cta_label: "Booking now",
        booking_cta_url: "/contact",
      });

      await client.createOrReplace({
        _id: "dest-2",
        _type: "destination",
        name: "Swiss",
        slug: { _type: "slug", current: "swiss" },
        price: "$299.00",
        duration: "3days",
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        booking_cta_label: "Booking now",
        booking_cta_url: "/contact",
      });

      await client.createOrReplace({
        _id: "dest-3",
        _type: "destination",
        name: "Thailand",
        slug: { _type: "slug", current: "thailand" },
        price: "$299.00",
        duration: "3days",
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        booking_cta_label: "Booking now",
        booking_cta_url: "/contact",
      });

      await client.createOrReplace({
        _id: "dest-4",
        _type: "destination",
        name: "Bali",
        slug: { _type: "slug", current: "bali" },
        price: "$299.00",
        duration: "3days",
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        booking_cta_label: "Booking now",
        booking_cta_url: "/contact",
      });

      await client.createOrReplace({
        _id: "dest-5",
        _type: "destination",
        name: "Indonesi",
        slug: { _type: "slug", current: "indonesia" },
        price: "$299.00",
        duration: "3days",
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        booking_cta_label: "Booking now",
        booking_cta_url: "/contact",
      });

      await client.createOrReplace({
        _id: "dest-6",
        _type: "destination",
        name: "Dubai",
        slug: { _type: "slug", current: "dubai" },
        price: "$299.00",
        duration: "3days",
        rating: 5,
        description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        booking_cta_label: "Booking now",
        booking_cta_url: "/contact",
      });

      // 8. Services (Why Choose Us) (5 items)
      await client.createOrReplace({
        _id: "service-1",
        _type: "service",
        title: "Best Service",
        description: "our service is reliable and convenient, our service is quality.",
        linkLabel: "Learn more",
        linkUrl: "/packages",
      });

      await client.createOrReplace({
        _id: "service-2",
        _type: "service",
        title: "Price Guarantee",
        description: "our service is reliable and convenient, our service is quality.",
        linkLabel: "Learn more",
        linkUrl: "/packages",
      });

      await client.createOrReplace({
        _id: "service-3",
        _type: "service",
        title: "Handpicked Hotels",
        description: "our service is reliable and convenient, our service is quality.",
        linkLabel: "Learn more",
        linkUrl: "/packages",
      });

      await client.createOrReplace({
        _id: "service-4",
        _type: "service",
        title: "24/7 Dedicated Support",
        description: "our service is reliable and convenient, our service is quality.",
        linkLabel: "Learn more",
        linkUrl: "/contact",
      });

      await client.createOrReplace({
        _id: "service-5",
        _type: "service",
        title: "Customized Tour Itinerary",
        description: "our service is reliable and convenient, our service is quality.",
        linkLabel: "Learn more",
        linkUrl: "/packages",
      });

      // 9. Testimonials & Reviews (5 items)
      await client.createOrReplace({
        _id: "test-1",
        _type: "testimonial",
        name: "Sara Jay",
        role: "Treveller",
        rating: 5,
        quote: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
      });

      await client.createOrReplace({
        _id: "test-2",
        _type: "testimonial",
        name: "Cristian Daniel",
        role: "Treveller",
        rating: 5,
        quote: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
      });

      await client.createOrReplace({
        _id: "test-3",
        _type: "testimonial",
        name: "Kausar Hasan",
        role: "Treveller",
        rating: 5,
        quote: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
      });

      await client.createOrReplace({
        _id: "test-4",
        _type: "testimonial",
        name: "Siti Sarah",
        role: "Treveller",
        rating: 5,
        quote: "Amazing experience exploring exotic natural places with Rebel Rover. Highly recommended!",
      });

      await client.createOrReplace({
        _id: "test-5",
        _type: "testimonial",
        name: "David Miller",
        role: "Treveller",
        rating: 5,
        quote: "Best service and price guarantee. Everything was organized perfectly without hassle.",
      });

      setStatus("success");
      setMessage("🎉 SUCCESS! All CMS sections (Global Settings, 4 Pages, 4 Blog Articles, 6 Destinations, 5 Services, 5 Reviews) are now fully pre-populated in Sanity Studio!");
    } catch (err: any) {
      setStatus("error");
      setMessage(`❌ Error populating data: ${err.message}`);
    }
  };

  return (
    <Box padding={5} style={{ maxWidth: 850, margin: "20px auto" }}>
      <Card padding={5} radius={4} shadow={3} tone="primary">
        <Stack space={4}>
          <Heading size={3}>⚡ Quick Populate All CMS Content</Heading>
          <Text size={2} muted>
            Click the button below to instantly populate and publish all default CMS documents (Global Settings, All 4 Pages, 4 Blog Articles, 6 Destinations, 5 Services, and 5 Reviews) directly into your Sanity dataset.
          </Text>

          {status === "loading" && (
            <Flex align="center" gap={3} padding={3}>
              <Spinner />
              <Text size={2} weight="semibold">{message}</Text>
            </Flex>
          )}

          {status === "success" && (
            <Card padding={4} radius={3} tone="positive">
              <Text size={2} weight="bold">
                {message}
              </Text>
            </Card>
          )}

          {status === "error" && (
            <Card padding={4} radius={3} tone="critical">
              <Text size={2}>{message}</Text>
            </Card>
          )}

          <Button
            text="🚀 Populate All 30+ CMS Documents Now"
            tone="positive"
            size={3}
            onClick={handleSeedAll}
            disabled={status === "loading"}
          />
        </Stack>
      </Card>
    </Box>
  );
}

export const seedToolPlugin = definePlugin({
  name: "seed-plugin",
  tools: (prev) => [
    ...prev,
    {
      name: "seed-content",
      title: "⚡ Quick Populate All",
      component: SeedComponent,
    },
  ],
});
