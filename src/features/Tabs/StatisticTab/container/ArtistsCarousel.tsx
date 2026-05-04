import { CarouselProps } from '../types';
import { ArtistCard } from '../components/ArtistCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useArtistCarousel } from '../hook/useArtistCarousel';

export const ArtistsCarousel = ({
  artistsStatistics,
  getHexaColor,
}: CarouselProps) => {
  const { paletteByArtistId } = useArtistCarousel({
    getHexaColor,
    artistsStatistics,
  });

  return (
    <>
      <section className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:hidden">
        {artistsStatistics.slice(0, 10).map((artist, index) => (
          <div key={artist.id} className="shrink-0">
            <ArtistCard
              index={index}
              artist={artist}
              palleteColor={paletteByArtistId[artist.id] || '#121212'}
            />
          </div>
        ))}
      </section>
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
