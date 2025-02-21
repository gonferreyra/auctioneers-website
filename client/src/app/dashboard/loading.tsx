export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 pt-8">
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-pulse">
            <div className="flex justify-center gap-2">
              <div className="mr-3 h-10 w-2/5 rounded bg-gray-200"></div>
              <div className="mr-3 h-10 w-1/5 rounded bg-gray-200"></div>
              <div className="mr-3 h-10 w-1/5 rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="mt-4">
            <div className="card space-y-4 p-6">
              <div className="h-32 rounded bg-gray-200"></div>
              <div className="h-32 rounded bg-gray-200"></div>
              <div className="h-32 rounded bg-gray-200"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
