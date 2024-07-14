import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { fetchUser, login, logout } from './operations';
import { InitialState } from './user.types';

const initialState: InitialState = {
  username: '',
  email: '',
  token: '',
  isLoggedIn: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
      })
      .addCase(logout.fulfilled, state => {
        state.username = '';
        state.email = '';
        state.token = '';
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(fetchUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.username = payload.name;
        state.email = payload.email;
        state.isLoggedIn = true;
      })
      .addCase(fetchUser.rejected, state => {
        state.isLoading = false;
        state.token = '';
      }),
});

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const userReducer = persistedReducer;
