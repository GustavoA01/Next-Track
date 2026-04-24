import {
  AverageMessageType,
  PlaylistStatisticsType,
} from '@/data/types/recommendations';
import { SpotifyPlaylist } from '@/data/types/spotify';

export type StatisticContentProps = PlaylistStatisticsType & {
  playlist: SpotifyPlaylist;
};

export type StatisticSubTitleProps = {
  className?: string;
  text: string;
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
