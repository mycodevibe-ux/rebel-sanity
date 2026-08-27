import React from "react";
import Image from "next/image";
import { PartnerLogosFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";

interface PartnerLogosProps {
  fields: PartnerLogosFields;
}

const defaultLogos = [
  { src: "/images/Katana.svg", alt: "Katana", width: 140, height: 42 },
  { src: "/images/travava.svg", alt: "travava", width: 130, height: 38 },
  { src: "/images/bigui.svg", alt: "bigui", width: 120, height: 40 },
  { src: "/images/Booking.com.svg", alt: "Booking.com", width: 160, height: 36 },
  { src: "/images/Jakmaen.svg", alt: "Jakmaen", width: 130, height: 36 },
];

export function PartnerLogos({ fields }: PartnerLogosProps) {
  const heading = fields?.heading || "Our tour partner";
  const subheading =
    fields?.subheading ||
    "There are many variation of passage of lorem ipsum available but the majority have suffered alteration";

  const logos =
    fields?.logos && fields.logos.length > 0
      ? fields.logos.map((l: any) => ({
          src: l.image || l.src || "/images/Katana.svg",
          alt: l.alt_text || l.alt || "Partner Logo",
          width: 140,
          height: 42,
        }))
      : defaultLogos;

  return (
    <section className="py-20 sm:py-24 bg-white">
      <Container size="content" className="px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[40px] text-black tracking-tight">
            {heading}
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-[#777777] mt-3 leading-relaxed font-normal">
            {subheading}
          </p>
        </div>

        {/* Brand Logos */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-8 md:gap-12 px-4 max-w-5xl mx-auto">
          {logos.map((logo: any, idx: number) => (
            <div
              key={idx}
              className="relative flex items-center justify-center h-14 w-32 sm:w-40 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 140}
                height={logo.height || 42}
                className="object-contain max-h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
