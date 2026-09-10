import { renderHook, act } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { useDiscoverTab } from '../hooks/useDiscoverTab';
import { useChatProvider } from '../../providers/useChatProvider';

jest.mock('../../providers/useChatProvider', () => ({
  useChatProvider: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  zodResolver: jest.fn(),
}));

const mockSendChatRequest = jest.fn();
const mockReset = jest.fn();
const mockHandleSubmit = jest.fn(() => jest.fn());

describe('useDiscoverTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useChatProvider as jest.Mock).mockReturnValue({
      deleteChatFn: jest.fn(),
      isResponseLoading: false,
      messages: [{ chatResponse: 'Oi!' }],
      sendChatRequest: mockSendChatRequest,
      recommendationsTracks: [],
      isRecommendationsLoading: false,
      playlistTrackIds: new Set(['track-1']),
      isAddingTracks: false,
      temporaryMessage: '',
      errorMessage: '',
      openConfirmDialog: false,
      setOpenConfirmDialog: jest.fn(),
      onAddToPlaylist: jest.fn(),
      onAddAllRecommendations: jest.fn(),
      hasChat: true,
      emotionalVibe: 50,
      energyVibe: 60,
      instrumentalVibe: 40,
      onResetVibes: jest.fn(),
      isVibesChanged: false,
      setEmotionalVibe: jest.fn(),
      setEnergyVibe: jest.fn(),
      setInstrumentalVibe: jest.fn(),
    });

    (useForm as jest.Mock).mockReturnValue({
      reset: mockReset,
      handleSubmit: mockHandleSubmit,
      register: jest.fn(),
      formState: { errors: {} },
    });
  });

  it('should expose chat state from the provider', () => {
    const { result } = renderHook(() => useDiscoverTab());

    expect(result.current.messages).toEqual([{ chatResponse: 'Oi!' }]);
    expect(result.current.isResponseLoading).toBe(false);
    expect(result.current.playlistTrackIds.has('track-1')).toBe(true);
    expect(result.current.emotionalVibe).toBe(50);
    expect(result.current.energyVibe).toBe(60);
    expect(result.current.instrumentalVibe).toBe(40);
  });

  it('should send the chat request with the prompt', async () => {
    const { result } = renderHook(() => useDiscoverTab());

    await act(async () => {
      await result.current.handleChatRequest({ prompt: 'Recomende músicas' });
    });

    expect(mockReset).toHaveBeenCalledWith({ prompt: '' });
    expect(mockSendChatRequest).toHaveBeenCalledWith({
      prompt: 'Recomende músicas',
    });
  });

  it('should call onSelectBadge and reset form', () => {
    const { result } = renderHook(() => useDiscoverTab());

    act(() => {
      result.current.onSelectBadge('rock music');
    });

    expect(mockReset).toHaveBeenCalledWith({ prompt: 'rock music' });
  });

  it('should submit the form when Enter is pressed without shift', () => {
    const submitFn = jest.fn();
    mockHandleSubmit.mockReturnValue(submitFn);

    const { result } = renderHook(() => useDiscoverTab());
    const preventDefault = jest.fn();

    act(() => {
      result.current.handleOnKeyDown({
        key: 'Enter',
        shiftKey: false,
        preventDefault,
      } as unknown as React.KeyboardEvent<HTMLTextAreaElement>);
    });

    expect(preventDefault).toHaveBeenCalled();
    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(submitFn).toHaveBeenCalled();
  });
});
