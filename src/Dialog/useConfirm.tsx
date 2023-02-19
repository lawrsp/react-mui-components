import { ReactNode, createContext, useContext, SyntheticEvent, useReducer, useMemo } from 'react';
import { type PopoverProps } from '@mui/material';

import { ConfirmDialog, ConfirmDialogProps } from './ConfirmDialog';

export interface ConfirmContextType {
  openConfirm: (props?: Partial<ConfirmProviderState>) => void;
  setConfirm: (props: Partial<ConfirmProviderState>) => void;
}

const ConfirmContext = createContext<ConfirmContextType>({
  openConfirm: () => {},
  setConfirm: () => {},
});

type ConfirmProviderState = Omit<ConfirmDialogProps, 'children'> & {
  description?: ReactNode;
};

type UseConfirmHookProps = Pick<
  ConfirmProviderState,
  'onCancel' | 'onConfirm' | 'cancelLabel' | 'confirmLabel' | 'title' | 'description'
>;

export type UseConfirmDialogProps = Partial<UseConfirmHookProps>;

export type UseConfirmPopoverProps = Partial<
  UseConfirmHookProps & Pick<PopoverProps, 'anchorEl' | 'anchorOrigin' | 'transformOrigin'>
>;

type ConfirmProviderAction =
  | {
      type: 'set';
      payload: Partial<ConfirmProviderState>;
    }
  | {
      type: 'open';
      payload?: Partial<ConfirmProviderState>;
    }
  | {
      type: 'close';
    };

const reducer = (state: ConfirmProviderState, action: ConfirmProviderAction) => {
  switch (action.type) {
    case 'set': {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }
    case 'open': {
      const { payload } = action;
      return {
        ...state,
        ...payload,
        open: true,
      };
    }
    case 'close':
      return {
        ...state,
        open: false,
      };
    default:
      throw new Error();
  }
};

const initialState: ConfirmProviderState = {
  open: false,
};

export const ConfirmProvider = (
  props: Omit<ConfirmDialogProps, 'open' | 'children'> & { children?: ReactNode; open?: boolean }
) => {
  const { children, ...dialogProps } = props;

  const [stateProps, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    const setConfirm = (payload: UseConfirmHookProps) => {
      dispatch({ type: 'set', payload });
    };

    const openConfirm = (payload?: UseConfirmHookProps) => {
      dispatch({ type: 'open', payload });
    };

    return { setConfirm, openConfirm } as ConfirmContextType;
  }, [dispatch]);

  const handleCancel = async (ev: SyntheticEvent) => {
    await stateProps.onCancel?.(ev);
    dispatch({ type: 'close' });
  };

  const handleConfirm = async (ev: SyntheticEvent) => {
    await stateProps.onConfirm?.(ev);
    dispatch({ type: 'close' });
  };

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmDialog
        {...dialogProps}
        {...stateProps}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        open={stateProps.open}
      >
        {stateProps.description}
      </ConfirmDialog>
    </ConfirmContext.Provider>
  );
};

export const useConfirmPopover = (props: UseConfirmPopoverProps) => {
  const { setConfirm, openConfirm } = useContext(ConfirmContext);

  const handleOpenConfirm = (ev: SyntheticEvent, data?: UseConfirmPopoverProps) => {
    setConfirm({ popoverMode: true, ...props });
    openConfirm({ anchorEl: ev.currentTarget, ...data });
  };

  return handleOpenConfirm;
};

export const useConfirmDialog = (props: UseConfirmDialogProps) => {
  const { setConfirm, openConfirm } = useContext(ConfirmContext);

  const handleOpenConfirm = (_: SyntheticEvent, data?: UseConfirmHookProps) => {
    setConfirm({ popoverMode: false, ...props });
    openConfirm(data);
  };

  return handleOpenConfirm;
};
