import { Button } from '../../../components/ui/button';
import { HomeIcon, LogOut } from 'lucide-react';
import { TooltipContent } from '../../../components/ui/tooltip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ToolTipMenuProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export const ToolTipMenu = ({ setIsOpen }: ToolTipMenuProps) => {
  const pathname = usePathname();

  return (
    <TooltipContent className="mt-2 bg-black/70 backdrop-blur-sm p-1 flex flex-col gap-1">
      {pathname !== '/home' && (
        <Button variant="ghost" className="text-muted-foreground bg-background">
          <Link href="/" className="flex gap-2 items-center">
            <HomeIcon className="text-primary" />
            Voltar ao início
          </Link>
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="text-muted-foreground bg-background"
      >
        <LogOut className="text-red-400" />
        Sair da conta
      </Button>
    </TooltipContent>
  );
};
