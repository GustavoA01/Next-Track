export type MenuOptionsProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
};

export type ToolTipMenuProps = {
  setIsOpen: (isOpen: boolean) => void;
  showBackButton: boolean;
};

export type DrawerMenuProps = ToolTipMenuProps;

export type ProfileMenuTriggerProps = {
  profile: {
    images: { url: string }[];
    display_name: string | null;
  };
  className?: string;
};
