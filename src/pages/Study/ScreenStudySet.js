import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import setPropTypes from '../../common/setPropTypes';
import Grid from '../../components/Grid';
import { FlashcardItem, FlashcardPreview } from '../../components/Flashcard';

const ScreenStudySet = props => {
  const setId = get(props, 'set.id');
  const setFlashcards = get(props, 'set.flashcards') || [];
  const setKeys = get(props, 'set.keys') || {};

  return (
    <Grid
      gap={32}
      autoHeight
      columns={[2, 2, 1]}
      style={{ marginTop: 32 }}
    >
      {setFlashcards.map(flashcard => {
        const flashcardId = get(flashcard, 'id');
        const flashcardFrontKey = get(flashcard, 'front');
        const flashcardBackKey = get(flashcard, 'back');
        const flashcardFront = get(setKeys, flashcardFrontKey);
        const flashcardBack = get(setKeys, flashcardBackKey);
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
              label: 'Start'
            }]}
          />
        )
      })}
    </Grid>
  )
};

ScreenStudySet.propTypes = {
  set: setPropTypes,
};

ScreenStudySet.defaultProps = {
  set: {},
}

export default ScreenStudySet;
