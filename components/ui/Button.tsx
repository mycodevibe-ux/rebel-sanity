import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-poppins font-semibold transition-all duration-200 cursor-pointer text-center select-none active:scale-[0.98]";

  const variantStyles = {
    primary:
      "btn-slide btn-shine text-rebel-white shadow-md hover:shadow-lg",
    secondary:
      "bg-rebel-white text-rebel-black hover:bg-gray-100 shadow-md hover:shadow-lg",
    outline:
      "bg-transparent text-rebel-black border border-rebel-black hover:bg-rebel-black hover:text-rebel-white",
    white:
      "bg-white text-rebel-black hover:bg-gray-100 shadow-md",
    ghost:
      "bg-transparent text-rebel-black hover:bg-neutral-100",
  };

  const sizeStyles = {
    sm: "px-5 py-2 text-sm rounded-rebel-button",
    md: "px-7 py-3 text-base rounded-rebel-button",
    lg: "px-9 py-4 text-lg rounded-rebel-button",
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
