import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileMenuTriggerProps } from '../types';
import { cn } from '@/utils/cn';

export const ProfileMenuTrigger = ({
  profile,
  className,
}: ProfileMenuTriggerProps) => (
  <Avatar
    data-testid="profile-menu-trigger"
    className={cn('cursor-pointer', className)}
  >
    <AvatarImage src={profile.images[0]?.url ?? ''} />
    <AvatarFallback className="p-4 bg-primary text-black font-semibold select-none">
      {profile.display_name?.charAt(0).toUpperCase() || ''}
    </AvatarFallback>
  </Avatar>
);
