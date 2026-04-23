'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ProvidersProps } from '@/data/types/components';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from './ui/sonner';

export const Providers = ({ children }: ProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <Toaster />
  </QueryClientProvider>
);
