import { Button } from '@/components/ui/button';
import { HomeIcon, LogOut } from 'lucide-react';
import {
  DrawerContent,
  DrawerFooter,
  DrawerClose,
  DrawerTitle,
} from '@/components/ui/drawer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DrawerMenuProps } from '../types';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const DrawerMenu = ({ setIsOpen }: DrawerMenuProps) => {
  const pathname = usePathname();

  return (
    <DrawerContent>
      <DrawerTitle className="sr-only">Menu</DrawerTitle>
      <DrawerFooter>
        {pathname !== '/home' && (
          <DrawerClose asChild>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'rounded-full'
              )}
            >
              <HomeIcon />
              Voltar ao início
            </Link>
          </DrawerClose>
        )}
        <DrawerClose asChild>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => setIsOpen(true)}
          >
            <LogOut className="text-red-400" />
            Sair da conta
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
