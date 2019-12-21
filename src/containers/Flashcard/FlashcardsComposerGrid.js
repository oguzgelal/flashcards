import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import flashcardsPropTypes from '../../common/flashcardsPropTypes';

import Grid from '../../components/Grid';
import ComposerGroup from '../../components/Composer/ComposerGroup';
import FlashcardComposer from './FlashcardComposer';
import { SESSION_TYPE_FLASHCARD } from '../../models/SessionFlashcards';

import data from '../../lib/tmpdata';

class FlashcardsComposerGrid extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    const setFlashcardIds = get(this.props, 'flashcards') || {};

    // grab sets
    const sets = get(data, 'sets');

    // get active flashcard sessions
    const sessions = get(this.props, 'sessions') || {};
    const flashcardSessionIds = Object.values(sessions)
      .filter(s => get(s, 'origin.type') === SESSION_TYPE_FLASHCARD)
      .reduce((acc, s) => ({ ...acc, [get(s, 'origin.id')]: get(s, 'id') }), {});

    return (
      <ComposerGroup
        title="Flashcards"
        forceMobile={this.props.forceMobile}
      >
        <Grid
          gap={32}
          autoHeight
          columns={this.props.columns || [2, 2, 1]}
          style={{ marginTop: 32 }}
        >
          {Object.keys(setFlashcardIds).map(flashcardId => {
            const flashcard = get(data, `common.flashcards['${flashcardId}']`);
            return (
              <FlashcardComposer
                key={flashcard.id}
                set={get(sets, flashcard.sid)}
                flashcard={flashcard}
                activeSession={flashcardSessionIds[flashcard.id]}
              />
            )
          })}
        </Grid>
      </ComposerGroup>
    );
  }
}

FlashcardsComposerGrid.propTypes = {
  // ie. { [flashcoard_id]: flashcoard, ... }
  flashcards: flashcardsPropTypes,
  columns: PropTypes.array,
  forceMobile: PropTypes.bool,
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
