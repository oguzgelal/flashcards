import { combineReducers } from 'redux';
import auth from './auth/reducer';
import loading from './loading/reducer';
import sessions from './sessions/reducer';

export default combineReducers({
  auth,
  loading,
  sessions,
});
