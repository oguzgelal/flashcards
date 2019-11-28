import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { HeaderButton } from '../../components/Button'
import { Tooltip, Icon, Pill } from 'evergreen-ui';

import ActiveSessionsSidesheet from './ActiveSessionsSidesheet';

const SessionCount = styled(Pill)`
  position: absolute;
  right: -6px;
  top: -6px;
`;

class ActiveSessions extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sessionsOpen: false,
    };
  }

  render() {

    const sessions = get(this.props, 'sessions') || {};
    const sessionCount = Object.keys(sessions).length;

    if (sessionCount === 0) return null;

    return (
      <>
        <Tooltip content={`${sessionCount} active session${sessionCount > 1 ? 's' : ''}`}>
          <HeaderButton
            style={this.props.style}
            onClick={() => this.setState({ sessionsOpen: true })}
          >
            <Icon icon="application" />
            <SessionCount color="red" isSolid>{sessionCount}</SessionCount>
          </HeaderButton>
        </Tooltip>
        <ActiveSessionsSidesheet
          isOpen={this.state.sessionsOpen}
          close={() => this.setState({ sessionsOpen: false })}
        />
      </>
    );
  }
}

ActiveSessions.propTypes = {
  style: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  sessions: state.sessions,
});

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveSessions);