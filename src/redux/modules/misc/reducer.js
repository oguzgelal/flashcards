import initialState from '../../../config/initialState';
import * as types from './types';

export default (state = initialState.misc, action = {}) => {

  if (action.type === types.TOGGLE_THEME) {
    return {
      ...state,
      theme: state.theme === 'light' ?
        'dark' :
        'light'
      }
  }

  return state;
}
