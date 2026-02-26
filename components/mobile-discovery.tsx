"use client";

import Image from "next/image";
import type { Studio } from "@/lib/studios";

type Props = {
  studios: Studio[];
  onStudioSelect: (studioId: string) => void;
};

export function MobileDiscovery({ studios, onStudioSelect }: Props) {
  return (
    <div className="flex h-full flex-col bg-background">
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
          <a
            href="https://www.divizyon.org/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white"
            style={{ backgroundColor: '#262b32' }}
          >
            Divizyon&#39;a Git
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Hero Text */}
        <div className="shrink-0 px-4 pb-6 pt-4">
          <p className="text-center text-base leading-relaxed text-textMuted">
            Fikirlerini en yüksek kalitede hayata geçirmen için tasarlanmış,
            en yeni teknolojilerle donatılmış özel üretim alanlarımızla tanış.{" "}
            <span className="font-bold text-foreground">Hemen Randevu Oluştur!</span>
          </p>
        </div>

        {/* Studio Cards - Responsive Grid */}
        <div className="shrink-0 px-4 pb-4 min-h-[70vh]">
          <h2 className="mb-4 text-xl font-bold text-foreground">Stüdyolarımız</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {studios.map((studio) => (
              <div
                key={studio.id}
                onClick={() => onStudioSelect(studio.id)}
                className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all"
              >
                {/* Image - Top */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content - Bottom */}
                <div className="flex flex-col gap-1 p-2">
                  <h3 className="text-sm font-bold text-foreground line-clamp-1">
                    {studio.name}
                  </h3>
                  <p className="text-xs text-textMuted line-clamp-2">
                    {studio.headline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="shrink-0 bg-[#262b32] px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-left text-sm leading-tight text-white">
              Fikirlerini, yeteneklerini ve projelerini Divizyon&#39;un üretim ağıyla buluştur.
            </p>
            <a
              href="https://divizyon.typeform.com/to/tLs5N2lu?typeform-source=www.divizyon.org"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-[#262b32] transition-all hover:opacity-90 whitespace-nowrap"
            >
              Komünite&#39;ye Başvur
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
