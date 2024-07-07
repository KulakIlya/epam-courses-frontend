import { createSlice } from '@reduxjs/toolkit';
import { fetchUser, login, logout } from './operations';
import { InitialState } from './user.types';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState: InitialState = {
  username: '',
  email: '',
  token: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token;
      })
      .addCase(logout.fulfilled, state => {
        state.username = '';
        state.email = '';
        state.token = '';
        state.isLoggedIn = false;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.username = payload.name;
        state.email = payload.email;
        state.isLoggedIn = true;
      }),
});

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const userReducer = persistedReducer;
// export const {} = userSlice.actions;
