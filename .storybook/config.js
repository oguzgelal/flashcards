import { addDecorator, addParameters, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { create, themes } from '@storybook/theming';

addDecorator(withKnobs);
addParameters({
  options: {
    theme: create({ ...themes.light })
  },
});

configure(() => {
  const req = require.context('../src/', true, /\.story\.js$/);
  req.keys().forEach(filename => req(filename));
}, module);
