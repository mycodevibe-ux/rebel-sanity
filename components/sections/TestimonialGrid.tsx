"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TestimonialsFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialGridProps {
  fields: TestimonialsFields;
}

const defaultTestimonials = [
  {
    id: "1",
    avatar: "/images/sara.png",
    name: "Sara Jay",
    role: "Treveller",
    stars: 5,
    quote: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
  },
  {
    id: "2",
    avatar: "/images/danial.png",
    name: "Cristian Daniel",
    role: "Treveller",
    stars: 5,
    quote: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
  },
  {
    id: "3",
    avatar: "/images/hasan.png",
    name: "Kausar Hasan",
    role: "Treveller",
    stars: 5,
    quote: "Before we define any approach, we need to deline the brands overall goal. We then need to dive.",
  },
  {
    id: "4",
    avatar: "/images/siti.png",
    name: "Siti Sarah",
    role: "Treveller",
    stars: 5,
    quote: "Amazing experience exploring exotic natural places with Rebel Rover. Highly recommended!",
  },
  {
    id: "5",
    avatar: "/images/danial.png",
    name: "David Miller",
    role: "Treveller",
    stars: 5,
    quote: "Best service and price guarantee. Everything was organized perfectly without hassle.",
  },
];

export function TestimonialGrid({ fields }: TestimonialGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  const testimonials =
    fields?.items && fields.items.length > 0
      ? fields.items.map((t: any, idx: number) => ({
          id: t.id || `test-${idx}`,
          avatar: t.avatar || t.avatar_image || "/images/sara.png",
          name: t.name || "Client Name",
          role: t.role || "Treveller",
          stars: typeof t.stars === "number" ? t.stars : typeof t.rating === "number" ? t.rating : 5,
          quote: t.quote || t.quote_text || "Great travel experience with Rebel Rover.",
        }))
      : defaultTestimonials;

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

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Smooth sliding transform style
  const getTransformStyle = () => {
    if (itemsPerView === 1) {
      return `translateX(calc(-${currentIndex} * (100% + 16px)))`;
    }
    if (itemsPerView === 2) {
      return `translateX(calc(-${currentIndex} * (100% + 24px) / 2))`;
    }
    return `translateX(calc(-${currentIndex} * (100% + 32px) / 3))`;
  };

  const eyebrow = fields?.eyebrow || "TESTIMONIAL";
  const heading = fields?.heading || "What our client say";
  const subheading = fields?.subheading || "Create a visual identity for your company and a overall brand";

  return (
    <section className="py-24 sm:py-32 bg-[#fafafa]">
      <Container size="content" className="px-4 sm:px-6">
        {/* Top Header Row with Left Titles & Right Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-1.5">
            <span className="font-poppins text-xs font-semibold tracking-[0.2em] text-[#777777] uppercase block">
              {eyebrow}
            </span>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-black tracking-tight">
              {heading}
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-[#777777] mt-2 font-normal">
              {subheading}
            </p>
          </div>

          {/* Right Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonials"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-black hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonials"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-black hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Smooth Sliding Review Cards Viewport */}
        <div className="overflow-hidden py-4 -my-4 w-full">
          <div
            className="flex transition-transform duration-500 ease-out gap-4 md:gap-6 lg:gap-8 items-stretch"
            style={{ transform: getTransformStyle() }}
          >
            {testimonials.map((item: any) => (
              <div
                key={item.id}
                className="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)] shrink-0 select-none bg-white rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-md border border-gray-100/90 flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Circular Profile Avatar */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 shadow-sm border-2 border-white">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="font-poppins font-bold text-lg text-black">
                    {item.name}
                  </h3>
                  <span className="font-poppins text-xs text-[#777777] mb-4">
                    {item.role}
                  </span>

                  {/* Golden Stars */}
                  <div className="flex items-center gap-1.5 mb-5">
                    {Array.from({ length: item.stars }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 text-[#f39c12] fill-[#f39c12]"
                      />
                    ))}
                  </div>

                  {/* Review Copy */}
                  <p className="font-poppins text-xs sm:text-sm text-[#555555] leading-relaxed max-w-[280px]">
                    {item.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
