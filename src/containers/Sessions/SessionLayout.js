// Style wrapper for sessions

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';

import SideSheet from '../../components/SideSheet';
import ScreenTakeover from '../../components/ScreenTakeover';

class SessionLayout extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showSettings: false,
    };
  }

  render() {
    return (
      <>
        {/* session contents */}
        <ScreenTakeover>
          {this.props.children}
        </ScreenTakeover>

        {/* session settings sidesheet */}
        <SideSheet
          isOpen={this.props.showSettings}
          close={() => this.setState({ showSettings: false })}
        >
          {this.props.settings}
        </SideSheet>
      </>
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
