import get from 'lodash/get';
import * as types from './types';

// disable accessibility features until tab key is pressed
export const enableAccessibility = () => ({
  type: types.ENABLE_ACCESSIBILITY,
});

// Enable accessibility on tab keypress. Inspired by Blueprint:
// https://blueprintjs.com/docs/#core/accessibility.focus-management
export const setAccessibilityListener = () => (dispatch, getState) => {
  document.addEventListener('keydown', e => {
    const state = getState();
    const isAccessibilityEnabled = get(state, 'misc.accessibility');
    if (e.keyCode === 9 && !isAccessibilityEnabled) {
      dispatch(enableAccessibility());
    }
  })
}
