import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { singleDestinationQuery, destinationsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { DestinationCardGrid } from "@/components/sections/DestinationCardGrid";
import { CtaContactCard } from "@/components/sections/CtaContactCard";
import { PackageBookingForm } from "@/components/sections/PackageBookingForm";
import { ExpertConsultationModal } from "@/components/sections/ExpertConsultationModal";
import {
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Calendar,
  Users,
  ShieldCheck,
  ArrowLeft,
  Send,
  PhoneCall,
} from "lucide-react";
import type { Metadata } from "next";

interface PackageDetailProps {
  params: {
    slug: string;
  };
}

const PACKAGE_IMAGES: Record<string, string> = {
  paris: "/images/paris.png",
  swiss: "/images/home-img-1.png",
  thailand: "/images/home-img-3.png",
  taiwan: "/images/blog-post-1.png",
  indonesia: "/images/bali.png",
  bali: "/images/bali.png",
  dubai: "/images/dubai.png",
  singapore: "/images/home-img-2.png",
  italy: "/images/italy.png",
};

const detailedFallbackPackages: Record<string, any> = {
  paris: {
    name: "Paris - City of Lights & Romance",
    price: "$299.00",
    duration: "3 Days / 2 Nights",
    location: "Paris, France",
    rating: 5,
    coverImage: "/images/Package-banner.png",
    featuredImage: "/images/paris.png",
    middleImage: "/images/blog-post-2.png",
    description:
      "Experience the world's most romantic city. Wander beneath the glowing Eiffel Tower, stroll through historic Montmartre, and savor artisanal French cuisine at charming sidewalk bistros.",
    highlights: [
      "Skip-the-line Eiffel Tower Summit & Seine River Sunset Cruise",
      "Guided Louvre Museum Masterpieces Tour with certified art historian",
      "Exclusive Palace of Versailles Day Trip with royal gardens entry",
      "Authentic French Wine & Gourmet Cheese Tasting Experience",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Paris & Romantic Seine River Cruise",
        desc: "Private airport transfer to your luxury boutique hotel. Evening VIP sunset cruise along the Seine River with champagne and illuminated views of Notre-Dame and Eiffel Tower.",
      },
      {
        day: "Day 2",
        title: "Louvre Museum & Historic Montmartre Walking Tour",
        desc: "Morning fast-track guided tour of the Louvre's legendary art collections. Afternoon stroll through the bohemian cobblestone streets of Montmartre and Sacré-Cœur Basilica.",
      },
      {
        day: "Day 3",
        title: "Versailles Palace Gardens & Departure",
        desc: "Morning royal excursion to the opulent Hall of Mirrors and Versailles fountains. Afternoon private transfer to Charles de Gaulle Airport.",
      },
    ],
  },
  swiss: {
    name: "Swiss Alps - Winter Wonderland & Alpine Adventure",
    price: "$399.00",
    duration: "4 Days / 3 Nights",
    location: "Interlaken & Zermatt, Switzerland",
    rating: 5,
    coverImage: "/images/about-banner.png",
    featuredImage: "/images/home-img-1.png",
    middleImage: "/images/aboutbg.png",
    description:
      "Immerse yourself in breathtaking snow-capped mountain peaks, pristine glacier lakes, and scenic panoramic trains across the heart of the Swiss Alps.",
    highlights: [
      "Scenic Glacier Express Panoramic Train Journey across mountain passes",
      "Jungfraujoch 'Top of Europe' Alpine Observatory Excursion",
      "Traditional Swiss Chocolate & Fondue Making Workshop in Interlaken",
      "Stay in authentic 5-star Swiss chalet with heated infinity pool",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Zurich Arrival & Scenic Train to Interlaken",
        desc: "Panoramic train ride to the idyllic resort town of Interlaken nestled between Lake Thun and Lake Brienz. Welcome fondue dinner.",
      },
      {
        day: "Day 2",
        title: "Jungfraujoch 'Top of Europe' High-Altitude Adventure",
        desc: "Ascend the cogwheel mountain railway to 3,454m altitude. Explore the Ice Palace and take in 360-degree views of the Aletsch Glacier.",
      },
      {
        day: "Day 3",
        title: "Zermatt & Matterhorn Glacier Paradise Excursion",
        desc: "Scenic day tour to the car-free mountain village of Zermatt with unobstructed views of the iconic Matterhorn peak.",
      },
      {
        day: "Day 4",
        title: "Lake Brienz Cruise & Zurich Departure",
        desc: "Morning turquoise lake steamboat cruise before private first-class transfer back to Zurich International Airport.",
      },
    ],
  },
  thailand: {
    name: "Thailand - Tropical Phuket & Phi Phi Island Paradise",
    price: "$249.00",
    duration: "5 Days / 4 Nights",
    location: "Phuket & Krabi, Thailand",
    rating: 5,
    coverImage: "/images/blog-banner.png",
    featuredImage: "/images/home-img-3.png",
    middleImage: "/images/article.png",
    description:
      "Unwind on pristine sun-drenched beaches, sail past towering limestone karsts in turquoise lagoons, and immerse in vibrant night markets and authentic Thai culture.",
    highlights: [
      "Private Speedboat Tour to Maya Bay & Phi Phi Leh Islands",
      "Elephant Sanctuary Ethical Bathing & Feeding Experience",
      "James Bond Island & Phang Nga Bay Sea Canoe Safari",
      "Beachfront 5-Star Resort with private pool villa and breakfast",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Phuket & Beachfront Welcome",
        desc: "Private airport pickup to luxury resort in Patong/Kata beach. Evening Thai seafood banquet on the beach.",
      },
      {
        day: "Day 2",
        title: "Phi Phi Islands & Maya Bay Speedboat Expedition",
        desc: "Snorkel in crystal-clear waters with colorful marine life, visit Viking Cave, and relax on the white sands of Bamboo Island.",
      },
      {
        day: "Day 3",
        title: "Ethical Elephant Jungle Sanctuary & Big Buddha",
        desc: "Spend an unforgettable morning interacting with rescued elephants in a natural jungle habitat, followed by panoramic Big Buddha sunset views.",
      },
      {
        day: "Day 4",
        title: "Phang Nga Bay Sea Kayaking & Floating Village",
        desc: "Explore secret sea caves (hongs) by kayak and visit the historic Koh Panyee Muslim floating village.",
      },
      {
        day: "Day 5",
        title: "Old Phuket Town Heritage Walk & Departure",
        desc: "Shop colorful Sino-Portuguese street markets before transfer to Phuket Airport for your flight home.",
      },
    ],
  },
  taiwan: {
    name: "Taiwan - Jiufen Lanterns & Taroko Marble Gorge",
    price: "$289.00",
    duration: "4 Days / 3 Nights",
    location: "Taipei & Hualien, Taiwan",
    rating: 5,
    coverImage: "/images/home-banner.png",
    featuredImage: "/images/blog-post-1.png",
    middleImage: "/images/italy.png",
    description:
      "Explore the magical misty mountain town of Jiufen, taste world-famous Michelin-rated night market street food, and gaze up at the dramatic cliffs of Taroko Gorge.",
    highlights: [
      "Jiufen Old Street Spirited Away Mountain Teahouse Tour",
      "Taroko National Park Marble Gorge Canyon Guided Hike",
      "Taipei 101 Observatory fast elevator & skyline view",
      "Shilin & Raohe Night Market Culinary Foodie Safari",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Taipei Arrival & Raohe Night Market Food Tour",
        desc: "Check-in at Taipei 5-star hotel. Evening foodie safari exploring crispy pepper buns, beef noodle soup, and bubble tea.",
      },
      {
        day: "Day 2",
        title: "Jiufen Old Street & Pingxi Sky Lantern Release",
        desc: "Release a traditional calligraphy sky lantern in Pingxi village and explore the winding lantern-lit stairways of Jiufen.",
      },
      {
        day: "Day 3",
        title: "Taroko National Park Marble Canyon Expedition",
        desc: "High-speed rail to Hualien. Walk the Swallow Grotto suspension bridges and marvel at emerald mountain rivers.",
      },
      {
        day: "Day 4",
        title: "Taipei 101 Skyline & Taoyuan Airport Departure",
        desc: "Visit the National Palace Museum and Taipei 101 Observatory deck before VIP airport transfer.",
      },
    ],
  },
  indonesia: {
    name: "Indonesia - Bali Luxury Retreat & Ubud Sacred Jungles",
    price: "$349.00",
    duration: "6 Days / 5 Nights",
    location: "Bali, Indonesia",
    rating: 5,
    coverImage: "/images/contact-banner.png",
    featuredImage: "/images/bali.png",
    middleImage: "/images/home-img-2.png",
    description:
      "Escape to lush emerald rice terraces, cliffside ocean temples, private jungle pool villas, and spiritual yoga sanctuaries in the heart of Bali.",
    highlights: [
      "Ubud Tegallalang Rice Terraces & Famous Bali Jungle Swing",
      "Uluwatu Sunset Ocean Cliff Temple & Kecak Fire Dance",
      "Nusa Penida Kelingking 'T-Rex' Beach Island Day Trip",
      "Traditional Balinese Herbal Spa & Hot Stone Massage",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Denpasar Arrival & Private Ubud Villa Check-in",
        desc: "Traditional flower garland welcome and private transfer to Ubud rainforest resort.",
      },
      {
        day: "Day 2",
        title: "Tegallalang Rice Terraces, Waterfalls & Jungle Swing",
        desc: "Morning walk through UNESCO rice fields, swimming at Tegenungan waterfall, and flying high over jungle valleys on the Bali swing.",
      },
      {
        day: "Day 3",
        title: "Nusa Penida Island Tour: Kelingking & Broken Beach",
        desc: "Speedboat across the Badung Strait to admire the world-famous T-Rex headland and crystal bay snorkeling.",
      },
      {
        day: "Day 4",
        title: "Uluwatu Clifftop Temple & Romantic Jimbaran Seafood",
        desc: "Watch the sun set over the Indian Ocean while chanting dancers perform the ancient Kecak drama, followed by a candlelit seafood dinner on Jimbaran beach.",
      },
      {
        day: "Day 5",
        title: "Seminyak Beach Club & Balinese Spa Day",
        desc: "Full-day relaxation with a 2-hour Balinese massage and afternoon cocktail lounge at Potato Head Beach Club.",
      },
      {
        day: "Day 6",
        title: "Souvenir Shopping & Airport Departure",
        desc: "Last-minute artisan shopping in Kuta markets before transfer to Ngurah Rai Airport.",
      },
    ],
  },
  dubai: {
    name: "Dubai - Desert Safari & Futuristic Skylines",
    price: "$319.00",
    duration: "4 Days / 3 Nights",
    location: "Dubai, United Arab Emirates",
    rating: 5,
    coverImage: "/images/home-banner.png",
    featuredImage: "/images/dubai.png",
    middleImage: "/images/aboutbg.png",
    description:
      "Experience the dazzling blend of golden Arabian dunes and futuristic architectural marvels in Dubai. Discover luxury desert safaris, sky-high dining, and sunset boat cruises.",
    highlights: [
      "Burj Khalifa 124th & 125th Floor At The Top Observation Entry",
      "Premium 4x4 Red Dune Desert Safari with BBQ Dinner & Shows",
      "Dubai Marina Luxury Sunset Yacht Cruise with refreshments",
      "Stay in 5-star hotel with rooftop infinity pool overlooking downtown",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Dubai Arrival & Marina Sunset Yacht Cruise",
        desc: "VIP airport transfer to your 5-star hotel. Evening private yacht cruise past the illuminated Dubai Marina skyscrapers.",
      },
      {
        day: "Day 2",
        title: "Burj Khalifa & Dubai Mall Fountains",
        desc: "Ascend the world's tallest tower for panoramic city views. Evening synchronized Dubai Fountain music show and gourmet dining.",
      },
      {
        day: "Day 3",
        title: "Red Dune Desert Safari & Bedouin Camp Banquet",
        desc: "Thrilling dune bashing, sandboarding, and camel riding followed by traditional tanoura dance and Arabian grill buffet under the stars.",
      },
      {
        day: "Day 4",
        title: "Old Souks Heritage Walk & Airport Departure",
        desc: "Traditional abra boat crossing across Dubai Creek to explore Gold & Spice Souks before airport transfer.",
      },
    ],
  },
};

