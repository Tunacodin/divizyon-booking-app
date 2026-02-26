"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  title: string;
  headline: string;
  description: string;
  images: string[];
  location?: string;
  onBookClick: () => void;
};

export function StudioDetailCard({
  title,
  headline,
  description,
  images,
  location,
  onBookClick,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Otomatik geçiş - 3 saniyede bir
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <article className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-border bg-surface">
      {/* Image Carousel - Responsive height */}
      <div className="relative w-full overflow-hidden bg-background aspect-[16/9] lg:aspect-[2/1]">
        <Image
          src={images[currentImageIndex]}
          alt={`${title} - ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Carousel Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Görsel ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content - Scrollable with flex */}
      <div className="flex flex-col min-h-0 p-4 lg:p-5">
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <h2 className="text-lg font-bold text-foreground lg:text-xl">
              {title}
            </h2>
            {location && (
              <div className="flex items-center gap-1.5 text-xs text-textMuted shrink-0">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="whitespace-nowrap">{location}</span>
              </div>
            )}
          </div>
          <p className="mt-2 text-sm font-semibold text-foreground lg:text-base">
            {headline}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-textMuted">
            {description}
          </p>
        </div>

        {/* Action Button at Bottom */}
        <div className="shrink-0 mt-3 pt-3 border-t border-border">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onBookClick();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 active:scale-[0.98] lg:text-base lg:py-3"
          >
            Randevu Oluştur
          </button>
        </div>
      </div>
    </article>
  );
}
