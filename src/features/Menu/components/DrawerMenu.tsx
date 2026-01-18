import { ProfileMenuTrigger } from "./ProfileMenuTrigger";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DrawerMenuProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
  setIsOpen: (isOpen: boolean) => void;
};

export const DrawerMenu = ({ profile, setIsOpen }: DrawerMenuProps) => {
  const pathname = usePathname();

  return (
    <Drawer>
      <DrawerTrigger>
        <ProfileMenuTrigger profile={profile} className="sm:hidden" />
      </DrawerTrigger>

      <DrawerContent>
        <DrawerFooter>
          {pathname !== "/home" && (
            <DrawerClose asChild>
              <Button>
                <Link href="/">Voltar ao início</Link>
              </Button>
            </DrawerClose>
          )}

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
