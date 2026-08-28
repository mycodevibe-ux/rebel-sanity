"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSearchFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { ChevronDown, MapPin, Calendar, Users, Check, Search, X } from "lucide-react";
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
    { label: "Paris, France", value: "Paris", region: "Europe" },
    { label: "Swiss Alps, Switzerland", value: "Swiss", region: "Europe" },
    { label: "Bali, Indonesia", value: "Bali", region: "Asia" },
    { label: "Phuket, Thailand", value: "Thailand", region: "Asia" },
    { label: "Dubai, UAE", value: "Dubai", region: "Middle East" },
    { label: "Taiwan, Asia", value: "Taiwan", region: "Asia" },
  ];

  const dateOptions = [
    { label: "This Month (Instant Booking)", value: "This Month" },
    { label: "Next Month (Popular)", value: "Next Month" },
    { label: "Summer Vacation 2024", value: "Summer 2024" },
    { label: "Winter Holidays 2024", value: "Winter 2024" },
    { label: "Anytime / Flexible Dates", value: "Flexible" },
  ];

  const peopleOptions = [
    { label: "1 Person (Solo Adventure)", value: "1 Person" },
    { label: "2 People (Couple / Pair)", value: "2 People" },
    { label: "3 - 4 People (Family Tour)", value: "3-4 People" },
    { label: "5+ People (Group Vacation)", value: "5+ People" },
  ];

  const popularPlacesList = ["Bali", "Paris", "Swiss", "Thailand", "Dubai"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (selectedLocation) query.set("location", selectedLocation);
    if (selectedDate) query.set("date", selectedDate);
    if (selectedPeople) query.set("people", selectedPeople);
    window.location.href = `/packages?${query.toString()}`;
  };

  const selectPopularPlace = (place: string) => {
    setSelectedLocation(place);
    const query = new URLSearchParams();
    query.set("location", place);
    window.location.href = `/packages?${query.toString()}`;
  };

  const bgImage =
    fields?.background_image && fields.background_image !== "/images/home-banner.png"
      ? fields.background_image
      : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&auto=format&fit=crop&q=90";
  const title = fields?.title || "Make in\nyour journey.";
  const subtitle = fields?.subtitle || "Explore the world with what you love beautiful natural beauty.";
  const ctaLabel = fields?.cta_label || "Explore now";

  return (
    <section className="relative min-h-screen lg:min-h-[960px] w-full flex items-center pt-32 sm:pt-40 pb-20 overflow-visible bg-slate-900 font-poppins">
      {/* 1. Full-Bleed Bright Tropical Banner Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt="Make in your journey banner"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Soft elegant gradient scrim to ensure high text contrast while keeping image bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
      </div>

      <Container size="content" className="relative z-10 w-full px-4 sm:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Main Hero Headline */}
          <h1 className="font-poppins font-bold text-5xl sm:text-7xl lg:text-[82px] lg:leading-[92px] text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] whitespace-pre-line">
            {title}
          </h1>

          {/* Hero Subtitle */}
          <p className="font-poppins text-sm sm:text-base lg:text-[17px] text-white/95 max-w-xl leading-relaxed drop-shadow-md font-normal">
            {subtitle}
          </p>

          {/* Custom Beautiful Search Bar Widget */}
          <div ref={searchBarRef} className="pt-4 max-w-2xl relative z-30">
            <form
              onSubmit={handleSearch}
              className="bg-white p-2.5 sm:p-2 rounded-3xl sm:rounded-full shadow-[0_20px_45px_rgba(0,0,0,0.25)] flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-1 border border-white/90 backdrop-blur-md"
            >
              {/* 1. Custom Location Dropdown */}
              <div className="relative flex-1 w-full border-b sm:border-b-0 sm:border-r border-gray-100 pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "location" ? null : "location")
                  }
                  className="w-full px-4 sm:px-5 py-3 flex items-center justify-between text-left focus:outline-none rounded-2xl sm:rounded-l-full hover:bg-gray-50/80 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider leading-none mb-1">
                        Destination
                      </span>
                      <span
                        className={cn(
                          "font-poppins text-xs sm:text-sm font-semibold truncate block leading-tight",
                          selectedLocation ? "text-black" : "text-[#777777]"
                        )}
                      >
                        {selectedLocation || "Where to go?"}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform duration-200 group-hover:text-black",
                      activeDropdown === "location" && "rotate-180 text-black"
                    )}
                  />
                </button>

                {/* Location Dropdown Modal */}
                {activeDropdown === "location" && (
                  <div className="absolute left-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-gray-50">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 font-poppins">
                        Popular Destinations
                      </span>
                      {selectedLocation && (
                        <button
                          type="button"
                          onClick={() => setSelectedLocation("")}
                          className="text-[11px] text-orange-500 hover:underline font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {locationOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSelectedLocation(opt.value);
                            setActiveDropdown(null);
                          }}
                          className={cn(
                            "w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs sm:text-sm font-poppins transition-colors text-left",
                            selectedLocation === opt.value
                              ? "bg-black text-white font-medium"
                              : "text-gray-700 hover:bg-gray-100 hover:text-black"
                          )}
                        >
                          <span className="flex items-center gap-2.5 truncate">
                            <MapPin className="w-3.5 h-3.5 opacity-70 shrink-0 text-orange-400" />
                            <span className="truncate">{opt.label}</span>
                          </span>
                          {selectedLocation === opt.value && (
                            <Check className="w-4 h-4 shrink-0 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Custom Date Dropdown */}
              <div className="relative flex-1 w-full border-b sm:border-b-0 sm:border-r border-gray-100 pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "date" ? null : "date")
                  }
                  className="w-full px-4 sm:px-5 py-3 flex items-center justify-between text-left focus:outline-none rounded-2xl hover:bg-gray-50/80 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider leading-none mb-1">
                        When
                      </span>
                      <span
                        className={cn(
                          "font-poppins text-xs sm:text-sm font-semibold truncate block leading-tight",
                          selectedDate ? "text-black" : "text-[#777777]"
                        )}
                      >
                        {selectedDate || "Select Date"}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform duration-200 group-hover:text-black",
                      activeDropdown === "date" && "rotate-180 text-black"
                    )}
                  />
                </button>

                {/* Date Dropdown Modal */}
                {activeDropdown === "date" && (
                  <div className="absolute left-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-gray-50">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 font-poppins">
                        Travel Timeframe
                      </span>
                      {selectedDate && (
                        <button
                          type="button"
                          onClick={() => setSelectedDate("")}
                          className="text-[11px] text-orange-500 hover:underline font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {dateOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSelectedDate(opt.value);
                            setActiveDropdown(null);
                          }}
                          className={cn(
                            "w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs sm:text-sm font-poppins transition-colors text-left",
                            selectedDate === opt.value
                              ? "bg-black text-white font-medium"
                              : "text-gray-700 hover:bg-gray-100 hover:text-black"
                          )}
                        >
                          <span className="flex items-center gap-2.5 truncate">
                            <Calendar className="w-3.5 h-3.5 opacity-70 shrink-0 text-blue-400" />
                            <span className="truncate">{opt.label}</span>
                          </span>
                          {selectedDate === opt.value && (
                            <Check className="w-4 h-4 shrink-0 text-white" />
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
                  className="w-full px-4 sm:px-5 py-3 flex items-center justify-between text-left focus:outline-none rounded-2xl hover:bg-gray-50/80 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider leading-none mb-1">
                        Travelers
                      </span>
                      <span
                        className={cn(
                          "font-poppins text-xs sm:text-sm font-semibold truncate block leading-tight",
                          selectedPeople ? "text-black" : "text-[#777777]"
                        )}
                      >
                        {selectedPeople || "Add Guests"}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-gray-400 shrink-0 ml-2 transition-transform duration-200 group-hover:text-black",
                      activeDropdown === "people" && "rotate-180 text-black"
                    )}
                  />
                </button>

                {/* People Dropdown Modal */}
                {activeDropdown === "people" && (
                  <div className="absolute right-0 sm:left-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-gray-50">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 font-poppins">
                        Number of Guests
                      </span>
                      {selectedPeople && (
                        <button
                          type="button"
                          onClick={() => setSelectedPeople("")}
                          className="text-[11px] text-orange-500 hover:underline font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {peopleOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSelectedPeople(opt.value);
                            setActiveDropdown(null);
                          }}
                          className={cn(
                            "w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs sm:text-sm font-poppins transition-colors text-left",
                            selectedPeople === opt.value
                              ? "bg-black text-white font-medium"
                              : "text-gray-700 hover:bg-gray-100 hover:text-black"
                          )}
                        >
                          <span className="flex items-center gap-2.5 truncate">
                            <Users className="w-3.5 h-3.5 opacity-70 shrink-0 text-emerald-400" />
                            <span className="truncate">{opt.label}</span>
                          </span>
                          {selectedPeople === opt.value && (
                            <Check className="w-4 h-4 shrink-0 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. CTA Search Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 sm:py-3.5 btn-slide btn-shine text-white font-poppins font-bold text-xs sm:text-sm rounded-full shrink-0 shadow-lg flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>{ctaLabel}</span>
              </button>
            </form>
          </div>

          {/* Clickable Popular Places Line */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white pt-2 drop-shadow-md font-medium flex-wrap">
            <span className="text-white/85">Popular Places:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {popularPlacesList.map((place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => selectPopularPlace(place)}
                  className="bg-white/15 hover:bg-white text-white hover:text-black backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold transition-all border border-white/20 hover:scale-105"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
