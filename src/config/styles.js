import { createGlobalStyle } from 'styled-components'
import { defaultTheme, minorScale } from 'evergreen-ui';
import get from 'lodash/get';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  a {
    text-decoration: none !important;
  }
`;

const theme = {
  bodyPadding: 22,
  mobile: `(max-width: 700px)`,
  tablet: `(max-width: 1100px)`,
  laptop: `(max-width: 1440px)`,
  desktop: `(max-width: 2560px)`,
  headerHeight: 52,
  ...defaultTheme,

  flashcardBackground: get(defaultTheme, 'palette.neutral.dark'),
  flashcardTextColor: get(defaultTheme, 'palette.neutral.lightest'),
};

if (process.env.NODE_ENV !== 'production') {
  window.theme = theme;
}

export default theme;
