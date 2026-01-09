jest.mock("next/headers", () => ({
  cookies: jest.fn().mockResolvedValue({
    get: (key: string) => {
      if (key === "spotifyAccessToken") return { value: "token" };
      if (key === "spotifyRefreshToken") return { value: "refresh" };
      return undefined;
    },
  }),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("searchTrack", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).fetch = jest.fn();
  });

  it("fetches tracks and returns a flattened items list", async () => {
    const { searchTrack } = await import("../searchTrack");
    const recommendations = [
      { song: "Track 1", artist: "Artist One" },
      { song: "Track 2", artist: "Artist Two" },
    ];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ tracks: { items: [{ id: "1" }] } }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ tracks: { items: [{ id: "2" }] } }),
      });

    const result = await searchTrack("token", recommendations);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toContain(
      "q=track%3ATrack%201%20artist%3AArtist%20One",
    );
    expect(
      (global.fetch as jest.Mock).mock.calls[0][1].headers.Authorization,
    ).toBe("Bearer token");
    expect(result).toEqual([{ id: "1" }, { id: "2" }]);
  });
});
