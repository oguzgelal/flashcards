import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import setPropTypes from '../../common/setPropTypes';
import FlashcardsComposerGrid from '../../containers/Flashcard/FlashcardsComposerGrid';

import ComposerGroup from '../../components/Composer/ComposerGroup';


const Wrapper = styled.div`
  ${p => p.theme.bodyPaddingCover}
  background-color: inherit;
`;

class ScreenStudySet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    const setFlashcards = get(this.props, 'set.flashcards') || {};

    return (
      <Wrapper>
        <FlashcardsComposerGrid
          flashcards={setFlashcards}
        />

        <ComposerGroup title="Test 1">
          <div style={{ height: 520 }} />
        </ComposerGroup>

        <ComposerGroup title="Test 2">
          <div style={{ height: 820 }} />
        </ComposerGroup>

        <ComposerGroup title="Test 3">
          <div style={{ height: 320 }} />
        </ComposerGroup>
      </Wrapper>
    );
  }
}

ScreenStudySet.propTypes = {
  set: setPropTypes,
};

ScreenStudySet.defaultProps = {
  set: {},
}

const mapStateToProps = (state, ownProps) => ({
  // loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  // sessionActions: bindActionCreators(sessionActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenStudySet);
