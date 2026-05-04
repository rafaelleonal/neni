export default function Loading() {
  return (
    <main className="bg-td-bg min-h-dvh">
      <header className="border-b-td-line border-b">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 pt-5 pb-4 md:max-w-3xl md:px-8 lg:max-w-5xl lg:px-10">
          <div className="bg-td-line h-9 w-9 animate-pulse rounded-full" />
          <div className="flex-1">
            <div className="bg-td-line h-4 w-40 animate-pulse rounded" />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-md flex-col gap-5 px-5 pt-4 pb-10 md:max-w-3xl md:px-8 lg:grid lg:max-w-5xl lg:grid-cols-[1.2fr_1fr] lg:gap-6 lg:px-10 lg:pt-6">
        <div className="flex flex-col gap-5">
          <div>
            <div className="bg-td-line h-3 w-20 animate-pulse rounded" />
            <div className="bg-td-line mt-2 h-8 w-64 animate-pulse rounded md:h-9" />
            <div className="bg-td-line mt-2 h-4 w-72 animate-pulse rounded" />
          </div>

          <div className="border-td-line rounded-2xl border bg-white p-4">
            <div className="bg-td-line h-3 w-24 animate-pulse rounded" />
            <div className="mt-4 flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-td-line h-9 w-9 animate-pulse rounded-full" />
                  <div className="flex-1">
                    <div className="bg-td-line h-4 w-32 animate-pulse rounded" />
                    <div className="bg-td-line mt-2 h-3 w-20 animate-pulse rounded" />
                  </div>
                  <div className="bg-td-line h-4 w-12 animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border-td-line rounded-2xl border bg-white p-4">
            <div className="flex flex-col gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-td-line h-5 w-5 animate-pulse rounded-full" />
                  <div className="flex-1">
                    <div className="bg-td-line h-4 w-32 animate-pulse rounded" />
                    <div className="bg-td-line mt-2 h-3 w-44 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
