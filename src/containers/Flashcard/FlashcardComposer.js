import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import setPropTypes from '../../common/setPropTypes';
import { flashcardPropTypes } from '../../common/flashcardsPropTypes';
import sessionFlashcards, { SESSION_KIND_FLASHCARD } from '../../models/SessionFlashcards';
import * as sessionTypes from '../../redux/modules/sessions/types';
import * as sessionActions from '../../redux/modules/sessions/actions';
import {
  FlashcardItem,
  FlashcardPreview,
} from '../../components/Flashcard';

class FlashcardComposer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    // set
    const setId = get(this.props, 'set.id');
    const topicId = get(this.props, 'set.topic');
    const setKeys = get(this.props, 'set.keys') || {};

    // flashcard
    const flashcard = get(this.props, 'flashcard') || {};
    const flashcardId = get(flashcard, 'id');
    const flashcardFrontKey = get(flashcard, 'front');
    const flashcardBackKey = get(flashcard, 'back');
    const flashcardFront = get(setKeys, flashcardFrontKey);
    const flashcardBack = get(setKeys, flashcardBackKey);

    // session
    const kind = SESSION_KIND_FLASHCARD;
    const origin = sessionFlashcards.generateOrigin({ set: setId, topic: topicId, id: flashcardId })
    const title = `Flashcards: ${flashcardFront} to ${flashcardBack}`;
    const flashcardSessionStarting = get(this.props, `loading['${sessionTypes.SESSION_START}_${flashcardId}']`);

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
              title,
              origin,
            });
          },
        }]}
      />
    )
  }
}

FlashcardComposer.propTypes = {
  set: setPropTypes,
  flashcard: flashcardPropTypes,
  loading: PropTypes.object,
  sessionActions: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  sessionActions: bindActionCreators(sessionActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashcardComposer);
