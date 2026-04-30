import { render, screen, waitFor } from '@testing-library/react';

const artistCardMock = jest.fn();

jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => (
    <section data-testid="artists-carousel">{children}</section>
  ),
  CarouselContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="artists-carousel-content">{children}</div>
  ),
  CarouselItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="artists-carousel-item">{children}</div>
  ),
  CarouselPrevious: () => <button type="button">Previous slide</button>,
  CarouselNext: () => <button type="button">Next slide</button>,
}));

jest.mock('../components/ArtistCard', () => ({
  ArtistCard: ({
    artist,
    index,
    palleteColor,
  }: {
    artist: { id: string; name: string };
    index: number;
    palleteColor: string;
  }) => {
    artistCardMock({ artist, index, palleteColor });

    return (
      <div data-testid="artist-card">
        {artist.name}-{index + 1}-{palleteColor}
      </div>
    );
  },
}));

import { ArtistsCarousel } from '../container/ArtistsCarousel';

const artistsStatistics = Array.from({ length: 12 }, (_, index) => ({
  id: `artist-${index + 1}`,
  name: `Artist ${index + 1}`,
  count: index + 1,
  image: `https://image/${index + 1}.jpg`,
  spotifyUrl: `https://spotify/${index + 1}`,
}));

describe('ArtistsCarousel', () => {
  beforeEach(() => {
    artistCardMock.mockClear();
  });

  it('renderiza apenas top 10 artistas, controles e atualiza paleta async', async () => {
    const getHexaColor = jest.fn(async (imageUrl: string) =>
      imageUrl.includes('/3.jpg') ? undefined : '#ff00aa'
    );

    render(
      <ArtistsCarousel
        artistsStatistics={artistsStatistics}
        getHexaColor={getHexaColor}
      />
    );

    expect(screen.getAllByTestId('artists-carousel-item')).toHaveLength(10);
    expect(screen.getAllByTestId('artist-card')).toHaveLength(20);
    expect(
      screen.getByRole('button', { name: /previous slide/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next slide/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Artist 10-10-#121212')).toHaveLength(2);
    expect(screen.queryByText(/Artist 11-11-/)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(getHexaColor).toHaveBeenCalledTimes(10);
    });

    expect(getHexaColor).toHaveBeenNthCalledWith(1, 'https://image/1.jpg');
    expect(getHexaColor).toHaveBeenNthCalledWith(10, 'https://image/10.jpg');

    await waitFor(() => {
      expect(screen.getAllByText('Artist 1-1-#ff00aa')).toHaveLength(2);
      expect(screen.getAllByText('Artist 3-3-#121212')).toHaveLength(2);
    });
  });
});
