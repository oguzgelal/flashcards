import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import { Icon } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import setPropTypes from '../../../common/setPropTypes';
import { sessionFlashcardPropTypes } from '../../../common/sessionFlashcardsPropTypes';
import sessionFlashcards from '../../../models/SessionFlashcards';
import * as sessionTypes from '../../../redux/modules/sessions/types';
import * as sessionActions from '../../../redux/modules/sessions/actions';
import navigate from '../../../utils/navigate';

import { FlashcardPreview } from '../../../components/StudyComponents/Flashcard';
import { SESSION } from '../../../config/routes';

import data from '../../../lib/tmpdata';

class FlashcardActiveSession extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    // flashcard
    const flashcard = get(this.props, 'flashcard') || {};
    const flashcardId = get(flashcard, 'id');
    const flashcardFront = get(data, `common.keys['${get(flashcard, 'front')}']`);
    const flashcardBack = get(data, `common.keys['${get(flashcard, 'back')}']`);
    const setId = get(flashcard, 'sid');

    // active session
    const isSessionActive = !isNil(this.props.activeSession);

    // session
    const origin = sessionFlashcards.generateOrigin({ set: setId, id: flashcardId })
    const flashcardSessionStarting = get(this.props, `loading['${sessionTypes.SESSION_START}_${flashcardId}']`);

    return (
      <FlashcardPreview
        key={`${setId}_${flashcardId}`}
        frontItem={flashcardFront}
        backItem={flashcardBack}
        buttons={[
          {
            label: (isSessionActive ?
              'Continue' :
              (flashcardSessionStarting ? 'Starting...' : 'Start')
            ),
            disabled: flashcardSessionStarting,
            onClick: () => {
              if (isSessionActive) {
                navigate(`/${SESSION}/${this.props.activeSession}`)
              } else {
                this.props.sessionActions.sessionStart({
                  origin
                });
              }
            },
          },
          !isSessionActive ? null : {
            appearance: 'default',
            intent: 'danger',
            label: <Icon icon="cross" />,
            style: { flexGrow: 0, width: 42 }
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

FlashcardActiveSession.propTypes = {
  set: setPropTypes,
  flashcard: sessionFlashcardPropTypes,
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
)(FlashcardActiveSession);
