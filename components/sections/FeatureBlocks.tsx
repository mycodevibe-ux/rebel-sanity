import React from "react";
import Image from "next/image";
import { FeatureBlocksFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";

interface FeatureBlocksProps {
  fields: FeatureBlocksFields;
}

const defaultItems = [
  {
    icon: "/images/greatteam.svg",
    title: "Great team work",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor nunc non neque euismod porttitor. Nullam lacus est, tincidunt eget sapien eget, maximus convallis massa. Curabitur quis tellus a tortor egestas viverra.",
  },
  {
    icon: "/images/our-vision.svg",
    title: "Our vision",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..",
  },
  {
    icon: "/images/ourvision.svg",
    title: "Our mision",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam..",
  },
];

function resolveIcon(icon: string, index: number) {
  if (icon.startsWith("/") || icon.startsWith("http")) return icon;
  if (icon === "users" || icon === "team") return "/images/greatteam.svg";
  if (icon === "rocket" || icon === "vision") return "/images/our-vision.svg";
  if (icon === "trending-up" || icon === "mission") return "/images/ourvision.svg";
  return defaultItems[index % defaultItems.length].icon;
}

export function FeatureBlocks({ fields }: FeatureBlocksProps) {
  const items =
    fields?.items && fields.items.length > 0
      ? fields.items.map((it: any, idx: number) => ({
          icon: resolveIcon(it.icon || "", idx),
          title: it.title || defaultItems[idx]?.title || "",
          description: it.description || defaultItems[idx]?.description || "",
        }))
      : defaultItems;

  return (
    <section className="py-20 sm:py-24 bg-white">
      <Container size="content" className="px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-400 ease-out flex flex-col items-start group cursor-pointer bg-white"
            >
              <div className="relative w-14 h-14 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-black mb-3 group-hover:text-neutral-900 transition-colors">
                {item.title}
              </h3>
              <p className="font-poppins text-sm text-[#666666] leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
