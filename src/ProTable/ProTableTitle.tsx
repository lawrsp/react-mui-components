import { Button, IconButton, Badge } from '@mui/material';
import {
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { ProTableTitleProps, ProTableTitleToolConfig, isProTableSearchToolConfig } from './types';

import { Box, Divider } from '@mui/material';
import { useMemo } from 'react';

const renderTool = (t: ProTableTitleToolConfig, idx: number) => {
  if (typeof t === 'string') {
    switch (t) {
      case 'divider':
        return (
          <Divider
            key={`tool-divider-${idx}`}
            orientation="vertical"
            sx={{
              ml: 1.5,
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
      default:
        if (isProTableSearchToolConfig(t)) {
          const color = t.open || t.hasSearches ? 'primary' : undefined;

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
        }
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
  const { title, tools = [], children } = props;

  const titleNode = useMemo(() => {
    if (typeof title === 'string') {
      return (
        <Box
          sx={{
            display: 'flex',
            fontWeight: 'bold',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {title}
        </Box>
      );
    }

    return title;
  }, [title]);

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
      {titleNode}
      <Box
        sx={{
          display: children ? 'flex' : 'none',
          alignItems: 'center',
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        {children}
      </Box>
      <Box sx={{ flexShrink: 0, display: tools?.length ? 'flex' : 'none', alignItems: 'center' }}>
        {!!children && !!tools.length && (
          <Divider
            orientation="vertical"
            sx={{
              ml: 0.5,
              mr: 0.5,
              height: '2rem',
              visibility: 'hidden',
            }}
          />
        )}
        {tools.map(renderTool)}
      </Box>
    </Box>
  );
};

export default ProTableTitle;
