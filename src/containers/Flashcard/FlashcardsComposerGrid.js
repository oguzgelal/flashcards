import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import setPropTypes from '../../common/setPropTypes';
import Grid from '../../components/Grid';
import ComposerGroup from '../../components/Composer/ComposerGroup';
import FlashcardComposer from './FlashcardComposer';

class FlashcardsComposerGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    const setFlashcards = get(this.props, 'set.flashcards') || {};

    return (
      <ComposerGroup title="Flashcards">
        <Grid
          gap={32}
          autoHeight
          columns={[2, 2, 1]}
          style={{ marginTop: 32 }}
        >
          {Object.values(setFlashcards).map(flashcard => (
            <FlashcardComposer
              key={flashcard.id}
              set={this.props.set}
              flashcard={flashcard}
            />
          ))}
        </Grid>
      </ComposerGroup>
    );
  }
}

FlashcardsComposerGrid.propTypes = {
  set: setPropTypes,
};

const mapStateToProps = (state, ownProps) => ({
  // loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  // sessionActions: bindActionCreators(sessionActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashcardsComposerGrid);
