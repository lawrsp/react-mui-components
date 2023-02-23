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
import { type Breakpoint, type Theme, type SxProps } from '@mui/material/styles';
import { SyntheticEvent } from 'react';
import { LoadingButton } from '@mui/lab';

type EditDialogPropsC = {
  open?: boolean;
  title: string;
  submitLabel?: string;
  resetLabel?: string;
  loading?: boolean;
  submitting?: boolean;
  onClose: (ev: SyntheticEvent) => void | Promise<any>;
  onSubmit?: (ev: SyntheticEvent) => void | Promise<any>;
  onReset?: (ev: SyntheticEvent) => void | Promise<any>;
  closeOnSuccess?: boolean;
  children?: ReactNode;
  fullScreen?: Breakpoint;
  contentSx?: SxProps<Theme>;
};

export type EditDialogProps = Omit<DialogProps, keyof EditDialogPropsC> & EditDialogPropsC;

export function EditDialog(props: EditDialogProps) {
  const {
    open = false,
    submitLabel = '提交',
    resetLabel = '重置',
    title,
    onClose,
    onSubmit,
    onReset,
    closeOnSuccess,
    maxWidth = 'sm',
    fullScreen = 'sm',
    loading = false,
    submitting = false,
    children,
    contentSx,
    ...rest
  } = props;

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

  // this is the end of submit stack, catch the error
  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    try {
      if (!onSubmit) {
        return;
      }
      await onSubmit(ev);
      if (closeOnSuccess) {
        await onClose(ev);
      }
    } catch (err) {
      /* console.log(err) */
    }
  };

  // this is the end of reset stack, catch the error
  const handleReset = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    try {
      if (!onReset) {
        return;
      }
      await onReset(ev);
    } catch (err) {
      /* console.log(err) */
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
      <DialogContent
        sx={[
          { pt: 1, pb: 5, px: 3, visibility: hideChildren ? 'hidden' : 'visible' },
          ...(Array.isArray(contentSx) ? contentSx : [contentSx]),
        ]}
      >
        {children}
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: (theme: Theme) => `1px solid ${theme.palette.grey[100]}`,
          pt: 2,
          pr: 3,
          gap: 1.5,
        }}
      >
        {!!onSubmit && (
          <LoadingButton
            onClick={handleSubmit}
            color="primary"
            type="submit"
            size="small"
            variant="contained"
            loading={submitting}
            disabled={loading}
          >
            {submitLabel}
          </LoadingButton>
        )}
        {!!onReset && (
          <Button
            disabled={submitting || loading}
            onClick={handleReset}
            variant="outlined"
            size="small"
          >
            {resetLabel}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
