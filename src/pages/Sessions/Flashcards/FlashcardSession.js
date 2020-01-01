import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import SideSheet from '../../../components/SideSheet';
import SessionContents from '../../../components/Sessions/SessionContents';
import FlashcardSettings from './FlashcardSettings';
import { sessionProps } from '../../../containers/Sessions/Session';

import SessionHeader from '../../../components/Sessions/SessionHeader';

class FlashcardSession extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showSettings: false,
    };
  }

  render() {
    return (
      <>
        {/* settings sidesheet */}
        <SideSheet
          isOpen={this.props.showSettings}
          close={() => this.setState({ showSettings: false })}
        >
          <FlashcardSettings />
        </SideSheet>

        {/* header */}
        <SessionHeader
          minimize={this.props.minimize}
          terminate={this.props.terminate}
        />

        {/* contents */}
        <SessionContents>
          Yo!
        </SessionContents>
      </>
    );
  }
}

FlashcardSession.propTypes = {
  ...sessionProps
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
)(FlashcardSession);
