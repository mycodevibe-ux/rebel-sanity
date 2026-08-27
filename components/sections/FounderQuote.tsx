import React from "react";
import Image from "next/image";
import { FounderQuoteFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";

interface FounderQuoteProps {
  fields: FounderQuoteFields;
}

export function FounderQuote({ fields }: FounderQuoteProps) {
  const image = fields?.image || "/images/siti.png";
  const name = fields?.name || "Siti Sarah";
  const title = fields?.title || "Founder Travosca";
  const paragraphs =
    fields?.body_paragraphs && fields.body_paragraphs.length > 0
      ? fields.body_paragraphs
      : [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor sapien et urna tincidunt fringilla. Vivamus at augue interdum, blandit arcu quis, laoreet ipsum. In eu ipsum urna. Suspendisse suscipit est et neque.",
          "Mauris tempor tellus ante, ut fermentum erat gravida vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean nec justo dui. Ut et consequat dui, a malesuada ipsum. Pellentesque nec turpis viverra, blandit mi a, accumsan justo.",
        ];

  return (
    <section className="py-20 sm:py-24 bg-white">
      <Container size="content" className="px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Founder Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] h-[420px] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Quote & Story */}
          <div className="lg:col-span-7 space-y-5">
            <div className="relative w-10 h-10 mb-1">
              <Image
                src="/images/quote.svg"
                alt="Quote"
                fill
                className="object-contain object-left"
              />
            </div>

            <div className="space-y-4 font-poppins text-sm text-[#666666] leading-relaxed">
              {paragraphs.map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="pt-2">
              <h4 className="font-poppins font-bold text-xl text-black">
                {name}
              </h4>
              <p className="font-poppins text-xs text-[#777777] mt-0.5 font-normal">
                {title}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
