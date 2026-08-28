"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Search, Star, ArrowRight, MapPin, Clock, SlidersHorizontal, RotateCcw } from "lucide-react";

interface PackageCard {
  id: string;
  slug: string;
  name: string;
  region: "Europe" | "Asia" | "Middle East" | "Other";
  price: string;
  numericPrice: number;
  duration: string;
  days: number;
  image: string;
  description: string;
  rating: number;
}

const ALL_PACKAGES: PackageCard[] = [
  {
    id: "pkg-1",
    slug: "paris",
    name: "Paris - City of Lights & Romance",
    region: "Europe",
    price: "$299.00",
    numericPrice: 299,
    duration: "3 Days / 2 Nights",
    days: 3,
    image: "/images/paris.png",
    description: "Experience the romance, skip-the-line Louvre tour, and Eiffel Tower summit.",
    rating: 5,
  },
  {
    id: "pkg-2",
    slug: "swiss",
    name: "Swiss Alps - Alpine Wonderland",
    region: "Europe",
    price: "$399.00",
    numericPrice: 399,
    duration: "4 Days / 3 Nights",
    days: 4,
    image: "/images/home-img-1.png",
    description: "Jungfraujoch glacier railway, Matterhorn views, and luxury alpine chalet stay.",
    rating: 5,
  },
  {
    id: "pkg-3",
    slug: "thailand",
    name: "Thailand - Phuket & Phi Phi Islands",
    region: "Asia",
    price: "$249.00",
    numericPrice: 249,
    duration: "5 Days / 4 Nights",
    days: 5,
    image: "/images/home-img-3.png",
    description: "Maya Bay speedboat tour, ethical elephant sanctuary, and luxury beach resort.",
    rating: 5,
  },
  {
    id: "pkg-4",
    slug: "taiwan",
    name: "Taiwan - Jiufen & Taroko Gorge",
    region: "Asia",
    price: "$289.00",
    numericPrice: 289,
    duration: "4 Days / 3 Nights",
    days: 4,
    image: "/images/blog-post-1.png",
    description: "Lantern-lit Jiufen mountain teahouses, Taipei 101, and marble canyon gorge.",
    rating: 5,
  },
  {
    id: "pkg-5",
    slug: "indonesia",
    name: "Indonesia - Bali & Ubud Rainforest",
    region: "Asia",
    price: "$349.00",
    numericPrice: 349,
    duration: "6 Days / 5 Nights",
    days: 6,
    image: "/images/bali.png",
    description: "Emerald rice terraces, Uluwatu sunset clifftop temple, and Nusa Penida day trip.",
    rating: 5,
  },
  {
    id: "pkg-6",
    slug: "dubai",
    name: "Dubai - Desert Safari & Skyline",
    region: "Middle East",
    price: "$319.00",
    numericPrice: 319,
    duration: "4 Days / 3 Nights",
    days: 4,
    image: "/images/dubai.png",
    description: "Burj Khalifa 124th floor, red dune 4x4 safari with BBQ, and Marina yacht cruise.",
    rating: 5,
  },
];

const REGION_TABS = ["All", "Europe", "Asia", "Middle East"];

