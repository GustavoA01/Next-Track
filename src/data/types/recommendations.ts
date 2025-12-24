import { SpotifyPlaylistTracks } from "./spotify";

export type PlaylistStatisticsType = {
  artistsStatistics: {
    id: string;
    name: string;
    count: number;
    image: string;
    spotifyUrl: string;
  }[];
  genresStatistics: { name: string; value: number; percentage: number }[];
  tracks?: SpotifyPlaylistTracks["items"];
};

export type AverageMessageType = {
  title: string;
  text: string;
  textColor: string;
};
