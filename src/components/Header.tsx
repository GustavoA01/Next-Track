import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type HeaderProps = {
  profile: {
    images: { url: string }[]
    display_name: string | null
  }
}

export const Header = ({ profile }: HeaderProps) => {
  return (
    <header className="flex justify-between p-4">
      <h1 className="text-2xl">Next Track</h1>

      <div className="flex space-x-4 items-center">
        <p className="text-muted-foreground font-montserrat">Minhas playlists</p>
        <Avatar>
          <AvatarImage src={profile.images[0]?.url || ""} />
          <AvatarFallback className="p-4 bg-primary text-black select-none">
            {profile.display_name?.slice(0, 2).toUpperCase() || ""}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
