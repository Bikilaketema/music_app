import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import defaultReducer from './redux/reducer';
import fetchSongsSaga from './redux/songSaga';
import { Global, css } from '@emotion/react';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Combine reducers (even if you have just one reducer)
const rootReducer = combineReducers({ defaultReducer });

// Configure the store with the reducer and middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(fetchSongsSaga);

// Define the RootState type based on rootReducer
type RootState = ReturnType<typeof rootReducer>;


// Global style reset
const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body,
      #root {
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    `}
  />
);

// Render the application
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of ReactDOM.render
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <GlobalStyles /> {/* Apply global styles */}
        <App />
      </Provider>
    </React.StrictMode>
  );
}

export type { RootState }; 
