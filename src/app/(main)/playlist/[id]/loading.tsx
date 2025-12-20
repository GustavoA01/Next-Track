import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-4 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-between mb-8">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      <Skeleton className="h-62.5 w-62.5 m-auto" />

      <div className="flex flex-col items-center mt-8 gap-4">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-36 h-10" />
      </div>

      <div className="flex flex-col mt-20 px-64">
        <div className="flex justify-center gap-2">
          <Skeleton className="w-24 h-6 mb-4" />
          <Skeleton className="w-24 h-6 mb-4" />
        </div>
        <Skeleton className="w-full h-62" />
      </div>
    </div>
  );
};

export default Loading;
