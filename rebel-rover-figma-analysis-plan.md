# Rebel Rover — Figma → Next.js CMS Analysis & Implementation Plan

Source of truth: Figma file `hUB8Vo8YSaV91qVWcyxbKJ` ("Rebel Rover | Travel Website Theme")
Analysis performed via live Figma MCP inspection (metadata + design context) on the actual file — not guessed.

---

## 1. FIGMA ANALYSIS — PAGES FOUND

The Figma canvas ("Page 1") contains **5 top-level frames**, each representing a full website page (header + body + footer baked into one artboard, per Figma convention):

| # | Figma Frame Name | Node ID | Represents |
|---|---|---|---|
| 1 | Home | `1:2` | Homepage |
| 2 | About Us | `57:29` | About page |
| 3 | Package | `115:289` | Destination / Package listing page |
| 4 | Single Blog | `113:230` | Blog listing (top) + Blog detail (bottom) — see note below |
| 5 | Contact | `113:334` | Contact page |

**NEEDS CONFIRMATION:** The primary nav (Home / Package / Destination / Blog / About Us / Contact) references a **Destination** link and a **Blog** (listing) link, but only one "Package" listing frame and one "Single Blog" (which is actually a blog-listing/hero + blog-detail combo, see 1.4) exist in the file. There is no separate "Destination" listing frame distinct from "Package," and no separate blog-index frame distinct from the "Single Blog" frame's list/detail split. Treat **Package = Destination listing** unless corrected, and treat the "Single Blog" frame as containing **both** a blog-index-style card grid (bottom half) and a blog-detail article (top half) under one frame.

Every frame shares an identical **Header** component and **Footer** component (confirmed via design-context inspection — same structure/classes/copy across all 5 pages, only the hero image/title differs). This confirms Header and Footer should be **global, reusable, layout-level components**, not per-page CMS rows.

---

## 2. GLOBAL DESIGN TOKENS (verified via design-context extraction)

### Typography
- **Font family:** Poppins (Bold / SemiBold / Medium / Regular / Light weights used)
- H1 (hero headline, e.g. "Make in your journey."): `90px / line-height 110px / Bold`, white, `text-shadow: 0px 4px 4px rgba(0,0,0,0.25)`
- Section big headline (e.g. "Subscribe to get special price"): `60px / line-height 70px / SemiBold`
- H2-level section titles (e.g. "Get In Touch", "Popular Destination"): `~40-44px / SemiBold` (exact px per-row noted in inventory)
- Card title (e.g. destination name "Paris"): `24px / SemiBold`, black
- Body copy: `18px / line-height 34-36px / Medium`, colors range `#6c6c6c` (footer body) to `#cfcfcf`/`#dcdcdc` (on dark hero)
- Small/meta text (card description): `14px / line-height 27px / Medium`, `#555`
- Nav links: `18px / SemiBold`, `rgba(255,255,255,0.8)` default, `white` for active/current page

### Color palette (extracted, not assumed)
- Black (`#000000`) — primary buttons/CTAs, footer copyright bar, footer bottom band
- White (`#FFFFFF`) — cards, search bar, subscribe input
- Dark overlay on hero: `rgba(18,11,11,0.51)` (nav bar scrim on hero image)
- Text greys: `#6c6c6c`, `#555555`, `#9b9b9b` (placeholder/label text)
- Off-white text on dark: `#dfdfdf`, `#cfcfcf`, `#dcdcdc`, `#ececec`
- Card border-adjacent grey: `#cbcaca` (search bar border)

### Shape / elevation system
- Card radius: `10px` (destination/package cards), large pill radius `27.5px–72px` (buttons/search bar — effectively full pill/`rounded-full`)
- Card shadow: `0px 5px 20px rgba(0,0,0,0.1)`
- Search bar shadow: `0px 20px 35px rgba(0,0,0,0.3)`
- Primary CTA button: black fill, white text, full-pill radius (`~28-34px` depending on button height), `Poppins SemiBold 18-22px`

