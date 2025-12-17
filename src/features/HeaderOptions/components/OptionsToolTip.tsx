import { LogOut } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip"

type OptionsToolTipProps = {
  profile: {
    images: { url: string }[]
    display_name: string | null
  }
  setIsOpen: (isOpen: boolean) => void
}

export const OptionsToolTip = ({ profile, setIsOpen }: OptionsToolTipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Avatar>
          <AvatarImage src={profile.images[0]?.url || ""} />
          <AvatarFallback className="p-4 bg-primary text-black select-none">
            {profile.display_name?.slice(0, 2).toUpperCase() || ""}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>

      <TooltipContent className="mt-2 bg-transparent">
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="text-muted-foreground"
        >
          <LogOut className="text-red-400" />
          Sair da conta
        </Button>
      </TooltipContent>
    </Tooltip>
  )
}
