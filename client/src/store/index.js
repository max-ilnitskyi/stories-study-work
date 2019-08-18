import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';

import { fetchUser } from './user/actions';
import { watchViewportWidthChange } from './viewport/actions';

// default middlewares
let middlewares = [thunk];

// Additional middlewares for development
if (process.env.NODE_ENV !== 'production') {
  // dynamic import redux logger
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    collapsed: true
  });

  // Unite middlewares
  middlewares = [...middlewares, logger];
}

// default enhancers
let enhancers = [applyMiddleware(...middlewares)];

// Additional enhancers for development
if (process.env.NODE_ENV !== 'production') {
  // dynamic import redux devtools extension
  const { devToolsEnhancer } = require('redux-devtools-extension');

  // Unite enhancers
  enhancers = [...enhancers, devToolsEnhancer()];
}

// Create store
const store = createStore(reducer, compose(...enhancers));

// Fetch user when store created
store.dispatch(fetchUser());

// Watch viewport width change
store.dispatch(watchViewportWidthChange());

export default store;
