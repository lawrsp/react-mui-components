import * as React from 'react';
import { ComponentStory } from '@storybook/react';
import { MenuConfig } from '../src/Menu';
import TopBar from '../src/HeaderBar/HeaderBar';
import AvatarMenu from '../src/Avatar/AvatarMenu';

export default {
  title: 'Example/HeaderBar',
  component: TopBar,
};

const Template: ComponentStory<typeof TopBar> = ({ avatar, ...args }) => {
  const [toggled, setToggled] = React.useState(false);
  const onToggle = () => {
    setToggled((x) => !x);
  };

  return (
    <div style={{ backgroundColor: 'blue', height: '300px', width: '100%' }}>
      <TopBar
        {...args}
        avatar={<AvatarMenu avatar={avatar as string} menus={[]} onClickMenu={() => {}} />}
        toggled={toggled}
        onToggle={onToggle}
      />
    </div>
  );
};

const menus: MenuConfig = [
  {
    key: '/workplace/taskes',
    title: '当前任务',
    icon: '',
  },
  {
    key: '/workplace/done',
    title: '已完成',
    children: [],
  },
  {
    key: '/other/log',
    title: '日志',
    icon: '',
  },
  {
    key: '/other/remark',
    title: '备忘录',
  },
];

export const Simple = Template.bind({});
Simple.args = {
  menus: menus,
  avatar: '/stories/logo.svg',
};
