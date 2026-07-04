import { SpotifyPlaylist, SpotifyUserProfile } from './spotify';

export type HeaderPlaylistInfoProps = {
  playlist: SpotifyPlaylist;
  timeText: string;
};

export type PlaylistHeaderProps = {
  playlist: SpotifyPlaylist;
  profile: SpotifyUserProfile;
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
