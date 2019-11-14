import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { toaster } from 'evergreen-ui';
import api from '../../api';
import * as types from './types';
import { loadingStart, loadingStop } from '../loading/actions';


export const saveUserToState = ({ user }) => ({
  type: types.SAVE_USER_TO_STATE,
  user
});

export const removeUserFromState = () => ({
  type: types.REMOVE_USER_FROM_STATE
});

// thunks

export const login = ({ email, password }) => dispatch => {
  dispatch(loadingStart(types.LOGIN));
  api.auth.setPersistence(api.authPersistence).then(() => {
    api.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch(loadingStop(types.LOGIN))
      })
      .catch(err => {
        toaster.danger('Failed to Login', { description: get(err, 'message') })
        dispatch(removeUserFromState());
        dispatch(loadingStop(types.LOGIN))
      })
  }).catch(err => {
    toaster.danger('Failed to Login', { description: get(err, 'message') })
    dispatch(removeUserFromState())
    dispatch(loadingStop(types.LOGIN))
  })
}

export const logout = () => dispatch => {
  dispatch(loadingStart(types.LOGOUT));
  api.auth.signOut().then(() => {
    dispatch(loadingStop(types.LOGOUT));
    dispatch(removeUserFromState())
  }).catch(err => {
    dispatch(loadingStop(types.LOGOUT));
  });
}

export const setAuthObserver = () => dispatch => {
  api.auth.onAuthStateChanged(user => {
    dispatch(loadingStop(types.INIT));
    console.log('Auth state changed: ', user);
    if (!isNil(user)) {
      dispatch(
        saveUserToState({
          user: {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoUrl: user.photoUrl,
            uid: user.uid,
          }
        })
      );
    } else {
      dispatch(removeUserFromState());
    }
  })
}
