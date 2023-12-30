import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

//Slices
import userStatsSlice from './reducers/userStats';
import locationsSlice from './reducers/locations';


// const sagaMiddleware = createSagaMiddleware();

//Wrapping the allReducers in a root reducer allows the entire store 
//to be reset to initialstate without adding a reducer to every slice
const rootReducer = (state, action) => {
    if (action.type === 'RESET_ENTIRE_STORE') {
      state = undefined;
    }
    return allReducers(state, action);
  }

const allReducers = combineReducers({
    user: userStatsSlice,
    locations: locationsSlice,
    });

const storeInstance = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
      { thunk: false, serializableCheck: false })
      .concat(
        logger
      )
  });

//   sagaMiddleware.run(rootSaga);

export default storeInstance;