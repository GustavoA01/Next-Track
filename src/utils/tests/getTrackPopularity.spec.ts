import { SpotifyPlaylistTracks } from "@/data/types/spotify";
import { getTrackPopularity } from "../getTrackPopulartity";

export const mockTracks: SpotifyPlaylistTracks = {
  href: "https://api.spotify.com/v1/playlists/1/tracks",
  total: 4,
  primary_color: "#000000",
  items: [
    {
      added_at: new Date(),
      track: {
        id: "1",
        name: "Música 1",
        artists: [],
        album: {
          id: "a1",
          name: "Álbum 1",
          href: "",
          album_type: "",
          uri: "",
          images: [],
          release_date: "",
          total_tracks: 0,
          artists: [],
          external_urls: { spotify: "" },
        },
        duration_ms: 200000,
        preview_url: "",
        explicit: false,
        external_urls: { spotify: "" },
        href: "",
        type: "",
        uri: "",
        popularity: 80,
        track_number: 1,
      },
    },
    {
      added_at: new Date(),
      track: {
        id: "2",
        name: "Música 2",
        artists: [],
        album: {
          id: "a2",
          name: "Álbum 2",
          href: "",
          album_type: "",
          uri: "",
          images: [],
          release_date: "",
          total_tracks: 0,
          artists: [],
          external_urls: { spotify: "" },
        },
        duration_ms: 180000,
        preview_url: "",
        explicit: false,
        external_urls: { spotify: "" },
        href: "",
        type: "",
        uri: "",
        popularity: 60,
        track_number: 2,
      },
    },
    {
      added_at: new Date(),
      track: {
        id: "2",
        name: "Música 3",
        artists: [],
        album: {
          id: "a2",
          name: "Álbum 2",
          href: "",
          album_type: "",
          uri: "",
          images: [],
          release_date: "",
          total_tracks: 0,
          artists: [],
          external_urls: { spotify: "" },
        },
        duration_ms: 180000,
        preview_url: "",
        explicit: false,
        external_urls: { spotify: "" },
        href: "",
        type: "",
        uri: "",
        popularity: 60,
        track_number: 2,
      },
    },
    {
      added_at: new Date(),
      track: {
        id: "4",
        name: "Música 4",
        artists: [],
        album: {
          id: "a2",
          name: "Álbum 2",
          href: "",
          album_type: "",
          uri: "",
          images: [],
          release_date: "",
          total_tracks: 0,
          artists: [],
          external_urls: { spotify: "" },
        },
        duration_ms: 180000,
        preview_url: "",
        explicit: false,
        external_urls: { spotify: "" },
        href: "",
        type: "",
        uri: "",
        popularity: 60,
        track_number: 2,
      },
    },
  ],
};

describe("getTrackPopularity", () => {
  it("returns the expected result", () => {
    const result = getTrackPopularity(mockTracks);

    const expectedResult = [
      {
        popularity: 60,
        count: 3,
      },
      {
        popularity: 80,
        count: 1,
      },
    ];

    expect(result).toMatchObject(expectedResult);
  });
});
