// Style wrapper for sessions

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import ScreenTakeover from '../../components/ScreenTakeover';
import Page from '../../components/Page';

class SessionLayout extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showSettings: false,
    };
  }

  render() {
    return (
      <ScreenTakeover>
        <Page full center hasHeader={false}>
          {this.props.children}
        </Page>
      </ScreenTakeover>
    );
  }
}

SessionLayout.propTypes = {
  children: PropTypes.any.isRequired,
  settings: PropTypes.any,
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
)(SessionLayout);
