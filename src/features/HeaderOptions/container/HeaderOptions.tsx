"use client"
import { usePathname } from "next/navigation"
import { Dialog } from "@/components/ui/dialog"
import { useState } from "react"
import { ConfirmLogOut } from "../components/ConfirmLogOut"
import { DrawerMenu } from "../components/DrawerMenu"
import { ToolTipMenu } from "../components/ToolTipMenu"

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

        <ToolTipMenu profile={profile} setIsOpen={setIsOpen} />
        <DrawerMenu profile={profile} setIsOpen={setIsOpen} />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <ConfirmLogOut />
      </Dialog>
    </>
  )
}
