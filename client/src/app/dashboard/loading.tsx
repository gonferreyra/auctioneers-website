export default function Loading() {
  return (
    <div className="min-h-screen bg-secondary">
      <div className="h-16 pt-8">
        <main className="animate-pulse p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex justify-center gap-2">
              <div className="mr-3 h-10 w-2/5 rounded bg-muted-foreground/60"></div>
              <div className="mr-3 h-10 w-1/5 rounded bg-muted-foreground/60"></div>
              <div className="mr-3 h-10 w-1/5 rounded bg-muted-foreground/60"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="card space-y-4 p-6">
              <div className="h-32 rounded bg-muted-foreground/60"></div>
              <div className="h-32 rounded bg-muted-foreground/60"></div>
              <div className="h-32 rounded bg-muted-foreground/60"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
