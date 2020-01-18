import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { Button, Menu } from '@blueprintjs/core';
import { Select } from "@blueprintjs/select";

import Device from '../../components/Device/Device';
import { LOGOUT } from '../../redux/modules/auth/types';
import * as authActions from '../../redux/modules/auth/actions';

class UserAvatar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    const isLoggingOut = this.props.loading[LOGOUT];

    return (
      <Select
        resetOnSelect
        resetOnClose
        filterable={false}
        items={[
          {
            settings: true,
            text: 'Settings',
            icon: 'settings',
            onClick: () => {}
          },
          {
            logout: true,
            text: isLoggingOut ? "Logging out..." : "Logout",
            icon: 'log-out',
            onClick: () => {
              this.props.authActions.logout()
            }
          }
        ]}
        onItemSelect={(item, event) => item.onClick()}
        itemRenderer={(item, { handleClick, modifiers }) => (
          <Menu.Item
            icon={item.icon}
            text={item.text}
            active={modifiers.active}
            onClick={handleClick}
          />
        )}
      >
        <Device>
          {({ mobile }) => (
            <Button
              minimal
              style={this.props.style}
              icon="user"
              rightIcon="caret-down"
            >
              {!mobile && 'Profile'}
            </Button>
          )}
        </Device>
      </Select>
    );
  }
}

UserAvatar.propTypes = {
  loading: PropTypes.bool,
  authActions: PropTypes.object,
  style: PropTypes.object,
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
)(UserAvatar);
