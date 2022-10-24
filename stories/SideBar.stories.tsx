import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MenuConfig, MenuNodeConfig } from '../src/Types';
import SideBar from '../src/SideBar';

export default {
  title: 'Example/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => {
  const [currentPath, setCurrentPath] = React.useState<string>(args.currentPath);
  const handleClickMenu = (_: React.SyntheticEvent, menu: MenuNodeConfig) => {
    if ((!menu.children || !menu.children.length) && menu.path) {
      setCurrentPath(menu.path);
    }
  };
  return (
    <Router>
      <SideBar {...args} currentPath={currentPath} onClickMenu={handleClickMenu} />
    </Router>
  );
};

const menus: MenuConfig = [
  {
    path: '/workplace',
    title: '工作区',
    children: [
      {
        path: '/workplace/taskes',
        title: '当前任务',
        icon: '',
      },
      {
        path: '/workplace/done',
        title: '已完成',
      },
    ],
  },
  {
    path: '/other',
    title: '其他',
    children: [
      {
        path: '/other/log',
        title: '日志',
        icon: '',
      },
      {
        path: '/other/remark',
        title: '备忘录',
      },
    ],
  },
];

export const Simple = Template.bind({});
Simple.args = {
  open: true,
  logo: '',
  logoText: 'test',
  menus: menus,
  currentPath: '/other/log',
};
