import { useMemo, useReducer } from 'react';
import { ProTablePaginationType, ProTablePaginationActions } from './types';

const defaultRowsPerPageOptions: Array<number> = [10, 20, 50];

interface usePaginationProps {
  rowsPerPageOptions?: Array<number>;
  rowsPerPage?: number;
  currentPage?: number;
}

enum ActionType {
  SET_PAGE = 'page',
  SET_PAGE_SIZE = 'size',
  SET_PAGE_OPTIONS = 'options',
}

type Action =
  | {
      type: ActionType.SET_PAGE | ActionType.SET_PAGE_SIZE;
      payload: number;
    }
  | {
      type: ActionType.SET_PAGE_OPTIONS;
      payload: Array<number>;
    };

type StateType = {
  rowsPerPageOptions: Array<number>;
  rowsPerPage: number;
  currentPage: number;
};

const arrayEqual: (a: Array<number>, b: Array<number>) => boolean = (a, b) => {
  if (a.length != b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] != b[i]) {
      return false;
    }
  }

  return true;
};

const changeRowsPerPage = (state: StateType, rowsPerPage: number) => {
  // make sure the first row is still in table
  let currentFirst = (state.currentPage - 1) * state.rowsPerPage; // from index 0
  if (currentFirst < 0) {
    currentFirst = 0;
  }
  let nextPage = 1;
  if (currentFirst !== 0) {
    nextPage = Math.floor(currentFirst / rowsPerPage) + 1;
  }

  return {
    ...state,
    currentPage: nextPage,
    rowsPerPage,
  } as ProTablePaginationType;
};

function paginationReducer(state: StateType, action: Action) {
  switch (action.type) {
    // 后操作的往后排，即便前边操作过，也往后排
    case ActionType.SET_PAGE:
      const currentPage = action.payload;
      if (currentPage === state.currentPage) {
        return state;
      }
      return {
        ...state,
        currentPage,
      } as ProTablePaginationType;
    case ActionType.SET_PAGE_SIZE:
      const rowsPerPage = action.payload;
      if (rowsPerPage === state.rowsPerPage) {
        return state;
      }

      return changeRowsPerPage(state, rowsPerPage);

    case ActionType.SET_PAGE_OPTIONS:
      const rowsPerPageOptions = action.payload;
      if (arrayEqual(rowsPerPageOptions, state.rowsPerPageOptions)) {
        return state;
      }

      const nextState = { ...state, rowsPerPageOptions } as ProTablePaginationType;
      const nextRowsPerPage = rowsPerPageOptions[0];
      if (nextRowsPerPage != state.rowsPerPage) {
        return changeRowsPerPage(nextState, nextRowsPerPage);
      }

      return nextState;
    default:
      throw new Error();
  }
}

export const usePagination = (props?: usePaginationProps) => {
  const [state, dispatch] = useReducer(paginationReducer, props || {}, (args) => {
    let { currentPage = 1, rowsPerPage, rowsPerPageOptions = defaultRowsPerPageOptions } = args;

    if (!rowsPerPage || !rowsPerPageOptions.filter((x) => x === rowsPerPage).length) {
      rowsPerPage = rowsPerPageOptions[0];
    }

    return {
      currentPage,
      rowsPerPage,
      rowsPerPageOptions,
    } as ProTablePaginationType;
  });

  const actions = useMemo(() => {
    return {
      setRowsPerPageOptions: (options: Array<number>) => {
        dispatch({
          type: ActionType.SET_PAGE_OPTIONS,
          payload: options,
        });
      },
      setCurrentPage: (page: number) => {
        dispatch({
          type: ActionType.SET_PAGE,
          payload: page,
        });
      },
      setRowsPerPage: (size: number) => {
        dispatch({
          type: ActionType.SET_PAGE_SIZE,
          payload: size,
        });
      },
    } as ProTablePaginationActions;
  }, []);

  console.log('pagination===========', state);

  return { state, actions } as {
    state: ProTablePaginationType;
    actions: ProTablePaginationActions;
  };
};

export default usePagination;
