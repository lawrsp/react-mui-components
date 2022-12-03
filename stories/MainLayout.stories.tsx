import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { useLocation, useMatch } from 'react-router-dom';
import { MainLayout } from '../src/Layouts';
import AppProvider from '../src/App/App';
import logo from './logo.svg';
import type { MenuConfig, RouteConfig } from '../src/Contexts';

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
  const useRouteConfig = () => {
    return [
      {
        path: '/user',
        title: 'user',
        noLink: true,
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
    ] as RouteConfig;
  };

  return (
    <MainLayout
      logo={logo}
      logoText="Test For Main"
      avatarMenus={[]}
      usePathManager={React.useState}
      useMenus={useMenus}
      useRouteConfig={useRouteConfig}
    />
  );
};

const ElementTest = ({ name }: { name?: string }) => {
  const location = useLocation();
  const matches = useMatch(location.pathname);
  return (
    <div>
      {JSON.stringify(location)}
      <br />
      {name}
      <br />
      {JSON.stringify(matches)}
    </div>
  );
};

export const MainWithAppRouter = () => {
  const routes: RouteConfig = [
    {
      path: '/',
      title: 'main',
      noMenu: true,
      element: <MainLayout logo={logo} logoText="Test For Main" avatarMenus={[]} />,
      children: [
        {
          index: true,
          redirectTo: '/user/list',
        },
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
          id: 'hellow',
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
