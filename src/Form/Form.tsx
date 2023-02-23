import * as React from 'react';
import { FormProvider, SubmitHandler, FieldValues, UseFormReturn, Path } from 'react-hook-form';
import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';
import { SxProps, Theme } from '@mui/material/styles';
import { ExtraFormProvider } from './ExtraFormContext';

export { useForm } from 'react-hook-form';

export interface SubmitErrorField {
  field: string;
  message: string;
}
export interface SubmitError {
  message: string;
  fields?: SubmitErrorField[];
}

const defaultErrorTranslator = (err: any) => {
  if (!err || (!err.message && !err.fields)) {
    return null;
  }

  const result: SubmitError = { message: err.message || '' };
  if (Array.isArray(err.fields)) {
    result.fields = err.fields
      ?.map((x: any) => {
        if (!x.field) {
          return undefined;
        }
        return {
          field: x.field,
          message: x.message || '请检查数据',
        };
      })
      .filter((x?: SubmitErrorField) => !!x);
  }
  return result;
};

export interface FormProps<TFieldValues extends FieldValues, TContext extends object> {
  readOnly?: boolean;
  onSubmit?: (data: TFieldValues, ev?: React.BaseSyntheticEvent) => void | Promise<any>;
  form: UseFormReturn<TFieldValues, TContext>;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  columnSpacing?: Grid2Props['columnSpacing'];
  rowSpacing?: Grid2Props['rowSpacing'];
  translateError?: (error: any) => SubmitError;
}

export const Form = <
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  props: FormProps<TFieldValues, TContext>
) => {
  const {
    readOnly,
    onSubmit,
    form,
    children,
    translateError = defaultErrorTranslator,
    columnSpacing = 3,
    rowSpacing = 3,
    sx,
  } = props;

  const handleSubmit: SubmitHandler<TFieldValues> = async (data, ev) => {
    ev?.preventDefault();
    if (!onSubmit) {
      return;
    }
    try {
      return await onSubmit(data, ev);
    } catch (err) {
      console.error('submit error:', err);
      if (typeof err === 'object') {
        if (err as any) {
          const submitError = translateError(err);
          if (submitError?.fields?.length) {
            // setfield errors
            submitError.fields.forEach((fe) => {
              const { field, message } = fe;
              form.setError(field as Path<TFieldValues>, { type: 'custom', message });
            });
          }
        }
      }
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
