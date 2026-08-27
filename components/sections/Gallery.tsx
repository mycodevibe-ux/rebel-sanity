import React from "react";
import Image from "next/image";
import { GalleryFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";

interface GalleryProps {
  fields: GalleryFields;
}

const defaultPhotos = [
  { image: "/images/bali.png", caption_label: "Bali" },
  { image: "/images/dubai.png", caption_label: "Dubai" },
  { image: "/images/paris.png", caption_label: "Paris" },
  { image: "/images/italy.png", caption_label: "Italy" },
];

export function Gallery({ fields }: GalleryProps) {
  const eyebrow = fields?.eyebrow || "Gallery";
  const heading = fields?.heading || "Unforgettable moment";

  const photos =
    fields?.items && fields.items.length >= 4
      ? fields.items
      : defaultPhotos;

  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container size="content" className="px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-poppins text-xs font-semibold text-[#777777] tracking-[0.2em] uppercase block mb-2">
            {eyebrow}
          </span>
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-[42px] text-black tracking-tight">
            {heading}
          </h2>
        </div>

        {/* 4 Gallery Photos exact composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Large Photo: Photo 0 (6 cols) */}
          <div className="lg:col-span-6 relative min-h-[460px] lg:min-h-[520px] rounded-2xl overflow-hidden group shadow-sm">
            <Image
              src={photos[0]?.image || "/images/bali.png"}
              alt={photos[0]?.caption_label || "Gallery item"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-6 left-6 text-white font-poppins font-bold text-2xl drop-shadow-md">
              {photos[0]?.caption_label}
            </div>
          </div>

          {/* Right 3 Photos (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Top Full 2-cols: Photo 1 */}
            <div className="sm:col-span-2 relative min-h-[220px] lg:min-h-[245px] rounded-2xl overflow-hidden group shadow-sm">
              <Image
                src={photos[1]?.image || "/images/dubai.png"}
                alt={photos[1]?.caption_label || "Gallery item"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 text-white font-poppins font-bold text-2xl drop-shadow-md">
                {photos[1]?.caption_label}
              </div>
            </div>

            {/* Bottom Left: Photo 2 */}
            <div className="relative min-h-[220px] lg:min-h-[245px] rounded-2xl overflow-hidden group shadow-sm">
              <Image
                src={photos[2]?.image || "/images/paris.png"}
                alt={photos[2]?.caption_label || "Gallery item"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 text-white font-poppins font-bold text-2xl drop-shadow-md">
                {photos[2]?.caption_label}
              </div>
            </div>

            {/* Bottom Right: Photo 3 */}
            <div className="relative min-h-[220px] lg:min-h-[245px] rounded-2xl overflow-hidden group shadow-sm">
              <Image
                src={photos[3]?.image || "/images/italy.png"}
                alt={photos[3]?.caption_label || "Gallery item"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 text-white font-poppins font-bold text-2xl drop-shadow-md">
                {photos[3]?.caption_label}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
