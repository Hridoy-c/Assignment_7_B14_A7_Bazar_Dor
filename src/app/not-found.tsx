import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[90vw] px-4 py-16 text-center">
      <p className="text-5xl">🛒</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        পেজটি পাওয়া যায়নি
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        আপনি যে পণ্য বা পেজ খুঁজছেন সেটি নেই অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-700/30 transition-colors hover:bg-green-800"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}