export function PackagesFilterSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  const filteredPackages = useMemo(() => {
    return ALL_PACKAGES.filter((pkg) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          pkg.name.toLowerCase().includes(q) ||
          pkg.description.toLowerCase().includes(q) ||
          pkg.region.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Region Tab
      if (selectedRegion !== "All" && pkg.region !== selectedRegion) {
        return false;
      }

      // 3. Duration Filter
      if (selectedDuration === "short" && pkg.days > 3) return false;
      if (selectedDuration === "medium" && (pkg.days < 4 || pkg.days > 5)) return false;
      if (selectedDuration === "long" && pkg.days < 6) return false;

      // 4. Price Filter
      if (selectedPrice === "under300" && pkg.numericPrice >= 300) return false;
      if (selectedPrice === "300to350" && (pkg.numericPrice < 300 || pkg.numericPrice > 350)) return false;
      if (selectedPrice === "over350" && pkg.numericPrice <= 350) return false;

      return true;
    });
  }, [searchQuery, selectedRegion, selectedDuration, selectedPrice]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedRegion !== "All" ||
    selectedDuration !== "All" ||
    selectedPrice !== "All";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All");
    setSelectedDuration("All");
    setSelectedPrice("All");
  };

  return (
    <section className="py-16 sm:py-24 bg-white font-poppins">
      <Container size="content" className="px-4 sm:px-8">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold text-orange-500 tracking-wider">
            Explore Handpicked Journeys
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-[44px] text-black tracking-tight">
            Find Your Dream Tour Package
          </h2>
          <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
            Filter by continent, duration, and price to discover the perfect vacation experience.
          </p>
        </div>

        {/* Filter Toolbar Container */}
        <div className="bg-[#f9fafb] p-5 sm:p-7 rounded-3xl border border-gray-200/80 shadow-sm mb-12 space-y-5">
          {/* Row 1: Search Input & Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input (5 cols) */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination (e.g. Paris, Bali, Alps...)"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black font-poppins shadow-sm"
              />
            </div>

            {/* Duration Filter (3 cols) */}
            <div className="lg:col-span-3">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-black focus:outline-none focus:border-black font-poppins shadow-sm"
              >
                <option value="All">⏱️ All Durations</option>
                <option value="short">1 - 3 Days (Weekend Getaway)</option>
                <option value="medium">4 - 5 Days (Standard Tour)</option>
                <option value="long">6+ Days (Extended Vacation)</option>
              </select>
            </div>

            {/* Price Filter (3 cols) */}
            <div className="lg:col-span-3">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-black focus:outline-none focus:border-black font-poppins shadow-sm"
              >
                <option value="All">💰 All Price Ranges</option>
                <option value="under300">Under $300 (Budget Friendly)</option>
                <option value="300to350">$300 - $350 (Popular)</option>
                <option value="over350">Over $350 (Luxury Experience)</option>
              </select>
            </div>

            {/* Reset Button (1 col) */}
            {hasActiveFilters && (
              <div className="lg:col-span-1">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  title="Clear all filters"
                  className="w-full py-3.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 text-orange-500" />
                </button>
              </div>
            )}
          </div>

          {/* Row 2: Region Tabs & Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-200/60">
            {/* Region Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {REGION_TABS.map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                    selectedRegion === reg
                      ? "bg-black text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {reg === "All" ? "🌍 All Regions" : reg}
                </button>
              ))}
            </div>

            {/* Results Count Badge */}
            <span className="text-xs text-gray-500 font-medium">
              Showing <strong className="text-black">{filteredPackages.length}</strong> of {ALL_PACKAGES.length} packages
            </span>
          </div>
        </div>

        {/* Filtered Packages Grid */}
        {filteredPackages.length === 0 ? (
          <div className="p-16 bg-[#f9fafb] rounded-3xl border border-gray-200 text-center space-y-4 max-w-lg mx-auto">
            <SlidersHorizontal className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-bold text-xl text-black">No packages match your search</h3>
            <p className="text-xs text-gray-500">
              Try adjusting your search keywords, region tab, or price range filters.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-6 py-2.5 btn-slide btn-shine text-white font-bold text-xs rounded-full shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.13)] overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2.5"
              >
                <div>
                  {/* Card Image */}
                  <Link
                    href={`/packages/${card.slug}`}
                    className="block relative h-[260px] sm:h-[280px] w-full overflow-hidden"
                  >
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Region Pill overlay */}
                    <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {card.region}
                    </span>
                  </Link>

                  {/* Card Content */}
                  <div className="p-7 sm:p-8">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-bold text-xl text-black group-hover:text-orange-600 transition-colors line-clamp-1">
                        <Link href={`/packages/${card.slug}`}>{card.name}</Link>
                      </h3>
                      <span className="font-bold text-sm sm:text-base text-black bg-gray-50 px-3 py-1 rounded-full border border-gray-100 shrink-0">
                        {card.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-orange-600 font-semibold mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{card.duration}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#777777] leading-relaxed mb-4 line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="px-7 pb-7 sm:px-8 sm:pb-8 flex items-center justify-between border-t border-gray-50 pt-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: card.rating }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-4 h-4 text-[#f39c12] fill-[#f39c12]"
                      />
                    ))}
                  </div>

                  <Link
                    href={`/packages/${card.slug}`}
                    className="px-6 py-2.5 btn-slide btn-shine text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1.5"
                  >
                    <span>View Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
