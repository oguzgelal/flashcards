import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { ResponsivePage } from '../../components/Page';
import UserAvatar from '../UserAvatar';
import { SearchInput } from '../../components/TextInput';
import { Pane, Heading, Icon } from 'evergreen-ui';

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

const HeadingIcon = styled(Icon)`
  color: ${p => p.theme.colors.text.dark};
`;

const Grow = styled(Pane)`
  flex-grow: 1;
`;

const SearchInputWrapper = styled(Pane)`
  @media ${p => p.theme.mobile} {
    width: 120px;
    margin-left: 18px;
  }
`;

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
          <HeadingIcon icon="grid-view" marginRight={12} />
          <Heading size={600}>
            Flashcards
          </Heading>
          <Separator />
          <SearchInputWrapper>
            <SearchInput
              fixedHeight
              width="100%"
              placeholder="Search..."
            />
          </SearchInputWrapper>
          <Grow />
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
