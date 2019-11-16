import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { Spinner } from 'evergreen-ui';
import { BrowserRouter as Router, Route } from "react-router-dom";

import api from './redux/api';
import * as authActions from './redux/modules/auth/actions';
import { INIT } from './redux/modules/auth/types';

import Header from './containers/Header';
import Page from './components/Page';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Study from './pages/Study/Study';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  componentDidMount() {
    api.init();
    this.props.authActions.setAuthObserver();
  }

  render() {

    const isInitializing = this.props.loading[INIT];
    const isUserLoggedIn = !isNil(get(this.props, 'auth.user'))

    if (isInitializing) {
      return (
        <Page full center>
          <Spinner />
        </Page>
      )
    }

    if (!isUserLoggedIn) {
      return (
        <Login />
      );
    }

    return (
      <>
        <Header />
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/study" component={Study} />
        </Router>
      </>
    )
  }
}

App.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
  requests: state.requests,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
