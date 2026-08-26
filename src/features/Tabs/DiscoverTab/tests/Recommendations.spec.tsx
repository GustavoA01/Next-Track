import { render, screen, fireEvent } from '@testing-library/react';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { Recommendations } from '../container/Recommendations';
import { NextImgProps } from '@/globalTestsMocks';

type MusicCardProps = {
  index: number;
  id: string;
  imageUrl: string;
  musicName: string;
  artistName: string;
  duration: string;
  onClick: () => void;
  onAddToPlaylist: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
};

const mockSetUris = jest.fn();

jest.mock('../../usePlayerProvider', () => ({
  usePlayerProvider: () => ({
    uris: [],
    setUris: mockSetUris,
  }),
}));

jest.mock('next/image', () => {
  function MockImage({ src, alt, width, height }: NextImgProps) {
    return <img src={src} alt={alt} width={width} height={height} />;
  }
  return MockImage;
});

jest.mock('../../../MusicCard/container/MusicCard', () => ({
  MusicCard: ({
    id,
    index,
    musicName,
    artistName,
    imageUrl,
    duration,
    onClick,
    onAddToPlaylist,
  }: MusicCardProps) => (
    <div data-testid={`music-card-${id}`} data-index={index} onClick={onClick}>
      <div data-testid="music-name">{musicName}</div>
      <div data-testid="artist-name">{artistName}</div>
      <div data-testid="duration">{duration}</div>
      <div data-testid="image-url">{imageUrl}</div>
      <button
        data-testid={`add-button-${id}`}
        onClick={(e) => {
          e.stopPropagation();
          void onAddToPlaylist(
            e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>
          );
        }}
      >
        Add to playlist
      </button>
    </div>
  ),
}));

const mockOnAddToPlaylist = jest.fn();
const mockScrollIntoView = jest.fn();
const mockPlaylistTrackIds = new Set<string>();

const mockRecommendationsTracks: SpotifyPlaylistTrack[] = [
  {
    id: 'track-1',
    name: 'Song One',
    artists: [
      {
        id: 'artist-1',
        name: 'Artist One',
      } as SpotifyPlaylistTrack['artists'][number],
    ],
    album: {
      images: [{ url: 'image-1.jpg' }],
    } as SpotifyPlaylistTrack['album'],
    duration_ms: 180000,
    preview_url: 'preview-url-1',
    explicit: false,
    external_urls: { spotify: 'url-1' },
    href: '',
    type: 'track',
    uri: 'spotify:track:1',
    popularity: 80,
    track_number: 1,
  },
  {
    id: 'track-2',
    name: 'Song Two',
    artists: [
      {
        id: 'artist-2',
        name: 'Artist Two',
      } as SpotifyPlaylistTrack['artists'][number],
    ],
    album: {
      images: [{ url: 'image-2.jpg' }],
    } as SpotifyPlaylistTrack['album'],
    duration_ms: 240000,
    preview_url: 'preview-url-2',
    explicit: false,
    external_urls: { spotify: 'url-2' },
    href: '',
    type: 'track',
    uri: 'spotify:track:2',
    popularity: 75,
    track_number: 2,
  },
];

describe('Recommendations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
    document.getElementById = jest.fn().mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });
  });

  it('should render all recommendation tracks', () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    expect(screen.getByText('Song One')).toBeInTheDocument();
    expect(screen.getByText('Song Two')).toBeInTheDocument();
    expect(screen.getByText('Artist One')).toBeInTheDocument();
    expect(screen.getByText('Artist Two')).toBeInTheDocument();
  });

  it('should format duration correctly', () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    expect(screen.getByText('3:00')).toBeInTheDocument();
    expect(screen.getByText('4:00')).toBeInTheDocument();
  });

  it('should call onAddToPlaylist when add button is clicked', async () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    const addButton = screen.getByTestId('add-button-track-1');
    fireEvent.click(addButton);

    expect(mockOnAddToPlaylist).toHaveBeenCalledWith(
      mockRecommendationsTracks[0].uri,
      mockRecommendationsTracks[0].id
    );
  });

  it('should set uris when a track is clicked', () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    fireEvent.click(screen.getByTestId('music-card-track-1'));

    expect(mockSetUris).toHaveBeenCalledWith(['spotify:track:1']);
  });

  it('should scroll to player anchor when track is clicked', () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    fireEvent.click(screen.getByTestId('music-card-track-1'));

    expect(document.getElementById).toHaveBeenCalledWith(
      'spotify-player-anchor'
    );
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should update uris when a different track is clicked', () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    fireEvent.click(screen.getByTestId('music-card-track-1'));
    expect(mockSetUris).toHaveBeenCalledWith(['spotify:track:1']);

    fireEvent.click(screen.getByTestId('music-card-track-2'));
    expect(mockSetUris).toHaveBeenCalledWith(['spotify:track:2']);
  });
});
