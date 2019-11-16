import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { ResponsivePage } from '../../components/Page';
import UserAvatar from '../UserAvatar';
import { Pane, Heading } from 'evergreen-ui';

const Wrapper = styled(Pane)`
  height: ${p => p.theme.headerHeight}px;
`;

const Separator = styled(Pane)`
  width: 1px;
  height: 18px;
  margin-left: 32px;
  margin-right: 32px;
  background-color: ${p => p.theme.colors.border.default};
  @media ${p => p.theme.mobile} {
    display: none;
  }
`;

const Grow = styled(Pane)`flex-grow: 1;`;

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Wrapper
        display="flex"
        alignItems="center"
        borderBottom
        borderLeft
        borderRight
      >
        <ResponsivePage
          display="flex"
          alignItems="center"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <Heading>Flashcards</Heading>
          <Separator />
          <Grow />
          <UserAvatar />
        </ResponsivePage>
      </Wrapper>
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
