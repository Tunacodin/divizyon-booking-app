"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
      <main className="hidden h-screen flex-col overflow-hidden bg-background lg:flex">
        {/* Header with Logo - Fixed height */}
        <header className="shrink-0 border-b border-border bg-surface/80 backdrop-blur-sm">
          <div className="container-responsive py-4">
            <div className="relative h-8 w-32">
              <Image
                src="/logo-dark@2x.png"
                alt="Divizyon"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
        </header>

        {/* Hero Section - Compact, fixed height */}
        <section className="shrink-0 border-b border-border bg-gradient-to-b from-surface to-background">
          <div className="container-responsive py-6 lg:py-8">
            <h1 className="mx-auto max-w-3xl text-center text-xl font-bold leading-tight text-foreground lg:text-2xl">
              Fikirlerini en yüksek kalitede hayata geçirmen için tasarlanmış,
              en yeni teknolojilerle donatılmış özel üretim alanlarımızla tanış.
            </h1>
          </div>
        </section>

        {/* Main Content: Sidebar + Detail - Takes remaining height */}
        <section className="container-responsive flex flex-1 overflow-hidden py-6 lg:py-8">
          <div className="flex h-full w-full gap-6 overflow-hidden lg:gap-8">
            {/* Sidebar - Studio List */}
            <aside className="h-full w-64 shrink-0 xl:w-80">
              <div className="flex h-full flex-col gap-3 overflow-y-auto overflow-x-visible pr-2">
                <h2 className="shrink-0 text-sm font-semibold uppercase tracking-wide text-textMuted">
                  Stüdyolar
                </h2>
                <div className="flex flex-col gap-3">
                  {activeStudios.map((studio) => (
                    <StudioListItem
                      key={studio.id}
                      title={studio.name}
                      isSelected={studio.id === selectedId}
                      onClick={() => setSelectedId(studio.id)}
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* Detail Card - Takes remaining height */}
            <div className="h-full flex-1 overflow-hidden min-w-0 flex justify-center items-center px-4">
              <div className="h-full w-full max-w-lg">
                {selectedStudio ? (
                  <StudioDetailCard
                    title={selectedStudio.name}
                    headline={selectedStudio.headline}
                    description={selectedStudio.description}
                    images={selectedStudio.images}
                    location={selectedStudio.location}
                    onBookClick={openBooking}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center rounded-2xl border border-border bg-surface">
                    <p className="text-textMuted">Lütfen bir stüdyo seçin.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
