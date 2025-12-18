'use client'
import { Dialog } from "@/components/ui/dialog"
import { ConfirmLogOut } from "../components/ConfirmLogOut"
import { DrawerMenu } from "../components/DrawerMenu"
import { ToolTipMenu } from "../components/ToolTipMenu"
import { useState } from "react"

type MenuOptionsProps  = {
  profile: {
    images: { url: string }[]
    display_name: string | null
  }
}

export const MenuOptions = ({
  profile
}: MenuOptionsProps) => {
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false)
  
  return (
    <>
      <div className="flex items-center">
        {/* <p className="text-muted-foreground font-montserrat animate-fade-in-up-down">
          Next Track
        </p> */}

        <ToolTipMenu profile={profile} setIsOpen={setIsConfirmLogoutOpen} />
        <DrawerMenu profile={profile} setIsOpen={setIsConfirmLogoutOpen} />
      </div>

      <Dialog open={isConfirmLogoutOpen} onOpenChange={setIsConfirmLogoutOpen}>
        <ConfirmLogOut />
      </Dialog>
    </>
  )
}
