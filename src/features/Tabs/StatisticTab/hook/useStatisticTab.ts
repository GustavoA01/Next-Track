import { SpotifyPlaylistTracks } from '@/data/types/spotify';
import { getMostAndLeastPopularTracks } from '@/utils/getMostAndLeastPopularTracks';
import { getPopularityAvgMessage } from '@/utils/getPopularityAvgMessage';
import { getTrackPopularity } from '@/utils/getTrackPopulartity';
import { extractColors } from 'extract-colors';
import { useCallback, useMemo } from 'react';

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const useStatisticTab = (tracks: SpotifyPlaylistTracks) => {
  const getHexaColor = useCallback(async (imageUrl: string) => {
    if (!imageUrl) return '#121212';

    try {
      const colors = await extractColors(imageUrl, {
        crossOrigin: 'anonymous',
      });
      return colors[0].hex;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const avgMessage = useMemo(
    () => getPopularityAvgMessage(tracks, tracks.total),
    [tracks]
  );

  const chartData = useMemo(() => getTrackPopularity(tracks), [tracks]);

  const { mostPopular, leastPopular } = useMemo(
    () => getMostAndLeastPopularTracks(tracks.items),
    [tracks.items]
  );

  const showLeastPopular = Boolean(
    leastPopular && mostPopular && leastPopular.id !== mostPopular.id
  );

  return {
    formatName,
    getHexaColor,
    avgMessage,
    chartData,
    mostPopular,
    leastPopular,
    showLeastPopular,
  };
};
