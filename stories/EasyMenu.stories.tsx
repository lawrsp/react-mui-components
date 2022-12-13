import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EasyMenu from '../src/Menu/EasyMenu';
import { MenuConfig, MenuNodeConfig } from '../src/Menu';
import { Button } from '@mui/material';

export default {
  title: 'Example/EasyMenu',
  component: EasyMenu,
} as ComponentMeta<typeof EasyMenu>;

const Template: ComponentStory<typeof EasyMenu> = (args) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const onClose = () => {
    setOpen(false);
  };

  const handleClickMenu = (_: React.SyntheticEvent, menu: MenuNodeConfig) => {
    console.log('clicked:', menu);
    setOpen(false);
  };
  return (
    <div>
      <Button
        ref={setAnchorEl}
        variant="outlined"
        color="primary"
        onClick={() => setOpen((o) => !o)}
      >
        toggle
      </Button>
      <EasyMenu
        {...args}
        anchorEl={anchorEl}
        open={open}
        onClickMenu={handleClickMenu}
        onClose={onClose}
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
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  transformOrigin: { vertical: 'top', horizontal: 'center' },
};
