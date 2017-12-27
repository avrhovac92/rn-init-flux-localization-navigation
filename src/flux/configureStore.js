/**
 * Create redux store
 */

/**
 * redux functions
 */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate, createTransform } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createMigration from 'redux-persist-migrate';
import migrationManifest from '@flux/migrationManifest';
import * as reducers from './reducers';

let storeExport;

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const myTransform = createTransform(
  // transform state coming from redux on its way to being serialized and stored
  state => state,
  // transform state coming from storage, on its way to be rehydrated into redux
  (state, key) => {
    if (key === 'app') {
      state.connected = true;
      return state;
    }
    if (key === 'contest') {
      state.activeContest = '';
    }
    return state;
  }
);

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

// Here comes de migrations declaration
const migration = createMigration(
  migrationManifest, // receipe
  'app' // store key holding the version number
);

/**
 * configureStore
 */
export default function configureStore(onComplete) {
  const store = createStore(
    combineReducers(reducers),
    {},
    compose(migration, autoRehydrate(), applyMiddleware(thunk, logger))
  );
  persistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: ['navigation', 'tate', 'components'],
      transforms: [myTransform]
    },
    onComplete
  );
  if (isDebuggingInChrome) {
    window.store = store;
  }
  storeExport = store;
  return store;
}

export function getStore() {
  return storeExport;
}
