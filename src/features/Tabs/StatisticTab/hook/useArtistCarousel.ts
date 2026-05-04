import { useEffect, useState } from 'react';
import { CarouselProps } from '../types';

export const useArtistCarousel = ({
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

  return { paletteByArtistId };
};
