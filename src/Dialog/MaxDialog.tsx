import React, { ReactNode, SyntheticEvent } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  DialogActions,
  ButtonProps,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { type Theme } from '@mui/material/styles';
import { Close as CloseIcon } from '@mui/icons-material';
import LoadingContainer from '../LoadingContainer';

export type DialogActionConfigType = {
  key?: string | number;
  show?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
  label: string;
  loading?: boolean;
  onClick: (ev: SyntheticEvent) => void | Promise<any>;
  props?: Omit<ButtonProps, 'onClick'>;
};

export type MaxDialogProps = {
  title?: string;
  open?: boolean;
  actions?: DialogActionConfigType[];
  loading?: boolean;
  onClose: (ev: SyntheticEvent) => void | Promise<void>;
  children?: ReactNode;
};

export const MaxDialog = (props: MaxDialogProps) => {
  const { actions = [], children, title, open = false, loading = false, onClose } = props;

  const renderedActions = React.useMemo(() => {
    return actions.map((item: DialogActionConfigType, index: number) => {
      const { key = index, disabled, show = true, label, loading, onClick, props = {} } = item;

      let visible = !!show;
      if (typeof show === 'function') {
        visible = show();
      }
      if (!visible) {
        return false;
      }

      let btnDisabled = !!disabled;
      if (typeof disabled === 'function') {
        btnDisabled = disabled();
      }

      const buttonProps = {
        onClick,
        disabled: btnDisabled,
        ...props,
      };

      if (loading === undefined) {
        return (
          <Button key={key} {...buttonProps}>
            {label}
          </Button>
        );
      }
      return (
        <LoadingButton key={key} loading={loading} {...buttonProps}>
          {label}
        </LoadingButton>
      );
    });
  }, [actions]);

  return (
    <Dialog open={open} fullScreen>
      <Box
        sx={(theme: Theme) => ({
          margin: 0,
          fontSize: theme.typography.h6,
          display: 'flex',
          justifyContent: 'space-between',
          pl: 2,
          pr: 1,
          pt: 1.5,
          pb: 1,
          flexDirection: 'row',
          alignItems: 'center',
          lineHeight: '2.2rem',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          [theme.breakpoints.down('sm')]: {
            pt: 0.2,
            pb: 0,
            fontSize: theme.typography.subtitle1,
          },
        })}
      >
        <Box>{title}</Box>
        <IconButton
          sx={{
            color: 'primary.contrastText',
            '&.Mui-disabled': {
              color: (theme) => theme.palette.grey['400'],
            },
          }}
          aria-label="close"
          onClick={onClose}
          disabled={loading}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <LoadingContainer
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          overflow: 'hidden',
        }}
        loading={loading}
      >
        <DialogContent
          sx={(theme: Theme) => ({
            px: 4,
            py: 2,
            [theme.breakpoints.down('sm')]: {
              px: 2,
              py: 1,
            },
          })}
        >
          {children}
        </DialogContent>
      </LoadingContainer>
      <DialogActions
        sx={{
          borderTop: (theme: Theme) => `1px solid ${theme.palette.grey[100]}`,
          justifyContent: 'flex-start',
          pl: 4,
          pb: 3,
          '& button + button': {
            ml: 3,
          },
        }}
      >
        {renderedActions}
      </DialogActions>
    </Dialog>
  );
};

export default MaxDialog;

/* disableSpacing */