### Repeated primitives identified
- **Primary Button** (black pill, white text) — appears as "Explore now", "Booking now", "Subscribe", "View more", "Discover more", "Send Message", "Post Comment"
- **Secondary/Outline elements** — "Read More" links (icon-only arrow frames), category "Leaern more" (typo in source file — flag for content correction)
- **Destination/Package Card** — image top (rounded top corners) + white body: title, price, description, rating/stars row, booking button
- **Blog Card** — image + eyebrow/category tag + title + excerpt + Read More
- **Testimonial Card** — avatar (circular mask), name, role, quote, star rating
- **Icon+Label row** — used for contact info (phone/email/address) throughout footer and contact page, and for meta (author/date/tags) on blog

---

## 3. RESPONSIVE ANALYSIS

**NEEDS CONFIRMATION — HIGH PRIORITY:** The Figma file, as inspected, contains only **desktop-width (1512px) frames** for all 5 pages. No tablet or mobile artboards/frames were found in the document metadata. This means:
- Tablet and mobile layouts are **NOT explicitly defined in Figma** and must be derived using standard responsive conversion rules (stacking multi-column grids, reducing type scale, adjusting spacing) rather than "read exactly from Figma," which contradicts the pixel-perfect mandate for those breakpoints.
- Recommend confirming with the design owner whether separate mobile/tablet frames exist elsewhere (e.g., a different Figma page, a duplicate/variant file) before Phase 6 (Responsive Implementation). If none exist, propose standard breakpoint rules (see §6) as the fallback and get sign-off before building.

---

## 4. CMS ROW ARCHITECTURE

Concept:
```
Page
 └── rows[] (ordered array)
       ├── type            (row/component identifier, e.g. "hero", "service_grid")
       ├── settings         (layout/background/alignment controls)
       └── fields           (row-specific CMS content)
```

### Global (non-row) components
| Component | Reusable | Notes |
|---|---|---|
| Header / Nav | Yes — site-wide | logo, 6 nav links (label+href, "active" state per page), search icon, optional page-title overlay block (title + breadcrumb, varies per page — see Row inventory) |
| Footer | Yes — site-wide | subscribe block, logo+blurb, contact info block, quick links, social icons, copyright bar |

### Page-level Rows (derived from actual Figma structure)

#### PAGE: Home
1. **Hero / Search Row** — full-bleed image, H1, subtext, popular-places line, search widget (Location/Date/People selects + CTA)
2. **Explore/Intro Row** — heading + subheading + 2-slide arrows + 3-card asymmetric image/quote layout (2 plain images + 1 featured image with quote-bubble overlay + caption)
3. **Why Choose Us / Services Row** — heading + subheading + 2-slide arrows + repeater of 3 service cards (icon, title, description, "Learn more" link)
4. **Tour Partners Row** — heading + subtext + logo strip (repeater of partner logo images)
5. **Testimonials Row** — eyebrow + heading + subheading + repeater of 4 testimonial cards (avatar, name, role, quote, rating)

#### PAGE: About Us
6. **Page Title/Banner Row** — hero image + page title ("About Us") + breadcrumb (reused pattern across Package/Blog/Contact too — likely same "Inner Page Hero" component with per-page title/breadcrumb/background image fields)
7. **Mission/Vision/Teamwork Row** — repeater of 3 feature blocks (icon, title, description)
8. **Founder Quote Row** — image + quote icon overlay + 2 paragraphs body copy + name + title
9. **Stats/Counters Row** — background image + repeater of 4 stat blocks (icon, number, label) — "Satisfied Client", "New Traveller", "Destination", "Award"
10. **Gallery Row** — heading ("Gallery" eyebrow + "Unforgettable moment" title) + asymmetric image grid (1 large + 3 stacked), each image with caption label

