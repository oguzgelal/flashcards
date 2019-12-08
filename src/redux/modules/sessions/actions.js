import get from 'lodash/get';
import * as types from './types';
import api from '../../api';
import { toaster } from 'evergreen-ui';
import { loadingStart, loadingStop } from '../loading/actions';
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
  kind, // flashcard, reveal_table etc.
  origin, // describes what resource the session was initiated from
  title, // set a title to the session
  description, // descriptive text for the session
  callback, // called after session is started successfully
}) => (dispatch, getState) => {

  // get current user id
  const state = getState();
  const userId = get(state, 'auth.user.uid');
  if (!userId) return;

  // generate session id and get refs
  const sessionId = generateId({ key: S_ID, uniq: userId, random: true });
  const userSessionRef = getUserSessionRef(userId, sessionId);
  const sessionRef = getSessionRef(userId, sessionId);

  // start loading and update
  const startLoading = () => {
    dispatch(loadingStart(types.SESSION_START));
    dispatch(loadingStart(`${types.SESSION_START}_${origin}`));
  }
  const stopLoading = () => {
    dispatch(loadingStop(types.SESSION_START));
    dispatch(loadingStop(`${types.SESSION_START}_${origin}`));
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
    id: sessionId,
    kind,
    origin,
    title,
    description: description || '',
    updatedAt: api.TIMESTAMP,
  }).then(() => {
    sessionRef.set({
      id: sessionId,
      kind,
      origin,
      title,
      description: description || '',
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

  // get current user id
  const state = getState();
  const userId = get(state, 'auth.user.uid');
  if (!userId) return;

  // get ref
  const sessionRef = getSessionRef(userId, sessionId);
  sessionRef.once('value', callback);
}


// set an observer that listens for a single session
export const toggleSessionObserver = (sessionId, status, callback) => (dispatch, getState) => {

  // get current user id
  const state = getState();
  const userId = get(state, 'auth.user.uid');
  if (!userId) return;

  // get ref
  const sessionRef = getSessionRef(userId, sessionId);

  // toggle observer
  const fn = status ? sessionRef.on : sessionRef.off;
  fn('value', callback);
}


// set an observer that listens to changes in the session keys
// stored under /user/<id>/sessions
export const setUserSessionsObserver = () => (dispatch, getState) => {

  // get current user id
  const state = getState();
  const userId = get(state, 'auth.user.uid');
  if (!userId) return;

  // get refs
  const userSessionRef = getUserSessionsRef(userId);

  // start observer
  userSessionRef.on('value', dataSnapshot => {
    const userSessions = dataSnapshot.val();
    dispatch(saveUserSessionsToState(userSessions))
  })
};
