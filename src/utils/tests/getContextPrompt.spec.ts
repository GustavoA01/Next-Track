import { getContextPrompt } from "../getContextPrompt";
import { VibesType } from "@/data/types";
import { PlaylistStatisticsType } from "@/data/types/recommendations";

describe("getContextPrompt", () => {
  const baseStats: PlaylistStatisticsType = {
    artistsStatistics: [
      { id: "1", name: "Artista 1", count: 3, image: "", spotifyUrl: "" },
      { id: "2", name: "Artista 2", count: 2, image: "", spotifyUrl: "" },
    ],
    genresStatistics: [
      { name: "Pop", value: 10, percentage: 50 },
      { name: "Rock", value: 10, percentage: 70 },
    ],
    tracks: [
      {
        added_at: new Date(),
        track: {
          id: "t1",
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
            total_tracks: 1,
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
          popularity: 50,
          track_number: 1,
        },
      },
    ],
    totalDuration: 200000,
  };
  const baseVibes: VibesType = {
    emotionalVibe: 0.7,
    energyVibe: 0.3,
    instrumentalVibe: 0.5,
  };

  it("generates default prompt with correct values", () => {
    const prompt = getContextPrompt({
      ...baseStats,
      vibes: baseVibes,
      isVibesChanged: false,
    });
    expect(prompt).toContain("Você será usada na minha aplicação web");
    expect(prompt).not.toContain(
      "IMPORTANTE: O usuário definiu ajustes finos de energia",
    );
    expect(prompt).toContain("Artista 1: 3 músicas");
    expect(prompt).toContain("Pop: 50%");
    expect(prompt).toContain("Rock: 70%");
    expect(prompt).toContain("Nome:  Música 1, Album: Álbum 1");
  });

  it("includes vibe instructions when isVibesChanged is true", () => {
    const prompt = getContextPrompt({
      ...baseStats,
      vibes: baseVibes,
      isVibesChanged: true,
    });
    expect(prompt).toContain(
      "IMPORTANTE: O usuário definiu ajustes finos de energia",
    );
    expect(prompt).toContain("Nível de Energia: 0.3");
    expect(prompt).toContain("Humor (Valência): 0.7");
    expect(prompt).toContain("Foco em Voz/Instrumento: 0.5");
  });

  it("does not includes tracks if it is undefined", () => {
    const prompt = getContextPrompt({
      ...baseStats,
      tracks: undefined,
      vibes: baseVibes,
      isVibesChanged: false,
    });
    expect(prompt).toContain("Aqui a playlist completa:");
  });
});
