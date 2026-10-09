import Link from "next/link";

interface IProduct {
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

const change = {
  up: { icon: "▲", color: "text-red-600" },
  down: { icon: "▼", color: "text-green-600" },
  flat: { icon: "-", color: "text-gray-500" },
};

const Marque = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  if (!res.ok) return null;

  const data: IProduct[] = await res.json();
  if (!Array.isArray(data)) return null;

  return (
    <div className="flex gap-8 overflow-hidden text-sm">
      {data.map((p) => (
        <Link
          href={`/products/${p.id}`}
          key={p.id}
          className="flex gap-2 whitespace-nowrap"
        >
          {p.image} <b>{p.nameBn}</b>
          {p.today.toLocaleString("bn-BD")} টাকা/{units[p.unit] ?? p.unit}
          <b className={change[p.change.dir].color}>
            {change[p.change.dir].icon}{" "}
            {Math.abs(p.change.pct).toLocaleString("bn-BD")}%
          </b>
        </Link>
      ))}
    </div>
  );
};

export default Marque;
