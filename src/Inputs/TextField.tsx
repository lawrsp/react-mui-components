import * as React from 'react';
import {
  SelectProps,
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

const EmptyIcon = () => {
  return null;
};

export type TextFieldProps = {
  readOnly?: boolean;
  onChange?: (ev: React.SyntheticEvent, value: unknown) => any | Promise<any>; // react-hook-form onChange */
} & Omit<MuiTextFieldProps, 'readOnly' | 'onChange'>;

export const TextField = (props: TextFieldProps) => {
  const { readOnly, InputProps, onChange, select, ...rest } = props;
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

    return async (ev: React.SyntheticEvent, value?: unknown) => {
      if (select) {
        return await onChange(ev, (ev.target as any).value);
      }

      return await onChange(ev, value);
    };
  }, [onChange, select]);

  return (
    <MuiTextField InputProps={reInputProps} onChange={handleChange} select={isSelect} {...rest} />
  );
};
