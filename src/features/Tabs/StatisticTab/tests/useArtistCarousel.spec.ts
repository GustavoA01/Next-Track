import { act, renderHook, waitFor } from '@testing-library/react';
import { useArtistCarousel } from '../hook/useArtistCarousel';

const mockArtists = [
  {
    id: 'artist-1',
    name: 'Artist 1',
    count: 5,
    image: 'https://image-1.jpg',
    spotifyUrl: 'https://spotify.com/artist-1',
  },
  {
    id: 'artist-2',
    name: 'Artist 2',
    count: 3,
    image: 'https://image-2.jpg',
    spotifyUrl: 'https://spotify.com/artist-2',
  },
];

describe('useArtistCarousel', () => {
  it('should build palette map from artist images', async () => {
    const getHexaColor = jest
      .fn()
      .mockResolvedValueOnce('#ff0000')
      .mockResolvedValueOnce('#00ff00');

    const { result } = renderHook(() =>
      useArtistCarousel({
        artistsStatistics: mockArtists,
        getHexaColor,
      })
    );

    await waitFor(() => {
      expect(result.current.paletteByArtistId).toEqual({
        'artist-1': '#ff0000',
        'artist-2': '#00ff00',
      });
    });

    expect(getHexaColor).toHaveBeenCalledWith('https://image-1.jpg');
    expect(getHexaColor).toHaveBeenCalledWith('https://image-2.jpg');
  });

  it('should fallback to default color when getHexaColor returns falsy', async () => {
    const getHexaColor = jest.fn().mockResolvedValue(null);

    const { result } = renderHook(() =>
      useArtistCarousel({
        artistsStatistics: [mockArtists[0]],
        getHexaColor,
      })
    );

    await waitFor(() => {
      expect(result.current.paletteByArtistId).toEqual({
        'artist-1': '#121212',
      });
    });
  });

  it('should not update state after unmount', async () => {
    let resolveColor: (value: string) => void = () => {};
    const getHexaColor = jest.fn(
      () =>
        new Promise<string>((resolve) => {
          resolveColor = resolve;
        })
    );

    const { result, unmount } = renderHook(() =>
      useArtistCarousel({
        artistsStatistics: [mockArtists[0]],
        getHexaColor,
      })
    );

    unmount();

    await act(async () => {
      resolveColor('#abcdef');
      await Promise.resolve();
    });

    expect(result.current.paletteByArtistId).toEqual({});
  });
});
