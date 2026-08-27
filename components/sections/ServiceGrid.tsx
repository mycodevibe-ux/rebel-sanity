"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ServiceGridFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceGridProps {
  fields: ServiceGridFields;
}

const defaultServiceCards = [
  {
    id: 1,
    icon: "/images/best-service.png",
    title: "Best Service",
    description: "our service is reliable and convenient, our service is quality.",
    link_label: "Leaern more",
    link_url: "/packages",
  },
  {
    id: 2,
    icon: "/images/price.png",
    title: "Price Guarantee",
    description: "our service is reliable and convenient, our service is quality.",
    link_label: "Leaern more",
    link_url: "/packages",
  },
  {
    id: 3,
    icon: "/images/handpicked.png",
    title: "Handpicked Hotels",
    description: "our service is reliable and convenient, our service is quality.",
    link_label: "Leaern more",
    link_url: "/packages",
  },
  {
    id: 4,
    icon: "/images/best-service.png",
    title: "24/7 Dedicated Support",
    description: "our service is reliable and convenient, our service is quality.",
    link_label: "Leaern more",
    link_url: "/contact",
  },
  {
    id: 5,
    icon: "/images/price.png",
    title: "Customized Tour Itinerary",
    description: "our service is reliable and convenient, our service is quality.",
    link_label: "Leaern more",
    link_url: "/packages",
  },
];

export function ServiceGrid({ fields }: ServiceGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const serviceCards =
    fields?.items && fields.items.length > 0 ? fields.items : defaultServiceCards;
  const heading = fields?.heading || "Why choose Us?";
  const subheading = fields?.subheading || "our services have been trusted by world travelers.";

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

  const maxIndex = Math.max(0, serviceCards.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const getTransformStyle = () => {
    if (itemsPerView === 1) {
      return `translateX(calc(-${currentIndex} * (100% + 16px)))`;
    }
    if (itemsPerView === 2) {
      return `translateX(calc(-${currentIndex} * (100% + 24px) / 2))`;
    }
    return `translateX(calc(-${currentIndex} * (100% + 32px) / 3))`;
  };

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-slate-900">
      {/* High-Resolution Blue Ocean Coastline Banner Background Artwork */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/why-choose-us.png"
          alt="Why choose us background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <Container size="content" className="relative z-10 px-4 sm:px-8">
        {/* Top Centered Heading Row with Left/Right Slider Arrows */}
        <div className="relative mb-14 sm:mb-16 flex items-center justify-between">
          {/* Top-Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous services"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg flex items-center justify-center text-black hover:bg-gray-50 active:scale-95 transition-all shrink-0 z-20"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Centered White Heading */}
          <div className="text-center px-4 max-w-2xl mx-auto text-white">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[44px] lg:leading-[54px] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {heading}
            </h2>
            <p className="font-poppins text-xs sm:text-sm lg:text-[14px] text-white/95 mt-2.5 font-normal drop-shadow-sm">
              {subheading}
            </p>
          </div>

          {/* Top-Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next services"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg flex items-center justify-center text-black hover:bg-gray-50 active:scale-95 transition-all shrink-0 z-20"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* 3 Floating White Cards with clean shadow and smooth slide */}
        <div className="overflow-hidden py-6 -my-6 w-full">
          <div
            className="flex transition-transform duration-500 ease-out gap-4 md:gap-6 lg:gap-8 items-stretch"
            style={{ transform: getTransformStyle() }}
          >
            {serviceCards.map((item: any) => (
              <div
                key={item.id || item.title}
                className="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)] shrink-0 select-none bg-white rounded-2xl p-8 sm:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] flex flex-col justify-between items-start hover:-translate-y-2 transition-all duration-300 border border-gray-100/90 group min-h-[340px]"
              >
                <div>
                  {/* Black Square Icon Image */}
                  <div className="relative w-14 h-14 mb-6 transition-transform group-hover:scale-105 duration-300">
                    <Image
                      src={item.icon || "/images/best-service.png"}
                      alt={item.title}
                      fill
                      className="object-contain object-left"
                    />
                  </div>

                  <h3 className="font-poppins font-bold text-lg sm:text-xl text-black mb-3">
                    {item.title}
                  </h3>

                  <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <Link
                  href={item.link_url || "/packages"}
                  className="inline-flex items-center gap-2 font-poppins text-xs sm:text-sm font-bold text-black hover:text-orange-600 transition-colors group/link pt-2"
                >
                  <span>{item.link_label || "Learn more"}</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
