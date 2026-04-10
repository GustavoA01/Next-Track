'use client';
import { ConfirmLogOut } from '../components/ConfirmLogOut';
import { ToolTipMenu } from '../components/ToolTipMenu';
import { DrawerMenu } from '../components/DrawerMenu';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { ProfileMenuTrigger } from '../components/ProfileMenuTrigger';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';

type MenuOptionsProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
};

export const MenuOptions = ({ profile }: MenuOptionsProps) => {
  const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);

  return (
    <>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger>
            <ProfileMenuTrigger profile={profile} className="hidden sm:block" />
          </TooltipTrigger>
          <ToolTipMenu setIsOpen={setIsConfirmLogoutOpen} />
        </Tooltip>

        <Drawer>
          <DrawerTrigger>
            <ProfileMenuTrigger profile={profile} className="sm:hidden" />
          </DrawerTrigger>
          <DrawerMenu setIsOpen={setIsConfirmLogoutOpen} />
        </Drawer>
      </div>

      <Dialog open={isConfirmLogoutOpen} onOpenChange={setIsConfirmLogoutOpen}>
        <ConfirmLogOut />
      </Dialog>
    </>
  );
};
