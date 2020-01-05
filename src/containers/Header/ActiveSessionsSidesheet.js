import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import SideSheet from '../../components/SideSheet';
import { SESSION_TYPE_FLASHCARD } from '../../models/SessionFlashcards';
import FlashcardActiveSessionGroup from '../StudyContainers/Flashcard/FlashcardActiveSessionGroup';

class ActiveSessionsSidesheet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    const sessions = Object.values(this.props.sessions || {}) || [];
    const sessionsSorted = sessions
      .sort((a, b) => get(a, 'updatedAt') - get(b, 'updatedAt'));

    const sessionFlashcardIds = sessionsSorted
      .filter(s => get(s, 'origin.type') === SESSION_TYPE_FLASHCARD)
      .reduce((acc, s) => ({ ...acc, [get(s, 'origin.id')]: true }), {});

    return (
      <SideSheet
        isOpen={this.props.isOpen}
        close={this.props.close}
        title="Active Sessions"
        bodyStyle={{ padding: 0 }}
      >
        <FlashcardActiveSessionGroup
          forceMobile
          flashcards={sessionFlashcardIds}
          columns={[1, 1, 1]}
        />
      </SideSheet>
    );
  }
}

ActiveSessionsSidesheet.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  sessions: state.sessions,
});

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveSessionsSidesheet);
