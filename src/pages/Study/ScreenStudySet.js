import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import setPropTypes from '../../common/setPropTypes';

import Grid from '../../components/Grid/Grid';
import FlashcardLauncher from '../../containers/StudyContainers/Flashcard/FlashcardLauncher';
import StudyTableLauncher from '../../containers/StudyContainers/StudyTable/StudyTableLauncher';
import RevealTableLauncher from '../../containers/StudyContainers/RevealTable/RevealTableLauncher';

class ScreenStudySet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    // const setFlashcards = get(this.props, 'set.flashcards') || {};
    return (
      <Grid autoHeight columns={[2, 2, 1]}>

        {/* flashcard */}
        <FlashcardLauncher
          settings={{
            topicId: get(this.props, 'set.topic'),
            setId: get(this.props, 'set.id'),
          }}
        />

        {/* study tables */}
        <StudyTableLauncher
          settings={{
            topicId: get(this.props, 'set.topic'),
            setId: get(this.props, 'set.id')
          }}
        />

        {/* reveal table */}
        <RevealTableLauncher
          settings={{
            topicId: get(this.props, 'set.topic'),
            setId: get(this.props, 'set.id')
          }}
        />
      </Grid>
    );
  }
}

ScreenStudySet.propTypes = {
  set: setPropTypes,
};

ScreenStudySet.defaultProps = {
  set: {},
}

const mapStateToProps = (state, ownProps) => ({
  // loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  // sessionActions: bindActionCreators(sessionActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenStudySet);
