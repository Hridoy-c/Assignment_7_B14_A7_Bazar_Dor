import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailsSkeleton from "@/components/skeletonpage/ProductDetailsSkeleton";

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

  const sortedMarkets = [...markets].sort(
    (a, b) => a.min + a.max - (b.min + b.max),
  );

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
    <div className="mx-auto max-w-[90vw] space-y-4 px-4 py-4 sm:space-y-6 sm:py-6">
      {/* ব্রেডক্রাম্ব */}
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 sm:text-sm">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/categories/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-900">{product.nameBn}</span>
      </nav>

      {/* হেডার কার্ড */}
      <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/70 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl sm:h-20 sm:w-20 sm:text-4xl">
            {product.image}
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
              {product.nameBn}
            </h1>
            <p className="text-xs text-gray-600 sm:text-sm">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm">
              গতকালের তুলনায় আজ দাম <b>{t.text}</b> ·{" "}
              {bn(Math.abs(today - yesterday))} টাকা
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-100 px-4 py-3 md:block md:px-6 md:py-4 md:text-center">
          <div>
            <p className="text-xs text-gray-600 sm:text-sm">আজকের দাম</p>
            <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {bn(today)}{" "}
              <span className="text-xs font-normal text-gray-600 sm:text-sm md:block">
                টাকা / {unit}
              </span>
            </p>
          </div>
          <p className={`text-sm font-semibold ${t.color}`}>
            {t.icon} {bn(Math.abs(change.pct))}%
          </p>
        </div>
      </section>

      {/* সারসংক্ষেপ + বাজারভিত্তিক দাম */}
      <section className="rounded-2xl border border-gray-200 bg-white/70 p-4 sm:p-5">
        <h2 className="mb-3 text-base font-bold text-gray-900 sm:mb-4 sm:text-lg">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4"
            >
              <p className="text-xs text-gray-600">{s.label}</p>
              <p className={`mt-1 text-xl font-bold sm:text-2xl ${s.color}`}>
                {s.value !== undefined ? bn(s.value) : "-"}{" "}
                <span className="text-sm font-normal">টাকা</span>
              </p>
              <p className="mt-1 truncate text-xs text-gray-600">{s.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-base font-bold text-gray-900 sm:mt-8 sm:text-lg">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {markets.length === 0 ? (
          <p className="text-sm text-gray-600">কোনো বাজারের তথ্য নেই।</p>
        ) : (
          <>
            {/* মোবাইল: কার্ড লিস্ট */}
            <ul className="space-y-3 md:hidden">
              {sortedMarkets.map((m) => (
                <li
                  key={`${m.market}-${m.division}`}
                  className="rounded-xl border border-gray-200 bg-white p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-900">
                        {m.market}
                      </p>
                      <p className="text-xs text-gray-600">{m.division}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-gray-600">গড়</p>
                      <p className="font-bold text-gray-900">
                        {bn((m.min + m.max) / 2)} টাকা
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-2 text-sm">
                    <p className="text-gray-600">
                      সর্বনিম্ন{" "}
                      <span className="block font-medium text-green-600">
                        {bn(m.min)} টাকা
                      </span>
                    </p>
                    <p className="text-right text-gray-600">
                      সর্বাধিক{" "}
                      <span className="block font-medium text-red-600">
                        {bn(m.max)} টাকা
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* ট্যাবলেট/ডেস্কটপ: টেবিল */}
            <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white md:block">
              <table className="w-full text-sm">
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
                  {sortedMarkets.map((m) => (
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
          </>
        )}
      </section>
    </div>
  );
};

const ProductDetailsPage = (props: ProductPageProps) => (
  <Suspense fallback={<ProductDetailsSkeleton />}>
    <ProductContent {...props} />
  </Suspense>
);

export default ProductDetailsPage;