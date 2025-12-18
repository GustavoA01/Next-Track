import { Dialog } from "@/components/ui/dialog"
import { ConfirmLogOut } from "./ConfirmLogOut"
import { DrawerMenu } from "./DrawerMenu"
import { ToolTipMenu } from "./ToolTipMenu"

type HeaderOptionsProps = {
  profile: {
    images: { url: string }[]
    display_name: string | null
  }
  setIsConfirmLogoutOpen: (isOpen: boolean) => void
  isConfirmLogoutOpen: boolean
  isPlaylistDetailsPage: string | null
  pathName: string
}

const paths = [
  {
    name: "/home",
    label: "Minhas playlists",
  }
]

export const HeaderOptions = ({
  profile,
  setIsConfirmLogoutOpen,
  isConfirmLogoutOpen,
  // isPlaylistDetailsPage,
  // pathName,
}: HeaderOptionsProps) => {
  return (
    <>
      <div className="flex space-x-4 items-center">
        <p className="text-muted-foreground font-montserrat animate-fade-in-up-down">
          Next Track
        </p>

        <ToolTipMenu profile={profile} setIsOpen={setIsConfirmLogoutOpen} />
        <DrawerMenu profile={profile} setIsOpen={setIsConfirmLogoutOpen} />
      </div>

      <Dialog open={isConfirmLogoutOpen} onOpenChange={setIsConfirmLogoutOpen}>
        <ConfirmLogOut />
      </Dialog>
    </>
  )
}
