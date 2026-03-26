"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
  title: string;
  minHeightClassName?: string;
  showHeader?: boolean;
};

function normalizeCalendlyUrl(url: string) {
  // Replace PopupText embed_type with Inline for iframe embedding
  return url.replace(/embed_type=PopupText/gi, "embed_type=Inline");
}

function withQueryParam(url: string, key: string, value: string) {
  const hasQuery = url.includes("?");
  const sep = hasQuery ? "&" : "?";
  return `${url}${sep}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

export function CalendlyEmbed({
  url,
  title,
  minHeightClassName,
  showHeader = true,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [errored, setErrored] = useState(false);

  const iframeSrc = useMemo(() => {
    const normalized = normalizeCalendlyUrl(url);
    return withQueryParam(normalized, "hide_gdpr_banner", "1");
  }, [url]);

  useEffect(() => {
    setLoaded(false);
    setTimedOut(false);
    setErrored(false);

    const t = window.setTimeout(() => {
      setTimedOut(true);
    }, 12000);

    return () => window.clearTimeout(t);
  }, [iframeSrc]);

  return (
    <section
      className={cn(
        "overflow-hidden",
        showHeader
          ? "rounded-2xl border border-border bg-surface shadow-elev1"
          : "h-full",
      )}
    >
      {showHeader && (
        <header className="border-b border-border bg-background/50 p-4 sm:p-6">
          <h2 className="text-base font-bold text-foreground sm:text-lg">
            {title}
          </h2>
          <p className="mt-1 text-xs text-textMuted sm:text-sm">
            Takvim yüklenmezse{" "}
            <a
              className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Calendly&#39;yi yeni sekmede açın
            </a>
            .
          </p>
        </header>
      )}

      <div
        className={cn(
          "relative",
          showHeader ? "p-4 sm:p-6" : "h-full p-0",
        )}
      >
        {/* Loading State */}
        {!loaded && (
          <div
            aria-live="polite"
            aria-busy="true"
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm",
              showHeader
                ? "rounded-xl border border-border"
                : "rounded-none",
              minHeightClassName ?? "min-h-[700px]",
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-accent" />
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
          width="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={showHeader ? undefined : { width: "100%", height: "100%", background: "#ffffff" }}
          className={cn(
            "relative w-full bg-white",
            showHeader
              ? "rounded-xl border border-border"
              : "h-full rounded-none border-0",
            minHeightClassName ?? "min-h-[700px]",
          )}
        />

        {/* Error State */}
        {(errored || timedOut) && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-4 sm:p-5"
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
                <p className="mt-1 text-xs text-textMuted sm:text-sm">
                  Lütfen sayfayı yenileyin veya{" "}
                  <a
                    className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Calendly&#39;den devam edin
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
