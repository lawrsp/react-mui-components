import { type SyntheticEvent, useMemo } from 'react';
import { Box, Button, Paper, Popper, TextField, TextFieldProps } from '@mui/material';
import { usePopperProps } from '../PopperInput/usePopperProps';
import Calendar from './Calendar';
import dateUtils from '../utils/date';

export type DatePickerProps = {
  value: number | Date | string;
  onChange: (ev: SyntheticEvent, value: Date | '') => void | Promise<void>;
  format?: string;
  readOnly?: boolean;
  closeOnSelected?: boolean;
  showPopupIcon?: boolean;
  noOpenOnFocus?: boolean;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

export const DatePicker = (props: DatePickerProps) => {
  const {
    format = 'yyyy-MM-dd',
    closeOnSelected,
    value,
    onChange,
    noOpenOnFocus,
    readOnly,
    showPopupIcon,
    ...rest
  } = props;

  /* const usePopperInput()  */
  const { textFieldProps, popperProps, close } = usePopperProps(rest, {
    showPopupIcon,
    noOpenOnFocus,
    readOnly,
  });
  /* console.log('anchorWidth:', anchorWidth);
   * console.log('rest:', rest);
   * console.log('textFieldProps:', textFieldProps); */

  const handleOnChange = async (ev: SyntheticEvent, dv: Date | '') => {
    await onChange(ev, dv);
    if (closeOnSelected) {
      close(ev);
    }
  };

  const visibleValue = useMemo(() => {
    if (!value) {
      return '';
    }
    try {
      const date = dateUtils.date(value);
      const text = dateUtils.formatByString(date, format);
      return text;
    } catch (err) {
      return JSON.stringify(value);
    }
  }, [value, format]);

  return (
    <>
      <TextField value={visibleValue} {...textFieldProps} />
      <Popper {...popperProps} sx={{ zIndex: 'tooltip' }}>
        <Paper>
          <Calendar value={value === '' ? undefined : value} onChange={handleOnChange} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              py: 1,
            }}
          >
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={(ev) => handleOnChange(ev, new Date())}
            >
              今天
            </Button>
            <Button
              size="small"
              color="warning"
              variant="text"
              onClick={(ev) => handleOnChange(ev, '')}
            >
              清空
            </Button>
            {!closeOnSelected && (
              <Button size="small" color="inherit" variant="text" onClick={close}>
                关闭
              </Button>
            )}
          </Box>
        </Paper>
      </Popper>
    </>
  );
};