#### PAGE: Package (Destination listing)
11. **Page Title/Banner Row** — same Inner Page Hero pattern, title "Travel Packages"
12. **Popular Destination Grid Row** — heading + subheading + "Discover more" CTA + repeater of package cards (image, name, price/duration, description, rating, "Booking now" CTA) — 6 cards seen (2 cols × 3 rows in Figma, needs confirmation on desktop col count vs viewport width)
13. **Tips & Article Row** — heading + subtext + repeater of blog teaser cards (1 large + 2 stacked, same asymmetric layout as Home's Explore row) + "View more" CTA

#### PAGE: Single Blog (blog detail + comments; also contains card-grid pattern reusable as "blog index")
14. **Page Title/Banner Row** — Inner Page Hero + additional meta row (author, date, category) under the title — variant of Row 6/11 with meta sub-row
15. **Article Body Row** — featured image + article title + rich text body (long-form) + second image + more rich text + tags row + share-icons row
16. **Sidebar: Categories Row** — heading + repeater list of category links with arrow icons
17. **Sidebar: Recent Posts Row** — heading + repeater of 3 mini post cards (thumbnail, title, date)
18. **Sidebar: Have a Question / CTA Card Row** — background image card + heading + description + phone + email
19. **Comment Form Row** — "Leave a Reply" heading + subtext + Name/Email/Website/Comment fields + save-info checkbox + Post Comment CTA

#### PAGE: Contact
20. **Page Title/Banner Row** — Inner Page Hero + secondary "Contact" sub-nav breadcrumb frame
21. **Contact Info Grid Row** — repeater of 4 contact-info blocks (2×2 grid: address, phone, email — pattern repeats, appears to duplicate 2 sets in the raw Figma, likely 2 offices/branches — **NEEDS CONFIRMATION**: verify with designer whether this is 2 branch locations or a Figma duplication artifact)
22. **Contact Form Card Row** — image/decorative panel + form card (Your Name, Your Email, Subject, Your Message, Send Message CTA)

---

## 5. CMS FIELD REQUIREMENTS (representative rows)

```
Row: hero_search  (Home only)
 - eyebrow            (none present, omit)
 - title              (rich text / 2-line heading, e.g. "Make in your journey.")
 - subtitle           (text)
 - popular_places     (text, e.g. "Bali, Istanbul, Rome, Paris.")
 - background_image   (image, full-bleed)
 - search_defaults    (object: location_placeholder, date_placeholder, people_placeholder)
 - cta_label          (text, "Explore now")
 - cta_link           (url)

Row: inner_page_hero  (About/Package/Blog/Contact)
 - title              (text)
 - breadcrumb_label   (text, e.g. "Home / About Us")
 - background_image   (image)
 - meta (optional)    (object: author, date, tags[]) — only for blog detail variant

Row: service_grid
 - heading, subheading
 - items[]: { icon (icon/svg field), title, description, link_label, link_url }

Row: card_repeater_asymmetric   (Home Explore row / Package Tips&Article row)
 - heading, subheading
 - featured_item: { image, caption_title, caption_text, quote_text (optional) }
 - secondary_items[]: { image }

Row: partner_logos
 - heading, subheading
 - logos[]: { image (svg), alt_text, link_url (optional) }

Row: testimonials
 - eyebrow, heading, subheading
 - items[]: { avatar_image, name, role, quote_text, rating (number 1-5) }

Row: destination_card_grid
 - heading, subheading, cta_label, cta_url
 - items[]: { image, name, price, duration_label, description, rating, booking_cta_label, booking_cta_url }

Row: blog_card_grid
 - heading, subheading, cta_label, cta_url
 - items[]: { image, category_label, title, excerpt, read_more_url, published_date }

Row: article_body
 - featured_image
 - title
 - body_richtext (repeatable rich-text + image blocks, in order)
 - tags[]
 - share_enabled (boolean)

Row: sidebar_categories
 - heading
 - items[]: { label, url }

Row: sidebar_recent_posts
 - heading
 - items[]: { thumbnail, title, date, url }

Row: cta_contact_card
 - background_image, heading, description, phone, email

Row: comment_form
 - heading, description
 - (form fields are structural, not CMS content: name, email, website, comment)
 - submit_label

Row: contact_info_grid
 - items[]: { address, phone, email } (repeater, likely length 2 per branch — confirm)

Row: contact_form_card
 - decorative_image
 - form_heading (optional)
 - submit_label ("Send Message")

Row: stats_counters
 - background_image
 - items[]: { icon, number, label }

Row: gallery
 - eyebrow, heading
 - items[]: { image, caption_label } (fixed 4-item asymmetric layout: 1 large + 3 stacked — confirm if repeater or fixed slots)

Row: subscribe_newsletter  (part of global Footer, but content is CMS-editable)
 - heading, subtext, input_placeholder, cta_label

Row: footer_global
 - logo, blurb_text
 - contact_info: { address, phone, email }
 - quick_links[]: { label, url }
 - social_links[]: { platform, url, icon }
 - copyright_text
```

---

## 6. RESPONSIVE STRATEGY (proposed — pending confirmation per §3)

Since Figma provides only desktop (1512px) frames, propose standard, minimally-invasive rules per row type, to be confirmed before Phase 6:

- **Container:** max-width ~1372-1512px desktop, fluid with side padding below that; ~24px mobile gutter.
- **Multi-column card grids** (3-col services, 2/3-col destination cards, testimonial 4-up): Desktop = as designed → Tablet = 2 columns → Mobile = 1 column, stacked, full width.
- **Asymmetric image rows** (Explore/Tips&Article: 1 large + 2-3 stacked): Desktop = as designed → Tablet = large image full width, stacked items below in 2-col → Mobile = all stacked, 1 column.
- **Hero:** Desktop 860px tall full-bleed → Tablet reduce height ~600px → Mobile ~500px, search widget collapses from horizontal pill to stacked full-width fields.
- **Typography scale:** Desktop H1 90px → Tablet ~56px → Mobile ~36px (using standard 0.6x/0.4x reduction ratios, to be confirmed against brand type scale if one exists).
- **Header nav:** Desktop = full horizontal nav → Tablet/Mobile = hamburger/drawer menu (not present in Figma desktop frame — needs UX confirmation on interaction pattern).
- **Footer columns** (contact / quick links / social / subscribe): Desktop = 4-column row → Tablet = 2-column → Mobile = stacked single column.

---

## 7. REUSABLE COMPONENT ARCHITECTURE

```
CMS row data
   ↓
Page (app/[slug]/page.tsx — Server Component, fetches page + rows[])
   ↓
RowRenderer (maps row.type → Section component)
   ↓
Section components (components/sections/*)
   ├── HeroSearch
   ├── InnerPageHero
   ├── ServiceGrid
   ├── AsymmetricFeatureRow
   ├── PartnerLogos
   ├── TestimonialGrid
   ├── DestinationCardGrid
   ├── BlogCardGrid
   ├── ArticleBody
   ├── SidebarCategories
   ├── SidebarRecentPosts
   ├── CtaContactCard
   ├── CommentForm
   ├── ContactInfoGrid
   ├── ContactFormCard
   ├── StatsCounters
   └── Gallery
         ↓ (compose from)
   Reusable UI primitives (components/ui/*)
   ├── Button (pill, black/outline variants)
   ├── Container
   ├── SectionHeading (eyebrow + title + subtitle)
   ├── Card (base card w/ radius+shadow tokens)
   ├── Image (wrapper enforcing aspect-ratio + object-fit)
   ├── IconLabel (icon + text row, used in footer/contact/blog meta)
   ├── Rating (star display)
   ├── Avatar (circular mask image)
   └── FormField (input/textarea w/ label pattern seen in contact/comment forms)
   Layout components (components/layout/*)
   ├── Header (global nav, receives currentPath for active-state)
   └── Footer (global, receives CMS footer content)
```

---

## 8. PROPOSED NEXT.JS ARCHITECTURE

```
app/
 ├── layout.tsx              (Header + Footer shell, global fonts/Tailwind)
 ├── page.tsx                (Home)
 ├── about/page.tsx
 ├── packages/page.tsx       (Destination/Package listing)
 ├── blog/page.tsx           (Blog index — needs confirmation, §1)
 ├── blog/[slug]/page.tsx    (Blog detail)
 └── contact/page.tsx

components/
 ├── layout/ (Header, Footer)
 ├── sections/ (one file per Row type, §7)
 └── ui/ (Button, Card, SectionHeading, etc.)

lib/
 ├── cms/ (fetchPage, fetchRows, row-type registry/mapping)
 └── utils/ (formatting, image helpers)

types/
 ├── cms.ts (Page, Row, RowType union, per-row field interfaces)
 └── content.ts
```

### CMS → React data flow
```
CMS (Page document: { title, slug, seo, rows[] })
 → getPageBySlug(slug) at request/build time
 → rows[] passed to <RowRenderer rows={rows} />
 → RowRenderer switches on row.type, renders matching Section component
 → Section component destructures row.fields into typed props
 → Section composes Reusable UI primitives for final markup
```

---

## 9. IMAGE INVENTORY (representative — full list to be finalized during Phase 2 asset export)

| Image | Page(s) | Purpose | Approx Desktop AR | CMS field? |
|---|---|---|---|---|
| Hero background (mountains/coast) | Home | Decorative/content hero | 1512×860 (~1.76:1) | Yes |
| Luggage cutout | Home hero | Decorative overlay | native | Yes (optional overlay image) |
| Explore-row images (3x) | Home | Content | mixed, 1 large ~442×447 + 2 medium ~444×361 | Yes |
| Destination card images | Package | Content (repeater) | 444×319 (top-rounded) | Yes |
| Blog card images | Blog/Package tips | Content (repeater) | varies (792×679 featured, 149×99 thumbnails) | Yes |
| Testimonial avatars | Home | Content, circular mask | ~130×130 | Yes |
| Gallery images (4x) | About | Content | 1 large 676×676 + 3 at 328×328/675×328 | Yes |
| Partner logos (5x) | Home | Content, brand marks | SVG, varies | Yes |
| Footer background texture | All pages | Decorative | 1516×542 | Could be global setting, not per-page |
| Inner-page hero banners | About/Package/Blog/Contact | Content | 1512×860 | Yes |
| Icons (location/phone/mail/social/etc.) | Global | Decorative/UI | SVG, 16-28px | No — ship as static icon set, not CMS field |

All images should be **CMS image fields** (not hardcoded), except the small UI icon set which should ship as a static icon library (e.g., in `components/ui/icons`).

---

## 10. IMPLEMENTATION PHASES (sequence only — not started)

- **Phase 1 — Project structure & tokens:** scaffold Next.js/TS/Tailwind, encode design tokens from §2 (colors, type scale, radii, shadows) into `tailwind.config`.
- **Phase 2 — CMS data model:** implement `types/cms.ts`, row-type registry, mock/local JSON fixtures matching §4/§5 shapes for dev before real CMS wiring.
- **Phase 3 — Global layout:** Header + Footer components, `app/layout.tsx`.
- **Phase 4 — UI primitives:** Button, Card, SectionHeading, Image wrapper, IconLabel, Rating, Avatar, FormField (§7).
- **Phase 5 — Section components:** build each Section component per §7, wired to typed CMS field props, using static/mock data first.
- **Phase 6 — Page assembly:** wire `RowRenderer` + all 5 route pages to compose Sections in Figma-verified order (§4 row inventory).
- **Phase 7 — Responsive implementation:** apply §6 rules per row (pending Figma tablet/mobile confirmation).
- **Phase 8 — Real CMS integration:** connect `lib/cms/fetchPage` to actual CMS/data source, replace fixtures.
- **Phase 9 — Pixel-perfect QA:** diff against Figma screenshots per row, verify type scale/spacing/colors from §2 exactly.
- **Phase 10 — Forms/interactions:** wire Contact form + Comment form + Newsletter subscribe to real submission handlers (no functionality assumptions beyond what's visually specified).

---

## 11. NEEDS CONFIRMATION — FULL LIST

1. **No dedicated "Destination" listing frame** distinct from "Package" — confirm Package IS the Destination page, or a separate frame exists elsewhere.
2. **No dedicated "Blog index" frame** distinct from "Single Blog" — confirm whether the card-grid section inside "Single Blog" doubles as the blog index, or a separate index frame exists.
3. **No tablet or mobile frames found in the Figma file** — all 5 top-level frames are 1512px desktop only. Responsive behavior in §6 is a proposed fallback, not read from Figma, and needs sign-off.
4. **Contact Info Grid (Row 21)** appears to show 2 duplicated sets of address/phone/email blocks stacked — confirm if intentional (2 branches) or Figma duplication artifact to collapse into 1 set.
5. **Mobile/tablet nav pattern** (hamburger vs. other) is not specified anywhere in the file — needs UX decision.
6. **Gallery row (About page)** — confirm if the 4-image asymmetric layout is a fixed 4-slot layout or a true repeater (design only shows exactly 4 images).
7. Multiple text nodes contain placeholder/Lorem Ipsum copy and at least one visible typo ("Leaern more", "Subcribe", "Massage", "EMail") in the source Figma — flag for content team correction rather than reproducing typos in CMS defaults.
8. **Package/Destination card grid column count on desktop** — metadata shows 3-across at the given spacing; confirm this holds at true 1512px container or if Figma positions are pre-computed for one fixed breakpoint only.

---

**End of Phase 1 analysis. Awaiting approval before any implementation (Phase 2+).**
