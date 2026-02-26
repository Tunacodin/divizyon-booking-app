export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-accent"></div>
        <p className="text-sm text-textMuted">Yükleniyor...</p>
      </div>
    </div>
  );
}
