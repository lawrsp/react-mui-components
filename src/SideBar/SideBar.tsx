import * as React from 'react';
import { Drawer, Box } from '@mui/material';
import type { NavMenuNodeConfig, NavMenuConfig } from '../Menu/types';
import NavMenu from './NavMenu';
import Brand from './Brand';

export interface SideBarProps {
  logo: string;
  logoText: string;
  menus: NavMenuConfig;
  width: number | string;
  open?: boolean;
  indentSize?: number;
  handleDrawerToggle?: () => {};
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const defaultIndentSize = 24;

export const SideBar = (props: SideBarProps) => {
  const {
    logo,
    logoText,
    menus,
    width,
    open,
    indentSize = defaultIndentSize,

    currentPath,
    setCurrentPath,
  } = props;

  // 菜单link
  const handleClickSideMenu = (ev: React.SyntheticEvent, menu: NavMenuNodeConfig) => {
    ev.preventDefault();
    if (menu.path && !menu.children?.length) {
      setCurrentPath(menu.path);
    }
  };

  return (
    <Drawer
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        background: '#001529',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          background: '#001529',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={props.handleDrawerToggle}
    >
      <Box
        sx={[
          {
            display: 'flex',
            alignItems: 'center',
            background: '#002140',
          },
          (theme) => theme.mixins.toolbar,
        ]}
      >
        <Brand logo={logo} text={logoText} onClick={() => setCurrentPath('/')} />
      </Box>
      <Box
        sx={{
          mx: 0,
          my: 2,
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <NavMenu
          indentSize={indentSize}
          menus={menus}
          currentPath={currentPath}
          onClickMenu={handleClickSideMenu}
        />
      </Box>
    </Drawer>
  );
};

export default SideBar;
