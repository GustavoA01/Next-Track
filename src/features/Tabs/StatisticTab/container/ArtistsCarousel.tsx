import { CarouselProps } from '../types';
import { ArtistCard } from '../components/ArtistCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

export const ArtistsCarousel = ({
  artistsStatistics,
  getHexaColor,
}: CarouselProps) => {
  const [paletteByArtistId, setPaletteByArtistId] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    let mounted = true;
    const loadPaletteColors = async () => {
      const entries = await Promise.all(
        artistsStatistics
          .slice(0, 10)
          .map(async (artist) => [
            artist.id,
            (await getHexaColor(artist.image)) || '#121212',
          ])
      );

      if (mounted) setPaletteByArtistId(Object.fromEntries(entries));
    };

    loadPaletteColors();

    return () => {
      mounted = false;
    };
  }, [artistsStatistics, getHexaColor]);

  return (
    <>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:hidden">
        {artistsStatistics.slice(0, 10).map((artist, index) => (
          <div key={artist.id} className="shrink-0">
            <ArtistCard
              artist={artist}
              index={index}
              palleteColor={paletteByArtistId[artist.id] || '#121212'}
            />
          </div>
        ))}
      </div>
      <Carousel className="hidden md:block px-10" opts={{ align: 'start' }}>
        <CarouselContent>
          {artistsStatistics.slice(0, 10).map((artist, index) => (
            <CarouselItem key={artist.id} className="basis-1/5">
              <ArtistCard
                artist={artist}
                index={index}
                palleteColor={paletteByArtistId[artist.id] || '#121212'}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </>
  );
};
