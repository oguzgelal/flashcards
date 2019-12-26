import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { Text } from 'evergreen-ui';

import SideSheet from '../../../components/SideSheet';
import FlashcardSettings from './FlashcardSettings';
import { sessionProps } from '../../../containers/Sessions/Session';

const Wrapper = styled.div``;

class FlashcardSession extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showSettings: false,
    };
  }

  render() {
    return (
      <>
        {/* session settings sidesheet */}
        <SideSheet
          isOpen={this.props.showSettings}
          close={() => this.setState({ showSettings: false })}
        >
          <FlashcardSettings />
        </SideSheet>

        {/* session contents */}
        <Wrapper>
          <Text>Flashcards!!!</Text>
        </Wrapper>
      </>
    );
  }
}

FlashcardSession.propTypes = {
  ...sessionProps
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
)(FlashcardSession);
