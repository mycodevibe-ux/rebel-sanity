import React from "react";
import Image from "next/image";
import { StatsCountersFields } from "@/types/cms";
import { Container } from "@/components/ui/Container";

interface StatsCountersProps {
  fields: StatsCountersFields;
}

const defaultStats = [
  { icon: "/images/satisfied.svg", number: "126 +", label: "Satisfied Client" },
  { icon: "/images/new.svg", number: "230 +", label: "New Traveller" },
  { icon: "/images/destination.svg", number: "230 +", label: "Destination" },
  { icon: "/images/award.svg", number: "230 +", label: "Award" },
];

function resolveStatIcon(icon: string, index: number) {
  if (icon.startsWith("/") || icon.startsWith("http")) return icon;
  if (icon === "users") return "/images/satisfied.svg";
  if (icon === "user") return "/images/new.svg";
  if (icon === "mountain") return "/images/destination.svg";
  if (icon === "award") return "/images/award.svg";
  return defaultStats[index % defaultStats.length].icon;
}

export function StatsCounters({ fields }: StatsCountersProps) {
  const bgImage = fields?.background_image || "/images/aboutbg.png";
  const stats =
    fields?.items && fields.items.length > 0
      ? fields.items.map((s: any, idx: number) => ({
          icon: resolveStatIcon(s.icon || "", idx),
          number: s.number || defaultStats[idx]?.number || "100+",
          label: s.label || defaultStats[idx]?.label || "Metric",
        }))
      : defaultStats;

  return (
    <section className="relative py-24 sm:py-28 overflow-hidden text-white bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="About stats background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <Container size="content" className="relative z-10 px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
          {stats.map((stat: any, idx: number) => (
            <div
              key={idx}
              className="flex flex-col items-center space-y-3 group cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all duration-300 select-none"
            >
              <div className="relative w-12 h-12 mb-1 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  fill
                  className="brightness-0 invert object-contain"
                />
              </div>
              <span className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight drop-shadow-md">
                {stat.number}
              </span>
              <span className="font-poppins text-xs sm:text-sm text-white/95 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
