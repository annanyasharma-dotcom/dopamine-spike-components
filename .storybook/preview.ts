import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(color|background)$/i } },
  },
};

export default preview;
