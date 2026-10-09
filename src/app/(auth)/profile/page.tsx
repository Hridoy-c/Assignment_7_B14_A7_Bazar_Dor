"use client";

import {  useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, updateUser } from "@/lib/auth-client";
import ProfileSkeleton from "@/components/skeletonpage/ProfileSkeleton";
import Image from "next/image";


const inputClass =
  "mt-1.5 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-green-700 focus:ring-2 focus:ring-green-700/20 disabled:opacity-60";


const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);



  if (isPending || !session) return <ProfileSkeleton />;

  const { user } = session;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();

    if (!name) {
      setMessage({ type: "error", text: "নাম খালি রাখা যাবে না।" });
      return;
    }

    setSaving(true);
    const { error } = await updateUser({ name });
    setSaving(false);

    if (error) {
      setMessage({
        type: "error",
        text: error.message || "আপডেট করা যায়নি। আবার চেষ্টা করুন।",
      });
      return;
    }

    setMessage({ type: "success", text: "নাম সফলভাবে আপডেট হয়েছে।" });
    router.refresh();
  };

  

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-600">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

    
      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {user.image ? (
       
            <Image
              src={user.image}
              alt={user.name}
              width={80}
              height={80}
              className="h-20 w-20 shrink-0 rounded-2xl bg-gray-100 object-cover"
            />
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
        <h2 className="text-lg font-bold text-gray-900">তথ্য</h2>

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

          {message && (
            <p
              role={message.type === "error" ? "alert" : "status"}
              className={`rounded-lg border px-3 py-2 text-sm ${
                message.type === "error"
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-green-200 bg-green-50 text-green-700"
              }`}
            >
              {message.text}
            </p>
          )}

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