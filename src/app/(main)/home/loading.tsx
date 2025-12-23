import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 p-4 container mx-auto sm:px-8">
      <div className="flex justify-between">
        <Skeleton className="w-30 h-10" />
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="lg:w-70 w-full h-8 md:h-5" />
        <Skeleton className="md:w-70 w-full h-10" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 pb-16">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-62.5" />
        ))}
      </div>
    </div>
  );
};

export default Loading;
