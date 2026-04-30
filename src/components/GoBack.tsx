'use client';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const GoBack = () => {
  const { back } = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => back()}
      className="rounded-full w-10 h-10 bg-black/30 backdrop-blur-md border border-white/30 shadow-md"
    >
      <ArrowLeft data-testid="arrow-left-icon" className="w-5 h-5" />
    </Button>
  );
};
