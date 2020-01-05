import { createGlobalStyle } from 'styled-components'
import { defaultTheme } from 'evergreen-ui';
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

    // disable accessibility mode until tab press
    // box-shadow: none !important;
    // TODO: find a better way to disable accessibility
    ${p => !p.accessibility && `
      * {
        &:focus {
        }
      }
    `}
  }

  // vh fix for ios
  // TODO: is this a bad idea ?
  .📦h_100vh { height: 100% !important; }

  .fc--tooltip {
    z-index: 999 !important;
    @media ${p => p.theme.mobile} {
      display: none;
    }
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

  // flashcard
  flashcardBgFront: get(defaultTheme, 'palette.neutral.dark'),
  flashcardColorFront: get(defaultTheme, 'palette.neutral.lightest'),
  flashcardBgBack: get(defaultTheme, 'palette.neutral.lightest'),
  flashcardColorBack: get(defaultTheme, 'palette.neutral.dark'),

  // tables
  tablesHeaderCellBg: get(defaultTheme, 'palette.neutral.dark'),
  tablesHeaderCellColor: get(defaultTheme, 'palette.neutral.lightest'),
  tablesCellBg: get(defaultTheme, 'palette.neutral.lightest'),
  tablesCellColor: get(defaultTheme, 'palette.neutral.dark'),

};

if (process.env.NODE_ENV !== 'production') {
  window.theme = theme;
}

export default theme;
