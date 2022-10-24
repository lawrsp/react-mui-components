import React from 'react';
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
  onClickMenu: (ev: React.SyntheticEvent, item: MenuNodeConfig) => void;
}

const defaultIndentSize = 24;

const SideBar = (props: SideBarProps) => {
  const {
    logo,
    logoText,
    menus,
    open,
    indentSize = defaultIndentSize,
    currentPath,
    onClickMenu,
  } = props;

  // 菜单link

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
        <Brand logo={logo} text={logoText} />
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
          onClickMenu={onClickMenu}
        />
      </Box>
    </Drawer>
  );
};

export default SideBar;
