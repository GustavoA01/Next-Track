import { HeaderOptions } from "../features/HeaderOptions/container/HeaderOptions"

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

      <HeaderOptions profile={profile} />
    </header>
  )
}
