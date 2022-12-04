import * as React from 'react';
import { Box, useTheme } from '@mui/material';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
import type { MenuConfig } from '../Menu/types';

export interface MainLayoutProps {
  logo: string;
  logoText: string;
  menus: MenuConfig;
  currentMenuPath: string;
  setCurrentMenuPath: (to: string) => void;
  // elements:
  avatar?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const MainLayout = ({
  logo,
  logoText,
  footer,
  menus,
  avatar,
  currentMenuPath,
  setCurrentMenuPath,
  children,
}: MainLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <SideBar
        logo={logo}
        logoText={logoText}
        menus={menus}
        open={drawerOpen}
        width={theme.mainLayout.sider.width}
        currentPath={currentMenuPath}
        setCurrentPath={setCurrentMenuPath}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: '100%',
          height: '100%',
          overflowY: 'hidden',
          overflowX: 'auto',
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(drawerOpen && {
            width: (theme) => `calc(100% - ${theme.mainLayout.sider.width})`,
            marginLeft: (theme) => theme.mainLayout.sider.width,
            transition: (theme) =>
              theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <HeaderBar
          sx={{
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
            flexShrik: 0,
            position: 'relative',
          }}
          toggled={drawerOpen}
          onToggle={() => setDrawerOpen((x) => !x)}
          avatar={avatar}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: (theme) => `calc(100% - ${theme.mainLayout.footer.height})`,
            pl: 2,
          }}
        >
          {children}
        </Box>
        {footer ? (
          <Box
            component="footer"
            sx={{
              flexShrik: 0,
              height: (theme) => theme.mainLayout.footer.height,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {footer}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default MainLayout;
