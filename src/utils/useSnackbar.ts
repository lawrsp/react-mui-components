import { ReactNode, useMemo } from 'react';
import { useSnackbar as libUseSnackbar, SnackbarOrigin, VariantType, SnackbarKey } from 'notistack';

export type { SnackbarOrigin, VariantType, SnackbarKey } from 'notistack';

export interface SnackbarMessageOptions {
  key?: SnackbarKey; // customized key
  persist?: boolean;
  variant?: VariantType;
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number | null;
}

export type SnackbarType = {
  info: (message: string | ReactNode) => void;
  success: (message: string | ReactNode) => void;
  error: (message: string | ReactNode) => void;
  warnning: (message: string | ReactNode) => void;
  show: (message: string | ReactNode, options: SnackbarMessageOptions) => SnackbarKey;
  close: (key?: SnackbarKey) => void;
};

export const useSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = libUseSnackbar();

  return useMemo<SnackbarType>(
    () => ({
      info: (message: string | ReactNode) => {
        enqueueSnackbar(message, { variant: 'info' });
        return;
      },
      success: (message: string | ReactNode) => {
        enqueueSnackbar(message, { variant: 'success' });
        return;
      },
      error: (message: string | ReactNode) => {
        enqueueSnackbar(message, { variant: 'error' });
        return;
      },
      warnning: (message: string | ReactNode) => {
        enqueueSnackbar(message, { variant: 'warning' });
        return;
      },
      show: (message: string | ReactNode, options: SnackbarMessageOptions) => {
        return enqueueSnackbar(message, options) as SnackbarKey;
      },
      close: (key?: SnackbarKey) => {
        return closeSnackbar(key);
      },
    }),
    []
  );
};
