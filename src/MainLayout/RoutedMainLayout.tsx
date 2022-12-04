import { useContext, createContext, useMemo, useCallback } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import type { RouteConfig, RouteNodeConfig } from '../Route/types';
import type { MenuConfig, MenuNodeConfig } from '../Menu/types';
import MainLayout, { type MainLayoutProps } from './MainLayout';
import { useRouteConfig } from '../Route/RouteConfigContext';
import Breadcrumbs from './Breadcrumbs';

const RouteMenuConfigContext = createContext<MenuConfig>([]);

export const useRouteMenuConfig = () => useContext(RouteMenuConfigContext);

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

export type RoutedMainLayoutProps = Omit<
  MainLayoutProps,
  'menus' | 'currentMenuPath' | 'setCurrentMenuPath'
>;

export function RoutedMainLayout(props: RoutedMainLayoutProps) {
  const { children, ...rest } = props;
  const routes = useRouteConfig();
  const menus = useMemo(() => reduceMenu(routes), [routes]);
  const location = useLocation();
  const navigate = useNavigate();
  const setCurrentMenuPath = useCallback((to: string) => {
    navigate(to);
  }, []);

  return (
    <MainLayout
      menus={menus}
      currentMenuPath={location.pathname}
      setCurrentMenuPath={setCurrentMenuPath}
      {...rest}
    >
      <Breadcrumbs
        currentPath={location.pathname}
        setCurrentPath={setCurrentMenuPath}
        routes={routes}
      />
      <Outlet />
      {children}
    </MainLayout>
  );
}
