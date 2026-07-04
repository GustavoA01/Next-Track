import { renderHook, act, waitFor } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { addToPlaylist } from '@/actions/addToPlaylist';
import { toast } from 'sonner';
import { getMessages } from '@/services/firebase/getMessages';
import { searchTrack } from '@/services/spotify/searchTrack';
import { useForm } from 'react-hook-form';
import { PlaylistStatisticsType } from '@/data/types/recommendations';
import { SpotifyPlaylistTrack } from '@/data/types/spotify';
import { useDiscoverMutation } from '../hooks/useDiscoverMutation';
import { useDiscoverVibe } from '../hooks/useDiscoverVibe';
import { useDiscoverTab } from '../hooks/useDiscoverTab';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../../actions/addToPlaylist', () => ({
  addToPlaylist: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../../../services/firebase/getMessages', () => ({
  getMessages: jest.fn(),
}));

jest.mock('../../../../services/spotify/searchTrack', () => ({
  searchTrack: jest.fn(),
}));

jest.mock(
  '../../../../features/Tabs/DiscoverTab/hooks/useDiscoverMutation',
  () => ({
    useDiscoverMutation: jest.fn(),
  })
);

jest.mock(
  '../../../../features/Tabs/DiscoverTab/hooks/useDiscoverVibe',
  () => ({
    useDiscoverVibe: jest.fn(),
  })
);

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  zodResolver: jest.fn(),
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockPlaylistId = 'playlist-123';
const mockAccessToken = 'access-token-123';

