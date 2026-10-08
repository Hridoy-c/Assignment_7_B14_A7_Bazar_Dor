import { Suspense } from "react";
import Hero from "@/components/homepage/Hero";
import TodaysRate from "@/components/homepage/TodaysRate";
import AllProducts from "@/components/homepage/AllProducts";
import TodaysRateSkeleton from "@/components/skeletonpage/SectionSkeleton";
import ProductCardSkeleton from "@/components/skeletonpage/ProductCardSkeleton";

const page = () => {
  return (
    <div className="mx-auto max-w-[90vw] px-4 py-6 sm:py-10">
      <Hero />

      <Suspense fallback={<TodaysRateSkeleton />}>
        <TodaysRate />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <AllProducts />
      </Suspense>
    </div>
  );
};

export default page;