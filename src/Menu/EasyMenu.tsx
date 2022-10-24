import React, { MouseEventHandler } from 'react';
import { MenuItem, Menu, ListItemText, ListItemIcon, MenuProps } from '@mui/material';
import { MenuNodeConfig } from 'Types';

export interface EasyMenuProps {
  anchorEl?: null | Element | ((element: Element) => Element);
  open: boolean;
  onClose: MouseEventHandler;
  menus: MenuNodeConfig[];
  onClickMenu: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
  anchorOrigin?: MenuProps['anchorOrigin'];
  transformOrigin?: MenuProps['transformOrigin'];
  children?: React.ReactNode;
}

interface EasyMenuItemProps {
  icon?: string | React.ReactNode;
  title?: string;
  onClick: (ev: React.SyntheticEvent) => void;
}

export const EasyMenuItem = (props: EasyMenuItemProps) => {
  const { icon, title, onClick } = props;
  return (
    <MenuItem onClick={onClick}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{title}</ListItemText>
    </MenuItem>
  );
};

const EasyMenu = (props: EasyMenuProps) => {
  const { anchorEl, open, onClose, menus, onClickMenu, anchorOrigin, transformOrigin, children } =
    props;

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      keepMounted
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {menus.map((item, idx) => (
        <EasyMenuItem
          key={idx}
          icon={item.icon}
          title={item.title}
          onClick={(ev: React.SyntheticEvent) => onClickMenu(ev, item)}
        />
      ))}
      {children}
    </Menu>
  );
};

export default EasyMenu;
