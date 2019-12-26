import get from 'lodash/get';
import history from '../config/history';

export default (path = '', { silent, replace } = {}) => {
  if (replace) {
    if (silent) window.history.replaceState(null, null, path);
    else history.replace(path)
  }
  else {
    if (silent) window.history.pushState(null, null, path);
    else history.push(path);
  }
};
