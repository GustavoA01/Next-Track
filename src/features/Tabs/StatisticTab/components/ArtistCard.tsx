import playlistFallbackImage from '@/assets/playlistFallback.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArtistCardProps } from '../types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export const ArtistCard = ({
  artist,
  index,
  palleteColor,
}: ArtistCardProps) => {
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  return (
    <div className="relative min-w-37.5 min-h-37.5 sm:w-full">
      {!hasImageLoaded && (
        <Skeleton
          data-testid="artist-card-skeleton"
          className="absolute inset-0 z-10 min-h-37.5 rounded-lg"
        />
      )}

      <Link
        target="_blank"
        href={artist.spotifyUrl}
        className={cn(
          'group block',
          hasImageLoaded ? 'animate-slide-in-down' : 'opacity-0'
        )}
        style={
          hasImageLoaded ? { animationDelay: `${index * 0.1}s` } : undefined
        }
      >
        <div className="relative overflow-hidden rounded-lg min-w-37.5 min-h-37.5 sm:w-full md:h-auto bg-surface">
          <p
            style={{
              color: palleteColor,
              textShadow: `0 0 10px ${palleteColor}`,
            }}
            data-testid="artist-counter"
            className="absolute z-10 left-5 top-2 text-lg sm:text-xl font-semibold "
          >
            {index + 1}
          </p>

          <Image
            src={artist.image ?? playlistFallbackImage}
            width={150}
            height={150}
            alt={artist.name}
            onLoad={() => setHasImageLoaded(true)}
            onError={() => setHasImageLoaded(true)}
            className="group-hover:scale-110 aspect-square transition-all duration-300 rounded-lg md:w-full md:h-auto object-cover"
          />
          <div
            style={{
              background: `linear-gradient(to top, ${palleteColor} 60%, transparent 100%)`,
            }}
            data-testid="header-bg-color"
            className="w-full h-15 absolute bottom-1.5 rounded-b-lg flex items-center justify-center"
          ></div>

          <footer className="flex items-center justify-center w-full h-12 backdrop-blur-md absolute bottom-0 rounded-b-lg">
            <div className="text-center">
              <p className="text-white max-sm:text-sm font-semibold font-jakarta line-clamp-1">
                {artist.name}
              </p>
              <p className="text-white text-xs">{artist.count} músicas</p>
            </div>
          </footer>
        </div>
      </Link>
    </div>
  );
};
