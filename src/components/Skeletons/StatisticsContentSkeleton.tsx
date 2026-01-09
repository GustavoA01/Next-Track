import { Skeleton } from "@/components/ui/skeleton";

export const StatisticsContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="mt-4">
        <Skeleton className="h-6 w-64 mb-3" />

        <div className="flex gap-2 overflow-x-auto md:grid sm:grid-cols-5 sm:overflow-hidden hide-scrollbar">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`artist-card-skeleton-${index}`}
              className="shrink-0 sm:w-auto"
            >
              <div className="rounded-xl overflow-hidden">
                <Skeleton className="w-55 h-55 sm:w-full sm:h-60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-6 w-72 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`genre-bar-skeleton-${index}`} className="space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-6 w-80 mb-4" />
        <Skeleton className="w-full h-56 rounded-lg" />
      </div>
    </div>
  );
};
