import { fireEvent, render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { TabsMenu } from './TabsMenu';
import { SpotifyPlaylist } from '@/data/types/spotify';

let mockHasChat = false;

jest.mock('./DiscoverTab/container/DiscoverContent', () => ({
  DiscoverContent: ({
    onHasChatChange,
  }: {
    onHasChatChange?: (hasChat: boolean) => void;
  }) => {
    useEffect(() => {
      onHasChatChange?.(mockHasChat);
    }, [onHasChatChange]);
    return <div data-testid="discover-content" />;
  },
}));

jest.mock('./StatisticTab/container/StatisticContent', () => ({
  StatisticContent: () => <div data-testid="statistics-content" />,
}));

jest.mock('./DiscoverTab/components/Player', () => ({
  Player: ({ token, uris }: { token: string; uris: string[] }) => (
    <div
      data-testid="player-component"
      data-token={token}
      data-uris={JSON.stringify(uris)}
    />
  ),
}));

const mockUsePlayerProvider = jest.fn();

jest.mock('./usePlayerProvider', () => ({
  PlayerProvider: ({ children }: { children: React.ReactNode }) => children,
  usePlayerProvider: () => mockUsePlayerProvider(),
}));

const mockPlaylist: SpotifyPlaylist = {
  id: 'p1',
  name: 'Playlist',
  description: '',
  owner: {
    display_name: 'Owner',
    id: 'o1',
    external_urls: { spotify: '' },
    href: '',
    type: 'user',
    uri: '',
  },
  tracks: {
    href: '',
    primary_color: '',
    total: 10,
    items: [],
  },
  href: '',
  images: [],
  type: 'playlist',
  uri: '',
  public: true,
  collaborative: false,
  snapshot_id: '',
  external_urls: { spotify: '' },
};

const baseProps = {
  playlist: mockPlaylist,
  genresStatistics: [{ name: 'rock', value: 10, percentage: 50 }],
  artistsStatistics: [
    { id: 'a1', name: 'Artist 1', count: 2, image: '', spotifyUrl: '' },
  ],
  chatContent: <div data-testid="chat-content" />,
  userId: 'user-123',
};

describe('TabsMenu', () => {
  beforeEach(() => {
    mockHasChat = false;
    mockUsePlayerProvider.mockReturnValue({
      uris: [],
      setUris: jest.fn(),
    });
  });

  it('renders both tabs and default active is Descobrir', () => {
    render(<TabsMenu accessToken="mock_token" {...baseProps} />);
    const discoverBtn = screen.getByRole('button', { name: /Descobrir/i });
    const statsBtn = screen.getByRole('button', { name: /Estatísticas/i });

    expect(discoverBtn).toBeInTheDocument();
    expect(statsBtn).toBeInTheDocument();
    expect(discoverBtn).toHaveClass('text-white/80');
    expect(statsBtn).not.toHaveClass('text-white/80');

    const indicator = screen.getByTestId('tab-indicator');
    expect(indicator).toHaveStyle({ transform: 'translateX(0%)' });

    expect(screen.getByTestId('discover-content')).toBeInTheDocument();
    expect(screen.getByTestId('statistics-content')).toBeInTheDocument();
    expect(screen.queryByTestId('player-component')).not.toBeInTheDocument();
  });

  it('changes active tab styles when clicking Estatísticas', () => {
    render(<TabsMenu accessToken="mock_token" {...baseProps} />);
    const discoverBtn = screen.getByRole('button', { name: /Descobrir/i });
    const statsBtn = screen.getByRole('button', { name: /Estatísticas/i });
    const indicator = screen.getByTestId('tab-indicator');

    fireEvent.click(statsBtn);

    expect(statsBtn).toHaveClass('text-white/80');
    expect(discoverBtn).not.toHaveClass('text-white/80');
    expect(indicator).toHaveStyle({ transform: 'translateX(100%)' });
  });

  it('hides player on Estatísticas without unmounting it', () => {
    mockUsePlayerProvider.mockReturnValue({
      uris: ['spotify:track:1'],
      setUris: jest.fn(),
    });

    render(<TabsMenu accessToken="mock_token" {...baseProps} />);
    const player = screen.getByTestId('player-component');

    expect(player).toBeInTheDocument();
    expect(player.parentElement).not.toHaveClass('hidden');

    fireEvent.click(screen.getByRole('button', { name: /Estatísticas/i }));

    expect(screen.getByTestId('player-component')).toBeInTheDocument();
    expect(screen.getByTestId('player-component').parentElement).toHaveClass(
      'hidden'
    );
  });

  it('shows scroll to top after the player only when there is chat', () => {
    mockHasChat = true;
    mockUsePlayerProvider.mockReturnValue({
      uris: ['spotify:track:1'],
      setUris: jest.fn(),
    });

    render(<TabsMenu accessToken="mock_token" {...baseProps} />);

    const scrollButton = screen.getByRole('button', { name: 'Voltar ao topo' });
    const player = screen.getByTestId('player-component');

    expect(scrollButton).toBeInTheDocument();
    expect(
      player.compareDocumentPosition(scrollButton) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /Estatísticas/i }));
    expect(
      screen.queryByRole('button', { name: 'Voltar ao topo' })
    ).not.toBeInTheDocument();
  });

  it('does not show scroll to top when there is no chat', () => {
    render(<TabsMenu accessToken="mock_token" {...baseProps} />);

    expect(
      screen.queryByRole('button', { name: 'Voltar ao topo' })
    ).not.toBeInTheDocument();
  });
});
