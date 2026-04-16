import { Badge } from '@/components/ui/badge';
import { badgesText } from '@/data/constants';

type BadgesGroupProps = {
  onSelectBadge: (badge: string) => void;
};

export const BadgesGroup = ({ onSelectBadge }: BadgesGroupProps) => (
  <div className="flex select-none sm:flex-wrap max-sm:overflow-x-auto gap-2 hide-scrollbar">
    {badgesText.map((badgeText) => (
      <Badge
        key={badgeText}
        onClick={() => onSelectBadge(badgeText)}
        className="animate-fade-in-up-down sm:text-sm text-xs text-white/80 cursor-pointer bg-transparent border-gray-800 py-2 px-4 hover:bg-primary hover:text-background transition-all duration-200"
      >
        {badgeText}
      </Badge>
    ))}
  </div>
);
