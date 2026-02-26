"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Video, Mic, Server, Film, Users } from "lucide-react";
import { studios } from "@/lib/studios";
import { StudioListItem } from "@/components/studio-list-item";
import { StudioDetailCard } from "@/components/studio-detail-card";
import { MobileDiscovery } from "@/components/mobile-discovery";
import { MobileDetail } from "@/components/mobile-detail";

export function BookingPage() {
  const activeStudios = useMemo(
    () => studios.filter((s) => s.active).sort((a, b) => a.order - b.order),
    [],
  );

  const [selectedId, setSelectedId] = useState(activeStudios[0]?.id ?? "");
  const [mobileView, setMobileView] = useState<"discovery" | "detail">("discovery");

  const studioIcons: Record<string, React.ReactNode> = {
    "greenbox-studyosu": <Video className="h-5 w-5" />,
    "ses-ve-miksaj-studyosu": <Mic className="h-5 w-5" />,
    "render-studyosu": <Server className="h-5 w-5" />,
    "post-produksiyon-studyosu": <Film className="h-5 w-5" />,
    "toplanti-odasi": <Users className="h-5 w-5" />,
  };

  const selectedStudio = activeStudios.find((s) => s.id === selectedId);

  const openBooking = () => {
    if (selectedStudio && typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url: selectedStudio.calendlyUrl });
    }
  };

  const handleMobileStudioSelect = (studioId: string) => {
    setSelectedId(studioId);
    setMobileView("detail");
  };

  const handleMobileBack = () => {
    setMobileView("discovery");
  };

  return (
    <>
      {/* Mobile/Tablet View (< lg) */}
      <div className="h-screen lg:hidden">
        {mobileView === "discovery" ? (
          <MobileDiscovery
            studios={activeStudios}
            onStudioSelect={handleMobileStudioSelect}
          />
        ) : selectedStudio ? (
          <MobileDetail
            studio={selectedStudio}
            onBack={handleMobileBack}
            onBook={openBooking}
          />
        ) : null}
      </div>

      {/* Desktop View (>= lg) */}
      <main className="hidden min-h-screen flex-col bg-background lg:flex">
        {/* Header with Logo - Fixed height */}
        <header className="shrink-0 border-b border-border bg-surface/80 backdrop-blur-sm">
          <div className="container-responsive py-4">
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
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
                style={{ backgroundColor: '#262b32' }}
              >
                Divizyon&apos;a Git
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section - Compact, fixed height */}
        <section className="shrink-0 border-b border-border bg-gradient-to-b from-surface to-background">
          <div className="container-responsive py-6 lg:py-8">
            <h1 className="mx-auto max-w-3xl text-center text-xl font-bold leading-tight text-foreground lg:text-2xl">
              Fikirlerini en yüksek kalitede hayata geçirmen için tasarlanmış,
              en yeni teknolojilerle donatılmış özel üretim alanlarımızla tanış.{" "}
              Hemen Randevu Oluştur!
            </h1>
          </div>
        </section>

        {/* Main Content: Sidebar + Detail - Responsive grid layout */}
        <section className="flex-1 flex items-start justify-center py-4 lg:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[16rem_auto] xl:grid-cols-[20rem_auto] gap-4 lg:gap-6 items-start">
            {/* Sidebar - Studio List */}
            <aside className="flex flex-col lg:sticky lg:top-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-textMuted">
                Stüdyolar
              </h2>
              <div className="flex flex-col gap-2 lg:gap-3">
                {activeStudios.map((studio) => (
                  <StudioListItem
                    key={studio.id}
                    title={studio.name}
                    isSelected={studio.id === selectedId}
                    onClick={() => setSelectedId(studio.id)}
                    icon={studioIcons[studio.id]}
                  />
                ))}
              </div>
            </aside>

            {/* Detail Card - Responsive sizing */}
            <div className="w-full max-w-md lg:max-w-lg mx-auto lg:mx-0">
              <div className="h-[70vh] lg:h-[65vh]">
                {selectedStudio ? (
                  <div
                    key={selectedStudio.id}
                    className="h-full w-full animate-slideIn"
                  >
                    <StudioDetailCard
                      title={selectedStudio.name}
                      headline={selectedStudio.headline}
                      description={selectedStudio.description}
                      images={selectedStudio.images}
                      location={selectedStudio.location}
                      onBookClick={openBooking}
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center rounded-2xl border border-border bg-surface">
                    <p className="text-textMuted">Lütfen bir stüdyo seçin.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="shrink-0 mt-8 border-t border-border bg-[#262b32]">
          <div className="container-responsive py-8">
            <div className="flex items-center justify-between gap-8">
              <p className="text-lg leading-relaxed text-white">
                Fikirlerini, yeteneklerini ve projelerini Divizyon&apos;un üretim ağıyla buluştur.
              </p>
              <a
                href="https://divizyon.typeform.com/to/tLs5N2lu?typeform-source=www.divizyon.org"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full bg-accent px-8 py-3 text-base font-semibold text-[#262b32] transition-all hover:opacity-90"
              >
                Komünite&apos;ye Başvur
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
