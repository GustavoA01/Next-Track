import {
  AverageMessageType,
  PlaylistStatisticsType,
} from '@/data/types/recommendations';
import { SpotifyPlaylist } from '@/data/types/spotify';

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
