import * as React from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
import { MenuConfig, MenuNodeConfig } from '../Types';
import { useMenuConfig } from '../App/MenuConfigContext';

export type PathManager = [string, (to: string) => void];

export interface MainLayoutProps {
  logo: string;
  logoText: string;
  avatarMenus: MenuConfig;
  footer?: React.ReactNode;
  onClickAvatarMenu?: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
  children?: React.ReactNode;
  usePathManager?: () => PathManager;
  useMenus?: () => MenuConfig;
}

const useRouteManager = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const setCurrentkey = navigate;

  return [currentPath, setCurrentkey] as PathManager;
};

export const MainLayout = ({
  logo,
  logoText,
  footer,
  avatarMenus,
  children,
  usePathManager = useRouteManager,
  useMenus = useMenuConfig,
}: MainLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const menus = useMenus();

  const [currentPath, setCurrentPath] = usePathManager();

  const handleClickAvarMenu = (ev: React.SyntheticEvent, menu: MenuNodeConfig) => {
    ev.preventDefault();
    if (menu.path && !menu.children?.length) {
      setCurrentPath(menu.path);
    }
  };

  const handleClickLogout = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    console.log('==== logout');
  };

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
        currentPath={currentPath}
        setCurrentPath={setCurrentPath}
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
            width: (theme) => `calc(100% - ${theme.sider.width})`,
            marginLeft: (theme) => theme.sider.width,
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
          menus={avatarMenus}
          onClickMenu={handleClickAvarMenu}
          onLogout={handleClickLogout}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: (theme) => `calc(100% - ${theme.footer.height})`,
          }}
        >
          <Outlet />
        </Box>
        {footer ? (
          <Box
            component="footer"
            sx={{
              flexShrik: 0,
              height: (theme) => theme.footer.height,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {footer}
          </Box>
        ) : null}
      </Box>
      {children}
    </Box>
  );
};

export default MainLayout;
