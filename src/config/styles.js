import { createGlobalStyle } from 'styled-components'
import { defaultTheme } from 'evergreen-ui';
import get from 'lodash/get';

// eslint-disable-next-line
const bp = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!@blueprintjs/core/lib/scss/variables.scss');

// theme specific variables
const t = {
  appBg: () => get(bp, 'ptAppBackgroundColor'),

  // flashcard
  flashcardBgFront: () => get(bp, 'blue4'),
  flashcardColorFront: () => get(bp, 'lightGray5'),
  flashcardBgBack: () => get(bp, 'lightGray5'),
  flashcardColorBack: () => get(bp, 'blue3'),

  // tables
  tablesHeaderCellBg: () => get(bp, 'blue4'),
  tablesHeaderCellColor: () => get(bp, 'lightGray5'),
  tablesCellBg: () => get(bp, 'lightGray5'),
  tablesCellColor: () => get(bp, 'blue3'),
}

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
`;

export const sizeMobile = 700;
export const sizeTablet = 1100;
export const sizeLaptop = 1440;
export const sizeDesktop = 1440;

const theme = {
  t,
  bp,
  bodyPadding: 22,
  bodyPaddingCover: `
    margin-left: -22px;
    width: calc(100% + 44px);
  `,
  mobile: `(max-width: ${sizeMobile}px)`,
  tablet: `(max-width: ${sizeTablet}px)`,
  laptop: `(max-width: ${sizeLaptop}px)`,
  desktop: `(max-width: ${sizeDesktop}px)`,
  headerHeight: 52,
  ...defaultTheme,

};

if (process.env.NODE_ENV !== 'production') {
  window.theme = theme;
}

export default theme;
