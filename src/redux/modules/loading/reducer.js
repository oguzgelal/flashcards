import initialState from '../../../config/initialState';
import * as types from './types';

export default (state = initialState.loading, action = {}) => {

  if (action.type === types.LOADING_START) {
    return { ...state.loading, [action.id]: true }
  }

  if (action.type === types.LOADING_STOP) {
    return { ...state.loading, [action.id]: false }
  }

  return state;
}
