import {
  AverageMessageType,
  PlaylistStatisticsType,
} from '@/data/types/recommendations';
import { SpotifyPlaylist, SpotifyPlaylistTrack } from '@/data/types/spotify';

export type TabsMenuProps = PlaylistStatisticsType & {
  playlist: SpotifyPlaylist;
  accessToken: string;
  userId: string;
};

export type StatisticContentProps = PlaylistStatisticsType & {
  playlist: SpotifyPlaylist;
};

export type StatisticSubTitleProps = {
  text: string;
  className?: string;
};

export type PopularityChartProps = {
  avgMessage: AverageMessageType;
  chartData: { popularity: number }[];
  mostPopular?: SpotifyPlaylistTrack | null;
  leastPopular?: SpotifyPlaylistTrack | null;
  showLeastPopular: boolean;
};

export type PopularTrackCardProps = {
  label: string;
  track: SpotifyPlaylistTrack;
};

export type MostListenGenreBarProps = {
  name: string;
  value: number;
};

export type ArtistCardProps = {
  index: number;
  palleteColor: string;
  artist: {
    id: string;
    name: string;
    count: number;
    image: string;
    spotifyUrl: string;
  };
};

export type CarouselProps = {
  artistsStatistics: {
    id: string;
    name: string;
    count: number;
    image: string;
    spotifyUrl: string;
  }[];
  getHexaColor: (imageUrl: string) => Promise<string | undefined>;
};
