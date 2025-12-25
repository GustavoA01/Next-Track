import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="pb-8 h-screen overflow-y-auto overflow-x-hidden custom-scrollbar hide-scrollbar">
      <div className="py-4">
        <div className="flex justify-between mb-10 items-center px-4 container mx-auto sm:px-8">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <div className="flex flex-col px-4 sm:px-8 sm:flex-row max-sm:items-center items-end justify-center gap-4">
          <Skeleton className="rounded-lg aspect-square w-[250px] h-[250px] lg:w-[23%]" />

          <div className="flex flex-col max-sm:items-center max-w-2xl">
            <Skeleton className="w-24 h-5 mb-2" />
            <Skeleton className="w-[280px] h-6 mb-2" />
            <Skeleton className="w-[320px] h-12 sm:h-14 md:h-16" />
          </div>
        </div>
      </div>

      <div className="mt-10 px-4 container mx-auto sm:px-8 flex flex-col items-center">
        <div className="flex gap-2 container mx-auto">
          <Skeleton className="w-full h-6 mb-4" />
          <Skeleton className="w-full h-6 mb-4" />
        </div>
        <Skeleton className="w-full h-62 container mx-auto" />
      </div>
    </div>
  );
};

export default Loading;
