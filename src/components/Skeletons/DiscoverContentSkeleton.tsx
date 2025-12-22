import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function DiscoverContentSkeleton() {
  return (
    <div className="sm:px-8 pt-4 flex flex-col gap-6">
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
      </Card>
    </div>
  );
}
