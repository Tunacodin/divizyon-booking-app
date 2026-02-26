"use client";

import Image from "next/image";
import type { Studio } from "@/lib/studios";

type Props = {
  studios: Studio[];
  onStudioSelect: (studioId: string) => void;
};

export function MobileDiscovery({ studios, onStudioSelect }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="shrink-0 px-4 pb-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="relative h-8 w-32">
            <Image
              src="/logo-dark@2x.png"
              alt="Divizyon"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface"
            aria-label="Ara"
          >
            <svg
              className="h-6 w-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>


      {/* Hero Text */}
      <div className="shrink-0 px-4 pb-6">
        <p className="text-center text-base leading-relaxed text-textMuted">
          Fikirlerini en yüksek kalitede hayata geçirmen için tasarlanmış,
          en yeni teknolojilerle donatılmış özel üretim alanlarımızla tanış.
        </p>
      </div>

      {/* Studio Cards - Horizontal Scroll */}
      <div className="flex-1 overflow-hidden">
        <div className="mb-4 flex items-center justify-between px-4">
          <h2 className="text-xl font-bold text-foreground">Stüdyolarımız</h2>
          <button className="text-sm font-semibold text-accent">
            Tümünü Gör
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
          {studios.map((studio) => (
            <button
              key={studio.id}
              onClick={() => onStudioSelect(studio.id)}
              className="group shrink-0 w-64"
            >
              <div className="overflow-hidden rounded-2xl">
                {/* Card Image */}
                <div className="relative aspect-[4/3] h-48 overflow-hidden bg-background">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Favorite Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                  >
                    <svg
                      className="h-5 w-5 text-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Card Content */}
                <div className="mt-3 space-y-1 text-left">
                  <h3 className="font-bold text-foreground">{studio.name}</h3>
                  <p className="text-sm text-textMuted">
                    {studio.headline.length > 50
                      ? studio.headline.substring(0, 50) + "..."
                      : studio.headline}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
