import * as React from 'react';
import { BrowserRouter, Routes, Route, HashRouter, MemoryRouter, Navigate } from 'react-router-dom';
import { RouteConfigContext } from './RouteConfigContext';
import type { RouteConfig, RouteNodeConfig } from './types';

export type RouterType = 'hash' | 'browser' | 'memory';

export interface RouteConfigProviderProps {
  basename?: string;
  routes: RouteConfig;
  routerType?: RouterType;
  children?: React.ReactNode;
  checkAccess?: (access?: string) => boolean;
}

export type RouteRenderProps = {
  routes: RouteConfig;
  routerType?: RouterType;
};

function normalizeRoutes(
  routes: RouteConfig,
  parent: string,
  checkAccess?: (access?: string) => boolean
): RouteConfig {
  if (!routes || !routes.length) {
    return [] as RouteConfig;
  }

  return routes.reduce((all: RouteConfig, it: RouteNodeConfig) => {
    if (checkAccess && !checkAccess(it.access)) {
      return all;
    }

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
      return [...all, ...normalizeRoutes(children, parent, checkAccess)];
    }

    if (!it.element && !it.redirectTo) {
      item!.noLink = true;
    }

    if (children && children.length) {
      const normaledChildren = normalizeRoutes(children, item!.path!, checkAccess);
      if (!normaledChildren || !normaledChildren.length) {
        return all;
      }
      item!.children = normaledChildren;
    }

    return [...all, item!];
  }, [] as RouteConfig);
}

const renderFullRoutes = (routes?: RouteConfig) => {
  if (!routes || !routes.length) {
    return undefined;
  }
  // console.log('routes is ', routes);
  const result = routes.map((node: RouteNodeConfig, idx: number) => {
    const { path, key } = node;

    let { element, redirectTo } = node;

    if (redirectTo) {
      element = <Navigate to={redirectTo} replace />;
    }

    if (node.index) {
      return <Route key={key || path || idx} element={element} index />;
    }

    return (
      <Route key={key || path || idx} path={path} element={element}>
        {renderFullRoutes(node.children)}
      </Route>
    );
  });

  if (result.length) {
    return result;
  }

  return undefined;
};

const routerComponent = {
  hash: HashRouter,
  memory: MemoryRouter,
  browser: BrowserRouter,
};

export const RouteProvider = (props: RouteConfigProviderProps) => {
  const { basename, routes, routerType = 'browser', checkAccess, children } = props;

  const nRoutes = React.useMemo(() => {
    return normalizeRoutes(routes, '/', checkAccess);
  }, [routes, checkAccess]);

  const Router = routerComponent[routerType];

  return (
    <RouteConfigContext.Provider value={nRoutes}>
      <Router basename={basename}>
        <Routes>{renderFullRoutes(nRoutes)}</Routes>
      </Router>
      {children}
    </RouteConfigContext.Provider>
  );
};
