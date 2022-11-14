import * as React from 'react';
// import { useHistory } from 'react-router-dom';
import { MenuItem, Menu, ListItemText, ListItemIcon } from '@mui/material';
import { MenuNodeConfig } from '../Types';

export interface AvatarMenuProps {
  anchorEl?: null | Element | ((element: Element) => Element);
  open: boolean;
  onClose: React.MouseEventHandler;
  menus: MenuNodeConfig[];
  onClickMenu: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
}

interface AvatarMenuItemProps {
  menu: MenuNodeConfig;
  onClick: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
}

const AvatarMenuItem = (props: AvatarMenuItemProps) => {
  const { menu, onClick } = props;
  return (
    <MenuItem onClick={(ev) => onClick(ev, menu)}>
      {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
      <ListItemText>{menu.title}</ListItemText>
    </MenuItem>
  );
};

const AvatarMenu = (props: AvatarMenuProps) => {
  const { anchorEl, open, onClose, menus, onClickMenu } = props;

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      keepMounted
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {menus.map((item, idx) => (
        <AvatarMenuItem key={idx} menu={item} onClick={onClickMenu} />
      ))}
    </Menu>
  );
};

export default AvatarMenu;
