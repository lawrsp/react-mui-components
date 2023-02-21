import React from 'react';
import { Button } from '@mui/material';
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
    <div>
      <Form form={form} onSubmit={onSubmit}>
        <FormItem xs={6}>
          <FormInput type="text" name="name" label="name" />
        </FormItem>
        <FormItem xs={6}>
          <FormInput type="password" name="password" label="password" />
        </FormItem>
        <FormItem>
          <FormInput multiline minRows={2} name="description" label="description" />
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
    <div>
      <Form form={form} onSubmit={onSubmit} readOnly>
        <FormItem xs={6}>
          <FormInput type="text" name="name" label="name" />
        </FormItem>
        <FormItem xs={6}>
          <FormInput type="password" name="password" label="password" />
        </FormItem>
        <FormItem>
          <FormInput multiline minRows={2} name="description" label="description" />
        </FormItem>
        <FormItem xs={4}>
          <FormInput name="date" label="date" component={DatePicker} showPopupIcon />
        </FormItem>
      </Form>
    </div>
  );
};
