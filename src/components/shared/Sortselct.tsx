"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
      <label htmlFor="sort">সাজান</label>
      <select
        id="sort"
        value={params.get("sort") ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          router.push(value ? `${pathname}?sort=${value}` : pathname);
        }}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-900"
      >
        <option value="">ডিফল্ট</option>
        <option value="price-asc">দাম কম থেকে বেশি</option>
        <option value="price-desc">দাম বেশি থেকে কম</option>
        <option value="rise">বেশি বেড়েছে</option>
        <option value="fall">বেশি কমেছে</option>
      </select>
    </div>
  );
}