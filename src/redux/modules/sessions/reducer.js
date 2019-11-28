import get from 'lodash/get';
import initialState from '../../../config/initialState';
import * as types from './types';

export default (state = initialState.sessions, action = {}) => {

  if (action.type === types.SAVE_USER_SESSIONS_TO_STATE) {
    return action.sessions;
  }

  return state;
}
