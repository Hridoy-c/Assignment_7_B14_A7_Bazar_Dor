'use client';
import { useSession, signOut } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const NavButton = () => {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ড্রপডাউন এর বাইরে ক্লিক করলে যাতে মেনুটা বন্ধ হয়ে যায়
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isPending) {
    return <div className="h-9 w-20 bg-gray-100 animate-pulse rounded-lg"></div>;
  }

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="font-bangla relative" ref={dropdownRef}>
      {session?.user ? (
        /* ================= 🌟 USER LOGGED IN UI ================= */
        <div className="flex flex-col items-end">
          {/* টপ প্রোফাইল ট্রিগার বাটন */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 rounded-full p-1 hover:bg-gray-50 transition-colors focus:outline-none"
          >
            {/* 🌟 ইমেজ হাইট ও উইডথ এবং অবজেক্ট ফিট ফিক্স করা হয়েছে */}
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200">
              <Image
                src={session.user.image || "https://unsplash.com"}
                alt={session.user.name || "User"}
                fill
                sizes="36px"
                priority
                className="object-cover"
              />
            </div>
            
            {/* 🌟 নামের অংশ থেকে .split সরিয়ে পুরো নাম দেখানো হয়েছে */}
            <span className="text-sm font-semibold text-gray-700 hidden sm:inline">
              {session.user.name}
            </span>
            
            <svg
              className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* ড্রপডাউন পপআপ কার্ড */}
          {isOpen && (
            <div className="absolute right-0 mt-12 w-64 z-50 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm font-bold text-gray-900">{session.user.name || "Rezwan Ahmed"}</p>
                <p className="text-xs text-gray-500 truncate mt-0.5">{session.user.email || "user@gmail.com"}</p>
              </div>

              <div className="mt-3 space-y-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 font-medium"
                >
                  <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  আমার প্রোফাইল
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 text-left"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  সাইন আউট
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= 🌟 USER LOGGED OUT UI ================= */
        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold sm:gap-3">
          <Link
            href="/sign-in"
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
            href="/sign-up"
            aria-label="সাইন আপ"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-700 text-white sm:h-auto sm:w-auto sm:rounded-xl sm:px-4 sm:py-2 transition-colors hover:bg-green-800"
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
      )}
    </div>
  );
};

export default NavButton;
