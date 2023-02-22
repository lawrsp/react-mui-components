import React from 'react';
import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Form, { useForm, FormItem } from '../src/Form';
import FormInput from '../src/Form/FormInput';
import { DatePicker } from '../src/DateTime';

export default {
  title: 'Example/Form',
  component: Form,
};

type FormValues = {
  name: string;
  password: string;
  description: string;
  date: Date | string | '';
};

export const FormInputs = () => {
  const form = useForm<FormValues>({
    defaultValues: { name: '', password: '', description: '', date: '' },
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
    return {
      message: 'error!',
      fields: [{ field: 'name', message: 'duplicated' }],
    };
  };
  return (
    <div style={{ padding: 10 }}>
      <Form form={form} onSubmit={onSubmit}>
        <FormItem xs={6}>
          <FormInput type="text" name="name" label="name" />
        </FormItem>
        <FormItem xs={6}>
          <FormInput type="password" name="password" label="password" />
        </FormItem>
        <FormItem>
          <FormInput
            multiline
            minRows={2}
            maxRows={4}
            name="description"
            label="description"
            variant="outlined"
          />
        </FormItem>
        <FormItem xs={4}>
          <FormInput name="date" label="date" component={DatePicker} showPopupIcon />
        </FormItem>
        <FormItem xs={12} sx={{ gap: 2, display: 'flex' }}>
          <Button type="submit">提交</Button>
          <Button type="reset" onClick={() => form.reset()}>
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export const ReadOnly = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: 'testName',
      password: '*********',
      description: 'fsdfsdfa\n4324234\nffffffffffff\n222',
      date: new Date(),
    },
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
    return {
      message: 'error!',
      fields: [{ field: 'name', message: 'duplicated' }],
    };
  };
  return (
    <div style={{ padding: 10, flexGrow: 1 }}>
      <Form form={form} onSubmit={onSubmit} readOnly columnSpacing={3} rowSpacing={8}>
        <FormItem xs={6}>
          <FormInput type="text" name="name" label="name" />
        </FormItem>
        <FormItem xs={6}>
          <FormInput type="password" name="password" label="password" />
        </FormItem>
        <FormItem xs={8}>
          <FormInput
            multiline
            minRows={2}
            name="description"
            label="description"
            variant="outlined"
          />
        </FormItem>
        <FormItem xs={5}>
          <FormInput name="date" label="date" component={DatePicker} showPopupIcon />
        </FormItem>
      </Form>
    </div>
  );
};

export const Grids = () => {
  return (
    <div style={{ padding: 10, flexGrow: 1 }}>
      <Grid container columnSpacing={1} rowSpacing={2}>
        <Grid xs={6}>
          <TextField fullWidth type="text" name="name" label="name" />
        </Grid>
        <Grid xs={6}>
          <TextField fullWidth type="password" name="password" label="password" />
        </Grid>
        <Grid xs={8}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            name="description"
            label="description"
            variant="outlined"
          />
        </Grid>
        <Grid xs={5}>
          <TextField fullWidth name="date" label="date" />
        </Grid>
      </Grid>
    </div>
  );
};
