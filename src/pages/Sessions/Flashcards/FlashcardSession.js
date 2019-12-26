import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import Session from '../../../containers/Sessions/Session';
import SessionLayout from '../../../containers/Sessions/SessionLayout';

class FlashcardSession extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <Session id={this.props.id}>
        {({ loading, data, update }) => (
          <SessionLayout loading={loading}>
            Yo!
          </SessionLayout>
        )}
      </Session>
    );
  }
}

FlashcardSession.propTypes = {
  id: PropTypes.string.isRequired,
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
