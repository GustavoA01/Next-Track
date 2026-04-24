export type MenuOptionsProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
};

export type ToolTipMenuProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export type ProfileMenuTriggerProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
  className?: string;
};

export type DrawerMenuProps = {
  setIsOpen: (isOpen: boolean) => void;
};
