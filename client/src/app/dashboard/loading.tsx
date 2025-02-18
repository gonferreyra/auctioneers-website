export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 pt-8">
        <div className="mx-6 max-w-7xl animate-pulse bg-gray-200 px-4 pt-12 sm:px-6 lg:px-8 xl:mx-auto" />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-pulse">
            <div className="mb-4 flex flex-col justify-between sm:flex-row sm:items-center">
              <ul className="flex-1 list-none">
                <li className="mb-2 h-4 w-1/4 rounded bg-gray-200"></li>
                <li className="mb-2 h-4 w-1/2 rounded bg-gray-200"></li>
                <li className="mb-2 h-4 w-3/4 rounded bg-gray-200"></li>
              </ul>
              <div className="flex gap-2">
                <div className="mr-3 h-10 w-1/3 rounded bg-gray-200"></div>
                <div className="mr-3 h-10 w-1/3 rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="mt-4">
              <div className="card space-y-4 p-6">
                <div className="h-32 rounded bg-gray-200"></div>
                <div className="h-32 rounded bg-gray-200"></div>
                <div className="h-32 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
