import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { OverridableComponent, OverrideProps } from '@mui/types';
import { useExtraFormContext } from './ExtraFormContext';
import { TextField, type TextFieldProps } from '../Inputs';

interface FormInputTypeMap<P = {}, D extends React.ElementType = 'input'> {
  props: P & {
    name: string;
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

export const FormInput: OverridableComponent<FormInputTypeMap> = (props: FormInputProps) => {
  const { name, readOnly: propsReadOnly, component: Comp = TextField, helperText, ...rest } = props;
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
  const { readOnly: ctxReadOnly } = useExtraFormContext();

  const readOnly = propsReadOnly || ctxReadOnly;

  const handleChange = React.useCallback(
    (value: any, ev?: React.SyntheticEvent) => {
      onChange(value, ev);
    },
    [onChange]
  );

  return (
    <Comp
      fullWidth
      readOnly={readOnly}
      {...rest}
      onChange={handleChange} // send value to hook form
      onBlur={onBlur} // notify when input is touched/blur
      value={value} // input value
      name={name} // send down the input name
      inputRef={ref} // send input ref, so we can focus on input when error appear
      error={!!error}
      helperText={!!error ? error.message : helperText}
    />
  );
};

export default FormInput;
