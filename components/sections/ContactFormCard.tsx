"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ContactFormCardFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";

interface ContactFormCardProps {
  fields: ContactFormCardFields;
}

const defaultOffices = [
  {
    city: "Lhoksemawe, Aceh",
    phone: "+62 6943 6956",
    email: "contact@domain.com",
    address: "Jl. Darussalam Hagu selatan",
  },
  {
    city: "Bali Branch Office",
    phone: "+62 6943 6957",
    email: "bali@domain.com",
    address: "Jl. Sunset Road, Seminyak",
  },
  {
    city: "Jakarta Headquarters",
    phone: "+62 6943 6958",
    email: "jakarta@domain.com",
    address: "Jl. Sudirman Kav 28",
  },
  {
    city: "Singapore Liaison",
    phone: "+65 6843 6959",
    email: "singapore@domain.com",
    address: "Marina Bay Financial Centre",
  },
];

export function ContactFormCard({ fields }: ContactFormCardProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const formHeading = fields?.form_heading || "Get In Touch";
  const formSubheading =
    (fields as any)?.form_subheading ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna";
  const submitLabel = fields?.submit_label || "Send Message";
  const officesList =
    (fields as any)?.offices && (fields as any).offices.length > 0
      ? (fields as any).offices
      : defaultOffices;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container size="content" className="px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Floating White Form Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-9 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100">
            {submitted ? (
              <div className="p-6 bg-green-50 text-green-800 rounded-xl flex items-start gap-3 border border-green-200">
                <Check className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-poppins font-semibold text-base">Message Sent!</h4>
                  <p className="text-xs text-green-700 mt-1">
                    Thank you! We will get back to you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-poppins"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your EMail"
                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-poppins"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Subject"
                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-poppins"
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    required
                    placeholder="Your Massage"
                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-poppins resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 btn-slide btn-shine text-white font-poppins font-bold text-sm sm:text-base rounded-full shadow-md"
                  >
                    {submitLabel}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Get In Touch & 2x2 Office Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4">
            <div>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-black mb-3 tracking-tight">
                {formHeading}
              </h2>
              <p className="font-poppins text-xs sm:text-sm text-[#777777] leading-relaxed max-w-xl font-normal">
                {formSubheading}
              </p>
            </div>

            {/* 2x2 Office Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {officesList.map((office: any, idx: number) => (
                <div key={idx} className="space-y-3 font-poppins">
                  <h3 className="font-bold text-base text-black">
                    {office.city}
                  </h3>
                  <div className="space-y-2.5 text-xs text-[#555555]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-4 h-4 shrink-0">
                        <Image src="/images/call.svg" alt="Phone" fill className="object-contain" />
                      </div>
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-black font-bold">✉</span>
                      <span>{office.email}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="relative w-4 h-5 shrink-0 mt-0.5">
                        <Image src="/images/location.svg" alt="Location" fill className="object-contain" />
                      </div>
                      <span>{office.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
