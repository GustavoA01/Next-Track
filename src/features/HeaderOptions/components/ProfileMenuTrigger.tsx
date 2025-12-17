import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type ProfileMenuTriggerProps = {
  profile: {
    images: { url: string }[]
    display_name: string | null
  }
  className?: string
}

export const ProfileMenuTrigger = ({
  profile,
  className,
}: ProfileMenuTriggerProps) => {
  return (
    <Avatar className={`cursor-pointer ${className}`}>
      <AvatarImage src={profile.images[0]?.url || ""} />
      <AvatarFallback className="p-4 bg-primary text-black select-none">
        {profile.display_name?.slice(0, 2).toUpperCase() || ""}
      </AvatarFallback>
    </Avatar>
  )
}
