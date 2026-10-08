import Hero from "@/components/homepage/Hero";
import TodaysRate from "@/components/homepage/TodaysRate";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={
          <p className="mx-auto max-w-[90vw] px-4 py-6">লোড হচ্ছে...</p>
        }
      >
        <TodaysRate />
      </Suspense>
    </div>
  );
};

export default page;
