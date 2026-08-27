import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "desktop" | "content" | "narrow" | "full";
}

export function Container({
  size = "content",
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    desktop: "max-w-rebel-desktop",
    content: "max-w-rebel-content",
    narrow: "max-w-4xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
