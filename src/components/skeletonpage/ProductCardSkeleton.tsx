const ProductCardSkeleton = () => {
  return (
    <div
      className="animate-pulse rounded-2xl border border-gray-200 bg-white/70 p-4"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <span className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />
        <div className="space-y-2">
          <span className="block h-4 w-28 rounded bg-gray-200" />
          <span className="block h-3 w-16 rounded bg-gray-200" />
        </div>
      </div>

      <span className="mt-4 block h-3 w-14 rounded bg-gray-200" />
      <div className="mt-2 flex items-center justify-between">
        <span className="h-6 w-24 rounded bg-gray-200" />
        <span className="h-6 w-14 rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;