const MarqueSkeleton = () => {
  return (
    <div
      className="flex animate-pulse gap-8 overflow-hidden px-4 text-sm"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex shrink-0 items-center gap-2">
          <span className="h-5 w-5 rounded-full bg-gray-200" />
          <span className="h-4 w-20 rounded bg-gray-200" />
          <span className="h-4 w-24 rounded bg-gray-200" />
          <span className="h-4 w-10 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
};

export default MarqueSkeleton;