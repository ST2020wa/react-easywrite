import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import textReducer from './slices/textSlice';
import settingsReducer from './slices/settingsSlice';
import timerReducer from './slices/timerSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['settings', 'text'] // Only persist these reducers
};

const rootReducer = combineReducers({
  text: textReducer,
  settings: settingsReducer,
  timer: timerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 