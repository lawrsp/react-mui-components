import { useContext, createContext } from 'react';
import { MenuConfig } from '../Types';

const MenuConfigContext = createContext<MenuConfig>([]);

export default MenuConfigContext;

export const useMenuConfigContext = () => useContext(MenuConfigContext);

export interface MenuConfigProviderProps {
  value: MenuConfig;
  children?: React.ReactNode;
}

export const MenuConfigProvider = (props: MenuConfigProviderProps) => {
  const { value, children } = props;

  return <MenuConfigContext.Provider value={value}>{children}</MenuConfigContext.Provider>;
};

export const useMenuConfig = () => {
  return useMenuConfigContext();
};
