import get from 'lodash/get';
import store from '../redux/store';

export const getCurrentUserId = () => {
  const state = store.getState();
  return get(state, 'auth.user.uid');
}
