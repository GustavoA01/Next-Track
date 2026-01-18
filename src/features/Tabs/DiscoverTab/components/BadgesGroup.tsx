import { Badge } from "@/components/ui/badge";

type BadgesGroupProps = {
  onSelectBadge: (badge: string) => void;
};

const badgesText = [
  "Faça recomendações",
  "Recomendações do artista mais presente",
  "Recomendações do gênero mais presente",
  "Músicas fáceis de tocar no violão",
];

export const BadgesGroup = ({ onSelectBadge }: BadgesGroupProps) => (
  <div className="flex select-none sm:flex-wrap max-sm:overflow-x-auto gap-2 hide-scrollbar">
    {badgesText.map((badgeText) => (
      <Badge
        key={badgeText}
        onClick={() => onSelectBadge(badgeText)}
        className="animate-fade-in-up-down sm:text-sm text-xs text-white/80 cursor-pointer bg-transparent border-gray-800 p-2 hover:bg-primary hover:text-background transition-all duration-200"
      >
        {badgeText}
      </Badge>
    ))}
  </div>
);
