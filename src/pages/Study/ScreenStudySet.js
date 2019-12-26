import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import setPropTypes from '../../common/setPropTypes';
import FlashcardsComposerGrid from '../../containers/Composers/Flashcards/FlashcardsComposerGrid';


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
