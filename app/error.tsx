'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Bir hata oluştu</h2>
        <p className="mt-2 text-textMuted">Üzgünüz, bir şeyler yanlış gitti.</p>
      </div>
      <button
        onClick={reset}
        className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all hover:bg-accent/90"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
