import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  className,
  hoverEffect = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-rebel-white rounded-rebel-card shadow-rebel-card overflow-hidden border border-gray-100/60 transition-all duration-300",
        hoverEffect && "hover:-translate-y-1.5 hover:shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
