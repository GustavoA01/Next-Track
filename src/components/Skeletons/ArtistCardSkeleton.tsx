import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/cn';

type ArtistCardSkeletonProps = {
  overlay?: boolean;
};

export const ArtistCardSkeleton = ({ overlay }: ArtistCardSkeletonProps) => (
  <Skeleton
    data-testid="artist-card-skeleton"
    className={cn(
      'rounded-lg min-w-37.5 min-h-37.5 aspect-square',
      overlay ? 'absolute inset-0 z-10' : 'md:w-full'
    )}
  />
);
