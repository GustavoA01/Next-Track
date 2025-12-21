import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileMenuTriggerProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
  className?: string;
};

export const ProfileMenuTrigger = ({
  profile,
  className,
}: ProfileMenuTriggerProps) => {
  return (
    <Avatar
      data-testid="profile-menu-trigger"
      className={`cursor-pointer ${className}`}
    >
      <AvatarImage src={profile.images[0]?.url || ""} />
      <AvatarFallback className="p-4 bg-primary text-black font-semibold select-none">
        {profile.display_name?.charAt(0).toUpperCase() || ""}
      </AvatarFallback>
    </Avatar>
  );
};
