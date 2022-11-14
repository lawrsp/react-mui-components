import * as React from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RouteConfigContext from '../Contexts/RouteConfigContext';
import SideBar from '../SideBar';
import HeaderBar from '../HeaderBar';
import { RouteConfig, MenuConfig, MenuNodeConfig } from '../Types';

export interface MainLayoutProps {
  logo: string;
  logoText: string;
  avatarMenus: MenuConfig;
  footer?: React.ReactNode;
  onClickAvatarMenu?: (ev: React.SyntheticEvent, menu: MenuNodeConfig) => void;
  children?: React.ReactNode;
}

function reduceMenu(routes: RouteConfig): MenuConfig {
  if (!routes.length) {
    return [];
  }

  return routes.reduce<MenuConfig>((all, it) => {
    // 如果没有名字，表示不在菜单里显示，直接将其children提升
    if (!it.title || it.hideInMenu) {
      if (it.children && it.children.length) {
        return [...all, ...reduceMenu(it.children)];
      }
      return [...all];
    }

    const next = {
      path: it.path,
      title: it.title,
      icon: it.icon,
      authority: it.authority,
      children: it.children ? reduceMenu(it.children) : [],
    };

    return [...all, next];
  }, []);
}

// menu here
export const MainLayout = ({
  logo,
  logoText,
  footer,
  avatarMenus,
  onClickAvatarMenu,
  children,
}: MainLayoutProps) => {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const routeConfig = React.useContext(RouteConfigContext);
  /* const classes = useLayoutStyles(props); */
  const location = useLocation();
  const navigate = useNavigate();
  // console.log('============= locationis', location);

  const menus = React.useMemo(() => reduceMenu(routeConfig), [routeConfig]);

  /* <Box className={classes.root}> */
  /* SideBar className={clsx(classes.drawer, { [classes.drawerOpen]: drawerOpen })} */
  /* HeaderBar className={clsx(classes.header, { [classes.drawerOpen]: drawerOpen })} */
  /* main className={clsx(classes.main, { [classes.drawerOpen]: drawerOpen })} */

  const handleClickSideMenu = (ev: React.SyntheticEvent, menu: MenuNodeConfig) => {
    ev.preventDefault();
    if (menu.path && !menu.children?.length) {
      navigate(menu.path);
    }
  };

  const handleClickAvarMenu = (ev: React.SyntheticEvent, menu: MenuNodeConfig) => {
    ev.preventDefault();
    if (onClickAvatarMenu) {
      return onClickAvatarMenu(ev, menu);
    }
    if (menu.path && !menu.children?.length) {
      navigate(menu.path);
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
        onClickMenu={handleClickSideMenu}
        currentPath={location.pathname}
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
          key={location.key}
          component="main"
          sx={{
            flexGrow: 1,
            height: (theme) => `calc(100% - ${theme.footer.height})`,
          }}
        >
          <Outlet />
          {children}
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
    </Box>
  );
};

export default MainLayout;
