import React from 'react';
import { Button } from '@mui/material';
import Form, { useForm } from '../src/Form';
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
        <FormInput type="text" name="name" label="name" />
        <FormInput type="password" name="password" label="password" />
        <FormInput multiline minRows={2} name="description" label="description" />
        <Button type="submit">提交</Button>
        <Button type="reset" onClick={() => form.reset()}>
          重置
        </Button>
      </Form>
    </div>
  );
};
