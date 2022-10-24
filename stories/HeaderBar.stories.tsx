import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuConfig, MenuNodeConfig } from '../src/Types';
import TopBar from '../src/HeaderBar/HeaderBar';

export default {
  title: 'Example/HeaderBar',
  component: TopBar,
} as ComponentMeta<typeof TopBar>;

const Template: ComponentStory<typeof TopBar> = (args) => {
  const [toggled, setToggled] = React.useState(false);
  const onToggle = () => {
    setToggled((x) => !x);
  };

  const handleClickMenu = (_: React.SyntheticEvent, menu: MenuNodeConfig) => {
    console.log('clicked:', menu);
    setToggled(false);
  };
  return (
    <div style={{ backgroundColor: 'blue', height: '300px', width: '100%' }}>
      <TopBar {...args} toggled={toggled} onClickMenu={handleClickMenu} onToggle={onToggle} />
    </div>
  );
};

const menus: MenuConfig = [
  {
    path: '/workplace/taskes',
    title: '当前任务',
    icon: '',
  },
  {
    path: '/workplace/done',
    title: '已完成',
    children: [],
  },
  {
    path: '/other/log',
    title: '日志',
    icon: '',
  },
  {
    path: '/other/remark',
    title: '备忘录',
  },
];

export const Simple = Template.bind({});
Simple.args = {
  menus: menus,
  avatar:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
};
