"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HeaderData } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { Menu, X, Search, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  data: HeaderData;
}

const defaultNavLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const popularTags = ["Bali", "Paris", "Swiss", "Thailand", "Dubai", "Singapore"];

export function Header({ data }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Autofocus search input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/packages?location=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setIsSearchOpen(false);
    router.push(`/packages?location=${encodeURIComponent(tag)}`);
  };

  const isLightPage = false;
  const logoSrc = data?.logo?.src || "/images/logo1.png";
  const navItems = data?.navLinks && data.navLinks.length > 0 ? data.navLinks : defaultNavLinks;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black/90 backdrop-blur-md py-4 shadow-lg"
            : "bg-transparent py-6"
        )}
      >
        <Container size="content" className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 relative z-10">
            <div className="relative h-10 w-36 sm:w-44">
              <Image
                src={logoSrc}
                alt={data?.logo?.alt || "Rebel Rover"}
                fill
                priority
                className="object-contain object-left brightness-0 invert"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-poppins text-sm font-medium tracking-wide transition-colors relative py-1",
                    isLightPage && !scrolled ? "text-black" : "text-white",
                    isActive
                      ? "font-bold text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-orange-500 after:rounded-full"
                      : "opacity-80 hover:opacity-100"
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
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all active:scale-95 border border-white/15"
            >
              <Search className="w-4 h-4 text-white" />
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

      {/* Search Popup Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto font-poppins">
          {/* Click outside backdrop layer */}
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 w-full h-full bg-black/70 backdrop-blur-sm cursor-default"
          />

          {/* Search Dialog Card */}
          <div className="relative flex justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-8">
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Search Rebel Rover"
              className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100"
            >
              {/* Header with Title and Close Button */}
              <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-md">
                    <Search className="w-5 h-5" />
                  </span>
                  <div>
                    <span className="font-poppins font-bold text-lg sm:text-xl text-black block leading-tight">
                      Where do you want to go?
                    </span>
                    <span className="text-xs text-gray-400 font-normal">
                      Search vacation packages, tours, and guides
                    </span>
                  </div>
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

              {/* Seamless Unified Search Input Form */}
              <form onSubmit={handleSearchSubmit} className="mt-6">
                <div className="flex items-center bg-[#f8f9fa] border border-gray-200 focus-within:border-black focus-within:bg-white rounded-full p-1.5 sm:p-2 transition-all shadow-inner">
                  <div className="pl-4 pr-2 flex items-center text-gray-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations (e.g. Bali, Paris, Swiss...)"
                    className="w-full bg-transparent text-black placeholder:text-gray-400 font-poppins text-sm sm:text-base focus:outline-none py-2.5"
                  />
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3 btn-slide btn-shine text-white font-poppins font-bold text-xs sm:text-sm rounded-full shrink-0 shadow-md flex items-center gap-2"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Popular Search Suggestions */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <span className="font-poppins text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Popular Destinations
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className="px-4 py-2 rounded-full bg-gray-100 hover:bg-black hover:text-white text-gray-700 font-poppins text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <MapPin className="w-3.5 h-3.5 opacity-60 text-orange-500" />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
