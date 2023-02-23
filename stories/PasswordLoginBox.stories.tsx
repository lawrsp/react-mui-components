import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PasswordLoginBox } from '../src';

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
  <div
    style={{
      width: 600,
      height: 'auto',
      border: '1px solid #000000',
      padding: '40px 24px',
      borderRadius: '8px',
      borderColor: '#e3e3d3',
      margin: '60px auto',
    }}
  >
    <PasswordLoginBox {...args} />
  </div>
);

export const Passwordbox = Template.bind({});
Passwordbox.args = {
  onLogin: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('resolve===============', resolve);
        reject({
          message: 'error in login',
          fields: [{ field: 'username', message: 'not found' }],
        });
      }, 2000);
    });
  },
};
