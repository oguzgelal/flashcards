import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { Pane, Heading, Icon } from 'evergreen-ui';

import { ResponsivePage } from '../../components/Page';
import UserAvatar from './UserAvatar';
import ActiveSessionsButton from './ActiveSessionsButton';

const Wrapper = styled.div`
  height: ${p => p.theme.headerHeight}px;
  display: flex;
  align-items: center;
  border-bottom: ${p => `1px solid ${p.theme.t.borderColor.light}`};
`;

const Separator = styled.div`
  width: 1px;
  height: 18px;
  margin-left: 32px;
  margin-right: 32px;
  background-color: ${p => p.theme.t.borderColor.light};
  @media ${p => p.theme.mobile} { display: none; }
`;

const HeadingIcon = styled(Icon)`
  color: ${p => p.theme.colors.text.dark};
`;

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
      <Wrapper>
        <ResponsivePage
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          <HeadingIcon icon="grid-view" marginRight={12} />
          <Heading size={600}>Flashcards</Heading>
          <Separator />
          <Grow />
          <ActiveSessionsButton style={{ marginLeft: 12 }} />
          <UserAvatar style={{ marginLeft: 12 }} />
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
