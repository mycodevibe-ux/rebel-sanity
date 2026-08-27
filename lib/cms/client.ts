import { Page, GlobalSettings } from "@/types/cms";
import { allPages, globalSettingsFixture } from "@/data/fixtures";
import { client } from "@/sanity/lib/client";
import {
  destinationsQuery,
  servicesQuery,
  testimonialsQuery,
  blogPostsQuery,
  globalSettingsQuery,
  homePageQuery,
  aboutPageQuery,
  packagesPageQuery,
  contactPageQuery,
} from "@/sanity/lib/queries";
import fs from "fs";
import path from "path";

// Auto sync design assets to public/images
function ensureAssetsSynced() {
  try {
    const srcDir = path.join(process.cwd(), "design");
    const destDir = path.join(process.cwd(), "public", "images");

    if (fs.existsSync(srcDir)) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      const files = fs.readdirSync(srcDir);
      for (const file of files) {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);
        if (fs.statSync(srcFile).isFile() && !fs.existsSync(destFile)) {
          fs.copyFileSync(srcFile, destFile);
        }
      }
    }
  } catch (e) {
    // Ignore in read-only environments
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  ensureAssetsSynced();
  const normalizedSlug = slug === "" ? "home" : slug;
  const page = allPages[normalizedSlug];
  if (!page) return null;

  // Deep clone page so we don't mutate fixtures
  const clonedPage: Page = JSON.parse(JSON.stringify(page));

  try {
    // ----------------------------------------------------
    // 1. HOME PAGE DYNAMIC CMS DATA
    // ----------------------------------------------------
    if (normalizedSlug === "home") {
      const [homeData, sanityServices, sanityTestimonials] = await Promise.all([
        client.fetch(homePageQuery, {}, { next: { revalidate: 0 } }).catch(() => null),
        client.fetch(servicesQuery, {}, { next: { revalidate: 0 } }).catch(() => null),
        client.fetch(testimonialsQuery, {}, { next: { revalidate: 0 } }).catch(() => null),
      ]);

      if (homeData) {
        // Hero
        const heroRow = clonedPage.rows.find((r) => r.type === "hero_search");
        if (heroRow && heroRow.fields) {
          if (homeData.heroTitle) heroRow.fields.title = homeData.heroTitle;
          if (homeData.heroSubtitle) heroRow.fields.subtitle = homeData.heroSubtitle;
          if (homeData.popularPlaces) heroRow.fields.popular_places = homeData.popularPlaces;
          if (homeData.heroBackgroundImage) heroRow.fields.background_image = homeData.heroBackgroundImage;
          if (homeData.heroCtaLabel) heroRow.fields.cta_label = homeData.heroCtaLabel;
          if (homeData.heroCtaLink) heroRow.fields.cta_link = homeData.heroCtaLink;
        }

        // Explore Asymmetric
        const exploreRow = clonedPage.rows.find((r) => r.type === "card_repeater_asymmetric");
        if (exploreRow && exploreRow.fields) {
          if (homeData.exploreHeading) exploreRow.fields.heading = homeData.exploreHeading;
          if (homeData.exploreSubheading) exploreRow.fields.subheading = homeData.exploreSubheading;
          if (homeData.exploreFeaturedItem) {
            exploreRow.fields.featured_item = {
              ...exploreRow.fields.featured_item,
              image: homeData.exploreFeaturedItem.image || exploreRow.fields.featured_item.image,
              caption_title: homeData.exploreFeaturedItem.captionTitle || exploreRow.fields.featured_item.caption_title,
              caption_text: homeData.exploreFeaturedItem.captionText || exploreRow.fields.featured_item.caption_text,
            };
          }
          if (homeData.exploreSecondaryItems && homeData.exploreSecondaryItems.length > 0) {
            exploreRow.fields.secondary_items = homeData.exploreSecondaryItems.map((item: any, idx: number) => ({
              image: item.image || exploreRow.fields.secondary_items[idx]?.image || "/images/home-img-1.png",
              caption_title: item.captionTitle || exploreRow.fields.secondary_items[idx]?.caption_title || "",
              caption_text: item.captionText || exploreRow.fields.secondary_items[idx]?.caption_text || "",
            }));
          }
        }

        // Service Grid Header
        const serviceRow = clonedPage.rows.find((r) => r.type === "service_grid");
        if (serviceRow && serviceRow.fields) {
          if (homeData.servicesHeading) serviceRow.fields.heading = homeData.servicesHeading;
          if (homeData.servicesSubheading) serviceRow.fields.subheading = homeData.servicesSubheading;
        }

        // Tour Partners
        const partnerRow = clonedPage.rows.find((r) => r.type === "partner_logos");
        if (partnerRow && partnerRow.fields) {
          if (homeData.partnersHeading) partnerRow.fields.heading = homeData.partnersHeading;
          if (homeData.partnersSubheading) partnerRow.fields.subheading = homeData.partnersSubheading;
          if (homeData.partnerLogos && homeData.partnerLogos.length > 0) {
            partnerRow.fields.logos = homeData.partnerLogos.map((l: any) => ({
              image: l.image || "/images/Katana.svg",
              alt_text: l.altText || "Partner Logo",
            }));
          }
        }

        // Testimonials Header
        const testRow = clonedPage.rows.find((r) => r.type === "testimonials");
        if (testRow && testRow.fields) {
          if (homeData.testimonialsEyebrow) testRow.fields.eyebrow = homeData.testimonialsEyebrow;
          if (homeData.testimonialsHeading) testRow.fields.heading = homeData.testimonialsHeading;
          if (homeData.testimonialsSubheading) testRow.fields.subheading = homeData.testimonialsSubheading;
        }
      }

      // Live Sanity Services
      if (sanityServices && sanityServices.length > 0) {
        const serviceRow = clonedPage.rows.find((r) => r.type === "service_grid");
        if (serviceRow && serviceRow.fields) {
          serviceRow.fields.items = sanityServices.map((s: any) => ({
            id: s._id,
            icon: s.icon || "/images/best-service.png",
            title: s.title,
            description: s.description,
            link_label: s.link_label || "Leaern more",
            link_url: s.link_url || "/packages",
          }));
        }
      }

      // Live Sanity Testimonials
      if (sanityTestimonials && sanityTestimonials.length > 0) {
        const testRow = clonedPage.rows.find((r) => r.type === "testimonials");
        if (testRow && testRow.fields) {
          testRow.fields.items = sanityTestimonials.map((t: any) => ({
            id: t._id,
            name: t.name,
            role: t.role || "Treveller",
            avatar: t.avatar || "/images/sara.png",
            avatar_image: t.avatar || "/images/sara.png",
            stars: t.stars || 5,
            rating: t.stars || 5,
            quote: t.quote,
            quote_text: t.quote,
          }));
        }
      }
    }

    // ----------------------------------------------------
    // 2. ABOUT US PAGE DYNAMIC CMS DATA
    // ----------------------------------------------------
    if (normalizedSlug === "about") {
      const aboutData = await client.fetch(aboutPageQuery, {}, { next: { revalidate: 0 } }).catch(() => null);
      if (aboutData) {
        // Hero
        const heroRow = clonedPage.rows.find((r) => r.type === "inner_page_hero");
        if (heroRow && heroRow.fields) {
          if (aboutData.heroTitle) heroRow.fields.title = aboutData.heroTitle;
          if (aboutData.breadcrumb) heroRow.fields.breadcrumb_label = aboutData.breadcrumb;
          if (aboutData.heroBackgroundImage) heroRow.fields.background_image = aboutData.heroBackgroundImage;
        }

        // Features
        const featRow = clonedPage.rows.find((r) => r.type === "feature_blocks");
        if (featRow && featRow.fields && aboutData.featureBlocks && aboutData.featureBlocks.length > 0) {
          featRow.fields.items = aboutData.featureBlocks.map((f: any) => ({
            icon: f.icon || "users",
            title: f.title || "",
            description: f.description || "",
          }));
        }

        // Founder Quote
        const founderRow = clonedPage.rows.find((r) => r.type === "founder_quote");
        if (founderRow && founderRow.fields) {
          if (aboutData.founderImage) founderRow.fields.image = aboutData.founderImage;
          if (aboutData.founderName) founderRow.fields.name = aboutData.founderName;
          if (aboutData.founderTitle) founderRow.fields.title = aboutData.founderTitle;
          if (aboutData.founderParagraphs && aboutData.founderParagraphs.length > 0) {
            founderRow.fields.body_paragraphs = aboutData.founderParagraphs;
          }
        }

        // Stats Counters
        const statsRow = clonedPage.rows.find((r) => r.type === "stats_counters");
        if (statsRow && statsRow.fields) {
          if (aboutData.statsBackgroundImage) statsRow.fields.background_image = aboutData.statsBackgroundImage;
          if (aboutData.stats && aboutData.stats.length > 0) {
            statsRow.fields.items = aboutData.stats.map((s: any) => ({
              icon: s.icon || "users",
              number: s.number || "",
              label: s.label || "",
            }));
          }
        }

        // Gallery
        const galleryRow = clonedPage.rows.find((r) => r.type === "gallery");
        if (galleryRow && galleryRow.fields) {
          if (aboutData.galleryEyebrow) galleryRow.fields.eyebrow = aboutData.galleryEyebrow;
          if (aboutData.galleryHeading) galleryRow.fields.heading = aboutData.galleryHeading;
          if (aboutData.galleryItems && aboutData.galleryItems.length > 0) {
            galleryRow.fields.items = aboutData.galleryItems.map((g: any) => ({
              image: g.image || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1000&auto=format&fit=crop&q=85",
              caption_label: g.captionLabel || "",
            }));
          }
        }
      }
    }

    // ----------------------------------------------------
    // 3. PACKAGES PAGE DYNAMIC CMS DATA
    // ----------------------------------------------------
    if (normalizedSlug === "packages") {
      const [packagesData, sanityDestinations] = await Promise.all([
        client.fetch(packagesPageQuery, {}, { next: { revalidate: 0 } }).catch(() => null),
        client.fetch(destinationsQuery, {}, { next: { revalidate: 0 } }).catch(() => null),
      ]);

      if (packagesData) {
        // Hero
        const heroRow = clonedPage.rows.find((r) => r.type === "inner_page_hero");
        if (heroRow && heroRow.fields) {
          if (packagesData.heroTitle) heroRow.fields.title = packagesData.heroTitle;
          if (packagesData.breadcrumb) heroRow.fields.breadcrumb_label = packagesData.breadcrumb;
          if (packagesData.heroBackgroundImage) heroRow.fields.background_image = packagesData.heroBackgroundImage;
        }

        // Destinations grid header & cta
        const destRow = clonedPage.rows.find((r) => r.type === "destination_card_grid");
        if (destRow && destRow.fields) {
          if (packagesData.destinationsHeading) destRow.fields.heading = packagesData.destinationsHeading;
          if (packagesData.destinationsSubheading) destRow.fields.subheading = packagesData.destinationsSubheading;
          if (packagesData.destinationsCtaLabel) destRow.fields.cta_label = packagesData.destinationsCtaLabel;
          if (packagesData.destinationsCtaUrl) destRow.fields.cta_url = packagesData.destinationsCtaUrl;
        }
      }

      // Destinations Items
      if (sanityDestinations && sanityDestinations.length > 0) {
        const destRow = clonedPage.rows.find((r) => r.type === "destination_card_grid");
        if (destRow && destRow.fields) {
          destRow.fields.items = sanityDestinations.map((item: any) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            duration_label: item.duration ? `/${item.duration}` : "/3days",
            image: item.image || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
            description: item.description || "Explore breathtaking landscapes and curated travel packages.",
            rating: item.rating || 5,
            booking_cta_label: item.booking_cta_label || "Booking now",
            booking_cta_url: item.booking_cta_url || "/contact",
          }));
        }
      }
    }

    // ----------------------------------------------------
    // 4. CONTACT PAGE DYNAMIC CMS DATA
    // ----------------------------------------------------
    if (normalizedSlug === "contact") {
      const contactData = await client.fetch(contactPageQuery, {}, { next: { revalidate: 0 } }).catch(() => null);
      if (contactData) {
        const heroRow = clonedPage.rows.find((r) => r.type === "inner_page_hero");
        if (heroRow && heroRow.fields) {
          if (contactData.heroTitle) heroRow.fields.title = contactData.heroTitle;
          if (contactData.breadcrumb) heroRow.fields.breadcrumb_label = contactData.breadcrumb;
          if (contactData.heroBackgroundImage) heroRow.fields.background_image = contactData.heroBackgroundImage;
        }

        const formRow = clonedPage.rows.find((r) => r.type === "contact_form_card");
        if (formRow && formRow.fields) {
          if (contactData.formHeading) formRow.fields.form_heading = contactData.formHeading;
          if (contactData.formSubheading) (formRow.fields as any).form_subheading = contactData.formSubheading;
          if (contactData.submitLabel) formRow.fields.submit_label = contactData.submitLabel;

          if (contactData.offices && Array.isArray(contactData.offices) && contactData.offices.length > 0) {
            (formRow.fields as any).offices = contactData.offices;
          }
        }
      }
    }

    // ----------------------------------------------------
    // 5. BLOG PAGE DYNAMIC CMS DATA
    // ----------------------------------------------------
    if (normalizedSlug === "blog") {
      const livePosts = await client.fetch(blogPostsQuery, {}, { next: { revalidate: 0 } }).catch(() => null);
      if (livePosts && livePosts.length > 0) {
        const latest = livePosts[0];
        // Hero
        const heroRow = clonedPage.rows.find((r) => r.type === "inner_page_hero");
        if (heroRow && heroRow.fields) {
          heroRow.fields.title = latest.title;
          if (latest.coverImage) heroRow.fields.background_image = latest.coverImage;
          if (heroRow.fields.meta) {
            heroRow.fields.meta.author = latest.author || heroRow.fields.meta.author;
            heroRow.fields.meta.date = latest.publishedDate || heroRow.fields.meta.date;
            heroRow.fields.meta.category = latest.category || heroRow.fields.meta.category;
            if (latest.tags) heroRow.fields.meta.tags = latest.tags;
          }
        }

        // Article Body
        const articleRow = clonedPage.rows.find((r) => r.type === "article_body");
        if (articleRow && articleRow.fields) {
          articleRow.fields.title = latest.title;
          if (latest.coverImage) articleRow.fields.featured_image = latest.coverImage;
          if (latest.tags) articleRow.fields.tags = latest.tags;
        }

        // Sidebar Recent Posts
        const recentRow = clonedPage.rows.find((r) => r.type === "sidebar_recent_posts");
        if (recentRow && recentRow.fields) {
          recentRow.fields.items = livePosts.slice(0, 4).map((p: any) => ({
            thumbnail: p.coverImage || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&auto=format&fit=crop&q=80",
            title: p.title,
            date: p.publishedDate || "Recently",
            url: `/blog`,
          }));
        }
      }
    }
  } catch (error) {
    // If Sanity is offline or empty, fallback gracefully to fixtures
  }

  return clonedPage;
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
  ensureAssetsSynced();
  try {
    const sanitySettings = await client.fetch(globalSettingsQuery, {}, { next: { revalidate: 0 } });
    if (sanitySettings) {
      return {
        ...globalSettingsFixture,
        header: {
          ...globalSettingsFixture.header,
          logo: {
            ...globalSettingsFixture.header.logo,
            src: sanitySettings.headerLogo || globalSettingsFixture.header.logo.src,
            textLogo: {
              brand: sanitySettings.siteName || globalSettingsFixture.header.logo.textLogo?.brand || "REBEL ROVER",
              tagline: sanitySettings.siteTagline || globalSettingsFixture.header.logo.textLogo?.tagline || "HAS A NICE RING TO IT, COMBINING THE ADVENTUROUS SPIRIT OF A REBEL",
            },
          },
          navLinks:
            sanitySettings.navLinks && sanitySettings.navLinks.length > 0
              ? sanitySettings.navLinks
              : globalSettingsFixture.header.navLinks,
        },
        footer: {
          ...globalSettingsFixture.footer,
          subscribe_newsletter: {
            ...globalSettingsFixture.footer.subscribe_newsletter,
            heading: sanitySettings.newsletterHeading || globalSettingsFixture.footer.subscribe_newsletter.heading,
            subtext: sanitySettings.newsletterSubtext || globalSettingsFixture.footer.subscribe_newsletter.subtext,
            input_placeholder:
              sanitySettings.newsletterPlaceholder || globalSettingsFixture.footer.subscribe_newsletter.input_placeholder,
            cta_label:
              sanitySettings.newsletterCtaLabel || globalSettingsFixture.footer.subscribe_newsletter.cta_label,
            background_image:
              sanitySettings.newsletterBgImage || globalSettingsFixture.footer.subscribe_newsletter.background_image,
          },
          logo: {
            ...globalSettingsFixture.footer.logo,
            src: sanitySettings.footerLogo || sanitySettings.headerLogo || globalSettingsFixture.footer.logo.src,
            textLogo: {
              brand: sanitySettings.siteName || globalSettingsFixture.footer.logo.textLogo?.brand || "REBEL ROVER",
              tagline: sanitySettings.siteTagline || globalSettingsFixture.footer.logo.textLogo?.tagline || "HAS A NICE RING TO IT, COMBINING THE ADVENTUROUS SPIRIT OF A REBEL",
            },
          },
          blurb_text: sanitySettings.blurbText || globalSettingsFixture.footer.blurb_text,
          contact_info: {
            address: sanitySettings.address || globalSettingsFixture.footer.contact_info.address,
            phone: sanitySettings.phone || globalSettingsFixture.footer.contact_info.phone,
            email: sanitySettings.email || globalSettingsFixture.footer.contact_info.email,
          },
          quick_links:
            sanitySettings.quickLinks && sanitySettings.quickLinks.length > 0
              ? sanitySettings.quickLinks
              : globalSettingsFixture.footer.quick_links,
          social_links:
            sanitySettings.socialLinks && sanitySettings.socialLinks.length > 0
              ? sanitySettings.socialLinks.map((s: any) => ({
                  platform: s.platform,
                  url: s.url,
                  icon: s.icon || globalSettingsFixture.footer.social_links.find((x) => x.platform === s.platform)?.icon || "/images/facebook.svg",
                }))
              : globalSettingsFixture.footer.social_links,
          copyright_text: sanitySettings.copyrightText || globalSettingsFixture.footer.copyright_text,
        },
      };
    }
  } catch (error) {
    // fallback
  }
  return globalSettingsFixture;
}
