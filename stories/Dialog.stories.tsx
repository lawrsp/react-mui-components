import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { TextField } from '@mui/material';
import {
  EditDialog,
  ConfirmDialog,
  MaxDialog,
  useConfirmPopover,
  useConfirmDialog,
  ConfirmProvider,
  type DialogActionConfigType,
} from '../src/Dialog';
import { delayms } from '../src/utils/delay';
import { Form, FormItem, FormInput, useForm, useFormSubmitHandler } from '../src/Form';
import LoadingContainer from '../src/LoadingContainer';

export default {
  title: 'Example/Dialog',
};

export const Edit = () => {
  const [open, setOpen] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleClose = () => {
    setOpen(0);
    setLoading(false);
  };

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    action('submit')(ev);
    setSubmitting(true);
    await delayms(3000);
    setSubmitting(false);
  };

  return (
    <div>
      <div>open </div>
      <button onClick={() => setOpen(3)}>open dialog </button>
      <button
        onClick={() => {
          setOpen(2);
          setLoading(true);
        }}
      >
        open dialog and is loading
      </button>
      <button
        onClick={() => {
          setOpen(1);
        }}
      >
        open dialog without actions
      </button>
      <EditDialog
        open={!!open}
        title="test测试"
        onClose={handleClose}
        onSubmit={(open > 1 && handleSubmit) || undefined}
        onReset={(open > 2 && action('reset')) || undefined}
        submitLabel={open > 2 ? '提交' : '确定'}
        fullScreen="md"
        loading={loading}
        submitting={submitting}
      >
        <LoadingContainer loading={loading}>
          <p>hello, this is a eidt dialog </p>
          <p>write some components here...</p>
          <p>input components</p>
          <TextField
            InputProps={{
              readOnly: submitting || loading,
            }}
            variant="outlined"
            defaultValue={loading ? 'this is a input' : ''}
          />
          <p>
            and some long long long long long long long long long long long long long long long
            components...
          </p>
          <p>and more...</p>
          <p>...</p>
          <p>..</p>
          <p>.</p>
        </LoadingContainer>
      </EditDialog>
    </div>
  );
};

export const EditWithForm = () => {
  const [open, setOpen] = React.useState(false);
  const [injectError, setInjectError] = React.useState(1);
  const [submitting, setSubmitting] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const form = useForm({ defaultValues: { name: '' } });

  const handleSubmit = useFormSubmitHandler(form, async (_, ev) => {
    action('submit')(ev);
    setSubmitting(true);
    await delayms(3000);
    setSubmitting(false);

    setInjectError((x) => x + 1);
    if (injectError % 2) {
      throw {
        message: 'error',
        fields: [
          {
            field: 'name',
            message: 'duplicated',
          },
        ],
      };
    }
  });
  const handleReset = () => form.reset();

  return (
    <div>
      <div>open </div>
      <button onClick={() => setOpen(true)}>open dialog </button>
      <EditDialog
        open={!!open}
        title="test测试"
        onClose={handleClose}
        onSubmit={handleSubmit}
        onReset={handleReset}
        fullScreen="md"
        submitting={submitting}
        closeOnSuccess
      >
        <Form form={form} readOnly={submitting}>
          <p>hello, this is a eidt dialog </p>
          <FormItem>
            <FormInput label="name" name="name" />
          </FormItem>
        </Form>
      </EditDialog>
    </div>
  );
};

export const Mini = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleCancel = (v: number) => async (ev: React.SyntheticEvent) => {
    action('submit')(ev);
    if (v === 1) {
      setOpen(false);
    } else if (v === 2) {
      setOpen2(false);
    }
  };

  const handleSubmit = (v: number) => async (ev: React.SyntheticEvent) => {
    action('submit')(ev);
    await delayms(1000);
    if (v === 1) {
      setOpen(false);
    } else if (v === 2) {
      setOpen2(false);
    }
  };

  return (
    <div>
      <div>open </div>
      <button onClick={() => setOpen(true)}>open dialog </button>
      <button onClick={() => setOpen2(true)}>open dialog without title</button>
      <ConfirmDialog
        open={open}
        title="test测试"
        onConfirm={handleSubmit(1)}
        onCancel={handleCancel(1)}
      >
        <div>hello, this is a mini dialog </div>
      </ConfirmDialog>
      <ConfirmDialog open={open2} onConfirm={handleSubmit(2)} onCancel={handleCancel(2)}>
        <div>hello, this is a mini dialog without title </div>
      </ConfirmDialog>
    </div>
  );
};

export const Max = () => {
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [submiting, setSubmiting] = React.useState(false);
  const actions: DialogActionConfigType[] = [
    {
      key: 'save',
      label: '保存',
      show: editing,
      loading: submiting,
      onClick: async (ev) => {
        action('save')(ev);
        setSubmiting(true);
        await delayms(1000);
        setSubmiting(false);
        setEditing(false);
      },
      props: {
        variant: 'contained',
      },
    },
    {
      key: 'cancel',
      label: '取消',
      show: editing,
      disabled: submiting,
      onClick: (ev) => {
        action('cancel')(ev);
        setEditing(false);
      },
      props: {
        variant: 'outlined',
      },
    },
    {
      key: 'edit',
      label: '编辑',
      show: !editing,
      onClick: (ev) => {
        action('save')(ev);
        setEditing(true);
      },
      props: {
        variant: 'outlined',
      },
    },
  ];

  return (
    <div>
      <div>open </div>
      <button onClick={() => setOpen(true)}>open dialog </button>
      <MaxDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Max对话框"
        actions={actions}
        loading={submiting}
      >
        <p>hello world</p>
        <p>this is a full screen dialog</p>
        <div style={{ height: 1000 }}>占位</div>
      </MaxDialog>
    </div>
  );
};

const UseConfirmHookChildren = () => {
  /* const [open, setOpen] = React.useState(false); */

  const openConfirm1 = useConfirmPopover({
    description: 'this is a use confirm popover',
    confirmLabel: '知道了',
    cancelLabel: '',
    onConfirm: (ev: React.SyntheticEvent) => {
      console.log('this is confirmed');
      action('confirm')(ev);
    },
  });

  const openConfirm2 = useConfirmPopover({
    description: 'this is a use confirm popover',
    confirmLabel: '确定',
    title: '有标题的',
    cancelLabel: '取消',
    onCancel: (ev) => {
      action('cancel')(ev);
    },
    onConfirm: (ev) => {
      console.log('this is confirmed');
      action('confirm')(ev);
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  });

  const openConfirm3 = useConfirmDialog({
    description: 'this is a use confirm popup dialog',
    confirmLabel: '确定',
    title: '有标题的',
    cancelLabel: '取消',
    onCancel: (ev) => {
      action('cancel')(ev);
    },
    onConfirm: (ev) => {
      console.log('this is confirmed');
      action('confirm')(ev);
    },
  });

  return (
    <div>
      <div>open </div>
      <button onClick={openConfirm1}>open popover</button>
      <br />
      <button
        onClick={(ev) => {
          openConfirm2(ev);
        }}
      >
        open popover here
      </button>
      <br />
      <button
        onClick={(ev) => {
          openConfirm3(ev);
        }}
      >
        open dialog
      </button>
    </div>
  );
};
export const useConfirmHook = () => {
  return (
    <div>
      <ConfirmProvider>
        <UseConfirmHookChildren />
      </ConfirmProvider>
    </div>
  );
};
