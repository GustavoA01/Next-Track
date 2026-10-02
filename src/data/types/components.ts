import { SpotifyPlaylist, SpotifyUserProfile } from './spotify';

export type HeaderPlaylistInfoProps = {
  totalTracks: number;
  ownerName: string;
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
