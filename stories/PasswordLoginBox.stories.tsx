import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PasswordLoginBox } from '../dist/index.es';
import { Button } from '@mui/material';

export default {
  title: 'Example/PasswordLoginBox',
  component: PasswordLoginBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PasswordLoginBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PasswordLoginBox> = (args) => (
  <div>
    <PasswordLoginBox {...args} />
    <div style={{ height: 20 }} />
    <Button color="primary" variant="contained">
      check color
    </Button>
  </div>
);

export const Passwordbox = Template.bind({});
Passwordbox.args = {
  onLogin: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('resolve===============', resolve);
        resolve({
          message: 'error in login',
          fields: [{ field: 'username', message: 'not found' }],
        });
      }, 2000);
    });
  },
};
