import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import api from './redux/api';
import * as authActions from './redux/modules/auth/actions';

import Login from './pages/Login/Login';

class Routes extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  componentDidMount() {
    api.init();
    this.props.authActions.setAuthObserver();
  }

  render() {

    return (
      <Login />
    );
  }
}

Routes.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  requests: state.requests,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
