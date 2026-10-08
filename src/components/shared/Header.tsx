import Link from "next/link";
import Marquee from "react-fast-marquee";
import NavList from "./NavList";
import Marque from "./Marque";
import BanglaDate from "@/components/shared/BanglaDate";
import { Suspense } from "react";
import NavListSkeleton from "../skeletonpage/NavListSkeleton";
import MarqueSkeleton from "../skeletonpage/MarqueSkeleton";
import NavButtom from "./NavButtom";

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

         <NavButtom />
        </nav>
      </div>

      <div className="mx-auto max-w-[90vw] overflow-x-auto px-4 [scrollbar-width:none]">
        <Suspense fallback={<NavListSkeleton />}>
          <NavList />
        </Suspense>
      </div>

      <div className="overflow-hidden border-y border-gray-200">
        <Suspense fallback={<MarqueSkeleton/>}>
          <div className="py-3">
            <Marquee >
              <Marque />
            </Marquee>
          </div>
        </Suspense>
      </div>
    </header>
  );
}