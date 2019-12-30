import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { MinimalButton } from '../../components/Button'
import { Icon, Popover, Position, Menu } from 'evergreen-ui';

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
      <Popover
        position={Position.BOTTOM_RIGHT}
        content={
          <Menu>
            <Menu.Group>
              <Menu.Item icon="settings">Settings</Menu.Item>
              <Menu.Item
                icon="log-out"
                onSelect={() => {
                  this.props.authActions.logout();
                }}
              >
                {isLoggingOut && "Logging out..."}
                {!isLoggingOut && "Logout"}
              </Menu.Item>
            </Menu.Group>
          </Menu>
        }
      >
        <MinimalButton style={this.props.style} iconAfter="caret-down">
          <Icon icon="user" />
        </MinimalButton>
      </Popover>
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
