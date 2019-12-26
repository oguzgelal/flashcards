import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';
import navigate from '../../utils/navigate';
import history from '../../config/history';

import { SESSION_TYPE_FLASHCARD } from '../../models/SessionFlashcards';
import FlashcardSession from './Flashcards/FlashcardSession';

class Sessions extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  componentDidMount() {
    const sessionId = get(this.props, 'match.params.sessionId');
    const sessionType = get(this.props, 'match.params.sessionType');

    // if session not defined, try going back,
    // go home if there is no back
    if (!sessionId || !sessionType) {
      history.goBackOrRun(() => {
        navigate('/', { replace: true });
      });
    }
  }

  render() {
    const sessionType = get(this.props, 'match.params.sessionType');

    if (sessionType === SESSION_TYPE_FLASHCARD) return <FlashcardSession />

    return null;
  }
}

Sessions.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
  // authors: state.authors,
});

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sessions);
