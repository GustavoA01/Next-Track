import { SpotifyPlaylistTracks } from "./data/types/spotify";

export type NextImgProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const resizeObserverMock = () => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
};

export const mockTracks: SpotifyPlaylistTracks = {
  href: "https://api.spotify.com/v1/playlists/test",
  primary_color: "#1db954",
  total: 3,
  items: [
    {
      added_at: new Date(),
      track: {
        id: "track1",
        name: "Mock Track 1",
        popularity: 66,
        duration_ms: 200000,
        track_number: 1,
        artists: [
          {
            id: "artist1",
            name: "Mock Artist 1",
            genres: ["pop", "rock"],
            images: [{ url: "img1.jpg", height: 640, width: 640 }],
            popularity: 75,
            followers: {
              href: "https://api.spotify.com/v1/artists/artist1/followers/test",
              total: 1000000,
            },
            type: "artist",
            uri: "spotify:artist:artist1",
            href: "https://api.spotify.com/v1/artists/artist1",
            external_urls: {
              spotify: "https://open.spotify.com/artist/artist1",
            },
          },
        ],
        album: {
          id: "album1",
          name: "Mock Album 1",
          album_type: "single",
          images: [
            {
              url: "https://mockimage.com/cover.jpg",
              height: 640,
              width: 640,
            },
          ],
          release_date: "2022-01-01",
          total_tracks: 10,
          uri: "spotify:album:album1",
          href: "https://api.spotify.com/v1/albums/album1",
          external_urls: { spotify: "https://open.spotify.com/album/album1" },
          artists: [
            {
              id: "artist1",
              name: "Mock Artist 1",
              genres: ["pop"],
              images: [],
              popularity: 75,
              followers: {
                href: "https://api.spotify.com/v1/artists/artist1/followers/test",
                total: 1000000,
              },
              type: "artist",
              uri: "spotify:artist:artist1",
              href: "https://api.spotify.com/v1/artists/artist1",
              external_urls: {
                spotify: "https://open.spotify.com/artist/artist1",
              },
            },
          ],
        },
        uri: "spotify:track:track1",
        href: "https://api.spotify.com/v1/tracks/track1",
        external_urls: { spotify: "https://open.spotify.com/track/track1" },
        preview_url: "https://mockpreview.com/track1.mp3/test",
        explicit: false,
        type: "track",
      },
    },
    {
      added_at: new Date(),
      track: {
        id: "track2",
        name: "Mock Track 2",
        popularity: 70,
        duration_ms: 210000,
        track_number: 2,
        artists: [
          {
            id: "artist1",
            name: "Mock Artist 1",
            genres: ["pop", "rock"],
            images: [{ url: "img1.jpg", height: 640, width: 640 }],
            popularity: 75,
            followers: {
              href: "https://api.spotify.com/v1/artists/artist1/followers/test",
              total: 1000000,
            },
            type: "artist",
            uri: "spotify:artist:artist1",
            href: "https://api.spotify.com/v1/artists/artist1",
            external_urls: {
              spotify: "https://open.spotify.com/artist/artist1",
            },
          },
        ],
        album: {
          id: "album2",
          name: "Mock Album 2",
          album_type: "album",
          images: [
            {
              url: "https://mockimage.com/cover2.jpg",
              height: 640,
              width: 640,
            },
          ],
          release_date: "2022-02-01",
          total_tracks: 12,
          uri: "spotify:album:album2",
          href: "https://api.spotify.com/v1/albums/album2",
          external_urls: { spotify: "https://open.spotify.com/album/album2" },
          artists: [
            {
              id: "artist1",
              name: "Mock Artist 1",
              genres: ["pop"],
              images: [],
              popularity: 75,
              followers: {
                href: "https://api.spotify.com/v1/artists/artist1/followers/test",
                total: 1000000,
              },
              type: "artist",
              uri: "spotify:artist:artist1",
              href: "https://api.spotify.com/v1/artists/artist1",
              external_urls: {
                spotify: "https://open.spotify.com/artist/artist1",
              },
            },
          ],
        },
        uri: "spotify:track:track2",
        href: "https://api.spotify.com/v1/tracks/track2",
        external_urls: { spotify: "https://open.spotify.com/track/track2" },
        preview_url: "https://mockpreview.com/track2.mp3/test",
        explicit: false,
        type: "track",
      },
    },
  ],
};
