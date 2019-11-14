import * as types from './types';

export const loadingStart = id => ({
  type: types.LOADING_START,
  id
});

export const loadingStop = id => ({
  type: types.LOADING_STOP,
  id
});
