import { ReactNode } from 'react';
import { Button, IconButton, Badge } from '@mui/material';
import {
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { ProTableTitleToolConfig } from './types';

import { Box, Divider } from '@mui/material';

export interface ProTableTitleProps {
  title: ReactNode;
  tools?: ProTableTitleToolConfig[];
}

const renderTool = (t: ProTableTitleToolConfig, idx: number) => {
  if (typeof t === 'string') {
    switch (t) {
      case 'divider':
        return (
          <Divider
            key={`tool-divider-${idx}`}
            orientation="vertical"
            sx={{
              ml: 0.5,
              height: '2rem',
            }}
          />
        );
      default:
        return null;
    }
  } else if ('button' in t) {
    return (
      <Button
        sx={{ ml: 0.5 }}
        key={`tool-reload-${idx}`}
        size="small"
        onClick={t.onClick}
        color={t.color}
        variant={t.variant}
        endIcon={t.endIcon}
        startIcon={t.startIcon}
      >
        {t.button}
      </Button>
    );
  } else if ('icon' in t) {
    switch (t.icon) {
      case 'reload':
        return (
          <IconButton sx={{ ml: 0.5 }} key={`tool-reload-${idx}`} size="small" onClick={t.onClick}>
            <RefreshIcon />
          </IconButton>
        );
      case 'close':
        return (
          <IconButton sx={{ ml: 0.5 }} key={`tool-close-${idx}`} size="small" onClick={t.onClick}>
            <CloseIcon />
          </IconButton>
        );
      case 'search':
        const color = t.open ? 'primary' : undefined;

        return (
          <IconButton
            sx={{ ml: 0.5 }}
            key={`tool-search-${idx}`}
            size="small"
            color={color}
            onClick={t.onClick}
          >
            <Badge color="primary" variant="dot" overlap="circular" invisible={!t.hasSearches}>
              <SearchIcon />
            </Badge>
          </IconButton>
        );
      default:
        return (
          <IconButton sx={{ ml: 0.5 }} key={`tool-custom-${idx}`} size="small" onClick={t.onClick}>
            {t.icon}
          </IconButton>
        );
    }
  } else if ('render' in t) {
    return (
      <Box sx={{ ml: 0.5 }} key={`tool-render-${idx}`}>
        {t.render()}
      </Box>
    );
  }

  return null;
};

const ProTableTitle = (props: ProTableTitleProps) => {
  const { title, tools = [] } = props;

  return (
    <Box
      sx={{
        lineHeight: 1.43,
        display: 'flex',
        pt: 1,
        pl: 2,
        pr: 0.5,
        pb: 0.5,
        alignItems: 'center',
        fontSize: '1.6rem',
        minHeight: '1.6rem',
      }}
    >
      <Box
        sx={{
          fontWeight: 'bold',
          flexGrow: 1,
        }}
      >
        {title}
      </Box>
      {!!tools.length && (
        <Divider
          orientation="vertical"
          sx={{
            ml: 0.5,
            mr: 0.5,
            height: '2rem',
          }}
        />
      )}
      {tools.map(renderTool)}
    </Box>
  );
};

export default ProTableTitle;
