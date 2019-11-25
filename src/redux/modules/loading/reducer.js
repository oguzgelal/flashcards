import initialState from '../../../config/initialState';
import * as types from './types';

export default (state = initialState.loading, action = {}) => {

  if (action.type === types.LOADING_START) {
    return { ...state, [action.id]: true }
  }

  if (action.type === types.LOADING_STOP) {
    return { ...state, [action.id]: false }
  }

  return state;
}
