import { ChatContentResponse } from '@/data/types';
import { renderHook } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import { useChatContent } from '../hooks/useChatContent';
import { useChatContentType } from '../types';

const mockMessage = (userMessage: string): ChatContentResponse => ({
  userId: 'user-1',
  playlistId: 'playlist-1',
  userMessage,
  chatResponse: '',
  createdAt: { toMillis: () => 1 } as Timestamp,
  recommendations: [],
});

const defaultProps: useChatContentType = {
  messages: [],
  isLoading: false,
  temporaryMessage: '',
};

const mockUseRef = (scrollRef: { current: HTMLDivElement | null }) => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  jest.spyOn(require('react'), 'useRef').mockReturnValue(scrollRef);
};

describe('useChatContent', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should scroll to bottom when messages change', () => {
    const scrollTo = jest.fn();
    const scrollRef = {
      current: {
        scrollTo,
        scrollHeight: 1200,
      } as unknown as HTMLDivElement,
    };

    mockUseRef(scrollRef);

    const { rerender } = renderHook(
      (props: useChatContentType) => useChatContent(props),
      { initialProps: defaultProps }
    );

    rerender({
      ...defaultProps,
      messages: [mockMessage('nova mensagem')],
    });

    expect(scrollTo).toHaveBeenCalledWith({
      top: 1200,
      behavior: 'smooth',
    });
  });

  it('should scroll to bottom when loading state changes', () => {
    const scrollTo = jest.fn();
    const scrollRef = {
      current: {
        scrollTo,
        scrollHeight: 800,
      } as unknown as HTMLDivElement,
    };

    mockUseRef(scrollRef);

    const { rerender } = renderHook(
      (props: useChatContentType) => useChatContent(props),
      { initialProps: defaultProps }
    );

    rerender({
      ...defaultProps,
      isLoading: true,
    });

    expect(scrollTo).toHaveBeenCalledWith({
      top: 800,
      behavior: 'smooth',
    });
  });

  it('should not throw when scroll ref is null', () => {
    mockUseRef({ current: null });

    expect(() =>
      renderHook(() =>
        useChatContent({
          ...defaultProps,
          messages: [mockMessage('teste')],
        })
      )
    ).not.toThrow();
  });
});
