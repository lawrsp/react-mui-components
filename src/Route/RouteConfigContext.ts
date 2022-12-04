import { useContext, createContext } from 'react';
import type { RouteConfig } from './types';

export const RouteConfigContext = createContext<RouteConfig>([]);

export default RouteConfigContext;

export const useRouteConfig = () => useContext(RouteConfigContext);
