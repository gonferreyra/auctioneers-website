export default function Loading() {
  return (
    <div className="min-h-screen bg-secondary">
      <div className="h-16 pt-8">
        <main className="animate-pulse p-4 sm:p-6 lg:p-8">
          <div className="mx-auto mb-4 max-w-7xl rounded-sm bg-muted-foreground/60 px-4 pt-12 sm:px-6 lg:px-8 xl:mx-auto" />
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 flex flex-col justify-between sm:flex-row sm:items-center">
              <ul className="flex-1 list-none">
                <li className="mb-2 h-4 w-1/4 rounded bg-muted-foreground/60"></li>
                <li className="mb-2 h-4 w-1/2 rounded bg-muted-foreground/60"></li>
                <li className="mb-2 h-4 w-3/4 rounded bg-muted-foreground/60"></li>
              </ul>
              <div className="flex gap-2">
                <div className="mr-3 h-10 w-1/3 rounded bg-muted-foreground/60"></div>
                <div className="mr-3 h-10 w-1/3 rounded bg-muted-foreground/60"></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col justify-center gap-4 p-6 md:flex-row">
                <div className="h-96 rounded-xl bg-muted-foreground/60 md:w-[50%]"></div>
                <div className="h-96 rounded-xl bg-muted-foreground/60 md:w-[50%]"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
