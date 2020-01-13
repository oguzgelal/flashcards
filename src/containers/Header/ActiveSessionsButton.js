import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import { Popover, Position, Icon, Pill, Menu } from 'evergreen-ui';

import { MinimalButton } from '../../components/Button'
import SessionLauncherSidesheet from './SessionLauncherSidesheet';

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
        <Popover
          width={80}
          position={Position.BOTTOM_RIGHT}
          content={({ close }) => (
            <Menu>
              <Menu.Group title={sessionCount === 0 ? "No Active Sessions" : "Sessions"}>
                {sessionCount > 0 && Object.values(sessions).map(s => (
                  <Menu.Item icon="application" key={get(s, 'id')}>
                    {get(s, 'settings.title') || 'Untitled session'}
                  </Menu.Item>
                ))}
              </Menu.Group>
              <Menu.Divider />
              <Menu.Group>
                <Menu.Item
                  icon="add"
                  onSelect={() => {
                    this.setState({ sessionsOpen: true })
                    close();
                  }}
                >
                  New Session
                </Menu.Item>
              </Menu.Group>
            </Menu>
          )}
        >
          <MinimalButton style={this.props.style}>
            <Icon icon="application" />
            {sessionCount > 0 && (
              <SessionCount color="red" isSolid>
                {sessionCount}
              </SessionCount>
            )}
          </MinimalButton>
        </Popover>

          <SessionLauncherSidesheet
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
