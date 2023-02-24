import { ReactNode, SyntheticEvent } from 'react';
import {
  DialogContent,
  DialogActions,
  Popover,
  Button,
  Box,
  Dialog,
  type PopoverProps,
  type PopoverOrigin,
} from '@mui/material';
import { type SxProps, type Theme } from '@mui/material/styles';

const defaultAnchorOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const defaultTransformOrigin: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'right',
};

export type ConfirmDialogProps = {
  open?: boolean;
  onCancel?: (ev: SyntheticEvent) => void | Promise<any>;
  onConfirm?: (ev: SyntheticEvent) => void | Promise<any>;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: ReactNode;
  sx?: SxProps<Theme>;
  popoverMode?: boolean;
} & Pick<PopoverProps, 'anchorEl' | 'anchorOrigin' | 'transformOrigin'>;

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    cancelLabel = '取消',
    confirmLabel = '确定',
    open = false,
    onConfirm,
    onCancel,
    popoverMode,
    title,
    children,
    sx,
    anchorEl,
    anchorOrigin,
    transformOrigin,
    ...rest
  } = props;

  const handleClickCancel = async (ev: SyntheticEvent) => {
    // console.log('==============click cancel mini dialog');
    await onCancel?.(ev);
  };

  const handleClickConfirm = async (ev: SyntheticEvent) => {
    // console.log('==============click ok mini dialog');
    await onConfirm?.(ev);
  };

  return (
    <Box
      component={!!popoverMode ? Popover : Dialog}
      open={!!open}
      {...(popoverMode
        ? {
            anchorEl: anchorEl,
            anchorOrigin: anchorOrigin || defaultAnchorOrigin,
            transformOrigin: transformOrigin || defaultTransformOrigin,
          }
        : {})}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      {...rest}
    >
      <Box
        sx={{
          backgroundColor: title ? 'primary.main' : undefined,
          color: 'primary.contrastText',
          pt: title ? 1 : 0,
          pb: 1,
          pl: 2,
          pr: 2,
          fontSize: '1.4rem',
          lineHeight: 1.43,
          fontWeight: '500',
        }}
      >
        {title}
      </Box>
      <DialogContent
        sx={{
          pt: 1,
          pb: popoverMode ? 0 : 0.5,
          pl: 2,
          pr: 2,
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        {cancelLabel && (
          <Button color="inherit" variant="text" size="small" onClick={handleClickCancel}>
            {cancelLabel}
          </Button>
        )}
        {confirmLabel && (
          <Button color="primary" variant="text" size="small" onClick={handleClickConfirm}>
            {confirmLabel}{' '}
          </Button>
        )}
      </DialogActions>
    </Box>
  );
};

export default ConfirmDialog;
