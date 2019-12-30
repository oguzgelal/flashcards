import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import { Pane } from 'evergreen-ui';

import SideSheet from '../../../components/SideSheet';
import FlashcardSettings from './FlashcardSettings';
import { sessionProps } from '../../../containers/Sessions/Session';

import SessionHeader from '../../../components/Sessions/SessionHeader';

const Wrapper = styled(Pane)``;

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
        {/* session settings sidesheet */}
        <SideSheet
          isOpen={this.props.showSettings}
          close={() => this.setState({ showSettings: false })}
        >
          <FlashcardSettings />
        </SideSheet>

        {/* session contents */}
        <>
          <SessionHeader
            minimize={this.props.minimize}
            terminate={this.props.terminate}
          />


        </>
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
