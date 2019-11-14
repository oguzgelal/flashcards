import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import DevTools from '../../components/DevTools';
import initialState from '../../config/initialState';
import rootReducer from '../modules';

export default () => {

  const enhancer = compose(
    applyMiddleware(thunk, reduxImmutableStateInvariant()),
    DevTools.instrument(), // redux devtools setup
  );

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept('../modules', () => {
      const nextReducer = require('../modules').default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};
