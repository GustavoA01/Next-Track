"use client";
import { ConfirmLogOut } from "../components/ConfirmLogOut";
import { ToolTipMenu } from "../components/ToolTipMenu";
import { DrawerMenu } from "../components/DrawerMenu";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";

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
        <ToolTipMenu profile={profile} setIsOpen={setIsConfirmLogoutOpen} />
        <DrawerMenu profile={profile} setIsOpen={setIsConfirmLogoutOpen} />
      </div>

      <Dialog open={isConfirmLogoutOpen} onOpenChange={setIsConfirmLogoutOpen}>
        <ConfirmLogOut />
      </Dialog>
    </>
  );
};
