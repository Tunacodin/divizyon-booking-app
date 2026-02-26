"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
};

function withQueryParam(url: string, key: string, value: string) {
  const hasQuery = url.includes("?");
  const sep = hasQuery ? "&" : "?";
  return `${url}${sep}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

export function CalendlyModal({ isOpen, onClose, url, title }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [errored, setErrored] = useState(false);

  const iframeSrc = useMemo(() => {
    return withQueryParam(url, "hide_gdpr_banner", "1");
  }, [url]);

  useEffect(() => {
    if (!isOpen) return;

    setLoaded(false);
    setTimedOut(false);
    setErrored(false);

    const t = window.setTimeout(() => {
      setTimedOut(true);
    }, 12000);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [isOpen, iframeSrc]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-background/50 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            <p className="mt-0.5 text-sm text-textMuted">
              Randevu oluşturmak için tarih seçin
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-textSecondary transition-all hover:border-borderHover hover:bg-background hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Kapat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-hidden p-6">
          {/* Loading State */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-accent" />
                <p className="text-sm font-medium text-textSecondary">
                  Takvim yükleniyor...
                </p>
              </div>
            </div>
          )}

          {/* Calendly iFrame */}
          <iframe
            key={iframeSrc}
            title={`${title} - Randevu Takvimi`}
            src={iframeSrc}
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={cn(
              "h-full w-full rounded-xl border border-border bg-background",
              loaded ? "opacity-100" : "opacity-0",
              "transition-opacity duration-300",
            )}
          />

          {/* Error State */}
          {(errored || timedOut) && (
            <div
              role="alert"
              className="absolute inset-x-6 bottom-6 rounded-xl border border-accent/30 bg-accent/5 p-4"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    Takvim yüklenemedi
                  </p>
                  <p className="mt-1 text-xs text-textMuted">
                    Lütfen sayfayı yenileyin veya{" "}
                    <a
                      className="font-semibold text-accent underline"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Calendly&apos;den devam edin
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
