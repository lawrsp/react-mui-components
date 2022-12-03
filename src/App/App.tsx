import { Suspense, ReactNode, useMemo } from 'react';
import { ThemeProvider, type Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider, SnackbarOrigin } from 'notistack';
import LoadingPage from '../LoadingPage';
import { createTheme } from '../Theme';
import { RouteProvider, type RouterType } from './RouteProvider';
import { MenuConfigContext } from '../Contexts/MenuConfigContext';
import type { MenuConfig, RouteConfig, RouteNodeConfig, MenuNodeConfig } from '../Contexts';

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

function normalizeRoutes(routes: RouteConfig, parent: string): RouteConfig {
  if (!routes || !routes.length) {
    return [] as RouteConfig;
  }

  return routes.reduce((all: RouteConfig, it: RouteNodeConfig) => {
    // 要么有path，要么是index
    let item: RouteNodeConfig;
    let { path, index, children } = it;
    if (path) {
      if (path[0] != '/') {
        if (parent[parent.length - 1] != '/') {
          path = `${parent}/${path}`;
        } else {
          path = `${parent}${path}`;
        }
      }
      item = { ...it, path };
    } else if (index) {
      item = { ...it, path: parent };
    } else if (children) {
      //
      return [...all, ...normalizeRoutes(children, parent)];
    }

    if (!it.element && !it.redirectTo) {
      item!.noLink = true;
    }

    if (children) {
      item!.children = normalizeRoutes(children, item!.path!);
    }

    return [...all, item!];
  }, [] as RouteConfig);
}

function reduceMenu(routes?: RouteConfig, parent?: string): MenuConfig {
  if (!routes || !routes.length) {
    return [] as MenuConfig;
  }

  return routes.reduce((all: MenuConfig, it: RouteNodeConfig, idx: number) => {
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
    } else {
      path = '';
    }

    //
    const menu: MenuNodeConfig = {
      title: it.title,
      icon: it.icon,
      key: it.id || path || `${idx}`,
      path: path,
    };

    menu.children = reduceMenu(it.children, path);

    return [...all, menu];
  }, [] as MenuConfig);
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
  const nroutes = useMemo(() => normalizeRoutes(routes, '/'), [routes]);

  return (
    <Suspense fallback={fallback}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider anchorOrigin={snackbarOrigin}>
          <MenuConfigContext.Provider value={menus}>
            <RouteProvider routes={nroutes} routerType={routerType} />
            {children}
          </MenuConfigContext.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default AppProvider;
