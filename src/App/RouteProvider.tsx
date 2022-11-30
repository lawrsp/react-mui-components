import { useContext, createContext } from 'react';
import { BrowserRouter, Routes, Route, HashRouter, MemoryRouter } from 'react-router-dom';
import { RouteConfig } from '../Types';

const RouteConfigContext = createContext<RouteConfig>([]);

export default RouteConfigContext;

export const useRouteConfigContext = () => useContext(RouteConfigContext);

export type RouterType = 'hash' | 'browser' | 'memory';

export interface RouteConfigProviderProps {
  routes: RouteConfig;
  routerType?: RouterType;
  children?: React.ReactNode;
}

export type RouteRenderProps = {
  routes: RouteConfig;
  routerType?: RouterType;
};

const renderFullRoutes = (routes: RouteConfig) => {
  // console.log('routes is ', routes);
  const result = routes
    .map((node) => {
      const { path, element, id } = node;

      if (node.index) {
        return <Route key={id || path} path={path} element={element} index />;
      }

      return (
        <Route key={id || path} path={path} element={element}>
          {node.children && node.children.length > 0 && renderFullRoutes(node.children)}
        </Route>
      );
    })
    .filter((x) => x);

  // console.log('===RoutesRender', routes, result);

  if (result.length) {
    return result;
  }

  return null;
};

const routerComponent = {
  hash: HashRouter,
  memory: MemoryRouter,
  browser: BrowserRouter,
};

export const RouteProvider = (props: RouteConfigProviderProps) => {
  const { routes, routerType = 'browser', children } = props;

  const Router = routerComponent[routerType];

  return (
    <RouteConfigContext.Provider value={routes}>
      <Router>
        <Routes>{renderFullRoutes(routes)}</Routes>
      </Router>
      {children}
    </RouteConfigContext.Provider>
  );
};
