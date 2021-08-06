import { configureStore } from '@reduxjs/toolkit';
import { casesSlice } from './features/casesSlice';
import { userSlice } from './features/userSlice';
import { backendApi } from './services/backend';
import { userApi } from './services/user';

const preloadedState = JSON.parse(sessionStorage.getItem('store'));

const saveToStorage = store => next => action => {
  sessionStorage.setItem('store', JSON.stringify(store.getState()));
  next(action);
};

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userSlice.name]: userSlice.reducer,
    [casesSlice.name]: casesSlice.reducer,
  },
  [preloadedState ? 'preloadedState' : null]: preloadedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      saveToStorage,
      backendApi.middleware,
      userApi.middleware
    ),
});
