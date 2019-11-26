import get from 'lodash/get';
import * as types from './types';
import api from '../../api';
import { toaster } from 'evergreen-ui';
import { loadingStart, loadingStop } from '../loading/actions';
import { SESSION_KEY } from '../../../config/dbKeys';
import generateId from '../../../utils/generateId';
import { getSessionRefs } from '../../../utils/sessionUtils';

/*
export const sessionStart = ({
  kind, // flashcard, reveal_table etc.
  origin, // describes what resource the session was initiated from
}) => ({
  type: types.SESSION_START,
  id: `session_${Math.round(Math.random() * 1000000)}`,
  kind,
  origin,
  startedAt: Date.now(),
  updatedAt: Date.now(),
});

export const sessionUpdate = (id, data) => ({
  type: types.SESSION_UPDATE,
  id,
  data,
  updatedAt: Date.now(),
});

export const sessionStop = id => ({
  type: types.SESSION_STOP,
  id,
});
*/

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
  const sessionId = generateId({ key: SESSION_KEY[1], uniq: userId, random: true });
  const refs = getSessionRefs(userId, sessionId);

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
  refs.userSession.set(true).then(() => {
    refs.session.set({
      id: sessionId,
      kind,
      origin,
      user: userId,
      startedAt: api.TIMESTAMP,
      updatedAt: api.TIMESTAMP,
    }).then(success).catch(fail)
  }).catch(fail)
}

export const sessionStop = () => {};
export const sessionUpdate = () => {};
export const setSessionObserver = () => {};
