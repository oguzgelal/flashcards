import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import Grid from '../../components/Grid';
import Sidesheet from '../../components/SideSheet';
import FlashcardLauncher from '../StudyContainers/Flashcard/FlashcardLauncher';
import RevealTableLauncher from '../StudyContainers/RevealTable/RevealTableLauncher';
import StudyTableLauncher from '../StudyContainers/StudyTable/StudyTableLauncher';

class SessionLauncherSidesheet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Sidesheet
        isOpen={this.props.isOpen}
        close={this.props.close}
        title="Start New Session"
      >
        <Grid columns={[1, 1, 1]} autoHeight>
          <FlashcardLauncher />
          <StudyTableLauncher />
          <RevealTableLauncher />
        </Grid>
      </Sidesheet>
    );
  }
}

SessionLauncherSidesheet.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
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
)(SessionLauncherSidesheet);
