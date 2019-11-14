import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Base from './components/Base';
import store from './redux/store';
import theme, { GlobalStyle } from './config/styles';

const app = (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <>
        <Base />
        <GlobalStyle />
      </>
    </Provider>
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
