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
import { SESSION_KIND_FLASHCARD } from '../../models/SessionFlashcards';

class FlashcardsComposerGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    const setFlashcards = get(this.props, 'set.flashcards') || {};
    const sessions = get(this.props, 'sessions') || {};
    const flashcardSessionIds = Object.values(sessions)
      .filter(s => get(s, 'origin.type') === SESSION_KIND_FLASHCARD)
      .reduce((acc, s) => ({ ...acc, [get(s, 'origin.id')]: get(s, 'id') }), {});

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
              activeSession={flashcardSessionIds[flashcard.id]}
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
  sessions: state.sessions,
});

const mapDispatchToProps = dispatch => ({
  // sessionActions: bindActionCreators(sessionActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashcardsComposerGrid);
