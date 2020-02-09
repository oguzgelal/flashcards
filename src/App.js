import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { Router, Route } from "react-router-dom";
import { Spinner, FocusStyleManager } from "@blueprintjs/core";

import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'animate.css/animate.min.css';

import history from './config/history';
import api from './redux/api';
import * as authActions from './redux/modules/auth/actions';
import * as miscActions from './redux/modules/misc/actions';
import { INIT } from './redux/modules/auth/types';

import Header from './containers/Header/Header';
import Page from './components/Page';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Study from './pages/Study/Study';
import Sessions from './pages/Sessions/Sessions';

import {
  STUDY,
  SESSION,
} from './config/routes';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  componentDidMount() {
    api.init();
    history.listen(() => this.forceUpdate());
    this.props.authActions.setAuthObserver();
    FocusStyleManager.onlyShowFocusOnTabs();
  }

  render() {
    const isInitializing = this.props.loading[INIT];
    const isUserLoggedIn = !isNil(get(this.props, 'auth.user'))

    if (isInitializing) {
      return (
        <Page full center hasHeader={false}>
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
      <Router history={history}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path={`/${STUDY}`} component={Study} />
        <Route exact path={`/${STUDY}/:topicId`} component={Study} />
        <Route exact path={`/${STUDY}/:topicId/:setId`} component={Study} />
        <Route exact path={`/${SESSION}/:sessionId`} component={Sessions} />
      </Router>
    )
  }
}

App.propTypes = {
  loading: PropTypes.object,
  requests: PropTypes.object,
  auth: PropTypes.object,
  authActions: PropTypes.object,
  miscActions: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
  requests: state.requests,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  miscActions: bindActionCreators(miscActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
