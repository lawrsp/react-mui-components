import React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';
import AvatarItem, { AvatarItemProps } from './AvatarItem';

type HeaderBarProps = {
  toggled: boolean;
  onToggle: React.MouseEventHandler;
  sx: SxProps<Theme>;
} & AvatarItemProps;

export default function HeaderBar(props: HeaderBarProps) {
  const { toggled, onToggle, sx, ...rest } = props;

  return (
    <AppBar
      sx={[
        {
          bgcolor: 'background.paper',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      color="default"
      elevation={0}
    >
      <Toolbar>
        <IconButton
          edge="start"
          sx={{
            mr: 2,
          }}
          color="inherit"
          aria-label="open drawer"
          onClick={onToggle}
        >
          {toggled ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Box flexGrow={1} />
        <AvatarItem {...rest} />
      </Toolbar>
    </AppBar>
  );
}
