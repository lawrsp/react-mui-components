import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoadingButton from '../src/LoadingButton/LoadingButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/LoadingButton',
  component: LoadingButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoadingButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoadingButton> = (args) => <LoadingButton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  color: 'primary',
  children: '提交',
  loading: true,
  size: 'medium',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: '提交',
  loading: true,
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: '提交',
  loading: true,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: '提交',
  loading: true,
};
