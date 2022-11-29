import { useContext, createContext } from 'react';
import { RouteConfig } from '../Types';
import { BrowserRouter, Routes } from 'react-router-dom';

const RouteConfigContext = createContext<RouteConfig>([]);

export default RouteConfigContext;

export const useRouteConfigContext = () => useContext(RouteConfigContext);

export interface RouteConfigProviderProps {
  routes: RouteConfig;
  children?: React.ReactNode;
}

export const RouteProvider = (props: RouteConfigProviderProps) => {
  const { routes, children } = props;

  return <RouteConfigContext.Provider value={routes}>{children}</RouteConfigContext.Provider>;
};
