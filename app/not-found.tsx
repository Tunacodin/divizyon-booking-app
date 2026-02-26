import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Sayfa Bulunamadı</h2>
        <p className="mt-2 text-textMuted">Aradığınız sayfa mevcut değil.</p>
      </div>
      <Link
        href="/"
        className="rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all hover:bg-accent/90"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
