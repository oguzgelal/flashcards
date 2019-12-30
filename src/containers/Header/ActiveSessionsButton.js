import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import { Icon, Pill } from 'evergreen-ui';

import { MinimalButton } from '../../components/Button'
import Tooltip from '../../components/Tooltip';


import ActiveSessionsSidesheet from './ActiveSessionsSidesheet';

const SessionCount = styled(Pill)`
  position: absolute;
  right: -6px;
  top: -6px;
`;

class ActiveSessionsButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sessionsOpen: false,
    };
  }

  render() {

    const sessions = get(this.props, 'sessions') || {};
    const sessionCount = Object.keys(sessions).length;

    return (
      <>

        {/* active sessions button */}
        <Tooltip content={`${sessionCount} active session${sessionCount > 1 ? 's' : ''}`}>
          <MinimalButton
            style={this.props.style}
            onClick={() => this.setState({ sessionsOpen: true })}
          >
            <Icon icon="application" />
            {sessionCount > 0 && (
              <SessionCount color="red" isSolid>{sessionCount}</SessionCount>
            )}
          </MinimalButton>
        </Tooltip>

        {/* active session sidesheet */}
        <ActiveSessionsSidesheet
          isOpen={this.state.sessionsOpen}
          close={() => this.setState({ sessionsOpen: false })}
        />
      </>
    );
  }
}

ActiveSessionsButton.propTypes = {
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
)(ActiveSessionsButton);
