'use client';
import { ProvidersProps } from '@/data/types/components';
import { Toaster } from '../ui/sonner';
import { QClientProvider } from './QClientProvider';

export const Providers = ({ children }: ProvidersProps) => (
  <QClientProvider>
    {children}
    <Toaster />
  </QClientProvider>
);
