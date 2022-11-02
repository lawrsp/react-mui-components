import React from 'react';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Form, { useForm, FormInput, SubmitError } from '../Form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginRequestBodySchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
});

export type LoginRequestBody = z.infer<typeof LoginRequestBodySchema>;

type LoginProps = {
  onLogin: (res: LoginRequestBody) => void | SubmitError | Promise<void | SubmitError>;
};

function PasswordLoginBox(props: LoginProps) {
  const { onLogin } = props;

  const [inLogin, setInLogin] = React.useState(false);
  const form = useForm<LoginRequestBody>({
    resolver: zodResolver(LoginRequestBodySchema),
  });

  const handleLogin = async (values: LoginRequestBody) => {
    setInLogin(true);
    const result = await onLogin(values);
    setInLogin(false);
    return result;
  };

  return (
    <Form form={form} onSubmit={handleLogin}>
      <Grid container>
        <Grid item xs={12}>
          <FormInput name="username" label="用户名" fullWidth helperText=" " />
        </Grid>
        <Grid item xs={12}>
          <FormInput type="password" name="password" label="密码" fullWidth helperText=" " />
        </Grid>
        <Grid item xs={12} sx={{ px: 1, pt: 4 }}>
          <LoadingButton
            loading={inLogin}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            登录
          </LoadingButton>
        </Grid>
      </Grid>
    </Form>
  );
}

export default PasswordLoginBox;
