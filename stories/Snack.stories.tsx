import * as React from 'react';
import { useSnackbar } from '../src/utils/useSnackbar';

export default {
  title: 'Example/Snackbar',
};

export const Snackbars = () => {
  const snack = useSnackbar();

  return (
    <div>
      <button onClick={() => snack.success('this is success message')}>success </button>
      <br />
      <button onClick={() => snack.info('this is info message')}>info </button>
      <br />
      <button onClick={() => snack.warning('this is warning message')}>warning </button>
      <br />
      <button onClick={() => snack.error('this is error message')}>error </button>
    </div>
  );
};
