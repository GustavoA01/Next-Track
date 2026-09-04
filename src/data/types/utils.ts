import { VibesType } from '.';
import { PlaylistStatisticsType } from './recommendations';
import { SpotifyPlaylistTrack } from './spotify';

export type msFormatterReturnType = {
  hours: number;
  minutes: number;
  seconds: string;
};

export type getPopularityReturnType = {
  popularity: number;
  count: number;
}[];

export type getContextPromptProps = PlaylistStatisticsType & {
  vibes: VibesType;
  isVibesChanged: boolean;
};

export type AverageMessageType = {
  title: string;
  text: string;
  textColor: string;
};

export type MostAndLeastPopularTracksReturnType = {
  mostPopular: SpotifyPlaylistTrack | null;
  leastPopular: SpotifyPlaylistTrack | null;
};
