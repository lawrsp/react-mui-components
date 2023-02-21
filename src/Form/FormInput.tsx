import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { OverridableComponent, OverrideProps } from '@mui/types';

interface FormInputTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    name: string;
    readOnly?: boolean;
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component?: React.ElementType;
  } & Omit<TextFieldProps, 'name'>;

  defaultComponent: D;
}

export type FormInputProps<
  D extends React.ElementType = FormInputTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormInputTypeMap<P, D>, D>;

/* export type FormInputProps = {
 *   name: string;
 *   readOnly?: boolean;
 * } & Omit<TextFieldProps, 'name'>;
 *  */
export const FormInput: OverridableComponent<FormInputTypeMap> = (props: FormInputProps) => {
  const { name, helperText, readOnly, InputProps, component: Comp = TextField, ...rest } = props;
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

  const inputProps: FormInputProps['InputProps'] = {
    ...InputProps,
    readOnly,
  };

  const handleChange = React.useCallback(
    (ev: any, value?: any) => {
      if (value !== undefined) {
        onChange(value);
      } else {
        onChange(ev);
      }
    },
    [onChange]
  );

  return (
    <Comp
      fullWidth
      variant="standard"
      readOnly={readOnly}
      {...rest}
      onChange={handleChange} // send value to hook form
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
