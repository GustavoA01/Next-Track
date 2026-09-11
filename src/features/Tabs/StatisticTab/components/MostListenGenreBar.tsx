import { MostListenGenreBarProps } from '../types';

export const MostListenGenreBar = ({
  rank,
  name,
  count,
  maxCount,
}: MostListenGenreBarProps) => {
  const fillPercent = maxCount > 0 ? (count / maxCount) * 100 : 0;
  const artistLabel = count === 1 ? '1 artista' : `${count} artistas`;

  return (
    <li
      data-testid="genre-bar"
      className="animate-fade-in-up-down rounded-lg border border-border/40 bg-surface-hover/20 p-4 select-none"
    >
      <div className="mb-3 flex items-center gap-4">
        <span
          className="shrink-0 text-2xl font-semibold tabular-nums text-primary font-montserrat"
          style={{ textShadow: '0 0 10px rgba(29, 185, 84, 0.45)' }}
        >
          {rank}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold font-jakarta">{name}</p>
          <p className="text-sm text-muted-foreground">{artistLabel}</p>
        </div>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/20">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${fillPercent}%` }}
          data-testid="genre-bar-fill"
        />
      </div>
    </li>
  );
};
