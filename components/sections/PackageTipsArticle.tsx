import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function PackageTipsArticle() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container size="content" className="px-4 sm:px-8">
        {/* Top Header Row with Left Titles & Right View More Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[44px] lg:leading-[54px] text-black tracking-tight">
              Tips &amp; Article
            </h2>
            <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            </p>
          </div>

          {/* Right View More Button */}
          <Link
            href="/blog"
            className="px-8 py-3.5 bg-black hover:bg-neutral-800 text-white font-poppins font-bold text-xs sm:text-sm rounded-full transition-all shrink-0 active:scale-95 shadow-md self-start md:self-auto"
          >
            View more
          </Link>
        </div>

        {/* 2-Column Asymmetric Layout (Left 5 cols, Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: 2 Stacked White Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            {/* Card 1: 9 Popular Travel Destination */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="font-poppins text-xs sm:text-sm text-[#777777] block mb-2 font-normal">
                  Perfect | Tips
                </span>
                <h3 className="font-poppins font-bold text-xl sm:text-[22px] text-black leading-snug mb-3">
                  9 Popular Travel Destintion on Sale in 2022 _
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed mb-6 font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                </p>
              </div>
              <div>
                <Link
                  href="/blog"
                  className="inline-block px-7 py-3 bg-black hover:bg-neutral-800 text-white font-poppins font-bold text-xs rounded-full transition-all active:scale-95 shadow-sm"
                >
                  Read More
                </Link>
              </div>
            </div>

            {/* Card 2: How Are We Going to Travel */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="font-poppins text-xs sm:text-sm text-[#777777] block mb-2 font-normal">
                  Tips | Travel
                </span>
                <h3 className="font-poppins font-bold text-xl sm:text-[22px] text-black leading-snug mb-3">
                  How Are We Going to Travel in 2022 _
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed mb-6 font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                </p>
              </div>
              <div>
                <Link
                  href="/blog"
                  className="inline-block px-7 py-3 bg-black hover:bg-neutral-800 text-white font-poppins font-bold text-xs rounded-full transition-all active:scale-95 shadow-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Large Article Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-gray-100/90 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col justify-between group">
            {/* Featured Photo */}
            <div className="relative h-[360px] sm:h-[400px] w-full overflow-hidden">
              <Image
                src="/images/article.png"
                alt="Travel Stories For Now and the Future"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Featured Content Body */}
            <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <span className="font-poppins text-xs sm:text-sm text-[#777777] block mb-2 font-normal">
                  Stories | Tips
                </span>
                <h3 className="font-poppins font-bold text-2xl sm:text-[26px] text-black leading-snug mb-3">
                  Travel Stories For Now and the Future
                </h3>
                <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed mb-6 font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                </p>
              </div>
              <div>
                <Link
                  href="/blog"
                  className="inline-block px-7 py-3 bg-black hover:bg-neutral-800 text-white font-poppins font-bold text-xs rounded-full transition-all active:scale-95 shadow-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
