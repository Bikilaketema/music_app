import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songReducer from './songSlice';
import fetchSongsSaga from './songSaga';  // Import your single saga

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(fetchSongsSaga);  // Run the single saga

export type RootState = ReturnType<typeof store.getState>;
export default store;
