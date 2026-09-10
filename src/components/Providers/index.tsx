'use client';
import { ProvidersType } from '@/data/types/providers';
import { Toaster } from '../ui/sonner';
import { QClientProvider } from './QClientProvider';

export const Providers = ({ children }: ProvidersType) => (
  <QClientProvider>
    {children}
    <Toaster />
  </QClientProvider>
);
