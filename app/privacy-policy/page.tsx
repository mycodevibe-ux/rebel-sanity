import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { customPageQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Privacy Policy — Rebel Rover",
  description: "Learn how Rebel Rover collects, protects, and manages your personal information.",
};

export default async function PrivacyPolicyPage() {
  // Check if live CMS has custom overrides for privacy-policy
  const cmsData = await client
    .fetch(customPageQuery, { slug: "privacy-policy" }, { next: { revalidate: 0 } })
    .catch(() => null);

  const heroTitle = cmsData?.heroTitle || "Privacy Policy";
  const breadcrumb = cmsData?.breadcrumb || "Home > Privacy Policy";
  const heroBg = cmsData?.heroBackgroundImage || "/images/about-banner.png";

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[280px] sm:h-[340px] lg:h-[380px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={heroBg}
          alt="Privacy Policy Hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

        <Container size="content" className="relative z-10 text-center px-4">
          <h1 className="font-poppins font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-md">
            {heroTitle}
          </h1>
          <p className="font-poppins text-xs sm:text-sm text-white/90 mt-3 tracking-wide">
            {breadcrumb}
          </p>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-24 bg-white font-poppins">
        <Container size="content" className="max-w-4xl px-4 sm:px-8">
          <div className="space-y-10 text-[#555555] leading-relaxed">
            <div>
              <p className="text-xs sm:text-sm text-[#888888]">
                Last Updated: January 2024
              </p>
              <h2 className="font-bold text-2xl sm:text-3xl text-black mt-2">
                1. Introduction
              </h2>
              <p className="text-sm sm:text-base mt-3 leading-relaxed">
                Welcome to <strong>Rebel Rover</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to safeguarding the personal data you share with us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website or book travel packages through our services.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl sm:text-3xl text-black">
                2. Information We Collect
              </h2>
              <p className="text-sm sm:text-base mt-3 leading-relaxed">
                We may collect personal information that you provide directly to us when you make inquiries, request custom tour itineraries, or contact our support team. This may include:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-sm sm:text-base">
                <li><strong>Contact details:</strong> Name, email address, phone number, and physical billing/mailing address.</li>
                <li><strong>Travel preferences:</strong> Destination choices, departure dates, group sizes, and special accommodation requests.</li>
                <li><strong>Communications:</strong> Messages, feedback, reviews, and inquiries submitted through our contact forms or newsletter subscriptions.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-2xl sm:text-3xl text-black">
                3. How We Use Your Information
              </h2>
              <p className="text-sm sm:text-base mt-3 leading-relaxed">
                The information we collect is used to deliver world-class travel experiences, including:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-sm sm:text-base">
                <li>Processing bookings, travel itineraries, and customer service requests.</li>
                <li>Sending email updates, special promotional discounts, and monthly newsletters (with an option to opt out anytime).</li>
                <li>Improving our website performance, tour offerings, and customer experience.</li>
                <li>Ensuring security, preventing fraud, and complying with legal obligations.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-bold text-2xl sm:text-3xl text-black">
                4. Data Protection & Security
              </h2>
              <p className="text-sm sm:text-base mt-3 leading-relaxed">
                We implement industry-standard administrative, technical, and physical security measures to protect your personal information against unauthorized access, loss, alteration, or misuse.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl sm:text-3xl text-black">
                5. Third-Party Sharing
              </h2>
              <p className="text-sm sm:text-base mt-3 leading-relaxed">
                We do not sell, rent, or trade your personal information to third parties. We may share necessary travel details strictly with verified partners (such as handpicked hotels, flight operators, and local tour guides) solely to fulfill your travel itinerary.
              </p>
            </div>

            <div>
              <h2 className="font-bold text-2xl sm:text-3xl text-black">
                6. Contact Us
              </h2>
              <p className="text-sm sm:text-base mt-3 leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please reach out to us at:
              </p>
              <div className="mt-4 p-6 bg-[#f9fafb] rounded-2xl border border-gray-100 space-y-2 text-sm">
                <p><strong>Email:</strong> <a href="mailto:info@traveller.com" className="text-black hover:underline">info@traveller.com</a></p>
                <p><strong>Phone:</strong> +97 888 8888</p>
                <p><strong>Address:</strong> 732 Despard St, Atlanta</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <Link
                href="/"
                className="font-semibold text-xs sm:text-sm text-black hover:text-orange-600 transition-colors"
              >
                ← Back to Home
              </Link>
              <Link
                href="/contact"
                className="font-semibold text-xs sm:text-sm text-black hover:text-orange-600 transition-colors"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
