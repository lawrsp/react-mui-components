import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { useLocation, useMatch } from 'react-router-dom';
import { MainLayout, RoutedMainLayout } from '../src/MainLayout';
import type { MenuConfig } from '../src/Menu/types';
import type { AccessType, RouteConfig } from '../src/Route/types';
import { RouteProvider } from '../src/Route/RouteProvider';
import logo from './logo.svg';

export default {
  title: 'Example/MainLayout',
  component: MainLayout,
} as ComponentMeta<typeof MainLayout>;

export const Simple = () => {
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
  const [currentMenuPath, setCurrentMenuPath] = React.useState('/user/list');

  return (
    <MainLayout
      logo={logo}
      logoText="Test For Main"
      menus={menus}
      currentMenuPath={currentMenuPath}
      setCurrentMenuPath={setCurrentMenuPath}
    >
      <div>{currentMenuPath} </div>
    </MainLayout>
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

export const WithRouter = () => {
  const routes: RouteConfig = [
    {
      path: '/',
      title: 'main',
      noMenu: true,
      element: <RoutedMainLayout logo={logo} logoText="Test For Main" />,
      children: [
        {
          index: true,
          noMenu: true,
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

  return <RouteProvider routes={routes} routerType="hash" />;
};

export const WithRouterAndAccess = () => {
  const routes: RouteConfig = [
    {
      path: '/',
      title: 'main',
      noMenu: true,
      element: <RoutedMainLayout logo={logo} logoText="Test For Main" />,
      children: [
        {
          index: true,
          noMenu: true,
          redirectTo: '/user/list',
        },
        {
          path: 'user',
          title: 'user',
          children: [
            {
              path: 'list',
              title: 'list',
              access: { user: 'list' },
              element: <ElementTest />,
            },
            {
              title: 'detail',
              path: 'detail',
              access: { user: 'detail' },
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
              access: { entities: 'list' },
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
          element: <ElementTest name="not found admin page" />,
        },
      ],
    },
    {
      path: '/login',
      title: 'login',
      element: <ElementTest name="login" />,
    },
    {
      path: '*',
      title: 'not found',
      noMenu: true,
      element: <ElementTest name="not found" />,
    },
  ];

  const checkAccess = React.useCallback((access?: AccessType) => {
    if (!access) {
      return true;
    }

    if ('user' in access) {
      if (typeof access.user === 'string') {
        if ('list' === access.user) {
          return true;
        }
      }
      return false;
    }

    return false;
  }, []);

  return <RouteProvider routes={routes} routerType="hash" checkAccess={checkAccess} />;
};
