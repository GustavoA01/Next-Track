import { SpotifyPlaylistTracks } from '@/data/types/spotify';
import { getMostAndLeastPopularTracks } from '../getMostAndLeastPopularTracks';

type PlaylistTrackItem = SpotifyPlaylistTracks['items'][number];

const createTrack = (
  id: string,
  name: string,
  popularity: number
): PlaylistTrackItem => ({
  added_at: new Date(),
  track: {
    id,
    name,
    popularity,
    artists: [],
    album: {
      id: 'album-1',
      name: 'Album',
      href: '',
      album_type: 'album',
      uri: '',
      images: [],
      release_date: '2024-01-01',
      total_tracks: 1,
      artists: [],
      external_urls: { spotify: '' },
    },
    duration_ms: 180000,
    preview_url: '',
    explicit: false,
    external_urls: { spotify: `https://open.spotify.com/track/${id}` },
    href: '',
    type: 'track',
    uri: `spotify:track:${id}`,
    track_number: 1,
  },
});

describe('getMostAndLeastPopularTracks', () => {
  it('should return most popular and treat zero popularity as least popular', () => {
    const tracks = [
      createTrack('1', 'Mainstream Hit', 90),
      createTrack('2', 'Hidden Gem', 12),
      createTrack('3', 'Zero Track', 0),
    ];

    const result = getMostAndLeastPopularTracks(tracks);

    expect(result.mostPopular?.name).toBe('Mainstream Hit');
    expect(result.mostPopular?.popularity).toBe(90);
    expect(result.leastPopular?.name).toBe('Zero Track');
    expect(result.leastPopular?.popularity).toBe(0);
  });

  it('should return null when tracks list is empty', () => {
    expect(getMostAndLeastPopularTracks([])).toEqual({
      mostPopular: null,
      leastPopular: null,
    });
  });

  it('should pick tracks with zero popularity when they are the only ones', () => {
    const tracks = [
      createTrack('1', 'Track B', 0),
      createTrack('2', 'Track A', 0),
    ];

    const result = getMostAndLeastPopularTracks(tracks);

    expect(result.mostPopular?.name).toBe('Track A');
    expect(result.leastPopular?.name).toBe('Track B');
    expect(result.mostPopular?.popularity).toBe(0);
    expect(result.leastPopular?.popularity).toBe(0);
  });

  it('should use track name as tiebreaker for same popularity', () => {
    const tracks = [
      createTrack('1', 'Beta Song', 50),
      createTrack('2', 'Alpha Song', 50),
    ];

    const result = getMostAndLeastPopularTracks(tracks);

    expect(result.mostPopular?.name).toBe('Alpha Song');
    expect(result.leastPopular?.name).toBe('Beta Song');
  });

  it('should ignore tracks without spotify url even with zero popularity', () => {
    const localTrack = createTrack('local', 'Local File', 0);
    localTrack.track.external_urls = { spotify: undefined as never };
    localTrack.track.id = '';

    const tracks = [
      createTrack('1', 'Mainstream Hit', 90),
      localTrack,
      createTrack('2', 'Almost Zero', 2),
    ];

    const result = getMostAndLeastPopularTracks(tracks);

    expect(result.mostPopular?.name).toBe('Mainstream Hit');
    expect(result.leastPopular?.name).toBe('Almost Zero');
    expect(result.leastPopular?.popularity).toBe(2);
  });
});
