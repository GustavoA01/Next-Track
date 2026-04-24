import { msFormatterReturnType } from '@/data/types/utils';

export const msFormatter = (ms: number): msFormatterReturnType => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return { hours, minutes, seconds: formattedSeconds };
};
