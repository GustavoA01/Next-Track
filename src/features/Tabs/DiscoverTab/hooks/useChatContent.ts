import { useEffect, useRef } from 'react';
import { UseChatContentType } from '../types';

export const useChatContent = ({
  messages,
  isLoading,
  temporaryMessage,
}: UseChatContentType) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading, temporaryMessage]);

  return scrollRef;
};
