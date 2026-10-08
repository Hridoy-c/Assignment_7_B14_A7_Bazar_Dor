import Link from "next/link";

interface INavCategoryProps {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavList = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    { cache: "no-store" },
  );
  const data = await res.json();

  // If the API fails it may return an error object instead of a list
  if (!res.ok || !Array.isArray(data)) return null;

  return (
    <div>
      <ul className="flex w-max min-w-full items-center gap-5 whitespace-nowrap py-2 sm:gap-8 lg:gap-12">
        {data.map((item: INavCategoryProps) => (
          <li key={item.id} className="shrink-0">
            <Link 
              href={`/categories/${item.slug}`}
              className="flex items-center gap-1.5 text-sm text-gray-700 transition-colors hover:text-green-700 sm:text-base"
            >
              <span>{item.icon}</span>
              {item.nameBn}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavList;