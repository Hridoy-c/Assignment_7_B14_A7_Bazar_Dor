import Hero from "@/components/homepage/Hero";
import TodaysRate from "@/components/homepage/TodaysRate";
import React, { Suspense } from "react";
import AllProducts from "@/components/homepage/AllProducts";

const page = () => {
  return (
    <div className="mx-auto max-w-[90vw] px-4 py-6 sm:py-10">
      <Hero />
      <Suspense
        fallback={
          <p className="mx-auto max-w-[90vw] px-4 py-6">লোড হচ্ছে...</p>
        }
      >
        <TodaysRate />
      </Suspense>
      <Suspense fallback={<p className="mx-auto max-w-[90vw] px-4 py-8">লোড হচ্ছে...</p>}>
      <AllProducts />
    </Suspense>
    </div>
  );
};

export default page;
