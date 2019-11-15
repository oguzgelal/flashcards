import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from '../../components/Page';
import {
  Button
} from 'evergreen-ui';

import { LOGOUT } from '../../redux/modules/auth/types';
import * as authActions from '../../redux/modules/auth/actions';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    const isLoggingOut = this.props.loading[LOGOUT];

    return (
      <Page frame>
        <Button
          isLoading={isLoggingOut}
          disabled={isLoggingOut}
          onClick={() => {
            this.props.authActions.logout()
          }}
        >
          Log Out
        </Button>
      </Page>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.object,
  authActions: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
