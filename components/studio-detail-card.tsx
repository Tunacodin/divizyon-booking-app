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
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      {/* Image Carousel */}
      <div className="relative w-full shrink-0 overflow-hidden bg-background" style={{ aspectRatio: '4/3', maxHeight: '320px' }}>
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Görsel ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content - No scroll needed */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-foreground lg:text-2xl">
              {title}
            </h2>
            {location && (
              <div className="flex items-center gap-1.5 text-xs text-textMuted lg:text-sm">
                <svg
                  className="h-3.5 w-3.5 lg:h-4 lg:w-4"
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
          <p className="mt-2 text-base font-semibold text-foreground lg:text-lg">
            {headline}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-textMuted lg:text-base">
            {description}
          </p>
        </div>

        {/* Action Button at Bottom */}
        <div className="mt-4 shrink-0 border-t border-border pt-4">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onBookClick();
            }}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 active:scale-95"
          >
            Randevu Oluştur
          </button>
        </div>
      </div>
    </article>
  );
}
