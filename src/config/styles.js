import { createGlobalStyle } from 'styled-components'
import { defaultTheme, minorScale } from 'evergreen-ui';


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
};

export default theme;
