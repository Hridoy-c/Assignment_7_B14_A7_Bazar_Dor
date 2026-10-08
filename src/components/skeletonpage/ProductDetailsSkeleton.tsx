const ProductDetailsSkeleton = () => {
  return (
    <div
      className="mx-auto max-w-[90vw] animate-pulse space-y-4 px-4 py-4 sm:space-y-6 sm:py-6"
      aria-hidden="true"
    >
      {/* ব্রেডক্রাম্ব */}
      <div className="flex gap-2">
        <span className="h-4 w-10 rounded bg-gray-200" />
        <span className="h-4 w-16 rounded bg-gray-200" />
        <span className="h-4 w-24 rounded bg-gray-200" />
      </div>

      {/* হেডার কার্ড */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/70 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="h-14 w-14 shrink-0 rounded-xl bg-gray-200 sm:h-20 sm:w-20" />
          <div className="space-y-2">
            <span className="block h-7 w-40 rounded bg-gray-200 sm:h-8 sm:w-48" />
            <span className="block h-4 w-28 rounded bg-gray-200 sm:w-32" />
            <span className="block h-4 w-44 rounded bg-gray-200 sm:w-56" />
          </div>
        </div>
        <span className="h-16 w-full rounded-xl bg-gray-200 md:h-28 md:w-36" />
      </div>

      {/* সারসংক্ষেপ + বাজার */}
      <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 sm:p-5">
        <span className="mb-3 block h-6 w-36 rounded bg-gray-200 sm:mb-4" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="space-y-2 rounded-xl border border-gray-200 bg-white p-3 sm:p-4"
            >
              <span className="block h-3 w-20 rounded bg-gray-200" />
              <span className="block h-7 w-28 rounded bg-gray-200" />
              <span className="block h-3 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <span className="mb-3 mt-6 block h-6 w-48 rounded bg-gray-200 sm:mt-8" />

        {/* মোবাইল: কার্ড স্কেলেটন */}
        <div className="space-y-3 md:hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 rounded-xl border border-gray-200 bg-white p-3"
            >
              <div className="flex justify-between">
                <div className="space-y-2">
                  <span className="block h-4 w-32 rounded bg-gray-200" />
                  <span className="block h-3 w-20 rounded bg-gray-200" />
                </div>
                <span className="h-8 w-16 rounded bg-gray-200" />
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2">
                <span className="h-8 w-20 rounded bg-gray-200" />
                <span className="h-8 w-20 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>

        {/* ট্যাবলেট/ডেস্কটপ: টেবিল স্কেলেটন */}
        <div className="hidden space-y-px overflow-hidden rounded-xl border border-gray-200 bg-white md:block">
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