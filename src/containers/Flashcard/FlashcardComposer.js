import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import { Icon } from 'evergreen-ui';
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

    // active session
    const isSessionActive = !isNil(this.props.activeSession);

    // session
    const kind = SESSION_KIND_FLASHCARD;
    const origin = sessionFlashcards.generateOrigin({ set: setId, topic: topicId, id: flashcardId })
    const title = `Flashcards: ${flashcardFront} to ${flashcardBack}`;
    const flashcardSessionStarting = get(this.props, `loading['${sessionTypes.SESSION_START}_${flashcardId}']`);

    return (
      <FlashcardPreview
        key={`${setId}_${flashcardId}`}
        sessionActive={isSessionActive}
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
        buttons={[
          {
            label: (isSessionActive ?
              'Continue' :
              (flashcardSessionStarting ? 'Starting...' : 'Start')
            ),
            disabled: flashcardSessionStarting,
            onClick: () => {
              if (isSessionActive) {
                alert('Opening session')
              } else {
                this.props.sessionActions.sessionStart({
                  kind,
                  title,
                  origin,
                });
              }
            },
          },
          isSessionActive ? null : {
            label: <Icon icon="cog" />,
            style: { flexGrow: 0, width: 42 }
          }
        ].filter(i => !!i)}
      />
    )
  }
}

FlashcardComposer.propTypes = {
  set: setPropTypes,
  flashcard: flashcardPropTypes,
  loading: PropTypes.object,
  sessionActions: PropTypes.object,
  activeSession: PropTypes.string,
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
