/** @type { import('@storybook/web-components').Preview } */

import { defineCustomElements } from '@monorepo/components/loader';
import '@monorepo/theme/dist/index.css';

defineCustomElements();

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
