import initialState from '../../../config/initialState';
import * as types from './types';

export default (state = initialState.misc, action = {}) => {

  if (action.type === types.ENABLE_ACCESSIBILITY) {
    return { ...state, accessibility: true }
  }

  return state;
}
