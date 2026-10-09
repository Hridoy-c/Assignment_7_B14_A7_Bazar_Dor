const ProfileSkeleton = () => (
  <div
    className="mx-auto w-full max-w-3xl animate-pulse px-4 py-6"
    aria-hidden="true"
  >
    <span className="block h-8 w-44 rounded bg-gray-200" />
    <span className="mt-2 block h-4 w-64 rounded bg-gray-200" />

    <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/70 p-5">
      <div className="flex items-center gap-4">
        <span className="h-20 w-20 rounded-2xl bg-gray-200" />
        <div className="space-y-2">
          <span className="block h-6 w-40 rounded bg-gray-200" />
          <span className="block h-4 w-52 rounded bg-gray-200" />
        </div>
      </div>
      <span className="h-10 w-28 rounded-lg bg-gray-200" />
    </div>

    <div className="mt-6 space-y-4 rounded-2xl border border-gray-200 bg-white/70 p-5">
      <span className="block h-5 w-16 rounded bg-gray-200" />
      <span className="block h-10 rounded-lg bg-gray-200" />
      <span className="block h-10 rounded-lg bg-gray-200" />
    </div>
  </div>
);


export default ProfileSkeleton