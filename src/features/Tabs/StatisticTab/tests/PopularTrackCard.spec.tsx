import { render, screen } from '@testing-library/react';
import { NextImgProps } from '@/globalTestsMocks';
import { PopularTrackCard } from '../components/PopularTrackCard';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';

jest.mock('next/image', () => {
  function MockImage({ src, alt, width, height }: NextImgProps) {
    return <img src={src} alt={alt} width={width} height={height} />;
  }
  return MockImage;
});

const mockTrack: SpotifyPlaylistTrack = {
  id: 'track-1',
  name: 'Popular Song',
  artists: [
    {
      id: 'artist-1',
      name: 'Artist One',
    } as SpotifyPlaylistTrack['artists'][number],
  ],
  album: {
    id: 'album-1',
    name: 'Album',
    href: '',
    album_type: 'album',
    uri: '',
    images: [
      { url: 'https://spotify/image-track-mock', height: 640, width: 640 },
    ],
    release_date: '2024-01-01',
    total_tracks: 1,
    artists: [],
    external_urls: { spotify: '' },
  },
  duration_ms: 180000,
  preview_url: '',
  explicit: false,
  external_urls: { spotify: 'https://open.spotify.com/track/track-1' },
  href: '',
  type: 'track',
  uri: 'spotify:track:1',
  popularity: 85,
  track_number: 1,
};

describe('PopularTrackCard', () => {
  it('should render track info and label', () => {
    render(<PopularTrackCard label="Mais popular" track={mockTrack} />);

    expect(screen.getByText('Mais popular')).toBeInTheDocument();
    expect(screen.getByText('Popular Song')).toBeInTheDocument();
    expect(screen.getByText('Artist One')).toBeInTheDocument();
    expect(screen.getByText('Popularidade: 85')).toBeInTheDocument();
  });

  it('should link to spotify track page', () => {
    render(<PopularTrackCard label="Menos popular" track={mockTrack} />);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      mockTrack.external_urls.spotify
    );
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('should render album image', () => {
    render(<PopularTrackCard label="Mais popular" track={mockTrack} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://spotify/image-track-mock'
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockTrack.name);
  });
});
