'use client';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const GoBack = () => {
  const { back } = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => back()}
      className="rounded-full w-10 h-10"
    >
      <ArrowLeft
        data-testid="arrow-left-icon"
        className="text-primary w-10 h-10"
      />
    </Button>
  );
};
