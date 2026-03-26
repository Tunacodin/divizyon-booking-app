"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isLoading: boolean;
  error: string | null;
  verifyMembership: (email: string) => Promise<boolean>;
};

export function CircleLoginModal({
  isOpen,
  onClose,
  onSuccess,
  isLoading,
  error,
  verifyMembership,
}: Props) {
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isLoading) return;

    const success = await verifyMembership(email.trim());
    if (success) {
      setEmail("");
      onSuccess();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-textMuted transition-colors hover:bg-background hover:text-foreground"
          aria-label="Kapat"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            Divizyon Ağ Üyelerine Özel Giriş
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-textMuted">
            Lütfen rezervasyon yapabilmek için Divizyon | Komünite&#39;ye kayıt olduğun e-posta adresini gir. Eğer Komünite&#39;ye üye değilsen,{" "}
            <a
              href="https://www.divizyon.org/studyolar.html"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline underline-offset-2 transition-colors hover:text-accent/80"
            >
              buraya tıklayarak
            </a>{" "}
            herkese açık rezervasyon saatlerinden yararlanabilirsin.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="circle-email" className="mb-1.5 block text-sm font-medium text-foreground">
              E-posta Adresi
            </label>
            <input
              ref={inputRef}
              id="circle-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              disabled={isLoading}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-textMuted/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Doğrulanıyor...
              </>
            ) : (
              "Giriş Yap"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
