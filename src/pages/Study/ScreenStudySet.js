import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import setPropTypes from '../../common/setPropTypes';
import FlashcardsComposerGrid from '../../containers/Flashcard/FlashcardsComposerGrid';

class ScreenStudySet extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <FlashcardsComposerGrid
        set={this.props.set}
      />
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
