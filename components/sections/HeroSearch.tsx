"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { HeroSearchFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { ChevronDown, MapPin, Calendar, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSearchProps {
  fields: HeroSearchFields;
}

export function HeroSearch({ fields }: HeroSearchProps) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPeople, setSelectedPeople] = useState("");

  const [activeDropdown, setActiveDropdown] = useState<"location" | "date" | "people" | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const locationOptions = [
    { label: "Bali, Indonesia", value: "Bali" },
    { label: "Istanbul, Turkey", value: "Istanbul" },
    { label: "Rome, Italy", value: "Rome" },
    { label: "Paris, France", value: "Paris" },
    { label: "Tokyo, Japan", value: "Tokyo" },
    { label: "Swiss Alps, Switzerland", value: "Swiss" },
  ];

  const dateOptions = [
    { label: "September 2023", value: "Sep 2023" },
    { label: "October 2023", value: "Oct 2023" },
    { label: "November 2023", value: "Nov 2023" },
    { label: "December 2023", value: "Dec 2023" },
    { label: "Anytime / Flexible", value: "Flexible" },
  ];

  const peopleOptions = [
    { label: "1 Person (Solo)", value: "1 Person" },
    { label: "2 People (Couple)", value: "2 People" },
    { label: "3 - 4 People (Family)", value: "3-4 People" },
    { label: "5+ People (Group)", value: "5+ People" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (selectedLocation) query.set("location", selectedLocation);
    if (selectedDate) query.set("date", selectedDate);
    if (selectedPeople) query.set("people", selectedPeople);
    window.location.href = `/packages?${query.toString()}`;
  };

  const bgImage = fields?.background_image || "/images/home-banner.png";
  const title = fields?.title || "Make in\nyour journey.";
  const subtitle = fields?.subtitle || "Explore the world with what you love beautiful natural beauty.";
  const popularPlaces = fields?.popular_places || "Popular Place : Bali, Istanbul, Rome, Paris.";
  const ctaLabel = fields?.cta_label || "Explore now";

  return (
    <section className="relative min-h-screen lg:min-h-[960px] w-full flex items-center pt-32 sm:pt-40 pb-20 overflow-visible bg-[#0c223c]">
      {/* 1. Full-Bleed Banner Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt="Make in your journey banner"
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      <Container size="content" className="relative z-10 w-full px-4 sm:px-8">
        <div className="max-w-2xl space-y-6">
          {/* Main Hero Headline */}
          <h1 className="font-poppins font-bold text-5xl sm:text-7xl lg:text-[80px] lg:leading-[90px] text-white tracking-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] whitespace-pre-line">
            {title}
          </h1>

          {/* Hero Subtitle */}
          <p className="font-poppins text-sm sm:text-base lg:text-[16px] text-white max-w-lg leading-relaxed drop-shadow-md font-normal">
            {subtitle}
          </p>

          {/* Custom Beautiful Search Bar Widget */}
          <div ref={searchBarRef} className="pt-2 max-w-xl relative z-30">
            <form
              onSubmit={handleSearch}
              className="bg-white p-2 rounded-full shadow-[0_20px_35px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row items-center justify-between gap-1 border border-white/90"
            >
              {/* 1. Custom Location Dropdown */}
              <div className="relative flex-1 w-full border-b sm:border-b-0 sm:border-r border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "location" ? null : "location")
                  }
                  className="w-full px-5 py-3 flex items-center justify-between text-left focus:outline-none rounded-full sm:rounded-l-full hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={cn(
                      "font-poppins text-xs sm:text-sm font-medium truncate block",
                      selectedLocation ? "text-black font-semibold" : "text-[#555555]"
                    )}
                  >
                    {selectedLocation || "Location"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 text-[#777777] shrink-0 ml-1.5 transition-transform duration-200",
                      activeDropdown === "location" && "rotate-180 text-black"
                    )}
                  />
                </button>

                {/* Custom Menu Modal */}
                {activeDropdown === "location" && (
                  <div className="absolute left-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-3 py-1.5 font-poppins">
                      Select Destination
                    </div>
                    <div className="space-y-0.5">
                      {locationOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(opt.value);
                            setActiveDropdown(null);
                          }}
                          className={cn(
                            "w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs sm:text-sm font-poppins transition-colors text-left",
                            selectedLocation === opt.value
                              ? "bg-black text-white font-medium"
                              : "text-gray-700 hover:bg-gray-100 hover:text-black"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 opacity-70 shrink-0" />
                            <span>{opt.label}</span>
                          </span>
                          {selectedLocation === opt.value && (
                            <Check className="w-3.5 h-3.5 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Custom Date Dropdown */}
              <div className="relative flex-1 w-full border-b sm:border-b-0 sm:border-r border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "date" ? null : "date")
                  }
                  className="w-full px-5 py-3 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={cn(
                      "font-poppins text-xs sm:text-sm font-medium truncate block",
                      selectedDate ? "text-black font-semibold" : "text-[#555555]"
                    )}
                  >
                    {selectedDate || "Date"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 text-[#777777] shrink-0 ml-1.5 transition-transform duration-200",
                      activeDropdown === "date" && "rotate-180 text-black"
                    )}
                  />
                </button>

                {/* Custom Menu Modal */}
                {activeDropdown === "date" && (
                  <div className="absolute left-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-3 py-1.5 font-poppins">
                      Choose Month
                    </div>
                    <div className="space-y-0.5">
                      {dateOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSelectedDate(opt.value);
                            setActiveDropdown(null);
                          }}
                          className={cn(
                            "w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs sm:text-sm font-poppins transition-colors text-left",
                            selectedDate === opt.value
                              ? "bg-black text-white font-medium"
                              : "text-gray-700 hover:bg-gray-100 hover:text-black"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 opacity-70 shrink-0" />
                            <span>{opt.label}</span>
                          </span>
                          {selectedDate === opt.value && (
                            <Check className="w-3.5 h-3.5 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Custom People Dropdown */}
              <div className="relative flex-1 w-full">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "people" ? null : "people")
                  }
                  className="w-full px-5 py-3 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={cn(
                      "font-poppins text-xs sm:text-sm font-medium truncate block",
                      selectedPeople ? "text-black font-semibold" : "text-[#555555]"
                    )}
                  >
                    {selectedPeople || "People"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 text-[#777777] shrink-0 ml-1.5 transition-transform duration-200",
                      activeDropdown === "people" && "rotate-180 text-black"
                    )}
                  />
                </button>

                {/* Custom Menu Modal */}
                {activeDropdown === "people" && (
                  <div className="absolute right-0 sm:left-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-3 py-1.5 font-poppins">
                      Number of Guests
                    </div>
                    <div className="space-y-0.5">
                      {peopleOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSelectedPeople(opt.value);
                            setActiveDropdown(null);
                          }}
                          className={cn(
                            "w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-xs sm:text-sm font-poppins transition-colors text-left",
                            selectedPeople === opt.value
                              ? "bg-black text-white font-medium"
                              : "text-gray-700 hover:bg-gray-100 hover:text-black"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 opacity-70 shrink-0" />
                            <span>{opt.label}</span>
                          </span>
                          {selectedPeople === opt.value && (
                            <Check className="w-3.5 h-3.5 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 btn-slide btn-shine text-white font-poppins font-bold text-xs sm:text-sm rounded-full shrink-0 shadow-md"
              >
                {ctaLabel}
              </button>
            </form>
          </div>

          {/* Popular Places line */}
          <p className="font-poppins text-xs sm:text-sm text-white pt-2 drop-shadow-md font-medium">
            <span className="text-white/90">{popularPlaces}</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
