import { ProTableAlertProps } from './types';
import { Box, lighten, Typography } from '@mui/material';

import {
  Info as InfoIcon,
  Warning as WarningIcon,
  Cancel as ErrorIcon,
  CheckCircle as SuccessIcon,
} from '@mui/icons-material';

const icons = {
  warning: WarningIcon,
  info: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
};

const ProTableAlert = (props: ProTableAlertProps) => {
  const { message, type } = props;

  const Icon = icons[type];

  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',

          pl: 2,
          pr: 2,
          pt: 1,
          pb: 1,
        },
        (theme) =>
          theme.palette.mode === 'light'
            ? {
                color: theme.palette[type].main,
                backgroundColor: lighten(theme.palette[type].light, 0.85),
              }
            : {
                color: theme.palette[type].contrastText,
                backgroundColor: theme.palette[type].dark,
              },
      ]}
    >
      <Typography
        color="inherit"
        variant="subtitle1"
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          flex: '1 0 auto',
        }}
      >
        <Icon
          sx={{
            width: '2.4rem',
            height: '2.4rem',
            mr: 1,
          }}
        />
        {message}
      </Typography>
    </Box>
  );
};

export default ProTableAlert;
