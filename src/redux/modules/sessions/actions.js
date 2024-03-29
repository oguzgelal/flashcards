import get from 'lodash/get';
import * as types from './types';
import api from '../../api';
import { toaster } from 'evergreen-ui';
import { loadingStart, loadingStop } from '../loading/actions';
import { getCurrentUserId } from '../../../utils/user';
import generateId from '../../../utils/generateId';
import {
  S_ID,
  getSessionRef,
  getUserSessionRef,
  getUserSessionsRef,
} from '../../../config/db';

const saveUserSessionsToState = sessions => ({
  type: types.SAVE_USER_SESSIONS_TO_STATE,
  sessions,
});

export const sessionStart = ({
  type,
  settings,
  callback, // called after session is started successfully
}) => (dispatch, getState) => {

  const userId = getCurrentUserId();
  const sessionId = generateId({ key: S_ID, uniq: userId, random: true });
  const userSessionRef = getUserSessionRef(userId, sessionId);
  const sessionRef = getSessionRef(userId, sessionId);

  // start loading and update
  const startLoading = () => {
    dispatch(loadingStart(types.SESSION_START));
    dispatch(loadingStart(`${types.SESSION_START}_${type}`));
  }
  const stopLoading = () => {
    dispatch(loadingStop(types.SESSION_START));
    dispatch(loadingStop(`${types.SESSION_START}_${type}`));
  }
  const success = () => {
    stopLoading();
    if (typeof callback === 'function') callback(sessionId);
    toaster.success('Session started')
  }
  const fail = err => {
    stopLoading();
    toaster.danger('Failed to start a session', {
      description: get(err, 'message')
    })
  }

  startLoading();

  userSessionRef.set({
    type,
    settings,
    id: sessionId,
    updatedAt: api.TIMESTAMP,
  }).then(() => {
    sessionRef.set({
      type,
      settings,
      id: sessionId,
      user: userId,
      startedAt: api.TIMESTAMP,
      updatedAt: api.TIMESTAMP,
    }).then(success).catch(fail)
  }).catch(fail)
}


export const sessionStop = () => {};


export const sessionUpdate = () => {};


// get session data
export const getSessionData = (sessionId, callback) => (dispatch, getState) => {
  const userId = getCurrentUserId();
  const sessionRef = getSessionRef(userId, sessionId);

  sessionRef.once('value', callback);
}


// set an observer that listens for a single session
export const toggleSessionObserver = (sessionId, callback, status) => (dispatch, getState) => {
  const userId = getCurrentUserId();
  const sessionRef = getSessionRef(userId, sessionId);

  if (status) sessionRef.on('value', callback)
  else sessionRef.off('value', callback)
}


// set an observer that listens to changes in the session keys
// stored under /user/<user_id>/sessions
export const setUserSessionsObserver = () => (dispatch, getState) => {
  const userId = getCurrentUserId();
  const userSessionRef = getUserSessionsRef(userId);

  userSessionRef.on('value', dataSnapshot => {
    const userSessions = dataSnapshot.val();
    dispatch(saveUserSessionsToState(userSessions))
  })
};
