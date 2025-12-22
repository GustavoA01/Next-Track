export interface SpotifyUserProfile {
  id: string;
  display_name: string;
  email: string;
  images: Image[];
  country: string;
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  product: string;
  type: string;
  uri: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Image[];
  public: boolean;
  collaborative: boolean;
  external_urls: { spotify: string };
  href: string;
  snapshot_id: string;
  type: string;
  uri: string;
  owner: {
    id: string;
    display_name: string;
    external_urls: { spotify: string };
    href: string;
    type: string;
    uri: string;
  };
  tracks: SpotifyPlaylistTracks;
}

export interface SpotifyPlaylistTracks {
  href: string;
  total: number;
  primary_color: string;
  items: {
    added_at: Date;
    track: SpotifyPlaylistTrack;
  }[];
}

export interface SpotifyPlaylistTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  preview_url: string;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  type: string;
  uri: string;
  popularity: number;
  track_number: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: Image[];
  popularity: number;
  followers: { href: string; total: number };
  external_urls: { spotify: string };
  href: string;
  type: string;
  uri: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  href: string;
  album_type: string;
  uri: string;
  images: Image[];
  release_date: string;
  total_tracks: number;
  artists: SpotifyArtist[];
  external_urls: { spotify: string };
}

export interface Image {
  url: string;
  height: number;
  width: number;
}
