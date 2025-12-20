import { LogOut } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { ProfileMenuTrigger } from "./ProfileMenuTrigger";

type ToolTipMenuProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
  setIsOpen: (isOpen: boolean) => void;
};

export const ToolTipMenu = ({ profile, setIsOpen }: ToolTipMenuProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <ProfileMenuTrigger profile={profile} className="hidden sm:block" />
      </TooltipTrigger>

      <TooltipContent className="mt-2 bg-transparent">
        <Button
          variant="ghost"
          onClick={() => setIsOpen(true)}
          className="text-muted-foreground bg-background"
        >
          <LogOut className="text-red-400" />
          Sair da conta
        </Button>
      </TooltipContent>
    </Tooltip>
  );
};
