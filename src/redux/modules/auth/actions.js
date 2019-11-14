import isNil from 'lodash/isNil';
import api from '../../api';
import * as types from './types';

export const saveUserToState = ({ user }) => ({
  type: types.SAVE_USER_TO_STATE,
  user
});

export const removeUserFromState = () => ({
  type: types.REMOVE_USER_FROM_STATE
});

// thunks

export const login = ({ email, password }) => dispatch => {
  api.auth.setPersistence(api.authPersistence).then(() => {
    api.auth.signInWithEmailAndPassword(email, password)
      .then(res => {})
      .catch(() => dispatch(removeUserFromState()))
  }).catch(() => dispatch(removeUserFromState()))
}

export const logout = () => dispatch => {
  api.auth.signOut().then(() => {
    dispatch(removeUserFromState())
  });
}

export const setAuthObserver = () => dispatch => {
  api.auth.onAuthStateChanged(user => {
    console.log('Auth state changed: ', user);
    if (!isNil(user)) {
      dispatch(saveUserToState({
        user: {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoUrl: user.photoUrl,
          uid: user.uid,
        }
      }));
    } else {
      dispatch(removeUserFromState());
    }
  })
}
