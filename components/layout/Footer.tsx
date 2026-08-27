"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FooterData } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { Mail, Check, MapPin, Phone } from "lucide-react";

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 4000);
      setEmail("");
    }
  };

  const newsletter = data?.subscribe_newsletter;
  const newsletterHeading = newsletter?.heading || "Subcribe to get special price";
  const newsletterSubtext =
    newsletter?.subtext ||
    "Dont wanna miss something? subscribe right now and get special promotion and monthly newsletter";
  const newsletterPlaceholder = newsletter?.input_placeholder || "Type your  email here";
  const newsletterCta = newsletter?.cta_label || "Subscribe";
  const newsletterBg =
    newsletter?.background_image ||
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=85";

  const footerLogo = data?.logo?.src || "/images/logo.png";
  const blurbText =
    data?.blurb_text ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra condimentum.";

  const address = data?.contact_info?.address || "732 Despard St, Atlanta";
  const phone = data?.contact_info?.phone || "+97 888 8888";
  const contactEmail = data?.contact_info?.email || "info@traveller.com";

  const quickLinks =
    data?.quick_links && data.quick_links.length > 0
      ? data.quick_links
      : [
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Tours", href: "/packages" },
          { label: "Contact", href: "/contact" },
        ];

  const socialLinks =
    data?.social_links && data.social_links.length > 0
      ? data.social_links
      : [
          { platform: "Facebook", url: "https://facebook.com", icon: "/images/facebook.svg" },
          { platform: "Twitter", url: "https://twitter.com", icon: "/images/twitter.svg" },
          { platform: "YouTube", url: "https://youtube.com", icon: "/images/youtube.svg" },
          { platform: "Instagram", url: "https://instagram.com", icon: "/images/instagram.svg" },
        ];

  const copyrightText = data?.copyright_text || "Copyright © All rights reserved";

  return (
    <footer className="w-full bg-white text-black">
      {/* 1. Subscribe Section */}
      <section className="relative overflow-hidden py-28 sm:py-36 bg-[#061026] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={newsletterBg}
            alt="Newsletter Background"
            fill
            priority
            className="object-cover object-center brightness-110 contrast-125"
          />
          <div className="absolute inset-0 bg-[#061026]/40" />
        </div>

        <Container size="content" className="relative z-10 text-center px-4 sm:px-6">
          <h2 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-[46px] lg:leading-[56px] text-white tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] mb-4">
            {newsletterHeading}
          </h2>

          <p className="font-poppins text-xs sm:text-sm lg:text-[15px] text-white max-w-xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
            {newsletterSubtext}
          </p>

          <div className="max-w-xl mx-auto">
            <form
              onSubmit={handleSubscribe}
              className="bg-white p-2 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-between border border-white"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterPlaceholder}
                className="flex-1 px-6 py-3.5 bg-transparent text-black placeholder:text-[#888888] text-xs sm:text-sm focus:outline-none font-poppins"
              />
              <button
                type="submit"
                className="px-8 py-3.5 btn-slide btn-shine text-white font-poppins font-bold text-xs sm:text-sm rounded-full shrink-0 shadow-md flex items-center gap-1.5"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>{newsletterCta}</span>
                )}
              </button>
            </form>
          </div>
        </Container>
      </section>

      {/* 2. Main 4-Column Footer Area */}
      <div className="py-20 sm:py-24 bg-white border-t border-gray-100">
        <Container size="content" className="px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Column 1: Brand Logo & Blurb (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-block">
                <div className="relative h-14 sm:h-16 w-64 sm:w-72">
                  <Image
                    src={footerLogo}
                    alt={data?.logo?.alt || "Rebel Rover Logo"}
                    fill
                    priority
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <p className="font-poppins text-sm text-[#666666] leading-relaxed max-w-sm pt-1">
                {blurbText}
              </p>
            </div>

            {/* Column 2: Contact Information (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-poppins font-bold text-lg text-black">
                Contact Information
              </h3>
              <ul className="space-y-4 font-poppins text-sm text-[#666666]">
                {/* Location */}
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-5 shrink-0">
                    <Image
                      src="/images/location.svg"
                      alt="Location"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{address}</span>
                </li>

                {/* Phone */}
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-4 shrink-0">
                    <Image
                      src="/images/call.svg"
                      alt="Phone"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{phone}</span>
                </li>

                {/* Email */}
                <li className="flex items-center gap-3">
                  <div className="w-4 h-4 flex items-center justify-center shrink-0 text-black">
                    <Mail className="w-4 h-4 text-black fill-black" />
                  </div>
                  <span>{contactEmail}</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Link (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-poppins font-bold text-lg text-black">
                Quick Link
              </h3>
              <ul className="space-y-3.5 font-poppins text-sm text-[#666666]">
                {quickLinks.map((ql: any) => (
                  <li key={ql.label}>
                    <Link href={ql.href || "/"} className="hover:text-black transition-colors">
                      {ql.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Follow Us */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-poppins font-bold text-lg text-black">
                Follow Us
              </h3>
              <div className="flex items-center gap-5 pt-1 text-black">
                {socialLinks.map((s: any) => (
                  <a
                    key={s.platform}
                    href={s.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="hover:opacity-75 transition-opacity relative w-5 h-5 flex items-center justify-center"
                  >
                    <Image
                      src={s.icon || "/images/facebook.svg"}
                      alt={s.platform}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. Bottom Solid Black Copyright Bar */}
      <div className="bg-black py-8 text-center">
        <Container size="content">
          <p className="font-poppins text-xs sm:text-sm text-white/95 tracking-wide">
            {copyrightText}
          </p>
        </Container>
      </div>
    </footer>
  );
}
