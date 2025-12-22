import { SpotifyPlaylistTracks } from "./spotify";

export type PlaylistStatistics = {
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

export type AverageMessage = {
  title: string;
  text: string;
  textColor: string;
};
