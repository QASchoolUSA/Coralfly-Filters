export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[4/3] bg-surface" />
          <div className="mt-4 h-3 w-20 rounded bg-surface" />
          <div className="mt-2 h-4 w-3/4 rounded bg-surface" />
          <div className="mt-2 h-3 w-16 rounded bg-surface" />
        </div>
      ))}
    </div>
  );
}
