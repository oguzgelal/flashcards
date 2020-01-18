import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { Drawer } from '@blueprintjs/core';

import Grid from '../../components/Grid';
import FlashcardLauncher from '../StudyContainers/Flashcard/FlashcardLauncher';
import RevealTableLauncher from '../StudyContainers/RevealTable/RevealTableLauncher';
import StudyTableLauncher from '../StudyContainers/StudyTable/StudyTableLauncher';

const Body = styled.div`
  height: 100%;
  overflow: auto;
  padding: 22px;
  background-color: ${p => p.theme.t.appBg()};
`;

class SessionLauncherSidesheet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Drawer
        usePortal
        isOpen={this.props.isOpen}
        onClose={this.props.close}
        title="Start New Session"
        icon="application"
        size={Drawer.SIZE_SMALL}
      >
        <Body>
          <Grid columns={[1, 1, 1]} autoHeight>
            <FlashcardLauncher />
            <StudyTableLauncher />
            <RevealTableLauncher />
          </Grid>
        </Body>
      </Drawer>
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
