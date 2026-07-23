import playlistFallbackImage from '@/assets/playlistFallback.svg';
import Image from 'next/image';
import Link from 'next/link';
import { PopularTrackCardProps } from '../types';

export const PopularTrackCard = ({ label, track }: PopularTrackCardProps) => (
  <Link
    target="_blank"
    href={track.external_urls.spotify}
    className="group block rounded-lg border border-border/40 bg-surface-hover/20 p-4 transition-colors hover:bg-surface-hover/40"
  >
    <div className="flex items-center gap-4">
      <Image
        width={80}
        height={80}
        alt={track.name}
        src={track.album.images[0]?.url ?? playlistFallbackImage}
        className="aspect-square rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
          {label}
        </p>
        <p className="font-semibold font-jakarta line-clamp-1">{track.name}</p>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {track.artists[0]?.name}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Popularidade: {track.popularity}
        </p>
      </div>
    </div>
  </Link>
);
