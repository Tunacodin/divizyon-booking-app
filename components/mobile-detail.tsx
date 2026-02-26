"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Studio } from "@/lib/studios";

type Props = {
  studio: Studio;
  onBack: () => void;
  onBook: () => void;
};

export function MobileDetail({ studio, onBack, onBook }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-carousel - 3 seconds interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % studio.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [studio.images.length]);

  const images = studio.images;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: studio.name,
          text: studio.headline,
          url: window.location.href,
        });
      } catch {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link kopyalandı!");
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Image Carousel */}
      <div className="relative shrink-0 w-full h-[50vh] overflow-hidden bg-background">
        {/* Back and Share Buttons */}
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Geri"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Paylaş"
          >
            <Share2 className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Images */}
        {images.map((img, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              currentImageIndex === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={img}
              alt={`${studio.name} - ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                currentImageIndex === index
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/60",
              )}
              aria-label={`Görsel ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex-1 space-y-4 p-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground">
            {studio.name}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-2 text-textMuted">
            <svg
              className="h-5 w-5"
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
            <span className="text-sm">Divizyon Konya</span>
          </div>


          {/* Headline */}
          <p className="text-lg font-semibold text-accent">{studio.headline}</p>

          {/* Description */}
          <p className="leading-relaxed text-textMuted">{studio.description}</p>
        </div>

        {/* Fixed Bottom Section */}
        <div className="shrink-0 border-t border-border bg-surface p-6">
          <button
            onClick={onBook}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-accent text-lg font-bold text-white shadow-lg transition-all hover:bg-accent/90 active:scale-95"
          >
            Randevu Oluştur
          </button>
        </div>
      </div>
    </div>
  );
}
