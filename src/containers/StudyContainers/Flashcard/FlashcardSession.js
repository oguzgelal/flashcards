import React from 'react';
import { connect } from 'react-redux';

import SideSheet from '../../../components/SideSheet';
import SessionHeader from '../../../components/Sessions/SessionHeader';
import SessionContents from '../../../components/Sessions/SessionContents';
import { sessionProps } from '../../Sessions/Session';

import FlashcardSettings from './FlashcardSettings';

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
