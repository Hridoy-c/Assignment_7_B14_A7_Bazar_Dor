const ProductDetailsSkeleton = () => {
  return (
    <div
      className="mx-auto max-w-[90vw] animate-pulse space-y-6 px-4 py-6"
      aria-hidden="true"
    >
      {/* ব্রেডক্রাম্ব */}
      <div className="flex gap-2">
        <span className="h-4 w-10 rounded bg-gray-200" />
        <span className="h-4 w-16 rounded bg-gray-200" />
        <span className="h-4 w-24 rounded bg-gray-200" />
      </div>

      {/* হেডার কার্ড */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="h-20 w-20 shrink-0 rounded-xl bg-gray-200" />
          <div className="space-y-2">
            <span className="block h-8 w-48 rounded bg-gray-200" />
            <span className="block h-4 w-32 rounded bg-gray-200" />
            <span className="block h-4 w-56 rounded bg-gray-200" />
          </div>
        </div>
        <span className="h-28 w-36 rounded-xl bg-gray-200" />
      </div>

      {/* সারসংক্ষেপ + টেবিল */}
      <div className="rounded-2xl border border-gray-200 bg-white/70 p-5">
        <span className="mb-4 block h-6 w-36 rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="space-y-2 rounded-xl border border-gray-200 bg-white p-4"
            >
              <span className="block h-3 w-20 rounded bg-gray-200" />
              <span className="block h-7 w-28 rounded bg-gray-200" />
              <span className="block h-3 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <span className="mb-3 mt-8 block h-6 w-48 rounded bg-gray-200" />

        <div className="space-y-px overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="h-10 bg-gray-100" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-3">
              <span className="h-4 flex-1 rounded bg-gray-200" />
              <span className="h-4 flex-1 rounded bg-gray-200" />
              <span className="h-4 w-16 rounded bg-gray-200" />
              <span className="h-4 w-16 rounded bg-gray-200" />
              <span className="h-4 w-16 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;