import Link from "next/link";

const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-green-700 focus:ring-2 focus:ring-green-700/20";

const socialClass =
  "flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50";

export default function SignUpPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-5 sm:p-6">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              নাম
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="যেমন: রহিম উদ্দিন"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-900">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-900">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirm" className="text-sm font-medium text-gray-900">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              placeholder="আবার লিখুন"
              className={inputClass}
            />
          </div>

          {/* UI only: switch to type="submit" when you add the submit logic */}
          <button
            type="button"
            className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-700/30 transition-colors hover:bg-green-800"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-gray-700">
          <span className="h-px flex-1 bg-gray-200" />
          অথবা
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button type="button" className={socialClass}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button type="button" className={socialClass}>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-900">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="text-green-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}