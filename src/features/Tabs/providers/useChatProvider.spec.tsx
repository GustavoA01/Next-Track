import {
  renderHook,
  act,
  waitFor,
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { addToPlaylist } from '@/actions/addToPlaylist';
import { toast } from 'sonner';
import { getMessages } from '@/services/firebase/getMessages';
import { searchTrack } from '@/services/spotify/searchTrack';
import { PlaylistStatisticsType } from '@/data/types/recommendations';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { useDiscoverMutation } from '../DiscoverTab/hooks/useDiscoverMutation';
import { ChatProvider, useChatProvider } from './useChatProvider';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../actions/addToPlaylist', () => ({
  addToPlaylist: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../services/firebase/getMessages', () => ({
  getMessages: jest.fn(),
}));

jest.mock('../../../services/spotify/searchTrack', () => ({
  searchTrack: jest.fn(),
}));

jest.mock('../DiscoverTab/hooks/useDiscoverMutation', () => ({
  useDiscoverMutation: jest.fn(),
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockPlaylistId = 'playlist-123';
const mockUserId = 'user-123';
const mockAccessToken = 'access-token-123';
const mockChatStorageKey = `${mockUserId}:${mockPlaylistId}`;

const mockProps: PlaylistStatisticsType & {
  accessToken: string;
  userId: string;
} = {
  artistsStatistics: [
    {
      id: 'artist-1',
      name: 'Artist 1',
      count: 10,
      image: 'image-url-1',
      spotifyUrl: 'spotify-url-1',
    },
    {
      id: 'artist-2',
      name: 'Artist 2',
      count: 5,
      image: 'image-url-2',
      spotifyUrl: 'spotify-url-2',
    },
  ],
  genresStatistics: [
    { name: 'Rock', value: 15, percentage: 45.5 },
    { name: 'Pop', value: 8, percentage: 24.2 },
    { name: 'Electronic', value: 6, percentage: 18.2 },
    { name: 'Jazz', value: 4, percentage: 12.1 },
  ],
  tracks: [
    {
      added_at: new Date(),
      track: {
        id: 'track-1',
        name: 'Track 1',
        artists: [
          {
            id: 'artist-1',
            name: 'Artist 1',
            genres: ['Rock'],
            images: [{ url: 'image.jpg', height: 640, width: 640 }],
            popularity: 80,
            followers: { href: '', total: 1000 },
            external_urls: { spotify: 'url' },
            href: '',
            type: 'artist',
            uri: 'spotify:artist:1',
          },
        ],
        album: {
          id: 'album-1',
          name: 'Album 1',
          href: '',
          album_type: 'album',
          uri: 'spotify:album:1',
          images: [{ url: 'image.jpg', height: 640, width: 640 }],
          release_date: '2024-01-01',
          total_tracks: 10,
          artists: [],
          external_urls: { spotify: 'url' },
        },
        duration_ms: 180000,
        preview_url: 'preview-url',
        explicit: false,
        external_urls: { spotify: 'url' },
        href: '',
        type: 'track',
        uri: 'spotify:track:1',
        popularity: 80,
        track_number: 1,
      },
    },
    {
      added_at: new Date(),
      track: {
        id: 'track-2',
        name: 'Track 2',
        artists: [
          {
            id: 'artist-2',
            name: 'Artist 2',
            genres: ['Pop'],
            images: [{ url: 'image.jpg', height: 640, width: 640 }],
            popularity: 75,
            followers: { href: '', total: 800 },
            external_urls: { spotify: 'url' },
            href: '',
            type: 'artist',
            uri: 'spotify:artist:2',
          },
        ],
        album: {
          id: 'album-2',
          name: 'Album 2',
          href: '',
          album_type: 'album',
          uri: 'spotify:album:2',
          images: [{ url: 'image.jpg', height: 640, width: 640 }],
          release_date: '2024-02-01',
          total_tracks: 12,
          artists: [],
          external_urls: { spotify: 'url' },
        },
        duration_ms: 200000,
        preview_url: 'preview-url',
        explicit: false,
        external_urls: { spotify: 'url' },
        href: '',
        type: 'track',
        uri: 'spotify:track:2',
        popularity: 75,
        track_number: 2,
      },
    },
  ],
  totalDuration: 380000,
  accessToken: mockAccessToken,
  userId: mockUserId,
};

const mockMessages = [
  {
    role: 'user',
    content: 'Olá',
    userMessageContent: 'Olá',
    chatResponse: '',
    recommendations: [],
  },
  {
    role: 'assistant',
    content: 'Oi!',
    userMessageContent: '',
    chatResponse: 'Oi!',
    recommendations: [],
  },
];

const mockRecommendations: SpotifyPlaylistTrack[] = [
  {
    id: '1',
    name: 'Song 1',
    uri: 'spotify:track:1',
    artists: [
      {
        id: 'artist-1',
        name: 'Artist 1',
        genres: ['Rock'],
        images: [],
        popularity: 80,
        followers: { href: '', total: 1000 },
        external_urls: { spotify: 'url' },
        href: '',
        type: 'artist',
        uri: 'spotify:artist:1',
      },
    ],
    album: {
      id: 'album-1',
      name: 'Album 1',
      href: '',
      album_type: 'album',
      uri: 'spotify:album:1',
      images: [{ url: 'image.jpg', height: 640, width: 640 }],
      release_date: '2024-01-01',
      total_tracks: 10,
      artists: [],
      external_urls: { spotify: 'url' },
    },
    duration_ms: 180000,
    preview_url: 'preview-url',
    explicit: false,
    external_urls: { spotify: 'url' },
    href: '',
    type: 'track',
    popularity: 80,
    track_number: 1,
  },
];

const mockSearchTrackResponse: SpotifyPlaylistTrack[] = mockRecommendations;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChatProvider {...mockProps}>{children}</ChatProvider>
);

describe('useChatProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ id: mockPlaylistId });

    (useDiscoverMutation as jest.Mock).mockReturnValue({
      deleteChatFn: jest.fn(),
      geminiRequestFn: jest.fn(),
      isResponseLoading: false,
      messages: mockMessages,
      postMessageFn: jest.fn(),
    });

    localStorageMock.getItem.mockReturnValue(null);
    (getMessages as jest.Mock).mockResolvedValue(undefined);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useChatProvider(), { wrapper });

    expect(result.current.recommendationsTracks).toEqual([]);
    expect(result.current.isRecommendationsLoading).toBe(false);
    expect(result.current.temporaryMessage).toBe('');
    expect(result.current.errorMessage).toBe('');
    expect(result.current.openConfirmDialog).toBe(false);
    expect(result.current.messages).toEqual(mockMessages);
    expect(result.current.isResponseLoading).toBe(false);
    expect(result.current.hasChat).toBe(true);
    expect(result.current.emotionalVibe).toBe(50);
    expect(result.current.energyVibe).toBe(50);
    expect(result.current.instrumentalVibe).toBe(50);
    expect(result.current.isVibesChanged).toBe(false);
    expect(result.current.playlistTrackIds.has('track-1')).toBe(true);
    expect(result.current.playlistTrackIds.has('track-2')).toBe(true);
  });

  it('should sync playlistTrackIds when tracks prop changes', () => {
    let providerProps = mockProps;
    const { result, rerender } = renderHook(() => useChatProvider(), {
      wrapper: ({ children }) => (
        <ChatProvider {...providerProps}>{children}</ChatProvider>
      ),
    });

    expect(result.current.playlistTrackIds.has('track-2')).toBe(true);

    providerProps = {
      ...mockProps,
      tracks: mockProps.tracks!.slice(0, 1),
    };
    rerender();

    expect(result.current.playlistTrackIds.has('track-1')).toBe(true);
    expect(result.current.playlistTrackIds.has('track-2')).toBe(false);
  });

  it('should keep pending added track ids until server tracks include them', async () => {
    (addToPlaylist as jest.Mock).mockResolvedValue({ success: true });

    const { result, rerender } = renderHook(() => useChatProvider(), {
      wrapper,
    });

    await act(async () => {
      await result.current.onAddToPlaylist('spotify:track:123', 'music-123');
    });

    expect(result.current.playlistTrackIds.has('music-123')).toBe(true);

    rerender();

    expect(result.current.playlistTrackIds.has('music-123')).toBe(true);
  });

  it('should load recommendations from localStorage if available', () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify(mockRecommendations)
    );

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    expect(localStorageMock.getItem).toHaveBeenCalledWith(mockChatStorageKey);
    expect(result.current.recommendationsTracks).toEqual(mockRecommendations);
  });

  it('should load recommendations from Firebase if no localStorage', async () => {
    const mockFirebaseMessages = [{ recommendations: mockRecommendations }];
    (getMessages as jest.Mock).mockResolvedValue(mockFirebaseMessages);

    renderHook(() => useChatProvider(), { wrapper });

    await waitFor(() => {
      expect(getMessages).toHaveBeenCalledWith(mockPlaylistId, mockUserId);
    });
  });

  it('should handle chat request successfully', async () => {
    const mockGeminiResponse = {
      chatResponse: 'Resposta do Gemini',
      recommendations: ['song1', 'song2'],
    };
    const mockGeminiRequestFn = jest.fn().mockResolvedValue(mockGeminiResponse);
    const mockPostMessageFn = jest.fn().mockResolvedValue({});

    (useDiscoverMutation as jest.Mock).mockReturnValue({
      deleteChatFn: jest.fn(),
      geminiRequestFn: mockGeminiRequestFn,
      isResponseLoading: false,
      messages: mockMessages,
      postMessageFn: mockPostMessageFn,
    });

    (searchTrack as jest.Mock).mockResolvedValue(mockSearchTrackResponse);

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    await act(async () => {
      await result.current.sendChatRequest({
        prompt: 'Recomende músicas',
      });
    });

    expect(result.current.temporaryMessage).toBe('Recomende músicas');
    expect(mockGeminiRequestFn).toHaveBeenCalled();
    expect(searchTrack).toHaveBeenCalledWith(
      mockAccessToken,
      mockGeminiResponse.recommendations
    );
    expect(mockPostMessageFn).toHaveBeenCalled();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      mockChatStorageKey
    );
  });

  it('should handle chat request error', async () => {
    const mockError = new Error('API Error');
    const mockGeminiRequestFn = jest.fn().mockRejectedValue(mockError);

    (useDiscoverMutation as jest.Mock).mockReturnValue({
      deleteChatFn: jest.fn(),
      geminiRequestFn: mockGeminiRequestFn,
      isResponseLoading: false,
      messages: mockMessages,
      postMessageFn: jest.fn(),
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    await act(async () => {
      await result.current.sendChatRequest({
        prompt: 'Recomende músicas',
      });
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error ao chamar gemini',
      mockError
    );
    expect(result.current.isRecommendationsLoading).toBe(false);

    consoleSpy.mockRestore();
  });

  it('should add track to playlist successfully', async () => {
    (addToPlaylist as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    await act(async () => {
      await result.current.onAddToPlaylist('spotify:track:123', 'music-123');
    });

    expect(addToPlaylist).toHaveBeenCalledWith({
      jsonUris: { uris: ['spotify:track:123'] },
      playlistId: mockPlaylistId,
      accessToken: mockAccessToken,
    });
    expect(toast.success).toHaveBeenCalledWith('Música adicionada à playlist');
    expect(result.current.playlistTrackIds.has('music-123')).toBe(true);
  });

  it('should throw when add to playlist fails', async () => {
    (addToPlaylist as jest.Mock).mockResolvedValue({ success: false });

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    await expect(
      act(async () => {
        await result.current.onAddToPlaylist('spotify:track:123', 'music-123');
      })
    ).rejects.toThrow('Failed to add track to playlist');

    expect(toast.error).not.toHaveBeenCalled();
    expect(result.current.playlistTrackIds.has('music-123')).toBe(false);
  });

  it('should handle loading states during chat request', async () => {
    const mockGeminiRequestFn = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                chatResponse: 'Resposta',
                recommendations: ['song1'],
              }),
            100
          )
        )
    );

    (useDiscoverMutation as jest.Mock).mockReturnValue({
      deleteChatFn: jest.fn(),
      geminiRequestFn: mockGeminiRequestFn,
      isResponseLoading: true,
      messages: mockMessages,
      postMessageFn: jest.fn(),
    });

    (searchTrack as jest.Mock).mockResolvedValue(mockSearchTrackResponse);

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    expect(result.current.isResponseLoading).toBe(true);

    await act(async () => {
      await result.current.sendChatRequest({
        prompt: 'Teste',
      });
    });

    expect(result.current.isRecommendationsLoading).toBe(false);
  });

  it('should add all recommendations successfully', async () => {
    (addToPlaylist as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    await act(async () => {
      result.current.onAddAllRecommendations(
        ['spotify:track:a', 'spotify:track:b'],
        ['music-a', 'music-b']
      );
    });

    await waitFor(() => {
      expect(addToPlaylist).toHaveBeenCalledWith({
        jsonUris: { uris: ['spotify:track:a', 'spotify:track:b'] },
        playlistId: mockPlaylistId,
        accessToken: mockAccessToken,
      });
    });

    expect(toast.success).toHaveBeenCalledWith(
      'Recomendações adicionadas com sucesso'
    );
    expect(result.current.playlistTrackIds.has('music-a')).toBe(true);
    expect(result.current.playlistTrackIds.has('music-b')).toBe(true);
  });

  it('should show error toast when add all recommendations fails', async () => {
    (addToPlaylist as jest.Mock).mockResolvedValue({ success: false });

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    await act(async () => {
      result.current.onAddAllRecommendations(['spotify:track:a'], ['music-a']);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Erro ao adicionar recomendações'
      );
    });

    expect(result.current.playlistTrackIds.has('music-a')).toBe(false);
  });

  it('should not add recommendations when there are no tracks to add', async () => {
    const { result } = renderHook(() => useChatProvider(), { wrapper });

    await act(async () => {
      result.current.onAddAllRecommendations([], []);
    });

    expect(addToPlaylist).not.toHaveBeenCalled();
  });

  it('should keep the chat request running after the discover consumer unmounts', async () => {
    let resolveGemini: (value: {
      chatResponse: string;
      recommendations: { song: string; artist: string }[];
    }) => void = () => {};

    const mockGeminiRequestFn = jest.fn(
      () =>
        new Promise<{
          chatResponse: string;
          recommendations: { song: string; artist: string }[];
        }>((resolve) => {
          resolveGemini = resolve;
        })
    );
    const mockPostMessageFn = jest.fn().mockResolvedValue({});

    (useDiscoverMutation as jest.Mock).mockReturnValue({
      deleteChatFn: jest.fn(),
      geminiRequestFn: mockGeminiRequestFn,
      isResponseLoading: true,
      messages: mockMessages,
      postMessageFn: mockPostMessageFn,
    });

    (searchTrack as jest.Mock).mockResolvedValue(mockSearchTrackResponse);

    const Consumer = () => {
      const { sendChatRequest } = useChatProvider();
      return (
        <button
          type="button"
          onClick={() =>
            void sendChatRequest({
              prompt: 'Recomende músicas',
            })
          }
        >
          enviar
        </button>
      );
    };

    const Parent = () => {
      const [showDiscover, setShowDiscover] = useState(true);
      return (
        <ChatProvider {...mockProps}>
          {showDiscover ? <Consumer /> : <div data-testid="statistics" />}
          <button type="button" onClick={() => setShowDiscover(false)}>
            estatisticas
          </button>
        </ChatProvider>
      );
    };

    render(<Parent />);
    fireEvent.click(screen.getByText('enviar'));
    fireEvent.click(screen.getByText('estatisticas'));

    expect(screen.getByTestId('statistics')).toBeInTheDocument();

    await act(async () => {
      resolveGemini({
        chatResponse: 'Resposta do Gemini',
        recommendations: [{ song: 'song1', artist: 'artist1' }],
      });
    });

    await waitFor(() => {
      expect(mockPostMessageFn).toHaveBeenCalled();
    });
  });

  it('should keep vibe sliders after the discover consumer unmounts', () => {
    const Consumer = () => {
      const { energyVibe, setEnergyVibe } = useChatProvider();
      return (
        <>
          <span data-testid="energy">{energyVibe}</span>
          <button type="button" onClick={() => setEnergyVibe(80)}>
            change
          </button>
        </>
      );
    };

    const Observer = () => {
      const { energyVibe } = useChatProvider();
      return <span data-testid="energy-after">{energyVibe}</span>;
    };

    const Parent = () => {
      const [showDiscover, setShowDiscover] = useState(true);
      return (
        <ChatProvider {...mockProps}>
          {showDiscover ? <Consumer /> : <Observer />}
          <button
            type="button"
            onClick={() => setShowDiscover((visible) => !visible)}
          >
            toggle
          </button>
        </ChatProvider>
      );
    };

    render(<Parent />);
    fireEvent.click(screen.getByText('change'));
    expect(screen.getByTestId('energy')).toHaveTextContent('80');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('energy-after')).toHaveTextContent('80');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('energy')).toHaveTextContent('80');
  });

  it('should send the chat request with the current slider values', async () => {
    const mockGeminiRequestFn = jest.fn().mockResolvedValue({
      chatResponse: 'Resposta',
      recommendations: [],
    });

    (useDiscoverMutation as jest.Mock).mockReturnValue({
      deleteChatFn: jest.fn(),
      geminiRequestFn: mockGeminiRequestFn,
      isResponseLoading: false,
      messages: mockMessages,
      postMessageFn: jest.fn().mockResolvedValue({}),
    });

    (searchTrack as jest.Mock).mockResolvedValue(mockSearchTrackResponse);

    const { result } = renderHook(() => useChatProvider(), { wrapper });

    act(() => {
      result.current.setEnergyVibe(80);
    });

    await act(async () => {
      await result.current.sendChatRequest({ prompt: 'Recomende músicas' });
    });

    expect(mockGeminiRequestFn).toHaveBeenCalledWith(
      expect.objectContaining({
        systemMessage: expect.objectContaining({
          content: expect.stringContaining('Nível de Energia: 0.8'),
        }),
      })
    );
  });
});
