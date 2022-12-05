import { useContext, createContext, useMemo, useCallback } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import type { RouteConfig, RouteNodeConfig } from '../Route/types';
import type { NavMenuConfig, NavMenuNodeConfig } from '../Menu/types';
import MainLayout, { type MainLayoutProps } from './MainLayout';
import { useRouteConfig } from '../Route/RouteConfigContext';
import Breadcrumbs from './Breadcrumbs';

const RouteMenuConfigContext = createContext<NavMenuConfig>([]);

export const useRouteMenuConfig = () => useContext(RouteMenuConfigContext);

function reduceMenu(routes?: RouteConfig, parent?: string): NavMenuConfig {
  if (!routes || !routes.length) {
    return [] as NavMenuConfig;
  }

  return routes.reduce((all: NavMenuConfig, it: RouteNodeConfig, idx: number) => {
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
    const menu: NavMenuNodeConfig = {
      title: it.title,
      icon: it.icon,
      key: it.key || path || `${idx}`,
      path: path,
    };

    if (it.children && it.children.length) {
      const mChildren = reduceMenu(it.children, path);
      if (!mChildren || !mChildren.length) {
        return all;
      }
      menu.children = mChildren;
    }

    return [...all, menu];
  }, [] as NavMenuConfig);
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
