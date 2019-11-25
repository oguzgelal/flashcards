import get from 'lodash/get';
import initialState from '../../../config/initialState';
import * as types from './types';

export default (state = initialState.sessions, action = {}) => {

  if (action.type === types.SESSION_START) {
    return {
      ...state,
      [action.id]: {
        id: action.id,
        kind: action.kind,
        origin: action.origin,
        startedAt: action.startedAt,
        updatedAt: action.updatedAt,
      }
    }
  }

  if (action.type === types.SESSION_UPDATE) {
    return {
      ...state,
      [action.id]: {
        ...(get(state, action.id) || {}),
        updatedAt: action.updatedAt,
        data: action.data,
      }
    }
  }

  if (action.type === types.SESSION_STOP) {
    const newState = { ...state };
    delete action.id;
    return newState;
  }

  return state;
}
