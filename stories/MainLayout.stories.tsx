import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import EasyMenu from '../src/Menu/EasyMenu';
import { MenuConfig, MenuNodeConfig } from '../src/Types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../src/Layouts';
import { Button } from '@mui/material';
import logo from './logo.svg';

export default {
  title: 'Example/Layouts',
  component: EasyMenu,
} as ComponentMeta<typeof EasyMenu>;

export const Main = (args) => {
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
    <Router>
      <Routes>
        <Route
          path="*"
          element={<MainLayout logo={logo} logoText="Test For Main" avatarMenus={[]} />}
        />
      </Routes>
    </Router>
  );
};
