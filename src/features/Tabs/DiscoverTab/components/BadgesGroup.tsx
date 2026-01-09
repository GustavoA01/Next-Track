import { Badge } from "@/components/ui/badge";

type BadgesGroupProps = {
  setSelectedBadge: (badge: string) => void;
};

const badgesText = [
  "Faça recomendações",
  "Recomendações do artista mais presente",
  "Recomendações do gênero mais presente",
];

export const BadgesGroup = ({ setSelectedBadge }: BadgesGroupProps) => (
  <div className="flex sm:flex-wrap max-sm:overflow-x-auto gap-2 hide-scrollbar">
    {badgesText.map((badgeText) => (
      <Badge
        key={badgeText}
        onClick={() => setSelectedBadge(badgeText)}
        className="animate-fade-in-up-down sm:text-sm text-xs text-white/80 cursor-pointer bg-transparent border-gray-800 p-2 hover:bg-primary hover:text-background transition-all duration-200"
      >
        {badgeText}
      </Badge>
    ))}
  </div>
);
