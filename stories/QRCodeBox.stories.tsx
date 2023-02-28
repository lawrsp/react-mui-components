import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import QRCodeBox from '../src/QRCodeBox/QRCodeBox';

export default {
  title: 'Example/QRCodeBox',
  component: QRCodeBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof QRCodeBox>;

const Template: ComponentStory<typeof QRCodeBox> = (args) => (
  <div
    style={{
      background: '#f1f2f3',
      padding: '8px',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <QRCodeBox {...args} />
  </div>
);

export const QRCode = Template.bind({});
QRCode.args = {
  value: 'test1234567890test1234567890test1234567890test1234567890test1234567890',
  size: 256,
  level: 'H',
};

export const Empty = Template.bind({});
Empty.args = {
  value: '',
  size: 256,
  level: 'H',
};

export const LoadingBig = Template.bind({});
LoadingBig.args = {
  loading: true,
  value: 'test1234567890',
  size: 512,
};

export const Adpative = () => (
  <div
    style={{
      background: '#f1f2f3',
      padding: '8px',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <QRCodeBox value="hello world" />
  </div>
);
