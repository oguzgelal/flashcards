import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import Grid from '../../components/Grid';
import Flashcard, { FlashcardItem } from '../../components/Flashcard';

const ScreenStudySet = props => {
  const setId = get(props, 'set.id');
  const setFlashcards = get(props, 'set.flashcards') || [];
  const setKeys = get(props, 'set.keys') || {};

  return (
    <Grid autoHeight>
      {setFlashcards.map(flashcard => {
        const flashcardId = get(flashcard, 'id');
        const flashcardFrontKey = get(flashcard, 'front');
        const flashcardBackKey = get(flashcard, 'back');
        const flashcardFront = get(setKeys, flashcardFrontKey);
        const flashcardBack = get(setKeys, flashcardBackKey);
        return (
          <Flashcard
            key={`${setId}_${flashcardId}`}
            revealed
            frontItem={<FlashcardItem title="Front" value={flashcardFront} />}
            backItem={<FlashcardItem title="Back" value={flashcardBack} />}
          />
        )
      })}
    </Grid>
  )
};

ScreenStudySet.propTypes = {
  set: PropTypes.object,
};

ScreenStudySet.defaultProps = {
  set: {},
}

export default ScreenStudySet;
