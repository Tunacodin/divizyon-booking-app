"use client";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
};

export function StudioListItem({ title, isSelected, onClick, icon }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl px-4 py-3 text-left font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset",
        "break-words hyphens-auto",
        "flex items-start gap-3",
        "ring-2 ring-inset",
        isSelected
          ? "bg-accent text-white ring-white/20"
          : "bg-surface text-foreground ring-transparent hover:ring-white",
      )}
      style={undefined}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="block flex-1">{title}</span>
    </button>
  );
}
