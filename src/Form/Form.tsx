import * as React from 'react';
import { FormProvider, SubmitHandler, FieldValues, UseFormReturn, Path } from 'react-hook-form';
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import { SxProps, Theme } from '@mui/material/styles';
import { ExtraFormProvider } from './ExtraFormContext';

export { useForm } from 'react-hook-form';

export interface SubmitError {
  message: string;
  fields?: { field: string; message: string }[];
}

export interface FormProps<TFieldValues extends FieldValues, TContext extends object> {
  readOnly?: boolean;
  onSubmit?: (
    data: TFieldValues,
    ev?: React.BaseSyntheticEvent
  ) => void | SubmitError | Promise<SubmitError | void>;
  form: UseFormReturn<TFieldValues, TContext>;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  columnSpacing?: Grid2Props['columnSpacing'];
  rowSpacing?: Grid2Props['rowSpacing'];
}

export const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  props: FormProps<TFieldValues, TContext>
) => {
  const { readOnly, onSubmit, form, children, columnSpacing = 3, rowSpacing = 3, sx } = props;

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
    <ExtraFormProvider readOnly={readOnly}>
      <Grid
        component="form"
        container
        columnSpacing={columnSpacing}
        rowSpacing={rowSpacing}
        onSubmit={form.handleSubmit(handleSubmit)}
        sx={sx}
      >
        <FormProvider {...form}>{children}</FormProvider>
      </Grid>
    </ExtraFormProvider>
  );
};

export default Form;
