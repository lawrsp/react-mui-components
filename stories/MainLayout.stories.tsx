import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { useLocation } from 'react-router-dom';
import { MenuConfig, RouteConfig } from '../src/Types';
import { MainLayout } from '../src/Layouts';
import AppProvider from '../src/App/App';
import logo from './logo.svg';

export default {
  title: 'Example/Layouts',
  component: MainLayout,
} as ComponentMeta<typeof MainLayout>;

export const Main = () => {
  const menus: MenuConfig = [
    {
      path: '/user',
      title: 'user',
      children: [
        {
          path: '/user/list',
          title: 'list',
        },
        {
          path: '/user/detail',
          title: 'detail',
        },
      ],
    },
    {
      path: '/entities',
      title: 'entities',
    },
    {
      path: '/login',
      title: 'login',
    },
  ];

  const useMenus = () => menus;

  return (
    <MainLayout
      logo={logo}
      logoText="Test For Main"
      avatarMenus={[]}
      usePathManager={React.useState}
      useMenus={useMenus}
    />
  );
};

const ElementTest = ({ name }: { name?: string }) => {
  const location = useLocation();
  return (
    <div>
      {JSON.stringify(location)}
      {'\n'}
      {name}
    </div>
  );
};

export const MainWithAppRouter = () => {
  const routes: RouteConfig = [
    {
      path: '/',
      element: <MainLayout logo={logo} logoText="Test For Main" avatarMenus={[]} />,
      children: [
        {
          path: 'user',
          title: 'user',
          children: [
            {
              path: 'list',
              title: 'list',
              element: <ElementTest />,
            },
            {
              title: 'detail',
              path: 'detail',
              element: <ElementTest name="test" />,
            },
          ],
        },
        {
          path: '/entities',
          title: 'entities',
          children: [
            {
              title: 'list',
              index: true,
              id: 'list-entities',
              element: <ElementTest name="test index" />,
            },
          ],
        },
        {
          key: 'hellow',
          path: '*',
          noMenu: true,
          title: 'not found',
          element: <ElementTest name="not found" />,
        },
      ],
    },
    {
      path: '/login',
      title: 'login',
      element: <ElementTest />,
    },
  ];

  return <AppProvider routes={routes} routerType="hash" />;
};
