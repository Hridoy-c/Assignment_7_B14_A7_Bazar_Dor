"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import ProfileSkeleton from "@/components/skeletonpage/ProfileSkeleton";
import Image from "next/image";
import { toast } from "react-toastify";

const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-green-700 focus:ring-2 focus:ring-green-700/20 disabled:opacity-60";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [saving, setSaving] = useState(false);

  if (isPending || !session) return <ProfileSkeleton />;

  const { user } = session;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();

    if (!name) {
      toast.warn("নাম খালি রাখা যাবে না।");
      return;
    }

    setSaving(true);
    const { error } = await updateUser({ name });
    setSaving(false);

    if (error) {
      toast.error(error.message || "আপডেট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    // 🌟 সফল আপডেটের পর স্টেট মেসেজের পরিবর্তে আধুনিক টোস্ট নোটিফিকেশন
    toast.success("নাম সফলভাবে আপডেট হয়েছে।");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 font-bangla">
      <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-600">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {user.image ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ) : (
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-3xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="truncate text-sm text-gray-600 sm:text-base">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 14 4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
          </svg>
          সাইন আউট
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-5">
        <h2 className="text-lg font-bold text-gray-900">তথ্য আপডেট করুন</h2>

        <form onSubmit={handleUpdate} className="mt-4 space-y-4 px-0 sm:px-3">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={user.name}
              disabled={saving}
              autoComplete="name"
              placeholder="আপনার নাম লিখুন"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-700/30 transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "অপেক্ষা করুন..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
