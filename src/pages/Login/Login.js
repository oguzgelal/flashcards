import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, InputGroup, Intent, H2 } from '@blueprintjs/core';
import Page from '../../components/Page';
import { LOGIN } from '../../redux/modules/auth/types';
import * as authActions from '../../redux/modules/auth/actions';

const Wrapper = styled.div`
  width: 100%;
  max-width: 420px;
  margin: auto;
  display: flex;
  flex-flow: column;
  background-color: white;
  border: 1px solid ${p => p.theme.colors.border.default};
  border-radius: 4px;
  padding: 22px;
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

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
      <Page hasHeader={false} frame center>

        <Wrapper>
          <Heading
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <H2>
              こんにちは！
            </H2>
          </Heading>

          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.authActions.login({
                email: this.state.email,
                password: this.state.password
              })
            }}
          >

            <InputGroup
              type="email"
              placeholder="Email"
              value={this.state.email}
              style={{ marginBottom: 4 }}
              onChange={e => this.setState({ email: e.target.value })}
            />

            <InputGroup
              type="password"
              placeholder="Password"
              value={this.state.password}
              style={{ marginBottom: 8 }}
              onChange={e => this.setState({ password: e.target.value })}
            />

            <Button
              large
              fill
              type="submit"
              intent={Intent.PRIMARY}
              loading={loggingIn}
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

        </Wrapper>
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
