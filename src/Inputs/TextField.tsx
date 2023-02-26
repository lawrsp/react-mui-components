import * as React from 'react';
import { TextField as MuiTextField, type TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type TextFieldProps = {
  readOnly?: boolean;
  onChange?: (ev: React.SyntheticEvent, value: unknown) => any | Promise<any>; // react-hook-form onChange */
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

    return async (ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = ev.target.value;
      if (select) {
        return await onChange(ev, value);
      }

      if (!noTrim && typeof value === 'string') {
        return await onChange(ev, value.trimStart());
      }

      return await onChange(ev, value);
    };
  }, [onChange, select, !noTrim]);

  const handleOnBlur = (ev: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = ev.target.value;
    if (!noTrim && typeof value === 'string') {
      ev.target.value = value.trim();
      if (onChange) {
        onChange(ev, ev.target.value);
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
