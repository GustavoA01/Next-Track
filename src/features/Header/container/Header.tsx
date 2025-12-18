"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { HeaderOptions } from "../components/HeaderOptions"
import { Button } from "../../../components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

type HeaderProps = {
  profile: {
    images: { url: string }[]
    display_name: string | null
  }
}

export const Header = ({ profile }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isPlaylistDetailsPage = searchParams.get("name") ?? null
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false)

  return (
    <header className="flex justify-between px-4 pt-4  mb-4">
      {pathname === "/home" ? (
        <h1 className="text-lg sm:text-2xl">Next Track</h1>
      ) : (
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="text-primary" />
        </Button>
      )}

      <HeaderOptions
        profile={profile}
        pathName={pathname}
        setIsConfirmLogoutOpen={setIsConfirmLogoutOpen}
        isPlaylistDetailsPage={isPlaylistDetailsPage}
        isConfirmLogoutOpen={isConfirmLogoutOpen}
      />
    </header>
  )
}
