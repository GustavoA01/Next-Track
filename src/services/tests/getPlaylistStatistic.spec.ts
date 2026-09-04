import { mockTracks } from '@/globalTestsMocks';
import { getPlaylistStatistic } from '../spotify/getPlaylistStatistic';
import { getArtistsStatistics } from '../spotify/getArtistsStatistics';
import { getTracksStatistics } from '../spotify/getTracksStatistics';

jest.mock('../spotify/getTracksStatistics', () => ({
  getTracksStatistics: jest.fn(),
}));

jest.mock('../spotify/getArtistsStatistics', () => ({
  getArtistsStatistics: jest.fn(),
}));

const mockGetTracksStatistics = getTracksStatistics as jest.Mock;
const mockGetArtistsStatistics = getArtistsStatistics as jest.Mock;

describe('getPlaylistStatistic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('aggregates artist counts, genres and sorts by count', async () => {
    mockGetTracksStatistics.mockResolvedValue({
      tracks: mockTracks.items,
      totalDuration: 410000,
    });
    mockGetArtistsStatistics.mockResolvedValue([
      {
        id: 'artist1',
        name: 'Mock Artist 1',
        genres: ['pop', 'rock'],
        images: [{ url: 'img1.jpg' }],
        external_urls: { spotify: 'https://open.spotify.com/artist/artist1' },
      },
    ]);

    const result = await getPlaylistStatistic('token', 'playlistId', 2);

    expect(getTracksStatistics).toHaveBeenCalledWith('playlistId', 'token', 2);
    expect(getArtistsStatistics).toHaveBeenCalledWith(['artist1'], 'token');
    expect(result.artistsStatistics).toEqual([
      expect.objectContaining({
        id: 'artist1',
        name: 'Mock Artist 1',
        count: 2,
        image: 'img1.jpg',
        spotifyUrl: 'https://open.spotify.com/artist/artist1',
      }),
    ]);
    expect(result.genresStatistics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'pop' }),
        expect.objectContaining({ name: 'rock' }),
      ])
    );
    expect(result.tracks).toHaveLength(2);
    expect(result.totalDuration).toBe(410000);
  });

  it('sorts artists by playlist count descending', async () => {
    mockGetTracksStatistics.mockResolvedValue({
      tracks: [
        mockTracks.items[0],
        mockTracks.items[1],
        {
          ...mockTracks.items[0],
          track: {
            ...mockTracks.items[0].track,
            artists: [{ id: 'artist2', name: 'Other' }],
          },
        },
      ],
      totalDuration: 1,
    });
    mockGetArtistsStatistics.mockResolvedValue([
      {
        id: 'artist2',
        name: 'Other',
        genres: ['jazz'],
        images: [],
        external_urls: { spotify: 'https://open.spotify.com/artist/artist2' },
      },
      {
        id: 'artist1',
        name: 'Mock Artist 1',
        genres: ['pop'],
        images: [{ url: 'img1.jpg' }],
        external_urls: { spotify: 'https://open.spotify.com/artist/artist1' },
      },
    ]);

    const result = await getPlaylistStatistic('token', 'playlistId', 3);

    expect(result.artistsStatistics.map((artist) => artist.id)).toEqual([
      'artist1',
      'artist2',
    ]);
    expect(result.artistsStatistics[0].count).toBe(2);
    expect(result.artistsStatistics[1].count).toBe(1);
  });
});
