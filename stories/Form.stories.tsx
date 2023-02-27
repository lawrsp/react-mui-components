import { useState, SyntheticEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Form, { useForm, FormItem, useFormSubmitHandler } from '../src/Form';
import FormInput from '../src/Form/FormInput';
import { DatePicker } from '../src/DateTime';
import { Checkbox } from '../src/Inputs';
import { delayms } from '../src/utils/delay';
import { LoadingButton } from '@mui/lab';

export default {
  title: 'Example/Form',
  component: Form,
};

type TestFormValues = {
  name: string;
  password: string;
  description: string;
  date: Date | string | '';
  country: string;
  age: number | '';
  checked: boolean;
};

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  password: z.string().min(6, { message: 'length >= 6' }),
  description: z.string(),
  date: z.date(),
  country: z.string(),
  age: z.string(),
  checked: z.boolean(),
});

export const FormInputs = () => {
  const form = useForm<TestFormValues>({
    defaultValues: {
      name: '',
      password: '',
      description: '',
      date: '',
      country: '',
      age: '',
      checked: false,
    },
    resolver: zodResolver(schema),
  });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: TestFormValues) => {
    console.log('data is', data);
    setSubmitting(true);
    await delayms(1500);
    setSubmitting(false);
    throw {
      message: 'error!',
      fields: [{ field: 'name', message: 'duplicated' }],
    };
  };

  const handleSubmit = useFormSubmitHandler(form, onSubmit, {});

  const testHandleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    try {
      const submitResult = await handleSubmit(ev);
      console.log('result is ====', submitResult);
    } catch (err) {
      console.log('======================', err);
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <Form form={form} onSubmit={testHandleSubmit} readOnly={submitting}>
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
        <FormItem container xs={12}>
          <FormItem xs={12} md={4}>
            <FormInput name="date" label="date" component={DatePicker} showPopupIcon />
          </FormItem>
        </FormItem>
        <FormItem xs={4}>
          <FormInput name="country" label="country" select>
            <MenuItem value="cn">cn</MenuItem>
            <MenuItem value="us">us</MenuItem>
            <MenuItem value="fr">fr</MenuItem>
            <MenuItem value="uk">uk</MenuItem>
          </FormInput>
        </FormItem>
        <FormItem xs={4}>
          <FormInput
            name="age"
            label="age"
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value={''}></option>
            <option value={20}>20+</option>
            <option value={30}>30+</option>
            <option value={40}>40+</option>
            <option value={50}>50+</option>
          </FormInput>
        </FormItem>
        <FormItem container xs={12}>
          <FormItem xs={4}>
            <FormInput name="checked" label="checked" component={Checkbox} />
          </FormItem>
        </FormItem>

        <FormItem xs={12} sx={{ gap: 2, display: 'flex' }}>
          <LoadingButton type="submit" loading={submitting}>
            提交
          </LoadingButton>
          <Button type="reset" disabled={submitting} onClick={() => form.reset()}>
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export const TranslateError = () => {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<TestFormValues>({
    defaultValues: {
      name: '',
      password: '',
      description: '',
      date: '',
      age: '',
      country: '',
      checked: false,
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: TestFormValues) => {
    setSubmitting(true);
    await delayms(1500);
    console.log(data);
    setSubmitting(false);
    throw {
      message: 'error!',
      fields: [{ field: 'name', message: 'duplicated', lang: 'EN' }],
    };
  };
  const translateError = ({
    message,
    fields,
  }: {
    message: string;
    fields?: {
      field: string;
      message: string;
      lang: string;
    }[];
  }) => {
    return {
      message,
      fields: fields?.map(({ field, message, lang }) => {
        if (lang === 'EN' && message === 'duplicated' && field === 'name') {
          return {
            field,
            message: `用户名已存在`,
          };
        }

        return {
          field,
          message: `Translated(${lang}): ${message}`,
        };
      }),
    };
  };
  const handleSubmit = useFormSubmitHandler(form, onSubmit, { translateError, noThrow: true });

  return (
    <div style={{ padding: 10 }}>
      <Form form={form} onSubmit={handleSubmit} readOnly={submitting}>
        <FormItem xs={6}>
          <FormInput type="text" name="name" label="用户名" />
        </FormItem>
        <FormItem xs={6}>
          <FormInput type="password" name="password" label="密码" />
        </FormItem>
        <FormItem>
          <FormInput
            multiline
            minRows={2}
            maxRows={4}
            name="description"
            label="详情描述"
            variant="outlined"
          />
        </FormItem>
        <FormItem container xs={12}>
          <FormItem xs={12} md={4}>
            <FormInput name="date" label="date" component={DatePicker} showPopupIcon />
          </FormItem>
        </FormItem>
        <FormItem xs={4}>
          <FormInput name="country" label="country" select>
            <MenuItem value="cn">cn</MenuItem>
            <MenuItem value="us">us</MenuItem>
            <MenuItem value="fr">fr</MenuItem>
            <MenuItem value="uk">uk</MenuItem>
          </FormInput>
        </FormItem>
        <FormItem xs={4}>
          <FormInput
            name="age"
            label="age"
            select
            type="number"
            SelectProps={{
              native: true,
            }}
          >
            <option value={''}></option>
            <option value={20}>20+</option>
            <option value={30}>30+</option>
            <option value={40}>40+</option>
            <option value={50}>50+</option>
          </FormInput>
        </FormItem>
        <FormItem container xs={12}>
          <FormItem xs={4}>
            <FormInput name="checked" label="checked" component={Checkbox} />
          </FormItem>
        </FormItem>
        <FormItem xs={12} sx={{ gap: 2, display: 'flex' }}>
          <LoadingButton type="submit" loading={submitting}>
            提交
          </LoadingButton>
          <Button type="reset" onClick={() => form.reset()}>
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export const ReadOnly = () => {
  const form = useForm<TestFormValues>({
    defaultValues: {
      name: 'testName',
      password: '*********',
      description: 'fsdfsdfa\n4324234\nffffffffffff\n222',
      date: new Date(),
      country: 'cn',
      age: 20,
      checked: true,
    },
  });

  return (
    <div style={{ padding: 10, flexGrow: 1 }}>
      <Form form={form} readOnly>
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
        <FormItem container xs={12}>
          <FormItem xs={12} md={4}>
            <FormInput name="date" label="date" component={DatePicker} showPopupIcon />
          </FormItem>
        </FormItem>
        <FormItem xs={4}>
          <FormInput name="country" label="country" select>
            <MenuItem value="cn">cn</MenuItem>
            <MenuItem value="us">us</MenuItem>
            <MenuItem value="fr">fr</MenuItem>
            <MenuItem value="uk">uk</MenuItem>
          </FormInput>
        </FormItem>
        <FormItem xs={4}>
          <FormInput
            name="age"
            label="age"
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value={''}></option>
            <option value={20}>20+</option>
            <option value={30}>30+</option>
            <option value={40}>40+</option>
            <option value={50}>50+</option>
          </FormInput>
        </FormItem>
        <FormItem container xs={12}>
          <FormItem xs={4}>
            <FormInput name="checked" label="checked" component={Checkbox} />
          </FormItem>
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
        <Grid container xs={12}>
          <Grid xs={12} md={4}>
            <DatePicker fullWidth name="date" label="date" showPopupIcon />
          </Grid>
        </Grid>
        <Grid xs={4}>
          <TextField fullWidth name="country" label="country" select>
            <MenuItem value="cn">cn</MenuItem>
            <MenuItem value="us">us</MenuItem>
            <MenuItem value="fr">fr</MenuItem>
            <MenuItem value="uk">uk</MenuItem>
          </TextField>
        </Grid>
        <Grid xs={4}>
          <TextField
            fullWidth
            name="age"
            label="age"
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value={''}></option>
            <option value={20}>20+</option>
            <option value={30}>30+</option>
            <option value={40}>40+</option>
            <option value={50}>50+</option>
          </TextField>
        </Grid>
        <Grid container xs={12}>
          <Grid xs={4}>
            <Checkbox name="checked" label="checked" defaultValue={true} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
