"use client"
import { usePathname } from "next/navigation"
import { OptionsToolTip } from "../components/OptionsToolTip"
import { Dialog } from "@/components/ui/dialog"
import { useState } from "react"
import { ConfirmLogOut } from "../components/ConfirmLogOut"

type HeaderOptionsProps = {
  profile: {
    images: { url: string }[]
    display_name: string | null
  }
}

const paths = [
  {
    name: "/home",
    label: "Minhas playlists",
  },
]

export const HeaderOptions = ({ profile }: HeaderOptionsProps) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex space-x-4 items-center">
        <p className="text-muted-foreground font-montserrat">
          {paths.find((path) => path.name === pathname)?.label || ""}
        </p>

        <OptionsToolTip profile={profile} setIsOpen={setIsOpen} />
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <ConfirmLogOut />
      </Dialog>
    </>
  )
}
