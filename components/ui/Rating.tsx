import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  score?: number;
  max?: number;
  showScore?: boolean;
  className?: string;
  starClassName?: string;
}

export function Rating({
  score = 5,
  max = 5,
  showScore = false,
  className,
  starClassName,
}: RatingProps) {
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, idx) => {
        const isFilled = idx < score;
        return (
          <Star
            key={idx}
            className={cn(
              "w-4 h-4 transition-colors",
              isFilled
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300 fill-gray-100",
              starClassName
            )}
          />
        );
      })}
      {showScore && (
        <span className="ml-1 text-sm font-semibold text-rebel-gray-dark font-poppins">
          {score.toFixed(1)}
        </span>
      )}
    </div>
  );
}
