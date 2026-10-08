import ProductsCard, { type IProduct } from "@/components/shared/ProductsCard";

function Section({
  title,
  up,
  items,
}: {
  title: string;
  up: boolean;
  items: IProduct[];
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
        <span className={`text-sm ${up ? "text-red-600" : "text-green-600"}`}>
          {up ? "▲" : "▼"}
        </span>
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductsCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

const TodaysRate = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );
  const data = await res.json();

  if (!res.ok || !Array.isArray(data)) return null;

  const products: IProduct[] = data;

 
  const rose = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fell = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-[90vw] px-4 pb-10">
      <Section title="আজ দাম বেড়েছে" up items={rose} />
      <Section title="আজ দাম কমেছে" up={false} items={fell} />
    </div>
  );
};

export default TodaysRate;
