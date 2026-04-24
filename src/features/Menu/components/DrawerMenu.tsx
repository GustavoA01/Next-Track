import { Button } from '@/components/ui/button';
import { HomeIcon, LogOut } from 'lucide-react';
import {
  DrawerContent,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DrawerMenuProps } from '../types';

export const DrawerMenu = ({ setIsOpen }: DrawerMenuProps) => {
  const pathname = usePathname();

  return (
    <DrawerContent>
      <DrawerFooter>
        {pathname !== '/home' && (
          <DrawerClose asChild>
            <Button asChild>
              <Link href="/">
                <HomeIcon />
                Voltar ao início
              </Link>
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
  );
};
