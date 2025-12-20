import { ProfileMenuTrigger } from "./ProfileMenuTrigger";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
  Drawer,
} from "@/components/ui/drawer";

type DrawerMenuProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
  setIsOpen: (isOpen: boolean) => void;
};
export const DrawerMenu = ({ profile, setIsOpen }: DrawerMenuProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <ProfileMenuTrigger profile={profile} className="sm:hidden" />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              <LogOut className="text-red-400" />
              Sair da conta
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
