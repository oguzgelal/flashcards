// Logical component that wraps sessions and handles state
// management / update mechanism and handles data updates

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import * as sessionActions from '../../redux/modules/sessions/actions';

class Session extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: null, // session data
      lastUpdateLocal: null, // last local update
      lastUpdateServer: null, // last captured server update
    };

    this.observerStart = this.observerStart.bind(this);
    this.observerStop = this.observerStop.bind(this);
    this.sync = this.sync.bind(this);
    this.update = this.update.bind(this);
  }

  // componentDidMount() { this.observerStart(); }
  // componentWillUnmount() { this.observerStop(); }

  // start watching changes in session
  observerStart() {
    const { toggleSessionObserver } = this.props.sessionActions;
    toggleSessionObserver(this.props.id, true, dataSnapshot => {
      const sessionData = dataSnapshot.val();
      this.setState({
        // Every session data change captured through the observer, update `lastUpdateServer`,
        // and on every callback of a manual data update (not captured from an observer),
        // update `lastUpdateLocal`. Disallow manual data updates if `lastUpdateServer` is
        // not equal to `lastUpdateServer`. This ensures the device updating the server has
        // the most up-to-date data in it's local state. If it's not the case, use `this.sync`
        // and update the data in the local state along with the `localUpdateServer` variable.
        lastUpdateServer: get(sessionData, 'updatedAt'),
      })
    })
  }

  // start watching changes in session
  observerStop() {
    const { toggleSessionObserver } = this.props.sessionActions;
    toggleSessionObserver(this.props.id, false);
  }

  // load session and replace local state
  sync() {
    const { getSessionData } = this.props.sessionActions;
    getSessionData(this.props.id, dataSnapshot => {
      const sessionData = dataSnapshot.val();
      this.setState({
        data: sessionData,
        lastUpdateServer: get(sessionData, 'updatedAt'),
      })
    })
  }

  // update session data
  update() {

  }

  render() {
    return (
      this.props.children({
        // loading session data
        loading: false,
        // session data
        data: this.state.data,
      })
    )
  }
}

Session.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  // authors: state.authors,
});

const mapDispatchToProps = dispatch => ({
  sessionActions: bindActionCreators(sessionActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Session);
