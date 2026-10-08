import ProductCardSkeleton from "./ProductCardSkeleton";

const CategorySkeleton = () => {
  return (
    <div className="mx-auto max-w-[90vw] px-4 py-6" aria-hidden="true">
      {/* ক্যাটাগরি হেডার কার্ড */}
      <div className="flex animate-pulse items-center gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5">
        <span className="h-12 w-12 rounded-xl bg-gray-200" />
        <div className="space-y-2">
          <span className="block h-6 w-32 rounded bg-gray-200" />
          <span className="block h-4 w-48 rounded bg-gray-200" />
        </div>
      </div>

      {/* সর্ট বক্স */}
      <div className="mt-6 flex animate-pulse justify-end rounded-2xl border border-gray-200 bg-white/70 p-4">
        <span className="h-8 w-44 rounded-lg bg-gray-200" />
      </div>

      {/* মোট পণ্যের লেখা */}
      <span className="mb-3 mt-4 block h-4 w-40 animate-pulse rounded bg-gray-200" />

      {/* কার্ড গ্রিড */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default CategorySkeleton;