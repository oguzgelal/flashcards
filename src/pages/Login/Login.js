import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from '../../components/Page';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {
  Heading,
  Pane,
  Card,
  majorScale,
  minorScale
} from 'evergreen-ui';

import { LOGIN } from '../../redux/modules/auth/types';
import * as authActions from '../../redux/modules/auth/actions';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
    };
  }

  render() {

    const loggingIn = this.props.loading[LOGIN];

    return (
      <Page
        display="flex"
        alignItems="center"
        justifyContent="center"
      >

        <Card
          width={320}
          display="flex"
          flexFlow="column"
          background="tint1"
          border
          padding={minorScale(3)}
        >
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Heading
              size="700"
              marginBottom={minorScale(4)}
            >
              こんにちは！
            </Heading>
          </Pane>

          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.authActions.login({
                email: this.state.email,
                password: this.state.password
              })
            }}
          >

            <TextInput
              width="100%"
              type="email"
              placeholder="Email"
              marginBottom={minorScale(2)}
              height={majorScale(4)}
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />

            <TextInput
              width="100%"
              type="password"
              placeholder="Password"
              marginBottom={minorScale(4)}
              height={majorScale(4)}
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />

            <Button
              type="submit"
              width="100%"
              appearance="primary"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={majorScale(4)}
              isLoading={loggingIn}
              disabled={(
                loggingIn ||
                !this.state.email ||
                !this.state.password
              )}
            >
              {loggingIn && "Logging in..."}
              {!loggingIn && "Login"}
            </Button>

          </form>

        </Card>
      </Page>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.object,
  authActions: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
