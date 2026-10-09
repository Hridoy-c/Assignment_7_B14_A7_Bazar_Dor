import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductsCard, { type IProduct } from "@/components/shared/ProductsCard";
import Sortselct from "@/components/shared/Sortselct";
import CategorySkeleton from "@/components/skeletonpage/CategorySkeleton";

type Product = IProduct & { category: string };

interface CategoryDetailsPageProps {
  params: Promise<{ categorieslug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

const sorters: Record<string, (a: Product, b: Product) => number> = {
  "price-asc": (a, b) => a.today - b.today,
  "price-desc": (a, b) => b.today - a.today,
  rise: (a, b) => b.change.pct - a.change.pct,
  fall: (a, b) => a.change.pct - b.change.pct,
};

const CategoryContent = async ({
  params,
  searchParams,
}: CategoryDetailsPageProps) => {
  const { categorieslug } = await params;
  const { sort } = await searchParams;

  const [categoryRes, productsRes] = await Promise.all([
    fetch(
      `https://api.api-store.workers.dev/api/bazardor/categories/${categorieslug}`,
      { cache: "no-store" },
    ),
    fetch("https://api.api-store.workers.dev/api/bazardor/products", {
      cache: "no-store",
    }),
  ]);

  if (!categoryRes.ok) notFound();
  if (!productsRes.ok) return null;

  const category = await categoryRes.json();
  const data = await productsRes.json();
  if (!Array.isArray(data)) return null;

  const items: Product[] = data.filter((p) => p.category === categorieslug);
  if (sort && sorters[sort]) items.sort(sorters[sort]);

  const count = items.length.toLocaleString("bn-BD");

  return (
    <div className="mx-auto max-w-[90vw] px-4 py-6">
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category.nameBn}</h1>
          <p className="text-sm text-gray-600">
            {count}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-4">
        <Sortselct />
      </div>

      <p className="mb-3 mt-4 text-sm text-gray-600">
        মোট {count}টি পণ্য দেখানো হচ্ছে
      </p>

      {items.length === 0 ? (
        <p className="py-10 text-center text-gray-600">
          এই ক্যাটাগরিতে কোনো পণ্য নেই।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductsCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryDetailsPage = (props: CategoryDetailsPageProps) => (
  <Suspense fallback={<CategorySkeleton />}>
    <CategoryContent {...props} />
  </Suspense>
);

export default CategoryDetailsPage;