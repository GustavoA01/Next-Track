import { mockTracks } from "@/globalTestsMocks";
import { getPlaylistStatistic } from "../getPlaylistStatistic";

const mockArtistsResponse = {
  artists: [
    {
      id: "artist1",
      name: "Mock Artist 1",
      genres: ["pop", "rock"],
      images: [{ url: "img1.jpg" }],
      external_urls: { spotify: "https://open.spotify.com/artist/artist1" },
    },
  ],
};

global.fetch = jest.fn();

describe("getPlaylistStatistic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns correct statistics value", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({ items: mockTracks.items }),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockArtistsResponse),
      });

    const result = await getPlaylistStatistic("token", "playlistId", 2);

    expect(result.artistsStatistics).toEqual([
      expect.objectContaining({
        id: "artist1",
        name: "Mock Artist 1",
        count: 2,
        image: "img1.jpg",
        spotifyUrl: "https://open.spotify.com/artist/artist1",
      }),
    ]);
    expect(result.genresStatistics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "pop" }),
        expect.objectContaining({ name: "rock" }),
      ]),
    );
    expect(result.tracks).toHaveLength(2);
    expect(result.totalDuration).toBe(410000);
  });
});
