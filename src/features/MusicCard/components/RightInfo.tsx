import { Plus } from "lucide-react";

export const RightInfo = ({ duration }: { duration: string }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-muted-foreground">{duration}</p>
      <div className="group/add hover:bg-primary border border-primary transition-all duration-200 rounded-full p-2">
        <Plus className="md:w-6 md:h-6 w-4 h-4 text-white m-auto group-hover/add:text-black" />
      </div>
    </div>
  );
};
