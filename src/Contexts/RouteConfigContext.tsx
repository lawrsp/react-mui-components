import { useContext, createContext } from 'react';
import { RouteConfig } from '../Types';

const RouteConfigContext = createContext<RouteConfig>([]);

export default RouteConfigContext;

export const useRouteConfigContext = () => useContext(RouteConfigContext);

export interface RouteConfigProviderProps {
  routes: RouteConfig;
  children?: React.ReactNode;
}

export const RouteConfigProvider = (props: RouteConfigProviderProps) => {
  const { routes, children } = props;

  return <RouteConfigContext.Provider value={routes}>{children}</RouteConfigContext.Provider>;
};
