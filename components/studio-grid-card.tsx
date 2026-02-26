"use client";

import Image from "next/image";
import { Button } from "@/components/button";

type Props = {
  title: string;
  headline: string;
  description: string;
  imageUrl: string;
  onBookClick: () => void;
};

export function StudioGridCard({
  title,
  headline,
  description,
  imageUrl,
  onBookClick,
}: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">
            {title}
          </h3>
          <p className="mt-2 text-base font-semibold text-accent sm:text-lg">
            {headline}
          </p>
          <p className="mt-3 leading-relaxed text-textMuted sm:text-base">
            {description}
          </p>
        </div>

        {/* Action */}
        <div className="mt-6">
          <Button
            variant="primary"
            size="md"
            onClick={onBookClick}
            className="w-full sm:w-auto"
          >
            Randevu Oluştur
          </Button>
        </div>
      </div>
    </article>
  );
}
