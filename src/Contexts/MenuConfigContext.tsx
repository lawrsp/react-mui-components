import { useContext, createContext } from 'react';

export interface MenuNodeConfig {
  title: string;
  path: string;
  icon?: string;
  key?: string;
  children?: MenuNodeConfig[];
}

export type MenuConfig = MenuNodeConfig[];

export const MenuConfigContext = createContext<MenuConfig>([]);

export default MenuConfigContext;

export const useMenuConfig = () => useContext(MenuConfigContext);
