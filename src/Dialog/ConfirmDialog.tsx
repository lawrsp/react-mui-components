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
} & (
  | ({
      popoverMode: true;
    } & Pick<PopoverProps, 'anchorEl' | 'anchorOrigin' | 'transformOrigin'>)
  | {
      popoverMode?: false;
    }
);

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const {
    cancelLabel = '取消',
    confirmLabel = '确定',
    open = false,
    popoverMode,
    title,
    children,
    sx,
    ...rest
  } = props;

  const handleClickCancel = async (ev: SyntheticEvent) => {
    // console.log('==============click cancel mini dialog');
    await props.onCancel?.(ev);
  };

  const handleClickOk = async (ev: SyntheticEvent) => {
    // console.log('==============click ok mini dialog');
    await props.onConfirm?.(ev);
  };

  return (
    <Box
      component={!!popoverMode ? Popover : Dialog}
      open={!!open}
      {...(popoverMode
        ? {
            anchorOrigin: defaultAnchorOrigin,
            transformOrigin: defaultTransformOrigin,
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
          <Button color="primary" variant="text" size="small" onClick={handleClickOk}>
            {confirmLabel}{' '}
          </Button>
        )}
      </DialogActions>
    </Box>
  );
};

export default ConfirmDialog;
