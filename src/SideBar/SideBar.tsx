import * as React from 'react';
import { Drawer, Box } from '@mui/material';
import { MenuNodeConfig, MenuConfig } from '../Types';
import NavMenu from './NavMenu';
import Brand from './Brand';

export interface SideBarProps {
  logo: string;
  logoText: string;
  menus: MenuConfig;
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
    open,
    indentSize = defaultIndentSize,
    currentPath,
    setCurrentPath,
  } = props;

  // 菜单link
  const handleClickSideMenu = (ev: React.SyntheticEvent, menu: MenuNodeConfig) => {
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
          width: (theme) => theme.sider.width,
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
