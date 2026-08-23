import { clsx } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "amber" | "red" | "cyan" | "glass";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({ children, variant = "blue", size = "sm", className }: BadgeProps) {
  const variants = {
    blue: "bg-blue-500/15 text-[var(--blue-light)] border border-blue-500/20",
    green: "bg-emerald-500/15 text-[var(--green)] border border-emerald-500/20",
    amber: "bg-amber-500/15 text-[var(--amber)] border border-amber-500/20",
    red: "bg-red-500/15 text-[var(--red)] border border-red-500/20",
    cyan: "bg-cyan-500/15 text-[var(--cyan)] border border-cyan-500/20",
    glass: "glass text-[var(--fg2)]",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
