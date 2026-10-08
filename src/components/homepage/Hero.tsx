import Link from "next/link";
import BanglaDate from "@/components/shared/BanglaDate";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[90vw] px-4 py-6">
      <div className="flex flex-col-reverse items-center gap-6 overflow-hidden rounded-3xl border border-gray-200 bg-white/70 px-6 py-8 sm:flex-row sm:justify-between sm:px-10">
      
        <div className="w-full max-w-xl">
          <span className="inline-block min-h-6 min-w-44 rounded-full bg-green-100 px-3 py-1 text-center text-xs font-semibold text-green-700">
            <BanglaDate />
          </span>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-700/30 transition-colors hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

       
        <svg
          viewBox="0 0 240 230"
          className="h-36 w-auto shrink-0 sm:h-48 lg:mr-10 lg:h-60"
          aria-hidden="true"
        >
          
          <ellipse cx="120" cy="214" rx="112" ry="14" fill="#e5e7eb" />

         
          <circle cx="148" cy="58" r="36" fill="#22c55e" />
          <ellipse cx="135" cy="46" rx="6" ry="11" fill="#86efac" />
          <path
            d="M148 22 Q140 8 130 6 M148 22 Q158 8 168 6"
            fill="none"
            stroke="#15803d"
            strokeWidth="5"
            strokeLinecap="round"
          />

         
          <circle cx="80" cy="68" r="33" fill="#ef4444" />
          <ellipse cx="68" cy="58" rx="6" ry="11" fill="#fca5a5" />
          <path
            d="M88 36 Q92 24 104 22"
            fill="none"
            stroke="#15803d"
            strokeWidth="4"
            strokeLinecap="round"
          />

         
          <circle cx="120" cy="96" r="20" fill="#f97316" />

         
          <ellipse cx="42" cy="102" rx="22" ry="17" fill="#a855f7" />
          <path
            d="M48 86 Q52 76 62 74"
            fill="none"
            stroke="#15803d"
            strokeWidth="4"
            strokeLinecap="round"
          />

        
          <ellipse cx="202" cy="100" rx="22" ry="18" fill="#f59e0b" />
          <path
            d="M204 84 Q206 74 214 72"
            fill="none"
            stroke="#15803d"
            strokeWidth="4"
            strokeLinecap="round"
          />

          
          <path
            d="M34 128 L206 128 L194 196 Q192 208 180 208 L60 208 Q48 208 46 196 Z"
            fill="#b45309"
          />
          <rect x="26" y="112" width="188" height="20" fill="#92400e" />
          <g stroke="#7c2d12" strokeWidth="3" strokeLinecap="round">
            <line x1="58" y1="134" x2="62" y2="196" />
            <line x1="92" y1="134" x2="93" y2="202" />
            <line x1="127" y1="134" x2="127" y2="202" />
            <line x1="162" y1="134" x2="160" y2="198" />
          </g>
        </svg>
      </div>
    </section>
  );
}