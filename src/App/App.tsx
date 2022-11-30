import { Suspense, ReactNode } from 'react';
import { ThemeProvider, type Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import { MenuConfigProvider } from './MenuConfigContext';
import { MenuConfig, RouteConfig, MenuNodeConfig } from '../Types';
import LoadingPage from '../LoadingPage';
import { createTheme } from '../Theme';
import { RouteProvider, type RouterType } from './RouteProvider';

const snackbarOriginDefault: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'center',
};

export interface AppProps {
  theme?: Theme;
  fallback?: ReactNode;
  routes?: RouteConfig;
  snackbarOrigin?: SnackbarOrigin;
  routerType?: RouterType;
  children?: ReactNode;
}

function reduceMenu(routes?: RouteConfig, parent?: string): MenuConfig {
  if (!routes || !routes.length) {
    return [];
  }

  return routes.reduce<MenuConfig>((all, it, idx) => {
    // 如果没有名字，表示不在菜单里显示，直接将其children提升
    if (!it.title || it.noMenu || (!it.path && !it.index)) {
      return [...all, ...reduceMenu(it.children)];
    }

    // 要么有path，要么是index
    let { path, index } = it;
    if (path) {
      if (path[0] != '/') {
        if (parent) {
          path = `${parent}/${path}`;
        } else {
          path = `/${path}`;
        }
      }
    } else if (index) {
      path = parent || '/';
    }

    //
    const menu: MenuNodeConfig = {
      title: it.title,
      icon: it.icon,
      key: it.key || path || `${idx}`,
      path: path,
    };

    menu.children = reduceMenu(it.children, path);

    return [...all, menu];
  }, []);
}

export function AppProvider({
  fallback = <LoadingPage />,
  theme = createTheme(),
  routes = [],
  snackbarOrigin = snackbarOriginDefault,
  routerType,
  children,
}: AppProps) {
  // menu
  const menus = reduceMenu(routes);
  /* console.log('menus:', menus); */
  // routes

  return (
    <Suspense fallback={fallback}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={snackbarOrigin}>
          <MenuConfigProvider value={menus}>
            <RouteProvider routes={routes} routerType={routerType} />
            {children}
          </MenuConfigProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default AppProvider;
