import { Skeleton } from "@/components/ui/skeleton";

export function DiscoverContentSkeleton() {
  return (
    <div className=" pt-4 flex flex-col gap-6">
      {/* <Skeleton className="h-10 w-full bg-transparent text-lg font-semibold">Encontrando músicas...</Skeleton>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-full rounded-full" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </div>

      <Card className="p-4 space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`vibe-skeleton-${index}`} className="space-y-2">
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </Card> */}
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-10 md:h-22" />
      ))}
    </div>
  );
}
