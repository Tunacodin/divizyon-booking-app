"use client";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95";

const sizes: Record<Size, string> = {
  sm: "h-9 rounded-xl px-3 text-xs sm:h-10 sm:px-4 sm:text-sm",
  md: "h-10 rounded-xl px-4 text-sm sm:h-11 sm:px-5",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-sm hover:bg-accent/90 hover:shadow-md",
  secondary:
    "border-2 border-border bg-surface text-foreground hover:border-borderHover hover:bg-background shadow-sm",
  ghost:
    "text-foreground hover:bg-background/80 hover:text-textSecondary",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}

