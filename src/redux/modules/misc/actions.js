import * as types from './types';

// disable accessibility features until tab key is pressed
export const toggleTheme = () => ({
  type: types.TOGGLE_THEME,
});
