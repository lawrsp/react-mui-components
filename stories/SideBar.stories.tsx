import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteConfig } from '../src/Route';
import SideBar from '../src/SideBar';

export default {
  title: 'Example/SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => {
  const [currentPath, setCurrentPath] = React.useState<string>(args.currentPath);

  return (
    <Router>
      <SideBar {...args} currentPath={currentPath} setCurrentPath={setCurrentPath} />
    </Router>
  );
};

const menus: RouteConfig = [
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
  logoText: 'test',
  logo: '/stories/logo.svg',
  menus: menus,
  currentPath: '/other/log',
  width: 300,
};