const mockProps: PlaylistStatisticsType & { accessToken: string } = {
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
  {
    id: '2',
    name: 'Song 2',
    uri: 'spotify:track:2',
    artists: [
      {
        id: 'artist-2',
        name: 'Artist 2',
        genres: ['Pop'],
        images: [],
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
    popularity: 75,
    track_number: 2,
  },
];

const mockSearchTrackResponse: SpotifyPlaylistTrack[] = [
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

describe('useDiscoverTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({ id: mockPlaylistId });

    (useDiscoverVibe as jest.Mock).mockReturnValue({
      emotionalVibe: 50,
      energyVibe: 60,
      instrumentalVibe: 40,
      onResetVibes: jest.fn(),
      isVibesChanged: false,
      setEmotionalVibe: jest.fn(),
      setEnergyVibe: jest.fn(),
      setInstrumentalVibe: jest.fn(),
    });

    (useDiscoverMutation as jest.Mock).mockReturnValue({
      deleteChatFn: jest.fn(),
      geminiRequestFn: jest.fn(),
      isResponseLoading: false,
      messages: mockMessages,
      postMessageFn: jest.fn(),
    });

    (useForm as jest.Mock).mockReturnValue({
      reset: jest.fn(),
      handleSubmit: jest.fn((fn) => fn),
      register: jest.fn(),
      formState: { errors: {} },
    });

    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useDiscoverTab(mockProps));

    expect(result.current.recommendationsTracks).toEqual([]);
    expect(result.current.isRecommendationsLoading).toBe(false);
    expect(result.current.temporaryMessage).toBe('');
    expect(result.current.errorMessage).toBe('');
    expect(result.current.openConfirmDialog).toBe(false);
    expect(result.current.messages).toEqual(mockMessages);
    expect(result.current.isResponseLoading).toBe(false);
    expect(result.current.playlistTrackIds.has('track-1')).toBe(true);
    expect(result.current.playlistTrackIds.has('track-2')).toBe(true);
  });

  it('should sync playlistTrackIds when tracks prop changes', () => {
    const { result, rerender } = renderHook(
      (props: typeof mockProps) => useDiscoverTab(props),
      { initialProps: mockProps }
    );

    expect(result.current.playlistTrackIds.has('track-2')).toBe(true);

    rerender({
      ...mockProps,
      tracks: mockProps.tracks!.slice(0, 1),
    });

    expect(result.current.playlistTrackIds.has('track-1')).toBe(true);
    expect(result.current.playlistTrackIds.has('track-2')).toBe(false);
  });

  it('should keep pending added track ids until server tracks include them', async () => {
    (addToPlaylist as jest.Mock).mockResolvedValue({ success: true });

    const { result, rerender } = renderHook(
      (props: typeof mockProps) => useDiscoverTab(props),
      { initialProps: mockProps }
    );

    await act(async () => {
      await result.current.onAddToPlaylist('spotify:track:123', 'music-123');
    });

    expect(result.current.playlistTrackIds.has('music-123')).toBe(true);

    rerender({ ...mockProps });

    expect(result.current.playlistTrackIds.has('music-123')).toBe(true);
  });

  it('should load recommendations from localStorage if available', () => {
    localStorageMock.getItem.mockReturnValue(
      JSON.stringify(mockRecommendations)
    );

    const { result } = renderHook(() => useDiscoverTab(mockProps));

    expect(localStorageMock.getItem).toHaveBeenCalledWith(mockPlaylistId);
    expect(result.current.recommendationsTracks).toEqual(mockRecommendations);
  });

  it('should load recommendations from Firebase if no localStorage', async () => {
    const mockFirebaseMessages = [{ recommendations: mockRecommendations }];
    (getMessages as jest.Mock).mockResolvedValue(mockFirebaseMessages);

    renderHook(() => useDiscoverTab(mockProps));

    await waitFor(() => {
      expect(getMessages).toHaveBeenCalledWith(mockPlaylistId);
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

    const { result } = renderHook(() => useDiscoverTab(mockProps));

    await act(async () => {
      await result.current.handleChatRequest({ prompt: 'Recomende músicas' });
    });

    expect(result.current.temporaryMessage).toBe('Recomende músicas');
    expect(mockGeminiRequestFn).toHaveBeenCalled();
    expect(searchTrack).toHaveBeenCalledWith(
      mockAccessToken,
      mockGeminiResponse.recommendations
    );
    expect(mockPostMessageFn).toHaveBeenCalled();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(mockPlaylistId);
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

    const { result } = renderHook(() => useDiscoverTab(mockProps));

    await act(async () => {
      await result.current.handleChatRequest({ prompt: 'Recomende músicas' });
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

    const { result } = renderHook(() => useDiscoverTab(mockProps));

    await act(async () => {
      await result.current.onAddToPlaylist('spotify:track:123', 'music-123');
    });

    expect(addToPlaylist).toHaveBeenCalledWith({
      jsonUris: { uris: ['spotify:track:123'] },
      playlistId: mockPlaylistId,
      accessToken: mockAccessToken,
    });
    expect(toast.success).toHaveBeenCalledWith('Música adicionada à playlist!');
    expect(result.current.playlistTrackIds.has('music-123')).toBe(true);
  });

  it('should throw when add to playlist fails', async () => {
    (addToPlaylist as jest.Mock).mockResolvedValue({ success: false });

    const { result } = renderHook(() => useDiscoverTab(mockProps));

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

    const { result } = renderHook(() => useDiscoverTab(mockProps));

    expect(result.current.isResponseLoading).toBe(true);

    await act(async () => {
      await result.current.handleChatRequest({ prompt: 'Teste' });
    });

    expect(result.current.isRecommendationsLoading).toBe(false);
  });

  it('should call handleScrollToTop', () => {
    const mockScrollIntoView = jest.fn();
    const mockElement = { scrollIntoView: mockScrollIntoView };

    document.getElementById = jest.fn().mockReturnValue(mockElement);

    const { result } = renderHook(() => useDiscoverTab(mockProps));

    act(() => {
      result.current.handleScrollToTop();
    });

    expect(document.getElementById).toHaveBeenCalledWith('playlist-header');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should call onSelectBadge and reset form', () => {
    const mockReset = jest.fn();
    (useForm as jest.Mock).mockReturnValue({
      reset: mockReset,
      handleSubmit: jest.fn(),
      register: jest.fn(),
      formState: { errors: {} },
    });

    const { result } = renderHook(() => useDiscoverTab(mockProps));

    act(() => {
      result.current.onSelectBadge('rock music');
    });

    expect(mockReset).toHaveBeenCalledWith({ prompt: 'rock music' });
  });
});
