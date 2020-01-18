import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { Icon, H3, Navbar } from "@blueprintjs/core";
import { ResponsivePage } from '../../components/Page';
import UserAvatar from './UserAvatar';
import ActiveSessionsButton from './ActiveSessionsButton';
import Device from '../../components/Device/Device';
const Grow = styled.div`
  flex-grow: 1;
`;

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Device>
        {({ mobile }) => (
          <Navbar
            style={{
              paddingLeft: 0,
              paddingRight: 0
            }}
          >
            <ResponsivePage
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: 0,
                paddingBottom: 0
              }}
            >
              <Navbar.Group>
                <Navbar.Heading style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon="grid-view" style={{ marginRight: mobile ? 8 : 12 }} />
                  <H3 style={{ margin: 0 }}>Flashcards</H3>
                </Navbar.Heading>
                {!mobile && <Navbar.Divider />}
              </Navbar.Group>

              <Grow />

              <Navbar.Group>
                <ActiveSessionsButton style={{ marginLeft: mobile ? 8 : 12 }} />
                <UserAvatar style={{ marginLeft: mobile ? 8 : 12 }} />
              </Navbar.Group>

            </ResponsivePage>
          </Navbar>
        )}
      </Device>
    );
  }
}

Header.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  // loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  // authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
