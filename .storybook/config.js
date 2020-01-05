import { addDecorator, addParameters, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { create, themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addDecorator(withKnobs);
addParameters({
  options: {
    theme: create({ ...themes.light })
  },
  viewport: {
    viewports: {
      small: {
        name: 'Small',
        styles: {
          width: '600px',
          height: '963px',
        },
      },
      large: {
        name: 'Large',
        styles: {
          width: '1440px',
          height: '963px',
        },
      }
    },
  },
});

configure(() => {
  const req = require.context('../src/', true, /\.story\.js$/);
  req.keys().forEach(filename => req(filename));
}, module);
