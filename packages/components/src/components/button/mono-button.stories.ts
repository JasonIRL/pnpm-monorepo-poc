import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button',
  component: 'mono-button',
  render: args => `<mono-button text="hi mom"></mono-button>`,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    text: 'Button',
  },
};
