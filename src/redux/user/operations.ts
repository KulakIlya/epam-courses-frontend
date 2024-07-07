import { createAsyncThunk } from '@reduxjs/toolkit';

import userService from '../../services/userService';
import {
  AsyncThunkConfig,
  ErrorResponse,
  FetchUserResponse,
  LoginSuccess,
  LogoutSuccess,
  UserToLogin,
} from './user.types';

import { setAuthToken } from '../../services/axios.config';

export const login = createAsyncThunk<LoginSuccess, UserToLogin, AsyncThunkConfig>(
  'user/login',
  async (userToLogin, thunkAPI) => {
    try {
      const { data } = await userService.loginUser(userToLogin);
      setAuthToken((data as LoginSuccess).token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);

export const logout = createAsyncThunk<LogoutSuccess, undefined, AsyncThunkConfig>(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      const { data } = await userService.logoutUser();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);

export const fetchUser = createAsyncThunk<FetchUserResponse, undefined, AsyncThunkConfig>(
  'user/me',
  async (_, thunkAPI) => {
    try {
      const { data: data } = await userService.fetchUser();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as ErrorResponse).message);
    }
  }
);
