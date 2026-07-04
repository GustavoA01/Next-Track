import { useEffect, useRef } from 'react';
import { useChatContentType } from '../types';

export const useChatContent = ({
  messages,
  isLoading,
  temporaryMessage,
}: useChatContentType) => {
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
