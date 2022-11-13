import React from 'react';
import { IconButton, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { EasyMenu, EasyMenuItem } from '../Menu';
import { MenuConfig, MenuNodeConfig } from '../Types';

export interface AvatarItemProps {
  avatar?: string;
  menus: MenuNodeConfig[];
  onClickMenu: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
  onLogout: (ev: React.SyntheticEvent) => void;
}

const AvatarItem = (props: AvatarItemProps) => {
  const { onClickMenu, avatar, onLogout } = props;
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

  const handleClickLogout = (ev: React.SyntheticEvent) => {
    onLogout(ev);
    setMenuOpen(false);
  };

  const [menus, logoutMenu] = React.useMemo(() => {
    const lm: MenuNodeConfig = { title: '退出登录' };
    const mus: MenuConfig = [];
    props.menus.forEach((item) => {
      if (item.key === 'logout') {
        lm.icon = item.icon;
        lm.title = item.title || lm.title;
      } else {
        mus.push(item);
      }
    });
    return [mus, lm];
  }, [props.menus]);

  /* color={color} */

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
      >
        <EasyMenuItem icon={logoutMenu.icon} title={logoutMenu.title} onClick={handleClickLogout} />
      </EasyMenu>
    </div>
  );
};

export default AvatarItem;
