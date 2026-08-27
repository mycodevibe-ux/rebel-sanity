"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HeaderData } from "@/types/cms";
import { Menu, X, Search, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface HeaderProps {
  data: HeaderData;
}

const defaultNavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Hide header on Sanity Studio route for clean full-screen admin
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const navItems = data?.navLinks && data.navLinks.length > 0 ? data.navLinks : defaultNavItems;
  const logoSrc = data?.logo?.src || "/images/logo1.png";
  const popularTags = ["Bali", "Paris", "Swiss", "Thailand", "Dubai", "Singapore"];

  // Focus input when search popup opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Handle ESC key to close search popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/packages?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTagClick = (tag: string) => {
    setIsSearchOpen(false);
    router.push(`/packages?location=${encodeURIComponent(tag)}`);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 transition-all">
        <Container size="content" className="flex items-center justify-between px-4 sm:px-8">
          {/* Header Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-14 sm:h-16 lg:h-18 w-72 sm:w-80 lg:w-96">
              <Image
                src={logoSrc}
                alt={data?.logo?.alt || "Rebel Rover Logo"}
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9 xl:gap-12">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-poppins text-base font-medium transition-colors select-none",
                    isActive
                      ? "text-white font-bold"
                      : "text-white/90 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Search Button */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search popup"
              className="w-10 h-10 flex items-center justify-center text-white hover:opacity-80 transition-opacity active:scale-95"
            >
              <div className="relative w-5 h-5">
                <Image
                  src="/images/search.svg"
                  alt="Search"
                  fill
                  className="brightness-0 invert object-contain"
                />
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/15"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 shadow-2xl">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-poppins text-lg text-white py-2 border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Smooth Search Popup Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Click outside backdrop layer */}
          <div
            className="absolute inset-0"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Search Dialog Card */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 z-10 animate-in zoom-in-95 duration-200">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-black" />
                <span className="font-poppins font-bold text-lg text-black">
                  Search Rebel Rover
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-black flex items-center justify-center transition-colors active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="mt-6">
              <div className="relative flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations (e.g. Bali, Paris, Swiss Alps...)"
                  className="w-full pl-6 pr-32 py-4 rounded-full bg-[#f6f6f6] text-black placeholder:text-[#888888] font-poppins text-sm sm:text-base border border-transparent focus:border-black focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-6 py-2.5 btn-slide btn-shine text-white font-poppins font-bold text-xs sm:text-sm rounded-full shadow-md flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Popular Search Suggestions */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <span className="font-poppins text-xs font-semibold text-[#888888] uppercase tracking-wider block mb-3">
                Popular Destinations
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="px-4 py-2 rounded-full bg-gray-100 hover:bg-black hover:text-white text-gray-700 font-poppins text-xs font-medium transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <MapPin className="w-3.5 h-3.5 opacity-60" />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
