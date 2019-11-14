import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initialState from '../../config/initialState';
import rootReducer from '../modules';

export default () => createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);
