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
    background-color: white;
  }

  a {
    text-decoration: none !important;
  }
`;

export const sizeMobile = 700;
export const sizeTablet = 1100;
export const sizeLaptop = 1440;
export const sizeDesktop = 1440;

const theme = {
  bodyPadding: 22,
  mobile: `(max-width: ${sizeMobile}px)`,
  tablet: `(max-width: ${sizeTablet}px)`,
  laptop: `(max-width: ${sizeLaptop}px)`,
  desktop: `(max-width: ${sizeDesktop}px)`,
  headerHeight: 52,
  ...defaultTheme,

  flashcardBackground: get(defaultTheme, 'palette.neutral.dark'),
  flashcardTextColor: get(defaultTheme, 'palette.neutral.lightest'),
};

if (process.env.NODE_ENV !== 'production') {
  window.theme = theme;
}

export default theme;
