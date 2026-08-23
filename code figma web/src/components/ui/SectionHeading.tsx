import { clsx } from "../../lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-6 h-px bg-[var(--blue)]" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--blue)] font-display">
            {eyebrow}
          </span>
          <span className="w-6 h-px bg-[var(--blue)]" />
        </div>
      )}
      <h2
        className={clsx(
          "font-display font-bold leading-tight",
          light ? "text-white" : "text-[var(--fg)]",
          "text-3xl md:text-4xl lg:text-[2.75rem]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mt-4 leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-white/60" : "text-[var(--fg2)]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
