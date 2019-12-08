import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import Grid from '../../components/Grid';
import { FlashcardItem, FlashcardPreview } from '../../components/Flashcard';
import setPropTypes from '../../common/setPropTypes';
import * as sessionTypes from '../../redux/modules/sessions/types';
import * as sessionActions from '../../redux/modules/sessions/actions';
import flashcards, { SESSION_KIND_FLASHCARD } from '../../models/Flashcards';

class ScreenStudySet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    const setId = get(this.props, 'set.id');
    const topicId = get(this.props, 'set.topic');
    const setFlashcards = get(this.props, 'set.flashcards') || {};
    const setKeys = get(this.props, 'set.keys') || {};

    return (
      <Grid
        gap={32}
        autoHeight
        columns={[2, 2, 1]}
        style={{ marginTop: 32 }}
      >
        {Object.values(setFlashcards).map(flashcard => {
          const flashcardId = get(flashcard, 'id');
          const flashcardFrontKey = get(flashcard, 'front');
          const flashcardBackKey = get(flashcard, 'back');
          const flashcardFront = get(setKeys, flashcardFrontKey);
          const flashcardBack = get(setKeys, flashcardBackKey);

          // session
          const kind = SESSION_KIND_FLASHCARD;
          const origin = flashcards.generateOrigin({ setId, topicId, flashcardId })
          const title = `Flashcards: ${flashcardFront} to ${flashcardBack}`;
          const flashcardSessionStarting = get(this.props, `loading['${sessionTypes.SESSION_START}_${origin}']`)
          return (
            <FlashcardPreview
              key={`${setId}_${flashcardId}`}
              frontItem={(
                <FlashcardItem
                  alignLeft
                  title="Front"
                  value={flashcardFront}
                />
              )}
              backItem={(
                <FlashcardItem
                  alignLeft
                  title="Back"
                  value={flashcardBack}
                />
              )}
              buttons={[{
                label: flashcardSessionStarting ? 'Starting...' : 'Start',
                disabled: flashcardSessionStarting,
                onClick: () => {
                  this.props.sessionActions.sessionStart({
                    kind,
                    origin,
                    title,
                  });
                },
              }]}
            />
          )
        })}
      </Grid>
    );
  }
}

ScreenStudySet.propTypes = {
  set: setPropTypes,
  loading: PropTypes.object,
  sessionActions: PropTypes.object,
};

ScreenStudySet.defaultProps = {
  set: {},
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  sessionActions: bindActionCreators(sessionActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenStudySet);
