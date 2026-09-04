import { ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { scrollToTop } from '@/utils/scrollToTop';

export const ScrollToTop = () => (
  <Button
    variant="ghost"
    onClick={scrollToTop}
    className="my-5 flex justify-center items-center rounded-full border-2 border-muted p-2 cursor-pointer w-10 h-10 self-center"
  >
    <ChevronUp className="text-primary" />
  </Button>
);
