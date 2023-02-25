import { type SyntheticEvent, useMemo, useState, useEffect } from 'react';
import { Box, Button, Paper, Popper } from '@mui/material';
import TextField, { TextFieldProps } from '../Inputs/TextField';
import usePopperProps from '../PopperInput/usePopperProps';
import dateUtils from '../utils/date';
import Calendar from './Calendar';
import TimeScroll from './TimeScroll';

export type DateTimePickerProps = {
  value?: number | Date | string;
  defaultValue?: number | Date | string;
  onChange?: (ev: SyntheticEvent, value: Date | '') => void | Promise<void>;
  format?: string;
  readOnly?: boolean;
  showPopupIcon?: boolean;
  noOpenOnFocus?: boolean;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

export const DateTimePicker = (props: DateTimePickerProps) => {
  const {
    format = 'yyyy-MM-dd HH:mm:ss',
    value: valueProp,
    onChange,
    noOpenOnFocus,
    readOnly,
    showPopupIcon,
    defaultValue,
    ...rest
  } = props;

  let value: Date | null;
  try {
    if (valueProp) {
      value = new Date(valueProp);
      if (isNaN(value.getTime())) {
        value = null;
      }
    } else {
      value = null;
    }
  } catch {
    value = null;
  }

  const { textFieldProps, popperProps, close } = usePopperProps(rest, {
    showPopupIcon,
    noOpenOnFocus,
    readOnly,
  });

  const handleOnChange = async (ev: SyntheticEvent, dv: Date | '') => {
    if (onChange) {
      await onChange(ev, dv);
    }
  };

  const handleOnChangeDate = (ev: SyntheticEvent, val: Date) => {
    let newVal = new Date(value || new Date());
    if (isNaN(newVal.getTime())) {
      newVal = val;
    } else {
      newVal.setDate(val.getDate());
    }

    handleOnChange(ev, newVal);
  };
  const handleOnChangeTime = (ev: SyntheticEvent, val: Date) => {
    let newVal = new Date(value || new Date());
    if (isNaN(newVal.getTime())) {
      newVal = val;
    } else {
      newVal.setHours(val.getHours());
      newVal.setMinutes(val.getMinutes());
      newVal.setSeconds(val.getSeconds());
    }

    handleOnChange(ev, newVal);
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
          <Box display="flex" flexDirection="row">
            <Calendar value={value} onChange={handleOnChangeDate} />
            <TimeScroll value={value} onChange={handleOnChangeTime} />
          </Box>
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
              现在
            </Button>
            <Button
              size="small"
              color="warning"
              variant="text"
              onClick={(ev) => handleOnChange(ev, '')}
            >
              清空
            </Button>
            <Button size="small" color="inherit" variant="text" onClick={close}>
              关闭
            </Button>
          </Box>
        </Paper>
      </Popper>
    </>
  );
};

export default DateTimePicker;
