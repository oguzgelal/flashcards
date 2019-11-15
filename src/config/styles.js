import { createGlobalStyle } from 'styled-components'

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

export default {
  mobile: css => `@media (max-width: 480px) {${css}}`,
}
