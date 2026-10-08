import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProductDetail {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  category: string;
  categoryNameBn: string;
  today: number;
  yesterday: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: IMarket[];
}

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

const units: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const trend = {
  up: { icon: "▲", color: "text-red-600", text: "বেড়েছে" },
  down: { icon: "▼", color: "text-green-600", text: "কমেছে" },
  flat: { icon: "-", color: "text-gray-500", text: "অপরিবর্তিত" },
};

const bn = (n: number) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: 2 });

const ProductContent = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
    { cache: "no-store" },
  );
  if (!res.ok) notFound();

  const json = await res.json();
  const product: IProductDetail | undefined = json.data ?? json;
  if (!product?.nameBn) notFound();

  const { markets = [], today, yesterday, change } = product;
  const unit = units[product.unit] ?? product.unit;
  const t = trend[change.dir];

  const lowest = markets.length
    ? markets.reduce((a, b) => (b.min < a.min ? b : a))
    : null;
  const highest = markets.length
    ? markets.reduce((a, b) => (b.max > a.max ? b : a))
    : null;
  const average = markets.length
    ? markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
    : today;

  const stats = [
    {
      label: "সর্বনিম্ন দাম",
      value: lowest?.min,
      note: lowest?.market ?? "-",
      color: "text-green-600",
    },
    {
      label: "সর্বাধিক দাম",
      value: highest?.max,
      note: highest?.market ?? "-",
      color: "text-red-600",
    },
    {
      label: "গড় দাম",
      value: average,
      note: `প্রতি ${unit}-এর হিসাবে`,
      color: "text-gray-900",
    },
  ];

  return (
    <div className="mx-auto max-w-[90vw] space-y-6 px-4 py-6">
     
      <nav className="text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>{" "}
        ›{" "}
        <Link
          href={`/categories/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>{" "}
        › <span className="text-gray-900">{product.nameBn}</span>
      </nav>

  
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-4xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-600">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              গতকালের তুলনায় আজ দাম <b>{t.text}</b> ·{" "}
              {bn(Math.abs(today - yesterday))} টাকা
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-100 px-6 py-4 text-center">
          <p className="text-sm text-gray-600">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-900">{bn(today)}</p>
          <p className="text-sm text-gray-600">টাকা / {unit}</p>
          <p className={`text-sm font-semibold ${t.color}`}>
            {t.icon} {bn(Math.abs(change.pct))}%
          </p>
        </div>
      </section>

    
      <section className="rounded-2xl border border-gray-200 bg-white/70 p-5">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <p className="text-xs text-gray-600">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.color}`}>
                {s.value !== undefined ? bn(s.value) : "-"}{" "}
                <span className="text-sm font-normal">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-gray-600">{s.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length === 0 ? (
          <p className="text-sm text-gray-600">কোনো বাজারের তথ্য নেই।</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-3 text-left font-medium">বাজার</th>
                  <th className="p-3 text-left font-medium">বিভাগ</th>
                  <th className="p-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="p-3 text-right font-medium">সর্বাধিক</th>
                  <th className="p-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {[...markets]
                  .sort((a, b) => a.min + a.max - (b.min + b.max))
                  .map((m) => (
                    <tr
                      key={`${m.market}-${m.division}`}
                      className="border-t border-gray-100 even:bg-gray-50"
                    >
                      <td className="p-3 text-gray-900">{m.market}</td>
                      <td className="p-3 text-gray-600">{m.division}</td>
                      <td className="p-3 text-right">{bn(m.min)} টাকা</td>
                      <td className="p-3 text-right">{bn(m.max)} টাকা</td>
                      <td className="p-3 text-right font-bold text-gray-900">
                        {bn((m.min + m.max) / 2)} টাকা
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

const ProductDetailsPage = (props: ProductPageProps) => (
  <Suspense
    fallback={<p className="mx-auto max-w-[90vw] px-4 py-6">লোড হচ্ছে...</p>}
  >
    <ProductContent {...props} />
  </Suspense>
);

export default ProductDetailsPage;