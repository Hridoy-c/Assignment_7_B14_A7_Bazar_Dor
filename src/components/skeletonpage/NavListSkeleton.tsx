const NavListSkeleton = () => {
  return (
    <ul
      className="flex w-max min-w-full animate-pulse items-center gap-5 py-2 sm:gap-8 lg:gap-12"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className="flex shrink-0 items-center gap-1.5">
          <span className="h-5 w-5 rounded-full bg-gray-200" />
          <span className="h-4 w-14 rounded bg-gray-200 sm:w-16" />
        </li>
      ))}
    </ul>
  );
};

export default NavListSkeleton;