import { type SyntheticEvent, useMemo, useState, useEffect } from 'react';
import { Box, Button, Paper, Popper } from '@mui/material';
import { Theme } from '@mui/material';
import { TextField, type TextFieldProps } from '../Inputs/TextField';
import { usePopperProps } from '../PopperInput/usePopperProps';
import Calendar from './Calendar';
import dateUtils from '../utils/date';

export type DatePickerProps = {
  value?: number | Date | string;
  defaultValue?: number | Date | string;
  onChange?: (value: Date | '') => void;
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
    value: valueProp,
    onChange,
    noOpenOnFocus,
    readOnly,
    showPopupIcon,
    defaultValue,
    ...rest
  } = props;

  const [value, setValue] = useState(valueProp || defaultValue || null);
  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const { textFieldProps, popperProps, close } = usePopperProps(rest, {
    showPopupIcon,
    noOpenOnFocus,
    readOnly,
  });
  /* console.log('anchorWidth:', anchorWidth);
   * console.log('rest:', rest);
   * console.log('textFieldProps:', textFieldProps); */

  const handleOnChange = (dv: Date | '', ev: SyntheticEvent) => {
    setValue(dv);
    if (onChange) {
      onChange(dv);
    }
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
          <Calendar value={value} onChange={handleOnChange} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              py: 1,
              borderCollapse: 'collapse',
              borderInlineStart: (theme: Theme) => `0.8px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              size="small"
              color="primary"
              variant="text"
              onClick={(ev) => handleOnChange(new Date(), ev)}
            >
              今天
            </Button>
            <Button
              size="small"
              color="warning"
              variant="text"
              onClick={(ev) => handleOnChange('', ev)}
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
