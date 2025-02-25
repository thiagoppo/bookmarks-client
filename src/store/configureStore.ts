import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import env from 'env-var';
import history from '../history/browserHistory';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const APP_ENVIRONMENT = env.get('REACT_APP_ENVIRONMENT').required().asString();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['ui'],
};

const createAppMiddleware = sagaMiddleware => {
  const appMiddleware = [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    routerMiddleware(history),
    sagaMiddleware,
  ];

  if (APP_ENVIRONMENT === 'development') {
    return [...appMiddleware, logger];
  }

  return appMiddleware;
};

const sagaMiddleware = createSagaMiddleware();
const middleware = createAppMiddleware(sagaMiddleware);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware,
    devTools: APP_ENVIRONMENT !== 'production',
  });
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
