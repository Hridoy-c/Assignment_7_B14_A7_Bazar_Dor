import Link from "next/link";

export interface IProduct {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
}

const units: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const price = (n: number) => n.toLocaleString("bn-BD");
const percent = (n: number) =>
  Math.abs(n).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const ProductsCard = ({ product: p }: { product: IProduct }) => {
  const up = p.change.dir === "up";

  return (
    <Link href={`/products/${p.id}`}>
    <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {p.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">{p.nameBn}</h3>
          <p className="text-xs text-gray-600">প্রতি {units[p.unit] ?? p.unit}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600">আজকের দাম</p>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-xl font-bold text-gray-900">
          {price(p.today)} <span className="text-sm font-normal">টাকা</span>
        </p>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            up ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
          }`}
        >
          {up ? "▲" : "▼"} {percent(p.change.pct)}%
        </span>
      </div>
    </div>
    </Link>
  );
};

export default ProductsCard;