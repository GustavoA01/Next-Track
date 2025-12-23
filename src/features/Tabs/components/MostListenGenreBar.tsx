import { Progress } from "@/components/ui/progress";

type MostListenGenreBarProps = {
  name: string;
  value: number;
};

export const MostListenGenreBar = ({
  name,
  value,
}: MostListenGenreBarProps) => {
  return (
    <div className="space-y-2" data-testid="genre-bar">
      <div className="flex justify-between items-center max-sm:text-sm">
        <p className="font-montserrat">{name}</p>
        <p className="text-muted-foreground font-semibold">{value}%</p>
      </div>
      <Progress value={value} className="h-3" />
    </div>
  );
};
