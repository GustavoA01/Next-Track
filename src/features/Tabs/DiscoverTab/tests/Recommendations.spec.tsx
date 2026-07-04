import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

jest.mock('next/image', () => ({ src, alt, width, height }: NextImgProps) => (
  <img src={src} alt={alt} width={width} height={height} />
));

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

jest.mock('../../../../features/Tabs/DiscoverTab/components/Player', () => ({
  Player: jest.fn(({ token, uris }) => (
    <div
      data-testid="player-component"
      data-token={token}
      data-uris={JSON.stringify(uris)}
    >
      Mock Player
    </div>
  )),
}));

const mockAccessToken = 'test-access-token';
const mockOnAddToPlaylist = jest.fn();
const mockScrollIntoView = jest.fn();
const mockPlaylistTrackIds = new Set<string>();

const mockRecommendationsTracks: SpotifyPlaylistTrack[] = [
  {
    id: 'track-1',
    name: 'Song One',
    artists: [{ id: 'artist-1', name: 'Artist One' } as any],
    album: { images: [{ url: 'image-1.jpg' }] } as any,
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
    artists: [{ id: 'artist-2', name: 'Artist Two' } as any],
    album: { images: [{ url: 'image-2.jpg' }] } as any,
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
        accessToken={mockAccessToken}
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
        accessToken={mockAccessToken}
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
        accessToken={mockAccessToken}
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

  it('should not render Player when no track is selected', () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        accessToken={mockAccessToken}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    expect(screen.queryByTestId('player-component')).not.toBeInTheDocument();
  });

  it('should render Player when a track is clicked', async () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        accessToken={mockAccessToken}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    const musicCard = screen.getByTestId('music-card-track-1');
    fireEvent.click(musicCard);

    await waitFor(() => {
      expect(screen.getByTestId('player-component')).toBeInTheDocument();
    });
  });

  it('should set correct URIs when track is clicked', async () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        accessToken={mockAccessToken}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    const musicCard = screen.getByTestId('music-card-track-1');
    fireEvent.click(musicCard);

    await waitFor(() => {
      const player = screen.getByTestId('player-component');
      const uris = JSON.parse(player.getAttribute('data-uris') || '[]');
      expect(uris).toEqual(['spotify:track:1']);
    });
  });

  it('should pass correct access token to Player', async () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        accessToken={mockAccessToken}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    const musicCard = screen.getByTestId('music-card-track-1');
    fireEvent.click(musicCard);

    await waitFor(() => {
      const player = screen.getByTestId('player-component');
      expect(player.getAttribute('data-token')).toBe(mockAccessToken);
    });
  });

  it('should scroll to player anchor when track is clicked', async () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        accessToken={mockAccessToken}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    const musicCard = screen.getByTestId('music-card-track-1');
    fireEvent.click(musicCard);

    await waitFor(() => {
      expect(document.getElementById).toHaveBeenCalledWith(
        'spotify-player-anchor'
      );
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
  });

  it('should update Player when different track is clicked', async () => {
    render(
      <Recommendations
        recommendationsTracks={mockRecommendationsTracks}
        accessToken={mockAccessToken}
        onAddToPlaylist={mockOnAddToPlaylist}
        playlistTrackIds={mockPlaylistTrackIds}
      />
    );

    const firstMusicCard = screen.getByTestId('music-card-track-1');
    fireEvent.click(firstMusicCard);

    await waitFor(() => {
      const player = screen.getByTestId('player-component');
      let uris = JSON.parse(player.getAttribute('data-uris') || '[]');
      expect(uris).toEqual(['spotify:track:1']);
    });

    const secondMusicCard = screen.getByTestId('music-card-track-2');
    fireEvent.click(secondMusicCard);

    await waitFor(() => {
      const player = screen.getByTestId('player-component');
      let uris = JSON.parse(player.getAttribute('data-uris') || '[]');
      expect(uris).toEqual(['spotify:track:2']);
    });
  });
});
