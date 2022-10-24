import React from 'react';
import TextField from 'components/CustomInputs/TextField';
import FormTable from './FormTable';

const FormTableInput = React.forwardRef(function FormTableInput(props, ref) {
  const { inputRef, value, className, ...rest } = props;
  const inputValue = value ? JSON.stringify(value) : undefined;
  // console.log('rest in FormTableInput:', rest);

  return (
    <FormTable ref={ref} value={value} {...rest}>
      <input className={className} type="hidden" ref={inputRef} value={inputValue} />
    </FormTable>
  );
});

const FormTableField = React.forwardRef(function FormTableField(props, ref) {
  const {
    InputLabelProps,
    InputProps,
    inputProps,
    title,
    columns,
    actions,
    value,
    footer,
    children,
    error,
    loading,
    ...rest
  } = props;

  return (
    <>
      <TextField
        ref={ref}
        InputLabelProps={{ ...InputLabelProps, shrink: true }}
        InputProps={{
          ...InputProps,
          disableUnderline: !error,
          inputComponent: FormTableInput,
        }}
        inputProps={{
          ...inputProps,
          title,
          columns,
          actions,
          data: value,
          footer,
          loading,
        }}
        error={!!error}
        {...rest}
      />
      {children}
    </>
  );
});

export default FormTableField;
