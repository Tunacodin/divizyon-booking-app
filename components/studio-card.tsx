"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  Cpu,
  Mic,
  Scissors,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  selected?: boolean;
  disabled?: boolean;
  onSelect: () => void;
  onBook: () => void;
};

const ICONS: Record<string, LucideIcon> = {
  cpu: Cpu,
  mic: Mic,
  scissors: Scissors,
  users: Users,
  video: Video,
};

export function StudioCard({
  title,
  description,
  icon,
  imageUrl,
  selected,
  disabled,
  onSelect,
  onBook,
}: Props) {
  const Icon = icon ? ICONS[icon] : undefined;

  return (
    <article
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-pressed={selected}
      onClick={() => {
        if (disabled) return;
        onSelect();
      }}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl border text-left transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        !disabled && "cursor-pointer hover:shadow-md active:scale-[0.99]",
        selected
          ? "border-accent bg-accent/5 shadow-md"
          : "border-border bg-surface hover:border-borderHover hover:bg-surface/80",
      )}
    >
      {/* Selection Indicator */}
      {selected && (
        <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
      )}

      <div className="flex items-start gap-3 p-4 sm:items-center sm:gap-4 sm:p-5">
        {/* Icon */}
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 sm:h-12 sm:w-12",
            selected
              ? "border-accent/50 bg-accent/10"
              : "border-border bg-background group-hover:border-borderHover",
          )}
        >
          {Icon ? (
            <Icon
              aria-hidden
              className={cn(
                "h-5 w-5 transition-colors sm:h-6 sm:w-6",
                selected ? "text-accent" : "text-textSecondary",
              )}
            />
          ) : (
            <span
              aria-hidden
              className={cn(
                "inline-flex h-2.5 w-2.5 rounded-full transition-colors",
                selected ? "bg-accent" : "bg-textMuted",
              )}
            />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-foreground sm:text-base">
            {title}
          </h3>
          <p className="mt-0.5 truncate text-xs text-textMuted sm:text-sm">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <Button
          size="sm"
          variant="primary"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
          className="shrink-0"
        >
          <span className="hidden sm:inline">Randevu</span>
          <span className="sm:hidden">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
        </Button>
      </div>

      {/* Thumbnail Image (Desktop Only) */}
      {imageUrl && (
        <div className="hidden border-t border-border bg-background lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="h-32 w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
            loading="lazy"
          />
        </div>
      )}
    </article>
  );
}