export async function generateMetadata({ params }: PackageDetailProps): Promise<Metadata> {
  const dest = await client
    .fetch(singleDestinationQuery, { slug: params.slug }, { next: { revalidate: 0 } })
    .catch(() => null);

  const fallback = detailedFallbackPackages[params.slug];
  const title = dest?.name || fallback?.name || "Travel Package";

  return {
    title: `${title} — Rebel Rover Tour Packages`,
    description: dest?.description || fallback?.description || "Explore this tour package with Rebel Rover.",
  };
}

export default async function PackageDetailPage({ params }: PackageDetailProps) {
  const [destData, allLiveDestinations] = await Promise.all([
    client.fetch(singleDestinationQuery, { slug: params.slug }, { next: { revalidate: 0 } }).catch(() => null),
    client.fetch(destinationsQuery, {}, { next: { revalidate: 0 } }).catch(() => null),
  ]);

  const fallback =
    detailedFallbackPackages[params.slug] || detailedFallbackPackages["paris"];

  const matchedCover =
    PACKAGE_IMAGES[params.slug] || destData?.image || fallback.featuredImage;

  const pkg = {
    name: destData?.name || fallback.name,
    price: destData?.price || fallback.price,
    duration: destData?.duration || fallback.duration,
    location: fallback.location,
    rating: typeof destData?.rating === "number" ? destData.rating : fallback.rating,
    coverImage: fallback.coverImage || "/images/Package-banner.png",
    featuredImage: matchedCover,
    middleImage: fallback.middleImage,
    description: destData?.description || fallback.description,
    highlights: fallback.highlights,
    itinerary: fallback.itinerary,
  };

  // Other packages for sidebar & bottom grid with 100% DISTINCT photos
  const rawList =
    allLiveDestinations && allLiveDestinations.length > 0
      ? allLiveDestinations.filter((d: any) => d.slug !== params.slug && d.name?.toLowerCase() !== params.slug)
      : Object.keys(detailedFallbackPackages)
          .filter((s) => s !== params.slug)
          .map((s) => ({ slug: s, ...detailedFallbackPackages[s] }));

  const sidebarPackages = rawList.slice(0, 3).map((d: any, idx: number) => {
    const slugStr = d.slug || d.name?.toLowerCase().replace(/[\s()]+/g, "-").replace(/-+/g, "-") || `pkg-${idx + 1}`;
    const img = PACKAGE_IMAGES[slugStr] || d.image || "/images/paris.png";
    return {
      name: d.name,
      price: d.price || "$299.00",
      duration: d.duration || "3 Days",
      image: img,
      slug: slugStr,
    };
  });

  const bottomGridItems = rawList.slice(0, 3).map((d: any, idx: number) => {
    const slugStr = d.slug || d.name?.toLowerCase().replace(/[\s()]+/g, "-").replace(/-+/g, "-") || `pkg-${idx + 1}`;
    const img = PACKAGE_IMAGES[slugStr] || d.image || "/images/paris.png";
    return {
      id: d._id || slugStr,
      name: d.name,
      price: d.price || "$299.00",
      duration_label: d.duration || "/3days",
      description: d.description || "Experience the best handpicked luxury vacations and cultural landmarks.",
      image: img,
      rating: d.rating || 5,
      booking_cta_label: "View Package",
      booking_cta_url: `/packages/${slugStr}`,
    };
  });

  return (
    <main className="min-h-screen bg-white font-poppins">
      {/* 1. Large Hero Banner */}
      <section className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] w-full flex items-center justify-center overflow-hidden py-24">
        <Image
          src={pkg.coverImage}
          alt={pkg.name}
          fill
          priority
          className="object-cover object-center brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1.5px]" />

        <Container size="content" className="relative z-10 text-center px-4 sm:px-8 max-w-4xl pt-16">
          {/* Back button & Location Pill */}
          <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/95 hover:text-white transition-all bg-white/15 backdrop-blur-md px-5 py-2 rounded-full border border-white/25 hover:bg-white/25 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Packages</span>
            </Link>
            <span className="bg-orange-500 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{pkg.location}</span>
            </span>
          </div>

          <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight drop-shadow-2xl">
            {pkg.name}
          </h1>

          {/* Meta Bar: Price, Duration, Stars */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mt-7 text-xs sm:text-base text-white/95 font-medium flex-wrap">
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>{pkg.duration}</span>
            </span>
            <span className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 font-bold text-white">
              <span>From {pkg.price} / person</span>
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: pkg.rating }).map((_, s) => (
                <Star key={s} className="w-4 h-4 text-[#f39c12] fill-[#f39c12]" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Package Details & Booking Sidebar */}
      <section className="py-20 sm:py-28 bg-white">
        <Container size="content" className="px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Itinerary, Photos, Included/Excluded, Form (8 cols) */}
            <div className="lg:col-span-8 space-y-14">
              {/* Main Featured Photo */}
              <div className="relative h-[380px] sm:h-[520px] w-full rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src={pkg.featuredImage}
                  alt={pkg.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* Package Overview */}
              <div className="space-y-4">
                <h2 className="font-bold text-2xl sm:text-3xl text-black">
                  Tour Package Overview
                </h2>
                <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="p-8 bg-[#f9fafb] rounded-3xl border border-gray-100 space-y-4">
                <h3 className="font-bold text-xl text-black flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <span>Key Experience Highlights</span>
                </h3>
                <ul className="space-y-3">
                  {pkg.highlights.map((hl: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#444444]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Day-by-Day Itinerary */}
              <div className="space-y-6">
                <h2 className="font-bold text-2xl sm:text-3xl text-black">
                  Day-by-Day Itinerary
                </h2>
                <div className="space-y-5">
                  {pkg.itinerary.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                          {item.day}
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-black">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-[#666666] leading-relaxed pl-1">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Supporting Photo */}
              <div className="relative h-[320px] sm:h-[440px] w-full rounded-3xl overflow-hidden shadow-md border border-gray-100">
                <Image
                  src={pkg.middleImage}
                  alt="Scenic Destination Experience"
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Included vs Excluded */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3">
                  <h4 className="font-bold text-base text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>What is Included</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                    <li>✓ 5-Star Luxury Hotel Accommodations</li>
                    <li>✓ Daily Gourmet Buffet Breakfast</li>
                    <li>✓ Airport Transfers in Private AC Coach</li>
                    <li>✓ Certified English Speaking Tour Guide</li>
                    <li>✓ All Sightseeing Entry Tickets</li>
                  </ul>
                </div>

                <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-3">
                  <h4 className="font-bold text-base text-rose-900 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>What is Excluded</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                    <li>✗ International Flight Tickets</li>
                    <li>✗ Personal Travel Insurance</li>
                    <li>✗ Alcoholic Drinks & Special Meals</li>
                    <li>✗ Gratuities & Tips for Driver/Guide</li>
                    <li>✗ Personal Shopping & Souvenirs</li>
                  </ul>
                </div>
              </div>

              {/* Inquiry & Booking Form Card */}
              <PackageBookingForm packageName={pkg.name} />
            </div>

            {/* Right Column: Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-8 sticky top-28">
              {/* Quick Pricing & Instant Booking Card */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
                <div className="space-y-1">
                  <span className="text-xs uppercase text-[#777777] font-semibold">
                    Package Price
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-3xl sm:text-4xl text-black">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-[#777777]">/ person</span>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-100 text-xs sm:text-sm text-[#555555]">
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold text-black">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Destination:</span>
                    <span className="font-semibold text-black">{pkg.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Group Type:</span>
                    <span className="font-semibold text-black">Private / Small Group</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hotel Rating:</span>
                    <span className="font-semibold text-black">5-Star Luxury</span>
                  </div>
                </div>

                <ExpertConsultationModal
                  packageName={pkg.name}
                  location={pkg.location}
                  price={pkg.price}
                  duration={pkg.duration}
                />
              </div>

              {/* Other Featured Packages with 100% DISTINCT Photos */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
                <h3 className="font-bold text-xl text-black">
                  Other Popular Tours
                </h3>
                <div className="space-y-4">
                  {sidebarPackages.map((item: any, idx: number) => (
                    <Link
                      key={idx}
                      href={`/packages/${item.slug}`}
                      className="flex items-center gap-4 group hover:opacity-90 transition-opacity"
                    >
                      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-xs sm:text-sm text-black group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-[#777777]">
                          <span className="font-bold text-black">{item.price}</span>
                          <span>•</span>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 24/7 Expert CTA Card */}
              <CtaContactCard
                fields={{
                  heading: "Have Any Question?",
                  description: "Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.",
                  phone: "+62 6943 6956",
                  email: "contact@domain.com",
                }}
              />
            </aside>
          </div>
        </Container>
      </section>

      {/* 3. Related Tour Packages Grid */}
      {bottomGridItems.length > 0 && (
        <DestinationCardGrid
          fields={{
            heading: "Related Tour Packages",
            subheading: "Discover more world-class vacation packages tailored for your next unforgettable journey",
            cta_label: "View All Packages",
            cta_url: "/packages",
            items: bottomGridItems,
          }}
        />
      )}
    </main>
  );
}
