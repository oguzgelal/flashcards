import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import { SESSION_TYPE_FLASHCARD } from '../../models/SessionFlashcards';
import FlashcardSession from './Flashcards/FlashcardSession';
import Session from '../../containers/Sessions/Session';
import SessionLayout from '../../components/Sessions/SessionLayout';

class Sessions extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  componentDidMount() {
    const sessionId = get(this.props, 'match.params.sessionId');
    if (!sessionId) this.back();
  }

  render() {
    const sessionId = get(this.props, 'match.params.sessionId');

    return (
      <Session id={sessionId}>
        {sessionProps => {
          const isLoading = get(sessionProps, 'loading');
          const type = get(sessionProps, 'session.origin.type');
          return (
            <SessionLayout loading={isLoading}>
              {type === SESSION_TYPE_FLASHCARD && <FlashcardSession {...sessionProps} />}
            </SessionLayout>
          )
        }}
      </Session>
    );
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
