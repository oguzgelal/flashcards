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
`;

const theme = {
  bodyPadding: minorScale(4),
  mobile: `(max-width: 485px)`,
  tablet: `(max-width: 768px)`,
  laptop: `(max-width: 1440px)`,
  desktop: `(max-width: 2560px`,
  ...defaultTheme,
};

export default theme;
