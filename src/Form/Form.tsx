import React from 'react';
import { Box } from '@mui/material';
import {
  FormProvider,
  SubmitHandler,
  type FieldValues,
  type UseFormReturn,
  type Path,
} from 'react-hook-form';

import { SxProps, Theme } from '@mui/material/styles';

export { useForm } from 'react-hook-form';

export interface SubmitError {
  message: string;
  fields?: { field: string; message: string }[];
}

export interface FormProps<TFieldValues extends FieldValues, TContext extends object> {
  onSubmit?: (
    data: TFieldValues,
    ev?: React.BaseSyntheticEvent
  ) => void | SubmitError | Promise<SubmitError | void>;
  form: UseFormReturn<TFieldValues, TContext>;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const Form = <TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
  props: FormProps<TFieldValues, TContext>
) => {
  const { onSubmit, form, children } = props;

  const handleSubmit: SubmitHandler<TFieldValues> = async (data, ev) => {
    ev?.preventDefault();
    if (!onSubmit) {
      return;
    }
    try {
      const err = await onSubmit(data, ev);
      if (err?.fields?.length) {
        console.log('error is ', err.fields);
        // setfield errors
        err.fields.forEach(({ field, message }) => {
          form.setError(field as Path<TFieldValues>, { type: 'custom', message });
        });
      }
    } catch (er) {
      console.error('submit error:', er);
    }
    return;
  };

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={form.handleSubmit(handleSubmit)}
        sx={{
          width: '100%',
        }}
      >
        {children}
      </Box>
    </FormProvider>
  );
};

export default Form;
