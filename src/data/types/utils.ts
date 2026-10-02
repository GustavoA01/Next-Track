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
  feedback: TrackFeedback;
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

export type SyncPlaylistTrackIdsResult = {
  syncedIds: Set<string>;
  pendingAddedIds: Set<string>;
};

export type TrackVote = {
  id: string;
  name: string;
  artist: string;
};

export type TrackFeedback = {
  likes: TrackVote[];
  dislikes: TrackVote[];
};