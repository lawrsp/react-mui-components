import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoadingPage from '../src/LoadingPage/LoadingPage';

export default {
  title: 'Example/LoadingPage',
  component: LoadingPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoadingPage>;

const Template: ComponentStory<typeof LoadingPage> = (args) => <LoadingPage {...args} />;

export const Simple = Template.bind({});

export const CustomText = Template.bind({});
CustomText.args = {
  text: '加载中...',
  textSx: { ml: 4 },
};
