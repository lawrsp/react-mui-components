import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';

export type FormInputProps = {
  name: string;
  readOnly?: boolean;
} & Omit<TextFieldProps, 'name'>;

export const FormInput = (props: FormInputProps) => {
  const { name, helperText, readOnly, InputProps, ...rest } = props;
  const { control } = useFormContext();
  const {
    field,
    fieldState,
    /* formState: { touchedFields, dirtyFields }, */
  } = useController({
    name,
    control,
  });

  const { onChange, onBlur, value, ref } = field;
  const { error } = fieldState;

  console.log('field error is', error);

  const inputProps: FormInputProps['InputProps'] = {
    ...InputProps,
    readOnly,
  };

  return (
    <TextField
      fullWidth
      variant="standard"
      {...rest}
      onChange={onChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={name} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when error appear
      error={!!error}
      helperText={!!error ? error.message : helperText}
      InputProps={inputProps}
    />
  );
};

export default FormInput;
