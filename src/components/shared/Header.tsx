import Link from "next/link";
import Marquee from "react-fast-marquee";
import NavList from "./NavList";
import Marque from "./Marque";
import BanglaDate from "@/components/shared/BanglaDate";
import { Suspense } from "react";

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="border-b border-gray-200">
        <nav className="mx-auto flex h-16 w-full items-center justify-between gap-3 px-4 sm:max-w-[90vw]">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-700 text-lg text-white sm:h-10 sm:w-10 sm:text-xl">
              🛒
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-base font-bold sm:text-lg">
                বাজার দর
              </span>
              <span className="block min-h-4 truncate text-[11px] text-gray-600 sm:text-xs">
                <BanglaDate />
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold sm:gap-3">
            <Link
              href="/signin"
              aria-label="সাইন ইন"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-800 sm:h-auto sm:w-auto sm:border-0 sm:px-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 sm:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
              <span className="hidden sm:inline">সাইন ইন</span>
            </Link>

            <Link
              href="/signup"
              aria-label="সাইন আপ"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-700 text-white sm:h-auto sm:w-auto sm:rounded-xl sm:px-4 sm:py-2"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 sm:hidden"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
              <span className="hidden sm:inline">সাইন আপ</span>
            </Link>
          </div>
        </nav>
      </div>

      <div className="mx-auto max-w-[90vw] overflow-x-auto px-4 [scrollbar-width:none]">
        <Suspense fallback={<p>লোড হচ্ছে...</p>}>
          <NavList />
        </Suspense>
      </div>

      <div className="overflow-hidden border-y border-gray-200">
        <Suspense fallback={<p>লোড হচ্ছে...</p>}>
          <div className="py-3">
            <Marquee pauseOnHover>
              <Marque />
            </Marquee>
          </div>
        </Suspense>
      </div>
    </header>
  );
}