import React from 'react';
import { Button } from '@mui/material';
import Form, { useForm, FormItem } from '../src/Form';
import FormInput from '../src/Form/FormInput';

export default {
  title: 'Example/Form',
  component: Form,
};

type FormValues = {
  name: string;
  password: string;
  description: string;
};

export const FormInputs = () => {
  const form = useForm<FormValues>({
    defaultValues: { name: '', password: '', description: '' },
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
        <FormItem>
          <FormInput type="text" name="name" label="name" />
        </FormItem>
        <FormItem>
          <FormInput type="password" name="password" label="password" />
        </FormItem>
        <FormItem>
          <FormInput multiline minRows={2} name="description" label="description" />
        </FormItem>
        <FormInput name="date" label="date" />
        <FormItem>
          <Button type="submit">提交</Button>
          <Button type="reset" onClick={() => form.reset()}>
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
