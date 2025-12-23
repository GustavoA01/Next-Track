import { getPopularityAvgMessage } from "../getPopularityAvgMessage";
import { mockTracks } from "@/globalTestsMocks";

describe("getPopularityAvgMessage", () => {
  it("returns mainstream message correctly if average > 65", () => {
    const message = getPopularityAvgMessage(mockTracks, 1);

    expect(message.title).toBe("Mainstream");
    expect(message.text).toBe(
      "Essa seleção é composta por músicas que furaram a bolha e conquistaram o mundo. É hit atrás de hit!",
    );
    expect(message.textColor).toBe("text-[#FACC15]");
  });

  it("returns balanced message if avg <= 65 and > 30", () => {
    const trackPopularity65 = {
      ...mockTracks,
      total: 2,
      items: [
        {
          ...mockTracks.items[0],
          track: { ...mockTracks.items[0].track, popularity: 62 },
        },
        {
          ...mockTracks.items[0],
          track: { ...mockTracks.items[0].track, popularity: 68 },
        },
      ],
    };

    const message65 = getPopularityAvgMessage(trackPopularity65, 2);

    expect(message65.title).toBe("Equilibrado");
    expect(message65.text).toBe(
      "Um equilíbrio perfeito! Você misturou grandes sucessos com faixas mais profundas e específicas.",
    );
    expect(message65.textColor).toBe("text-[#38BDF8]");

    const trackPopularity31 = {
      ...mockTracks,
      total: 2,
      items: [
        {
          ...mockTracks.items[0],
          track: { ...mockTracks.items[0].track, popularity: 35 },
        },
        {
          ...mockTracks.items[0],
          track: { ...mockTracks.items[0].track, popularity: 27 },
        },
      ],
    };

    const message31 = getPopularityAvgMessage(trackPopularity31, 2);

    expect(message31.title).toBe("Equilibrado");
    expect(message31.text).toBe(
      "Um equilíbrio perfeito! Você misturou grandes sucessos com faixas mais profundas e específicas.",
    );
    expect(message31.textColor).toBe("text-[#38BDF8]");
  });

  it("returns underground message if avg <= 30", () => {
    const trackPopularity30 = {
      ...mockTracks,
      total: 2,
      items: [
        {
          ...mockTracks.items[0],
          track: { ...mockTracks.items[0].track, popularity: 35 },
        },
        {
          ...mockTracks.items[0],
          track: { ...mockTracks.items[0].track, popularity: 25 },
        },
      ],
    };

    const message30 = getPopularityAvgMessage(trackPopularity30, 2);

    expect(message30.title).toBe("Underground");
    expect(message30.text).toBe(
      "Essa playlist é para quem foge do óbvio. A maioria das faixas aqui são tesouros escondidos que pouca gente conhece. Pura cultura de nicho!",
    );
    expect(message30.textColor).toBe("text-[#C084FC]");

    const trackPopularity0 = {
      ...mockTracks,
      total: 2,
      items: [
        {
          ...mockTracks.items[0],
          track: { ...mockTracks.items[0].track, popularity: 0 },
        },
        {
          ...mockTracks.items[0],
          track: { ...mockTracks.items[0].track, popularity: 0 },
        },
      ],
    };

    const message0 = getPopularityAvgMessage(trackPopularity0, 2);

    expect(message0.title).toBe("Underground");
    expect(message0.text).toBe(
      "Essa playlist é para quem foge do óbvio. A maioria das faixas aqui são tesouros escondidos que pouca gente conhece. Pura cultura de nicho!",
    );
    expect(message0.textColor).toBe("text-[#C084FC]");
  });
});
