"use client";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

export function StudioListItem({ title, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl px-4 py-3 text-left font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset",
        "break-words hyphens-auto",
        isSelected
          ? "bg-accent text-white shadow-[0_2px_8px_rgba(250,183,88,0.25)]"
          : "bg-surface text-foreground hover:bg-background hover:shadow-sm",
      )}
      style={isSelected ? { boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.2)' } : undefined}
    >
      <span className="block">{title}</span>
    </button>
  );
}
