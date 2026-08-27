"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AsymmetricFeatureFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AsymmetricFeatureRowProps {
  fields: AsymmetricFeatureFields;
}

const defaultCards = [
  {
    id: 1,
    image: "/images/home-img-1.png",
    title: "Venice, Italy.",
    description: "Explore romantic canals and historical architecture with good friends.",
  },
  {
    id: 2,
    image: "/images/home-img-2.png",
    title: "Bali, Indonesia.",
    description: "Bali is a beautiful tourist spot and is visited by many travelers.",
    isDefault: true,
  },
  {
    id: 3,
    image: "/images/home-img-3.png",
    title: "New York, USA.",
    description: "Iconic skyline and vibrant culture in the city that never sleeps.",
  },
  {
    id: 4,
    image: "/images/dubai.png",
    title: "Dubai, UAE.",
    description: "Experience world-class luxury and breathtaking modern architectures.",
  },
  {
    id: 5,
    image: "/images/paris.png",
    title: "Paris, France.",
    description: "The city of light, art, fashion, and romantic landmarks.",
  },
  {
    id: 6,
    image: "/images/italy.png",
    title: "Rome, Italy.",
    description: "Timeless ancient history, cobblestone streets, and exquisite dining.",
  },
];

export function AsymmetricFeatureRow({ fields }: AsymmetricFeatureRowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // Build dynamic cards list from fields if available
  const allCards = React.useMemo(() => {
    const list = [...defaultCards];
    if (fields?.featured_item?.image) {
      list[1] = {
        ...list[1],
        image: fields.featured_item.image,
        title: fields.featured_item.caption_title || list[1].title,
        description: fields.featured_item.caption_text || list[1].description,
      };
    }
    if (fields?.secondary_items && fields.secondary_items.length > 0) {
      if (fields.secondary_items[0]) {
        list[0] = {
          ...list[0],
          image: fields.secondary_items[0].image || list[0].image,
          title: fields.secondary_items[0].caption_title || list[0].title,
          description: fields.secondary_items[0].caption_text || list[0].description,
        };
      }
      if (fields.secondary_items[1]) {
        list[2] = {
          ...list[2],
          image: fields.secondary_items[1].image || list[2].image,
          title: fields.secondary_items[1].caption_title || list[2].title,
          description: fields.secondary_items[1].caption_text || list[2].description,
        };
      }
    }
    return list;
  }, [fields]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, allCards.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Compute exact sliding transform style
  const getTransformStyle = () => {
    if (itemsPerView === 1) {
      return `translateX(calc(-${currentIndex} * (100% + 16px)))`;
    }
    if (itemsPerView === 2) {
      return `translateX(calc(-${currentIndex} * (100% + 24px) / 2))`;
    }
    return `translateX(calc(-${currentIndex} * (100% + 32px) / 3))`;
  };

  const heading = fields?.heading || "Explore new worlds with\nexotic natural scenery";
  const subheading = fields?.subheading || "Explore the world with what you love beautiful natural beauty.";

  return (
    <section className="py-24 sm:py-32 bg-white relative">
      <Container size="content" className="px-4 sm:px-6">
        {/* Top Header Row with Centered Title & Top Left/Right Arrows */}
        <div className="relative mb-14 flex items-center justify-between">
          {/* Top-Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous cards"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md flex items-center justify-center text-black hover:bg-gray-50 active:scale-95 transition-all shrink-0 z-20"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Centered Heading */}
          <div className="text-center px-4 max-w-2xl mx-auto">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[44px] lg:leading-[54px] text-black tracking-tight whitespace-pre-line">
              {heading}
            </h2>
            <p className="font-poppins text-xs sm:text-sm lg:text-[14px] text-[#777777] mt-3 font-normal">
              {subheading}
            </p>
          </div>

          {/* Top-Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next cards"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md flex items-center justify-center text-black hover:bg-gray-50 active:scale-95 transition-all shrink-0 z-20"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Smooth Sliding Carousel Track within 3-Card Container Width */}
        <div className="overflow-hidden py-4 -my-4 w-full">
          <div
            className="flex transition-transform duration-500 ease-out gap-4 md:gap-6 lg:gap-8 items-start"
            style={{ transform: getTransformStyle() }}
          >
            {allCards.map((card, idx) => {
              const isHovered = hoveredCardIndex === idx;
              const isDefault = card.isDefault && hoveredCardIndex === null;
              const showInfo = isHovered || isDefault;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  className="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)] shrink-0 select-none group cursor-pointer relative"
                >
                  {/* 1. Main Card Image Box */}
                  <div className="relative h-[360px] sm:h-[390px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* 2. White Info Box Floating over the bottom on Hover */}
                  <div
                    className={cn(
                      "relative -mt-24 sm:-mt-28 mx-3 bg-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-gray-100 transition-all duration-400 ease-out z-20",
                      showInfo
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-6 pointer-events-none"
                    )}
                  >
                    {/* Circular Quote Badge */}
                    <div className="absolute -top-6 right-5 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100">
                      <div className="relative w-5 h-5">
                        <Image
                          src="/images/quote.svg"
                          alt="Quote"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <h3 className="font-poppins font-bold text-base sm:text-lg text-black mb-1">
                      {card.title}
                    </h3>
                    <p className="font-poppins text-xs text-[#777777] leading-relaxed pr-6">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
