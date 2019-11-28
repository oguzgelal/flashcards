import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { Icon, Portal, SideSheet, Pane, Heading, Paragraph } from 'evergreen-ui';
import { HeaderButton } from '../../components/Button';

import { isMobile } from '../../utils/isDevice';

const Header = styled(Pane)`
  z-index: 1;
  flex-shrink: 0;
  padding: ${p => p.theme.bodyPadding}px;
  display: flex;
`;

const HeadingContainer = styled(Pane)`
  flex-shrink: 0;
  flex-grow: 1;
`;

const CloseButtonContainer = styled(Pane)`
  flex-shrink: 0;
`;

const HeaderButtonStyled = styled(HeaderButton)`
  padding: 8px;
  border-radius: 50%;
  height: unset;
`;

const Body = styled(Pane)`
  flex: 1;
  overflow-y: scroll;
  padding: ${p => p.theme.bodyPadding}px;
`;

class ActiveSessionsSidesheet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  componentDidMount() {
    this.setState({ mobile: isMobile() })
  }

  render() {
    return (
      <Portal>
        <SideSheet
          width={this.state.mobile ? '100%' : 420}
          isShown={this.props.isOpen}
          onCloseComplete={this.props.close}
          preventBodyScrolling
          containerProps={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
          }}
        >
          <Header elevation={0}>
            <HeadingContainer>
              <Heading size={600}>Active Sessions</Heading>
              <Paragraph size={400}>
                Optional description or sub title
              </Paragraph>
            </HeadingContainer>

            {this.state.mobile && (
              <CloseButtonContainer>
                <HeaderButtonStyled onClick={this.props.close}>
                  <Icon icon="cross" />
                </HeaderButtonStyled>
              </CloseButtonContainer>
            )}

          </Header>
          <Body background="tint2">
            <Heading>Some content</Heading>
          </Body>
        </SideSheet>
      </Portal>
    );
  }
}

ActiveSessionsSidesheet.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  // authors: state.authors,
});

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveSessionsSidesheet);
