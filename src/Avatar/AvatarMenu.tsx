import * as React from 'react';
import { IconButton, Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import { EasyMenu } from '../Menu';
import type { MenuConfig, MenuNodeConfig } from '../Menu/types';

export interface AvatarMenuProps {
  avatar?: string;
  menus: MenuConfig;
  onClickMenu: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
  sx: SxProps<Theme>;
}

export const AvatarMenu = (props: AvatarMenuProps) => {
  const { onClickMenu, avatar, menus, sx } = props;
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };
  const handleOpenMenu = (ev: React.SyntheticEvent) => {
    setAnchorEl(ev.currentTarget);
    setMenuOpen(true);
  };

  const handleClickMenu = (ev: React.SyntheticEvent, menu: MenuNodeConfig) => {
    onClickMenu(ev, menu);
    setMenuOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleOpenMenu}>
        {avatar && avatar.length ? (
          <Box
            sx={[{ width: '2.4rem', height: '2.4rem' }, ...(Array.isArray(sx) ? sx : [sx])]}
            component="img"
            src={avatar}
            alt="avatar-icon"
          />
        ) : (
          <AccountCircle
            sx={[{ width: '2.4rem', height: '2.4rem' }, ...(Array.isArray(sx) ? sx : [sx])]}
          />
        )}
      </IconButton>
      <EasyMenu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={menuOpen}
        onClose={handleCloseMenu}
        menus={menus}
        onClickMenu={handleClickMenu}
      />
    </div>
  );
};

export default AvatarMenu;
