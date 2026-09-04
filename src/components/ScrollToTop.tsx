import { ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { scrollToTop } from '@/utils/scrollToTop';

export const ScrollToTop = () => (
  <Button
    variant="ghost"
    onClick={scrollToTop}
    className="flex justify-center items-center my-5 mx-auto rounded-full border-2 border-muted p-2 w-10 h-10"
  >
    <ChevronUp className="text-primary" />
  </Button>
);
