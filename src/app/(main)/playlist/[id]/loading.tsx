import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="px-4 container mx-auto sm:px-8 pt-4 pb-8 2xl:px-64 overflow-y-auto overflow-x-hidden">
      <header className="flex justify-between mb-8">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </header>

      <div className="flex flex-col sm:flex-row justify-center m-auto max-sm:items-center gap-6">
        <Skeleton className="h-62.5 w-62.5" />

        <div className="flex flex-col max-sm:items-center justify-end mt-8 gap-4">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-36 h-10" />
        </div>
      </div>

      <div className="flex flex-col mt-20 2xl:px-64">
        <div className="flex gap-2">
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
        </div>
        <Skeleton className="w-full h-62" />
      </div>
    </div>
  );
};

export default Loading;
