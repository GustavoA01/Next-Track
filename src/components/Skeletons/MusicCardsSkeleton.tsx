import { Skeleton } from "@/components/ui/skeleton";

export const MusicCardsSkeleton = () => {
  return (
    <div className=" pt-4 flex flex-col gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-10 md:h-22" />
      ))}
    </div>
  );
};
