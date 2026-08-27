import { GlobalSettings } from "@/types/cms";

export const globalSettingsFixture: GlobalSettings = {
  header: {
    logo: {
      src: "/images/logo1.png", // White Logo for dark header background
      alt: "Rebel Rover Logo",
      textLogo: {
        brand: "REBEL ROVER",
        tagline: "HAS A NICE RING TO IT, COMBINING THE ADVENTUROUS SPIRIT OF A REBEL",
      },
    },
    navLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Packages", href: "/packages" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    searchEnabled: true,
  },
  footer: {
    subscribe_newsletter: {
      heading: "Subcribe to get special price",
      subtext: "Dont wanna miss something? subscribe right now and get special promotion and monthly newsletter",
      input_placeholder: "Type your  email here",
      cta_label: "Subscribe",
      background_image: "/images/aboutbg.png",
    },
    logo: {
      src: "/images/logo.png", // Blue Logo for white footer background
      alt: "Rebel Rover Logo",
      textLogo: {
        brand: "REBEL ROVER",
        tagline: "HAS A NICE RING TO IT, COMBINING THE ADVENTUROUS SPIRIT OF A REBEL",
      },
    },
    blurb_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra condimentum.",
    contact_info: {
      address: "732 Despard St, Atlanta",
      phone: "+97 888 8888",
      email: "info@traveller.com",
    },
    quick_links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Packages", href: "/packages" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    social_links: [
      { platform: "Facebook", url: "https://facebook.com", icon: "/images/facebook.svg" },
      { platform: "Twitter", url: "https://twitter.com", icon: "/images/twitter.svg" },
      { platform: "YouTube", url: "https://youtube.com", icon: "/images/youtube.svg" },
      { platform: "Instagram", url: "https://instagram.com", icon: "/images/instagram.svg" },
    ],
    copyright_text: "Copyright © All rights reserved (Website Developed & Managed by CREATIVECHROMA)",
  },
};
