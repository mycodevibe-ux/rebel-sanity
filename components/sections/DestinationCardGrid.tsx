import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DestinationCardGridFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { Star, ArrowRight } from "lucide-react";

interface DestinationCardGridProps {
  fields: DestinationCardGridFields;
}

const PACKAGE_IMAGES: Record<string, string> = {
  paris: "/images/paris.png",
  swiss: "/images/home-img-1.png",
  thailand: "/images/bali.png",
  taiwan: "/images/italy.png",
  indonesia: "/images/dubai.png",
  singapore: "/images/home-img-3.png",
  dubai: "/images/dubai.png",
  bali: "/images/bali.png",
  italy: "/images/italy.png",
};

const DISTINCT_CARDS = [
  {
    id: "pkg-1",
    slug: "paris",
    image: "/images/paris.png",
    name: "Paris",
    price: "$299.00",
    duration_label: "/3days",
    description: "Experience the romance, world-class art at the Louvre, and stunning views of the Eiffel Tower.",
    rating: 5,
    booking_cta_label: "View Package",
    booking_cta_url: "/packages/paris",
  },
  {
    id: "pkg-2",
    slug: "swiss",
    image: "/images/home-img-1.png",
    name: "Swiss Alps",
    price: "$399.00",
    duration_label: "/4days",
    description: "Immerse in breathtaking snow-capped alpine peaks, scenic panoramic trains, and pristine glacier lakes.",
    rating: 5,
    booking_cta_label: "View Package",
    booking_cta_url: "/packages/swiss",
  },
  {
    id: "pkg-3",
    slug: "thailand",
    image: "/images/bali.png",
    name: "Thailand",
    price: "$249.00",
    duration_label: "/5days",
    description: "Unwind on tropical sun-drenched beaches, sail past limestone karsts, and explore colorful night markets.",
    rating: 5,
    booking_cta_label: "View Package",
    booking_cta_url: "/packages/thailand",
  },
  {
    id: "pkg-4",
    slug: "taiwan",
    image: "/images/italy.png",
    name: "Taiwan",
    price: "$289.00",
    duration_label: "/4days",
    description: "Explore the mystical mountain teahouses of Jiufen, marble gorges of Taroko, and vibrant night markets.",
    rating: 5,
    booking_cta_label: "View Package",
    booking_cta_url: "/packages/taiwan",
  },
  {
    id: "pkg-5",
    slug: "indonesia",
    image: "/images/dubai.png",
    name: "Indonesia (Bali)",
    price: "$349.00",
    duration_label: "/6days",
    description: "Escape to lush emerald rice terraces, cliffside ocean temples, private luxury pool villas, and serene spas.",
    rating: 5,
    booking_cta_label: "View Package",
    booking_cta_url: "/packages/indonesia",
  },
  {
    id: "pkg-6",
    slug: "singapore",
    image: "/images/home-img-3.png",
    name: "Singapore",
    price: "$319.00",
    duration_label: "/3days",
    description: "Discover the dazzling Garden City where futuristic Supertrees meet world-class luxury dining and Sentosa attractions.",
    rating: 5,
    booking_cta_label: "View Package",
    booking_cta_url: "/packages/singapore",
  },
];

export function DestinationCardGrid({ fields }: DestinationCardGridProps) {
  const cards = fields?.items && fields.items.length > 0 ? fields.items : DISTINCT_CARDS;
  const heading = fields?.heading || "Popular Destination";
  const subheading =
    fields?.subheading ||
    "Explore our handpicked collection of world-class tour packages and unforgettable vacation journeys.";
  const ctaLabel = fields?.cta_label || "Discover more";
  const ctaUrl = fields?.cta_url || "/packages";

  return (
    <section className="py-20 sm:py-28 bg-white font-poppins">
      <Container size="content" className="px-4 sm:px-8">
        {/* Top Header Row with Left Titles & Right Discover More Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[44px] lg:leading-[54px] text-black tracking-tight">
              {heading}
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed font-normal">
              {subheading}
            </p>
          </div>

          {/* Right Discover More Button */}
          <Link
            href={ctaUrl}
            className="px-8 py-3.5 btn-slide btn-shine text-white font-poppins font-bold text-xs sm:text-sm rounded-full shrink-0 shadow-md self-start md:self-auto"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card: any, idx: number) => {
            const slugStr =
              card.slug ||
              card.name?.toLowerCase().replace(/\s+/g, "-") ||
              DISTINCT_CARDS[idx % DISTINCT_CARDS.length].slug;

            const finalImage =
              card.image ||
              PACKAGE_IMAGES[slugStr] ||
              DISTINCT_CARDS[idx % DISTINCT_CARDS.length].image;

            const packageDetailUrl = `/packages/${slugStr}`;

            const displayPrice = card.duration_label
              ? `${card.price}${card.duration_label.startsWith("/") ? "" : "/"}${card.duration_label}`
              : card.price;

            const starCount = typeof card.rating === "number" ? card.rating : 5;

            return (
              <div
                key={card.id || card.name || idx}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.13)] overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2.5"
              >
                <div>
                  {/* Card Top Image - Full Clickable Link */}
                  <Link href={packageDetailUrl} className="block relative h-[260px] sm:h-[280px] w-full overflow-hidden">
                    <Image
                      src={finalImage}
                      alt={card.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>

                  {/* Card Body Content */}
                  <div className="p-7 sm:p-8">
                    {/* Name & Price/Duration Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-poppins font-bold text-xl text-black group-hover:text-orange-600 transition-colors">
                        <Link href={packageDetailUrl}>{card.name}</Link>
                      </h3>
                      <span className="font-poppins font-bold text-sm sm:text-base text-black bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        {displayPrice}
                      </span>
                    </div>

                    {/* Description Paragraph */}
                    <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed mb-4 line-clamp-3">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Row: Stars on left, Package Link button on right */}
                <div className="px-7 pb-7 sm:px-8 sm:pb-8 pt-0 flex items-center justify-between border-t border-gray-50 pt-4">
                  {/* Golden Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: starCount }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 text-[#f39c12] fill-[#f39c12]"
                      />
                    ))}
                  </div>

                  {/* View Details / Booking Button */}
                  <Link
                    href={packageDetailUrl}
                    className="px-6 py-2.5 btn-slide btn-shine text-white font-poppins font-bold text-xs rounded-full shrink-0 shadow-md flex items-center gap-1.5"
                  >
                    <span>View Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
