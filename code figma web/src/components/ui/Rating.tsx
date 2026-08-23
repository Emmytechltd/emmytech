import { Star } from "lucide-react";
import { clsx } from "../../lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  reviews?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

export default function Rating({ value, max = 5, reviews, size = "sm", showCount = true, className }: RatingProps) {
  const starSize = size === "sm" ? 12 : 15;

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(value);
          const half = !filled && i < value;
          return (
            <Star
              key={i}
              size={starSize}
              className={clsx(
                filled || half ? "text-[var(--amber)]" : "text-[var(--fg3)]",
                half ? "opacity-60" : ""
              )}
              fill={filled ? "currentColor" : half ? "currentColor" : "none"}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs text-[var(--fg3)]">
          {value.toFixed(1)}
          {reviews !== undefined && ` (${reviews})`}
        </span>
      )}
    </div>
  );
}
