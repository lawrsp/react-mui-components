import * as React from 'react';
import { TextField as MuiTextField, type TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type TextFieldProps = {
  readOnly?: boolean;
  onChange?: (value: unknown, ev?: React.SyntheticEvent) => void;
  noTrim?: boolean;
} & Omit<MuiTextFieldProps, 'readOnly' | 'onChange'>;

export const TextField = (props: TextFieldProps) => {
  const { readOnly, InputProps, onChange, select, noTrim, onBlur, ...rest } = props;
  const reInputProps: TextFieldProps['InputProps'] = {
    ...InputProps,
    readOnly,
  };

  const isSelect = !!select && !readOnly;

  // standarlize onChange to (ev, value) => any |promise<any>
  const handleChange = React.useMemo(() => {
    if (!onChange) {
      return undefined;
    }

    return (ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = ev.target.value;
      if (select) {
        onChange(value, ev);
        return;
      }

      if (!noTrim && typeof value === 'string') {
        onChange(value.trimStart(), ev);
        return;
      }

      onChange(value, ev);
    };
  }, [onChange, select, !noTrim]);

  const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = ev.target.value;
    if (!noTrim && typeof value === 'string') {
      ev.target.value = value.trim();
      if (onChange) {
        onChange(ev.target.value);
      }
    }

    if (onBlur) {
      onBlur(ev);
    }
  };

  return (
    <MuiTextField
      InputProps={reInputProps}
      onChange={handleChange}
      select={isSelect}
      onBlur={handleOnBlur}
      {...rest}
    />
  );
};

export default TextField;
