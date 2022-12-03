import * as React from 'react';
import { IconButton, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { EasyMenu } from '../Menu';
import type { MenuConfig, MenuNodeConfig } from '../Contexts';

export interface AvatarItemProps {
  avatar?: string;
  menus: MenuConfig;
  onClickMenu: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
}

const AvatarItem = (props: AvatarItemProps) => {
  const { onClickMenu, avatar, menus } = props;
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
            sx={{ width: '2.4rem', height: '2.4rem' }}
            component="img"
            src={avatar}
            alt="avatar-icon"
          />
        ) : (
          <AccountCircle />
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

export default AvatarItem;
