import * as React from 'react';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Form, {
  FormItem,
  useForm,
  FormInput,
  SubmitError,
  FormInputProps,
  useFormSubmitHandler,
} from '../Form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginRequestBodySchema = z.object({
  username: z.string().min(1, { message: '请输入用户名' }).default(''),
  password: z.string().min(1, { message: '请输入密码' }).default(''),
});

export type LoginRequestBody = z.infer<typeof LoginRequestBodySchema>;

type LoginProps = {
  onLogin: (res: LoginRequestBody) => void | SubmitError | Promise<void | SubmitError>;
  inputVariant?: FormInputProps['variant'];
};

function PasswordLoginBox(props: LoginProps) {
  const { onLogin, inputVariant = 'outlined' } = props;

  const [inLogin, setInLogin] = React.useState(false);
  const form = useForm<LoginRequestBody>({
    resolver: zodResolver(LoginRequestBodySchema),
    defaultValues: { username: '', password: '' },
  });

  const handleLogin = useFormSubmitHandler(
    form,
    async (values: LoginRequestBody) => {
      try {
        setInLogin(true);
        const result = await onLogin(values);
        return result;
      } finally {
        setInLogin(false);
      }
    },
    { noThrow: true }
  );

  return (
    <Form form={form} onSubmit={handleLogin} readOnly={inLogin}>
      <FormItem>
        <FormInput variant={inputVariant} name="username" label="用户名" fullWidth helperText=" " />
      </FormItem>
      <FormItem>
        <FormInput
          variant={inputVariant}
          type="password"
          name="password"
          label="密码"
          fullWidth
          helperText=" "
        />
      </FormItem>
      <FormItem>
        <Box sx={{ px: 1, pt: 4 }}>
          <LoadingButton
            loading={inLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            登录
          </LoadingButton>
        </Box>
      </FormItem>
    </Form>
  );
}

export default PasswordLoginBox;
