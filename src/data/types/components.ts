import { SpotifyPlaylist } from './spotify';

export type HeaderPlaylistInfoProps = {
  playlist: SpotifyPlaylist;
  timeText: string;
};

export type PlaylistHeaderProps = {
  playlist: SpotifyPlaylist;
  accessToken: string;
  totalDuration?: number;
};

export type PlaylistCardProps = {
  id: string;
  playlistName: string;
  playlistImage: string;
  totalTracks: number;
};

export type SearchCardsProps = {
  playlistsData: SpotifyPlaylist[];
};

export type ProvidersProps = { children: React.ReactNode };
