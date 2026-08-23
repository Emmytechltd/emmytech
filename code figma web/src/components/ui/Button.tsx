import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-display font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[var(--blue)] text-white hover:bg-[var(--blue-light)] active:scale-[0.98] shadow-lg shadow-[var(--glow)] focus-visible:ring-[var(--blue)]",
      secondary:
        "bg-[var(--bg3)] text-[var(--fg)] border border-[var(--border2)] hover:border-[var(--blue)] hover:text-[var(--blue)] active:scale-[0.98]",
      outline:
        "border border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white active:scale-[0.98]",
      ghost:
        "text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)] active:scale-[0.98]",
      danger:
        "bg-[var(--red)] text-white hover:opacity-90 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm h-9",
      md: "px-5 py-2.5 text-sm h-11",
      lg: "px-7 py-3.5 text-base h-13",
    };

    return (
      <button
        ref={ref}
        className={clsx(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
