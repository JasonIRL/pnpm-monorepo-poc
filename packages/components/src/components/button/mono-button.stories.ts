import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Button',
  component: 'mono-button',
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['Primary', 'Secondary'],
    },
  },
  render: args => `<mono-button text="${args.text}" type="${args.type}"></mono-button>`,
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    text: 'Button Test 5',
    type: 'Primary',
  },
};
