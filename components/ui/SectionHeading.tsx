import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  theme?: "dark" | "light";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isRight = align === "right";

  return (
    <div
      className={cn(
        "mb-10 sm:mb-14",
        isCenter && "text-center mx-auto max-w-3xl",
        isRight && "text-right ml-auto max-w-3xl",
        !isCenter && !isRight && "text-left max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block font-poppins text-xs md:text-sm font-semibold tracking-wider uppercase mb-2",
            theme === "dark" ? "text-rebel-gray-light" : "text-neutral-500"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-poppins font-semibold text-2xl sm:text-3xl lg:text-[40px] lg:leading-[50px] tracking-tight",
          theme === "dark" ? "text-white" : "text-rebel-black",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "font-poppins text-sm sm:text-base lg:text-[18px] lg:leading-[34px] font-normal mt-3 sm:mt-4",
            theme === "dark" ? "text-rebel-gray-lighter" : "text-rebel-gray-body"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
