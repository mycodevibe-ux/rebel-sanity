import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DestinationCardGridFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { Star } from "lucide-react";

interface DestinationCardGridProps {
  fields: DestinationCardGridFields;
}

const defaultCards = [
  {
    id: "pkg-1",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    name: "Paris",
    price: "$299.00",
    duration_label: "/2days",
    description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore",
    rating: 5,
    booking_cta_label: "Booking now",
    booking_cta_url: "/contact",
  },
  {
    id: "pkg-2",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80",
    name: "Swiss",
    price: "$299.00",
    duration_label: "/3days",
    description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore",
    rating: 5,
    booking_cta_label: "Booking now",
    booking_cta_url: "/contact",
  },
  {
    id: "pkg-3",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&auto=format&fit=crop&q=80",
    name: "Thailand",
    price: "$299.00",
    duration_label: "/3days",
    description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore",
    rating: 5,
    booking_cta_label: "Booking now",
    booking_cta_url: "/contact",
  },
  {
    id: "pkg-4",
    image: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&auto=format&fit=crop&q=80",
    name: "Taiwan",
    price: "$299.00",
    duration_label: "/3days",
    description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore",
    rating: 5,
    booking_cta_label: "Booking now",
    booking_cta_url: "/contact",
  },
  {
    id: "pkg-5",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80",
    name: "Indonesi",
    price: "$299.00",
    duration_label: "/3days",
    description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore",
    rating: 5,
    booking_cta_label: "Booking now",
    booking_cta_url: "/contact",
  },
  {
    id: "pkg-6",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop&q=80",
    name: "Singapore",
    price: "$299.00",
    duration_label: "/3days",
    description: "Lorem ipsum dolor sit amet, consect adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore incididunt ut labore et dolore",
    rating: 5,
    booking_cta_label: "Booking now",
    booking_cta_url: "/contact",
  },
];

export function DestinationCardGrid({ fields }: DestinationCardGridProps) {
  const cards = fields?.items && fields.items.length > 0 ? fields.items : defaultCards;
  const heading = fields?.heading || "Popular Destination";
  const subheading = fields?.subheading || "orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna";
  const ctaLabel = fields?.cta_label || "Discover more";
  const ctaUrl = fields?.cta_url || "/packages";

  return (
    <section className="py-20 sm:py-28 bg-white">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card: any) => {
            const displayPrice = card.duration_label
              ? `${card.price}${card.duration_label.startsWith("/") ? "" : "/"}${card.duration_label}`
              : card.price;
            const buttonLabel = card.booking_cta_label || card.cta_label || "Booking now";
            const buttonLink = card.booking_cta_url || card.cta_url || "/contact";
            const starCount = typeof card.rating === "number" ? card.rating : 5;

            return (
              <div
                key={card.id || card.name}
                className="bg-white rounded-2xl border border-gray-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Top Image */}
                  <div className="relative h-[250px] sm:h-[270px] w-full overflow-hidden">
                    <Image
                      src={card.image || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80"}
                      alt={card.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Card Body Content */}
                  <div className="p-6 sm:p-7">
                    {/* Name & Price/Duration Row */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-poppins font-bold text-lg sm:text-xl text-black">
                        {card.name}
                      </h3>
                      <span className="font-poppins font-semibold text-sm sm:text-base text-black">
                        {displayPrice}
                      </span>
                    </div>

                    {/* Description Paragraph */}
                    <p className="font-poppins text-xs sm:text-[13px] text-[#777777] leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Row: Stars on left, Booking button on right */}
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 flex items-center justify-between">
                  {/* Golden Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: starCount }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 text-[#f39c12] fill-[#f39c12]"
                      />
                    ))}
                  </div>

                  {/* Booking Now Black Pill Button */}
                  <Link
                    href={buttonLink}
                    className="px-6 py-2.5 btn-slide btn-shine text-white font-poppins font-bold text-xs rounded-full shrink-0 shadow-sm"
                  >
                    {buttonLabel}
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
