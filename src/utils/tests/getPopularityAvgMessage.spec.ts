import { getPopularityAvgMessage } from '../getPopularityAvgMessage';
import { mockTracks } from '@/globalTestsMocks';

const tracksWithPopularity = (...popularities: number[]) => ({
  ...mockTracks,
  total: popularities.length,
  items: popularities.map((popularity) => ({
    ...mockTracks.items[0],
    track: { ...mockTracks.items[0].track, popularity },
  })),
});

const getMessage = (...popularities: number[]) =>
  getPopularityAvgMessage(
    tracksWithPopularity(...popularities),
    popularities.length
  );

describe('getPopularityAvgMessage', () => {
  it('returns underground when average is 0 or 30', () => {
    const message0 = getMessage(0, 0);
    const message30 = getMessage(30, 30);

    expect(message0.title).toBe('Underground');
    expect(message0.textColor).toBe('text-[#C084FC]');
    expect(message30.title).toBe('Underground');
    expect(message30.text).toBe(
      'Essa playlist é para quem foge do óbvio. A maioria das faixas aqui são tesouros escondidos que pouca gente conhece. Pura cultura de nicho!'
    );
  });

  it('returns balanced when average is 31 or 70', () => {
    const message31 = getMessage(31, 31);
    const message70 = getMessage(70, 70);

    expect(message31.title).toBe('Equilibrado');
    expect(message31.textColor).toBe('text-[#38BDF8]');
    expect(message70.title).toBe('Equilibrado');
    expect(message70.text).toBe(
      'Um equilíbrio perfeito! Você misturou grandes sucessos com faixas mais profundas e específicas.'
    );
  });

  it('returns mainstream when average is 71 or higher', () => {
    const message71 = getMessage(71, 71);
    const message100 = getMessage(100, 100);

    expect(message71.title).toBe('Mainstream');
    expect(message71.textColor).toBe('text-[#FACC15]');
    expect(message100.title).toBe('Mainstream');
    expect(message100.text).toBe(
      'Essa seleção é composta por músicas que furaram a bolha e conquistaram o mundo. É hit atrás de hit!'
    );
  });
});
