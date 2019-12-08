import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import { ThemeProvider } from 'styled-components';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Base from './components/Base';
import store from './redux/store';
import theme, { GlobalStyle } from './config/styles';

const ReduxWrapper = connect(
  s => ({ misc: s.misc }),
  // d => ({})
)(p => p.children({ misc: p.misc }));

const app = (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ReduxWrapper>
        {({ misc }) => (
          <>
            <Base />
            <GlobalStyle
              store={store}
              accessibility={get(misc, 'accessibility')}
            />
          </>
        )}
      </ReduxWrapper>
    </Provider>
  </ThemeProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
