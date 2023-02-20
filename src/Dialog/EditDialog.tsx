import React, { useEffect, ReactNode } from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  type DialogProps,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { type Breakpoint, type Theme } from '@mui/material/styles';
import { SyntheticEvent } from 'react';
import LoadingContainer from '../LoadingContainer';

type EditDialogPropsC = {
  open?: boolean;
  title: string;
  okText?: string;
  resetText?: string;
  loading?: boolean;
  onClose: (ev: SyntheticEvent) => void | Promise<any>;
  onSubmit: (ev: SyntheticEvent) => void | Promise<any>;
  onReset: (ev: SyntheticEvent) => void | Promise<any>;
  closeOnSuccess?: boolean;
  children: ReactNode;
  fullScreen?: Breakpoint;
};

export type EditDialogProps = Omit<DialogProps, keyof EditDialogPropsC> & EditDialogPropsC;

export function EditDialog(props: EditDialogProps) {
  const {
    open = false,
    okText = '提交',
    resetText = '重置',
    title,
    onClose,
    onSubmit,
    onReset,
    closeOnSuccess,
    maxWidth = 'md',
    fullScreen = 'sm',
    loading = false,
    children,
    ...rest
  } = props;

  const [submitting, setSubmitting] = React.useState(false);
  const [hideChildren, setHideChildren] = React.useState(false);
  const isFullScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(fullScreen));

  useEffect(() => {
    if (open) {
      setHideChildren(false);
      return () => {};
    }

    const timer = setTimeout(() => setHideChildren(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const handleSubmit = async (ev: SyntheticEvent) => {
    try {
      setSubmitting(true);
      await onSubmit(ev);
      if (closeOnSuccess) {
        await onClose(ev);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth={maxWidth} fullScreen={isFullScreen} {...rest}>
      <Box
        sx={{
          margin: 0,
          fontSize: (theme: Theme) => theme.typography.h6,
          display: 'flex',
          justifyContent: 'space-between',
          pl: 2,
          pt: 1,
          pb: 0.5,
          pr: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          borderBottom: (theme: Theme) => `1px solid ${theme.palette.grey[100]}`,
          lineHeight: '2.2rem',
        }}
      >
        <Box>{title}</Box>
        <IconButton
          aria-label="close"
          sx={{
            color: 'grey[500]',
          }}
          onClick={onClose}
          disabled={submitting}
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
        loading={loading || submitting}
      >
        <DialogContent
          sx={{ pt: 1, pl: 3, pr: 2, pb: 1, visibility: hideChildren ? 'hidden' : 'visible' }}
        >
          {children}
        </DialogContent>
      </LoadingContainer>
      <DialogActions
        sx={{ borderTop: (theme: Theme) => `1px solid ${theme.palette.grey[100]}`, pt: 1.5 }}
      >
        <Button
          onClick={handleSubmit}
          color="primary"
          type="submit"
          size="small"
          variant="contained"
          disabled={submitting || loading}
        >
          {okText}
        </Button>
        <Button disabled={submitting || loading} onClick={onReset} variant="outlined" size="small">
          {resetText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
