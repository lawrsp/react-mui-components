import { ReactNode, BaseSyntheticEvent, SyntheticEvent } from 'react';
import {
  FormProvider,
  type FieldValues,
  type FieldErrors,
  type UseFormReturn,
  type Path,
} from 'react-hook-form';
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

export const useFormSubmitHandler = <TFieldValues extends FieldValues, TContext extends object>(
  form: UseFormReturn<TFieldValues, TContext>,
  onSubmit?: (data: TFieldValues, ev?: BaseSyntheticEvent) => void | Promise<void>,
  options?: {
    translateError?: (err: any) => SubmitError | null;
    onInvalid?: (
      errors: FieldErrors<TFieldValues>,
      ev?: BaseSyntheticEvent
    ) => void | Promise<void>;
    throwOnError?: boolean;
  }
) => {
  if (!onSubmit) {
    return (ev?: SyntheticEvent) => {
      ev?.preventDefault();
    };
  }

  const { translateError = defaultErrorTranslator, onInvalid, throwOnError } = options || {};

  const handleSubmit = form.handleSubmit(
    async (data, ev) => {
      ev?.preventDefault();
      if (!onSubmit) {
        return;
      }
      try {
        await onSubmit(data, ev);
      } catch (err) {
        /* console.error('submit error:', err); */
        const submitError = translateError(err);
        if (submitError?.fields?.length) {
          // setfield errors
          submitError.fields.forEach((fe) => {
            const { field, message } = fe;
            form.setError(field as Path<TFieldValues>, { type: 'custom', message });
          });
        }
        if (throwOnError) {
          throw err;
        }
        return;
      }
    },
    async (values, ev) => {
      ev?.preventDefault();
      if (onInvalid) {
        await onInvalid(values, ev);
      }
    }
  );

  return handleSubmit;
};

export interface FormProps<TFieldValues extends FieldValues, TContext extends object> {
  readOnly?: boolean;
  onSubmit?: (e?: SyntheticEvent) => void | Promise<void>;
  form: UseFormReturn<TFieldValues, TContext>;
  children: ReactNode;
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
  const { readOnly, onSubmit, form, children, columnSpacing = 3, rowSpacing = 1, sx } = props;

  return (
    <ExtraFormProvider readOnly={readOnly}>
      <Grid
        component="form"
        container
        columnSpacing={columnSpacing}
        rowSpacing={rowSpacing}
        onSubmit={onSubmit}
        sx={sx}
      >
        <FormProvider {...form}>{children}</FormProvider>
      </Grid>
    </ExtraFormProvider>
  );
};

export default Form;
