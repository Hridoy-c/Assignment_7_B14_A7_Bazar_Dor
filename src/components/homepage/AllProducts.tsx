import ProductsCard, { type IProduct } from "@/components/shared/ProductsCard";

const AllProducts = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );
  const data = await res.json();

  if (!res.ok || !Array.isArray(data)) return null;

  const products: IProduct[] = data;

  return (
    <div className="mx-auto max-w-[90vw] px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">সব পণ্য</h1>
      <p className="mt-2 mb-6 text-sm text-gray-600">
        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductsCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;