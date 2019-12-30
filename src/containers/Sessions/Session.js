// Logical component that wraps sessions and handles state
// management / update mechanism and handles data updates

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import get from 'lodash/get';

import history from '../../config/history';
import navigate from '../../utils/navigate';

import * as sessionActions from '../../redux/modules/sessions/actions';

class Session extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: null, // session data (locally managed session data)
      session: null, // session (initially loaded from the server)
      loaded: false,
      lastUpdateLocal: null, // last local update
      lastUpdateServer: null, // last captured server update
    };

    this.close = this.close.bind(this);
    this.minimize = this.minimize.bind(this);
    this.terminate = this.terminate.bind(this);
    this.sync = this.sync.bind(this);
    this.updateData = this.updateData.bind(this);
    this.observerCallback = this.observerCallback.bind(this);
    this.observerStart = this.observerStart.bind(this);
    this.observerStop = this.observerStop.bind(this);
  }

  componentDidMount() { this.observerStart(); }
  componentWillUnmount() { this.observerStop(); }

  // try going back, go
  // home if there is no back
  close() {
    history.goBackOrRun(() => {
      navigate('/', { replace: true });
    });
  }

  // close session without terminating it
  minimize() {
    this.close();
  }

  // terminate session
  terminate() {
    alert('ending session');
    this.close();
  }

  // load session and replace local state
  sync() {
    const { getSessionData } = this.props.sessionActions;
    getSessionData(this.props.id, dataSnapshot => {
      const sessionData = dataSnapshot.val();
      this.setState({
        data: get(sessionData, 'data'),
        lastUpdateServer: get(sessionData, 'updatedAt'),
      })
    })
  }

  // update session data
  updateData(data, { callback, serverCallback } = {}) {
    this.setState(this.setState({ data }), () => {
      if (typeof callback === 'function') callback();
      // TODO:
      /* 1. save session data to server */
      /* 2. on the callback, set lastUpdateLocal to `updatedSession.updatedAt` */
      /* 3. on the setState callback, call 'serverCallback' if given */
    })
  }

  observerCallback(dataSnapshot) {
    const sessionData = dataSnapshot.val();
    const update = {
      // Every session data change captured through the observer, update `lastUpdateServer`,
      // and on every callback of a manual data update (not captured from an observer),
      // update `lastUpdateLocal`. Disallow manual data updates if `lastUpdateServer` is
      // not equal to `lastUpdateServer`. This ensures the device updating the server has
      // the most up-to-date data in it's local state. If it's not the case, use `this.sync`
      // and update the data in the local state along with the `localUpdateServer` variable.
      lastUpdateServer: get(sessionData, 'updatedAt'),
      // set local state from server once on initial load, then do not override the local
      // state only send the updates to the server. this is to prevent ui glitches
      loaded: true,
    };

    // update local state if not already
    if (!this.state.loaded) {
      // save entire session data to local state
      update.session = sessionData;
      // save data separately to be managed locally
      update.data = get(sessionData, 'data');
    }

    this.setState(update)
  }

  // start watching changes in session
  observerStart() {
    const { toggleSessionObserver } = this.props.sessionActions;
    toggleSessionObserver(this.props.id, this.observerCallback, true);
  }

  // start watching changes in session
  observerStop() {
    const { toggleSessionObserver } = this.props.sessionActions;
    toggleSessionObserver(this.props.id, this.observerCallback, false);
  }

  render() {
    return (
      this.props.children({
        // session id
        id: this.props.id,
        // loading session data
        loading: false,
        // updating session data
        updating: false,
        // is the local state of this component in
        // sync with the backend ? if this is false,
        // do not allow manipulation of server data
        upToDate: true,
        // complete session (as initially loaded from the server)
        session: this.state.session,
        // locally managed session data
        data: this.state.data,
        // function to update session state.
        updateData: this.updateData,
        // go back
        minimize: this.minimize,
        // terminate session
        terminate: this.terminate,
      })
    )
  }
}

// prop types of what sessions should be receiving
// from the Session logical wrapper
export const sessionProps = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  updating: PropTypes.bool,
  upToDate: PropTypes.bool,
  data: PropTypes.object,
  session: PropTypes.object,
  updateData: PropTypes.func,
  minimize: PropTypes.func,
  terminate: PropTypes.func,
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
