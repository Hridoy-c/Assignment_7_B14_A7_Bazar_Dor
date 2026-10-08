import ProductCardSkeleton from "./ProductCardSkeleton";

const SectionSkeleton = () => (
  <section className="mt-8">
    <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </section>
);

const TodaysRateSkeleton = () => {
  return (
    <div className="mx-auto max-w-[90vw] px-4 pb-10" aria-hidden="true">
      <SectionSkeleton />
      <SectionSkeleton />
    </div>
  );
};

export default TodaysRateSkeleton;