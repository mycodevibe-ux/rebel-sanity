import { groq } from "next-sanity";

// --- Global Settings Query ---
export const globalSettingsQuery = groq`*[_type == "globalSettings" || _id == "globalSettings"][0] {
  _id,
  siteName,
  siteTagline,
  "headerLogo": headerLogo.asset->url,
  navLinks[] {
    label,
    href,
    hasDropdown
  },
  newsletterHeading,
  newsletterSubtext,
  newsletterPlaceholder,
  newsletterCtaLabel,
  "newsletterBgImage": newsletterBgImage.asset->url,
  "footerLogo": footerLogo.asset->url,
  blurbText,
  address,
  phone,
  email,
  quickLinks[] {
    label,
    href
  },
  socialLinks[] {
    platform,
    url,
    "icon": icon.asset->url
  },
  copyrightText
}`;

// --- Home Page Query ---
export const homePageQuery = groq`*[_type == "homePage" || _id == "homePage"][0] {
  _id,
  heroTitle,
  heroSubtitle,
  popularPlaces,
  "heroBackgroundImage": heroBackgroundImage.asset->url,
  heroCtaLabel,
  heroCtaLink,
  exploreHeading,
  exploreSubheading,
  exploreFeaturedItem {
    "image": image.asset->url,
    captionTitle,
    captionText
  },
  exploreSecondaryItems[] {
    "image": image.asset->url,
    captionTitle,
    captionText
  },
  servicesHeading,
  servicesSubheading,
  partnersHeading,
  partnersSubheading,
  partnerLogos[] {
    "image": image.asset->url,
    altText
  },
  testimonialsEyebrow,
  testimonialsHeading,
  testimonialsSubheading
}`;

// --- About Page Query ---
export const aboutPageQuery = groq`*[_type == "aboutPage" || _id == "aboutPage"][0] {
  _id,
  heroTitle,
  breadcrumb,
  "heroBackgroundImage": heroBackgroundImage.asset->url,
  featureBlocks[] {
    icon,
    title,
    description
  },
  "founderImage": founderImage.asset->url,
  founderName,
  founderTitle,
  founderParagraphs,
  "statsBackgroundImage": statsBackgroundImage.asset->url,
  stats[] {
    icon,
    number,
    label
  },
  galleryEyebrow,
  galleryHeading,
  galleryItems[] {
    "image": image.asset->url,
    captionLabel
  }
}`;

// --- Packages Page Query ---
export const packagesPageQuery = groq`*[_type == "packagesPage" || _id == "packagesPage"][0] {
  _id,
  heroTitle,
  breadcrumb,
  "heroBackgroundImage": heroBackgroundImage.asset->url,
  destinationsHeading,
  destinationsSubheading,
  destinationsCtaLabel,
  destinationsCtaUrl,
  "airplaneBannerImage": airplaneBannerImage.asset->url,
  tipsHeading
}`;

// --- Contact Page Query ---
export const contactPageQuery = groq`*[_type == "contactPage" || _id == "contactPage"][0] {
  _id,
  heroTitle,
  breadcrumb,
  "heroBackgroundImage": heroBackgroundImage.asset->url,
  formHeading,
  formSubheading,
  submitLabel,
  offices[] {
    city,
    phone,
    email,
    address
  }
}`;

// --- Collections Queries ---
export const destinationsQuery = groq`*[_type == "destination"] | order(_createdAt asc) {
  _id,
  name,
  price,
  duration,
  "image": image.asset->url,
  description,
  rating,
  booking_cta_label,
  booking_cta_url
}`;

export const servicesQuery = groq`*[_type == "service"] | order(_createdAt asc) {
  _id,
  title,
  "icon": icon.asset->url,
  description,
  link_label,
  link_url
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt asc) {
  _id,
  name,
  role,
  "avatar": avatar.asset->url,
  stars,
  quote
}`;

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  author,
  publishedDate,
  "coverImage": coverImage.asset->url,
  excerpt,
  tags,
  body
}`;

export const singleBlogPostQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  author,
  publishedDate,
  "coverImage": coverImage.asset->url,
  excerpt,
  tags,
  body
}`;

// --- Custom Pages Dynamic Query ---
export const customPageQuery = groq`*[_type == "customPage" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  heroTitle,
  breadcrumb,
  "heroBackgroundImage": heroBackgroundImage.asset->url,
  content
}`;
